<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-menu"></i> {{menuName}}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pd-10">
			<!-- 查询栏 -->
			<query-bar :ruleForm="ruleForm" :formConfig="queryBarConfig" :btnObj="btnObj" @handleBtnClickType="handleBtnClick"></query-bar>
			<!-- 表格 -->
			<el-table :data="tableData" border stripe highlight-current-row @row-click="clickTableRow" ref="singleTable">
				<el-table-column v-for='item in tableconfig' :key="item.label" :prop="item.prop" :label="item.label"></el-table-column>
			</el-table>
			<div class="pagination">
				<pagination @handlePageChange="handleChange"  :count="tableCount"></pagination>
			</div>
		</div>
		<popover-component 
			:isShowPopover='formDialog.isShowPopover'
			:popoverType="'form'"
			:formData='formDialog'
			:itemName='formDialog.itemName'
			@changeisShowPopover="closeFormDialog"
			@formClickPreservation="handlerOtherSubmit"
			@handlerFormConfigClickSearch='rousePopover'
			@handlerFormVerify="handlerFormVerify"
		></popover-component>
		<popover-component 
			:isShowPopover='popover.isShowPopover'
			:popoverType="popover.popoverType"
			:currencySelectInputKey='popover.currencySelectInputKey' 
			:formConfig='popover.queryBarObj' 
			:popoverListKey='popover.popoverListKey'
			:popoverList='popover.popoverList'
			:ruleForm='popover.ruleForm'
			:count='popover.count'
			:btnObj='popover.btnObj'
			:itemName='popover.itemName'
			@handleBtnClickType="handleBtnClick"
			@changeisShowPopover='rousePopover'
			@handlerSubPreservation="handlerSubPreservation"
			@handlePageChange="handlePageChange"
		></popover-component>
	</div>
</template>

<script>
	import api from '@/assets/js/appHelper'
	import Pagination from '@/components/common/Pagination'
	import QueryBar from '@/components/common/QueryBar'
	import PopoverComponent from '@/components/common/Popover.vue'
	
	import tableconfig from '@/domain/tableconfig/basicdata/FinanceCharge'
	import ruleForm from '@/domain/entities/basicdata/FinanceCharge'
	import formConfig from '@/domain/formconfig/basicdata/FinanceCharge'
	export default {
		components: {
			QueryBar,
			Pagination,
			PopoverComponent,
		}, 
		data: () => ({
			tableconfig,
			menuName: '财务计费方式表',
			tableData: [],
			tableCount: 0,
			ruleForm: {},
			queryBarConfig: [
				{ label: "编码", moduleBind: "financeChargeCode", isInput: true },
				{ label: "制单人", moduleBind: "creator", isInput: true },
				{ label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
				{ label: "至", moduleBind: "createTimeTo", isDate: true }
			],
			btnObj: [
				{ type: "search", label: "查询" },
				{ type: "add", label: "新增" },
				{ type: "update", label: "修改" },
				{ type: "delete", label: "删除" },
			],
			formDialog: {
				isShowPopover: false,
				paper: {},
				ruleForm: new ruleForm(),
				formConfig,
				btnKey: '',
				clickRow: {},
				validate: new Function, //表单验证回调
			},
			popover: {  //弹出框组件参数
				isShowPopover: false, // 弹窗显示
				queryBarObj: [], // 弹出框查询栏
				queryCode: '', // 查询字段
				configUrl: '', // 文件路径
				popoverType: 'table', // 弹出框
				currencySelectInputKey: '', //弹出框选中对应的key值
				popoverListKey: [], // 弹出框表头绑定的 key
				popoverList: [], // 表格数据
				count: 0, // 分页数据总条数
				ruleForm: {}, // 查询栏的model绑定
				btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
				itemName: '' ,// 弹窗标题
				apiKey: '',//弹窗内部的接口
				busiUnit: 'busiUnit',//改变的经营单位弹出列表
			},
		}),
		computed: {
			clickTypeAsync(){
				return {
					'search': async (page) => {
						try{
							const { data: {list, count} } = await api.queryfinancechargeSearch({...this.ruleForm,...page});
							list && ( this.utools.turnCodeBoolean(list), this.tableData = list, this.tableCount = count );
						}catch(e){console.log(e)}
					},
					'add': () => (this.formDialog.isShowPopover = true, this.loadCodeNo(), this.formDialog.ruleForm = { ...new ruleForm(), financeChargeCode: this.formDialog.ruleForm.financeChargeCode }),
					'update': () => { this.utools.titleCallBack.bind(this)(this.formDialog.clickRow, async ()=>{
						try{
							const { data } = await api.searchOnefinancechargeData(this.formDialog.clickRow.financeChargeCode);
							this.formDialog.ruleForm = this.formDialog.clickRow = data;
							this.formDialog.isShowPopover = true;
						}catch(e){ console.log(e) }	
					})},
					'delete': ()=> {
						this.utools.titleCallBack.bind(this)(this.formDialog.clickRow, ()=>{
							this.utools.deleteMessage.bind(this)(async ()=>{
								try {
									const { status, data: {list, count} } = await api.deletefinancechargeData(this.formDialog.clickRow.financeChargeCode);
									this.utools.alertMessage.bind(this)(status, null, '删除')
									this.clickTypeAsync['search']()
								} catch (e) { console.log(e) }
							})
						})
					},
				}
			}
		},
		methods: {
			//table
			handlerSubPreservation(rowData, key) {
				console.log(rowData, key);
				if(this.tabForm[key]!==undefined){
					if(key.includes('deliveryNo')){
						this.tabForm[key] = rowData['scheduleBaseCode'];
						this.tabForm['entryPort'] = rowData['port'];
						this.tabForm['conveyance'] = rowData['platesNo'];
						this.tabForm['loadingTime'] = rowData['planDate'];
					}
				}
			},
			popoverParamsFn(pop){
				this.popover = {...this.popover,...pop}
			},
			rousePopover(key) {
				console.log(key)
				if(this.tabForm[key]!==undefined){
					let popover = {
						'deliveryNo': {
							queryCode: 'busEntrustNo',
							apiKey: '/hkschedulebase',
							itemName: '上货计划',
							configUrl: 'logistics/HkscheduleBase',
						},
					}
					let allKey = ['deliveryNo','destination','packagingType','receiveUnit','overseaShipper','storagePlace','supervisionType','containerCode','exemption','originCountry','inspectionWay']
					let thisKey = unitArr.includes(key)? 'busiUnit': countryArr.includes(key)? 'originCountry': officeArr.includes(key)? 'iqOffice': allKey.includes(key)? key: 'category';
					this.popoverParamsFn(popover[thisKey])
				}
				let currencyObj = {
					// 配置当前点击请求对象
					[key]: async () => {
						try {
							let { data: {count , list} } = await api.querySearch(this.popover.apiKey, this.popover.ruleForm)
							this.popover.count = count;
							this.popover.queryBarObj = [
								{ label: "编码", moduleBind: this.popover.queryCode, isInput: true },
							];
							this.popover.popoverListKey = require('@/domain/tableconfig/'+this.popover.configUrl).default;
							this.popover.popoverList = list;
						} catch (error) {
							console.log(error);
						}
						this.popover.ruleForm = {};
					},
				}
				this.popover.currencySelectInputKey = key;
				key&&currencyObj[key]();
				this.popover.isShowPopover = !this.popover.isShowPopover;
			},
			//分页
			handlePageChange(paper){
				this.popover.ruleForm = { ...this.popover.ruleForm, ...paper }
				this.handleBtnClick('search'); //翻页查询
			},
			/************************** 弹窗methods end *******************/
			/**
			 * @method handleBtnClick 点击查询栏按钮事件
			 */
			handleBtnClick(clickType, page){
				this.formDialog.btnKey = clickType;
				this.clickTypeAsync[clickType](page);
			},
			/**
			 * @method handlerFormVerify 设置验证规则
			 */
			handlerFormVerify({formModel: {validate}}){
			  this.validate = validate;
			},
			isVerify() {
			  let isVerify = false;
			  this.validate(valid => {
			    isVerify = valid;
			  });
			  return isVerify;
			},
			// 弹窗提交
			async handlerOtherSubmit(){
				if(this.isVerify()){
				try {
					let apiType = this.formDialog.btnKey === 'add'? 'addfinancechargeData': 'editfinancechargeData';
					const {
						data,
						status
					} = await api[apiType](this.formDialog.ruleForm);
					this.utools.alertMessage.bind(this)(status);
					this.clickTypeAsync['search']()
					status==200 && (this.formDialog.isShowPopover = false)
				} catch (e) { console.log(e) }
			}
			},
			// 取消弹窗
			closeFormDialog(){
			  if(!this.formDialog.isShowPopover) return ;
			  this.formDialog.isShowPopover = !this.formDialog.isShowPopover;
				this.setCurrent('')
			},
			// 取消选择
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
				this.formDialog.clickRow = {};
			},
			handleChange(param){ //列表翻页
				this.handleBtnClick('search', param)
			},
			clickTableRow(row){
				if(!(JSON.stringify(row) === JSON.stringify(this.formDialog.clickRow))){
					this.formDialog.clickRow = row;
				}
			},
			async loadCodeNo() { //加载编号
				// 新增时获取采购订单编号
				try {
					const {
						data
					} = await api.getfinancechargeCode()
					this.formDialog.ruleForm.financeChargeCode = data;
				} catch (e) { console.log(e) }
			},
		},
		created(){
			api.initSelect(this.formDialog.formConfig)
			this.handleBtnClick('search');
		},
	}
</script>

<style lang="less" scoped>
</style>
