<style scoped></style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h3>{{ user?.displayName || user?.email }}</h3>
      <ion-item detail :router-link="`/account/product-list/${user?.uid}`">
        <ion-icon slot="start" :icon="personOutline"></ion-icon> Your Settings
      </ion-item>
      <ion-item detail :router-link="`/account/product-list/${user?.uid}`">
        <ion-icon slot="start" :icon="heartOutline"></ion-icon> Your Saved Items
      </ion-item>
      <ion-item detail :router-link="`/account/product-list/${user?.uid}`">
        <ion-icon slot="start" :icon="bagOutline"></ion-icon> Your Products
      </ion-item>
      <ion-item detail :router-link="`/account/messages`">
        <ion-icon slot="start" :icon="mailUnreadOutline"></ion-icon> Your Messages
      </ion-item>
      <ion-item detail :router-link="`/account/product-list/${user?.uid}`">
        <ion-icon slot="start" :icon="cashOutline"></ion-icon>Your Sales
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonItem,
} from "@ionic/vue";
import { currentUser } from "../../services/firebase-service";
import { computed } from "vue";
import {
  cashOutline,
  mailUnreadOutline,
  bagOutline,
  personOutline,
  heartOutline,
} from "ionicons/icons";

const user = computed(() => {
  return currentUser.value;
});
</script>
