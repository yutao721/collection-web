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
const issueDetail = ref({
  total: 0,
  done: 0,
  unDone: 0
});

const getList = async () => {
  const { data } = await Issue.getIssueList();
  questList.value = data;
};

const getIssueDetail = async () => {
  const { data } = await Issue.getIssueDetail();
  issueDetail.value = data;
};

onMounted(() => {
  getList();
  getIssueDetail();
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
          <div class="items">
            <div class="item">
              <span class="item-num">v4.7.10</span>
              <span class="item-text">移动端版本</span>
            </div>
            <div class="item">
              <span class="item-num">v2.4</span>
              <span class="item-text">商家端版本</span>
            </div>
            <div class="item">
              <span class="item-num">{{ issueDetail.total }}</span>
              <span class="item-text">反馈问题数</span>
            </div>
            <div class="item">
              <span class="item-num">{{ issueDetail.done }}</span>
              <span class="item-text">已解决</span>
            </div>
            <div class="item">
              <span class="item-num">{{ issueDetail.unDone }}</span>
              <span class="item-text">未解决</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="h-[200px]">
          <template #header>
            <div class="card-header">
              <h4>测试版本数据</h4>
            </div>
          </template>
          <div class="items">
            <div class="item">
              <span class="item-num">v4.8.0</span>
              <span class="item-text">当前测试版本</span>
            </div>
            <div class="item">
              <span class="item-num">06-16</span>
              <span class="item-text">提测时间</span>
            </div>
            <div class="item">
              <span class="item-num">06-29</span>
              <span class="item-text">反馈问题数</span>
            </div>
          </div>
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
.items {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    &-num {
      margin-bottom: 10px;
      font-size: 18px;
      color: #000;
      font-weight: 600;
    }
  }
}
</style>
