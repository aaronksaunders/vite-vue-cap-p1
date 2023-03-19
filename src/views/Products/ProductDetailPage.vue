<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Product Detail Page</ion-title>
        <ion-buttons slot="end"> </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      {{ JSON.stringify(currentItem, null, 2) }}
      <p>
        <ion-button>BUY</ion-button>
        <ion-button @click="messageSeller">MESSAGE</ion-button>
        <ion-button :router-link="`/home/product-images/100`">IMAGES</ion-button>
      </p>

      <!-- MODAL -->
      <CreateMessageModal
        :is-modal-open="isModalOpen"
        :product-image="currentItem?.url"
        @did-dismiss="isModalOpen = false"
        @send-message="handleSendMessage"
      />
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
import { useRoute } from "vue-router";
import { getSomeDocById, initiateConversation } from "../../services/firebase-service";
import { ref } from "vue";
import CreateMessageModal from "../Messages/components/CreateMessageModal.vue";

const currentItem = ref();
const isModalOpen = ref<boolean>(false);

const route = useRoute();
console.log(route.params?.productId);
onIonViewDidEnter(async () => {
  const { data, error } = await getSomeDocById(route.params?.productId as string);
  if (data) {
    currentItem.value = data;
  } else {
    console.log(error);
  }
});

/**
 *
 */
const messageSeller = () => {
  isModalOpen.value = true;
};

const handleSendMessage = async (value: any) => {
  isModalOpen.value = false;

  const { data, error } = await initiateConversation(
    currentItem.value.id,
    currentItem.value.owner.id,
    value
  );
  console.log(data);

  debugger;
};
</script>

<style scoped></style>
