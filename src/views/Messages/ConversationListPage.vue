<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Conversations</ion-title>
        <ion-buttons slot="end"> </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Messages List -->
      <ion-list>
        <!-- Conversation Data -->
        <ion-card
          v-for="response in conversations"
          :key="response.id"
          lines="none"
          :router-link="`/account/conversations/${response.id}`"
        >
          <ion-card-header>
            <ion-card-subtitle>{{ response?.productMeta?.name }}</ion-card-subtitle>
            <ion-card-title>{{ response?.sellerName }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Buyer: {{ response?.buyerName }}</p>
            <!-- <p>Product ID: {{ response?.productId }}</p> -->
            <p>Conversation Started: {{ convertDate(response?.createdAt) }}</p>
            <p>Message(s): {{ response?.messages.length }}</p>
          </ion-card-content>
        </ion-card>
      </ion-list>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonList,
  IonCardSubtitle,
  IonCardTitle,
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref, watch } from "vue";
import { getUserConversations } from "../../services/firebase-service";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const conversations = ref<any>();

const convertDate = (date: Date) => {
  return dayjs().to(date);
};

onIonViewWillEnter(() => {
  getUserConversations().then((resp) => (conversations.value = resp));
});
</script>
