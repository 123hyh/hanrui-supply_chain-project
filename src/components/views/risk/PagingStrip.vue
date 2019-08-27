<template>
<!-- 分页条组件 -->
  <div>
    <el-pagination
      background
      :current-page="2"
			@size-change='handleSizeChange'
			@current-change='handleCurrentChange'
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout=" sizes, total,  prev, pager, next"
      :total="2000000"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
			currentPage: 1, // 当前页
		};
  },
  props: {},
  methods: {
    handleSizeChange() { // 展示条数选择时
         handleCurrentChange(page) { // 当前页数改变时
      }
};
</script>