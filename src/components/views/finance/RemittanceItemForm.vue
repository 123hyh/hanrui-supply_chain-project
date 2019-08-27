<template>
	<div class="twoColumnt">

		<el-dialog :visible.sync="popup">
			<!-- 标题 -->
			<div slot="title">{{btnType == 'create'? '新增': '修改'}}调汇申请单子表</div>

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
					<el-form-item :label-width="labelWidth" label="子表编码" prop="itemCode">
						<el-input v-model="remittanceItem.itemCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="调汇申请单编码" prop="billNo">
						<el-input v-model="remittanceItem.billNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付款科目" prop="paymentSubject">
						<el-input v-model="remittanceItem.paymentSubject" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付款银行" prop="paymentBank">
						<el-input v-model="remittanceItem.paymentBank" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="原币" prop="resourceCurrency">
						<el-input v-model="remittanceItem.resourceCurrency" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="原币金额" prop="resourceAmount">
						<el-input v-model="remittanceItem.resourceAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付款币别" prop="paymentCurrency">
						<el-select v-model="remittanceItem.paymentCurrency" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="汇率" prop="rate">
						<el-input v-model="remittanceItem.rate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="调汇金额" prop="remittanceAmount">
						<el-input v-model="remittanceItem.remittanceAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="付款日期" prop="paymentDate">
						<el-input v-model="remittanceItem.paymentDate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="利率" prop="interestRate">
						<el-input v-model="remittanceItem.interestRate" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="起息日" prop="interestDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="remittanceItem.interestDate" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="到期日" prop="dueDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="remittanceItem.dueDate" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="计息方式" prop="interestMethod">
						<el-select v-model="remittanceItem.interestMethod" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="利息" prop="interest">
						<el-input v-model="remittanceItem.interest" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="年内利息" prop="yearInterest">
						<el-input v-model="remittanceItem.yearInterest" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="年内利息计费时长" prop="yearInterestTime">
						<el-input v-model="remittanceItem.yearInterestTime" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="跨年利息" prop="crossYearInterest">
						<el-input v-model="remittanceItem.crossYearInterest" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="跨年利息计费时长" prop="crossYearInterestTime">
						<el-input v-model="remittanceItem.crossYearInterestTime" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="往来户类型" prop="reciprocatingType">
						<el-select v-model="remittanceItem.reciprocatingType" :style="inputStyle" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="往来户编码" prop="reciprocatingCode">
						<el-input v-model="remittanceItem.reciprocatingCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="往来户名称" prop="reciprocatingName">
						<el-input v-model="remittanceItem.reciprocatingName" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款账户" prop="receiptAccount">
						<el-input v-model="remittanceItem.receiptAccount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款银行" prop="receiptBank">
						<el-input v-model="remittanceItem.receiptBank" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款账号" prop="receiptAccountNo">
						<el-input v-model="remittanceItem.receiptAccountNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收款科目" prop="receiptSubject">
						<el-input v-model="remittanceItem.receiptSubject" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="生成单据编码" prop="generateCode">
						<el-input v-model="remittanceItem.generateCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="实收金额" prop="actualAmount">
						<el-input v-model="remittanceItem.actualAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="实收原币金额" prop="actualResourceAmount">
						<el-input v-model="remittanceItem.actualResourceAmount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="实收原币" prop="actualResourceCurrency">
						<el-input v-model="remittanceItem.actualResourceCurrency" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="香港备注" prop="hkRemark">
						<el-input v-model="remittanceItem.hkRemark" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import RemittanceItem from "../../../domain/entities/finance/RemittanceItem";
	import appHelper from "../../../assets/js/appHelper";

	export default {
		inject: ["formEvents"], // formEvents == bus

		data() {
			return {
				formEntity:  new RemittanceItem(),

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
					this.formEntity = new RemittanceItem()();
					this.loadRemittanceItemCode(); // 加载附件类型编码
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
							.submitCreate("/remittanceitem/", self.formEntity)
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
						this.formEntity = new RemittanceItem()(); //表单重置
						this.loadRemittanceItemCode(); // 加载附件类型编码
						this.popup = false; //弹出层消失
					} else if (self.btnType == 'update') {
						// 修改
						appHelper
							.submitCreate("/remittanceitem/", self.formEntity)
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
			loadRemittanceItemCode() {
				appHelper
					.get("/remittanceitem/id")
					.then(result => (this.formEntity.id = result.data));
			},
			// 点击取消
			closeForm() {
				this.popup = false;
			}
		},

		created() {
			this.loadRemittanceItemCode();
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
