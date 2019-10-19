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

// 组件
import QueryBar from '@/components/common/QueryBar.vue'
import TableComponent from '@/components/common/TabTable.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'
import UploadDialog from '@/components/common/upload/UploadDialog.vue'

// 注册表
import tableConfig from '@/domain/tableconfig/risk/Noensure.js'
import formConfig from '@/domain/formconfig/risk/Noensure.js'
const btnObj = [{ type: 'search', label: '查询' }]
import mixins from '@/components/views/risk/mixins.js'
import { mapGetters } from 'vuex'

export default {
    name: 'NoensureList',
    mixins: [mixins],
    created() {
        this.initTableList()
        api.initSelect(this.formDialog.formConfig)
    },
    watch: {
        'formDialog.ruleForm.creditAmount'(cur, pre) {
            this.sumCreditMoney(cur, this.formDialog.ruleForm.exchangeRate)
        },
        'formDialog.ruleForm.exchangeRate'(cur, pre) {
            this.sumCreditMoney(this.formDialog.ruleForm.creditAmount, cur)
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
            itemName: '无担保授信'
        },
        tableDialog: {
            isshow: false,
            data: [],
            tableConfig: [],
            count: 0,
            itemName: '',
            ruleForm: {}
        },
        pageCount: 0,
        tableClickRow: {},
        status: ''
    }),
    methods: {
        // 计算人民币授信人民币金额
        sumCreditMoney(creditAmount, exchangeRate) {
            creditAmount = +creditAmount || 0
            exchangeRate = +exchangeRate || 0
            this.formDialog.ruleForm.creditRmbAmount =
                creditAmount * exchangeRate
        },
        async initTableList(params = {}) {
            try {
                const {
                    data: { list, count }
                } = await api.getNoEnsureManageList({
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
                            this.formDialog.ruleForm = {}
                            this.status = 'add'
                            const { data } = await this.queryBarRequest[type]()
                            this.formDialog.formConfig = utools.cloneObj(
                                formConfig
                            )
                            api.initSelect(this.formDialog.formConfig)
                            this.formDialog.ruleForm = {
                                ...this.formDialog.ruleForm,
                                noCreditNo: data
                            }
                            this.formDialog.isshow = true
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    break
                case 'update':
                    {
                        if (!this.tableClickRow.noCreditNo) {
                            utools.alertMessage.bind(this)('', '请选择一条数据')
                            return
                        }
                        this.formDialog.formConfig = utools.cloneObj(formConfig)
                        api.initSelect(this.formDialog.formConfig)
                        this.status = 'update'
                        this.formDialog.ruleForm = this.tableClickRow
                        this.formDialog.isshow = true
                    }
                    break
                case 'delete':
                    {
                        if (!this.tableClickRow.noCreditNo) {
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
                case 'creditCompanyName':
                    this.formDialog.ruleForm = {
                        ...this.formDialog.ruleForm,
                        creditCompanyName: clickrow.companyName,
                        creditCompanyCode: clickrow.companyCode
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
            dataType === 'String' &&
                params !== 'search' &&
                ((this.tableDialogTarget = params),
                (this.tableDialog = {
                    ...this.tableDialog,
                    tableConfig: this.tableDialogConfig[
                        this.tableDialogTarget
                    ](),
                    isshow: true,
                    ...this.setDialogTitleAndQuery[this.tableDialogTarget]
                }),
                (this.tableDialog.ruleForm = {}))
            const WHITE_LIST = ['creditCompanyName']
            try {
                const {
                    data: { list, count }
                } = await this.tableDialogRequest[this.tableDialogTarget]({
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
            /* this.tableDialog.tableConfig = this.tableDialogConfig[this.tableDialogTarget]();
      this.tableDialog.isshow = true; */
        }
    },
    computed: {
        ...mapGetters(['orderStatus']),
        queryBarFormConfig() {
            return [
                {
                    label: '委托方编码',
                    moduleBind: 'customerCode',
                    isInput: true
                },
                {
                    label: '单据状态',
                    moduleBind: 'status',
                    isSelect: true,
                    selectOption: this.orderStatus
                },
                { label: '授信编码', moduleBind: 'noCreditNo', isInput: true }
            ]
        },
        queryBarRequest() {
            return {
                delete: _ =>
                    api.deleteNoensureData(this.tableClickRow.noCreditNo),
                add: _ => api.getNoensureCode(),
                change: method =>
                    api.changeNoensureData(this.formDialog.ruleForm, method)
            }
        },
        tableDialogRequest() {
            return {
                customerName: (data = {}) => api.queryclientSearch(data),
                creditCompanyName: (data = {}) =>
                    api.getCreditCompanyNameData(data),
                repealPersonName: (data = {}) =>
                    api.queryemployeeinfoSearch(data)
            }
        },
        tableDialogConfig: () => ({
            customerName: _ =>
                require('@/domain/tableconfig/business/Client.js').default,
            creditCompanyName: _ =>
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
            creditCompanyName: {
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
