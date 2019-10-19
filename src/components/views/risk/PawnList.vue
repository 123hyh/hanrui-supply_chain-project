<template>
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
            @changeisShowPopover="closeFormDialog"
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
import mixins from '@/components/views/risk/mixins.js'

// 组件
import QueryBar from '@/components/common/QueryBar.vue'
import TableComponent from '@/components/common/TabTable.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'
import UploadDialog from '@/components/common/upload/UploadDialog.vue'

// 注册表
import tableConfig from '@/domain/tableconfig/risk/Pawn.js'
import formConfig from '@/domain/formconfig/risk/Pawn.js'
const btnObj = [
    {
        type: 'search',
        label: '查询'
    }
]
import { mapGetters } from 'vuex'

export default {
    name: 'PawnList',
    mixins: [mixins],
    watch: {
        // 是否票据抵押 勾选 控制
        'formDialog.ruleForm.notePawn': {
            handler(cur) {
                if (cur === undefined) return
                let disabled = !cur
                utools.setFormConfig(this.formDialog.formConfig, [
                    {
                        key: 'noteType',
                        disabled
                    },
                    {
                        key: 'noteName',
                        disabled
                    }
                ])
            },
            deep: true
        },
        // 计算可抵押价值
        'formDialog.ruleForm.appraisalValue'(cur, pre) {
            if (cur == pre) return
            this.formDialog.ruleForm.mortgageValue =
                ((this.formDialog.ruleForm.mortgageRate || 0) / 100) * cur
        },
        'formDialog.ruleForm.mortgageRate'(cur, pre) {
            if (cur == pre) return
            this.formDialog.ruleForm.mortgageValue =
                (this.formDialog.ruleForm.appraisalValue || 0) * (cur / 100)
        },
        // 计算原价本位币 = 汇率 * 原价
        'formDialog.ruleForm.originalPrice'(cur, pre) {
            if (!cur) return
            this.formDialog.ruleForm.originalPriceCurrency =
                (cur || 0) * (this.formDialog.ruleForm.exchangeRate || 0)
        }
    },
    created() {
        this.initTableList()
        api.initSelect(this.formDialog.formConfig)
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
            itemName: '抵(质)押物管理'
        },
        tableDialog: {
            isshow: false,
            data: [],
            tableConfig: [],
            itemName: '',
            count: 0,
            ruleForm: {}
        },
        pageCount: 0,
        tableClickRow: {},
        status: ''
    }),
    mounted() {},
    methods: {
        async initTableList(params = {}) {
            try {
                const {
                    data: { list, count }
                } = await api.getPawnList({ ...this.queryBar.data, ...params })
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
                            this.formDialog.ruleForm.pawnNo = data
                            this.formDialog.isshow = true
                            this.status = 'add'
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    break
                case 'update':
                    {
                        if (!this.tableClickRow.pawnNo) {
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
                        if (!this.tableClickRow.pawnNo) {
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
        closeFormDialog() {
            if (!this.formDialog.isshow) return
            this.formDialog.isshow = !this.formDialog.isshow
        },
        // 弹窗按钮点击
        async handlerTableFormPreservation() {
            this.saveForm()
        },
        // 提交单据
        async submitStatus() {
            let sCode = 0
            try {
                const { status } = await this.utools.submitBill({
                    param: this.formDialog.ruleForm,
                    ctx: this
                })
                sCode = status
                this.formDialog.isshow = false
                this.formDialog.ruleForm = {}
                this.tableClickRow = {}
                this.$set(this.formDialog.ruleForm, 'status', '1')
                this.initTableList()
            } catch (error) {
                console.log(error)
            } finally {
                this.utools.alertStatusMessage.call(this, {
                    status: sCode,
                    msg:
                        sCode === 200
                            ? { success: '提交成功' }
                            : { error: '提交失败,请重试' }
                })
            }
        },
        // 保存单据
        async saveForm() {
            let s = 0
            try {
                const { data, status } = await this.queryBarRequest['change'](
                    this.status == 'add' ? 'POST' : 'PUT'
                )
                s = status
                this.formDialog.ruleForm = {
                    ...this.formDialog.ruleForm,
                    status: data.status || '1'
                }
                this.status = 'update'
                this.initTableList()
            } catch (error) {
                console.log(error)
            }
            utools.alertMessage.call(this, s)
        },
        closeTableDialog() {
            if (!this.tableDialog.isshow) return
            this.tableDialog.isshow = !this.tableDialog.isshow
            this.formDialog.isshow = true
        },
        tableDialogPreservation(clickrow) {
            switch (this.tableDialogTarget) {
                case 'pawnorName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        pawnorName: clickrow.companyName,
                        pawnorCode: clickrow.companyCode
                    }
                    break
                case 'debtorName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        debtorName: clickrow.clientName,
                        debtorCode: clickrow.clientNo
                    }
                    break
                case 'pawnCompanyName': {
                    let type = this.formDialog.ruleForm.pawnCompanyType
                    let obj = {
                        '1': [clickrow.customerName, clickrow.customerNo],
                        '2': [clickrow.supplierName, clickrow.supplierCode],
                        '3': [clickrow.thirdGroupName, clickrow.billCode],
                        '4': [clickrow.clientName, clickrow.clientNo]
                    }
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        pawnCompanyName: obj[type][0],
                        pawnCompanyCode: obj[type][1]
                    }
                    break
                }
                case 'pawnUnitName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        pawnUnitName: clickrow.measurementUnit,
                        pawnUnit: clickrow.measurementCode
                    }
                    break
                case 'repealPersonName': {
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        repealPersonId: clickrow.employeeInfoCode,
                        repealPersonName: clickrow.employeeInfoName
                    }
                    break
                }
            }
        },
        async handlerFormConfigClickSearch(params) {
            let dataType = utools.getDataType(params)
            if (
                params === 'pawnCompanyName' &&
                !this.formDialog.ruleForm.pawnCompanyType
            ) {
                // 必须选择后才可以选择类型才可以选择 抵(质)押物单位
                utools.alertStatusMessage.call(this, {
                    msg: { warning: '请先选择抵(质)押物单位类型' }
                })
                return
            }
            if (dataType === 'String' && params !== 'search') {
                this.tableDialogTarget = params
                this.tableDialog = {
                    ...this.tableDialog,
                    tableConfig: (params === 'pawnCompanyName'
                        ? this.tableDialogConfig[this.tableDialogTarget][
                              this.formDialog.ruleForm.pawnCompanyType
                          ]
                        : this.tableDialogConfig[this.tableDialogTarget])(),
                    isshow: true,
                    ...this.setDialogTitleAndQuery[this.tableDialogTarget]
                }
                var itemName = {
                    '1': _ => '客户',
                    '2': _ => '供应商',
                    '3': _ => '第三方',
                    '4': _ => '委托方'
                }
                if (params == 'pawnCompanyName') {
                    this.tableDialog.itemName = itemName[
                        this.formDialog.ruleForm.pawnCompanyType
                    ]()
                }
                this.tableDialog.ruleForm = {}
            }
            const WHITE_LIST = ['pawnorName', 'pawnUnitName', 'pawnCompanyName']
            try {
                const {
                    data: { list, count }
                } = await (this.tableDialogTarget === 'pawnCompanyName'
                    ? this.tableDialogRequest[this.tableDialogTarget][
                          this.formDialog.ruleForm.pawnCompanyType
                      ]
                    : this.tableDialogRequest[this.tableDialogTarget])({
                    ...(dataType === 'Object' && params),
                    ...this.tableDialog.ruleForm,
                    status: WHITE_LIST.includes(this.tableDialogTarget)
                        ? '2'
                        : ''
                })
                this.tableDialog = { ...this.tableDialog, data: list, count }
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        ...mapGetters(['orderStatus']),
        queryBarFormConfig() {
            return [
                {
                    label: '委托方',
                    moduleBind: 'debtorName',
                    isInput: true
                },
                {
                    label: '单据状态',
                    moduleBind: 'status',
                    isSelect: true,
                    selectOption: this.orderStatus
                },
                {
                    label: '单据编号',
                    moduleBind: 'pawnNo',
                    isInput: true
                }
            ]
        },
        queryBarRequest() {
            return {
                delete: _ => api.deletePawnData(this.tableClickRow.pawnNo),
                add: _ => api.getPawnCode(),
                change: method =>
                    api.changePawnData(this.formDialog.ruleForm, method)
            }
        },
        tableDialogRequest() {
            return {
                pawnorName: (data = {}) => api.getCreditCompanyNameData(data),
                debtorName: (data = {}) => api.queryclientSearch(data),
                pawnCompanyName: {
                    // 1 客户 2 供应商  3 第三方 4 委托方
                    '1': (data = {}) => api.getCustomerList(data),
                    '2': (data = {}) => api.querysupplierbaseSearch(data),
                    '3': (data = {}) => api.getThirdGroupList(data),
                    '4': (data = {}) => api.queryclientSearch(data)
                },
                pawnUnitName: (data = {}) => api.getMeasurement(data),
                repealPersonName: (data = {}) =>
                    api.queryemployeeinfoSearch(data)
            }
        },
        tableDialogConfig: () => ({
            pawnorName: _ =>
                require('@/domain/tableconfig/basicdata/CompanyInfo.js')
                    .default,
            debtorName: _ =>
                require('@/domain/tableconfig/business/Client.js').default,
            pawnCompanyName: {
                // 1 客户 2 供应商  3 第三方 4 委托方
                '1': _ =>
                    require('@/domain/tableconfig/basicdata/Customer.js')
                        .default,
                '2': _ =>
                    require('@/domain/tableconfig/basicdata/SupplierBase')
                        .default,
                '3': _ =>
                    require('@/domain/tableconfig/basicdata/ThirdGroup.js')
                        .default,
                '4': _ =>
                    require('@/domain/tableconfig/business/Client').default
            },
            pawnUnitName: _ =>
                require('@/domain/tableconfig/basicdata/Measurement.js')
                    .default,
            repealPersonName: _ =>
                require('@/domain/tableconfig/basicdata/EmployeeInfo.js')
                    .default
        }),
        setDialogTitleAndQuery: _ => ({
            pawnorName: {
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
            pawnUnitName: {
                itemName: '计量单位',
                queryConfig: [
                    {
                        isInput: true,
                        label: '计量单位编码',
                        moduleBind: 'measurementCode'
                    }
                ],
                btnObj
            },
            debtorName: {
                itemName: '委托方',
                queryConfig: [
                    {
                        isInput: true,
                        label: '债务人编码',
                        moduleBind: 'clientNo'
                    }
                ],
                btnObj
            },
            pawnCompanyName: {
                itemName: '抵(质)押物单位',
                queryConfig: [
                    {
                        isInput: true,
                        label: '客户编码',
                        moduleBind: 'customerNo'
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
