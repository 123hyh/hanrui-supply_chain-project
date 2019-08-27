<template>
	<div class="AddCreditBox">
		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="primary" @click.stop="handleSubmit">返回</el-button>
		</div>
		<!-- 输入框 -->
		<div>
			<el-form :model="transferForm" ref="transferForm" label-width="150px" label-position="right" :inline-message="true"
			 class="form-layout">
				<el-form-item
				v-for="(elem,index) of transferKey"
				:key="index"
				:label="elem.name"
				:prop="elem.prop"
				>
				<!-- 输入字符串类型 -->
				<el-input
					v-if="elem.text && !elem.type"
					v-model="transferForm[elem['key']]"
					style="width: 9vw"
					:disabled="elem.disabled"
					:placeholder="transferForm[elem['key']]"
					:readonly="elem.readonly"
				>
					<el-button
					v-if="elem.btn"
					slot="append"
					icon="el-icon-search"
					@click="rousePopover(elem.key,elem.isShowPopover)"
					></el-button>
				</el-input>
				<!--  输入数字类型 -->
				<el-input
					v-if="elem.text && elem.type"
					tye='number'
					v-model.number="transferForm[elem['key']]"
					style="width: 9vw"
					:disabled="elem.disabled"
					:placeholder="transferForm[elem['key']]"
					:readonly="elem.readonly"
				>
					<el-button
					v-if="elem.btn"
					slot="append"
					icon="el-icon-search"
					@click="rousePopover(elem.key,elem.isShowPopover)"
					></el-button>
				</el-input>
				<el-checkbox v-if="elem.checked" style="width: 9vw" v-model="transferForm[elem['key']]"></el-checkbox>
				<el-date-picker
					value-format="yyyy-MM-dd HH:mm:ss"
					type="date"
					v-model="transferForm[elem['key']]"
					style="width: 9vw"
					v-if="elem.date"
				></el-date-picker>
				<el-select v-if = "elem.select" v-model = "transferForm[elem['key']]" style="width: 9vw"  placeholder = "请选择选项">
					<el-option v-for = "(option) in elem.selectOption" :key = "option['itemValue']" :label = "option['itemValue']" :value = "option['itemKey']" ></el-option>
				</el-select>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import TransferOrder from "@/domain/entities/finance/TransferOrder";
	import TransferForm from "@/domain/formconfig/finance/TransferOrder";
	import api from "@/assets/js/appHelper.js";
	const selectKey = [{
		label: 'itemValue',
		value: 'itemKey'
	}];
	let ColumnData = '';
	export default {
		data() {
			return {
				tabIsDisabled: false, // 禁用tab
				tabActiveName: "receivable", // 激活tab菜单
				// 主form
				transferForm: new TransferOrder(),
				transferKey: TransferForm,
				/*********** 收款单data start***********/
				// table
				dataTab: [],
				// table - 列
				columnDataTable: '',
				// 查询条件 form
				queryTableData: {},
				// 新增form
				columnData: '',
				columnDataKey: '',
				//form弹出框
				popFormTab: false,

				/*********** 收款单data end***********/
			};
		},
		components: {},
		methods: {
			//保存主表单
			async handlePreserve() {
				const {
					data
				} = await api.addData('/transfer', this.transferForm)
				if (data) {
					// 提交成功后...
					this.$alert('保存成功', '新增', {
						confirmButtonText: '确定',
						callback: action => {
							this.popFormTab = false; //关闭弹窗
							this.transferForm = new Transfer()
						}
					});
				}
			},
			handleSubmit() {
				this.$router.push('M0804')
			},
			// 第一个字母转大写
			capitalize([first, ...rest]) {
				return first.toUpperCase() + rest.join('')
			},
			async handlerTabClick({
				name
			} = tab, event) {
				switch (name){
					case 'audit':
					case 'information':
						this.tabActiveName = name = 'information'
						break;
					default:
						break;
				}
				ColumnData = require("@/domain/entities/finance/Transfer" + this.capitalize(name)).default;
				this.columnData = new ColumnData();
				this.columnDataTable = require("@/domain/tableconfig/finance/Transfer" + this.capitalize(name)).default;
				this.columnDataKey = require("@/domain/formconfig/finance/Transfer" + this.capitalize(name)).default;
				const {
					data
				} = await api.querySearch('/transfer' + name, this.queryTableData)
				this.dataTab = data.list;
				this.queryTableData.total = data.count;
				this.queryTableData.pageIndex = 1; //页签调到第一页
				this.$store.state.curRowData = {}; // 清空当前行数据
			},
			/*************** 收款单methods start******************/
			// 翻页处理
			async goTabPage(index, pageSize) {
				let dataTabPager = this.$refs.dataTabPager; //每页的数据对象 翻页更新
				let vmTblData = this.dataTab; //把第一页的数据重新赋值进行修改
				pageSize = dataTabPager.pageSize ? dataTabPager.pageSize : pageSize;
				this.queryTableData.pageIndex = index; //页签调到第一页
				this.queryTableData.pageSize = pageSize; //页签调到第一页
				const {
					data
				} = await api.querySearch('/transfer' + this.tabActiveName, this.queryTableData)
				// 替换数据
				vmTblData.splice(0, vmTblData.length, ...data.list); //用result.data.list来代替vmTblData
				// 设置分页
				dataTabPager.total = data.total;
			},
			// 改变每页行数
			handleTabSizeChange() {
				this.$refs.dataTabPager.pageSize = this.queryTableData.pageSize; //改变每页行数
				this.goTabPage(this.queryTableData.pageIndex, this.queryTableData.pageSize);
			},
			// 新增修改
			async saveTab() {
				this.columnData.transferNo = this.$store.state.transferNo;
				// this.$refs.columnDataForm.validate().then(() => {
					// 验证成功
					if (this.$store.state.btnType == 'create') {
						const {
							data: addData
						} = await api.addData('/transfer' + this.tabActiveName, this.columnData)
						if (addData) {
							// 提交成功后...
							this.$alert('保存成功', '新增', {
								confirmButtonText: '确定',
								callback: action => {
									this.popFormTab = false; //关闭弹窗
									this.handlerTabClick({name: this.tabActiveName})
								}
							});
						}
					} else {
						const {
							data: editData
						} = await api.editData('/transfer' + this.tabActiveName, this.columnData)
						if (editData) {
							// 提交成功后...
							this.$alert('修改成功', '修改', {
								confirmButtonText: '确定',
								callback: action => {
									this.popFormTab = false; //关闭弹窗
									this.handlerTabClick({name: this.tabActiveName})
								}
							});
						}
					}
				// });

			},
			// 是否新增修改
			async openTabForm(btnType) {
				let itemCode = this.$store.state.curRowData.itemCode;
				console.log(itemCode)
				if (btnType == 'update' && itemCode) {
					const {
						data: searchOneData
					} = await api.searchOneData('/transfer' + this.tabActiveName,{itemCode:itemCode})
					this.$store.state.curRowData = searchOneData.data;
				}
				// 拿数据
				this.columnData = btnType == 'create' ? new ColumnData() : this.$store.state.curRowData;
				//显示空选提示语
				if (btnType != 'create' && !itemCode) {
					this.$message.error('请选择数据');
				} else if (btnType != 'delete') {
					this.$store.commit('btnType', btnType)
					this.popFormTab = true;
				}
				// 确认删除
				if (btnType == 'delete' && itemCode) {
					const self = this;
					this.$alert('删除不可恢复，是否确定删除？', '删除', {
						showCancelButton: true,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						beforeClose: (action, instance, done) => {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								instance.confirmButtonText = '执行中...';
								setTimeout(() => {
									// 删除
									console.log(itemCode)
									api.deleteData('/transfer' + self.tabActiveName,
									itemCode).then(res => {
										if (res) {
											// 提交成功后...
											self.$alert('删除成功', '删除', {
												confirmButtonText: '确定',
												callback: action => {
													self.handlerTabClick({name: this.tabActiveName}); //数据刷新
													done();
												}
											})
										}
									})
									done();
									setTimeout(() => {
										instance.confirmButtonLoading = false;
									}, 300);
								}, 1000);

							} else {
								done()
							}
						}
					});
				}
			},
			// 取消弹窗
			closeTabForm() {
				this.popFormTab = false;
			},
			// 选中当前行
			clickTabRow(row) {
				// 获取修改内容
				this.$store.commit('curRowData', row)
				this.$refs.moviesTable.toggleRowSelection(row)
			},
			/*************************** 收款单methods end ****************** */
		},
		created() {
			api.initSelect(this.transferKey);
			this.handlerTabClick({name: 'receivable'});//初始化tab
		},
	};
</script>
<style lang="less" scoped>
	.form-layout {
		display: flex;
		flex-wrap: wrap;
		>div {
			flex-basis: 20vw;
			height: 15px;
		}
	}
	.AddCreditBox {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.handleTableHeight {
		height: 48vh;
	}

	.btnBottom {
		margin-bottom: 10px;
	}
</style>
