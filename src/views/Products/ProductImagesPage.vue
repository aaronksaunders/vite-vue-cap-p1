<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Product Images</ion-title>
        <ion-buttons slot="end"> </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="photo-gallery">
        <div class="main-image">
          <img :src="selectedImage" alt="Main image" />
        </div>
        <div class="thumbnails" ref="thumbnailsContainer">
          <div
            :class="image === selectedImage ? 'selected thumbnail' : 'thumbnail'"
            v-for="(image, index) in images"
            :key="index"
            @click="selectImage(index)"
          >
            <img
              :src="image"
              alt="Thumbnail"
              :class="image === selectedImage ? 'selected' : ''"
            />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  onIonViewDidEnter,
  useIonRouter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonBackButton,
} from "@ionic/vue";
import { ref, watch } from "vue";

const images = ref();
const selectedImage = ref();

onIonViewDidEnter(async () => {
  debugger;
  images.value = [
  "https://via.placeholder.com/500x300/FF5733/ffffff",
  "https://via.placeholder.com/300x300/C70039/ffffff",
  "https://via.placeholder.com/500x500/900C3F/ffffff",
  "https://via.placeholder.com/500x300/581845/ffffff",
  "https://via.placeholder.com/500x300/FFC300/000000",
  "https://via.placeholder.com/500x300/FF5733/ffffff",
  "https://via.placeholder.com/500x300/C70039/ffffff",
  "https://via.placeholder.com/500x300/900C3F/ffffff",
  "https://via.placeholder.com/500x300/581845/ffffff",
  "https://via.placeholder.com/500x300/FFC300/000000",
];

selectedImage.value = images.value[0]
});


const thumbnailsContainer = ref();

function selectImage(index: number) {
  selectedImage.value = images.value[index];
}

// Scroll the thumbnails container to show the selected image
// function scrollToSelectedImage() {
//   const selectedThumbnail = document.querySelector(".thumbnail.selected");
//   thumbnailsContainer.value.scrollTo({
//     left: selectedThumbnail?.offsetLeft - thumbnailsContainer.value.offsetLeft,
//     behavior: "smooth",
//   });
// }
</script>

<style scoped>
.photo-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.main-image img {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.thumbnails {
  height: 110px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.thumbnail {
  cursor: pointer;
  height: 100px;
  border: 2px solid #ccc;
  display: inline-block;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
}

.thumbnail img {
  max-width: 100%;
  max-height: 100%;
}

.thumbnail.selected {
  border-color: #000;
  border: solid;
}
</style>
