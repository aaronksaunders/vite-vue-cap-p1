<script setup lang="ts">
import {
  alertController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonButton,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
} from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { updateCurrentUserProfile, useFirebaseAuth } from "vuefire";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const router = useIonRouter();

const username = ref<string>("");
const password = ref<string>("");
const name = ref<string>("");

const anErrorAlert = async (subHeader: string, message: string) => {
  const alert = await alertController.create({
    header: "Error Alert",
    subHeader,
    message,
    buttons: ["OK"],
  });

  await alert.present();
  return;
};
/**
 *
 */
const onSignUp = async () => {
  if (!username?.value || !password?.value || !name?.value) {
    anErrorAlert("Authentication Error", "Missing Or Invalid Credentials");
  }

  try {
    const userCred = await createUserWithEmailAndPassword(
      useFirebaseAuth()!,
      username.value,
      password.value
    );
    await updateProfile(userCred.user, { displayName: name.value });
    return router.replace("/home");
  } catch (e: any) {
    anErrorAlert("Sign Up User Error", e.message);
  }
};
</script>
<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <!-- <ion-buttons slot="start"> <ion-back-button /></ion-buttons> -->
        <ion-title> Vite Vue Ionic VueFire: Sign Up </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h2>Sign Up Page</h2>
      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="primary">Full Name</ion-label>
          <ion-input
            v-model="name"
            name="name"
            type="text"
            :spellcheck="false"
            autocapitalize="off"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked" color="primary">Username</ion-label>
          <ion-input
            v-model="username"
            name="username"
            type="text"
            :spellcheck="false"
            autocapitalize="off"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked" color="primary">Password</ion-label>
          <ion-input
            v-model="password"
            name="password"
            type="password"
            required
          ></ion-input>
        </ion-item>
      </ion-list>

      <ion-row>
        <ion-col>
          <ion-button @click="onSignUp()" type="button" expand="block">CREATE NEW ACCOUNT</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="router.back()" color="danger" expand="block"
            >CANCEL</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>
