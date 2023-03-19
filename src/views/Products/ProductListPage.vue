<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="router.push(`/home/add-product`)">ADD PRODUCT</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div
        v-for="(item, index) in someDocsData"
        :key="item.id"
        @click="router.push(`/home/product-detail/${item.id}`)"
      >
        <!-- {{ JSON.stringify(item, null, 2) }} -->
        <ProductCard :item="item" :current-user="route.params?.ownerId && user" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  onIonViewDidEnter,
  useIonRouter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonBackButton,
} from "@ionic/vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getAllSomeDocs, firebaseSignOut } from "../../services/firebase-service";
import ProductCard from "./components/ProductCard.vue";
import { currentUser } from "../../services/firebase-service";
import { computed } from "vue";

const route = useRoute();
console.log(route.params?.ownerId);

const router = useIonRouter();

const someDocsData = ref();
const pageTitle = ref();

const user = computed(() => {
  return currentUser.value;
});

onIonViewDidEnter(async () => {
  if (route.params?.ownerId) {
    // check the user is really current user..
    if ((route.params?.ownerId as string) !== currentUser.value?.uid) {
      throw Error("Invalid Params Passed To Page");
    } else {
      pageTitle.value = "Your Products";
    }
  }

  // get data based on user
  const { data, error } = await getAllSomeDocs(
    (route.params?.ownerId as string) || undefined
  );
  if (error) {
    console.error("getAllSomeDocs", error);
  }
  someDocsData.value = data;
});
</script>

<style scoped></style>
