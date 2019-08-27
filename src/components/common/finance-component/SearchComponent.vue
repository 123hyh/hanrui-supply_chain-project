<template>
  <div class="search-component">
    <el-form
      :model="form.data"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="委托订单号"
        prop="name"
      >
        <el-input v-model="form.data.entrustOrderNo"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
        size="small"
        v-for="item of form.btnObj"
        @click.stop="handleBtnClick(item.type)"
        :key="item.type"
      >{{item.label}}</el-button>
    </div>
  </div>
</template>
<script>
import FormComponent from '@/components/common/form-template/FormComponent.vue'
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  components: {
    FormComponent
  },
  methods: {
    handleBtnClick (type) {
      this.$emit('handleSearchClick', type)
    }
  }
}
</script>
<style lang="less">
.search-component {
  display: flex;
  > div {
    margin-left: 50px;
  }
  /*  justify-content: space-around;
  &::before {
    content: "";
    flex: 0.11;
  }
  > form {
    flex: 2;
  }
  > div {
    flex: 1;
    text-align: center;
  } */
}
</style>
