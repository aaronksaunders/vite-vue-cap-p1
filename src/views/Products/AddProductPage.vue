<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Product</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input type="text" v-model="name" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-input type="text" v-model="description" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Price</ion-label>
          <ion-input type="number" v-model="price" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Image</ion-label>
          <input
            type="file"
            v-on:change="(e)=>handleFileChange(e as any)"
            accept="image/*"
            required
            ref="imageInput"
          />
        </ion-item>
        <div
          class="image-preview-container fade"
          id="image-preview-container"
          v-if="imageUrl"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="image-preview fade"
            id="image-preview"
          />
          <button v-if="imageUrl" class="image-preview-clear" @click="clearImage">
            Clear
          </button>
        </div>
        <ion-button type="submit" expand="block">Add Product</ion-button>
        <ion-button type="button" @click="router.back()" expand="block"
          >Cancel</ion-button
        >
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/vue";
import { imageOutline } from "ionicons/icons";
import { ref } from "vue";
import { saveSomeDoc, uploadImageAndSaveDocument } from "../../services/firebase-service";

const router = useIonRouter();

const name = ref("");
const description = ref("");
const price = ref("");
const image = ref();
const imageInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string | null>(null);
const imageName = ref<string | null>(null);

const handleFileChange = (event: Event & { target: { files: FileList } }) => {
  image.value = event?.target?.files[0];

  // Create a preview URL for the selected image
  imageUrl.value = URL.createObjectURL(image.value);
  imageName.value = image.value.name;
};

const clearImage = () => {
  // Clear the preview and URL
  imageUrl.value = null;
  imageName.value = null;

  // Reset the input element
  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const handleSubmit = async () => {
    try {
  const { data: uploadData, error: uploadError } = await uploadImageAndSaveDocument(
    image.value
  );
  if (uploadError) throw uploadError;

  //   // Generate thumbnail from image
  //   const thumbnail = await generateThumbnail(image.value);

  //   // Upload image to Firebase Storage
  //   const storageRef = firebase.storage().ref();
  //   const fileRef = storageRef.child(`products/${image.value.name}`);
  //   const snapshot = await fileRef.put(thumbnail);

  //   // Get image URL from Firebase Storage
  //   const imageUrl = await snapshot.ref.getDownloadURL();

  // Save product data to Firestore
  const { data: saveDocData, error: saveDocError } = await saveSomeDoc({
    name: name.value,
    description: description.value,
    price: Number(price.value),
    imageUrl: uploadData?.url,
  });

  if (saveDocError) throw saveDocError;

  // Clear form
  name.value = "";
  description.value = "";
  price.value = "";
  image.value = null;
  imageUrl.value = null;

  // Clear the input element
  if (imageInput.value) {
    imageInput.value.value = "";
  }
} catch (error) {
    console.log(error)
}
};
</script>
<style>
.image-preview-container {
  width: 360px;
  height: 360px;
  overflow: hidden;
  position: relative;
}

.image-preview {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center;
}

.image-preview-clear {
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.image-preview-container:hover .image-preview-clear {
  display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition: height 10.9s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  height: 0;
}
</style>
