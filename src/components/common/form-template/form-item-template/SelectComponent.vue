<template>
  <!-- 下拉列表 -->
  <el-select
    :style='styles'
    filterable
    v-model="formModel[config['key']]"
    placeholder="请选择选项"
    :disabled=" formStatus ? true : config.disabled"
    :readonly="config.readonly"
    @change="$emit('selectChange',$event,config)"
  >
    <el-option
      v-for="option in config.selectOption"
      :key="option['itemValue']"
      :label="option['itemValue']"
      :value="option['itemKey']"
    ></el-option>
  </el-select>
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
  }
};
</script>

