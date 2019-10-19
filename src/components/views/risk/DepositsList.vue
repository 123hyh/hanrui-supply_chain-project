`<template>
    <div class="table">
        <breadcrumb-navigation />
        <div class="container pd-10">
            <!-- 查询栏 -->
            <query-bar
                :formConfig="queryBarFormConfig"
                :ruleForm="queryBar.data"
                @handleBtnClickType="handleBtnClickType"
            ></query-bar>
            <!-- 表格 -->
            <table-component
                :isShowTabTable="true"
                :tableData="table.tableData"
                :tableDataKey="table.tableConfig"
                @handleDbclickTable="handleDbclickTable"
                @TableClickRowData="TableClickRowData"
            ></table-component>
            <!-- 分页 -->
            <pagination-component :count="pageCount" @handlePageChange="initTableList"></pagination-component>
        </div>
        <!-- 表单弹窗 -->
        <popover-component
            :billsStatus="formDialog.ruleForm.status"
            :btnObj="[ { type: 'upload', label: '附件上传'  }]"
            :formData="formDialog"
            :isShowPopover.sync="formDialog.isshow"
            :itemName="formDialog.itemName"
            @changeisShowPopover="closeFromDialog"
            @formClickPreservation="handlerTableFormPreservation"
            @handleItemBtnClick="() => uploadDialogVisible = true"
            @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
            popoverType="form"
        ></popover-component>
        <!-- 表格弹窗选择 -->
        <popover-component
            :btnObj="tableDialog.btnObj"
            :count="tableDialog.count"
            :formConfig="tableDialog.queryConfig"
            :isShowPopover="tableDialog.isshow"
            :itemName="tableDialog.itemName"
            :popoverList="tableDialog.data"
            :popoverListKey="tableDialog.tableConfig"
            :ruleForm="tableDialog.ruleForm"
            @changeisShowPopover="closeTableDialog"
            @handleBtnClickType="handlerFormConfigClickSearch"
            @handlePageChange="handlerFormConfigClickSearch"
            @handlerSubPreservation="tableDialogPreservation"
        ></popover-component>
        <!-- 附件上传弹窗 -->
        <upload-dialog :form="formDialog.ruleForm" :visible.sync="uploadDialogVisible"></upload-dialog>
    </div>
</template>

<script>
// 接口 工具
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'

// 组件
import QueryBar from '@/components/common/QueryBar.vue'
import TableComponent from '@/components/common/TabTable.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'
import UploadDialog from '@/components/common/upload/UploadDialog.vue'

// 注册表
import tableConfig from '@/domain/tableconfig/risk/Deposits.js'
import formConfig from '@/domain/formconfig/risk/Deposits.js'

const btnObj = [
    {
        type: 'search',
        label: '查询'
    }
]
import mixins from '@/components/views/risk/mixins.js'
import { mapGetters } from 'vuex'

const dialogQueryBar = {
    itemName: '出保(押)金单位',
    queryConfig: [],
    btnObj
}
export default {
    name: 'DepositsList',
    mixins: [mixins],
    created() {
        this.initTableList()
        api.initSelect(this.formDialog.formConfig)
    },
    watch: {
        'formDialog.ruleForm.outInsureUnitType'(cur, pre) {
            if (!cur || cur == pre) return
        },
        'formDialog.ruleForm.depositsAmount'(cur, pre) {
            if (!cur) return
            this.formDialog.ruleForm.depositsCurrency =
                +cur * (this.formDialog.ruleForm.exchangeRate || 0)
        }
    },
    data: () => ({
        uploadDialogVisible: false,
        tableDialogTarget: '',
        queryBar: {
            data: {}
        },
        table: {
            tableData: [],
            tableConfig
        },
        formDialog: {
            isshow: false,
            ruleForm: {},
            formConfig: utools.cloneObj(formConfig),
            itemName: '保证金(押金)管理'
        },
        tableDialog: {
            isshow: false,
            data: [],
            tableConfig: [],
            count: 0
        },
        pageCount: 0,
        tableClickRow: {},
        status: ''
    }),
    methods: {
        async initTableList(params = {}) {
            try {
                const {
                    data: { list, count }
                } = await api.getCashDepositManagement({
                    ...this.queryBar.data,
                    ...params
                })
                ;(this.table.tableData = list), (this.pageCount = count)
            } catch (error) {
                console.log(error)
            }
        },
        async handleBtnClickType(type) {
            switch (type) {
                case 'search':
                    await this.initTableList()
                    break
                case 'add':
                    {
                        try {
                            const { data } = await this.queryBarRequest[type]()
                            this.formDialog.formConfig = utools.cloneObj(
                                formConfig
                            )
                            api.initSelect(this.formDialog.formConfig)
                            this.formDialog.ruleForm = {}
                            this.formDialog.ruleForm.depositsNo = data
                            this.formDialog.isshow = true
                            this.status = 'add'
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    break
                case 'update':
                    {
                        if (!this.tableClickRow.depositsNo) {
                            utools.alertMessage.bind(this)('', '请选择一条数据')
                            return
                        }
                        this.formDialog.formConfig = utools.cloneObj(formConfig)
                        api.initSelect(this.formDialog.formConfig)
                        this.formDialog.ruleForm = this.tableClickRow
                        this.formDialog.isshow = true
                        this.status = 'update'
                    }
                    break
                case 'delete':
                    {
                        if (!this.tableClickRow.depositsNo) {
                            utools.alertMessage.bind(this)('', '请选择一条数据')
                            return
                        }
                        try {
                            const { status } = await this.queryBarRequest[
                                type
                            ]()
                            this.initTableList()
                            this.tableClickRow = {}
                            utools.alertMessage.bind(this)(status)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    break
            }
        },
        TableClickRowData(data) {
            this.tableClickRow = data
        },
        handleDbclickTable(data) {
            this.TableClickRowData(data)
            this.handleBtnClickType('update')
        },
        closeFromDialog() {
            if (!this.formDialog.isshow) return
            this.formDialog.isshow = !this.formDialog.isshow
        },
        // 弹窗按钮点击
        async handlerTableFormPreservation() {
            this.saveForm()
        },

        // 保存单据
        async saveForm() {
            let s = 0
            try {
                const { data, status } = await this.queryBarRequest['change'](
                    this.status == 'add' ? 'POST' : 'PUT'
                )
                s = status
                this.$set(this.formDialog.ruleForm, 'status', '1');
                this.status = 'update';
                this.initTableList()
            } catch (error) {
                console.log(error)
            }
            utools.alertMessage.bind(this)(s)
        },
        closeTableDialog() {
            if (!this.tableDialog.isshow) return
            this.tableDialog.isshow = !this.tableDialog.isshow
            this.formDialog.isshow = true
        },
        tableDialogPreservation(clickrow) {
            switch (this.tableDialogTarget) {
                case 'customerName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        customerName: clickrow.clientName,
                        customerCode: clickrow.clientNo
                    }
                    break
                case 'outInsureUnitName':
                    {
                        let obj = {
                            '1': {
                                outInsureUnitName: clickrow.customerName,
                                outInsureUnitCode: clickrow.customerNo
                            },
                            '2': {
                                outInsureUnitName: clickrow.supplierName,
                                outInsureUnitCode: clickrow.supplierCode
                            },
                            '3': {
                                outInsureUnitName: clickrow.thirdGroupName,
                                outInsureUnitCode: clickrow.billCode
                            },
                            '4': {
                                outInsureUnitName: clickrow.clientName,
                                outInsureUnitCode: clickrow.clientNo
                            }
                        }
                        this.formDialog.ruleForm = {
                            ...this.formDialog.ruleForm,
                            ...obj[this.formDialog.ruleForm.outInsureUnitType]
                        }
                    }
                    break
                case 'inInsureUnitName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        inInsureUnitName: clickrow.companyName,
                        inInsureUnitCode: clickrow.companyCode
                    }
                    break
                case 'repealPersonName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        repealPersonId: clickrow.employeeInfoCode,
                        repealPersonName: clickrow.employeeInfoName
                    }
                    break
            }
        },
        async handlerFormConfigClickSearch(params) {
            let dataType = utools.getDataType(params)
            const isRep = params === 'outInsureUnitName'
            let type = this.formDialog.ruleForm.outInsureUnitType
            dataType === 'String' &&
                params !== 'search' &&
                ((this.tableDialog.ruleForm = {}),
                (this.tableDialogTarget = params),
                (this.tableDialog = {
                    ...this.tableDialog,
                    ...(isRep
                        ? this.setDialogTitleAndQuery[this.tableDialogTarget][
                              type
                          ]
                        : this.setDialogTitleAndQuery[this.tableDialogTarget])
                }))
            try {
                const request = isRep
                    ? this.tableDialogRequest[this.tableDialogTarget][type]
                    : this.tableDialogRequest[this.tableDialogTarget]
                const WHITE_LIST = [
                    'inInsureUnitName',
                    'outInsureUnitName',
                    'repealPersonName'
                ]
                const {
                    data: { list, count }
                } = await request({
                    ...(dataType === 'Object' && params),
                    ...this.tableDialog.ruleForm,
                    status: WHITE_LIST.includes(this.tableDialogTarget)
                        ? '2'
                        : ''
                })
                this.tableDialog.data = list
                this.tableDialog.count = count
            } catch (error) {
                console.log(error)
            }
            if (dataType === 'Object' || params === 'search') return
            this.tableDialog.tableConfig = (isRep
                ? this.tableDialogConfig[this.tableDialogTarget][type]
                : this.tableDialogConfig[this.tableDialogTarget])()
            this.tableDialog.isshow = true
        }
    },
    computed: {
        ...mapGetters(['orderStatus']),
        queryBarRequest() {
            return {
                delete: _ =>
                    api.deleteDepositsData(this.tableClickRow.depositsNo),
                add: _ => api.getDepositsCode(),
                change: method =>
                    api.changeDepositsData(this.formDialog.ruleForm, method)
            }
        },
        queryBarFormConfig() {
            return [
                {
                    label: '委托方',
                    moduleBind: 'customerCode',
                    isInput: true
                },
                {
                    label: '单据状态',
                    moduleBind: 'status',
                    isSelect: true,
                    selectOption: this.orderStatus
                },
                {
                    label: '单据编码',
                    moduleBind: 'depositsNo',
                    isInput: true
                },
                {
                    label: '总金额',
                    moduleBind: 'depositsAmount',
                    isInput: true
                }
            ]
        },
        tableDialogRequest() {
            return {
                customerName: (data = {}) => api.queryclientSearch(data),
                outInsureUnitName: {
                    '1': (data = {}) => api.getCustomerList(data),
                    '2': (data = {}) => api.querysupplierbaseSearch(data),
                    '3': (data = {}) => api.getThirdGroupList(data),
                    '4': (data = {}) => api.queryclientSearch(data)
                },
                inInsureUnitName: (data = {}) =>
                    api.getCreditCompanyNameData(data),
                repealPersonName: (data = {}) =>
                    api.queryemployeeinfoSearch(data)
            }
        },
        tableDialogConfig: () => ({
            customerName: _ =>
                require('@/domain/tableconfig/business/Client.js').default,
            outInsureUnitName: {
                '1': _ =>
                    require('@/domain/tableconfig/basicdata/Customer.js')
                        .default,
                '2': _ =>
                    require('@/domain/tableconfig/basicdata/SupplierBase.js')
                        .default,
                '3': _ =>
                    require('@/domain/tableconfig/basicdata/ThirdGroup.js')
                        .default,
                '4': _ =>
                    require('@/domain/tableconfig/business/Client.js').default
            },
            inInsureUnitName: _ =>
                require('@/domain/tableconfig/basicdata/CompanyInfo.js')
                    .default,
            repealPersonName: _ =>
                require('@/domain/tableconfig/basicdata/EmployeeInfo.js')
                    .default
        }),
        setDialogTitleAndQuery: _ => ({
            customerName: {
                itemName: '委托方',
                queryConfig: [
                    {
                        isInput: true,
                        label: '委托方编码',
                        moduleBind: 'clientNo'
                    }
                ],
                btnObj
            },
            inInsureUnitName: {
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
            outInsureUnitName: {
                '1': {
                    itemName: '客户',
                    btnObj,
                    queryConfig: [
                        {
                            isInput: true,
                            label: '客户编码',
                            moduleBind: 'customerNo'
                        }
                    ]
                },
                '2': {
                    itemName: '供应商',
                    btnObj,
                    queryConfig: [
                        {
                            isInput: true,
                            label: '供应商编码',
                            moduleBind: 'supplierCode'
                        }
                    ]
                },
                '3': {
                    itemName: '第三方',
                    btnObj,
                    queryConfig: [
                        {
                            isInput: true,
                            label: '第三方编码',
                            moduleBind: 'billCode'
                        }
                    ]
                },
                '4': {
                    itemName: '委托方',
                    btnObj,
                    queryConfig: [
                        {
                            isInput: true,
                            label: '委托方编码',
                            moduleBind: 'clientNo'
                        }
                    ]
                }
            },
            repealPersonName: {
                itemName: '员工',
                queryConfig: [
                    {
                        isInput: true,
                        label: '员工编码',
                        moduleBind: 'employeeInfoCode'
                    }
                ],
                btnObj
            }
        })
    },
    components: {
        QueryBar,
        TableComponent,
        PaginationComponent,
        PopoverComponent,
        UploadDialog
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
</style>
