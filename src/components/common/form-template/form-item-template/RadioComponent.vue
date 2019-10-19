<template>
  <div>
   <!--  <el-radio
      v-model="formModel[config['key']]"
      :style='styles'
      :label="config.label"
      :disabled="config.disabled"
    ></el-radio> -->
    <el-radio-group
      v-model="formModel[config['key']]"
      :style='styles'
    >
      <el-radio
        v-for="item of config.radioOption"
        :key="item.label"
        :label="item.label"
      >{{item.name}}</el-radio>
    </el-radio-group>
  </div>

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
}
</script>