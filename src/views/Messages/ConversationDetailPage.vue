<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Messages</ion-title>
        <ion-buttons slot="end"> </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Messages List -->
      <ion-list>
        <ion-item v-for="message in conversation?.messages" :key="message.id">
          <ion-label>
            <h2 class="ion-text-wrap">
              <span style="font-weight: 700">{{
                message.senderId === currentUser?.uid ? "Me: " : "Buyer: "
              }}</span>
              {{ message.text }}
            </h2>
            <p>{{ convertDate(message.createdAt) }}</p>
          </ion-label>
        </ion-item>
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
  onIonViewWillEnter,
} from "@ionic/vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  getConversationById,
  getUserConversations,
  currentUser,
} from "../../services/firebase-service";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const conversation = ref<any>();
const route = useRoute();
console.log(route.params?.conversationId);

const convertDate = (date: Date) => {
  return dayjs().to(date);
};

onIonViewWillEnter(async () => {
  conversation.value = getConversationById(route.params?.conversationId as string);
});
</script>
