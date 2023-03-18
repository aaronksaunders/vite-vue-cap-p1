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
      <pre>{{ JSON.stringify(someDocsData, null, 2) }}</pre>
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
  useIonRouter
} from "@ionic/vue";
import { ref } from "vue";
import { getAllSomeDocs, firebaseSignOut } from "../../services/firebase-service";


const router = useIonRouter();

const someDocsData = ref();

onIonViewDidEnter(async () => {
  const { data, error } = await getAllSomeDocs();
  if (error) {
    console.error("getAllSomeDocs", error);
  }
  someDocsData.value = data;
});

/**
 * 
 */
const onSignout = async () =>{
  await firebaseSignOut();
  router.replace("/signin")
}
</script>
