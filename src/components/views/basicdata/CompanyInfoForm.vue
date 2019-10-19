<template>
    <div class="company-info-form">
        <!-- 顶部操作按钮 -->
        <preserve-btn
            :beforeSubmitCb="beforeSubmitCb"
            :form="form.data.base"
            :isLoading="topBtn.isLoading"
            @handlePreserve="handlePreserve"
            @handleRollback="handleRollback"
        ></preserve-btn>
        <!-- 顶部页签 -->
        <el-tabs @tab-click="handleTableClick" type="card" v-model="activeTabName">
            <el-tab-pane
                :disabled="item.name === 'finance' && status === 'add'"
                :key="item.name"
                :label="item.label"
                :name="item.name"
                v-for="item of itemtab"
            />
        </el-tabs>

        <!-- 审核 -->
        <!-- <div v-show="activeTabName==='finance'">
      <el-button @click.stop="Toexamine()" style="margin: 10px 0;">财务审核</el-button>
        </div>-->

        <!-- 表单 -->
        <form-component
            :formConfig="form.formConfig[activeTabName]"
            :formModel="form.data[activeTabName]"
            @handlerSearchClick="handlerFormSearchClick"
            ref="mianform"
        ></form-component>

        <!-- 子页签 -->
        <div v-show="activeTabName==='finance'">
            <el-tabs type="card">
                <el-tab-pane label="银行信息" />
            </el-tabs>

            <!-- 按钮 -->
            <BtnComponent :btnList="itemBtnList" @handleItemBtnClick="handleItemBtnClick"></BtnComponent>

            <!-- 表格 -->
            <table-component
                :activeRow.sync="table.activeRow"
                :count="table.count"
                :dialog="false"
                :isSubTable="true"
                :popoverList="table.list"
                :popoverListKey="table.config"
                @handlePageChange="getCompanybankPageData"
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
            </table-component>
        </div>

        <!-- 表格弹窗 -->
        <table-component
            :activeRow.sync="tableDialog.activeRow"
            :btnObj="tableDialog.btnList"
            :count="tableDialog.count"
            :formConfig="tableDialog.formConfig"
            :isShowPopover.sync="tableDialog.visibel"
            :itemName="tableDialog.title"
            :popoverList="tableDialog.list"
            :popoverListKey="tableDialog.config"
            :ruleForm="tableDialog.queryData"
            @handleBtnClickType="handleTableDialogPageChange"
            @handlePageChange="handleTableDialogPageChange"
            @handlerSubPreservation="handlerSubPreservation"
        ></table-component>

        <!-- 表单弹窗 -->
        <form-dialog
            :formData="formDialog.formData"
            :isShowPopover.sync="formDialog.visibel"
            :verificationRules.sync="bankVerify"
            @formClickPreservation="formClickPreservation"
            itemName="银行信息"
            popoverType="form"
            ref="bankform"
        ></form-dialog>
    </div>
</template>
<script>
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import BtnComponent from '@/components/common/BtnComponent.vue'

import formConfig from '@/domain/formconfig/basicdata/CompanyInfo.js'
import companyInfoFinance from '@/domain/formconfig/basicdata/CompanyInfoFinance.js'
import bankForm from '@/domain/formconfig/basicdata/CompanyInfoBank.js'

// 表格配置
import CompanyInfo from '@/domain/tableconfig/basicdata/CompanyInfo.js'
import bankTable from '@/domain/tableconfig/basicdata/CompanyInfoBank.js'
import { mapGetters, mapMutations } from 'vuex'

import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'
const { isNull, cloneObj } = utools

export default {
    name: 'CompanyInfoForm',
    components: {
        FormComponent,
        TableComponent,
        BtnComponent,
        FormDialog: TableComponent
    },
    created() {
        utools.getLocation({
            location: 'province',
            form: { formConfig: this.form.formConfig.base, fields: 'province' }
        })
        this.initData()
        // let jurisdiction = this.$store.state.authorityControl.listBtn['M0106']
        // if(jurisdiction.indexOf('finance')>-1){
        //   this.itemtab.push({label: '财务资料',name: 'finance'})
        // }
    },
    computed: {
        ...mapGetters(['getActivePathData']),
        itemBtnList() {
            if (+this.form.data.base.status || 0 <= 1) {
                return this.table.btnList
            }
            return []
        }
    },
    watch: {
        // 省
        'form.data.base.province': {
            handler(cur, pre) {
                if (cur === pre) return
                const form = this.form.data.base
                utools.getLocation({
                    location: 'city',
                    code: cur,
                    form: {
                        formConfig: this.form.formConfig.base,
                        fields: 'city'
                    }
                })
                pre && ((form.city = ''), (form.district = ''))
            },
            deep: true,
            immediate: true
        },
        // 市
        'form.data.base.city': {
            handler(cur, pre) {
                if (cur === pre || !cur) return
                const form = this.form.data.base
                utools.getLocation({
                    location: 'district',
                    code: cur,
                    form: {
                        formConfig: this.form.formConfig.base,
                        fields: 'district'
                    }
                })
                pre && (form.district = '')
            },
            deep: true
        }
    },

    data: _ => ({
        itemtab: [
            { label: '基本信息', name: 'base' },
            { label: '财务资料', name: 'finance' }
        ],
        status: '',
        activeTabName: 'base',
        searchTarget: '',
        topBtn: {
            isLoading: false
        },
        form: {
            data: {
                base: {},
                finance: {}
            },
            formConfig: {
                base: cloneObj(formConfig),
                finance: companyInfoFinance
            }
        },
        table: {
            activeRow: {},
            list: [],
            config: bankTable,
            count: 0,
            btnList: [
                { type: 'add', label: '新增' },
                { type: 'update', label: '修改' },
                { type: 'delete', label: '删除' }
            ]
        },
        tableDialog: {
            activeRow: {},
            visibel: false,
            title: '',
            list: [],
            config: [],
            count: 0,
            formConfig: [],
            queryData: {},
            btnList: [{ type: 'search', label: '查询' }]
        },
        formDialog: {
            visibel: false,
            formData: {
                ruleForm: {},
                formConfig: bankForm
            }
        },
        bankVerify: false
    }),
    beforeRouteLeave(to, from, next) {
        let param = {
            data: {
                status: this.status,
                formData: this.form
            },
            path: this.$route.path
        }
        this.addbreadCrumbsList(param)
        next()
    },
    methods: {
        ...mapMutations(['addbreadCrumbsList']),
        async tablebtn(row) {
            try {
                const { data } = await api.opcodeBankData(row)
                this.getCompanybankPageData()
                this.$message({
                    type: 'success',
                    message: '审核成功！'
                })
            } catch (error) {
                console.log(error)
            } finally {
            }
        },
        initData() {
            const { code, status, formData } = this.getActivePathData(
                this.$route.path
            )
            this.status = status
            formData && (this.form = formData)
            !code && !formData && this.loadCodeNo()
            code &&
                ((this.form.data.base.companyCode = code), this.getFormData())
        },

        // 新增时获取单据编号
        async loadCodeNo() {
            try {
                this.form.data.base = {
                    ...this.form.data.base,
                    companyCode: (await api.getcompanyinfoCode()).data
                }
            } catch (e) {
                console.log(e)
            }
        },

        // 获取表单数据
        async getFormData() {
            try {
                const code = this.form.data.base.companyCode,
                    [{ data: base }, { data: finance }] = await Promise.all([
                        api.searchOnecompanyinfoData(code),
                        api.getCompanyInfoFinanceData(code)
                    ])
                this.form.data = { base, finance: finance || {} }
            } catch (error) {
                this.$message({
                    type: 'error',
                    message: '获取数据失败，请重试！'
                })
                console.log(error)
            }
        },

        // 保存 基本信息 和 财务信息
        async handlePreserve() {
            let vet = await this.beforeseva()
            if (!vet) return
            let sCode = 200
            try {
                const { base, finance } = this.form.data,
                    port = {
                        base: 'changeCompanyinfoData',
                        finance: 'changeCompanyinfoFinanceData'
                    },
                    { data } = await api[port[this.activeTabName]]({
                        data:
                            this.activeTabName === 'base'
                                ? base
                                : { ...finance, companyCode: base.companyCode },
                        method:
                            this.activeTabName === 'finance'
                                ? 'POST'
                                : this.status === 'add'
                                ? 'POST'
                                : 'PUT'
                    })
                this.status === 'add' && (this.status = 'update')
                this.$set(this.form.data.base, 'status', '1')
            } catch (error) {
                sCode = 0
                console.log(error)
            } finally {
                this.$message({
                    type: sCode ? 'success' : 'error',
                    message: sCode ? '保存成功！' : '保存失败，请重试！'
                })
            }
        },
        handleRollback() {
            this.$router.push('/M0106')
        },

        // 页签点击
        handleTableClick() {
            this.activeTabName === 'finance' && this.getCompanybankPageData()
        },

        // 表单点击search按钮事件
        handlerFormSearchClick(target) {
            this.searchTarget = target
            Promise.all([
                this.setTableDialog(target),
                this.getTableDialogPageData()
            ])
        },

        // 设置表格弹窗配置
        setTableDialog: (() => {
            let company = {
                    title: '公司',
                    config: CompanyInfo,
                    formConfig: [
                        {
                            label: '编码',
                            moduleBind: 'companyCode',
                            isInput: true
                        }
                    ]
                },
                config = {
                    parentName: company,
                    organizationName: company
                }
            return function() {
                const target = this.searchTarget
                this.tableDialog = {
                    ...this.tableDialog,
                    ...config[target],
                    visibel: true,
                    activeRow: {},
                    queryData: {}
                }
            }
        })(),

        // 获取表格弹窗数据
        getTableDialogPageData: (() => {
            let company = api.querycompanyinfoSearch,
                port = {
                    parentName: company,
                    organizationName: company
                }
            return async function(pageData = {}) {
                const target = this.searchTarget
                try {
                    const {
                        data: { list, count }
                    } = await port[target].call(api, {
                        ...pageData,
                        ...this.tableDialog.queryData
                    })
                    this.tableDialog = { ...this.tableDialog, list, count }
                } catch (error) {
                    this.$message({
                        type: 'error',
                        message: '获取数据失败，请重试！'
                    })
                    console.log(error)
                }
            }
        })(),

        // 表格弹窗保存
        handlerSubPreservation() {
            const { companyCode, companyName } = this.tableDialog.activeRow,
                target = this.searchTarget,
                value = {
                    parentName: {
                        parentCode: companyCode,
                        parentName: companyName
                    },
                    organizationName: {
                        organizationCode: companyCode,
                        organizationName: companyName
                    }
                }
            this.tableDialog = {
                ...this.tableDialog,
                activeRow: {},
                visibel: false
            }
            this.form.data[this.activeTabName] = {
                ...this.form.data[this.activeTabName],
                ...value[target]
            }
        },

        // 表格弹窗分页事件
        handleTableDialogPageChange(data = {}) {
            this.getTableDialogPageData(data)
        },

        // 银行信息 子表 按钮事件
        handleItemBtnClick(type) {
            switch (type) {
                case 'add':
                    this.formDialog.visibel = true
                    break
                case 'update':
                    this.updateBankData()
                    break
                default:
                    this.removeBankData()
            }
        },

        // 查询 银行信息分页
        async getCompanybankPageData(data = {}) {
            try {
                const {
                    data: { list, count }
                } = await api.getALLBankDataAll({
                    ...data,
                    billNo: this.form.data.base.companyCode
                })
                this.table = { ...this.table, list, count }
            } catch (error) {
                console.log(error)
            }
        },

        // 修改银行信息
        updateBankData() {
            if (this.isTableActive()) {
                ;(this.formDialog.visibel = true),
                    (this.formDialog.formData.ruleForm = cloneObj(
                        this.table.activeRow
                    )),
                    (this.table.activeRow = {})
            }
        },

        // 删除银行信息
        removeBankData() {
            if (this.isTableActive()) {
                this.utools.deleteMessage.call(this, async () => {
                    let sCode = 200
                    try {
                        await api.deleteBankData(this.table.activeRow.itemCode)
                        this.table.activeRow = {}
                        this.getCompanybankPageData()
                    } catch (error) {
                        sCode = 0
                        console.log(error)
                    } finally {
                        this.$message({
                            type: sCode ? 'success' : 'error',
                            message: sCode ? '删除成功！' : '删除失败，请重试！'
                        })
                    }
                })
            }
        },

        // 新增 | 修改 银行信息
        async changeBankData() {
            const data = this.formDialog.formData.ruleForm
            try {
                if ('itemCode' in data) {
                    await api.changeAllBankData({
                        data: { ...data },
                        method: 'PUT'
                    })
                } else {
                    await api.changeAllBankData({
                        data: {
                            ...data,
                            billNo: this.form.data.base.companyCode
                        },
                        method: 'itemCode' in data ? 'PUT' : 'POST'
                    })
                }
                ;(this.formDialog.visibel = false),
                    (this.formDialog.formData.ruleForm = {})
                this.getCompanybankPageData()
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            } catch (error) {
                this.$message({
                    type: 'error',
                    message: '保存失败，请重试！'
                })
                console.log(error)
            }
        },

        // 表单弹窗保存
        formClickPreservation() {
            this.bankVerify['formModel'].validate(valid => {
                if (valid) {
                    this.changeBankData()
                }
            })
        },

        // 判断是否 选中一条数据
        isTableActive() {
            if (isNull(this.table.activeRow)) {
                this.$message({
                    type: 'warning',
                    message: '请选择一条数据操作！'
                })
                return false
            }
            return true
        },

        Toexamine() {},
        vet(f) {
            let flog = true
            if (f == '0') {
                this.$refs['mianform'].$refs['formModel'][0].validate(valid => {
                    if (!valid) {
                        flog = false
                    }
                })
            } else {
                this.$refs['mianform'].$refs['formModel_1'][0].validate(
                    valid => {
                        if (!valid) {
                            flog = false
                        }
                    }
                )
            }
            return flog
        },

        async beforeSubmitCb() {
            /* let flog = true
        for (let f = 0; f < this.itemtab.length; f++) {
          this.activeTabName = this.itemtab[f]['name']
          await this.$nextTick(() => {
            flog = this.vet(f)
          });
          if(!flog){
            this.$message({
              type: 'warning',
              message: '请录入必填项！'
            })
            break;
          }
        } */
        try {
             const code = this.form.data.base.companyCode
            const [
                { data: base },
                { data: finance },
                {
                    data: { list: bank }
                }
            ] = await Promise.all([
                api.searchOnecompanyinfoData(code),
                api.getCompanyInfoFinanceData(code),
                api.getALLBankDataAll({ billNo: code })
            ])
            
            if(base && finance && bank.length){
              return true;
            }else{
              this.$message.warning('请补充其他资料！');
              return false
            }
        } catch (error) {
            this.$message.error('提交失败！')
            console.log(error);
            return false
        }
           
        },

        async beforeseva() {
            let flog = true
            await this.$nextTick(() => {
                flog = this.vet(0)
            })
            if (!flog) {
                this.$message({
                    type: 'warning',
                    message: '请录入必填项！'
                })
            }
            return flog
        }
    }
}
</script>
<style lang="less">
.company-info-form {
}
</style>