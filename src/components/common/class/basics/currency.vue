<template>
  <div class="el-input el-input--medium" :class="{ 'is-disabled': disabled}">
    <input
      style="text-align: right;"
      :disabled="disabled || readonly"
      :readonly="readonly"
      class="el-input__inner"
      v-bind:value="formatValue"
      ref="input"
      v-on:input="updatevalue($event.target.value)"
      v-on:blur="onBlur"
      v-on:focus="selectAll"
    >
  </div>
</template>

<script>
export default {
  props: {
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
    symbol: {
      type: String,
      default: "$",
      desc: "货币标识符"
    },
    decimal: {
      type: Number,
      default: 4,
      desc: "小数位"
    }
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
    formatValue() {
      if (this.focused) {
        return accounting.unformat(this.value);
      } else {
        if (
          this.decimal == 2 &&
          accounting.formatMoney(this.value, this.symbol, this.decimal) ==
            this.symbol + "0.00"
        )
          return "";
        if (
          this.decimal == 4 &&
          accounting.formatMoney(this.value, this.symbol, this.decimal) ==
            this.symbol + "0.0000"
        )
          return "";
        return accounting.formatMoney(this.value, this.symbol, this.decimal);
      }
    }
  },
  methods: {
    // 文本框内容更改时
    updatevalue(value) {
      var model = accounting.unformat(value); //输入的文本（含非法字符）转数字类型文本
      model = parseFloat(model.toFixed(this.decimal)) // 转换为保留指定小数位数字类型
      this.$emit("input", model);
    },
    // 文本框失去焦点
    onBlur() {
      this.focused = false;
    },
    // 文本框获得焦点
    selectAll(event) {
      this.focused = true;
      setTimeout(() => {
        event.target.select(); //保留原生事件
      }, 0);
    }
  }
};
</script>
<style scoped lang="less">
</style>
