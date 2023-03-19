<template>
  <ion-card>
    <div class="item-image-wrapper">
      <img :src="item.imageUrl" alt="item image" class="item-image" />
    </div>
    <ion-card-header>
      <ion-card-title>{{ itemName }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ item.description }}</p>
      <p>Price: {{ item.price }}</p>
      <p>Created at: {{ item.created_at }}</p>
      <p v-show="!currentUser">Seller: {{ item.owner.name }}</p>
      <div v-if="currentUser" style="margin-top: 8px; height: 32px !important">
        <div class="ion-float-left">
          <ion-button size="small" style="margin-right: 8px"><ion-icon :icon="mailOutline"></ion-icon></ion-button>
          <ion-button size="small"  style="margin-right: 8px"
            ><ion-icon :icon="pencilOutline"></ion-icon
          ></ion-button>
          <ion-button size="small" >
            <ion-icon :icon="item.isVisible ? eyeOutline : eyeOffOutline"></ion-icon>
          </ion-button>
        </div>
        <div class="ion-float-right">
          <ion-button color="danger" size="small">DELETE</ion-button>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
} from "@ionic/vue";
import { pencilOutline, eyeOutline, eyeOffOutline, mailOutline } from "ionicons/icons";
const props = defineProps<{
  item: any;
  currentUser?: any;
}>();

const itemName = computed(() => props.item.name);
</script>
<style scoped>
.item-image-wrapper {
  /* width: 360px; */
  height: 200px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-image {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
</style>
