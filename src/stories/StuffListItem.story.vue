<script setup lang="ts">
import { Timestamp } from "@firebase/firestore";
import StuffListItem from "../components/StuffListItem.vue";
import { reactive } from "vue";
import { logEvent } from "histoire/client";

const state = reactive({
  item: { name: "Item One Name Value", createdAt: new Date().toString(), id: "id-12345" },
});
</script>

<template>
  <Story title="StuffListItem" auto-props-disabled>
    <StuffListItem
      :item="{
        name: state.item.name,
        createdAt: Timestamp.fromDate(new Date(state.item.createdAt)),
        id: state.item.id,
      }"
      @on-delete="logEvent('on-delete', $event)"
    />
    <template #controls>
      <HstText v-model="state.item.name" title="Name" />
      <HstText v-model="state.item.createdAt" title="Created At" />
      <HstText v-model="state.item.id" title="ID" />
    </template>
  </Story>
</template>
