<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { Camera, CameraResultType } from '@capacitor/camera';
import { ref } from "vue";

// ref for image from camera
const imageUrl = ref<string|undefined>()

// camera
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

  imageUrl.value = image.webPath;
};

// action sheet
const showActionSheet = async () => {
  const result = await ActionSheet.showActions({
    title: "Photo Options",
    message: "Select an option to perform",
    options: [
      {
        title: "Upload",
      },
      {
        title: "Share",
      },
      {
        title: "Remove",
        style: ActionSheetButtonStyle.Destructive,
      },
    ],
  });

  console.log("Action Sheet result:", result);
};
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue + Ionic Capacitor" />
  <button @click="showActionSheet" class="action-button">SHOW ACTION SHEET</button>
  <button @click="takePicture"  class="action-button">TAKE PICTURE</button>
  <img :src="imageUrl" style="width: 100%"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
