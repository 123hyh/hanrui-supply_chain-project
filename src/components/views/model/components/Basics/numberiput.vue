<template>
  <el-input v-model="data" :disabled="disabled" :readonly="readonly" :placeholder="placeholder" @blur="onBlur">
    <slot name="append" slot="append"></slot>
    <slot name="prepend" slot="prepend"></slot>
  </el-input>
</template>

<script>
export default {
  props: {
    placeholder:{
      type: String,
      default: '请录入',
      desc: "提示"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: 0,
      desc: "数值"
    },
    decimal: {
      type: Number,
      default: 4,
      desc: "小数位"
    },
  },
  data() {
    return {
      data:'',
    };
  },
  methods: {
    // 显示指定格式
    getVal(value){
      if(!value){
        this.data = ''
      }else{
        this.data = value.toString()
      }
    },
    // 文本框失去焦点
    onBlur() {
      let num = parseFloat(parseFloat(this.data).toFixed(this.decimal))
      if(num == this.value){
        this.getVal(num)
      }else{
        this.$emit("input", num)
      }
    },
  },
  watch:{
    value: {
      handler(newVal, oldVal) {
        this.getVal(newVal)
      },
      immediate: true
    },
  },
  created(){
  }
};
</script>
<style scoped>
</style>
