<template>
	<div class="twoColumnt">

		<el-dialog :visible.sync="popup">
			<!-- 标题 -->
			<div slot="title">{{btnType == 'create'? '新增': '修改'}}上货单计划核对信息</div>

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
					<el-form-item :label-width="labelWidth" label="核对信息编码" prop="checkingInfoCode">
						<el-input v-model="hkschedulCheckingInfo.checkingInfoCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="关联上货计划单基本信息编码" prop="scheduleBaseCode">
						<el-input v-model="hkschedulCheckingInfo.scheduleBaseCode" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="已截单" prop="cutOrder">
						<el-checkbox v-model="hkschedulCheckingInfo.cutOrder"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="总单数" prop="totalOrders">
						<el-input v-model="hkschedulCheckingInfo.totalOrders" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="总重量" prop="totalWeight">
						<el-input v-model="hkschedulCheckingInfo.totalWeight" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="总重量单位" prop="totalUnitName">
						<el-input v-model="hkschedulCheckingInfo.totalUnitName" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="卡板总毛重" prop="totalNetWeight">
						<el-input v-model="hkschedulCheckingInfo.totalNetWeight" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="毛重单位" prop="netUnitName">
						<el-input v-model="hkschedulCheckingInfo.netUnitName" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="总箱数" prop="boxCount">
						<el-input v-model="hkschedulCheckingInfo.boxCount" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="截单核对结果" prop="cutOrderResult">
						<el-checkbox v-model="hkschedulCheckingInfo.cutOrderResult"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="截单核对时间" prop="cutOrderTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="hkschedulCheckingInfo.cutOrderTime" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="截单核对人" prop="cutOrderUser">
						<el-input v-model="hkschedulCheckingInfo.cutOrderUser" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="截单核对差异" prop="cutDifference">
						<el-input v-model="hkschedulCheckingInfo.cutDifference" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="装车核对结果" prop="loadResult">
						<el-checkbox v-model="hkschedulCheckingInfo.loadResult"  checked="true"></el-checkbox>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="装车核对时间" prop="loadTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="hkschedulCheckingInfo.loadTime" :style="inputStyle"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="装车核对人" prop="loadUser">
						<el-input v-model="hkschedulCheckingInfo.loadUser" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="装车核对差异" prop="loadDifference">
						<el-input v-model="hkschedulCheckingInfo.loadDifference" :style="inputStyle" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import HkschedulCheckingInfo from "../../../domain/entities/logistics/HkschedulCheckingInfo";
	import appHelper from "../../../assets/js/appHelper";

	export default {
		inject: ["formEvents"], // formEvents == bus

		data() {
			return {
				formEntity:  new HkschedulCheckingInfo(),

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
					this.formEntity = new HkschedulCheckingInfo()();
					this.loadHkschedulCheckingInfoCode(); // 加载附件类型编码
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
							.submitCreate("/hkschedulcheckinginfo/", self.formEntity)
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
						this.formEntity = new HkschedulCheckingInfo()(); //表单重置
						this.loadHkschedulCheckingInfoCode(); // 加载附件类型编码
						this.popup = false; //弹出层消失
					} else if (self.btnType == 'update') {
						// 修改
						appHelper
							.submitCreate("/hkschedulcheckinginfo/", self.formEntity)
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
			loadHkschedulCheckingInfoCode() {
				appHelper
					.get("/hkschedulcheckinginfo/id")
					.then(result => (this.formEntity.id = result.data));
			},
			// 点击取消
			closeForm() {
				this.popup = false;
			}
		},

		created() {
			this.loadHkschedulCheckingInfoCode();
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
