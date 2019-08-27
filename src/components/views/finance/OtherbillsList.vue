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
					<el-form-item label="委托单号" prop="code">
						<el-input v-model="queryReceipt.code" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="委托方" prop="classifyName">
						<el-input v-model="queryReceipt.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="state">
						<el-select v-model="queryReceipt.state" placeholder="请选择" style="width: 150px">
							<el-option v-for="item in queryReceipt.state" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="委托单类型" prop="type">
						<el-select v-model="queryReceipt.type" placeholder="请选择" style="width: 150px">
							<el-option v-for="item in queryReceipt.type" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建日期">
						<el-col :span="11">
							<el-form-item prop="createTimeFrom">
								<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="queryReceipt.createTimeFrom" type="date" style="width: 150px"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">&nbsp;&nbsp;~</el-col>
						<el-col :span="11">
							<el-form-item prop="createTimeTo">
								<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="queryReceipt.createTimeTo" type="date" style="width: 150px"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-button type="primary" @click="queryPage">查询</el-button>
					<el-button type="primary" @click="goCreate">新增</el-button>
					<el-button type="primary" @click="goUpdate">修改</el-button>
					<el-button type="danger" @click="goDelete">删除</el-button>
				</el-form>
			</div>
			<!-- 表格 -->
			<el-table :data="tableData" border highlight-current-row @row-click="clickRow" ref="moviesTable">
				<el-table-column prop="billNo" label="FY委托单号" width="132"></el-table-column>
				<el-table-column prop="company" label="委托方" width="132"></el-table-column>
				<el-table-column prop="actualReceiptCompany" label="应收结算单位类型" width="132"></el-table-column>
				<el-table-column prop="receivedDate" label="应收结算单位" width="132"></el-table-column>
				<el-table-column prop="receiptsAndPaymentsType" label="发生日期" width="132"></el-table-column>
				<el-table-column prop="immediateBalance" label="服务单位类型" width="132"></el-table-column>
				<el-table-column prop="receiptsType" label="服务单位" width="132"></el-table-column>
				<el-table-column prop="moneyType" label="费用项目" width="132"></el-table-column>
				<el-table-column prop="receiptsAmount" label="定价" width="132"></el-table-column>
				<el-table-column prop="exchangeRate" label="币别" width="132"></el-table-column>
				<el-table-column prop="baseCurrency" label="应收金额" width="132"></el-table-column>
				<el-table-column prop="receiverAccount" label="应付金额" width="132"></el-table-column>
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
				this.$router.push('OtherbillsForm')
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
					this.$router.push('OtherbillsForm')
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
