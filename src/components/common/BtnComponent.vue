/* 子表顶部按钮 */
<template>
  <div class="item-btn-list">
    <el-button
      v-for="item of btnList"
      :key="item.type"
      @click.stop="$emit('handleItemBtnClick',item.type)"
    >{{item.label}}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    btnList: {
      type: Array,
      default: () => ([{ label: '新增', type: 'create' }, { label: '修改', type: 'update' }, { label: '删除', type: 'remove' }])
    }
  }
}
</script>
<style lang="less">
.item-btn-list {
  margin: 10px 0;
}
</style>

