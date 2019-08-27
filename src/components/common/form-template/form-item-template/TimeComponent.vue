<template>
  <!-- 时间选择 -->
  <el-date-picker
    :style="styles"
    value-format="yyyy-MM-dd HH:mm:ss"
    v-model="formModel[config['key']]"
    type="datetime"
    placeholder="选择日期时间"
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

