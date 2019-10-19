<!-- 供应商 -->
<template>
    <div class="tab-padding SupplierBaseForm">
        <preserve-btn
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
                v-for="(item, i) of initTabList"
            ></el-tab-pane>
        </el-tabs>
        <section>
            <!-- form主体 -->
            <!-- <section v-if="subActiveName != 'delivery' && subActiveName != 'credit'"> -->
            <section>
                <form-component
                    :formModel="form.data"
                    :inputKey="form.formConfig"
                    @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
                ></form-component>
            </section>
            <!-- 带页签表格 -->
            <section>
                <!-- 页签 -->
                <div v-show="subActiveName && subActiveName!=='address'">
                    <el-tabs class="tabs-defined" type="card" v-model="subActiveName">
                        <el-tab-pane
                            :key="item.name"
                            :label="item.label"
                            :name="item.name"
                            v-for="item in initSubTabList[activeName]"
                        ></el-tab-pane>
                    </el-tabs>
                </div>
                <!-- 表格 -->
                <div v-show="table.tableDataKey.length > 0 ">
                    <tab-table
                        :isSubTable="true"
                        :tableData="table.tableData"
                        :tableDataKey="table.tableDataKey"
                        :tabName="showBtn"
                        @handlerTableBtnClick="handlerTableBtnClick"
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
                    <pagination-component
                        :count="table.count"
                        @handlePageChange="handleSubTablePageChange"
                    ></pagination-component>
                </div>
            </section>
        </section>
        <!-- 弹窗 -->
        <section>
            <popover-component
                :btnObj="dialog.btnObj"
                :count="dialog.count"
                :formConfig="dialog.queryConfig"
                :isShowPopover="dialog.isshow"
                :itemName="dialog.itemName"
                :popoverList="dialog.list"
                :popoverListKey="dialog.listKey"
                :ruleForm="dialog.ruleForm"
                @changeisShowPopover="closeDialog"
                @handleBtnClickType="handlerFormConfigClickSearch"
                @handlePageChange="handlerFormConfigClickSearch"
                @handlerSubPreservation="handlerSubPreservation"
            ></popover-component>
            <!-- 表格 下 弹窗 -->
            <popover-component
                :formData="Tabledialog"
                :isShowPopover="Tabledialog.isshow"
                :loading="loading"
                :popoverType="'form'"
                @changeisShowPopover="closeTableDialog"
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
import PaginationComponent from '@/components/common/Pagination.vue'
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
            label: '编码',
            moduleBind: 'supplierCode'
        }
    ],
    btnObj
}

export default {
    name: 'SupplierBaseForm',
    created() {
        // let jurisdiction = this.$store.state.authorityControl.listBtn['M020105']
        // if(jurisdiction.indexOf('finance')>-1){
        //   this.initTabList = [
        //     {
        //       label: "基础资料",
        //       name: "base"
        //     },
        //     {
        //       label: "财务资料",
        //       name: "finance"
        //     },
        //     {
        //       label: "采购信息",
        //       name: "purchase"
        //     },
        //     {
        //       label: "货仓提货地址",
        //       name: "delivery"
        //     },
        //     {
        //       label: "信用评估",
        //       name: "credit"
        //     }
        //   ]
        // }
        {
            this.initFormData()
            this.activeName = this.initTabList[0]['name']
            this.subActiveName =
                (this.initSubTabList[this.activeName][0] || {})['name'] || ''
        }
    },
    watch: {
        activeName: {
            handler(cur, pre) {
                /**
                 * 切换页签时 重置form表单 子页签 form的数据 初始化下拉框选项及城市下拉
                 */
                this.form.formConfig = this.initFormConfig[cur]() || []
                this.subActiveName = (this.initSubTabList[cur][0] || {})['name']
                api.initSelect(this.form.formConfig)
                //         if (this.activeName === "delivery"||this.activeName === "credit") {
                //           this.subActiveName = this.activeName;
                //           this.table.tableDataKey = this.initTableConfig[this.activeName]();
                //         } else {
                this.table.tableDataKey = (this.initTableConfig[
                    this.subActiveName
                ] || (() => []))()
                // }
                cur === 'base' && this.getAddress('province')
                this.status == 'update' && this.toggleTabRequest()
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
                pre &&
                    (delete this.form.data.city, delete this.form.data.district)
                this.getAddress('city', cur)
            },
            deep: true
        },
        'form.data.city': {
            handler(cur, pre) {
                if (!cur || cur == pre) return
                pre && delete this.form.data.district
                this.getAddress('district', cur)
            },
            deep: true
        },
        'form.data': {
            handler(cur, pre) {
                const { formData } = this.getActivePathData(this.$route.path)
                this.addbreadCrumbsList({
                    path: '/SupplierBaseForm',
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
        'form.data.relieveTerm': {
            handler(cur, pre) {
                if (cur) {
                    utools.setFormConfig(this.form.formConfig, [
                        {
                            key: 'relievePerson',
                            disabled: false
                        },
                        {
                            key: 'operatePerson',
                            btn: true,
                            disabled: false
                        }
                    ])
                } else {
                    utools.setFormConfig(this.form.formConfig, [
                        {
                            key: 'relievePerson',
                            disabled: true
                        },
                        {
                            key: 'operatePerson',
                            btn: false,
                            disabled: true
                        }
                    ])
                }
            },
            deep: true
        },
        /* 表格下的弹窗的省 */
        'Tabledialog.ruleForm.province'(cur) {
            this.getRegionList('district', cur)
        },
        'Tabledialog.ruleForm.district'(cur) {
            this.getRegionList('district', cur)
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
                    label: '采购信息',
                    name: 'purchase'
                },
                {
                    label: '货仓提货地址',
                    name: 'delivery'
                },
                {
                    label: '信用评估',
                    name: 'credit'
                }
            ],
            tabDisbale: false,
            isLoading: false,
            status: 'update',
            activeName: '',
            subActiveName: '',
            table: {
                tableData: [],
                tableDataKey: [],
                count: 0
            },
            form: {
                data: {},
                formConfig: []
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
            loading: false,
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
            } finally {
            }
        },
        // 加入黑名单时间
        async hanldeBlacklist() {
            this.utools.blacklist.call(this, async () => {
                await api.addSupplierBlack(this.form.data.supplierCode)
                this.$set(this.form.data, 'hasBlack', true)
            })
        },
        // 子叶签的表格分页事件
        handleSubTablePageChange(pageData = {}) {
            this.getSubActiveNameTableData(this.subActiveName, pageData)
        },

        async handleVerify() {},
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
                formData: { base, finance, purchase, delivery, credit }
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
                    const { data } = await api.getsupplierbaseCode()
                    this.form.data.supplierCode = data
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
                const {
                    data: { list, count }
                } = await this.dialogAsync[this.dialogName]({
                    ...(dataType === 'Object' && params),
                    ...this.dialog.ruleForm
                    // status: '2'
                })
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
        closeDialog() {
            if (!this.dialog.isshow) return
            this.dialog.isshow = !this.dialog.isshow
        },
        handlerSubPreservation(clickRow) {
            switch (this.dialogName) {
                case 'parentSupplierName':
                    this.form.data = {
                        ...this.form.data,
                        parentSupplier: clickRow.supplierCode,
                        parentSupplierName: clickRow.supplierName
                    }
                    break
                case 'organizationName':
                    this.form.data = {
                        ...this.form.data,
                        organizationCode: clickRow.companyCode,
                        organizationName: clickRow.companyName
                    }
                    break
                case 'financeName':
                    this.form.data = {
                        ...this.form.data,
                        financeCode: clickRow.companyCode,
                        financeName: clickRow.companyName
                    }
                    break
                case 'purchaseName':
                    this.form.data = {
                        ...this.form.data,
                        purchaseCode: clickRow.companyCode,
                        purchaseName: clickRow.companyName
                    }
                    break
                case 'purchaseCompanyName':
                    this.form.data = {
                        ...this.form.data,
                        purchaseCompany: clickRow.supplierCode,
                        purchaseCompanyName: clickRow.supplierName
                    }
                    break
                case 'deliveryCompanyName':
                    this.Tabledialog.ruleForm = {
                        ...this.form.data,
                        deliveryCompany: clickRow.supplierCode,
                        deliveryCompanyName: clickRow.supplierName
                    }
                    break
                case 'operatePerson':
                    this.form.data = {
                        ...this.form.data,
                        operatePerson: clickRow.employeeInfoCode,
                        operatePerson: clickRow.employeeInfoName
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
                        receivableCustCode: clickRow.supplierCode,
                        receivableCustName: clickRow.supplierName
                    }
                    break
                case 'receiptCustName':
                    this.form.data = {
                        ...this.form.data,
                        receiptCustCode: clickRow.supplierCode,
                        receiptCustName: clickRow.supplierName
                    }
                    break
                case 'deliverCustName':
                    this.form.data = {
                        ...this.form.data,
                        deliverCustCode: clickRow.supplierCode,
                        deliverCustName: clickRow.supplierName
                    }
                    break
                case 'relievePerson':
                    this.Tabledialog.ruleForm = {
                        ...this.Tabledialog.ruleForm,
                        relievePerson: clickRow.employeeInfoCode,
                        relievePersonName: clickRow.employeeInfoName
                    }
                    break
                /* 委托方弹窗选择 */
                case 'deliveryNo':
                    this.Tabledialog.ruleForm = {
                        ...this.Tabledialog.ruleForm,
                        deliveryNo: clickRow.deliveryNo,
                        deliveryName: clickRow.deliveryName
                    }
                    break
                case 'taxCategoryName':
                    this.form.data = {
                        ...this.form.data,
                        taxCategory: clickRow.billCode,
                        taxCategoryName: clickRow.taxCategoryName,
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
            let statusCode = 0
            this.isLoading = true
            try {
                const { data, status } = await this.preserveAsync[
                    this.activeName
                ]()
                statusCode = status
                status === 200 &&
                    this.status === 'add' &&
                    ((this.tabDisbale = false),
                    (this.form.data = {
                        ...this.form.data
                    }))
                this.$set(this.form.data, 'status', '1')
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false
            }
            utools.alertMessage.bind(this)(statusCode)
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
                    ...data
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
                path: '/M0820'
            })
        },
        async getSubActiveNameTableData(sub, pageData = {}) {
            try {
                this.table.data = []
                const {
                    data: { list, count }
                } = await this.requestSubActiveNameTable[sub](pageData)
                ;(this.table.tableData = list), (this.table.count = count)
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
                        if (clickRow.status === '4') return this.$message.warning('无法删除已审核的银行信息！')
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
                        if (this.activeName === 'purchase' && type === 'add') {
                            const { data } = await this.requestAddress[
                                'province'
                            ]()
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
        closeTableDialog() {
            if (!this.Tabledialog.isshow) return
            this.Tabledialog.isshow = !this.Tabledialog.isshow
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
            let messageStatus = 200
            this.loading = true
            this.utools.saveReceiptsTips.call(this, async () => {
                try {
                    const { status } = await this.changeSubActiveNameTable[
                        this.subActiveName
                    ](this.Tabledialog.btnType == 'add' ? 'POST' : 'PUT')
                    this.getSubActiveNameTableData(this.subActiveName)
                } catch (error) {
                    messageStatus = 0
                    console.log(error)
                } finally {
                    this.loading = false
                    messageStatus === 200 && (this.Tabledialog.isshow = false)
                }
            })
        }
    },
    components: {
        FormComponent,
        TabTable,
        PopoverComponent,
        PaginationComponent
    },
    computed: {
        ...mapGetters(['getActivePathData']),
        // 表格按钮的显示控制
        showBtn() {
            const {
                subActiveName,
                form: {
                    data: { status }
                }
            } = this
            return subActiveName === 'bank'
                ? subActiveName
                : (this.form.data.status || 0) <= 1
                ? this.subActiveName
                : ''
        },
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
        //     label: "采购信息",
        //     name: "purchase"
        //   },
        //   {
        //     label: "货仓提货地址",
        //     name: "delivery"
        //   },
        //   {
        //     label: "信用评估",
        //     name: "credit"
        //   }
        // ],
        initFormConfig: _ => ({
            base: _ =>
                require('@/domain/formconfig/basicdata/SupplierBase.js')
                    .default,
            finance: _ =>
                require('@/domain/formconfig/basicdata/SupplierFinance.js')
                    .default,
            purchase: _ =>
                require('@/domain/formconfig/basicdata/SupplierPurchase.js')
                    .default,
            delivery: _ => [],
            // require("@/domain/formconfig/basicdata/SupplierDelivery.js").default,
            address: _ =>
                require('@/domain/formconfig/basicdata/SupplierDelivery.js')
                    .default,
            credit: _ =>
                require('@/domain/formconfig/basicdata/SupplierCredit.js')
                    .default,
            // 弹窗表单
            bank: _ =>
                require('@/domain/formconfig/basicdata/SupplierBank.js')
                    .default,
            contact: _ =>
                require('@/domain/formconfig/basicdata/SupplierContact.js')
                    .default
        }),
        initTableConfig: _ => ({
            //       delivery: _ => require("@/domain/tableconfig/basicdata/SupplierDelivery.js").default,
            //       credit: _ => require("@/domain/tableconfig/basicdata/SupplierCredit.js").default,
            bank: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBankTrial.js')
                    .default,
            contact: _ =>
                require('@/domain/tableconfig/basicdata/SupplierContact.js')
                    .default,
            address: _ =>
                require('@/domain/tableconfig/basicdata/SupplierDelivery.js')
                    .default,
            parentSupplierName: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBase.js')
                    .default,
            purchaseCompanyName: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBase.js')
                    .default,
            // deliveryCompanyName: _ =>
            //   require("@/domain/tableconfig/basicdata/SupplierBase.js").default,
            taxCategoryName: _ =>
                require('@/domain/tableconfig/basicdata/TaxCategory.js')
                    .default,
            organizationName: _ =>
                require('@/domain/tableconfig/basicdata/CompanyInfo.js')
                    .default,
            financeName: _ =>
                require('@/domain/tableconfig/basicdata/CompanyInfo.js')
                    .default,
            deliveryCompanyName: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBase.js')
                    .default,
            purchaseName: _ =>
                require('@/domain/tableconfig/basicdata/CompanyInfo.js')
                    .default,
            operatePerson: _ =>
                require('@/domain/tableconfig/basicdata/EmployeeInfo.js')
                    .default,
            salesmanName: _ =>
                require('@/domain/tableconfig/basicdata/EmployeeInfo.js')
                    .default,
            departmentName: _ =>
                require('@/domain/tableconfig/system/Department.js').default,
            receivableCustName: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBase.js')
                    .default,
            receiptCustName: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBase.js')
                    .default,
            deliverCustName: _ =>
                require('@/domain/tableconfig/basicdata/SupplierBase.js')
                    .default,
            deliveryNo: _ =>
                require('@/domain/tableconfig/basicdata/SupplierDelivery.js')
                    .default,
            dispatchLineName: _ =>
                require('@/domain/tableconfig/basicdata/ShippingRoute.js')
                    .default,
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
            purchase: [
                {
                    label: '联系人',
                    name: 'contact'
                }
            ],
            delivery: [
                {
                    label: '',
                    name: 'address'
                }
            ],
            credit: []
        }),
        requestAddress() {
            return {
                province: () => api.getProvince(),
                city: code => api.getCity(code),
                district: code => api.getDistrict(code)
            }
        },
        dialogAsync() {
            return {
                parentSupplierName: (data = {}) =>
                    api.querysupplierbaseSearch(data),
                purchaseCompanyName: (data = {}) =>
                    api.querysupplierbaseSearch(data),
                // deliveryCompanyName: (data = {}) => api.querysupplierbaseSearch(data),
                taxCategoryName: (data = {}) => api.getTaxCategoryList(data),
                organizationName: (data = {}) =>
                    api.getCreditCompanyNameData(data),
                financeName: (data = {}) => api.getCreditCompanyNameData(data),
                deliveryCompanyName: (data = {}) =>
                    api.querysupplierbaseSearch(data),
                purchaseName: (data = {}) => api.getCreditCompanyNameData(data),
                operatePerson: (data = {}) => api.queryemployeeinfoSearch(data),
                salesmanName: (data = {}) => api.getEmployeeInfo(data),
                departmentName: (data = {}) => api.getDepartment(data),
                receivableCustName: (data = {}) =>
                    api.querysupplierbaseSearch(data),
                receiptCustName: (data = {}) =>
                    api.querysupplierbaseSearch(data),
                deliverCustName: (data = {}) =>
                    api.querysupplierbaseSearch(data),
                deliveryNo: (data = {}) =>
                    api.querysupplierdeliverySearch(data),
                dispatchLineName: (data = {}) => api.getDispatchLineData(data),
                receiveCompanyName: (data = {}) =>
                    api.getCreditCompanyNameData(data)
            }
        },
        preserveAsync() {
            return {
                base: () =>
                    api.changesupplierbase(this.form.data, this.setMethod()),
                finance: () => api.changesupplierfinance(this.form.data),
                purchase: () => api.changesupplierpurchase(this.form.data),
                delivery: () => api.changesupplierdelivery(this.form.data),
                credit: () => api.changesuppliercredit(this.form.data)
            }
        },
        switchTabAsync() {
            return {
                base: _ =>
                    api.searchOnesupplierbaseData(this.form.data.supplierCode),
                finance: _ =>
                    api.searchOnesupplierfinanceData(
                        this.form.data.supplierCode
                    ),
                purchase: _ =>
                    api.searchOnesupplierpurchaseData(
                        this.form.data.supplierCode
                    ),
                delivery: _ =>
                    api.searchOnesupplierdeliveryData(
                        this.form.data.supplierCode
                    ),
                credit: _ =>
                    api.searchOnesuppliercreditData(this.form.data.supplierCode)
            }
        },
        requestSubActiveNameTable() {
            return {
                bank: (data = {}) =>
                    api.getALLBankDataAll({
                        ...data,
                        billNo: this.form.data.supplierCode
                    }),
                contact: (data = {}) =>
                    api.querysuppliercontactSearch({
                        ...data,
                        supplierCode: this.form.data.supplierCode
                    }),
                address: (data = {}) =>
                    api.querysupplierdeliverySearch({
                        ...data,
                        supplierCode: this.form.data.supplierCode
                    })
            }
        },
        changeSubActiveNameTable() {
            return {
                bank: method =>
                    api.changeAllBankData({
                        data: {
                            billNo: this.form.data.supplierCode,
                            ...this.Tabledialog.ruleForm
                        },
                        method
                    }),
                contact: method =>
                    api.changesuppliercontact(
                        {
                            supplierCode: this.form.data.supplierCode,
                            ...this.Tabledialog.ruleForm
                        },
                        method
                    ),
                address: method =>
                    api.changesupplierdelivery(
                        {
                            supplierCode: this.form.data.supplierCode,
                            ...this.Tabledialog.ruleForm
                        },
                        method
                    )
            }
        },
        tableDeleteRequest() {
            return {
                bank: code => api.deleteBankData(code),
                contact: code => api.deletesuppliercontactData(code),
                address: code => api.deletesupplierdeliveryData(code)
            }
        },
        setDialogTitleAndQuery() {
            return {
                parentSupplierName: {
                    ...searchParams,
                    itemName: '供应商'
                },
                purchaseCompanyName: {
                    ...searchParams,
                    itemName: '供应商'
                },
                // deliveryCompanyName: {
                //   ...searchParams,
                //   itemName: "送货公司"
                // },
                taxCategoryName: {
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
                    itemName: '公司',
                    queryConfig: [
                        {
                            isInput: true,
                            label: '公司编码',
                            moduleBind: 'companyCode'
                        }
                    ],
                    btnObj
                },
                financeName: {
                    itemName: '公司',
                    queryConfig: [
                        {
                            isInput: true,
                            label: '公司编码',
                            moduleBind: 'companyCode'
                        }
                    ],
                    btnObj
                },
                deliveryCompanyName: {
                    itemName: '供应商',
                    queryConfig: [
                        {
                            isInput: true,
                            label: '编码',
                            moduleBind: 'supplierCode'
                        }
                    ],
                    btnObj
                },
                purchaseName: {
                    itemName: '公司',
                    queryConfig: [
                        {
                            isInput: true,
                            label: '公司编码',
                            moduleBind: 'companyCode'
                        }
                    ],
                    btnObj
                },
                operatePerson: {
                    itemName: '员工',
                    queryConfig: [
                        {
                            isInput: true,
                            label: '员工编码',
                            moduleBind: 'employeeInfoCode'
                        }
                    ],
                    btnObj
                },
                salesmanName: {
                    itemName: '业务员',
                    queryConfig: [
                        {
                            isInput: true,
                            label: '职工编码',
                            moduleBind: 'employeeInfoCode'
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
                    itemName: '销售组织'
                },
                receivableCustName: {
                    ...searchParams,
                    itemName: '应收客户'
                },
                receiptCustName: {
                    ...searchParams,
                    itemName: '收款客户'
                },
                deliverCustName: {
                    ...searchParams,
                    itemName: '送货客户'
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
                            label: '公司编码',
                            moduleBind: 'companyCode'
                        }
                    ],
                    btnObj
                }
            }
        }
    }
}
</script>

<style lang='less'>
.tab-padding,
.SupplierBaseForm {
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
