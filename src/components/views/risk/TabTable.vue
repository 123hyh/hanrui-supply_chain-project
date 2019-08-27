<template>
  <div v-show="isShowTabTable">
    <div class="btn-margin">
      <el-button @click="handlerTabClick">新增</el-button>
      <el-button>删除</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-for="(item,index) in tableDataKey"
        :key="index"
        :prop="item.key"
        :label="item.name"
        width="180"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: []
    },
    tableDataKey: {
      type: Array,
      default: []
    },
    isShowTabTable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handlerTabClick() {
      this.$emit("handlerAddCreditTab");
    }
  }
};
</script>
<style lang='less'>
.btn-margin {
  margin: 15px 0;
}
</style>
