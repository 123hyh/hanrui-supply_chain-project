<template>
	<div class="AddCreditBox">
		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="primary" @click.stop="handleSubmit">返回</el-button>
		</div>
		<!-- 输入框 -->
		<div>
			<el-form :model="hkreceiveRegisterItemForm" ref="hkreceiveRegisterItemForm" label-width="150px" label-position="right" :inline-message="true"
			 class="form-layout">
				<el-form-item v-for="(elem,index) of hkreceiveRegisterItemKey" :key="index" :label="elem.name" :prop="elem.prop">
					<!-- 输入字符串类型 -->
					<el-input v-if="!elem.select && !elem.type" v-model="hkreceiveRegisterItemForm[elem['key']]" style="width: 9vw" :disabled="elem.disabled"
					 :placeholder="hkreceiveRegisterItemForm[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<!--  输入数字类型 -->
					<el-input v-if="!elem.select && elem.type" v-model.number="hkreceiveRegisterItemForm[elem['key']]" style="width: 9vw" :disabled="elem.disabled"
					 :placeholder="hkreceiveRegisterItemForm[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<el-select v-if="elem.select" v-model="hkreceiveRegisterItemForm[elem['key']]" style="width: 9vw" placeholder="请选择选项">
						<template v-for="(obj) in elem.selectKey">
							<el-option v-for="(option) in elem.selectOption" :key="option[obj['label']]" :label="option[obj['label']]" :value="option[obj['value']]"></el-option>
						</template>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<!-- tab -->
		<div>
			<el-tabs v-model="tabActiveName" type="border-card" @tab-click="handlerTabClick">
				<el-tab-pane label="收货登记" name="godown" :disabled='tabIsDisabled'></el-tab-pane>
			</el-tabs>
		</div>
		<!-- 表格 -->
		<div class="handleTableHeight">

			<el-row>
				<el-col :span="24">
					<!-- 操作 -->
					<el-button type="primary" @click="openTabForm('create')">新增</el-button>
					<el-button type="primary" @click="openTabForm('update')">修改</el-button>
					<el-button type="danger" @click="openTabForm('delete')">删除</el-button>
				</el-col>
			</el-row>

			<el-table :data="dataTab" border highlight-current-row @row-click="clickTabRow" ref="moviesTable">
				<el-table-column v-for='item in columnDataTable' :key="item.label" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
			</el-table>

			<!-- 分页 快捷键：ctrl+] 首尾加标签-->
			<div class="pagination">
				<el-pagination ref="dataTabPager" @size-change="handleTabSizeChange" background :page-sizes="[10, 20, 30, 40]"
				 :page-size.sync="queryTableData.pageSize" :current-page.sync="queryTableData.pageIndex" layout="sizes, total, prev, pager, next"
				 :total="queryTableData.total" @current-change="goTabPage"></el-pagination>
			</div>
		</div>
		<!--弹出层： 收款单form -->
		<el-dialog :visible.sync="popFormTab" :close-on-click-modal="false" width="80%" title="收款单">
			<el-form :model="columnData" ref="columnData" label-width="150px" label-position="right" :inline-message="true" class="form-layout">
				<el-form-item v-for="(elem,index) of columnDataKey" :key="index" :label="elem.name" :prop="elem.prop">
					<!-- 输入字符串类型 -->
					<el-input v-if="!elem.select && !elem.type" v-model="columnData[elem['key']]" style="width: 9vw" :disabled="elem.disabled"
					 :placeholder="columnData[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<!--  输入数字类型 -->
					<el-input v-if="!elem.select && elem.type" v-model.number="columnData[elem['key']]" style="width: 9vw" :disabled="elem.disabled"
					 :placeholder="columnData[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<el-select v-if="elem.select" v-model="columnData[elem['key']]" style="width: 9vw" placeholder="请选择选项">
						<template v-for="(obj) in elem.selectKey">
							<el-option v-for="(option,l) in elem.selectOption" :key="l" :label="option[obj['label']]" :value="option[obj['value']]"></el-option>
						</template>
					</el-select>
				</el-form-item>
			</el-form>

			<!-- 按钮行 -->
			<div slot="footer">
				<el-button type="primary" @click="saveTab">保存</el-button>
				<el-button type="cancel" @click="closeTabForm">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import HkreceiveRegisterItem from "@/domain/entities/logistics/HkreceiveRegisterItem";
	import HkreceiveRegisterItemForm from "@/domain/formconfig/logistics/HkreceiveRegisterItem";
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
				hkreceiveRegisterItemForm: new HkreceiveRegisterItem(),
				hkreceiveRegisterItemKey: HkreceiveRegisterItemForm,
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
				} = await api.addData('/hkreceiveRegisterItem', this.hkreceiveRegisterItemForm)
				if (data) {
					// 提交成功后...
					this.$alert('保存成功', '新增', {
						confirmButtonText: '确定',
						callback: action => {
							this.popFormTab = false; //关闭弹窗
							this.hkreceiveRegisterItemForm = new HkreceiveRegisterItem()
						}
					});
				}
			},
			handleSubmit() {
				this.$router.push('M0501')
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
				ColumnData = require("@/domain/entities/logistics/HkreceiveRegisterItem" + this.capitalize(name)).default;
				this.columnData = new ColumnData();
				this.columnDataTable = require("@/domain/tableconfig/logistics/HkreceiveRegisterItem" + this.capitalize(name)).default;
				this.columnDataKey = require("@/domain/formconfig/logistics/HkreceiveRegisterItem" + this.capitalize(name)).default;
				const {
					data
				} = await api.querySearch('/hkreceiveRegisterItem' + name, this.queryTableData)
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
				} = await api.querySearch('/hkreceiveRegisterItem' + this.tabActiveName, this.queryTableData)
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
				this.columnData.hkreceiveRegisterItemNo = this.$store.state.hkreceiveRegisterItemNo;
				// this.$refs.columnDataForm.validate().then(() => {
					// 验证成功
					if (this.$store.state.btnType == 'create') {
						const {
							data: addData
						} = await api.addData('/hkreceiveRegisterItem' + this.tabActiveName, this.columnData)
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
						} = await api.editData('/hkreceiveRegisterItem' + this.tabActiveName, this.columnData)
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
					} = await api.searchOneData('/hkreceiveRegisterItem' + this.tabActiveName,{itemCode:itemCode})
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
									api.deleteData('/hkreceiveRegisterItem' + self.tabActiveName,
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
			this.handlerTabClick({name: 'receivable'});//初始化tab
		},
	};
</script>
<style lang="less" scoped>
	.form-layout {
	  > div {
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
