<script setup lang="ts">
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { ref } from "vue";
import * as Issue from "@/api/issue";

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

const ruleFormRef = ref<FormInstance>();
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
</script>

<template>
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
</template>

<style scoped></style>
