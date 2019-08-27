<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-menu"></i> 附件上传类型
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pd-10">
			<!-- 查询栏 -->
			<div class="handle-box">
				<el-form :inline="true" :model="queryRemittanceItem" :rules="rules" ref="queryRemittanceItem">
					<el-form-item label="编码" prop="code">
                    <el-input v-model="queryRemittanceItem.code" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="名称" prop="classifyName">
                    <el-input v-model="queryRemittanceItem.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="制单人" prop="creator">
                    <el-input v-model="queryRemittanceItem.creator" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="制单时间">
						<el-col :span="11">
							<el-form-item prop="createTimeFrom">
								<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="queryRemittanceItem.createTimeFrom" type="date"
								 style="width: 150px"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">&nbsp;&nbsp;~</el-col>
						<el-col :span="11">
							<el-form-item prop="createTimeTo">
								<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="queryRemittanceItem.createTimeTo" type="date" style="width: 150px"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-button type="primary" @click="queryPage">查询</el-button>
					<el-button type="primary" @click="goCreate">新增</el-button>
					<el-button type="primary" @click="goUpdate">修改</el-button>
					<el-button type="danger" @click="goDelete">删除</el-button>
					<el-button type="danger" @click="resetForm('queryRemittanceItem')">重置</el-button>
				</el-form>
			</div>
			<!-- 表格 -->
			<el-table :data="tableData" border :highlight-current-row="true" @row-click="clickRow" ref="moviesTable">
				<el-table-column prop="itemCode" label="子表编码" width="100px"></el-table-column>
				<el-table-column prop="billNo" label="调汇申请单编码" width="100px"></el-table-column>
				<el-table-column prop="paymentSubject" label="付款科目" width="100px"></el-table-column>
				<el-table-column prop="paymentBank" label="付款银行" width="100px"></el-table-column>
				<el-table-column prop="resourceCurrency" label="原币" width="100px"></el-table-column>
				<el-table-column prop="resourceAmount" label="原币金额" width="100px"></el-table-column>
				<el-table-column prop="paymentCurrency" label="付款币别" width="100px"></el-table-column>
				<el-table-column prop="rate" label="汇率" width="100px"></el-table-column>
				<el-table-column prop="remittanceAmount" label="调汇金额" width="100px"></el-table-column>
				<el-table-column prop="paymentDate" label="付款日期" width="100px"></el-table-column>
				<el-table-column prop="interestRate" label="利率" width="100px"></el-table-column>
				<el-table-column prop="interestDate" label="起息日" width="100px"></el-table-column>
				<el-table-column prop="dueDate" label="到期日" width="100px"></el-table-column>
				<el-table-column prop="interestMethod" label="计息方式" width="100px"></el-table-column>
				<el-table-column prop="interest" label="利息" width="100px"></el-table-column>
				<el-table-column prop="yearInterest" label="年内利息" width="100px"></el-table-column>
				<el-table-column prop="yearInterestTime" label="年内利息计费时长" width="100px"></el-table-column>
				<el-table-column prop="crossYearInterest" label="跨年利息" width="100px"></el-table-column>
				<el-table-column prop="crossYearInterestTime" label="跨年利息计费时长" width="100px"></el-table-column>
				<el-table-column prop="reciprocatingType" label="往来户类型" width="100px"></el-table-column>
				<el-table-column prop="reciprocatingCode" label="往来户编码" width="100px"></el-table-column>
				<el-table-column prop="reciprocatingName" label="往来户名称" width="100px"></el-table-column>
				<el-table-column prop="receiptAccount" label="收款账户" width="100px"></el-table-column>
				<el-table-column prop="receiptBank" label="收款银行" width="100px"></el-table-column>
				<el-table-column prop="receiptAccountNo" label="收款账号" width="100px"></el-table-column>
				<el-table-column prop="receiptSubject" label="收款科目" width="100px"></el-table-column>
				<el-table-column prop="generateCode" label="生成单据编码" width="100px"></el-table-column>
				<el-table-column prop="actualAmount" label="实收金额" width="100px"></el-table-column>
				<el-table-column prop="actualResourceAmount" label="实收原币金额" width="100px"></el-table-column>
				<el-table-column prop="actualResourceCurrency" label="实收原币" width="100px"></el-table-column>
				<el-table-column prop="hkRemark" label="香港备注" width="100px"></el-table-column>

			</el-table>
			<div class="pagination">
				<el-pagination ref="pager" @size-change="handleSizeChange" background :page-sizes="[10, 20, 30, 40]"
				 :page-size.sync="queryRemittanceItem.pageSize" :current-page.sync="queryRemittanceItem.pageIndex" layout="sizes, total, prev, pager, next"
				 :total="queryRemittanceItem.total" @current-change="goPage"></el-pagination>
			</div>
		</div>

		<remittanceItem-form :show="popForm" @closeform="closeForm" @newTableData="getTableData"></remittanceItem-form>
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
	import appHelper from "../../../assets/js/appHelper";
	import RemittanceItemForm from "./RemittanceItemForm";
	

	export default {
		components: {
			RemittanceItemForm
		},
		data() {

			return {
				// 查询条件
				queryRemittanceItem: {
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
				this.queryRemittanceItem.pageIndex = 1; //页签调到第一页
				appHelper.query("/remittanceitem/search", this.queryRemittanceItem).then(result => {
					this.tableData = result.data.list;
					this.queryRemittanceItem.total = result.data.count;
					this.$store.state.curRowData = {}; // 清空当前行数据
				});
			},
			// 翻页处理
			goPage(index, pageSize) {
				let pager = this.$refs.pager; //每页的数据对象 翻页更新
				let vmTblData = this.tableData; //把第一页的数据重新赋值进行修改
				pageSize = pager.pageSize ? pager.pageSize : pageSize;
				this.queryRemittanceItem.pageIndex = index; //页签调到第一页
				this.queryRemittanceItem.pageSize = pageSize; //页签调到第一页
				this.$axios
					.post(appHelper.apiPath("/remittanceitem/search"), this.queryRemittanceItem)
					.then(function(result) {
						// 替换数据
						vmTblData.splice(0, vmTblData.length, ...result.data.list); //用result.data.list来代替vmTblData
						// 设置分页
						pager.total = result.data.total;
					});
			},
			// 改变每页行数
			handleSizeChange() {
				this.$refs.pager.pageSize = this.queryRemittanceItem.pageSize; //改变每页行数
				this.goPage(this.queryRemittanceItem.pageIndex, this.queryRemittanceItem.pageSize);
			},
			// 新增
			goCreate() {
				this.$store.commit('btnType', 'create'); //判断是否新增修改删除
				this.formEvents.$emit("openform"); // 子组件向父组件传参=>打开弹窗
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
					this.formEvents.$emit("openform"); // 子组件向父组件传参=>打开弹窗
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
					.deleteData("/remittanceitem/" + this.$store.state.curRowData.code)
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
					.get("/remittanceitem/searchOne/" + row.code)
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
	.handle-box {
		margin-bottom: 20px;
	}

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
