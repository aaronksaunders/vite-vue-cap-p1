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
      <ion-button :router-link="`/home/product-images/100`">IMAGES</ion-button>
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
import { getSomeDocById } from "../../services/firebase-service";
import { ref } from "vue";

const currentItem = ref();

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
</script>

<style scoped></style>
