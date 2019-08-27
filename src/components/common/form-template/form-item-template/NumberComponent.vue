<template>
  <!-- 数字类型输入框 -->
  <el-input
  :style='styles'
    @blur="setNumber(config.key)"
    v-model="formModel[config['key']]"
    autocomplete="off"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :data-key="config.key"
  ></el-input>
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
  },
  methods: {
    setNumber(key) {
      if (!isNaN(+this.formModel[key])) {
        this.formModel[key] = +this.formModel[key];
      }
    }
  }
};
</script>

