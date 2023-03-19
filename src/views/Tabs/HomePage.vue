<style scoped></style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home Page</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="onSignout"> LOGOUT </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button router-link="/home/product-list">PRODUCTS</ion-button>
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
  IonButtons,
  IonButton,
  onIonViewDidEnter,
  useIonRouter,
  
} from "@ionic/vue";
import { ref } from "vue";
import { getAllSomeDocs, firebaseSignOut } from "../../services/firebase-service";


const router = useIonRouter();

const someDocsData = ref();



/**
 * 
 */
const onSignout = async () =>{
  await firebaseSignOut();
  router.replace("/signin")
}
</script>
