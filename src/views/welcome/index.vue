<script setup lang="ts">
import { ref } from "vue";
import * as Issue from "@/api/issue";
import { onMounted } from "vue";
import questionList from "./components/questionList.vue";
import func from "./components/func.vue";
import questionAction from "./components/questionAction.vue";

defineOptions({
  name: "Welcome"
});

const questList = ref<Issue.queryIssue[]>([]);

const getList = async () => {
  const { data } = await Issue.getIssueList();
  questList.value = data;
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="main">
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card class="h-[200px]">
          <template #header>
            <div class="card-header">
              <h4>常用功能</h4>
            </div>
          </template>
          <func></func>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="h-[200px]">
          <template #header>
            <div class="card-header">
              <h4>最新反馈</h4>
            </div>
          </template>
          <questionList :list="questList"></questionList>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="12">
        <el-card class="h-[200px]">
          <template #header>
            <div class="card-header">
              <h4>线上版本数据</h4>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="h-[200px]">
          <template #header>
            <div class="card-header">
              <h4>测试版本数据</h4>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="h-[420px]">
          <template #header>
            <div class="card-header">
              <h4>新物集任务/反馈</h4>
            </div>
          </template>
          <questionAction></questionAction>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
