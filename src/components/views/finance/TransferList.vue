<template>
	<div class="table OtherbillsList">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-menu"></i> 附件上传类型
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pd-10">
			<div class="handle-box">
			<!-- 查询栏 -->
				<el-form :inline="true" :model="queryReceipt" :rules="rules" ref="queryReceipt">
					<el-form-item label="单据编号" prop="code">
						<el-input v-model="queryReceipt.code" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="转出客户" prop="classifyName">
						<el-input v-model="queryReceipt.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="转出委托单" prop="state">
						<el-input v-model="queryReceipt.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="转入客户" prop="type">
						<el-input v-model="queryReceipt.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="转入委托单">
						<el-input v-model="queryReceipt.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-button type="primary" @click="queryPage">查询</el-button>
					<el-button type="primary" @click="goCreate">新增</el-button>
					<el-button type="primary" @click="goUpdate">修改</el-button>
					<el-button type="danger" @click="goDelete">删除</el-button>
				</el-form>
				</div>
			<!-- 表格 -->
			<el-table :data="tableData" border highlight-current-row @row-click="clickRow" ref="moviesTable">
				<el-table-column prop="billNo" label="单据编号" width="132"></el-table-column>
				<el-table-column prop="company" label="状态" width="132"></el-table-column>
				<el-table-column prop="actualReceiptCompany" label="业务日期" width="132"></el-table-column>
				<el-table-column prop="receivedDate" label="不来货退款" width="132"></el-table-column>
				<el-table-column prop="receiptsAndPaymentsType" label="转其他委托单" width="132"></el-table-column>
				<el-table-column prop="company" label="原付款地址" width="132"></el-table-column>
				<el-table-column prop="company" label="转出委托单号" width="132"></el-table-column>
				<el-table-column prop="company" label="转出委托单类型" width="132"></el-table-column>
				<el-table-column prop="company" label="转出客户" width="132"></el-table-column>
				<el-table-column prop="company" label="转出供应商" width="132"></el-table-column>
				<el-table-column prop="company" label="转出金额" width="132"></el-table-column>
				<el-table-column prop="company" label="转出币别" width="132"></el-table-column>
				<el-table-column prop="company" label="转入委托单号" width="132"></el-table-column>
				<el-table-column prop="company" label="转入委托单类型" width="132"></el-table-column>
				<el-table-column prop="company" label="转入客户" width="132"></el-table-column>
				<el-table-column prop="company" label="转入供应商" width="132"></el-table-column>
				<el-table-column prop="company" label="转入金额" width="132"></el-table-column>
				<el-table-column prop="company" label="转入币别" width="132"></el-table-column>
				<el-table-column prop="company" label="转出RMB汇率" width="132"></el-table-column>
				<el-table-column prop="company" label="转入RMB汇率" width="132"></el-table-column>
				<el-table-column prop="company" label="汇差" width="132"></el-table-column>
				<el-table-column prop="company" label="创建人" width="132"></el-table-column>
				<el-table-column prop="company" label="创建日期" width="132"></el-table-column>
				<el-table-column prop="company" label="修改人" width="132"></el-table-column>
				<el-table-column prop="company" label="审核人" width="132"></el-table-column>
				<el-table-column prop="company" label="审核时间" width="132"></el-table-column>
				<el-table-column prop="company" label="审核备注" width="132"></el-table-column>
				<el-table-column prop="company" label="汇率" width="132"></el-table-column>
				<el-table-column prop="company" label="凭证ID" width="132"></el-table-column>
				<el-table-column prop="company" label="审核日汇率" width="132"></el-table-column>
				<el-table-column prop="company" label="审核日汇率转出" width="132"></el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination ref="pager" @size-change="handleSizeChange" background :page-sizes="[10, 20, 30, 40]"
				 :page-size.sync="queryReceipt.pageSize" :current-page.sync="queryReceipt.pageIndex" layout="sizes, total, prev, pager, next"
				 :total="queryReceipt.total" @current-change="goPage"></el-pagination>
			</div>
		</div>

		<!-- 删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
			<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import appHelper from "@/assets/js/appHelper";
	

	export default {
		data() {

			return {
				// 查询条件
				queryReceipt: {
					pageIndex: 1,
					pageSize: 10,
					total: 0,
				},
				rules: {
					code: [{
						message: '',
						trigger: 'blur'
					}],
					classifyName: [{
						message: '',
						trigger: 'blur'
					}],
					creator: [{
						message: '',
						trigger: 'blur'
					}],
					createTimeFrom: [{
						message: '',
						trigger: 'change'
					}],
					createTimeTo: [{
						message: '',
						trigger: 'change'
					}],
				},
				// 表格数据
				tableData: [],
				// 事件bus
				formEvents: new Vue(),
				// 确认删除弹窗
				delVisible: false,
				// 弹窗是否关闭
				popForm: false,
			};
		},
		computed: {},
		watch: {

		},
		methods: {
			// 查询数据
			queryPage(index, pageSize) {
				this.queryReceipt.pageIndex = 1; //页签调到第一页
				appHelper.query("/receipt/search", this.queryReceipt).then(result => {
					this.tableData = result.data.list;
					this.queryReceipt.total = result.data.count;
					this.$store.state.curRowData = {}; // 清空当前行数据
				});
			},
			// 翻页处理
			goPage(index, pageSize) {
				let pager = this.$refs.pager; //每页的数据对象 翻页更新
				let vmTblData = this.tableData; //把第一页的数据重新赋值进行修改
				pageSize = pager.pageSize ? pager.pageSize : pageSize;
				this.queryReceipt.pageIndex = index; //页签调到第一页
				this.queryReceipt.pageSize = pageSize; //页签调到第一页
				this.$axios
					.post(appHelper.apiPath("/receipt/search"), this.queryReceipt)
					.then(function(result) {
						// 替换数据
						vmTblData.splice(0, vmTblData.length, ...result.data.list); //用result.data.list来代替vmTblData
						// 设置分页
						pager.total = result.data.total;
					});
			},
			// 改变每页行数
			handleSizeChange() {
				this.$refs.pager.pageSize = this.queryReceipt.pageSize; //改变每页行数
				this.goPage(this.queryReceipt.pageIndex, this.queryReceipt.pageSize);
			},
			// 新增
			goCreate() {
				this.$store.commit('btnType', 'create'); //判断是否新增修改删除
				this.$router.push('TransferForm')
			},
			// 新增
			getTableData(newData) {
				if (newData.code) { //如果有新编号，就再查询一遍
					this.queryPage();
				}
			},

			// 修改
			goUpdate() {
				if (this.$store.state.curRowData.code) {
					this.$store.commit('btnType', 'update'); //判断是否新增修改删除
					this.$router.push('TransferForm')
				} else {
					this.$message.error('请选择要修改的数据');
				}
			},

			// 删除
			goDelete() {
				if (this.$store.state.curRowData.code) {
					this.delVisible = true;
				} else {
					this.$message.error('请选择要删除的数据');
				}
			},
			// 确定删除
			deleteRow() {
				// 删除
				let self = this;
				appHelper
					.deleteData("/receipt/" + this.$store.state.curRowData.code)
					.then(function(res) {
						console.log(res)
						if (res.status == '200') {
							// 提交成功后...
							self.$alert('删除成功', '删除', {
								confirmButtonText: '确定',
								callback: action => {
									self.queryPage(); //数据刷新
									self.delVisible = false;
								}
							});
						}
					});
			},
			// 重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 选中当前行
			clickRow(row) {
				// 获取修改内容
				let self = this;
				appHelper
					.get("/receipt/searchOne/" + row.code)
					.then(function(res) {
						if (res.status == '200') {
							self.$store.commit('curRowData', row)
						}
					});
				this.$refs.moviesTable.toggleRowSelection(row)
			},
			// 关闭弹窗
			closeForm() {
				this.popForm = false;
			},
		},
		provide() {
			return {
				formEvents: this.formEvents
			};
		},
		created() {
			// 加载列表数据
			this.queryPage();
		},
	};
</script>

<style scoped>
	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.del-dialog-cnt {
		font-size: 16px;
		text-align: center;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}
	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}
</style>
