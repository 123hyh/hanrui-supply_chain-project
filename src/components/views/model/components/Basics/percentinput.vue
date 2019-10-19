<template>
  <el-input v-model="data" :disabled="disabled" :readonly="readonly" :placeholder="placeholder" @input.native="updatevalue($event)" @focus="selectAll" @blur="onBlur">
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
    }
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    // 文本框获得焦点
    selectAll(event) {
      this.data = this.value;
      setTimeout(() => {
        event.target.select(); //保留原生事件
      }, 0);
    },
    // 文本框失去焦点
    onBlur() {
      let num = parseFloat(accounting.unformat(this.data).toFixed(this.decimal));
      if (num == this.value) {
        this.getVal(num);
      } else {
        this.$emit("input", num);
      }
    },
    // 文本框内容更改时
    updatevalue(event) {
    },
    // 显示指定格式
    getVal(num) {
      if (num) {
        this.data = (num * 100).toFixed(this.decimal - 2) + "%";
      } else {
        this.data = "";
      }
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.getVal(newVal);
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
</style>
