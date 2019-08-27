<template>
  <!-- 日期选择 -->
  <el-date-picker
  :style="styles"
    value-format="yyyy-MM-dd HH:mm:ss"
    v-model="formModel[config['key']]"
    type="date"
    placeholder="选择日期"
    :disabled="config.disabled"
    :readonly="config.readonly"
  ></el-date-picker>
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

