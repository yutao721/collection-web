<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { patchCollection, postCollection } from "@/api/collection";

const SELECT_OPTIONS = [
  { label: "测试环境", value: 1 },
  { label: "正式环境", value: 2 },
  { label: "未知", value: 0 }
];

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

// 创建域名集合
const submitFormApi = async () => {
  const params = formData.value;
  console.log(params);
  if (props.isEdit) {
    await patchCollection(props.id, params);
  } else {
    await postCollection(params);
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

const rules = {
  name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="新建产品"
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
      <el-form-item label="产品名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="请输入产品名称"
        />
      </el-form-item>
      <el-form-item label="产品状态" prop="isSetup">
        <el-radio-group v-model="formData.isSetup">
          <el-radio :label="0">已停用</el-radio>
          <el-radio :label="1">已启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="产品描述" prop="description">
        <el-input
          v-model="formData.description"
          :style="{ width: '480px' }"
          placeholder="请输入产品描述"
        />
      </el-form-item>
      <el-form-item label="打开地址" prop="openUrl">
        <el-input
          v-model="formData.openUrl"
          :style="{ width: '480px' }"
          placeholder="请输入打开地址"
        />
      </el-form-item>
      <el-form-item label="产品环境" prop="type">
        <el-select
          v-model="formData.type"
          clearable
          :style="{ width: '480px' }"
        >
          <el-option
            v-for="(item, index) in SELECT_OPTIONS"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input
          v-model="formData.content"
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
