<template>
  <!-- 字符串类型输入框 -->
  <el-input
    :style="styles"
    v-model="formModel[config['key']]"
    :disabled="config.disabled"
    :readonly="config.readonly"
    :placeholder="config.btn && '请点击按钮选择'"
  >
    <el-button
      v-if="config.btn"
      slot="append"
      icon="el-icon-search"
      @click.stop="rousePopover(config.key, config)"
    ></el-button>
    <template
      v-if="config.slotType=='元'"
      slot="append"
    >元</template>
    <template
      v-if="config.slotType=='%'"
      slot="append"
    >%</template>
    <el-select
      v-if="config.slotType=='select'"
      slot="append"
      v-model="config['skey']"
      placeholder="请选择选项"
    >
      <el-option
        v-for="option in config.selectOption"
        :key="option['itemValue']"
        :label="option['itemValue']"
        :value="option['itemKey']"
      ></el-option>
    </el-select>
  </el-input>
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
    /**
     * @method rousePopover 点击输入框中的 search 按钮事件
     */
    rousePopover (key, config) {
      this.$emit("rousePopover", key, config);
    }
  }
};
</script>
