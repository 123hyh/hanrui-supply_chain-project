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
				<el-form :inline="true" :model="queryAgentpay" :rules="rules" ref="queryAgentpay">
					<el-form-item label="编码" prop="code">
                    <el-input v-model="queryAgentpay.code" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="名称" prop="classifyName">
                    <el-input v-model="queryAgentpay.name" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="制单人" prop="creator">
                    <el-input v-model="queryAgentpay.creator" style="width: 150px"></el-input>
					</el-form-item>
					<el-form-item label="制单时间">
						<el-col :span="11">
							<el-form-item prop="createTimeFrom">
								<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="queryAgentpay.createTimeFrom" type="date"
								 style="width: 150px"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">&nbsp;&nbsp;~</el-col>
						<el-col :span="11">
							<el-form-item prop="createTimeTo">
								<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="queryAgentpay.createTimeTo" type="date" style="width: 150px"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-button type="primary" @click="queryPage">查询</el-button>
					<el-button type="primary" @click="goCreate">新增</el-button>
					<el-button type="primary" @click="goUpdate">修改</el-button>
					<el-button type="danger" @click="goDelete">删除</el-button>
					<el-button type="danger" @click="resetForm('queryAgentpay')">重置</el-button>
				</el-form>
			</div>
			<!-- 表格 -->
			<el-table :data="tableData" border :highlight-current-row="true" @row-click="clickRow" ref="moviesTable">
				<el-table-column prop="entrustpayBillNo" label="委托付款单单据编号" width="100px"></el-table-column>
				<el-table-column prop="delegeteBillNo" label="委托单号" width="100px"></el-table-column>
				<el-table-column prop="accountKeepingOnly" label="仅供走账" width="100px"></el-table-column>
				<el-table-column prop="delegetePayAmount" label="委托付货款金额" width="100px"></el-table-column>
				<el-table-column prop="sellerSalesAmount" label="卖方销售金额" width="100px"></el-table-column>
				<el-table-column prop="sellerMoneyType" label="卖方销售币别" width="100px"></el-table-column>
				<el-table-column prop="thisPaymentAmount" label="此次需付款金额" width="100px"></el-table-column>
				<el-table-column prop="paymentTerm" label="付款期限" width="100px"></el-table-column>
				<el-table-column prop="reportGateType" label="报关类型" width="100px"></el-table-column>
				<el-table-column prop="bizType" label="业务类型" width="100px"></el-table-column>
				<el-table-column prop="sellerSalesExchangeRate" label="汇率" width="100px"></el-table-column>
				<el-table-column prop="incidentalPayAmount" label="付杂费金额" width="100px"></el-table-column>
				<el-table-column prop="incidentalMoneyType" label="杂费币别" width="100px"></el-table-column>
				<el-table-column prop="incidentalExchangeRate" label="汇率" width="100px"></el-table-column>
				<el-table-column prop="exchangeRateDiffDeal" label="汇差处理方式" width="100px"></el-table-column>
				<el-table-column prop="exchangeRateDiffAmount" label="汇差金额" width="100px"></el-table-column>
				<el-table-column prop="calculationFormula" label="计算公式" width="100px"></el-table-column>
				<el-table-column prop="exchangeRateDiff" label="汇差" width="100px"></el-table-column>
				<el-table-column prop="businessReceiptsFormula" label="业务应收公式" width="100px"></el-table-column>
				<el-table-column prop="substitutionInvoice" label="代入票" width="100px"></el-table-column>
				<el-table-column prop="remark" label="备注" width="100px"></el-table-column>
				<el-table-column prop="paided" label="是否已付款" width="100px"></el-table-column>
				<el-table-column prop="paidAmount" label="已付款金额" width="100px"></el-table-column>
				<el-table-column prop="payTime" label="付款时间" width="100px"></el-table-column>
				<el-table-column prop="goodsPaymentExchangeRateAs" label="货款汇率取值依" width="100px"></el-table-column>
				<el-table-column prop="goodsPaymentExchangeRateTime" label="货款汇率日期" width="100px"></el-table-column>
				<el-table-column prop="goodsPaymentExchangeRate" label="货款汇率" width="100px"></el-table-column>
				<el-table-column prop="priceIncomeExchangeRate" label="货价收入汇率" width="100px"></el-table-column>
				<el-table-column prop="shouldReceiptsAmount" label="应收金额" width="100px"></el-table-column>
				<el-table-column prop="agreementPaymentNature" label="协议付款性质" width="100px"></el-table-column>
				<el-table-column prop="dealingName" label="往来户名称" width="100px"></el-table-column>
				<el-table-column prop="dealingNameEn" label="往来户英文名称" width="100px"></el-table-column>
				<el-table-column prop="appointTrusteeCompany" label="指定受托方公司" width="100px"></el-table-column>
				<el-table-column prop="superiorSupplier" label="上级供应商" width="100px"></el-table-column>
				<el-table-column prop="agentPayAmount" label="实际代付金额" width="100px"></el-table-column>
				<el-table-column prop="advancePayAmount" label="实际垫付金额" width="100px"></el-table-column>
				<el-table-column prop="advancePayAccountPeriod" label="实际垫付账期" width="100px"></el-table-column>
				<el-table-column prop="eChainApplyAmount" label="E链申请付汇金额" width="100px"></el-table-column>
				<el-table-column prop="eChainDelegeteAmount" label="E链委托付款金额" width="100px"></el-table-column>

			</el-table>
			<div class="pagination">
				<el-pagination ref="pager" @size-change="handleSizeChange" background :page-sizes="[10, 20, 30, 40]"
				 :page-size.sync="queryAgentpay.pageSize" :current-page.sync="queryAgentpay.pageIndex" layout="sizes, total, prev, pager, next"
				 :total="queryAgentpay.total" @current-change="goPage"></el-pagination>
			</div>
		</div>

		<agentpay-form :show="popForm" @closeform="closeForm" @newTableData="getTableData"></agentpay-form>
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
	import AgentpayForm from "./AgentpayForm";
	

	export default {
		components: {
			AgentpayForm
		},
		data() {

			return {
				// 查询条件
				queryAgentpay: {
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
				this.queryAgentpay.pageIndex = 1; //页签调到第一页
				appHelper.query("/agentpay/search", this.queryAgentpay).then(result => {
					this.tableData = result.data.list;
					this.queryAgentpay.total = result.data.count;
					this.$store.state.curRowData = {}; // 清空当前行数据
				});
			},
			// 翻页处理
			goPage(index, pageSize) {
				let pager = this.$refs.pager; //每页的数据对象 翻页更新
				let vmTblData = this.tableData; //把第一页的数据重新赋值进行修改
				pageSize = pager.pageSize ? pager.pageSize : pageSize;
				this.queryAgentpay.pageIndex = index; //页签调到第一页
				this.queryAgentpay.pageSize = pageSize; //页签调到第一页
				this.$axios
					.post(appHelper.apiPath("/agentpay/search"), this.queryAgentpay)
					.then(function(result) {
						// 替换数据
						vmTblData.splice(0, vmTblData.length, ...result.data.list); //用result.data.list来代替vmTblData
						// 设置分页
						pager.total = result.data.total;
					});
			},
			// 改变每页行数
			handleSizeChange() {
				this.$refs.pager.pageSize = this.queryAgentpay.pageSize; //改变每页行数
				this.goPage(this.queryAgentpay.pageIndex, this.queryAgentpay.pageSize);
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
					.deleteData("/agentpay/" + this.$store.state.curRowData.code)
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
					.get("/agentpay/searchOne/" + row.code)
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
