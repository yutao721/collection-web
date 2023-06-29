<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { patchVersion, postVersion, queryVersion } from "@/api/version";

const props = defineProps({
  // 弹窗显示
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  },
  // 是否为编辑状态
  isEdit: {
    type: Boolean,
    default: false
  },

  id: {
    type: Number,
    default: 0
  }
});

const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);
const formData = ref(props.data);
const title = ref(props.isEdit ? "编辑" : "新建");

const emit = defineEmits(["update:visible", "complete"]);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      await submitFormApi();
      message("提交成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
      emit("complete");
    }
  });
};

// 创建
const submitFormApi = async () => {
  const params = formData.value;
  if (props.isEdit) {
    await patchVersion(props.id, params);
  } else {
    await postVersion(params);
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(ruleFormRef.value);
};

watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);

watch(
  () => props.data,
  val => {
    formData.value = val;
  }
);

watch(
  () => props.id,
  async val => {
    // @ts-ignore
    const { data } = await queryVersion(val);
    formData.value = data;
  }
);

const rules = {
  name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="title"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="版本名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="版本名称"
        />
      </el-form-item>
      <el-form-item label="是否完结" prop="isDone">
        <el-radio-group v-model="formData.isDone">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否逾期" prop="isOverdue">
        <el-radio-group v-model="formData.isOverdue">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="版本描述" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入版本描述"
        />
      </el-form-item>
      <el-form-item label="产品需求" prop="productSrc">
        <el-input
          v-model="formData.productSrc"
          :style="{ width: '480px' }"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="UI地址" prop="uiSrc">
        <el-input
          v-model="formData.uiSrc"
          :style="{ width: '480px' }"
          placeholder="请输入UI地址"
        />
      </el-form-item>
      <el-form-item label="测试用例" prop="testCaseSrc">
        <el-input
          v-model="formData.testCaseSrc"
          :style="{ width: '480px' }"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="formData.startTime"
          type="datetime"
          placeholder="开始时间"
        />
      </el-form-item>
      <el-form-item label="提测时间" prop="testTime">
        <el-date-picker
          v-model="formData.testTime"
          type="datetime"
          placeholder="提测时间"
        />
      </el-form-item>
      <el-form-item label="上线时间" prop="completeTime">
        <el-date-picker
          v-model="formData.completeTime"
          type="datetime"
          placeholder="上线时间"
        />
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input
          v-model="formData.mark"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
