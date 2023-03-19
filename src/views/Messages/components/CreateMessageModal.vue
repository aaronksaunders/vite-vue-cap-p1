<template>
  <ion-modal :is-open="isModalOpen" @didDismiss="dismissModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Send Message</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismissModal">
            <ion-icon slot="icon-only" :icon="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="modal-container">
        <div class="product-image">
          <img :src="productImage" />
        </div>

        <ion-item>
          <ion-textarea placeholder="Enter your message" v-model="message"></ion-textarea>
        </ion-item>

        <ion-button @click="sendMessage()" expand="block">Send Message</ion-button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { close } from 'ionicons/icons';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonTextarea,
} from "@ionic/vue";

const emit = defineEmits<{
  (e: "did-dismiss"): void;
  (e: "send-message", message:string): void;
}>();

const props = defineProps<{
  isModalOpen: boolean;
  productImage: string;
}>();

const message = ref("");

const dismissModal = () => {
  emit("did-dismiss");
  message.value = '';
};

const sendMessage = () => {
  // TODO: Implement logic for sending message to recipient with content from the 'message' ref.
  emit('send-message', message.value);
  message.value = '';
};
</script>
