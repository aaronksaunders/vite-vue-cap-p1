<script setup lang="ts">
import { Timestamp } from "@firebase/firestore";
import { ref } from "vue";

defineProps<{ item: { name: string; createdAt: Timestamp; id: string } }>();
const emit = defineEmits<{
  (event: "on-delete", id: string): void;
}>();
</script>

<template>
  <h2>{{ item.name }}</h2>
  <h4 >{{ item.createdAt.toDate() }}</h4>
  <h5>{{ item.id }}</h5>
  <button @click="emit('on-delete', item.id)">DELETE ITEM</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
