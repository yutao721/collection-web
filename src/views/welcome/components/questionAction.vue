<script setup lang="ts">
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { ref } from "vue";
import * as Issue from "@/api/issue";
import {
  QUESTIONTYPE_SELECTION_OPTION,
  PLATFORM_SELECTION_OPTION
} from "@/enums/issue";

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
