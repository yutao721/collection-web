<script setup lang="ts">
import { ref, computed } from "vue";
import dialogForm from "./components/DialogForm.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import * as Api from "@/api/dataSource";
import { message } from "@/utils/message";
import {
  SELECT_OPTIONS,
  SELECT_TWO_OPTIONS,
  SELECT_THREE_OPTIONS
} from "./enums";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();

const tableData = ref();
const formDialogVisible = ref(false);
const isEdit = ref(false);
const id = ref();
const editData = ref();

const handleOpen = () => {
  formDialogVisible.value = true;
};

const getListData = async () => {
  const data = await Api.getList();
  tableData.value = data;
};

const deleteRow = async id => {
  console.log(id);
  await Api.del({ id });
  message("删除成功", { type: "success" });
  getListData();
};

const handleModify = row => {
  isEdit.value = true;
  formDialogVisible.value = true;
  const { Custom, First, Second, Third, content, remark, ID } = row;
  id.value = ID;
  editData.value = {
    A: First,
    B: Second,
    C: Third,
    D: content,
    E: remark,
    F: Custom
  };
};

const FirstComputed = computed(() => {
  return value => {
    return SELECT_OPTIONS.find(item => item.value == value).label;
  };
});
const SecondComputed = computed(() => {
  return value => {
    return SELECT_TWO_OPTIONS.find(item => item.value == value).label;
  };
});
const ThirdComputed = computed(() => {
  return value => {
    return SELECT_THREE_OPTIONS.find(item => item.value == value).label;
  };
});

const handleCopy = async value => {
  try {
    await toClipboard(value);
    message("复制成功", { type: "success" });
  } catch (e) {
    message("您的浏览器不支持复制：", { type: "error" });
  }
};

getListData();
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <el-button :icon="useRenderIcon(AddFill)" @click="handleOpen()">
        新建
      </el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ID" label="id" width="60" />
        <el-table-column prop="First" label="一级分类">
          <template #default="scope">
            {{ FirstComputed(scope.row.First) }}
          </template>
        </el-table-column>
        <el-table-column prop="Second" label="二级分类">
          <template #default="scope">
            {{ SecondComputed(scope.row.Second) }}
          </template>
        </el-table-column>
        <el-table-column prop="Third" label="三级分类">
          <template #default="scope">
            {{ ThirdComputed(scope.row.Third) }}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="Custom" label="是否自定义">
          <template #default="scope">
            {{ scope.row.Custom == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="success"
              size="small"
              @click.prevent="handleCopy(scope.row.content)"
            >
              复制
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click.prevent="handleModify(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="scope.row.Custom == 2"
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope.row.ID)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <dialogForm
      v-model:visible="formDialogVisible"
      :isEdit="isEdit"
      :id="id"
      :data="editData"
      @complete="getListData"
    />
  </div>
</template>

<style scoped></style>
