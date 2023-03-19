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
      <!-- Conversation Data -->
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{ response?.productMeta?.name }}</ion-card-subtitle>
          <ion-card-title>{{ response?.sellerName }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>Buyer: {{ response?.buyerName }}</p>
          <p>Product ID: {{ response?.productId }}</p>
          <p>Created At: {{ response?.createdAt }}</p>
        </ion-card-content>
      </ion-card>
      <!-- Messages List -->
      <ion-list>
        <ion-item v-for="message in response?.messages" :key="message.id">
          <ion-label>
            <h2 class="ion-text-wrap">{{ message.text }}</h2>
            <p>{{ message.createdAt }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      <pre>{{ JSON.stringify(response, null, 2) }}</pre>
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
import { getUserConversations } from "../../services/firebase-service";

const response = ref<any>();

onIonViewDidEnter(async () => {
  response.value = (await getUserConversations())[0];
  debugger;
});
</script>
