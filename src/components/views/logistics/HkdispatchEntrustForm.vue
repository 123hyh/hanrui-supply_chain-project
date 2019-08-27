<template>
	<div class="twoColumnt">

		<el-dialog :visible.sync="popup">
			<!-- 标题 -->
			<div slot="title">{{btnType == 'create'? '新增': '修改'}}调度单子表-委托信息</div>

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
						<el-input v-model="hkdispatchEntrust.itemCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="调度单号" prop="dispatchOrderCode">
						<el-input v-model="hkdispatchEntrust.dispatchOrderCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收货方" prop="consignor">
						<el-input v-model="hkdispatchEntrust.consignor" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收货公司" prop="consiCompany">
						<el-input v-model="hkdispatchEntrust.consiCompany" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收货人" prop="consignee">
						<el-input v-model="hkdispatchEntrust.consignee" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="联系电话" prop="telePhone">
						<el-input v-model="hkdispatchEntrust.telePhone" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="收货地址" prop="address">
						<el-input v-model="hkdispatchEntrust.address" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="发货通知单号" prop="noticeNo">
						<el-input v-model="hkdispatchEntrust.noticeNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="要求发货日期" prop="shipTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="hkdispatchEntrust.shipTime" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="提运单号" prop="deliveryNo">
						<el-input v-model="hkdispatchEntrust.deliveryNo" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="车序" prop="carTimes">
						<el-input v-model="hkdispatchEntrust.carTimes" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="项数" prop="termNumber">
						<el-input v-model="hkdispatchEntrust.termNumber" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="毛重" prop="grossWeight">
						<el-input v-model="hkdispatchEntrust.grossWeight" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="备注" prop="remark">
						<el-input v-model="hkdispatchEntrust.remark" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import HkdispatchEntrust from "../../../domain/entities/logistics/HkdispatchEntrust";
	import appHelper from "../../../assets/js/appHelper";

	export default {
		inject: ["formEvents"], // formEvents == bus

		data() {
			return {
				formEntity:  new HkdispatchEntrust(),

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
					this.formEntity = new HkdispatchEntrust()();
					this.loadHkdispatchEntrustCode(); // 加载附件类型编码
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
							.submitCreate("/hkdispatchentrust/", self.formEntity)
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
						this.formEntity = new HkdispatchEntrust()(); //表单重置
						this.loadHkdispatchEntrustCode(); // 加载附件类型编码
						this.popup = false; //弹出层消失
					} else if (self.btnType == 'update') {
						// 修改
						appHelper
							.submitCreate("/hkdispatchentrust/", self.formEntity)
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
			loadHkdispatchEntrustCode() {
				appHelper
					.get("/hkdispatchentrust/id")
					.then(result => (this.formEntity.id = result.data));
			},
			// 点击取消
			closeForm() {
				this.popup = false;
			}
		},

		created() {
			this.loadHkdispatchEntrustCode();
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
