<template>
  <ion-accordion-group ref="accordionGroup">
    <ion-accordion value="add-ui">
      <ion-item slot="header" color="light">
        <ion-label class="ion-padding-start">Click To Add New Player...</ion-label>
      </ion-item>
      <ion-card class="ion-no-padding" slot="content">
        <ion-card-header style="padding: 8px">
          <ion-row class="ion-align-items-center">
            <ion-col
              ><div style="font-size: larger; font-weight: 700">ADD NEW PLAYER</div>
            </ion-col>
            <ion-col size="auto">
              <ion-button size="small" @click="onClickSave">SAVE</ion-button>
            </ion-col>
          </ion-row>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="stacked" color="primary">Team</ion-label>
            <ion-select placeholder="Select Team" v-model="team">
              <div v-for="t in teams">
                <ion-select-option :value="t.id">{{ t.name }}</ion-select-option>
              </div>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">First Name</ion-label>
            <ion-input
              v-model="first_name"
              name="first_name"
              type="text"
              :spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked" color="primary">Last Name</ion-label>
            <ion-input
              v-model="last_name"
              name="last_name"
              type="text"
              :spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>
          <ion-item style="--padding-start: 0px">
            <ion-label position="stacked" color="primary">Uniform Number</ion-label>
            <ion-input
              v-model="number"
              name="number"
              type="number"
              :spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-accordion>
  </ion-accordion-group>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonInput,
  IonCardHeader,
  IonButton,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/vue";
import { ref } from "vue";
import {
  db,
  anErrorAlert,
  PlayerInterface,
  TeamInterface,
  PlayerInputInterface
} from "../../../services/firebase";



const emit = defineEmits<{
  (e: "on-save-player", player: PlayerInputInterface): void;
}>();

const props = defineProps<{
  teams: TeamInterface[];
}>();

const first_name = ref<string>("");
const last_name = ref<string>("");
const team = ref<string>("");
const number = ref<string>("");

const accordionGroup = ref();

/**
 *
 */
const onClickSave = () => {
  emit("on-save-player", {
    first_name: first_name.value,
    last_name: last_name.value,
    team: team.value,
    number: number.value,
  });

  // close the accordian
  const nativeEl = accordionGroup?.value?.$el;
  if (nativeEl.value === "add-ui") {
    nativeEl.value = undefined;
  }

  //clear input
  first_name.value = "";
  last_name.value = "";
  team.value = "";
  number.value = "";
};
</script>
