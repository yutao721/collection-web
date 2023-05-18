<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { deleteVersion, getVersionList } from "@/api/version";
import { message } from "@/utils/message";
import dialogForm from "./components/DialogForm.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";
import dayjs from "dayjs";

const INITIAL_DATA = {
  name: "4.6.2版本",
  description: "4.6.2版本描述",
  mark: "4.6.2版本备注",
  uiSrc: "4.6.2版本",
  testCaseSrc: "4.6.2版本描述",
  productSrc: "4.6.2版本描述",
  isDone: 1,
  isOverdue: 0,
  startTime: "2022-02-03 12:00:00",
  testTime: "2022-02-03 12:00:00",
  completeTime: "2022-02-03 12:00:00"
};

const tableData = ref([]);
const searchValue = ref("");
const formDialogVisible = ref(false);
const isEdit = ref(false);
const formData = ref({ ...INITIAL_DATA });
const formDataId = ref();

const handleOpen = () => {
  formDialogVisible.value = true;
  isEdit.value = false;
};

const getList = async () => {
  const { data } = await getVersionList();
  tableData.value = data;
};

const deleteRow = async ({ id }) => {
  console.log(id);
  await deleteVersion(id);
  message("删除成功", { type: "success" });
};

const editRow = async ({ id }) => {
  formDialogVisible.value = true;
  formDataId.value = id;
  isEdit.value = true;
};

onMounted(() => {
  getList();
});
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
        placeholder="请输入"
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
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" width="60" />
        <el-table-column prop="name" label="版本名称" />
        <el-table-column prop="description" label="版本描述" />
        <el-table-column prop="isDone" label="是否完结" />
        <el-table-column prop="isOverdue" label="是否逾期" />
        <el-table-column prop="startTime" label="开始时间">
          <template #default="scope">
            {{ dayjs(scope.row.startTime).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="testTime" label="提测时间">
          <template #default="scope">
            {{ dayjs(scope.row.testTime).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="completeTime" label="上线时间">
          <template #default="scope">
            {{ dayjs(scope.row.completeTime).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click.prevent="editRow(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialogForm
      v-model:visible="formDialogVisible"
      :data="formData"
      :isEdit="isEdit"
      :id="formDataId"
    />
  </div>
</template>

<style scoped></style>
