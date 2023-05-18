<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="fun-container">
    <ul class="flex-ac">
      <li class="item flex-c">
        <span class="item-icon">
          <IconifyIconOffline
            icon="homeFilled"
            style="width: 100%; height: 100%; color: blueviolet"
          />
        </span>
        <span class="item-text">问题反馈</span>
      </li>
      <li class="item flex-c">
        <span class="item-icon">
          <IconifyIconOffline
            icon="informationLine"
            style="width: 100%; height: 100%; color: blueviolet"
          />
        </span>
        <span class="item-text">域名集合</span>
      </li>
      <li class="item flex-c">
        <span class="item-icon">
          <IconifyIconOffline
            icon="lollipop"
            style="width: 100%; height: 100%; color: blueviolet"
          />
        </span>
        <span class="item-text">数据创建</span>
      </li>
      <li class="item flex-c">
        <span class="item-icon">
          <IconifyIconOffline
            icon="Monitor"
            style="width: 100%; height: 100%; color: blueviolet"
          />
        </span>
        <span class="item-text">安装管理</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.item {
  flex-direction: column;
  .item-icon {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  .item-text {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
}
</style>
