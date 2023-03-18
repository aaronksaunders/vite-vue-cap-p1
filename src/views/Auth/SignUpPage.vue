<style scoped></style>

<template>
  <ion-page>
    <ion-header> </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h2 class="ion-text-center ion-padding">Vite Vue Ionic VueFire</h2>
      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="primary">Full Name</ion-label>
          <ion-input
            v-model="displayName"
            name="displayName"
            type="text"
            :spellcheck="false"
            autocapitalize="off"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked" color="primary">Email Address</ion-label>
          <ion-input
            v-model="email"
            name="email"
            type="email"
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
          <ion-button @click="onSignUp()" type="button" expand="block"
            >SIGN UP</ion-button
          >
        </ion-col>
        <ion-col>
          <ion-button @click="router.back()" color="light" expand="block"
            >CANCEL</ion-button
          >
        </ion-col>
      </ion-row>
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
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
} from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import { ref } from "vue";
import { firebaseSignUp } from "../../services/firebase-service";

const email = ref();
const password = ref();
const displayName = ref();

/**
 * creates user in database and adds display name
 */
const onSignUp = async () => {
  try {
    const response = await firebaseSignUp(email.value, password.value, displayName.value);
    console.debug(response);
    router.replace("/home");
  } catch (error) {
    console.debug(error)
  }

  return null;
};

const router = useIonRouter();
</script>
