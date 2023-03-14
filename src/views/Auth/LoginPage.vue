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
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";

const router = useIonRouter();

const username = ref<string>("");
const password = ref<string>("");

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
const onLogin = async () => {
  if (!username?.value || !password?.value) {
    anErrorAlert("Authentication Error", "Missing Or Invalid Credentials");
  }

  try {
    await signInWithEmailAndPassword(useFirebaseAuth()!, username.value, password.value);
    return router.replace("/home");
  } catch (e: any) {
    anErrorAlert("Authentication Error", e.message);
  }
};
</script>
<template>
  <ion-page>
    <ion-header translucent>
      <!-- <ion-toolbar>
        <ion-title>Vite Vue Ionic VueFire</ion-title>
      </ion-toolbar> -->
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h2 class="ion-text-center ion-padding">Vite Vue Ionic VueFire</h2>
      <img src="../../assets/logo.svg" class="logo vue" alt="Vue logo"/>

      <ion-list>
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
          <ion-button @click="onLogin()" type="button" expand="block">LOGIN</ion-button>
        </ion-col>
        <ion-col>
          <ion-button @click="router.push('/signup')" color="light" expand="block"
            >SIGN UP</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>
