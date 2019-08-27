<template>
	<div class="twoColumnt">

		<el-dialog :visible.sync="popup">
			<!-- 标题 -->
			<div slot="title">{{btnType == 'create'? '新增': '修改'}}代付款明细表</div>

			<!-- 按钮行 -->
			<div slot="footer">
				<el-button type="primary" @click="saveForm">确定</el-button>
				<el-button type="cancel" @click="closeForm">取消</el-button>
			</div>

			<!-- 表单 -->
			<el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules"
			 @submit.native.prevent>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="委托付款单单据编号" prop="entrustpayBillNo">
						<el-input v-model="agentpay.entrustpayBillNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="委托单号" prop="delegeteBillNo">
						<el-input v-model="agentpay.delegeteBillNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="仅供走账" prop="accountKeepingOnly">
						<el-input v-model="agentpay.accountKeepingOnly" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="委托付货款金额" prop="delegetePayAmount">
						<el-input v-model="agentpay.delegetePayAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="卖方销售金额" prop="sellerSalesAmount">
						<el-input v-model="agentpay.sellerSalesAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="卖方销售币别" prop="sellerMoneyType">
						<el-select v-model="agentpay.sellerMoneyType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="此次需付款金额" prop="thisPaymentAmount">
						<el-input v-model="agentpay.thisPaymentAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付款期限" prop="paymentTerm">
						<el-input v-model="agentpay.paymentTerm" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="报关类型" prop="reportGateType">
						<el-select v-model="agentpay.reportGateType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="业务类型" prop="bizType">
						<el-select v-model="agentpay.bizType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="汇率" prop="sellerSalesExchangeRate">
						<el-input v-model="agentpay.sellerSalesExchangeRate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付杂费金额" prop="incidentalPayAmount">
						<el-input v-model="agentpay.incidentalPayAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="杂费币别" prop="incidentalMoneyType">
						<el-select v-model="agentpay.incidentalMoneyType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="汇率" prop="incidentalExchangeRate">
						<el-input v-model="agentpay.incidentalExchangeRate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="汇差处理方式" prop="exchangeRateDiffDeal">
						<el-select v-model="agentpay.exchangeRateDiffDeal" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="汇差金额" prop="exchangeRateDiffAmount">
						<el-input v-model="agentpay.exchangeRateDiffAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="计算公式" prop="calculationFormula">
						<el-input v-model="agentpay.calculationFormula" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="汇差" prop="exchangeRateDiff">
						<el-input v-model="agentpay.exchangeRateDiff" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="业务应收公式" prop="businessReceiptsFormula">
						<el-input v-model="agentpay.businessReceiptsFormula" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="代入票" prop="substitutionInvoice">
						<el-input v-model="agentpay.substitutionInvoice" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="备注" prop="remark">
						<el-input v-model="agentpay.remark" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="是否已付款" prop="paided">
						<el-checkbox v-model="agentpay.paided"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="已付款金额" prop="paidAmount">
						<el-input v-model="agentpay.paidAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付款时间" prop="payTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="agentpay.payTime" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="货款汇率取值依" prop="goodsPaymentExchangeRateAs">
						<el-input v-model="agentpay.goodsPaymentExchangeRateAs" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="货款汇率日期" prop="goodsPaymentExchangeRateTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="agentpay.goodsPaymentExchangeRateTime" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="货款汇率" prop="goodsPaymentExchangeRate">
						<el-input v-model="agentpay.goodsPaymentExchangeRate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="货价收入汇率" prop="priceIncomeExchangeRate">
						<el-input v-model="agentpay.priceIncomeExchangeRate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="应收金额" prop="shouldReceiptsAmount">
						<el-input v-model="agentpay.shouldReceiptsAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="协议付款性质" prop="agreementPaymentNature">
						<el-input v-model="agentpay.agreementPaymentNature" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="往来户名称" prop="dealingName">
						<el-input v-model="agentpay.dealingName" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="往来户英文名称" prop="dealingNameEn">
						<el-input v-model="agentpay.dealingNameEn" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="指定受托方公司" prop="appointTrusteeCompany">
						<el-input v-model="agentpay.appointTrusteeCompany" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="上级供应商" prop="superiorSupplier">
						<el-input v-model="agentpay.superiorSupplier" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="实际代付金额" prop="agentPayAmount">
						<el-input v-model="agentpay.agentPayAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="实际垫付金额" prop="advancePayAmount">
						<el-input v-model="agentpay.advancePayAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="实际垫付账期" prop="advancePayAccountPeriod">
						<el-input v-model="agentpay.advancePayAccountPeriod" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="E链申请付汇金额" prop="eChainApplyAmount">
						<el-input v-model="agentpay.eChainApplyAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="E链委托付款金额" prop="eChainDelegeteAmount">
						<el-input v-model="agentpay.eChainDelegeteAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Agentpay from "../../../domain/entities/finance/Agentpay";
	import appHelper from "../../../assets/js/appHelper";

	export default {
		inject: ["formEvents"], // formEvents == bus

		data() {
			return {
				formEntity:  new Agentpay(),

				// 控制弹出层显示
				popup: false,

				// 设置 label 宽度
				labelWidth: "150px",
				// el-input 类名
				inputClass: "input-item",

				// 验证规则
				formRules: {
					//deptCode: [appHelper.validateRule.required("所属部门")],
				}
			};
		},
		computed: {
			btnType() {
				if(this.$store.state.btnType == 'create'){
					this.formEntity = new Agentpay()();
					this.loadAgentpayCode(); // 加载附件类型编码
				}else{
					this.formEntity = this.$store.state.curRowData;
				}
				return this.$store.state.btnType
			},
		},
		methods: {
			// 点击保存
			saveForm() {
				var self = this;
				this.$refs.form.validate().then(() => {
					// 表单验证通过后...

					if (self.btnType == 'create') {
						// 新增
						appHelper
							.submitCreate("/agentpay/", self.formEntity)
							.then(function(res) {
								if (res.status == '200') {
									// 提交成功后...
									self.$alert('新增成功', '新增', {
										confirmButtonText: '确定',
										callback: action => {
											// 刷新列表
											self.$emit('newTableData', res.data)
										}
									});
								}
							});
						this.formEntity = new Agentpay()(); //表单重置
						this.loadAgentpayCode(); // 加载附件类型编码
						this.popup = false; //弹出层消失
					} else if (self.btnType == 'update') {
						// 修改
						appHelper
							.submitCreate("/agentpay/", self.formEntity)
							.then(function(res) {
								if (res.status == '200') {
									// 提交成功后...
									self.$alert('保存成功', '修改', {
										confirmButtonText: '确定',
										callback: action => {
											// 刷新列表
											self.popup = false; //弹出层消失
										}
									});
								}
							});
					}
				});
			},
			//加载附件类型编码
			loadAgentpayCode() {
				appHelper
					.get("/agentpay/id")
					.then(result => (this.formEntity.id = result.data));
			},
			// 点击取消
			closeForm() {
				this.popup = false;
			}
		},

		created() {
			this.loadAgentpayCode();
			// 监听事件
			this.formEvents.$on("openform", () => (this.popup = true));
		}
	};
</script>

<style scoped>
	.input-item {
		width: 180px;
	}
</style>
