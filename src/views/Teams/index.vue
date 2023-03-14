<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <!-- <ion-buttons slot="start"> <ion-back-button /></ion-buttons> -->
        <ion-title> Vite Vue Ionic VueFire: TEAMS </ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card class="ion-no-padding">
        <ion-card-header style="padding: 8px">
          <ion-row class="ion-align-items-center">
            <ion-col
              ><div style="font-size: larger; font-weight: 700">ADD NEW TEAM</div>
            </ion-col>
            <ion-col size="auto">
              <ion-button size="small" @click="addTeam">SAVE</ion-button>
            </ion-col>
          </ion-row>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="stacked" color="primary">Team Name</ion-label>
            <ion-input
              v-model="name"
              name="name"
              type="text"
              :spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>
          <ion-item style="--padding-start: 0px">
            <ion-label position="stacked" color="primary">Description</ion-label>
            <ion-textarea
              v-model="description"
              name="description"
              type="text"
              :spellcheck="false"
              autocapitalize="off"
              required
            ></ion-textarea>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <div v-for=" t in teams">
      <!-- {{t.id}} --> {{t.name}}
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { addDoc, collection, orderBy, serverTimestamp, query } from "@firebase/firestore";
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
  IonTextarea,
} from "@ionic/vue";
import { ref } from "vue";
import { useCollection } from "vuefire";
import { db } from "../../services/firebase";

const name = ref<string>("");
const description = ref<string>("");
  const teams = useCollection(query(collection(db, "teams"), orderBy('name','asc')));
console.log(teams);

const addTeam = async () => {
  await addDoc(collection(db, "teams"), {
    name : name.value,
    description: description.value,
    created_at: serverTimestamp(),
  });
};
</script>
