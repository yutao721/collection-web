<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { add, edit } from "@/api/dataSource";
import {
  SELECT_OPTIONS,
  SELECT_TWO_OPTIONS,
  SELECT_THREE_OPTIONS
} from "../enums";

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
  // params.B = 1;
  // params.C = 1;
  console.log(params);
  if (props.isEdit) {
    params.id = props.id;
    await edit(params);
  } else {
    await add(params);
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
  // name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="props.isEdit ? '编辑数据' : '添加数据'"
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
      <el-form-item label="一级分类" prop="A">
        <el-select v-model="formData.A" clearable :style="{ width: '480px' }">
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
      <el-form-item label="二级分类" prop="B">
        <el-select v-model="formData.B" clearable :style="{ width: '480px' }">
          <el-option
            v-for="(item, index) in SELECT_TWO_OPTIONS"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" prop="C">
        <el-select v-model="formData.C" clearable :style="{ width: '480px' }">
          <el-option
            v-for="(item, index) in SELECT_THREE_OPTIONS"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="D">
        <el-input
          v-model="formData.D"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="备注" prop="E">
        <el-input
          v-model="formData.E"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-form-item label="是否自定义" prop="F">
        <el-radio-group v-model="formData.F">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
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
