<style scoped></style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home Page</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="doSignOut">Sign Out</ion-button>
        </ion-buttons>
      </ion-toolbar>

    </ion-header>
    <ion-content class="ion-padding">
      <h1 v-if="currentUser">
        Welcome: {{ currentUser.providerData[0].displayName || currentUser?.email }}
      </h1>
      <ion-item detail routerLink="/teams"> TEAMS </ion-item>
      <ion-item detail routerLink="/players"> PLAYERS </ion-item>
      <!-- <ion-button @click="presentActionSheet">Open</ion-button> -->

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
  IonButton,
  IonItem,
  IonButtons
} from "@ionic/vue";
import { ref } from "vue";

// vuefire
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import router from "../../router";

const result = ref();

// virefire
const currentUser = useCurrentUser();

const doSignOut = async () => {
  await useFirebaseAuth()?.signOut();
  router.replace("/login");
};

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
