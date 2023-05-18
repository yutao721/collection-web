<script setup lang="ts">
import { queryIssue } from "@/api/issue";
import { ref } from "vue";
import dayjs from "dayjs";
import { computed } from "vue";

const props = defineProps({
  list: Array<queryIssue>,
  default: () => {
    return [];
  }
});

const status = computed(() => {
  let str = "";
  return status => {
    switch (status) {
      case 0:
        str = "未解决";
        break;
      case 1:
        str = "已解决";
        break;
      case 2:
        str = "被否决";
        break;
    }
    return str;
  };
});
</script>

<template>
  <div>
    <ul class="lists">
      <li class="list" v-for="(item, index) in props.list" :key="item.id">
        <span class="list-time">{{
          dayjs(item.createTime).format("YYYY-MM-DD")
        }}</span>
        <span class="list-content">{{ item.content }}</span>
        <span class="list-status">{{ status(item.status) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.lists {
  height: 92px;
  overflow: hidden;
}
.list {
  display: flex;
  align-items: center;
  &-time {
    color: #999;
  }
  &-content {
    color: #333;
    margin-left: 10px;
  }
  &-status {
    margin-left: auto;
    font-size: 14px;
  }
}
</style>
