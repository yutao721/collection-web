<script setup lang="ts">
import { computed, PropType } from "vue";
import shopIcon from "@/assets/svg/shop.svg?component";
import laptopIcon from "@/assets/svg/laptop.svg?component";
import serviceIcon from "@/assets/svg/service.svg?component";
import calendarIcon from "@/assets/svg/calendar.svg?component";
import userAvatarIcon from "@/assets/svg/user_avatar.svg?component";
import More2Fill from "@iconify-icons/ri/more-2-fill";

defineOptions({
  name: "ReCard"
});

interface CardProductType {
  type: number;
  isSetup: boolean;
  description: string;
  name: string;
  content?: string;
  openUrl?: string;
}

const props = defineProps({
  product: {
    type: Object as PropType<CardProductType>
  }
});

const emit = defineEmits(["manage-product", "delete-item"]);

const handleClickManage = (product: CardProductType) => {
  emit("manage-product", product);
};

const handleClickDelete = (product: CardProductType) => {
  emit("delete-item", product);
};

const cardClass = computed(() => [
  "list-card-item",
  { "list-card-item__disabled": !props.product.isSetup }
]);

const cardLogoClass = computed(() => [
  "list-card-item_detail--logo",
  { "list-card-item_detail--logo__disabled": !props.product.isSetup }
]);

const handleOpen = async e => {
  console.log(e);
  const url = props.product.openUrl;
  if (url) {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      window.open(props.product.openUrl, "_blank");
    } else {
      window.open("http://" + props.product.openUrl, "_blank");
    }
  }
};
</script>

<template>
  <div :class="cardClass">
    <div
      class="list-card-item_detail bg-bg_color"
      @click.capture="handleOpen($event)"
    >
      <el-row justify="space-between">
        <div :class="cardLogoClass">
          <span v-if="product.type == 1">测试</span>
          <span v-if="product.type == 2">正式</span>
          <span v-if="product.type == 3">未知</span>
        </div>
        <div class="list-card-item_detail--operation">
          <el-tag
            :color="product.isSetup ? '#00a870' : '#eee'"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            {{ product.isSetup ? "已启用" : "已停用" }}
          </el-tag>
          <el-dropdown>
            <IconifyIconOffline :icon="More2Fill" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu :disabled="!product.isSetup">
                <el-dropdown-item @click="handleClickManage(product)">
                  编辑
                </el-dropdown-item>
                <el-dropdown-item @click="handleClickDelete(product)">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ product.name }}
      </p>
      <p class="list-card-item_detail--desc text-text_color_regular">
        {{ product.description }}
      </p>
      <span class="content">
        {{ product.content }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-card-item {
  height: 270px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;

  &_detail {
    flex: 1;
    padding: 24px;
    min-height: 140px;

    &--logo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e0ebff;
      font-size: 16px;
      color: #0052d9;

      &__disabled {
        color: #a1c4ff;
      }
    }

    &--operation {
      display: flex;
      height: 100%;

      &--tag {
        border: 0;
      }
    }

    &--name {
      margin: 24px 0 8px 0;
      font-size: 16px;
      font-weight: 400;
    }

    &--desc {
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 24px;
      height: 40px;
      word-break: break-all;
    }
  }

  &__disabled {
    .list-card-item_detail--name,
    .list-card-item_detail--desc {
      color: var(--el-text-color-disabled);
    }

    .list-card-item_detail--operation--tag {
      color: #bababa;
    }
  }

  .content {
    color: #333;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
  }
}
</style>
