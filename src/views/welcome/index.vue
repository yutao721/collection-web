<script setup lang="ts">
import { ref } from "vue";
import * as Issue from "@/api/issue";
import { onMounted } from "vue";
import { FormInstance } from "element-plus";
import { message } from "@/utils/message";
import questionList from "./questionList.vue";
import func from "./func.vue";

defineOptions({
  name: "Welcome"
});
const QUESTIONTYPE_SELECTION_OPTION = [
  { label: "需求任务", value: 1 },
  { label: "问题反馈", value: 2 },
  { label: "其他", value: 0 }
];

const PLATFORM_SELECTION_OPTION = [
  { label: "IOS", value: 1 },
  { label: "安卓", value: 2 },
  { label: "小程序", value: 3 },
  { label: "服务端", value: 4 },
  { label: "商家端", value: 5 },
  { label: "运营管理后台", value: 6 },
  { label: "PC端", value: 7 },
  { label: "H5端", value: 8 },
  { label: "未知", value: 0 }
];

const formData = ref({
  questionType: "",
  platformType: "",
  content: ""
});

const questList = ref<Issue.queryIssue[]>([]);

const ruleFormRef = ref<FormInstance>();

const getList = async () => {
  const { data } = await Issue.getIssueList();
  questList.value = data;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      await Issue.postIssue(formData.value);
      message("提交成功", { type: "success" });
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
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
          <el-form ref="ruleFormRef" :model="formData" label-width="100px">
            <el-form-item label="提交类型：" prop="questionType">
              <el-select
                v-model="formData.questionType"
                placeholder="提交类型"
                style="width: 240px"
              >
                <el-option
                  v-for="item in QUESTIONTYPE_SELECTION_OPTION"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="问题涉及端：" prop="platformType">
              <el-select
                v-model="formData.platformType"
                placeholder="请选择"
                style="width: 240px"
              >
                <el-option
                  v-for="item in PLATFORM_SELECTION_OPTION"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="问题描述：" prop="content">
              <el-input
                type="textarea"
                :rows="4"
                show-word-limit
                :maxlength="300"
                v-model="formData.content"
                placeholder="请输入问题描述"
              />
            </el-form-item>
            <div class="flex-c">
              <el-button>钉钉通知</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >提交</el-button
              >
            </div>
          </el-form>
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
