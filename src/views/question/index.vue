<script setup lang="ts">
import { ref, computed } from "vue";
import * as Api from "@/api/issue";
import {
  QUESTIONTYPE_SELECTION_OPTION,
  PLATFORM_SELECTION_OPTION
} from "@/enums/issue";
import dayjs from "dayjs";

const tableData = ref();

// 获取问题列表
const getIssueList = async () => {
  const { data } = await Api.getIssueList();
  tableData.value = data;
};

const platformType = type => {
  return PLATFORM_SELECTION_OPTION.find(item => item.value == type)?.label;
};

const questionType = type => {
  return QUESTIONTYPE_SELECTION_OPTION.find(item => item.value == type)?.label;
};

const deleteRow = row => {};

// issue status change
const handleStatus = async (id, status) => {
  await Api.modifyIssueStatus(id, { status });
  await getIssueList();
};

getIssueList();
</script>

<template>
  <div class="main">
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="id" width="60" />
        <el-table-column prop="content" label="问题描述" />
        <el-table-column prop="platformType" label="所属平台">
          <template #default="scope">
            {{ platformType(scope.row.platformType) }}
          </template>
        </el-table-column>
        <el-table-column prop="questionType" label="问题类型">
          <template #default="scope">
            {{ questionType(scope.row.questionType) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            {{
              scope.row.status == 0
                ? "未解决"
                : scope.row.status == 1
                ? "已解决"
                : "被否决"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template #default="scope">
            {{ dayjs(scope.row.createTime).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope.row)"
            >
              删除
            </el-button>
            <el-button
              type="success"
              size="small"
              @click.prevent="handleStatus(scope.row.id, 1)"
            >
              解决
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click.prevent="handleStatus(scope.row.id, 2)"
            >
              否决
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped></style>
