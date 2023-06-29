<script setup lang="ts">
import { ref } from "vue";
// tableData数据，目前是伪造的json数据
import { tableData } from "./helper";
import dialogForm from "./components/presaleForm.vue";

const formDialogVisible = ref(false);
const type = ref(1);
const title = ref();

// 功能操作
const handleOperate = ({ id, name }) => {
  formDialogVisible.value = true;
  title.value = name;
  type.value = id;
};
</script>

<template>
  <div class="main">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="功能名称" />
      <el-table-column prop="desc" label="功能描述" />
      <el-table-column prop="typeString" label="类型" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleOperate(scope.row)"
          >
            操作
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <dialogForm
      v-model:visible="formDialogVisible"
      :type="type"
      :title="title"
    />
  </div>
</template>

<style scoped></style>
