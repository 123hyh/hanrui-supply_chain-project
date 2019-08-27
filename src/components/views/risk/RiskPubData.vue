<template>
	<el-container class="CustomPubData">
		<el-aside width="200px">
			<el-row class="tac">
				<el-col>
					<el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
						<el-menu-item :index="menu.menuName" :key="index" v-for="(menu,index) in SubMenus">
							<i class="el-icon-arrow-right"></i>
							<span slot="title">{{menu.menuName}}</span>
						</el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</el-aside>
		<el-main>
			<div class="table">
				<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item>
					<i class="el-icon-menu"></i> 物料海关信息
					</el-breadcrumb-item>
				</el-breadcrumb>
				</div>
				<div class="container">
				<!-- 查询栏 -->
					<div class="handle-box">
						<el-form :inline="true">
							<el-form-item label="编码">
								<el-input v-model="queryMaterielCustom.attachmentTypeCode" style="width: 150px"></el-input>
							</el-form-item>
							<el-form-item label="名称">
								<el-input v-model="queryMaterielCustom.classifyName" style="width: 150px"></el-input>
							</el-form-item>
							<el-form-item label="制单人">
								<el-input v-model="queryMaterielCustom.creator" style="width: 150px"></el-input>
							</el-form-item>
							<el-form-item label="制单时间">
								<el-date-picker
										value-format="yyyy-MM-dd HH:mm:ss"
										v-model="queryMaterielCustom.createTimeFrom"
										type="date"
										style="width: 150px"
								></el-date-picker>~
								<el-date-picker
										value-format="yyyy-MM-dd HH:mm:ss"
										v-model="queryMaterielCustom.createTimeTo"
										type="date"
										style="width: 150px"
								></el-date-picker>
							</el-form-item>
							<el-button type="primary" @click="queryData">查询</el-button>
							<el-button type="primary" @click="goCreate">新增</el-button>
							<el-button type="primary" @click="goUpdate">修改</el-button>
							<el-button type="danger" @click="goDelete">删除</el-button>
						</el-form>
					</div>
				<!-- 表格 -->
				<el-table :data="tableData" border :highlight-current-row="true">
						<el-table-column prop="materielId" label="物料基础信息ID"></el-table-column>
						<el-table-column prop="materielCustomCode" label="物料海关信息"></el-table-column>
						<el-table-column prop="customsAbbreviation" label="海关简称"></el-table-column>
						<el-table-column prop="customsAlias" label="海关别名"></el-table-column>
						<el-table-column prop="foreignName" label="外文名称"></el-table-column>
						<el-table-column prop="maxRate" label="最高税率"></el-table-column>
						<el-table-column prop="rebateRate" label="退税率"></el-table-column>
						<el-table-column prop="averagePrice" label="平均价"></el-table-column>
						<el-table-column prop="maxPrice" label="最高单价"></el-table-column>
						<el-table-column prop="minPrice" label="最低单价"></el-table-column>
						<el-table-column prop="totalNo" label="总数量值"></el-table-column>
						<el-table-column prop="taxNo" label="税号"></el-table-column>
						<el-table-column prop="attachNo" label="附号"></el-table-column>
						<el-table-column prop="condition" label="监管条件"></el-table-column>
						<el-table-column prop="declaredModel" label="申报型号"></el-table-column>
						<el-table-column prop="remarks" label="审核备注"></el-table-column>
						<el-table-column prop="verify" label="申报型号审核"></el-table-column>

				</el-table>
				<div class="pagination">
					<el-pagination
					ref="pager"
					background
					:page-size="queryMaterielCustom.pageSize"
					:current-page="queryMaterielCustom.pageIndex"
					layout="sizes, total, prev, pager, next"
					:total="queryMaterielCustom.total"
					@current-change="goPage"
					></el-pagination>
				</div>
				</div>

				<materielCustom-form :show="popForm" @closeform="closeForm"></materielCustom-form>

				<!-- 删除提示框 -->
				<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
				<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="delVisible = false">取 消</el-button>
					<el-button type="primary" @click="deleteRow">确 定</el-button>
				</span>
				</el-dialog>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import appHelper from '@/assets/js/appHelper'
	import MaterielCustomForm from "../basicdata/MaterielCustomForm"

	export default {
		data() {
			return {
				url: './vuetable.json',
				cur_page: 1,
				multipleSelection: [],
				select_cate: '',
				select_word: '',
				del_list: [],
				is_search: false,
				editVisible: false,
				delVisible: false,
				form: {
					name: '',
					date: '',
					address: ''
				},
				idx: -1,

				// 表格数据
				tableData: [],
				// 查询条件
				queryMaterielCustom: {
					pageIndex: 1,
					pageSize: 10,
					total: 0
				},
				// 事件bus
				formEvents: new Vue(),

				popForm: false,

				//公用表格弹窗组件
				popPublicForm: false,

				// 侧栏数据
				SubMenus: []
			}
		},
		created() {
			// 加载侧栏
			this.querySubMenus()

			// 加载列表数据
			this.queryData()

			//-- 监听 form 事件
			// 新建成功
			this.formEvents.$on('formcreated', () => {
				this.$message({
					message: '添加成功！',
					type: 'success'
				})
			})
			// 修改成功
			this.formEvents.$on('formupdated', () => {
				this.$message({
					message: '添加成功！',
					type: 'success'
				})
			})
		},
		computed: {
			data() {
				return this.tableData.filter(d => {
					let is_del = false
					for (let i = 0; i < this.del_list.length; i++) {
						if (d.name === this.del_list[i].name) {
							is_del = true
							break
						}
					}
					if (!is_del) {
						if (
							d.address.indexOf(this.select_cate) > -1 &&
							(d.name.indexOf(this.select_word) > -1 ||
								d.address.indexOf(this.select_word) > -1)
						) {
							return d
						}
					}
				})
			}
		},
		methods: {
			// 请求树形数据
			querySubMenus() {
				appHelper.get('/menu/searchSubMenu?parentMenuCode=M0301').then(result => {
					this.SubMenus = result.data
					console.log(result.data)
					// for( let i of result.data){
					//   if(i.menuCode == this.parentMenuCode){
					//      console.log(i)
					//   }
					// }
				})
			},
			//侧栏控件点击事件
			handleSelect(key, keyPath) {
				console.log(key, keyPath)
			},

			queryPage() {
				appHelper
					.query('/businesscontact/search', this.queryMaterielCustom)
					.then(result => {
						this.tableData = result.data.list
						this.queryMaterielCustom.total = result.data.count
					})
			},

			queryData() {
				this.queryMaterielCustom.pageIndex = 1

				this.queryPage()
			},
			// 翻页处理
			goPage: function(index) {
				let pager = this.$refs.pager
				let vmTblData = this.tableData

				this.$axios
					.post(appHelper.apiPath('/businesscontact/search'), {
						pageIndex: index,
						pageSize: pager.pageSize
						//   queryMap: {},
						//   sorting: ["string"]
					})
					.then(function(result) {
						// 替换数据
						vmTblData.splice(0, vmTblData.length, ...result.data.list)
						// 设置分页
						pager.total = result.data.total
					})
			},

			goCreate() {
				this.formEvents.$emit('openform')
			},
			//显示公用弹窗组件
			showPublicForm() {
				console.log(123)
				this.popPublicForm = true;
				this.$store.commit('popPublicForm', this.popPublicForm);
				// this.formEvents.$emit('popPublicForm');
			},
			goDelete() {},
			goUpdate() {},
			closeForm() {
				this.popForm = false
			},
			// 关闭公用弹窗组件
			closePublicForm() {
				this.popPublicForm = false
			},

			// 分页导航
			handleCurrentChange(val) {
				this.cur_page = val
				this.getData()
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
				if (process.env.NODE_ENV === 'development') {
					this.url = '/ms/table/list'
				}
				this.$axios
					.post(this.url, {
						page: this.cur_page
					})
					.then(res => {
						this.tableData = res.data.list
					})
			},
			search() {
				this.is_search = true
			},
			formatter(row, column) {
				return row.address
			},
			filterTag(value, row) {
				return row.tag === value
			},
			handleEdit(index, row) {
				this.idx = index
				const item = this.tableData[index]
				this.form = {
					name: item.name,
					date: item.date,
					address: item.address
				}
				this.editVisible = true
			},
			handleDelete(index, row) {
				this.idx = index
				this.delVisible = true
			},
			delAll() {
				const length = this.multipleSelection.length
				let str = ''
				this.del_list = this.del_list.concat(this.multipleSelection)
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' '
				}
				this.$message.error('删除了' + str)
				this.multipleSelection = []
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			// 保存编辑
			saveEdit() {
				this.$set(this.tableData, this.idx, this.form)
				this.editVisible = false
				this.$message.success(`修改第 ${this.idx + 1} 行成功`)
			},
			// 确定删除
			deleteRow() {
				this.tableData.splice(this.idx, 1)
				this.$message.success('删除成功')
				this.delVisible = false
			}
		},
		components: {
			MaterielCustomForm,
			PublicForm
		},
		provide() {
			return {
				formEvents: this.formEvents
			}
		}
	}
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

	.el-menu {
		border: 0px;
		height: 36px;
		line-height: 36px;
	}

	.el-menu>li {
		height: 36px;
		line-height: 36px;
	}
</style>
