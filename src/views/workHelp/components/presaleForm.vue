<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import * as Api from "@/api/workHelp";

const props = defineProps({
  // 弹窗显示
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    default: ""
  }
});

const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);
const formData = ref({
  Status: 10,
  Anount: "",
  lasttime: "",
  createNum: 1,
  isCreate: 1,
  ActiveTime: "",
  "last-Anount": ""
});

// 新物赏Form 表单
const formLotteryData = ref({
  Price: "",
  Anum: 1,
  Bnum: 1,
  Cnum: 1,
  Dnum: 1,
  Enum: 1,
  Fnum: 1
});

// 分享拉新
const formShareData = ref({
  user_id: "",
  Inumber: 1
});

// 删除用户
const formUserData = ref({
  User_id: ""
});

const createPictureFormData = ref({
  type: "jpg",
  size: ""
});

const emit = defineEmits(["update:visible", "complete"]);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      const data = await submitFormApi();
      console.log(data);
      message("提交成功", { type: "success" });
      formVisible.value = false;
      resetForm(formEl);
      emit("complete");
    }
  });
};

// 创建
const submitFormApi = async () => {
  const type = props.type;
  let params;
  let url;
  switch (type) {
    // 创建项目
    case 1:
      params = formData.value;
      delete params["ActiveTime"];
      delete params["last-Anount"];
      url = "CreataProject";
      break;
    // 创建电子票
    case 2:
      params = formData.value;
      delete params["ActiveTime"];
      url = "TicketProjectCreate";
      break;
    case 3:
      // 创建团购
      params = formData.value;
      delete params["ActiveTime"];
      url = "GroupBuycreate";
      break;
    case 4:
      // 创建新物赏
      params = formLotteryData.value;
      url = "LotteryCreat";
      break;
    case 5:
      // 拉新活动
      params = formShareData.value;
      url = "inviteActive";
      break;
    case 7:
      // 删除用户
      params = formUserData.value;
      url = "deleteUser";
      break;
    case 8:
      // 创建图片
      params = createPictureFormData.value;
      url = "createPicture";
      break;
  }
  console.log(params);
  await Api[url](params);
};

// 重置表单
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

const rules = {
  name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :width="800"
    :title="title"
    draggable
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      v-if="props.type <= 3"
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="300px"
    >
      <el-form-item label="项目状态：" prop="Status">
        <el-radio-group v-model="formData.Status">
          <el-radio :label="10">预售中</el-radio>
          <el-radio :label="15">待开始</el-radio>
          <el-radio :label="16" v-if="props.type == 1">创意</el-radio>
          <el-radio :label="17">预热</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目成功需达到的目标金额：" prop="Anount">
        <el-input
          v-model="formData.Anount"
          :style="{ width: '280px' }"
          placeholder="目标金额"
        />
      </el-form-item>
      <el-form-item label="距离下次项目状态切换时间：" prop="lasttime">
        <el-input
          v-model="formData.lasttime"
          :style="{ width: '280px' }"
          placeholder="单位为小时H"
        />
      </el-form-item>
      <el-form-item
        label="活动持续时间(验票次数=X//8)："
        prop="ActiveTime"
        v-if="props.type == 2"
      >
        <el-input
          v-model="formData.ActiveTime"
          :style="{ width: '280px' }"
          placeholder="单位为小时H"
        />
      </el-form-item>

      <el-form-item
        label="新物赏活动的全网底价："
        prop="last-Anount"
        v-if="props.type == 3"
      >
        <el-input
          v-model="formData['last-Anount']"
          :style="{ width: '280px' }"
          placeholder="单位为小时H"
        />
      </el-form-item>

      <el-form-item label="创建数量：" prop="createNum">
        <el-radio-group v-model="formData.createNum">
          <el-radio :label="1">单个</el-radio>
          <el-radio :label="2">多个</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="是否创建回报档："
        prop="isCreate"
        v-if="props.type != 2"
      >
        <el-radio-group v-model="formData.isCreate">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!-- 新物赏表单 -->
    <el-form
      v-if="props.type == 4"
      ref="ruleFormRef"
      :model="formLotteryData"
      :rules="rules"
      label-width="300px"
    >
      <el-form-item label="单抽价格：" prop="Price">
        <el-input
          v-model="formLotteryData.Price"
          :style="{ width: '280px' }"
          placeholder="单次抽奖的价格"
        />
      </el-form-item>

      <el-form-item label="A赏库存：" prop="Anum">
        <el-input-number v-model="formLotteryData.Anum" />
      </el-form-item>

      <el-form-item label="B赏库存：" prop="Bnum">
        <el-input-number v-model="formLotteryData.Bnum" />
      </el-form-item>

      <el-form-item label="C赏库存：" prop="Cnum">
        <el-input-number v-model="formLotteryData.Cnum" />
      </el-form-item>

      <el-form-item label="D赏库存：" prop="Dnum">
        <el-input-number v-model="formLotteryData.Dnum" />
      </el-form-item>

      <el-form-item label="E赏库存：" prop="Enum">
        <el-input-number v-model="formLotteryData.Enum" />
      </el-form-item>

      <el-form-item label="F赏库存：" prop="Fnum">
        <el-input-number v-model="formLotteryData.Fnum" />
      </el-form-item>

      <div class="tips">
        注：赏品的库存决定了赏品抽中的概率，例：A赏概率=A赏当前数量/当前剩余总数
      </div>
    </el-form>

    <!-- 拉新用户表单 -->
    <el-form
      v-if="props.type == 5"
      ref="ruleFormRef"
      :model="formShareData"
      :rules="rules"
      label-width="300px"
    >
      <el-form-item label="邀请人ID：" prop="user_id">
        <el-input
          v-model="formShareData.user_id"
          :style="{ width: '280px' }"
          placeholder="邀请发起人的user_id"
        />
      </el-form-item>

      <el-form-item label="邀请人数：" prop="Inumber">
        <el-select v-model="formShareData.Inumber" placeholder="邀请人数">
          <el-option :key="1" label="1人" :value="1" />
          <el-option :key="6" label="6人" :value="6" />
          <el-option :key="12" label="12人" :value="12" />
          <el-option :key="66" label="66人" :value="66" />
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 删除老用户，生成新用户 -->
    <el-form
      v-if="props.type == 7"
      ref="ruleFormRef"
      :model="formUserData"
      :rules="rules"
      label-width="300px"
    >
      <el-form-item label="删除用户的id：" prop="User_id">
        <el-input
          v-model="formUserData.User_id"
          :style="{ width: '280px' }"
          placeholder="删除用户的id"
        />
      </el-form-item>
      <div class="tips">
        注：删除用户将会删除用户相关信息，比如订单，优惠券等等
      </div>
    </el-form>

    <!-- 生成图片 -->
    <el-form
      v-if="props.type == 8"
      ref="ruleFormRef"
      :model="createPictureFormData"
      label-width="300px"
    >
      <el-form-item label="图片类型" prop="type">
        <el-radio-group v-model="createPictureFormData.type">
          <el-radio :label="'jpg'">JPG</el-radio>
          <el-radio :label="'png'">PNG</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片大小" prop="size">
        <el-input
          v-model="createPictureFormData.size"
          :style="{ width: '280px' }"
          placeholder="请输入定制图片大小,单位k/m/g"
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

<style scoped lang="scss">
.tips {
  margin-left: 220px;
  color: #f60;
}
</style>
