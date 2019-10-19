<template>
    <div>
        <preserve-btn
            :form="form.ruleForm"
            :isLoading="isLoading"
            @handlePreserve="handlePreserve"
            @handleRollback="_ => $router.push('/M0601')"
        ></preserve-btn>

        <!-- 页签  @tab-click="handleClick"-->
        <el-tabs type="card" v-model="activeTabName">
            <el-tab-pane
                :key="item.label"
                :label="item.label"
                :name="item.name"
                v-for="item of tabsList"
            />
        </el-tabs>

        <!-- 页签表单 -->
        <form-component
            :formConfig="form.formConfig[activeTabName]"
            :formModel="form.ruleForm"
            @handlerFormVerify="item => form.verify = item "
            @handlerSearchClick="handleClickFormSearch"
        ></form-component>

        <!-- 表格弹窗 -->
        <table-dialog
            :activeRow.sync="tableDialog.activeRow"
            :btnObj="tableDialog.queryBarConfig.btnObj"
            :count="tableDialog.count"
            :formConfig="tableDialog.queryBarConfig.formConfig"
            :isShowPopover.sync="tableDialog.visible"
            :itemName="tableDialog.title"
            :popoverList="tableDialog.list"
            :popoverListKey="tableDialog.config"
            :ruleForm="tableDialog.queryBarConfig.data"
            @handleBtnClickType="handleTableDialogPageChange"
            @handlePageChange="handleTableDialogPageChange"
            @handlerSubPreservation="handlerTableDialogPreservation"
        ></table-dialog>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'
import axios from 'axios'
const { cloneObj } = utools
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import TableDialog from '@/components/common/Table.Form.Dialog/TableComponent.vue'

import materielBase from '@/domain/formconfig/basicdata/MaterielBase.js'
import materielFinance from '@/domain/formconfig/basicdata/MaterielFinance.js'
import materielCustom from '@/domain/formconfig/basicdata/MaterielCustom.js'
import materielLogistics from '@/domain/formconfig/basicdata/MaterielLogistics.js'
const habndleListGroup = function(item) {
    return { ...item, group: this }
}

import productTax from '@/domain/formconfig/basicdata/ProductTax.js'
import customsMateriel from '@/domain/formconfig/basicdata/CustomsMateriel.js'
import customsTariff from '@/domain/formconfig/basicdata/CustomsTariff.js'
import secondUnitOfMeasure from '@/domain/tableconfig/basicdata/SecondUnitOfMeasure.js'

// 物料海关的分栏集合
const materielCustomList = (() => ({
    list: [
        ...materielCustom.map(habndleListGroup, '1'),
        ...productTax.map(habndleListGroup, '2'),
        ...customsMateriel.map(habndleListGroup, '3'),
        ...customsTariff.map(habndleListGroup, '4')
    ],
    otherConfig: {
        title: {
            '1': {
                visible: true,
                text: '物料海关'
            },
            '2': {
                visible: true,
                text: '关务客品税号'
            },
            '3': {
                visible: true,
                text: '物料税号'
            },
            '4': {
                visible: true,
                text: '关务税则'
            }
        }
    }
}))()

// tabledialog
import measurement from '@/domain/tableconfig/basicdata/Measurement'
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo'
import supervisionCondition from '@/domain/tableconfig/basicdata/SupervisionCondition.js'
import client from '@/domain/tableconfig/business/Client.js'
import exemption from '@/domain/tableconfig/basicdata/Exemption.js'
import brand from '@/domain/tableconfig/basicdata/Brand.js'
import origin from '@/domain/tableconfig/basicdata/Origin.js'
import domesticDestination from '@/domain/tableconfig/basicdata/DomesticDestination'
import deliveredGoodsPlace from '@/domain/tableconfig/basicdata/DeliveredGoodsPlace.js'
import institution from '@/domain/tableconfig/basicdata/Institution'

export default {
    name: 'MaterielBaseForm',
    components: {
        FormComponent,
        TableDialog
    },
    data: _ => {
        return {
            activeTabName: 'materielBase',
            isLoading: false,
            status: '',
            form: {
                verify: {},
                ruleForm: {},
                formConfig: {
                    materielBase: cloneObj(materielBase),
                    materielFinance: cloneObj(materielFinance),
                    materielCustom: cloneObj(materielCustomList),
                    materielLogistics: cloneObj(materielLogistics)
                },
                searchTarget: ''
            },
            tableDialog: {
                visible: false,
                title: '',
                list: [],
                config: [],
                count: 0,
                activeRow: {},
                queryBarConfig: {
                    formConfig: [],
                    data: {},
                    btnObj: [{ type: 'search', label: '查询' }]
                }
            },
            tabsList: [
                { name: 'materielBase', label: '物料基础信息' },
                { name: 'materielFinance', label: '物料财务信息' },
                { name: 'materielCustom', label: '物料海关信息' },
                { name: 'materielLogistics', label: '物料物流信息' }
                /*  { name: 'productTax', label: '关务客品税号' },
		 { name: 'customsMateriel', label: '物料税号表' },
		 { name: 'customsTariff', label: '关务税则表' } */
            ]
        }
    },

    created() {
        const { formData = {}, status } = this.getActivePathData(
                this.$route.path
            ),
            IS_ADD = status === 'add'
        formData && (this.form.ruleForm = formData)
        IS_ADD && !formData.materielCode && this.getBillsCode() // 获取单据编号
        this.status = status
        // 修改状态是获取单据数据
        !IS_ADD &&
            Object.keys(formData).length === 1 &&
            formData.materielCode &&
            this.getBillsData()
    },

    computed: {
        ...mapGetters(['getActivePathData'])
    },

    methods: {
        ...mapMutations(['addbreadCrumbsList']),
        async getBillsData() {
            try {
                const { data } = await api.getMaterielbaseData(
                    this.form.ruleForm.materielCode
                )
                data.valueAddRate += '' // 数字类型需转换下拉的值
                this.$set(this.form, 'ruleForm', data)
            } catch (error) {
                console.log(error)
            }
        },

        // 保存单据
        handlePreserve() {
            const IS_PASS = utools.checkFormPass(this.form.verify) // 校验表单结果

            let sCode = 200

            if (IS_PASS) {
                this.isLoading = true
                utools.saveReceiptsTips.call(this, async () => {
                    const { data } = await api.changeMaterielBaseData(
                        this.form.ruleForm,
                        this.status === 'add' ? 'POST' : 'PUT'
                    )
                    !this.form.ruleForm.status &&
                        this.$set(this.form.ruleForm, 'status', '1')
                })
                this.isLoading = false
                /*  try {
 
		 } catch (error) {
		   sCode = 0;
		   console.log(error)
		 } finally {
		   this.$message({
			 type: sCode ? 'success' : 'error',
			 message: sCode ? '保存成功！' : '保存失败，请重试！'
		   })
		 } */
            }
        },

        // 获取单据编号
        async getBillsCode() {
            try {
                const { data } = await api.getMaterielBaseCode()
                this.$set(this.form.ruleForm, 'materielCode', data)
            } catch (error) {
                this.$message.error('获取单据编号失败，请重试！')
                console.log(error)
            }
        },

        // 表单弹窗search按钮点击
        handleClickFormSearch(target) {
            this.form.searchTarget = target
            if (target === 'customsCode') return this.getDeclareMsg()
            this.setTableDialog(target)
            this.getTableDialogPageData()
        },

        // 设置表格弹窗
        setTableDialog(target) {
            const mCode = 'measurementUnit',
                moduleBind = {
                    measurementUnitName: mCode,
                    accContactName: 'employeeInfoName',
                    superCondition: 'billName',
                    custFirstUnit: mCode,
                    custSecondUnit: mCode,
                    clientName: 'clientName',
                    lengthUnitName: mCode,
                    weightUnitName: mCode,
                    volumeUnitName: mCode,
                    exemptionName: 'exemptionName',
                    brandName: 'brandName',
                    originName: 'originName',
                    originCountryName: 'originName',
                    domesticDestinationName: 'domesticDestinationName',
                    goodsPlaceName: 'goodsPlaceName',
                    inspectionNo: 'institutionName',
                    finalCountryName: 'originName'
                }[target],
                queryBarConfig = {
                    formConfig: [{ moduleBind, label: '名称', isInput: true }],
                    data: {},
                    btnObj: this.tableDialog.queryBarConfig.btnObj
                }
            this.tableDialog = {
                ...this.tableDialog,
                visible: true,
                list: [],
                count: 0,
                ...{
                    measurementUnitName: {
                        title: '计量单位',
                        config: measurement
                    },
                    customsUnitName: {
                        title: '海关法定计量单位',
                        config: measurement
                    },
                    accContactName: {
                        title: '会计联系人',
                        config: employeeInfo
                    },
                    superCondition: {
                        title: '监管条件',
                        config: supervisionCondition
                    },
                    lengthUnitName: { title: '长度单位', config: measurement },
                    weightUnitName: { title: '重量单位', config: measurement },
                    volumeUnitName: { title: '体积单位', config: measurement },
                    clientName: { title: '委托方', config: client },
                    secondUnitName: { title: '第二计量单位', config: [] },
                    custFirstUnit: {
                        title: '第一计量单位',
                        config: measurement
                    },
                    custSecondUnit: {
                        title: '第二计量单位',
                        config: measurement
                    },
                    exemptionName: { title: '征免性质', config: exemption },
                    brandName: { title: '品牌', config: brand },
                    originName: { title: '原产国', config: origin },
                    originCountryName: { title: '原产国', config: origin },
                    domesticDestinationName: {
                        title: '境内目的地',
                        config: domesticDestination
                    },
                    goodsPlaceName: {
                        title: '境内货源地',
                        config: deliveredGoodsPlace
                    },
                    inspectionNo: {
                        title: '检验检疫机关',
                        config: institution
                    },
                    finalCountryName: { title: '最终目的地', config: origin }
                }[target]
            }
            this.tableDialog.queryBarConfig = queryBarConfig
        },

        // 获取表格弹窗的分页数据
        getTableDialogPageData: (() => {
            const {
                getMeasurement: measurement,
                queryemployeeinfoSearch,
                getSupervisionConditionList,
                queryclientSearch,
                getSecondMeasurementPageData,
                getExemptionList,
                getBrandList,
                getOriginList,
                querydomesticdestinationSearch,
                getDeliveredGoodsPlaceList,
                queryinstitutionSearch
            } = api

            let config = {
                measurementUnitName: measurement,
                customsUnitName: measurement,
                accContactName: queryemployeeinfoSearch,
                superCondition: getSupervisionConditionList,
                lengthUnitName: measurement,
                weightUnitName: measurement,
                volumeUnitName: measurement,
                clientName: queryclientSearch,
                secondUnitName: new Function(),
                custFirstUnit: measurement,
                custSecondUnit: measurement,
                exemptionName: getExemptionList,
                brandName: getBrandList,
                originName: getOriginList,
                originCountryName: getOriginList,
                domesticDestinationName: querydomesticdestinationSearch,
                goodsPlaceName: getDeliveredGoodsPlaceList,
                inspectionNo: queryinstitutionSearch,
                finalCountryName: getOriginList
            }
            return async function() {
                const WHITE = [
                        'brandName',
                        'originName',
                        'originCountryName',
                        'domesticDestinationName',
                        'goodsPlaceName',
                        'measurementUnitName',
                        'accContactName',
                        'superCondition',
                        'custFirstUnit',
                        'custSecondUnit',
                        'lengthUnitName',
                        'weightUnitName',
                        'volumeUnitName',
                        'inspectionNo',
                        'finalCountryName'
                    ],
                    TARGET = this.form.searchTarget
                try {
                    let param =
                        typeof arguments[0] === 'string' ? {} : arguments[0] // 防止是别的类型

                    const {
                        data: { list, count }
                    } = await config[TARGET].call(api, {
                        ...param,
                        ...this.tableDialog.queryBarConfig.data,
                        status: WHITE.includes(TARGET) ? '2' : ''
                    })
                    ;(this.tableDialog.list = list),
                        (this.tableDialog.count = count)
                } catch (error) {
                    this.$message.error('获取数据失败，请重试！')
                    console.log(error)
                }
            }
        })(),

        // 表格弹窗点击确定
        handlerTableDialogPreservation(data = {}) {
            const {
                measurementCode,
                measurementUnit,
                employeeInfoCode,
                employeeInfoName,
                position,
                billCode,
                billName,
                clientNo,
                clientName,
                exemptionCode,
                exemptionName,
                brandCode,
                brandName,
                brandAbb,
                description: brandDes,
                originCode,
                originName,
                originAbb,
                description: originDes,
                domesticDestinationCode,
                domesticDestinationName,
                goodsPlaceName,
                goodsPlaceCode,
                institutionCode,
                institutionName,
                measurementCoding
            } = data
            let activeData = {
                measurementUnitName: {
                    measurementUnit: measurementCode,
                    measurementUnitName: measurementUnit
                },
                customsUnitName: {
                    customsUnit: measurementCode,
                    customsUnitName: measurementUnit
                },
                accContactName: {
                    accContact: employeeInfoCode,
                    accContactName: employeeInfoName,
                    resign: position
                },
                superCondition: {
                    superCondition: billName
                },
                lengthUnitName: {
                    lengthUnit: measurementCode,
                    lengthUnitName: measurementUnit
                },
                weightUnitName: {
                    weightUnit: measurementCode,
                    weightUnitName: measurementUnit
                },
                volumeUnitName: {
                    volumeUnit: measurementCode,
                    volumeUnitName: measurementUnit
                },
                clientName: { clientNo, clientName },
                secondUnitName: {},
                custFirstUnit: {
                    custFirstUnit: measurementUnit,
                    custFirstNums: measurementCoding
                },
                custSecondUnit: {
                    custSecondUnit: measurementUnit
                },
                exemptionName: {
                    exemption: exemptionCode,
                    exemptionName: exemptionName
                },
                brandName: { brandCode, brandName, brandAbb, brandDes },
                originName: { originCode, originName, originAbb, originDes },
                originCountryName: {
                    originCountryName: originName,
                    originCountry: originCode
                },
                domesticDestinationName: {
                    domesticDestinationName,
                    domesticDestination: domesticDestinationCode
                },
                goodsPlaceName: { goodsPlaceName, goodsPlace: goodsPlaceCode },
                inspectionNo: {
                    inspectionNo: institutionCode,
                    inspectionName: institutionName
                },
                finalCountryName: {
                    finalCountryName: originName,
                    finalCountry: originCode
                }
            }[this.form.searchTarget]

            for (let key in activeData) {
                if (!activeData.hasOwnProperty(key)) return
                this.$set(this.form.ruleForm, key, activeData[key])
            }
        },
        // 调用通关网查询申报的信息
        async getDeclareMsg() {
            try {
                const { data } = await api.getReportingElements(
                    this.form.ruleForm.customsCode
                )
                const keyList = [
                    'mostFavoredNationTaxRate',
                    'generalTaxRate',
                    'tempTaxRate',
                    'consumeTaxRate',
                    'exportReturnTaxRate',
                    'vatTaxRate',
                    'exportTaxRate'
                ]
                // 过滤 %号
                for (let item of keyList) {
                    data[item] = data[item].replace('%', '')
                }
                // 请求增值税下拉
                // 获取增值税下拉
                const { data: res } = await api.getEnum('valueAddedTax')
                const selectOption = res.filter(
                    item => item.itemValue === `${data.vatTaxRate}%`
                )
                data.vatTaxRate = (selectOption[0] || {}).itemKey
                // 处理商品信息的字段转换
                // 空值的处理
                function transfer(data) {
                    return data === '-' ? '' : data
                }
                const goodsData = (() => {
                    const {
                        hsCode,
                        goodsName,
                        declareFactor,
                        unitOne,
                        unitTwo,
                        mostFavoredNationTaxRate,
                        generalTax,
                        generalTaxRate,
                        tempTaxRate,
                        consumeTaxRate,
                        exportReturnTaxRate,
                        customsSupervisionCondition,
                        inspectionType
                    } = data
                    return {
                        customsCode: hsCode,
                        customsAbbreviation: goodsName,
                        declareElements: declareFactor,
                        custFirstUnit: unitOne,
                        custSecondUnit: unitTwo,
                        customsRate: transfer(mostFavoredNationTaxRate),
                        generalTax: transfer(generalTaxRate),
                        temporaryTax: transfer(tempTaxRate),
                        exciseTaxRate: transfer(consumeTaxRate),
                        rebateRate: transfer(exportReturnTaxRate),
                        valueAddRate: transfer(data.vatTaxRate),
                        superCondition: customsSupervisionCondition,
                        inspectionType: inspectionType
                    }
                })()
                for (let key in goodsData) {
                    if (goodsData.hasOwnProperty(key)) {
                        this.$set(this.form.ruleForm, key, goodsData[key])
                    }
                }
            } catch (error) {
                this.$message.error(`获取申报要素失败！`)
                console.log(error)
            }
        },

        // 表格弹窗的分页事件
        handleTableDialogPageChange(pageData) {
            this.getTableDialogPageData(pageData)
        }
    },

    beforeRouteLeave(to, form, next) {
        this.addbreadCrumbsList({
            data: { formData: this.form.ruleForm, status: this.status },
            path: this.$route.path
        })
        next()
    }
}
</script>