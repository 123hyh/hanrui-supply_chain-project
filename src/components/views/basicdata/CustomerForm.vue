/* 供应链客户 */
<template>
  <div class="tab-padding customer-form">
    <preserve-btn
      :beforeSubmitCb="beforeSubmitCb"
      :form="form.data"
      :isLoading="isLoading"
      @handlePreserve="handlePreserve"
      @handleRollback="handleRollback"
      @handleVerify="handleVerify"
      @hanldeBlacklist="hanldeBlacklist"
    ></preserve-btn>
    <!-- 页签 -->
    <el-tabs class="tabs-defined" type="card" v-model="activeName">
      <el-tab-pane
        :disabled="i > 0 && tabDisbale"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        v-for="(item, i) in initTabList"
      ></el-tab-pane>
    </el-tabs>
    <section>
      <!-- form主体 -->
      <section v-if="subActiveName != 'client'">
        <form-component
          :formModel="form['data']"
          :inputKey="form['formConfig']"
          @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
          @handlerFormVerify="handlerFormVerify_form"
        ></form-component>
      </section>
      <!-- 带页签表格 -->
      <section>
        <!-- 页签 -->
        <template v-show="subActiveName">
          <el-tabs class="tabs-defined" type="card" v-model="subActiveName">
            <el-tab-pane
              :key="item.name"
              :label="item.label"
              :name="item.name"
              v-for="item in initSubTabList[activeName]"
            ></el-tab-pane>
          </el-tabs>
        </template>
        <!-- 表格 -->
        <tab-table
          :isSubTable="true"
          :tableData="table.tableData"
          :tableDataKey="table.tableDataKey"
          :tabName=" (+form.data.status) <= 1 ? subActiveName:''"
          @handlerTableBtnClick="handlerTableBtnClick"
          v-show="table.tableDataKey.length > 0 "
        >
          <template v-slot="slotProps">
            <el-button
              size="mini"
              style="padding: 3px;"
              type="text"
              v-if="slotProps.default.status == 4"
            >已审核</el-button>
            <el-button
              @click="tablebtn(slotProps.default)"
              size="mini"
              style="padding: 3px;"
              v-else
            >审核</el-button>
          </template>
        </tab-table>
      </section>
    </section>
    <!-- 弹窗 -->
    <section>
      <popover-component
        :btnObj="dialog.btnObj"
        :count="dialog.count"
        :formConfig="dialog.queryConfig"
        :isShowPopover.sync="dialog.isshow"
        :itemName="dialog.itemName"
        :popoverList="dialog.list"
        :popoverListKey="dialog.listKey"
        :ruleForm="dialog.ruleForm"
        @handleBtnClickType="handlerFormConfigClickSearch"
        @handlePageChange="handlerFormConfigClickSearch"
        @handlerSubPreservation="handlerSubPreservation"
      ></popover-component>
      <!-- 表格 下 弹窗 -->
      <popover-component
        :formData="Tabledialog"
        :isShowPopover.sync="Tabledialog.isshow"
        :popoverType="'form'"
        @formClickPreservation="handlerTableFormPreservation"
        @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
        @handlerFormVerify="handlerFormVerify"
      ></popover-component>
    </section>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'
// 组件
import FormComponent from '@/components/common/FormConfig.vue'
import TabTable from '@/components/common/TabTable.vue'
import PopoverComponent from '@/components/common/Popover.vue'
import { mapMutations, mapGetters } from 'vuex'

/* 组件局部变量 */
const btnObj = [
  {
    type: 'search',
    label: '查询'
  }
]
const searchParams = {
  queryConfig: [
    {
      isInput: true,
      label: '客户',
      moduleBind: 'companyName'
    }
  ],
  btnObj
}
export default {
  name: 'Customerform',
  created() {
    {
      this.initFormData()
      this.activeName = this.initTabList[0]['name']
      this.subActiveName =
        (this.initSubTabList[this.activeName][0] || {})['name'] || ''
    }
  },
  watch: {
    'dialog.isshow'(val) {
      if (!val) this.dialog.count = 0
    },
    activeName: {
      handler(cur, pre) {
        /**
         * 切换页签时 重置form表单 子页签 form的数据 初始化下拉框选项及城市下拉
         */
        this.form.formConfig = this.initFormConfig[cur]() || []
        this.subActiveName = (this.initSubTabList[cur][0] || {})['name']
        api.initSelect(this.form.formConfig)
        if (this.activeName === 'client') {
          this.subActiveName = 'client'
          this.table.tableDataKey = this.initTableConfig[this.activeName]()
        } else {
          this.table.tableDataKey = (this.initTableConfig[this.subActiveName] ||
            (() => []))()
        }
        cur === 'base' && this.getAddress('province')
        this.status == 'update' &&
          this.activeName !== 'client' &&
          this.toggleTabRequest()
        this.table.tableData = [] //清空表格
      },
      deep: true
    },
    subActiveName: {
      handler(cur, pre) {
        if (!cur) return
        this.status === 'update' && this.getSubActiveNameTableData(cur)
      },
      deep: true
    },
    'form.data.province': {
      handler(cur, pre) {
        if (!cur || cur == pre) return
        pre && (delete this.form.data.city, delete this.form.data.county)
        this.getAddress('city', cur)
      },
      deep: true
    },
    'form.data.city': {
      handler(cur, pre) {
        if (!cur || cur == pre) return
        pre && delete this.form.data.county
        this.getAddress('county', cur)
      },
      deep: true
    },
    'form.data': {
      handler(cur, pre) {
        const { formData } = this.getActivePathData(this.$route.path)
        this.addbreadCrumbsList({
          path: '/Customerform',
          data: {
            status: this.status,
            tabDisbale: this.tabDisbale,
            formData: {
              ...formData,
              [this.activeName]: this.form.data
            }
          }
        })
      },
      deep: true
    },
    /* 表格下的弹窗的省 */
    'Tabledialog.ruleForm.province'(cur) {
      this.getRegionList('city', cur)
    },
    'Tabledialog.ruleForm.city'(cur) {
      this.getRegionList('county', cur)
    }
  },
  data() {
    return {
      initTabList: [
        {
          label: '基础资料',
          name: 'base'
        },
        {
          label: '财务资料',
          name: 'finance'
        },
        {
          label: '销售资料',
          name: 'sell'
        },
        {
          label: '委托方',
          name: 'client'
        }
      ],
      tabDisbale: false,
      isLoading: false,
      status: 'update',
      activeName: '',
      subActiveName: '',
      table: {
        tableData: [],
        tableDataKey: []
      },
      form: {
        data: {},
        formConfig: [],
        verify: {}
      },
      dialogName: '',
      dialog: {
        isshow: false,
        list: [],
        listKey: [],
        count: 0,
        queryConfig: [],
        ruleForm: {},
        itemName: ''
      },
      Tabledialog: {
        isshow: false,
        btnType: '',
        formConfig: [],
        ruleForm: {},
        validate: eval, //表单验证回调
        resetFields: eval
      }
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    handlerFormVerify_form({ formModel = {} }) {
      this.form.verify = formModel
    },
    async tablebtn(row) {
      try {
        const { data } = await api.opcodeBankData(row)
        this.getSubActiveNameTableData(this.subActiveName)
        this.$message({
          type: 'success',
          message: '审核成功！'
        })
      } catch (error) {
        console.log(error)
      }
    },

    // 加入黑名单事件
    async hanldeBlacklist() {
      this.utools.blacklist.call(this, async () => {
        await api.addCustomerBlacklist(this.form.data.customerNo)
        this.$set(this.form.data, 'hasBlack', true)
      })
    },

    // 审核
    handleVerify() {},
    async getAddress(type, code) {
      try {
        const { data } = await this.requestAddress[type](code)
        this.handleSelectOption(data, type)
      } catch (error) {
        console.log(error)
      } finally {
      }
    },

    handleSelectOption(data, type) {
      for (let item of this.form.formConfig) {
        if (item.key === type) {
          item.selectOption = data.map(item => ({
            itemKey: item.code,
            itemValue: item.name
          }))
          break
        }
      }
    },

    async getRegionList(type, code) {
      try {
        const { data } = await this.requestAddress[type](code)
        this.setSubTabFormSelectList(data, type)
      } catch (error) {
        console.log(error)
      }
    },

    async initFormData() {
      const {
        status,
        tabDisbale,
        formData: { base, finance, sell, client }
      } = this.getActivePathData(this.$route.path)
      this.status = status
      status === 'update' && (this.form.data = base)
      if (status === 'add') {
        if (utools.judgeNullObj(base, 1)) {
          this.form.data = base
          this.tabDisbale = tabDisbale
          return
        }
        try {
          this.tabDisbale = true
          const { data } = await api.getClienteleCode()
          this.form.data.customerNo = data
        } catch (error) {
          console.log(error)
        }
      }
    },
    async handlerFormConfigClickSearch(params) {
      if ((this.form.data.status || '1') !== '1') return
      let dataType = utools.getDataType(params)
      dataType === 'String' &&
        params !== 'search' &&
        ((this.dialogName = params),
        (this.dialog = {
          ...this.dialog,
          ruleForm: {},
          ...this.setDialogTitleAndQuery[params]
        }),
        console.log(params))
      try {
        if (
          this.dialogName == 'receivableCustName' ||
          this.dialogName == 'deliverCustName' ||
          this.dialogName == 'receiptCustName'
        ) {
          var {
            data: { list, count }
          } = await this.dialogAsync[this.dialogName]({
            ...(dataType === 'Object' && params),
            ...this.dialog.ruleForm
          })
        } else {
          var {
            data: { list, count }
          } = await this.dialogAsync[this.dialogName]({
            ...(dataType === 'Object' && params),
            ...this.dialog.ruleForm,
            status: '2'
          })
        }
        this.dialog = {
          ...this.dialog,
          list,
          count,
          isshow: true,
          listKey: this.initTableConfig[this.dialogName]()
        }
      } catch (error) {
        console.log(error)
      }
    },

    handlerSubPreservation(clickRow) {
      switch (this.dialogName) {
        case 'parentCustomerName':
          this.form.data = {
            ...this.form.data,
            parentCustomerCode: clickRow.customerNo,
            parentCustomerName: clickRow.customerName
          }
          break
        case 'organizationName':
          this.form.data = {
            ...this.form.data,
            organizationCode: clickRow.companyCode,
            organizationName: clickRow.companyName
          }
          break
        case 'salesmanName':
          this.form.data = {
            ...this.form.data,
            salesmanCode: clickRow.employeeInfoCode,
            salesmanName: clickRow.employeeInfoName
          }
          break
        case 'departmentName':
          this.form.data = {
            ...this.form.data,
            department: clickRow.departmentCode,
            departmentName: clickRow.departmentName
          }
          break
        case 'receivableCustName':
          this.form.data = {
            ...this.form.data,
            receivableCustCode: clickRow.customerNo,
            receivableCustName: clickRow.customerName
          }
          break
        case 'receiptCustName':
          this.form.data = {
            ...this.form.data,
            receiptCustCode: clickRow.customerNo,
            receiptCustName: clickRow.customerName
          }
          break
        case 'deliverCustName':
          this.form.data = {
            ...this.form.data,
            deliverCustCode: clickRow.customerNo,
            deliverCustName: clickRow.customerName
          }
          break
        /* 委托方弹窗选择 */
        case 'clientNo':
          this.Tabledialog.ruleForm = {
            ...this.Tabledialog.ruleForm,
            clientNo: clickRow.clientNo,
            clientName: clickRow.clientName
          }
          break
        case 'taxTypeName':
          this.form.data = {
            ...this.form.data,
            taxTypeCode: clickRow.billCode,
            taxTypeName: clickRow.taxCategoryName,
            taxRate: clickRow.tax
          }
          break
        case 'dispatchLineName':
          this.Tabledialog.ruleForm = {
            ...this.Tabledialog.ruleForm,
            dispatchLine: clickRow.shippingRouteCode,
            dispatchLineName: clickRow.shippingRouteName
          }
          break
        case 'receiveCompanyName':
          this.Tabledialog.ruleForm = {
            ...this.Tabledialog.ruleForm,
            receiveCompany: clickRow.companyCode,
            receiveCompanyName: clickRow.companyName
          }
          break
      }
    },

    async handlePreserve() {
      this.form.verify.validate(async valid => {
        if (valid) {
          if (this.activeName === 'client')
            return this.$message.success('保存成功！')
          this.isLoading = true
          this.utools.saveReceiptsTips.call(this, {
            async successCallback() {
              const { data, status } = await this.preserveAsync[
                this.activeName
              ]()
              status === 200 &&
                this.status === 'add' &&
                ((this.tabDisbale = false),
                (this.form.data = {
                  ...this.form.data
                }))
              this.form.data = {
                ...this.form.data,
                status: data.status || '1'
              }
              this.status === 'add' && (this.status = 'update')
            },
            finallyCallback() {
              this.isLoading = false
            }
          })
        }
      })
    },

    async toggleTabRequest() {
      const { formData } = this.getActivePathData(this.$route.path)
      if (utools.judgeNullObj(formData[this.activeName], 1)) {
        this.form.data = {
          ...formData[this.activeName]
        }
        return
      }
      try {
        const { data } = await this.switchTabAsync[this.activeName]()
        this.form.data = {
          ...this.form.data,
          ...data,
          status: formData.base.status
        }
      } catch (error) {
        console.log(error)
      }
    },

    setMethod() {
      return this.status == 'add' ? 'POST' : 'PUT'
    },

    handleRollback() {
      this.$router.push({
        path: '/M0201'
      })
    },

    async getSubActiveNameTableData(sub) {
      try {
        this.table.data = []
        const {
          data: { list, count }
        } = await this.requestSubActiveNameTable[sub]()
        this.table.tableData = list
      } catch (error) {
        console.log(error)
      }
    },
    async handlerTableBtnClick(type, clickRow) {
      this.Tabledialog.ruleForm = {}
      this.Tabledialog.btnType = type
      !Array.isArray(clickRow) &&
        clickRow &&
        (this.Tabledialog.ruleForm = utools.cloneObj(clickRow))
      try {
        switch (type) {
          case 'delete':
            if (!Array.isArray(clickRow)) {
              const { status } = await this.tableDeleteRequest[
                this.subActiveName
              ](clickRow.itemCode)
              this.getSubActiveNameTableData(this.subActiveName)
              ;(this.Tabledialog.formConfig = []),
                (this.Tabledialog.ruleForm = {})
              utools.alertMessage.bind(this)(status)
            } else {
              utools.alertMessage.bind(this)('', '请选择一条数据')
            }
            break
          default:
            this.Tabledialog.isshow = true
            this.Tabledialog.formConfig = this.initFormConfig[
              this.subActiveName
            ]()
            api.initSelect(this.Tabledialog.formConfig)
            /* 销售资料 联系 新增的省 */
            if (this.activeName === 'sell' && type === 'add') {
              const { data } = await this.requestAddress['province']()
              this.setSubTabFormSelectList(data, 'province')
            }
            break
        }
      } catch (error) {
        console.log(error)
      }
    },

    setSubTabFormSelectList(data, type) {
      for (let item of this.Tabledialog.formConfig) {
        if (item.key !== type) continue
        item.selectOption = utools.setRegionList(data)
      }
    },

    /**
     * @method handlerFormVerify 设置验证规则
     */

    handlerFormVerify({ formModel: { validate, resetFields } } = {}) {
      ;(this.Tabledialog.validate = validate),
        (this.Tabledialog.resetFields = resetFields)
    },

    async handlerTableFormPreservation() {
      var odlvalid = true
      this.Tabledialog.validate(valid => {
        if (!valid) {
          odlvalid = false
        }
      })
      if (!odlvalid) return
      let messageStatus = 0
      try {
        const { status } = await this.changeSubActiveNameTable[
          this.subActiveName
        ](this.Tabledialog.btnType == 'add' ? 'POST' : 'PUT')
        messageStatus = status
        this.getSubActiveNameTableData(this.subActiveName)
      } catch (error) {
        console.log(error)
      } finally {
        utools.alertMessage.bind(this)(messageStatus)
        messageStatus === 200 && (this.Tabledialog.isshow = false)
      }
    },
    async beforeSubmitCb() {
      try {
        const code = this.form.data.customerNo
        const data = await Promise.all([
          api.getCustomerSearchOne({ customerNo: code }),
          api.getCustomerFinance({ customerNo: code }),
          api.getCustomerSell({ customerNo: code }),
          api.getCustomerContact({ customerNo: code }),
          api.getALLBankDataAll({ billNo: code })
        ])
        if (
          data.every(({ data = {} }) => {
            if (Array.isArray(data.list)) {
              return data.list.length
            } else {
              return data ? true : false
            }
          })
        ) {
          return true
        } else {
          this.$message.warning('请补充其他资料！')
          return false
        }
      } catch (error) {
        this.$message.warning('请补充其他资料！')
        console.log(error)
        return false
      }
    }
  },
  components: {
    FormComponent,
    TabTable,
    PopoverComponent
  },
  computed: {
    ...mapGetters(['getActivePathData']),
    // initTabList: _ => [
    //   {
    //     label: "基础资料",
    //     name: "base"
    //   },
    //   {
    //     label: "财务资料",
    //     name: "finance"
    //   },
    //   {
    //     label: "销售资料",
    //     name: "sell"
    //   },
    //   {
    //     label: "委托方",
    //     name: "client"
    //   }
    // ],
    initFormConfig: _ => ({
      base: _ =>
        utools.cloneObj(
          require('@/domain/formconfig/basicdata/Customer.js').default
        ),
      finance: _ =>
        utools.cloneObj(
          require('@/domain/formconfig/basicdata/CustomerFinance.js').default
        ),
      sell: _ =>
        utools.cloneObj(
          require('@/domain/formconfig/basicdata/CustomerSell.js').default
        ),
      client: _ =>
        utools.cloneObj(
          require('@/domain/formconfig/basicdata/CustomerClient.js').default
        ),
      // 弹窗表单
      bank: _ =>
        utools.cloneObj(
          require('@/domain/formconfig/basicdata/CustomerBank.js').default
        ),
      contact: _ =>
        utools.cloneObj(
          require('@/domain/formconfig/basicdata/CustomerContact.js').default
        )
    }),
    initTableConfig: _ => ({
      client: _ => [
        {
          prop: 'clientNo',
          label: '委托方编码'
        },
        {
          prop: 'clientName',
          label: '委托方名称'
        }
      ],
      bank: _ =>
        require('@/domain/tableconfig/basicdata/CustomerBank.js').default,
      parentCustomerName: _ =>
        require('@/domain/tableconfig/basicdata/Customer.js').default,
      taxTypeName: _ =>
        require('@/domain/tableconfig/basicdata/TaxCategory.js').default,
      organizationName: _ =>
        require('@/domain/tableconfig/basicdata/CompanyInfo.js').default,
      salesmanName: _ =>
        require('@/domain/tableconfig/basicdata/EmployeeInfo.js').default,
      departmentName: _ =>
        require('@/domain/tableconfig/system/Department.js').default,
      receivableCustName: _ =>
        require('@/domain/tableconfig/basicdata/Customer.js').default,
      receiptCustName: _ =>
        require('@/domain/tableconfig/basicdata/Customer.js').default,
      contact: _ =>
        require('@/domain/tableconfig/basicdata/CustomerContact.js').default,
      deliverCustName: _ =>
        require('@/domain/tableconfig/basicdata/Customer.js').default,
      clientNo: _ =>
        require('@/domain/tableconfig/basicdata/CustomerClient.js').default,
      dispatchLineName: _ =>
        require('@/domain/tableconfig/basicdata/ShippingRoute.js').default,
      receiveCompanyName: _ =>
        require('@/domain/tableconfig/basicdata/CompanyInfo.js').default
    }),
    initSubTabList: _ => ({
      base: [],
      finance: [
        {
          label: '银行信息',
          name: 'bank'
        }
      ],
      sell: [
        {
          label: '联系人',
          name: 'contact'
        }
      ],
      client: []
    }),
    requestAddress() {
      return {
        province: () => api.getProvince(),
        city: code => api.getCity(code),
        county: code => api.getDistrict(code)
      }
    },
    dialogAsync() {
      return {
        parentCustomerName: (data = {}) => api.getCustomerList(data),
        taxTypeName: (data = {}) => api.getTaxCategoryList(data),
        organizationName: (data = {}) => api.getCreditCompanyNameData(data),
        salesmanName: (data = {}) => api.getEmployeeInfo(data),
        departmentName: (data = {}) => api.getDepartment(data),
        receivableCustName: (data = {}) => api.getCustomerList(data),
        receiptCustName: (data = {}) => api.getCustomerList(data),
        deliverCustName: (data = {}) => api.getCustomerList(data),
        clientNo: (data = {}) => api.queryclientSearch(data),
        dispatchLineName: (data = {}) => api.getDispatchLineData(data),
        receiveCompanyName: (data = {}) => api.getCreditCompanyNameData(data)
      }
    },
    preserveAsync() {
      return {
        base: () => api.changeCustomer(this.form.data, this.setMethod()),
        finance: () => api.changeCustomerFinance(this.form.data),
        sell: () => api.changeCustomerSell(this.form.data)
      }
    },
    switchTabAsync() {
      return {
        base: _ =>
          api.getCustomerSearchOne({
            customerNo: this.form.data.customerNo
          }),
        finance: _ =>
          api.getCustomerFinance({
            customerNo: this.form.data.customerNo
          }),
        sell: _ =>
          api.getCustomerSell({
            customerNo: this.form.data.customerNo
          })
      }
    },
    requestSubActiveNameTable() {
      return {
        bank: (data = {}) =>
          api.getALLBankDataAll({
            ...data,
            billNo: this.form.data.customerNo
          }),
        contact: (data = {}) =>
          api.getCustomerContact({
            ...data,
            customerNo: this.form.data.customerNo
          }),
        client: (data = {}) =>
          api.getCustomerClient({
            ...data,
            customerNo: this.form.data.customerNo
          })
      }
    },
    changeSubActiveNameTable() {
      return {
        bank: method =>
          api.changeAllBankData({
            data: {
              billNo: this.form.data.customerNo,
              ...this.Tabledialog.ruleForm
            },
            method
          }),
        contact: method =>
          api.changeCustomerContact(
            {
              customerNo: this.form.data.customerNo,
              ...this.Tabledialog.ruleForm
            },
            method
          ),
        client: method =>
          api.changeCustomerClient(
            {
              customerNo: this.form.data.customerNo,
              ...this.Tabledialog.ruleForm
            },
            method
          )
      }
    },
    tableDeleteRequest() {
      return {
        bank: code => api.deleteBankData(code),
        contact: code => api.deleteCustomerContact(code),
        client: code => api.deleteCustomerClient(code)
      }
    },
    setDialogTitleAndQuery() {
      return {
        parentCustomerName: {
          queryConfig: [
            { label: '名称', moduleBind: 'customerName', isInput: true }
          ],
          btnObj,
          itemName: '客户'
        },
        taxTypeName: {
          itemName: '税种',
          queryConfig: [
            {
              isInput: true,
              label: '税种编码',
              moduleBind: 'billCode'
            }
          ],
          btnObj
        },
        organizationName: {
          itemName: '财务组织',
          queryConfig: searchParams,
          btnObj
        },
        salesmanName: {
          itemName: '员工资料',
          queryConfig: [
            {
              isInput: true,
              label: '名称',
              moduleBind: 'employeeInfoName'
            }
          ],
          btnObj
        },
        departmentName: {
          itemName: '部门',
          queryConfig: [
            {
              isInput: true,
              label: '部门名称',
              moduleBind: 'departmentName'
            }
          ],
          btnObj
        },
        organizationName: {
          ...searchParams,
          itemName: '公司'
        },
        receivableCustName: {
          queryConfig: [
            { isInput: true, label: '名称', moduleBind: 'customerName' }
          ],
          itemName: '客户',
          btnObj
        },
        receiptCustName: {
          queryConfig: [
            { isInput: true, label: '名称', moduleBind: 'customerName' }
          ],
          itemName: '客户',
          btnObj
        },
        deliverCustName: {
          queryConfig: [
            { isInput: true, label: '名称', moduleBind: 'customerName' }
          ],
          itemName: '客户',
          btnObj
        },
        dispatchLineName: {
          ...searchParams,
          itemName: '发运路线'
        },
        receiveCompanyName: {
          itemName: '公司',
          queryConfig: [
            {
              isInput: true,
              label: '公司',
              moduleBind: 'companyName'
            }
          ],
          btnObj
        },
        clientNo: {
          itemName: '委托方',
          queryConfig: [
            { isInput: true, label: '名称', moduleBind: 'clientName' }
          ],
          btnObj
        }
      }
    }
  }
}
</script>

<style lang='less'>
.customer-form {
  .padding(@param: 0) {
    padding: @param;
  }
  height: 82vmin;
  .tabs-defined {
    > :first-child {
      > div > div > div {
        > :first-child::before,
        :nth-child(2)::before,
        :nth-child(3)::before {
          content: '*';
          color: red;
        }
      }
    }
  }
}
</style>
