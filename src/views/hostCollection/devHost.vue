<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Card from "./components/Card.vue";
import { deleteCollection, getCollectionList } from "@/api/collection";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import dialogForm from "./components/DialogForm.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "ListCard"
});

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const INITIAL_DATA = {
  name: "",
  isSetup: 1,
  description: "",
  type: 1,
  content: "",
  openUrl: ""
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });
const productList = ref([]);
const dataLoading = ref(true);
const isEdit = ref(false);
const formDataId = ref();
const type = ref();

const handleOpen = () => {
  formDialogVisible.value = true;
  isEdit.value = false;
};

// 获取列表
const getCardListData = async (query?: object) => {
  console.log(query);
  try {
    const { data } = await getCollectionList(query);
    productList.value = data;
    pagination.value = {
      ...pagination.value,
      total: data.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCardListData();
});

const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchValue = ref("");

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
const handleDeleteItem = product => {
  ElMessageBox.confirm(
    product
      ? `确认删除后${product.name}的所有产品信息将被清空, 且无法恢复`
      : "",
    "提示",
    {
      type: "warning"
    }
  )
    .then(async () => {
      await deleteCollection(product.id);
      await message("删除成功", { type: "success" });
      await getCardListData();
    })
    .catch(() => {});
};
const handleManageProduct = product => {
  formDialogVisible.value = true;
  isEdit.value = true;
  nextTick(() => {
    const { name, content, description, isSetup, type, openUrl, id } = product;
    formData.value = { name, content, description, isSetup, type, openUrl };
    formDataId.value = id;
  });
};

const handleSwitchTab = async (type: number | string) => {
  console.log(type);
  getCardListData({ type });
};
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button :icon="useRenderIcon(AddFill)" @click="handleOpen()">
        新建
      </el-button>
      <el-input
        style="width: 300px"
        v-model="searchValue"
        placeholder="请输入名称"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              :icon="Search"
            />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div class="mb-4">
      <el-radio-group v-model="type" @change="handleSwitchTab">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button :label="1">测试环境</el-radio-button>
        <el-radio-button :label="2">正式环境</el-radio-button>
      </el-radio-group>
    </div>
    <div
      v-loading="dataLoading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-empty
        description="暂无数据"
        v-show="
          productList
            .slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current
            )
            .filter(v =>
              v.name.toLowerCase().includes(searchValue.toLowerCase())
            ).length === 0
        "
      />
      <template v-if="pagination.total > 0">
        <el-row :gutter="16">
          <el-col
            v-for="(product, index) in productList
              .slice(
                pagination.pageSize * (pagination.current - 1),
                pagination.pageSize * pagination.current
              )
              .filter(v =>
                v.name.toLowerCase().includes(searchValue.toLowerCase())
              )"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <Card
              :product="product"
              @delete-item="handleDeleteItem"
              @manage-product="handleManageProduct"
            />
          </el-col>
        </el-row>
        <el-pagination
          class="float-right"
          v-model:currentPage="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[12, 24, 36]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </template>
    </div>
    <dialogForm
      v-model:visible="formDialogVisible"
      :data="formData"
      :isEdit="isEdit"
      :id="formDataId"
      @complete="getCardListData"
    />
  </div>
</template>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
