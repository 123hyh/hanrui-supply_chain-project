<template>
  <div class="AgreementForm">
    <!-- table 弹出框 -->
    <popover
      :btnObj="popover.btnObj"
      :count="popover.count"
      :currencySelectInputKey="popover.currencySelectInputKey"
      :formConfig="popover.queryBarObj"
      :isShowPopover="popover.isShowPopover"
      :itemName="popover.itemName"
      :popoverList="popover.popoverList"
      :popoverListKey="popover.popoverListKey"
      :popoverType="popover.popoverType"
      :ruleForm="popover.ruleForm"
      @changeisShowPopover="rousePopover"
      @handleBtnClickType="handleBtnClick"
      @handlePageChange="handlePageChange"
      @handlerSubPreservation="handlerSubPreservation"
    ></popover>
    <!-- 保存 返回 按钮 -->
    <!-- <div class="mb-10">
		  <el-button type="primary" @click.stop="handlePreserve">保存</el-button>
		  <el-button type="primary" @click.stop="handleRollback">返回</el-button>
    </div>-->
    <preserve-btn
      :form="agreementForm"
      :isLoading="isLoading"
      @handlePreserve="handlePreserve"
      @handleRollback="handleRollback"
    ></preserve-btn>
    <!-- 输入框 -->
    <div>
      <form-config
        :formModel="agreementForm"
        :inputKey="agreementKey"
        @handlerFormConfigClickSearch="rousePopover"
        @handlerFormVerify="handlerFormVerify"
      ></form-config>
    </div>
    <!-- tab -->
    <el-row :gutter="10">
      <el-col :span="12">
        <el-tabs
          @tab-click="handlerTabClick_one"
          class="handleTableHeight tab_one"
          type="border-card"
          v-model="tabActiveName_one"
        >
          <el-tab-pane :disabled="tabIsDisabled_one" label="方案明细" name="solution"></el-tab-pane>
          <el-tab-pane :disabled="tabIsDisabled_one" label="合同条款明细" name="contract"></el-tab-pane>
          <!-- <el-tab-pane label="被修改日志记录" name="record" :disabled='tabIsDisabled_one'></el-tab-pane> -->
          <el-tab-pane :disabled="tabIsDisabled_one" label="授权邮箱" name="email"></el-tab-pane>
          <!-- 表格 -->
          <div v-if="!tabIsDisabled_one">
            <div v-if="tabActiveName_one=='contract'">
              <!-- 按钮行 -->
              <div slot="footer" v-if="+(agreementForm.status || 0) <=1 ">
                <el-button @click="saveTab_one('contract')">保存</el-button>
              </div>
              <form-config
                :formModel="agreementContractForm"
                :inputKey="agreementContractKey"
                @handlerFormConfigClickSearch="rousePopover"
                @handlerFormVerify="handlerFormVerify_one"
              ></form-config>
            </div>
            <div v-if="tabActiveName_one!='contract'">
              <div class="mb-10" v-if="tabActiveName_one!='record'">
                <el-row v-if="+(agreementForm.status || 0) <=1 ">
                  <el-col :span="24">
                    <!-- 操作 -->
                    <el-button @click="openTabForm_one('create')">新增</el-button>
                    <el-button @click="openTabForm_one('update')">修改</el-button>
                    <el-button @click="openTabForm_one('delete')">删除</el-button>
                  </el-col>
                </el-row>
              </div>
              <table-component
                :count="queryTableData_one.count"
                :dialog="false"
                :isSubTable="true"
                :popoverList="dataTab_one"
                :popoverListKey="columnDataTable_one"
                @handlePageChange="handleTabPageChange_one"
                @rowClickData="clickTabRow_one"
              ></table-component>
            </div>
          </div>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <el-tabs
          @tab-click="handlerTabClick"
          class="handleTableHeight tab_two"
          type="border-card"
          v-model="tabActiveName"
        >
          <el-tab-pane :disabled="tabIsDisabled" label="受托方收款项目" name="clinet"></el-tab-pane>
          <el-tab-pane :disabled="tabIsDisabled" label="商务条款" name="clause"></el-tab-pane>
          <el-tab-pane :disabled="tabIsDisabled" label="补充协议" name="replenish"></el-tab-pane>
          <el-tab-pane :disabled="tabIsDisabled" label="保险事项" name="insurance"></el-tab-pane>
          <!-- <el-tab-pane label="阶梯报价规则" name="offer" :disabled='tabIsDisabled'></el-tab-pane> -->
          <el-tab-pane :disabled="tabIsDisabled" label="供应商承担费用" name="supplier"></el-tab-pane>
          <!-- 表格 -->
          <div v-if="!tabIsDisabled">
            <div class="mb-10">
              <el-row>
                <el-col :span="24" v-if="tabActiveName!='offer'">
                  <div v-if="+(agreementForm.status||0) <= 1">
                    <!-- 操作 -->
                    <el-button @click="openTabForm('create')" v-if="tabActiveName != 'clinet'">新增</el-button>
                    <el-button @click="openTabForm('update')">修改</el-button>
                    <el-button @click="openTabForm('delete')">删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <table-component
              :count="queryTableData.count"
              :dialog="false"
              :isSubTable="true"
              :popoverList="dataTab"
              :popoverListKey="columnDataTable"
              @handlePageChange="handleTabPageChange"
              @rowClickData="clickTabRow"
            ></table-component>
          </div>
        </el-tabs>
      </el-col>
    </el-row>
    <!--弹出层： 供应链供应商form -->
    <el-dialog
      :close-on-click-modal="false"
      :title="title_one"
      :visible.sync="popFormTab_one"
      v-dialogDrag
      width="1025px"
    >
      <form-config
        :formModel="columnData_one"
        :inputKey="columnDataKey_one"
        @handlerFormConfigClickSearch="handlerFormConfigClickSearch_one"
        @handlerFormVerify="handlerFormVerify_one"
      ></form-config>
      <!-- 按钮行 -->
      <div slot="footer">
        <el-button @click="saveTab_one">保存</el-button>
        <el-button @click="closeTabForm_one">取消</el-button>
      </div>
    </el-dialog>
    <!--弹出层： 供应链供应商form -->
    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="popFormTab"
      v-dialogDrag
      width="53%"
    >
      <form-config
        :formModel="columnData"
        :inputKey="columnDataKey"
        @handlerFormConfigClickSearch="rousePopover"
        @handlerFormVerify="handlerFormVerify_right"
      ></form-config>
      <!-- 按钮行 -->
      <div slot="footer">
        <el-button @click="saveTab" type="primary">保存</el-button>
        <el-button @click="closeTabForm" type="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入公共的table组件
import Popover from '@/components/common/Popover.vue'
import FormConfig from '@/components/common/FormConfig.vue'
import Pagination from '@/components/common/Pagination.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import agreementForm from '@/domain/entities/business/Agreement'
import agreementKey from '@/domain/formconfig/business/Agreement'

import agreementContractForm from '@/domain/entities/business/AgreementContract'
import agreementContractKey from '@/domain/formconfig/business/AgreementContract'
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'
import businessProtocolSolution from '@/domain/tableconfig/basicdata/BusinessProtocolSolution.js'
// 引入vuex
import { mapGetters, mapActions, mapMutations } from 'vuex'

let ColumnData = ''

export default {
  name: 'AgreementForm',
  components: {
    Popover: _ => import('@/components/common/Popover.vue'),
    FormConfig,
    Pagination,
    TableComponent
  },
  data: () => ({
    itemVerify: {}, // form弹窗的校验规则
    popover: {
      //弹出框组件参数
      isShowPopover: false, // 弹窗显示
      queryBarObj: [], // 弹出框查询栏
      popoverType: 'table', // 弹出框
      currencySelectInputKey: '', //弹出框选中对应的key值
      popoverListKey: [], // 弹出框表头绑定的 key
      popoverList: [], // 表格数据
      count: 0, // 分页数据总条数
      ruleForm: {}, // 查询栏的model绑定
      curPopStorage: {}, // 当前弹窗传递的数据
      btnObj: [{ type: 'search', label: '查询' }], // 查询栏按钮
      itemName: '', // 弹窗标题
      apiKey: '' //弹窗内部的接口
    },
    /************* 弹窗data end *****************/
    // 主form
    agreementForm: new agreementForm(),
    agreementKey: utools.cloneObj(agreementKey),
    /*********** 应收结算单data start***********/
    tabActiveName_one: '',
    tabActiveName: '',
    tabIsDisabled: true,
    tabIsDisabled_one: true,
    clickRowData_one: {},
    clickRowData: {},
    jumpType: '',
    agreementSolutionNo: '',
    // table
    dataTab_one: [],
    dataTab: [],
    // table - 列
    columnDataTable_one: '',
    columnDataTable: '',
    // 分页查询条件 form
    queryTableData_one: {},
    queryTableData: {},
    // 新增form
    agreementContractForm: new agreementContractForm(),
    agreementContractKey,
    columnData: '',
    columnData_one: '',
    columnDataKey: '',
    columnDataKey_one: '',
    //form弹出框
    popFormTab_one: false,
    popFormTab: false,
    title_one: '',
    title: '',
    isLoading: false,
    form_right_method: {
      validate: eval,
      resetFields: eval
    }
    /*********** 应收结算单data end***********/
  }),

  computed: {
    ...mapGetters(['btnType', 'getActivePathData'])
  },

  watch: {
    'columnData_one.serviceChargeType': {
      handler(cur, pre) {
        for (let item of this.columnDataKey_one) {
          
          if (item.key === 'serviceChargeRate') {
            item.disabled = cur == '2'
          } else if (
            item.key === 'serviceCharge' ||
            item.key === 'serviceChargeCurrency'
          ) {
            item.disabled = cur == '1'
          }
          /* switch (item.key) {
            case 'serviceChargeRate':
              item.disabled = cur == '2'
              break
            case 'serviceCharge':
            case 'serviceChargeCurrency':
              item.disabled = cur == '1'
              break
            default:
              break
          } */
        }
      },
      deep: true
    },

    'columnData_one.customType': {
      handler(cur, pre) {
        if (!cur || cur == pre) return
        pre && delete this.columnData_one.businessType
        for (let item of this.columnDataKey_one) {
          switch (item.key) {
            case 'businessType':
              switch (cur) {
                case '1':
                  item.selectOption = [
                    { itemValue: '执行采购', itemKey: '1' },
                    { itemValue: '代理采购', itemKey: '2' }
                  ]
                  break
                case '2':
                  item.selectOption = [
                    { itemValue: '执行销售', itemKey: '3' },
                    { itemValue: '代理销售', itemKey: '4' }
                  ]
                  break
                case '3':
                  item.selectOption = [{ itemValue: '代理采购', itemKey: '2' }]
                  break
                case '4':
                  item.selectOption = [
                    { itemValue: '货运代理', itemKey: '5' },
                    { itemValue: '仓储配送', itemKey: '6' }
                  ]
                  break
                default:
                  item.selectOption = []
                  break
              }
            default:
              break
          }
        }
      },
      deep: true
    },
    // 当 弹窗关闭时 取消字段验证 样式
    popFormTab_one(val) {
      if (!val) {
        // this.itemVerify["formModel"].resetFields();
      }
    },
    popFormTab(val) {
      if (!val) {
        this.form_right_method.resetFields()
      }
    },

    // 方案明显 - 服务费种类 变化 的处理逻辑
    'columnData_one.serviceChargeType'(val) {
      if (val) {
        //  if(服务费种类 === 比率(1)){
        // 服务费率必须校验，服务费定额和定额币种不需要校验
        // }else if(服务费类型 === 定额(2)){
        //   服务费不需要校验，服务费定额和定额币种必须校验
        //   }
        const rules = [{ required: true, message: '必填' }]
        utools.setFormConfig(this.columnDataKey_one, [
          {
            key: 'serviceChargeRate', // 服务费率
            rules: val === '1' ? rules : [],
            disabled: !(val === '1')
          },
          {
            key: 'serviceCharge', // 服务费定额
            rules: val === '2' ? rules : [],
            disabled: !(val === '2')
          },
          {
            key: 'serviceChargeCurrency', // 定额币种
            rules: val === '2' ? rules : [],
            disabled: !(val === '2')
          }
        ])

        // 清空 相关数据
        if (val === '1') {
          ;(this.columnData_one['serviceCharge'] = ''),
            (this.columnData_one['serviceChargeCurrency'] = '')
        } else {
          this.columnData_one['serviceChargeRate'] = ''
        }

        // 取消字段校验样式
        this.$nextTick(() => {
          this.itemVerify['formModel']['clearValidate'](
            val == '1'
              ? ['serviceCharge', 'serviceChargeCurrency']
              : ['serviceChargeRate']
          )
        })
      }
    },
    // 清空弹窗的参数
    'popover.isShowPopover'(val) {
      if (!val) {
        this.popover.count = 0
        this.popover.ruleForm = {
          ...this.popover.ruleForm,
          pageIndex: 1,
          pageSize: 10
        }
      }
    }
  },
  methods: {
    ...mapMutations(['addBtnType', 'addbreadCrumbsList']),

    handlerFormVerify_right({ formModel: { validate, resetFields } } = {}) {
      this.form_right_method = { validate, resetFields }
    },

    // 左子表 的 form弹窗search按钮事件
    handlerFormConfigClickSearch_one(target) {
      Promise.all([
        this.setFormDialog_one(
          target
        ) /* this.getFormDialog_one_PageData({ target }) */
      ])
    },

    // 设置表格弹窗
    setFormDialog_one(target) {
      let { config, queryBarObj, itemName, apiKey } = {
        solutionName: {
          config: businessProtocolSolution,
          queryBarObj: [
            /* { label: "公司编码", moduleBind: "companyCode", isInput: true }, */
          ],
          itemName: '方案名称',
          apiKey: '/solution'
        }
      }[target]
      this.popover = {
        ...this.popover,
        isShowPopover: true,
        queryBarObj,
        popoverListKey: config,
        itemName,
        popoverList: [],
        currencySelectInputKey: target,
        apiKey
      }
      this.handlePageChange()
    },

    /************************** 弹窗methods start *******************/
    handleBtnClick: (() => {
      //点击查询栏按钮事件
      var obj = null
      return function(type, clear) {
        console.log(type, clear)
        if (clear) {
          obj = null
        } else {
          !obj && (obj = this.handleBtnClickObj())
          obj[type].call(this)
        }
      }
    })(),

    handleBtnClickObj() {
      return {
        async search() {
          try {
            var {
              data: { count = 0, list = [] }
            } = await api.querySearch(
              this.popover.apiKey,
              this.popover.ruleForm
            )
            this.popover.count = count
            this.popover.popoverList = list
          } catch (e) {
            console.log(e)
          }
          // 清空查询数据
          this.popover.queryBarObj.forEach((e, i) => {
            if (this.popover.ruleForm[e.moduleBind])
              this.popover.ruleForm[e.moduleBind] = ''
          })
        }
      }
    },

    async customerAccount(code) {
      try {
        const { data: creditData } = await api.getCredit({
          customerCode: code
        })
        this.agreementForm['customerLimit'] =
          creditData.list.length > 0
            ? creditData.list[0]['creditLimitAmount']
              ? creditData.list[0]['creditLimitAmount']
              : 0
            : 0
        const { data: clientData } = await api.queryclientSearch({
          clientNo: code
        })
        this.agreementForm['customerAccountPeriod'] =
          clientData.list.length > 0
            ? clientData.list[0]['accountPeriod']
              ? clientData.list[0]['accountPeriod']
              : 0
            : 0
      } catch (e) {
        console.log(e)
      }
    },

    //table
    async handlerSubPreservation(rowData, key) {
      const setAgrForm = (obj, target) => {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) this.$set(target, key, rowData[obj[key]])
        }
      }
      if (this.agreementForm[key] !== undefined) {
        if (key.includes('trusteeName')) {
          setAgrForm(
            {
              [key]: 'companyName',
              trusteeCode: 'companyCode',
              trusteeLegalPerson: 'corporate',
              trusteeAddress: 'address'
            },
            this.agreementForm
          )
        } else {
          setAgrForm(
            {
              [key]: 'clientName',
              customerCode: 'clientNo',
              legalPersonA: 'legalPerson',
              legalPersonAAddress: 'businessLicenseAddress'
            },
            this.agreementForm
          )
          this.customerAccount(rowData['clientNo'])
        }
      } else if (this.columnData[key] !== undefined) {
        if (key.includes('supplierName')) {
          setAgrForm(
            {
              [key]: 'supplierName',
              supplierCode: 'supplierCode',
              supplierNameEn: 'supplierForeignName'
            },
            this.columnData
          )
          /* this.columnData[key] = rowData["supplierName"];
          this.columnData["supplierCode"] = rowData["supplierCode"];
          this.columnData["supplierNameEn"] = rowData["supplierForeignName"]; */
        } else if (
          key.includes('chargeItemName') ||
          key.includes('chargeItemCode')
        ) {
          setAgrForm(
            {
              chargeItemName: 'financeProjectName',
              chargeItemCode: 'financeProjectCode'
            },
            this.columnData
          )
          /* this.columnData["chargeItemName"] = rowData["financeProjectName"];
          this.columnData["chargeItemCode"] = rowData["financeProjectCode"]; */
        }
      } else if (key === 'solutionName') {
        // let { billNo, solutionName, customType, businessType } = rowData;
        setAgrForm(
          {
            solutionNo: 'billNo',
            solutionName: 'solutionName',
            customType: 'customType',
            businessType: 'businessType'
          },
          this.columnData_one
        )
        /* let data = ;
        for (let key in data) {
          if (data.hasOwnProperty(key)) this.$set(this.columnData_one, key, data[key])
        } */
      }
    },

    rousePopover(key) {
      console.log(key)
      if (this.agreementForm[key] !== undefined) {
        if (key == 'trusteeName') {
          this.popover.queryBarObj = [
            { label: '公司编码', moduleBind: 'companyCode', isInput: true }
          ]
          this.popover.apiKey = '/companyinfo'
          this.popover.itemName = '公司'
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: 'companyCode', name: '公司编码' },
            { key: 'companyName', name: '名称' },
            { key: 'corporate', name: '法人代表' },
            { key: 'address', name: '详细地址' },
            { key: 'registFund', name: '注册资金' }
          ]
        } else {
          this.popover.queryBarObj = [
            { label: '委托方编号', moduleBind: 'clientNo', isInput: true }
          ]
          this.popover.apiKey = '/client'
          this.popover.itemName = '委托方'
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: 'clientNo', name: '委托方编号' },
            { key: 'clientName', name: '委托方名称' },
            { key: 'legalPerson', name: '法人代表' },
            { key: 'clientLevelName', name: '委托方等级' },
            { key: 'businessLicenseAddress', name: '营业执照地址' }
          ]
        }
      } else if (this.columnData[key] !== undefined) {
        if (key == 'supplierName') {
          this.popover.queryBarObj = [
            { label: '供应商编码', moduleBind: 'supplierCode', isInput: true }
          ]
          this.popover.apiKey = '/supplierbase'
          this.popover.itemName = '供应商列表'
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: 'supplierCode', name: '供应商编码' },
            { key: 'supplierName', name: '供应商名称' },
            { key: 'supplierForeignName', name: '供应商外文名称' },
            { key: 'legalRepresentative', name: '法人代表' },
            { key: 'supplierAddress', name: '详细地址' }
          ]
        } else if (key == 'chargeItemName' || key == 'chargeItemCode') {
          this.popover.queryBarObj = [
            {
              label: '计费项目编码',
              moduleBind: 'financeProjectCode',
              isInput: true
            }
          ]
          this.popover.apiKey = '/financeproject'
          this.popover.itemName = '计费项目'
          this.popover.popoverListKey = [
            // 设置表格的表头
            { key: 'financeProjectCode', name: '财务计费项目编码' },
            { key: 'financeProjectName', name: '名称' },
            { key: 'description', name: '描述' },
            { key: 'debitSubject', name: '借方科目' },
            { key: 'creditSubject', name: '贷方科目' }
          ]
        }
      }
      const WHITE_LIST = [
        'chargeItemName',
        'supplierName',
        'chargeItemCode',
        'customerName',
        'trusteeName'
      ]
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(this.popover.apiKey, {
              ...this.popover.ruleForm,
              status: WHITE_LIST.includes(key) ? '2' : ''
            })
            this.popover.count = count
            this.popover.popoverList = list
          } catch (e) {
            console.log(e)
          }
          this.popover.ruleForm = {}
        }
      }
      this.popover.currencySelectInputKey = key
      key && currencyObj[key]()
      this.popover.isShowPopover = !this.popover.isShowPopover
    },

    //分页
    handlePageChange(paper = {}) {
      this.popover.ruleForm = { ...this.popover.ruleForm, ...paper }
      this.handleBtnClick('search') //翻页查询
    },

    /************************** 弹窗methods end *******************/
    // 点击取消按钮，回到列表页
    handleRollback() {
      this.$router.push('M0205')
    },

    handlerFormVerify_one($refs) {
      this.itemVerify = $refs
    },

    handlerFormVerify($refs) {
      this.verify = $refs
    },

    isVerify() {
      let isVerify = false
      this.verify['formModel'].validate(valid => {
        isVerify = valid
      })
      return isVerify
    },

    //分页
    async handleTabPageChange_one(paper) {
      const {
        data: { list = [], count = 0 }
      } = await api.querySearch('/agreement' + this.tabActiveName_one, paper)
      this.dataTab_one = list
      this.utools.turnCodeBoolean(this.dataTab_one)
      this.queryTableData_one.count = count
      if (this.tabActiveName_one == 'contract' && this.dataTab_one.length) {
        const { data: contractData } = await api.searchOneagreementcontractData(
          this.dataTab_one[0]['agreementNo']
        )
        this.agreementContractForm = contractData
      }
    },

    async handleTabPageChange(paper) {
      const {
        data: { list = [], count = 0 }
      } = await api.querySearch('/agreement' + this.tabActiveName, paper)
      this.dataTab = list
      this.utools.turnCodeBoolean(this.dataTab)
      this.queryTableData.count = count
    },

    // 第一个字母转大写
    capitalize([first, ...rest]) {
      return first.toUpperCase() + rest.join('')
    },

    async handlerTabClick_one({ name } = tab, event) {
      this.title_one =
        name == 'solution'
          ? '方案明细'
          : name == 'contract'
          ? '合同条款明细'
          : name == 'record'
          ? '被修改日志记录'
          : '授权邮箱'
      ColumnData = require('@/domain/entities/business/Agreement' +
        this.capitalize(name)).default
      this.columnData_one = new ColumnData()
      this.columnDataTable_one = require('@/domain/tableconfig/business/Agreement' +
        this.capitalize(name)).default
      console.log(`Agreement${this.capitalize(name)}`)
      this.columnDataKey_one = require('@/domain/formconfig/business/Agreement' +
        this.capitalize(name)).default
      this.columnData_one.agreementNo = this.agreementForm.agreementNo
      // 拿数据
      this.agreementContractForm.agreementNo = this.agreementForm.agreementNo
      api.initSelect(this.agreementContractKey)
      api.initSelect(this.columnDataKey_one)
      this.handleTabPageChange_one({
        pageIndex: 1,
        agreementNo: this.agreementForm.agreementNo
      })
      this.clickRowData_one = {} // 清空当前行数据
    },

    async handlerTabClick({ name } = tab, event) {
      this.title =
        {
          clinet: '受托方收款项目',
          clause: '商务条款',
          replenish: '补充协议',
          insurance: '保险事项',
          offer: '阶梯报价规则'
        }[name] || '供应商承担费用'

      ColumnData = require('@/domain/entities/business/Agreement' +
        this.capitalize(name)).default
      this.columnData = new ColumnData()
      this.columnDataTable = require('@/domain/tableconfig/business/Agreement' +
        this.capitalize(name)).default
      this.columnDataKey = require('@/domain/formconfig/business/Agreement' +
        this.capitalize(name)).default
      this.columnData.agreementNo = this.agreementForm.agreementNo
      api.initSelect(this.columnDataKey)

      name !== 'clinet'
        ? this.handleTabPageChange({
            pageIndex: 1,
            agreementNo: this.agreementForm.agreementNo
          })
        : this.handleTabPageChange({
            pageIndex: 1,
            agreementNo: this.agreementForm.agreementNo,
            solutionNo: this.agreementSolutionNo
              ? this.agreementSolutionNo
              : '123456'
          })

      this.clickRowData = {} // 清空当前行数据
    },

    /*************** 业务员列表methods start******************/
    //保存主表单
    // 保存后拿到itemCode
    async handlePreserve() {
      if (this.jumpType == 'update') {
        if (this.isVerify()) {
          this.isLoading = true
          try {
            const { data } = await api.editagreementData(this.agreementForm)
            if (data) {
              // 提交成功后...
              this.$message.success('保存成功')
              this.tabIsDisabled_one = false
              this.tabIsDisabled = false
              this.tabActiveName_one = 'solution'
              this.tabActiveName = 'clinet'
              this.handlerTabClick_one({ name: this.tabActiveName_one }) //数据刷新
              this.handlerTabClick({ name: this.tabActiveName }) //数据刷新
            }
          } catch (e) {
            this.$message.error('保存失败，请重试！')
            console.log(e)
          } finally {
            this.isLoading = false
          }
        }
      } else {
        if (this.isVerify()) {
          this.isLoading = true
          try {
            const { data } = await api.addagreementData(this.agreementForm)
            this.agreementForm = {
              ...this.agreementForm,
              status: data.status || '1'
            }
            if (data) {
              // 提交成功后...
              this.$message.success('保存成功')
              this.tabIsDisabled_one = false
              this.tabIsDisabled = false
              this.tabActiveName_one = 'solution'
              this.tabActiveName = 'clinet'
              this.handlerTabClick_one({ name: this.tabActiveName_one }) //数据刷新
              this.handlerTabClick({ name: this.tabActiveName }) //数据刷新
            }
            this.jumpType = 'update'
          } catch (e) {
            this.$message.error('保存失败，请重试！')
            console.log(e)
          } finally {
            this.isLoading = false
          }
        }
      }
    },

    // 新增修改子form
    saveTab_one(tabName) {
      try {
        const {
          formModel: { validate }
        } = this.itemVerify
        validate(async valid => {
          if (valid) {
            this.columnData_one =
              tabName == 'contract'
                ? this.agreementContractForm
                : this.columnData_one
            // 验证成功
            if (this.btnType == 'update') {
              const { data: editData } = await api.editData(
                '/agreement' + this.tabActiveName_one,
                this.columnData_one
              )
              if (editData) {
                // 提交成功后...
                this.$message.success('保存成功')
                this.popFormTab_one = false //关闭弹窗
                this.handlerTabClick_one({ name: this.tabActiveName_one }) //数据刷新
              }
            } else {
              const { data: addData } = await api.addData(
                '/agreement' + this.tabActiveName_one,
                this.columnData_one
              )
              if (addData) {
                // 提交成功后...
                this.$message.success('保存成功')
                this.popFormTab_one = false //关闭弹窗
                this.handlerTabClick_one({ name: this.tabActiveName_one }) //数据刷新
              }
            }
          }
        })
      } catch (error) {
        this.$message.error('保存失败，请重试！')
      }
    },

    // 新增修改子form
    async saveTab() {
      try {
        this.form_right_method.validate(async valid => {
          if (valid) {
            // 验证成功
            const data = await (this.btnType == 'update'
              ? api.editData
              : api.addData
            ).call(api, `/agreement${this.tabActiveName}`, this.columnData)
            this.popFormTab = false //关闭弹窗
            this.handlerTabClick({ name: this.tabActiveName }) //数据刷新
            this.$message.success('保存成功！')
          }
        })
      } catch (error) {
        this.$message.error('保存失败，请重试！')
        console.log(error)
      }
    },

    // 是否新增修改
    async openTabForm_one(btnType) {
      //判断是哪个tab表
      ColumnData = require('@/domain/entities/business/Agreement' +
        this.capitalize(this.tabActiveName_one)).default
      this.columnDataKey_one = require('@/domain/formconfig/business/Agreement' +
        this.capitalize(this.tabActiveName_one)).default
      api.initSelect(this.columnDataKey_one)
      // 开始

      let clickRowData_one = this.clickRowData_one
      // 判断是不是方案明细
      if (btnType == 'update' && JSON.stringify(clickRowData_one) != '{}') {
        try {
          const { data: searchOneData } = await api.searchOneData(
            '/agreement' + this.tabActiveName_one,
            { itemCode: clickRowData_one['itemCode'] }
          )
          clickRowData_one = searchOneData
        } catch (e) {
          this.$message.error('获取单条方案明显失败，请重试！')
          console.log(e)
        }
      }

      // 拿数据
      this.columnData_one =
        btnType == 'create' ? new ColumnData() : clickRowData_one
      //显示空选提示语
      if (btnType != 'create' && JSON.stringify(clickRowData_one) == '{}') {
        this.$message.warning('请选择数据')
      } else if (btnType != 'delete') {
        btnType === 'create' &&
          (this.columnData_one.agreementNo = this.agreementForm.agreementNo)
        this.addBtnType(btnType)
        this.popFormTab_one = true
      }
      // 确认删除
      if (btnType == 'delete') {
        this.utools.titleCallBack.call(
          this,
          clickRowData_one,
          this.utools.deleteMessage.bind(
            this,
            this.utools.removeReceiptsTips.bind(this, async () => {
              let itemCode = clickRowData_one.itemCode
              await api.deleteData(
                '/agreement' + this.tabActiveName_one,
                itemCode
              )
              this.handlerTabClick_one({ name: this.tabActiveName_one })
              this.tabActiveName_one === 'solution' && (this.dataTab = []) // 清空 右表格数据
            })
          )
        )
        /* this.utools.deleteMessage.bind(this)(async () => {
          let itemCode = clickRowData_one.itemCode;
          try {
            const { data, status } = await api.deleteData(
              "/agreement" + this.tabActiveName_one,
              itemCode
            );
            this.utools.alertMessage.bind(this)(status, null, "删除");
            this.handlerTabClick_one({ name: this.tabActiveName_one });
          } catch (e) {
            console.log(e);
          }
        }); */
      }
    },

    // 是否新增修改
    async openTabForm(btnType) {
      //判断是哪个tab表
      ColumnData = require('@/domain/entities/business/Agreement' +
        this.capitalize(this.tabActiveName)).default
      this.columnDataKey = require('@/domain/formconfig/business/Agreement' +
        this.capitalize(this.tabActiveName)).default
      api.initSelect(this.columnDataKey)
      // 开始
      if (btnType == 'update' && JSON.stringify(this.clickRowData) != '{}') {
        try {
          const { data: searchOneData } = await api.getCode(
            `/agreement${this.tabActiveName}/${this.clickRowData.itemCode}`
          )
          this.clickRowData = searchOneData
        } catch (e) {
          console.log(e)
        }
      }
      // 拿数据
      this.columnData =
        btnType == 'create' ? new ColumnData() : this.clickRowData
      //显示空选提示语

      if (btnType != 'create' && JSON.stringify(this.clickRowData) == '{}') {
        this.$message.warning('请选择数据')
      } else if (btnType != 'delete') {
        btnType === 'create' &&
          ((this.columnData.solutionNo = this.agreementSolutionNo),
          (this.columnData.agreementNo = this.agreementForm.agreementNo))
        this.addBtnType(btnType)
        this.popFormTab = true
      }
      // 确认删除
      if (btnType == 'delete') {
        this.utools.titleCallBack.call(
          this,
          this.clickRowData,
          this.utools.deleteMessage.bind(
            this,
            this.utools.removeReceiptsTips.bind(this, async () => {
              await api.deleteData(
                '/agreement' + this.tabActiveName,
                this.clickRowData.itemCode
              )
              this.handlerTabClick({ name: this.tabActiveName })
            })
          )
        )
        /*  this.utools.deleteMessage.bind(this)(async () => {
           try {
             const { data, status } = await api.deleteData(
               "/agreement" + this.tabActiveName,
               this.clickRowData.itemCode
             );
             this.utools.alertMessage.bind(this)(status, null, "删除");
             this.handlerTabClick({ name: this.tabActiveName });
           } catch (e) {
             console.log(e);
           }
         }); */
      }
    },

    async loadCodeNo() {
      //加载编号
      try {
        let { data } = await api.getagreementCode()
        /* this.agreementForm.agreementCode = */ this.agreementForm.agreementNo = data
      } catch (e) {
        console.log(e)
      }
    },

    // 取消弹窗
    closeTabForm_one() {
      this.popFormTab_one = false
    },

    // 取消弹窗
    closeTabForm() {
      this.popFormTab = false
    },

    // 选中当前行-列表一
    clickTabRow_one(row) {
      // 获取修改内容
      if (
        row.itemCode &&
        this.tabActiveName_one == 'solution' &&
        row.solutionName &&
        this.tabActiveName == 'clinet'
      ) {
        this.agreementSolutionNo = row.itemCode
        this.handlerTabClick({ name: 'clinet' })
      } else {
        this.agreementSolutionNo = ''
      }
      this.clickRowData_one = row
      // this.$refs.moviesTable.toggleRowSelection(row);
    },

    // 选中当前行-列表二
    clickTabRow(row) {
      // 获取修改内容
      if (
        row.solutionNo &&
        this.tabActiveName_one == 'solution' &&
        row.solutionName &&
        this.tabActiveName == 'clinet'
      ) {
        this.agreementSolutionNo = row.solutionNo
        this.handlerTabClick({ name: 'clinet' })
      } else {
        this.agreementSolutionNo = ''
      }
      this.clickRowData = row
      // this.$refs.moviesTable.toggleRowSelection(row);
    }
    /*************************** 供应链供应商methods end ****************** */
  },

  created() {
    api.initSelect(this.agreementKey)
    // 切换路由数据保存
    const { formData, status } = this.getActivePathData(this.$route.path)
    formData && (this.agreementForm = formData)
    this.jumpType = status
    if (this.jumpType == 'update' || formData) {
      this.agreementForm = JSON.parse(sessionStorage.AgreementForm)
      this.tabIsDisabled_one = false
      this.tabIsDisabled = false
      this.tabActiveName_one = 'solution'
      this.tabActiveName = 'clinet'
      this.handlerTabClick_one({ name: this.tabActiveName_one }) //数据刷新
      this.handlerTabClick({ name: this.tabActiveName }) //数据刷新
      this.customerAccount(this.agreementForm.customerCode)
    } else {
      this.loadCodeNo() //加载编号
      // this.agreementForm.status = '1';
    }
  },

  // 切换路由数据保存
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.agreementForm, status: this.jumpType },
      path: this.$route.path
    })
    next()
  }
}
</script>

<style lang="less">
.AgreementForm {
  /*  .form-layout {
    > div {
      flex-basis: 20vw;
      height: 15px;
    }
  } */
  .Box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .handleTableHeight {
    min-height: 48vh;
  }
  .tab_one,
  .tab_two {
    > :first-child {
      > div > div > div {
        > :first-child::before {
          content: '*';
          color: red;
        }
      }
      /* > div {
        > div {
          > div > :first-child ::before {
            content: "*";
            color: red;
          }
        }
      } */
    }
  }
}
</style>
