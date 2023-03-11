<style scoped></style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <hello-world msg="Vite + Vue + Ionic Capacitor" />

      <ion-button @click="presentActionSheet">Open</ion-button>
      <code>{{ result }}</code>
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
  actionSheetController,
} from "@ionic/vue";
import HelloWorld from "../../components/HelloWorld.vue";
import { ref } from 'vue';

const result = ref();

const presentActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: "Example header",
    subHeader: "Example subheader",
    buttons: [
      {
        text: "Delete",
        role: "destructive",
        data: {
          action: "delete",
        },
      },
      {
        text: "Share",
        data: {
          action: "share",
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        data: {
          action: "cancel",
        },
      },
    ],
  });

  await actionSheet.present();

  const res = await actionSheet.onDidDismiss();
  result.value = JSON.stringify(res, null, 2);
};
</script>
