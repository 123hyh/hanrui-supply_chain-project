<template>
	<div class="table-component">
		<my-from :fromConfig='tableConfig.rule' class='myfrom'></my-from>
		<el-table ref="table" :data="tableConfig.data" size="mini" highlight-current-row @current-change="currentChange">
			<el-table-column type="selection" width="55" v-if="tableConfig.isSelection"></el-table-column>
			<el-table-column v-for="(item,index) in tableConfig.config" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="30" class='mypagination'></el-pagination>
	</div>
</template>
<script>
	import MyFrom from "./from";
	export default {
		name: 'TableComponent',
		components: {
			MyFrom
		},
		props: {
			tableConfig: {
				type: Object,
				required: true
			}
		},
		methods: {
			currentChange(currentRow) {
				this.$emit('handleCurrentChange', currentRow)
			}
		},
	};
</script>
<style scoped>
	.mypagination {
		margin-top: 10px;
		text-align: right;
	}
</style>
