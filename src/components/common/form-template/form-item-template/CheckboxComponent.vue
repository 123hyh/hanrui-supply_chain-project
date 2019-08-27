<template>
  <!-- 多选框 -->
  <el-checkbox
  :style="styles"
    v-model="formModel[config['key']]"
    :disabled="config.disabled"
    :readonly="config.readonly"
  ></el-checkbox>
</template>
<script>
export default {
  props: {
    // form 实体
    formModel: {
      type: Object,
      required: true
    },
    // 当前 渲染模版 的 配置
    config: {
      type: Object,
      required: true
    },
    styles: {
      type: [Number, String],
      required: false
    }
  }
};
</script>

