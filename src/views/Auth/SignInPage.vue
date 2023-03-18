<style scoped></style>

<template>
  <ion-page>
    <ion-header> </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h2 class="ion-text-center ion-padding">Vite Vue Ionic VueFire</h2>
      <ion-list>
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
          <ion-button @click="onSignIn()" type="button" expand="block">SIGN IN</ion-button>
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
  IonList
} from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import { ref } from "vue";
import { firebaseSignIn, getAllSomeDocs } from "../../services/firebase-service";

const email = ref();
const password = ref();

/**
 * creates user in database and adds display name
 */
 const onSignIn = async () => {
  try {
    const response = await firebaseSignIn(email.value, password.value);
    console.debug(response);

    router.replace("/home");
  } catch (error) {
    console.debug(error)
  }

  return null;
};

const router = useIonRouter();
</script>
