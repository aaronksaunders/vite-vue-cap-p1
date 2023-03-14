<template>
  <ion-list class="ion-padding" ref="playersList">
    <ion-item-sliding v-for="p in players" :id="p.id">
      <ion-item :router-link="`/players/${p.id}`" detail>
        <ion-grid>
          <ion-row>
            <ion-col size="2"> {{ p.number }}</ion-col>
            <ion-col size="6"> {{ p.first_name }} {{ p.last_name }} </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>{{ (p.team as any)?.name }}</ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
      <ion-item-options>
        <ion-item-option color="danger">
          <ion-icon :icon="trashBinOutline" size="large" @click="confirmDelete(p.id)">
          </ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonCol,
  IonRow,
  IonList,
  IonGrid,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonIcon,
  alertController,
} from "@ionic/vue";
import { trashBinOutline } from "ionicons/icons";
import { ref } from "vue";
import type { PlayerInterface, TeamInterface } from "../../../services/firebase";

const props = defineProps<{
  players: PlayerInterface[];
}>();

const emit = defineEmits<{
  (e: "on-delete-player", id: string): void;
}>();

const playersList = ref();


/**
 * display confirmation dialog before moving on and deleting the user.
 * if the user confirms, then emit the event to the parent to handle
 * the actual deletion of the player
 * 
 * @param playerId
 */
const confirmDelete = async (playerId: string | undefined) => {
  playersList.value.$el.closeSlidingItems();

  // confirmation dialog before deleting
  const alert = await alertController.create({
    header: "Alert!",
    subHeader: "You are about to delete a player, are you sure?",
    buttons: [
      {
        text: "NO",
        role: "cancel",
        handler: () => {
          return;
        },
      },
      {
        text: "YES, DELETE PLAYER",
        role: "confirm",
        handler: () => {
          emit("on-delete-player", playerId as string);
        },
      },
    ],
  });

  await alert.present();
};
</script>
