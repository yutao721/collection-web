<script setup lang="ts">
import { queryIssue } from "@/api/issue";
import { ref, computed } from "vue";
import dayjs from "dayjs";

import { PLATFORM_SELECTION_OPTION } from "@/enums/issue";

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

const platfrom = platformType => {
  return (
    PLATFORM_SELECTION_OPTION.find(item => item.value == platformType)?.label ||
    "未知"
  );
};
</script>

<template>
  <div>
    <ul class="lists">
      <li class="list" v-for="(item, index) in props.list" :key="item.id">
        <span class="list-time">
          {{ dayjs(item.createTime).format("YYYY-MM-DD") }}
        </span>
        <span class="list-platfrom">{{ platfrom(item.platformType) }}</span>
        <span class="list-content">{{ item.content }}</span>
        <span class="list-status" :class="item.status ? 'done' : 'fail'">{{
          status(item.status)
        }}</span>
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
    width: 514px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    margin-left: 10px;
  }
  &-status {
    margin-left: auto;
    font-size: 14px;
    &.done {
      color: #09b288;
    }
    &.fail {
      color: #e90808;
    }
  }
  .list-platfrom {
    text-align: center;
    width: 116px;
    padding: 0 10px;
    color: #09afb2;
  }
}
</style>
