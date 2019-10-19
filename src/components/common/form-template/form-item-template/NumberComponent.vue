<template>
  <!-- 数字类型输入框 -->
  <el-input-number
    class="el-input-number-item"
    v-model="formModel[config['key']]"
    :min='config.min'
    :max='config.max'
    :style='styles'
    autocomplete="off"
    :disabled="formStatus ? true : config.disabled"
    :readonly="config.readonly"
    :data-key="config.key"
    :controls='false'
  ></el-input-number>
 <!--   <el-input
  :style='styles'
    @blur="setNumber(config.key)"
    v-model="formModel[config['key']]"
    autocomplete="off"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :data-key="config.key"
  ></el-input> -->
</template>
<script>
export default {
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
    styles: {
      type: [Number, String],
      required: false
    }
  },
  methods: {
    setNumber (key) {
      if (!isNaN(+this.formModel[key])) {
        this.formModel[key] = +this.formModel[key];
      }
    }
  }
};
</script>
<style lang="less">
.el-input-number-item {
  .el-input__inner {
    text-align: start;
  }
}
</style>

