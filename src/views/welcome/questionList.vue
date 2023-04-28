<script setup lang="ts">
import { queryIssue } from "@/api/issue";
import { ref } from "vue";

const props = defineProps({
  list: Array<queryIssue>,
  default: () => {
    return [];
  }
});
</script>

<template>
  <div>
    <ul>
      <li class="li" v-for="(item, index) in props.list" :key="item.id">
        <span>{{ item.createTime }}</span>
        <span>{{ item.content }}</span>
        <span>{{ item.status }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
