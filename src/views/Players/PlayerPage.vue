<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <!-- <ion-buttons slot="start"> <ion-back-button /></ion-buttons> -->
        <ion-title> Vite Vue Ionic VueFire: PLAYER </ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding"> 
    {{ player }} {{ player?.id }}
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  query,
  getDoc,
  doc,
} from "@firebase/firestore";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  actionSheetController,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonList,
  IonGrid,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/vue";
import { ref } from "vue";
import { useCollection, useDocument } from "vuefire";
import { db, PlayerInterface } from "../../services/firebase";
import { useIonRouter } from "@ionic/vue";
import { useRoute } from "vue-router";
const router = useIonRouter();
const route = useRoute();
console.log(route.params?.playerId);

const player = useDocument<PlayerInterface>(
  doc(db, "players", route.params?.playerId as string)
  // doc(collection(db, "players"), route.params?.playerId as string)
);


</script>
