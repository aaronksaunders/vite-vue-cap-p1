<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <!-- <ion-buttons slot="start"> <ion-back-button /></ion-buttons> -->
        <ion-title> Vite Vue Ionic VueFire: PLAYERS </ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <player-input :teams="teams"  @on-save-player="addPlayer"/>
      <players-list :players="players" @on-delete-player="deletePlayer" />
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
  deleteDoc,
  getDoc,
  doc,
} from "@firebase/firestore";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import PlayersList from "./components/PlayersList.vue";
import PlayerInput from "./components/PlayerInput.vue";
import { useCollection } from "vuefire";
import {
  db,
  anErrorAlert,
  PlayerInterface,
  TeamInterface,
  PlayerInputInterface,
} from "../../services/firebase";
import {watch} from 'vue';

const players = useCollection<PlayerInterface>(
  query(collection(db, "players"), orderBy("last_name", "asc"))
);


const teams = useCollection<TeamInterface>(
  query(collection(db, "teams"), orderBy("name", "asc"))
);

/**
 *
 * @param playerId
 */
const deletePlayer = async (playerId: string) => {
  try {
    const docRef = doc(db, "players", playerId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw Error("Player Does Not Exists");

    await deleteDoc(docRef);
  } catch (error) {
    anErrorAlert("Deleting Player", (error as any).message);
  }
};

/**
 *
 */
const addPlayer = async (playerInput: PlayerInputInterface) => {
  debugger;
  await addDoc(collection(db, "players"), {
    ...playerInput,
    team: doc(collection(db, "teams"), playerInput.team),
    created_at: serverTimestamp(),
  });
};
</script>
