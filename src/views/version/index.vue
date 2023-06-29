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
  name: "",
  description: "",
  mark: "",
  uiSrc: "",
  testCaseSrc: "",
  productSrc: "4.6.2版本描述",
  isDone: 1,
  isOverdue: 0,
  startTime: "",
  testTime: "",
  completeTime: ""
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
  console.log(searchValue.value);
  const { data } = await getVersionList({ name: searchValue.value });
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

const formatTime = time => {
  if (time) {
    return dayjs(time).format("YYYY-MM-DD");
  } else {
    return "/";
  }
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
      <div>
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
        <el-button type="primary" class="ml-2" @click="getList">搜索</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" width="60" />
        <el-table-column prop="name" label="版本名称" />
        <el-table-column
          prop="description"
          label="版本描述"
          show-overflow-tooltip
        />
        <el-table-column prop="mark" label="备注" show-overflow-tooltip />
        <el-table-column prop="isDone" label="是否完结">
          <template #default="scope">
            {{ scope.row.isDone ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="isOverdue" label="是否逾期">
          <template #default="scope">
            {{ scope.row.isOverdue ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间">
          <template #default="scope">
            {{ formatTime(scope.row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="testTime" label="提测时间">
          <template #default="scope">
            {{ formatTime(scope.row.testTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="completeTime" label="上线时间">
          <template #default="scope">
            {{ formatTime(scope.row.completeTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
      @complete="getList"
      :data="formData"
      :isEdit="isEdit"
      :id="formDataId"
    />
  </div>
</template>

<style scoped></style>
