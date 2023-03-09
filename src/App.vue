<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
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
  <button @click="showActionSheet">SHOW ACTION SHEET</button>
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
