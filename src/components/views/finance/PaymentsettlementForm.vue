<template>
	<div class="twoColumnt">

		<el-dialog :visible.sync="popup">
			<!-- 标题 -->
			<div slot="title">{{btnType == 'create'? '新增': '修改'}}应付结算单</div>

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
					<el-form-item :label-width="labelWidth" label="单据编号" prop="billNo">
						<el-input v-model="paymentsettlement.billNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="结算类型" prop="settlementType">
						<el-select v-model="paymentsettlement.settlementType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="计划付款日期" prop="plannedPayDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="paymentsettlement.plannedPayDate" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="委托单号" prop="delegeteBillNo">
						<el-input v-model="paymentsettlement.delegeteBillNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="业务日期" prop="bizDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="paymentsettlement.bizDate" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="状态" prop="state">
						<el-select v-model="paymentsettlement.state" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="委托方" prop="delegate">
						<el-input v-model="paymentsettlement.delegate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="业务类型" prop="bizType">
						<el-select v-model="paymentsettlement.bizType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="报关类型" prop="reportGateType">
						<el-select v-model="paymentsettlement.reportGateType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="结算币种" prop="settlementMoney">
						<el-input v-model="paymentsettlement.settlementMoney" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="结算方式" prop="settlementMethod">
						<el-select v-model="paymentsettlement.settlementMethod" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款账号" prop="receiverAccount">
						<el-input v-model="paymentsettlement.receiverAccount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="结算单位类型" prop="settlementUnitType">
						<el-select v-model="paymentsettlement.settlementUnitType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="结算单位" prop="settlementUnit">
						<el-input v-model="paymentsettlement.settlementUnit" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款账号名称" prop="receiverAccountName">
						<el-input v-model="paymentsettlement.receiverAccountName" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="公司名" prop="companyName">
						<el-input v-model="paymentsettlement.companyName" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="是否已复审" prop="auditAgain">
						<el-checkbox v-model="paymentsettlement.auditAgain"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款银行" prop="receiverBank">
						<el-input v-model="paymentsettlement.receiverBank" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="是否初始化" prop="Initialization">
						<el-checkbox v-model="paymentsettlement.Initialization"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="FY委托单号" prop="delegeteBillNoFY">
						<el-input v-model="paymentsettlement.delegeteBillNoFY" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="合计总金额" prop="amountAll">
						<el-input v-model="paymentsettlement.amountAll" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款人电话" prop="receiverPhone">
						<el-input v-model="paymentsettlement.receiverPhone" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="备注" prop="remark">
						<el-input v-model="paymentsettlement.remark" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="是否已锁定" prop="locked">
						<el-checkbox v-model="paymentsettlement.locked"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="锁定备注" prop="lockRemark">
						<el-input v-model="paymentsettlement.lockRemark" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="临时垫税" prop="temporaryAdvancePayTax">
						<el-checkbox v-model="paymentsettlement.temporaryAdvancePayTax"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="制单人" prop="billCreator">
						<el-input v-model="paymentsettlement.billCreator" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="制单日期" prop="billCreateDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="paymentsettlement.billCreateDate" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="审核人" prop="auditor">
						<el-input v-model="paymentsettlement.auditor" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="审核时间" prop="auditTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="paymentsettlement.auditTime" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="是否垫税" prop="advancePayTax">
						<el-checkbox v-model="paymentsettlement.advancePayTax"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
			</el-row>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import Paymentsettlement from "../../../domain/entities/finance/Paymentsettlement";
	import appHelper from "../../../assets/js/appHelper";

	export default {
		inject: ["formEvents"], // formEvents == bus

		data() {
			return {
				formEntity:  new Paymentsettlement(),

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
					this.formEntity = new Paymentsettlement()();
					this.loadPaymentsettlementCode(); // 加载附件类型编码
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
							.submitCreate("/paymentsettlement/", self.formEntity)
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
						this.formEntity = new Paymentsettlement()(); //表单重置
						this.loadPaymentsettlementCode(); // 加载附件类型编码
						this.popup = false; //弹出层消失
					} else if (self.btnType == 'update') {
						// 修改
						appHelper
							.submitCreate("/paymentsettlement/", self.formEntity)
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
			loadPaymentsettlementCode() {
				appHelper
					.get("/paymentsettlement/id")
					.then(result => (this.formEntity.id = result.data));
			},
			// 点击取消
			closeForm() {
				this.popup = false;
			}
		},

		created() {
			this.loadPaymentsettlementCode();
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
