<template>
  <div>
    <currencyinput
      :style="styles"
      v-model="formModel[config['key']]"
      :disabled="formStatus ? true : config.disabled"
      :readonly="config.readonly"
      :decimal="config.decimal"
      :symbol="config.symbol"
    ></currencyinput>
  </div>
</template>
<script>
import Currencyinput from "@/components/common/Currencyinput.vue";

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
  components: {
    Currencyinput
  }
}
</script>