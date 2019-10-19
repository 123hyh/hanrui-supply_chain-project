<template>
  <!-- 大文本框 -->
  <el-input
    type="textarea"
    v-model="formModel[config['key']]"
    :disabled="formStatus ? true : config.disabled"
    :readonly="config.readonly"
  ></el-input>
</template>
<script>
export default {
  data: _ => ({
    styles: 'width: 160px'
  }),
  props: {
        formStatus:Boolean,

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
  }
};
</script>

