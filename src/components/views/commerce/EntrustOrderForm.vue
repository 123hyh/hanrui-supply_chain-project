<template>
    <div class="EntrustOrderForm" element-loading-text="正在进行计算" v-loading="calculateLoading">
        <!-- 导出提示选择 -->
        <el-dialog
            :visible.sync="downFileDialog.visible"
            center
            style="text-align:center"
            title="选择下载类型"
            width="255px"
        >
            <el-radio-group v-model="downFileDialog.data.type">
                <el-radio label="entrustOrder">委托订单</el-radio>
                <el-radio label="paymentNotification">付款通知单</el-radio>
            </el-radio-group>
            <span class="dialog-footer" slot="footer">
                <el-button @click="downFileDialog.visible = false">取 消</el-button>
                <el-button @click="handleExport" type="primary">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 操作按钮 -->
        <preserve-btn
            :beforeSubmitCb="beforeSubmitCb"
            :form="entrustOrder"
            :isLoading="isLoading"
            @handleExport="()=> {
        downFileDialog.visible = true; 
        downFileDialog.data.type=''
        }"
            @handlePreserve="handlePreserve"
            @handleRollback="handlebackspacing"
        ></preserve-btn>
        <span class="entrustOrderNametitle">{{entrustOrderNametitle}}</span>
        <!-- 表单 -->
        <div :key="i" v-for="(item,i) in entrustOrderKey">
            <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
            <form-config
                :formModel="entrustOrder"
                :inputKey="item.list"
                @handlerFormConfigClickSearch="rousePopover"
                @handlerFormVerify="handlerFormVerify"
                ref="formC"
            ></form-config>
        </div>
        <!-- 子表与统计 -->
        <el-tabs
            @tab-click="handlerTabClick"
            class="tabs-defined"
            style="margin-top: 30px;"
            type="card"
            v-model="dataTab.tabActiveName"
        >
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="商品信息" name="goods">
                <div class="mb-10">
                    <el-button
                        @click="openTabForm('create')"
                        v-if="tanstionStatus <=1 || tanstionStatus ===6"
                    >新增</el-button>
                    <el-button
                        @click="openTabForm('update')"
                        v-if=" isClassifyJurisdiction || tanstionStatus <=1 || tanstionStatus ===6"
                    >修改</el-button>
                    <el-button
                        @click="openTabForm('delete')"
                        v-if="tanstionStatus <=1 || tanstionStatus ===6"
                    >删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="报关信息" name="custom">
                <div class="mb-10" v-show="+entrustOrder.status <=1 || +entrustOrder.status == 6 ">
                    <el-button @click="saveCostom">保存</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="买方接货信息" name="buyer"></el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="卖方交货信息" name="seller"></el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="受托方收款" name="trusteereceipt"></el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="受托方付款" name="trusteepanyment">
                <div class="mb-10" v-show="entrustOrder.status <=1 || +(entrustOrder.status) == 6">
                    <el-button @click="openTabForm('create')">新增</el-button>
                    <el-button @click="openTabForm('update')">修改</el-button>
                    <el-button @click="openTabForm('delete')">删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="收货信息" name="receive"></el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="转款信息" name="transfer"></el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="付款信息" name="panyment"></el-tab-pane>
            <el-tab-pane :disabled="dataTab.tabIsDisabled" label="收货与报关明细" name="detail"></el-tab-pane>
            <!-- 表格 -->
            <div class="handleTableHeight" v-if="dataTab.tabActiveName != 'custom'">
                <table-component
                    :count="dataTab.count"
                    :dialog="false"
                    :isSubTable="true"
                    :popoverList="dataTab.tableData"
                    :popoverListKey="dataTab.columnDataTable"
                    @handlePageChange="handleTabPageChange"
                    @rowClickData="clickTabRow"
                ></table-component>
            </div>
            <!-- 表单 -->
            <div :key="i" v-else v-for="(item,i) in entrustCustomKey">
                <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
                <form-config
                    :formModel="entrustCustom"
                    :inputKey="item.list"
                    @handlerFormConfigClickSearch="rousePopover"
                    @handlerFormVerify="handlerFormVerify"
                    ref="customtable"
                ></form-config>
            </div>
            <!---统计表---->
            <div class="handleTableHeight" v-if="dataTab.tabActiveName=='goods'">
                <el-table :data="tjval">
                    <el-table-column label="卖方销售货价" prop="sellerGoodsValueCount"></el-table-column>
                    <el-table-column label="运保杂费额" prop="costAmountCount"></el-table-column>
                    <el-table-column label="关税税额" prop="customTotalAmount"></el-table-column>
                    <el-table-column label="消费税额" prop="exciseTaxCount"></el-table-column>
                    <el-table-column label="进口环节增值税税额" prop="vatTaxAmountCount"></el-table-column>
                    <el-table-column label="其他税金" prop="otherTaxAmountCount"></el-table-column>
                    <el-table-column label="价税合计" prop="priceTaxCount"></el-table-column>
                    <el-table-column label="服务费" prop="serviceFeeCount"></el-table-column>
                    <el-table-column label="净重" prop="netWeightCount"></el-table-column>
                    <el-table-column label="毛重" prop="grossWeightCount"></el-table-column>
                </el-table>
            </div>
        </el-tabs>
        <!-- 统计表单 -->
        <div class="clientFooter">
            <legend style="margin: 20px 0 20px 600px;"></legend>
            <form-config
                :formModel="entrustOrder"
                :inputKey="entrustOrderKey7"
                :lan="3"
                @handlerFormConfigClickSearch="rousePopover"
                @handlerFormVerify="handlerFormVerify"
                ref="formE"
            ></form-config>
        </div>
        <!-- 子表商品信息,受托方付款表单-->
        <el-dialog
            :before-close="rouseFormPopover"
            :close-on-click-modal="false"
            :title="formPopover.itemName"
            :visible.sync="formPopover.isShowPopover"
            :width="formPopover.width"
            @close.native="rouseFormPopover"
            close-on-press-escape
            top="5vh"
            v-dialogDrag
            v-if="dataTab.tabActiveName == 'goods'"
        >
            <div class="diawtd">
                <div :key="i" v-for="(item,i) in formPopover.formData.formConfig">
                    <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
                    <form-config
                        :formModel="formPopover.formData.ruleForm"
                        :inputKey="item.list"
                        @handlerFormConfigClickSearch="rousePopover"
                        @handlerFormVerify="handlerFormVerify"
                        ref="formD"
                    ></form-config>
                </div>
            </div>
            <!-- 商务归类无法使用此按钮保存 -->
            <div class="btn-right" v-if="tanstionStatus < 2 || tanstionStatus==6">
                <el-button @click.stop="rouseFormPopover">取消</el-button>
                <el-button @click.stop="saveTabForm">确定</el-button>
            </div>
        </el-dialog>
        <popover
            :formData="formPopover.formData"
            :isShowPopover="formPopover.isShowPopover"
            :itemName="formPopover.itemName"
            :popoverType="formPopover.popoverType"
            :width="formPopover.width"
            @changeisShowPopover="rouseFormPopover"
            @formClickPreservation="saveTabForm"
            @handlerFormConfigClickSearch="rousePopover"
            v-else
        ></popover>
        <!-- 点选 -->
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
        <!-- 查看按钮 -->
        <!-- <el-dialog
      top="5vh"
      v-dialogDrag
      :title="btnPopover.itemName"
      :width="btnPopover.width"
      :visible.sync="btnPopover.isShowPopover"
      @close.native="rouseFormPopover"
      close-on-press-escape
      :close-on-click-modal="false"
      :before-close="rouseFormPopover"
    >
      <div class="diawtd">
        <div :key="i" v-for="(item,i) in formPopover.formData.formConfig">
          <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
          <form-config
            ref="formD"
            :formModel="formPopover.formData.ruleForm"
            :inputKey="item.list"
            @handlerFormConfigClickSearch="rousePopover"
            @handlerFormVerify="handlerFormVerify"
          ></form-config>
        </div>
      </div>
      <div class="btn-right">
        <el-button @click.stop="rouseFormPopover">取消</el-button>
        <el-button @click.stop="saveTabForm">确定</el-button>
      </div>
        </el-dialog>-->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="classifyForm.visibled"
            title="商品归类信息"
            v-dialogDrag
            width="1050px"
        >
            <form-config :formModel="classifyForm.data" :inputKey="classifyForm.config"></form-config>
            <span class="dialog-footer" slot="footer">
                <el-button @click="classifyForm.visibled = false">取 消</el-button>
                <el-button @click.stop="handleClassifySave">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// 引入公共的table组件
import { mapMutations, mapGetters } from 'vuex'
import utools from '@/domain/common/utools.js'
import api from '@/assets/js/appHelper'
import formModuleHead from '@/components/common/FormModuleHead.vue'
import FormConfig from '@/components/common/FormConfig'
import Pagination from '@/components/common/Pagination'
import Popover from '@/components/common/Popover'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
// 主表
import EntrustOrder from '@/domain/entities/commerce/EntrustOrder'
import EntrustOrderFormConfig from '@/domain/formconfig/commerce/EntrustOrder/EntrustOrderList'
import EntrustOrderFormConfig7 from '@/domain/formconfig/commerce/EntrustOrder/EntrustOrder.7'
// 报关信息栏
import entrustCustom from '@/domain/entities/commerce/EntrustCustom'
import entrustCustomKey from '@/domain/formconfig/commerce/EntrustCustom'
// 弹窗
import Agreement from '@/domain/tableconfig/business/Agreement.js'
import AgreementSolution from '@/domain/tableconfig/business/AgreementSolution.js'

let ColumnData = ''
export default {
    components: {
        formModuleHead,
        FormConfig,
        Pagination,
        TableComponent,
        Popover
    },
    data() {
        return {
            classifyForm: {
                visibled: false,
                data: {},
                config: [
                    {
                        type: 'string',
                        name: '商品编码',
                        key: 'hsCode',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '商品名称',
                        key: 'goodsName',
                        disabled: true
                    },
                    {
                        type: 'string',
                        key: 'declareFactor',
                        name: '申报要素',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '法定第一单位',
                        key: 'unitOne',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '法定第二单位',
                        key: 'unitTwo',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '最惠国进口税率(%)',
                        key: 'mostFavoredNationTaxRate'
                    },
                    {
                        type: 'string',
                        key: 'generalTaxRate',
                        disabled: true,
                        name: '普通进口税率(%)'
                    },
                    {
                        type: 'string',
                        key: 'tempTaxRate',
                        name: '暂定进口税率(%)',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '消费税率(%)',
                        key: 'consumeTaxRate',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '出口关税率(%)',
                        key: 'exportTaxRate',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '出口退税率(%)',
                        key: 'exportReturnTaxRate',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '增值税率(%)',
                        key: 'vatTaxRate',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '海关监管条件',
                        key: 'customsSupervisionCondition',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '检验检疫类别',
                        key: 'inspectionType',
                        disabled: true
                    },
                    {
                        type: 'string',
                        name: '商品描述',
                        key: 'goodsDescription',
                        disabled: true
                    }
                ]
            },
            downFileDialog: {
                visible: false,
                data: { type: '' }
            },
            calculateLoading: false, // 计算时需要loading
            searchTarget: '',
            entrustOrder: new EntrustOrder(), // 主表实体
            entrustOrderKey: utools.cloneObj(EntrustOrderFormConfig), // 配置
            entrustOrderKey7: utools.cloneObj(EntrustOrderFormConfig7), // 配置
            //子表
            dataTab: {
                columnDataTable: [], //子表表格配置
                tableData: [],
                // 保存后才启用 tab
                tabIsDisabled: true,
                tabActiveName: '',
                // 查询条件 form
                count: 0,
                queryTableData: {},
                tj: []
            },
            isLoading: false,
            //子表
            formPopover: {
                itemName: '', // 弹窗标题
                width: '70%',
                isShowPopover: false, // 弹窗显示
                popoverType: 'form', // 弹出框
                formData: {
                    ruleForm: {}, //子表实体
                    formConfig: [] //子表表单配置
                }
            },
            entrustCustom: utools.cloneObj(new entrustCustom()), // 报关实体
            entrustCustomKey, //配置
            // 点选
            popover: {
                //弹出框组件参数
                isShowPopover: false, // 弹窗显示
                popoverType: 'table', // 弹出框
                currencySelectInputKey: '', //弹出框选中对应的key值
                queryBarObj: [], // 弹出框查询栏
                popoverListKey: [], // 弹出框表头绑定的 key
                popoverList: [], // 表格数据
                count: 0, // 分页数据总条数
                ruleForm: {}, // 查询栏的model绑定
                curPopStorage: {}, // 当前弹窗传递的数据
                btnObj: [{ type: 'search', label: '查询' }], // 查询栏按钮
                itemName: '' // 弹窗标题
            },
            sellist: [], //所有业务类型下拉项
            verify: '',
            curRowData: '',
            iswtf: false,
            isxymc: false,
            isCheckRoll: false,
            writeback: '',
            allNewCommodityList: [], // 所有商品信息
            tjval: [],
            xgspdt: false // 正在修改单条商品
        }
    },
    computed: {
        // 状态
        tanstionStatus() {
            return +(this.entrustOrder.status || '')
                .replace(/-/, '.')
                .replace('-', '')
        },
        // 判断是否有权限 归类
        isClassifyJurisdiction() {
            const { parentRoute } = this.$route.meta
            const is = (this.getListBtn[parentRoute] || []).includes('classify')
            return is && this.tanstionStatus < 4 && this.tanstionStatus >= 2
        },
        ...mapGetters(['getActivePathData', 'userInfo', 'getListBtn']),
        //===================计算 主表
        // 委托订单类型
        entrustOrderType() {
            return this.entrustOrder.entrustOrderType
        },
        // 业务类型
        bizType() {
            return this.entrustOrder.bizType
        },
        // 成交方式
        dealMode() {
            return this.entrustOrder.dealMode
        },
        // 抬头
        head() {
            if (this.entrustOrderType && this.bizType) {
                if (this.entrustOrderType == 1 || this.entrustOrderType == 2) {
                    if (this.bizType == 1 || this.bizType == 3) {
                        return 'single' // 单抬头
                    } else {
                        return 'double' // 双抬头
                    }
                } else {
                    return 'other' // 其他
                }
            }
        },
        // 委托订单类型下拉文本
        entrustOrderName() {
            if (
                this.entrustOrderType &&
                this.utools.getFromconfigObj(
                    this.entrustOrderKey,
                    'entrustOrderType'
                )['selectOption'].length > 0
            ) {
                return this.utools.gecongfig(
                    this.entrustOrderKey,
                    'entrustOrderType',
                    this.entrustOrder.entrustOrderType
                )
            }
        },
        // 标题
        entrustOrderNametitle() {
            if (this.head == 'single') {
                return this.entrustOrderName + '(单抬头)'
            } else if (this.head == 'double') {
                return this.entrustOrderName + '(双抬头)'
            } else if (this.head == 'other') {
                return this.entrustOrderName
            }
        },
        // 签订日期
        signDate() {
            return this.entrustOrder.signDate
        },
        // 销售币别
        supplierCurrency() {
            return this.entrustOrder.supplierCurrency
        },
        // 订单汇率
        orderExchangeRate() {
            return this.entrustOrder.orderExchangeRate
        },
        // 采购币别
        currency() {
            return this.entrustOrder.currency
        },
        // 买方汇率
        zbbuyerExchangeRate() {
            return this.entrustOrder.buyerExchangeRate
        },
        //===================计算 子表
        // 海关汇率
        customsExchangeRate() {
            return this.formPopover.formData.ruleForm.customsExchangeRate || ''
        },
        // 货款汇率
        buyerExchangeRate() {
            return this.formPopover.formData.ruleForm.buyerExchangeRate || ''
        },
        // 低消差额
        minimumCharge() {
            // 最低消费额 - 服务费总和
            return (
                this.entrustOrder.minCharge -
                (this.entrustOrder.totalServiceCharge || 0)
            )
        },
        //  应开票金额
        // 	进出口 单：价税合计+服务费+杂费（代理报检费和检疫费）
        // 	进出口 双：服务费+杂费
        // 	本港 :  货值（转人命币）+服务费+杂费
        invoiceAmount() {
            //最低实际收款服务费
            var totalServiceCharge = 0
            if (this.minimumCharge > 0) {
                totalServiceCharge = this.entrustOrder.minCharge
            } else {
                totalServiceCharge = this.entrustOrder.totalServiceCharge
            }
            if (
                (this.entrustOrderType == 1 || this.entrustOrderType == 2) &&
                this.bizType
            ) {
                if (this.bizType == 1 || this.bizType == 3) {
                    //进出口单抬头
                    return (
                        (this.entrustOrder.priceTaxCount || 0) +
                        totalServiceCharge +
                        (this.entrustOrder.agencyFee || 0) +
                        (this.entrustOrder.quarantineFee || 0)
                    )
                } else {
                    //进出口双抬头
                    return (
                        totalServiceCharge +
                        (this.entrustOrder.agencyFee || 0) +
                        (this.entrustOrder.quarantineFee || 0)
                    )
                }
            }
            if (this.entrustOrderType == 3) {
                //本港
                if (this.entrustOrder.orderExchangeRate) {
                    return (
                        (this.entrustOrder.goodsValue || 0) *
                            (this.entrustOrder.orderExchangeRate || 0) +
                        totalServiceCharge +
                        (this.entrustOrder.agencyFee || 0) +
                        (this.entrustOrder.quarantineFee || 0)
                    )
                }
            }
            return 0
        },
        // 预计应收总额：
        // 	进出口 单双：价税合计+服务费+杂费(勾选是否垫货款)   or 价税合计 - 货值（转人命币）+服务费+杂费(不勾选是否垫货款)
        // 	本港 :  货值（转人命币）+服务费+杂费
        advanceAmount() {
            //最低实际收款服务费
            var totalServiceCharge = 0
            if (this.minimumCharge > 0) {
                totalServiceCharge = this.entrustOrder.minCharge
            } else {
                totalServiceCharge = this.entrustOrder.totalServiceCharge
            }
            if (
                (this.entrustOrderType == 1 || this.entrustOrderType == 2) &&
                this.bizType
            ) {
                //进出口单双抬头
                if (this.entrustOrder.matPayment) {
                    return (
                        (this.entrustOrder.priceTaxCount || 0) +
                        totalServiceCharge +
                        (this.entrustOrder.agencyFee || 0) +
                        (this.entrustOrder.quarantineFee || 0)
                    )
                } else {
                    if (this.entrustOrder.orderExchangeRate) {
                        // 注： 未勾选 是否垫货款 并 商品条数为0，这时候加税合计总和为0，用加税合计-货值（人）的时候，并没有最低消的服务费，所以要加上
                        return (
                            (this.entrustOrder.priceTaxCount || 0) -
                            (
                                (this.entrustOrder.goodsValue || 0) *
                                (this.entrustOrder.orderExchangeRate || 1)
                            ).toFixed(2) +
                            totalServiceCharge +
                            (this.entrustOrder.agencyFee || 0) +
                            (this.entrustOrder.quarantineFee || 0)
                        )
                    }
                }
            }
            if (this.entrustOrderType == 3) {
                //本港
                if (this.entrustOrder.orderExchangeRate) {
                    return (
                        (this.entrustOrder.goodsValue || 0) *
                            (this.entrustOrder.orderExchangeRate || 1) +
                        totalServiceCharge +
                        (this.entrustOrder.agencyFee || 0) +
                        (this.entrustOrder.quarantineFee || 0)
                    )
                }
            }
            return 0
        },
        // 参数过滤
        tableDialogWhiteList() {
            return [
                // 主表
                'trusteeName',
                'purchaseUnitName',
                'clientName',
                'supplierName',
                'customerName',
                'agreementName',
                // 物料
                'orderModel',
                'arrivalGoodsModel',
                'brandName',
                'sourceAreaName',
                'sellerUnitName',
                'superviseModeName',
                'exciseTaxRate',
                'taxTypeName',
                // 报关
                'businessUnitName',
                'declarationUnitName',
                'receiveUnitName',
                'sellerName',
                'sendUnitName',
                'customsContractBuyerName',
                'arrivalCountryName',
                // 受托方付款
                'settlementUnitName'
            ]
        },
        // 商品信息统计 计算逻辑处理
        commodityStatistics() {
            let data = {
                sellerGoodsValueCount: 0 /* 卖方销售货价 */,
                costAmountCount: 0 /* 运保杂费额 */,
                customTotalAmount: 0 /* 关税税额 */,
                exciseTaxCount: 0 /* 消费税额 */,
                vatTaxAmountCount: 0 /* 进口环节增值税税额 */,
                otherTaxAmountCount: 0 /* 其他税金 */,
                priceTaxCount: 0 /* 价税合计 */,
                serviceFeeCount: 0 /* 服务费 */,
                netWeightCount: 0 /* 净重 */,
                grossWeightCount: 0 /*  毛重 */
                // buyerGoodsValueCount: 0,/* 买方采购货值 */
                // sellerQuantityCount: 0,/* 卖方销售数量 */
            }
            const setKey = {
                // 取key计算
                sellerGoodsValueCount: 'sellerGoodsValue',
                costAmountCount: 'costAmount',
                customTotalAmount: 'customTaxAmount',
                exciseTaxCount: 'exciseTax',
                vatTaxAmountCount: 'vatTaxAmount',
                otherTaxAmountCount: 'otherTaxAmount',
                priceTaxCount: 'priceTax',
                serviceFeeCount: 'serviceFee',
                netWeightCount: 'netWeight',
                grossWeightCount: 'grossWeight'
                // sellerQuantityCount: 'sellerQuantity',
                // buyerGoodsValueCount: 'buyerGoodsValue',
            }
            for (let item of this.allNewCommodityList) {
                for (let key in setKey) {
                    if (data.hasOwnProperty(key)) {
                        data[key] =
                            ((+item[setKey[key]] || 0) * 1000000 +
                                (+data[key] || 0) * 1000000) /
                            1000000
                    }
                }
            }

            // 设置底部 统计栏表单 数据
            for (let key in data) {
                if (data.hasOwnProperty(key))
                    this.$set(this.entrustOrder, key, data[key])
            }
            const statisticsFormKey = {
                goodsValue: 'sellerGoodsValueCount' /* 卖方销售总货值 */,
                customTotalAmount: 'customTotalAmount' /* 关税合计 */,
                vatTotalAmount: 'vatTaxAmountCount' /* 增值税合计 */,
                totalServiceCharge: 'serviceFeeCount' /* 服务费总和 */,
                trusteePayGoodsAmount:
                    'sellerGoodsValueCount' /* 受托方应付货款总额 */
            }
            for (let key in statisticsFormKey) {
                if (statisticsFormKey.hasOwnProperty(key))
                    this.$set(
                        this.entrustOrder,
                        key,
                        data[statisticsFormKey[key]]
                    )
            }
            return data
        }
    },
    methods: {
        ...mapMutations(['addbreadCrumbsList']),
        async handleClassifySave() {
            if (
                await this.$confirm(
                    '确定修改当前商品信息,并产生一条物料基础信息？',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                )
            ) {
                // 1先计算该商品的金额，在保存，插入一条物料信息
                let {
                    goodsName, // 商品名称
                    hsCode,
                    mostFavoredNationTaxRate, // 最惠国 --> 关税税率(%)
                    consumeTaxRate, // 消费税率 exciseTaxRate
                    vatTaxRate, // 增值税率
                    exportReturnTaxRate, // 出口退税
                    customsSupervisionCondition // 监管条件
                } = this.classifyForm.data

                // 获取增值税下拉
                const { data: res } = await api.getEnum('valueAddedTax')
                const selectOption = res.filter(
                    item => item.itemValue === `${vatTaxRate}%`
                )
                vatTaxRate = (selectOption[0] || {}).itemKey
                // 空值的处理
                function transfer(data) {
                    return data === '-' ? '' : data
                }
                let data = {
                    goodsName,
                    taxNo: hsCode,
                    customTaxRate: transfer(mostFavoredNationTaxRate),
                    vatTaxRate: transfer(vatTaxRate),
                    drawbackRate: transfer(exportReturnTaxRate),
                    exciseTaxRate: transfer(consumeTaxRate)
                }
                // 遍历修改商品信息的字段
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.$set(
                            this.formPopover.formData.ruleForm,
                            key,
                            data[key]
                        )
                    }
                }
                // 保存当前商品信息和插入一条商品信息
                // 处理商品信息的字段转换
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
                        } = this.classifyForm.data,
                        {
                            arrivalGoodsModel,
                            arrivalGoodsName,
                            sellerUnitName,
                            brandName,
                            sourceAreaName
                        } = this.formPopover.formData.ruleForm
                    return {
                        customsCode: hsCode,
                        customsAbbreviation: goodsName,
                        declareElements: declareFactor,
                        custFirstUnitName: unitOne,
                        custSecondUnitName: unitTwo,
                        customsRate: transfer(mostFavoredNationTaxRate),
                        generalTax: transfer(generalTaxRate),
                        temporaryTax: transfer(tempTaxRate),
                        exciseTaxRate: transfer(consumeTaxRate),
                        rebateRate: transfer(exportReturnTaxRate),
                        valueAddRate: transfer(vatTaxRate),
                        superConditionName: customsSupervisionCondition,
                        inspectionType: inspectionType,
                        specificationType: arrivalGoodsModel,
                        tradeName: arrivalGoodsName,
                        measurementUnitName: sellerUnitName,
                        brandName,
                        originName: sourceAreaName
                    }
                })()
                debugger
                // 获取物料商品编码
                const { data: materielCode } = await api.getMaterielBaseCode()

                this.$nextTick(async () => {
                    try {
                        const data = await Promise.all([
                            api.changeEntrustGodds({
                                data: this.formPopover.formData.ruleForm,
                                method: 'PUT'
                            }),
                            api.changeMaterielBaseData(
                                { materielCode, ...goodsData },
                                'POST'
                            )
                        ])
                        // 请求商品列表信息
                        this.handlerTabClick({ name: 'goods' })
                        // 关闭弹窗
                        this.classifyForm.visibled = false
                        this.formPopover.isShowPopover = false
                        this.$message.success(
                            '修改成功，并新增一条物料商品信息。'
                        )
                    } catch (error) {
                        this.$message.error('修改数据失败！')
                        console.log(error)
                    }
                })
            }
        },
        async rousePopover(key) {
            console.log(`当前点击弹窗对象 --- ${key}`)
            // 关务如果是点击 归类的动作
            if (key === 'customsGoodsCode') {
                const code = this.formPopover.formData.ruleForm.customsGoodsCode
                if (code) {
                    const { data } = await api.getReportingElements(code)
                    const keyList = [
                        'mostFavoredNationTaxRate',
                        'generalTaxRate',
                        'tempTaxRate',
                        'consumeTaxRate',
                        'exportReturnTaxRate',
                        'vatTaxRate',
                        'exportTaxRate'
                    ]
                    for (let item of keyList) {
                        data[item] = data[item].replace('%', '')
                    }

                    /* const {
              hsCode, // 编码
              goodsName, // 商品名称
              declareFactor, // 申报要素
              unitOne, // 法定第一单位
              unitTwo, // 法定第二单位
              mostFavoredNationTaxRate, // 最惠国进口税率
              generalTaxRate, // 普通进口税率
              tempTaxRate, // 暂定进口税率
              consumeTaxRate, // 消费税率
              exportReturnTaxRate, // 出口退税率
              vatTaxRate, // 增值税率
              exportTaxRate, // 出口关税率
              customsSupervisionCondition, // 海关监管条件
              inspectionType, // 检验检疫类别
              goodsDescription // 商品描述
          } = data */
                    this.classifyForm.visibled = true
                    this.classifyForm.data = data
                } else {
                    return this.$message.warning('请输入编码进行查询！')
                }
                return
            }
            if (key == 'brandNameorder') {
                if (!this.formPopover.formData.ruleForm.arrivalGoodsModel) {
                    this.$message.warning('请选择来货规格型号')
                    return
                }
                this.popover.queryBarObj = [
                    {
                        label: '品牌名称',
                        moduleBind: 'brandName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/materielbrand'
                this.popover.itemName = '品牌记录'
                this.popover.ruleForm.specificationType = this.formPopover.formData.ruleForm.arrivalGoodsModel
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'specificationType', name: '来货规格型号' },
                    { key: 'brandName', name: '品牌' },
                    { key: 'orderTimes', name: '次数' }
                ]
            }
            if (key == 'sourceAreaNameorder') {
                if (!this.formPopover.formData.ruleForm.arrivalGoodsModel) {
                    this.$message.warning('请选择来货规格型号')
                    return
                }
                this.popover.queryBarObj = [
                    {
                        label: '品牌名称',
                        moduleBind: 'brandName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/materielorigin'
                this.popover.itemName = '产地记录'
                this.popover.ruleForm.specificationType = this.formPopover.formData.ruleForm.arrivalGoodsModel
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'specificationType', name: '来货规格型号' },
                    { key: 'originName', name: '产地' },
                    { key: 'orderTimes', name: '次数' }
                ]
            }
            this.popover.popoverList = []
            if (key == 'trusteeName' || key == 'settlementUnitName') {
                this.popover.queryBarObj = [
                    {
                        label: '公司名称',
                        moduleBind: 'companyName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/companyinfo'
                this.popover.itemName = '公司'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'companyCode', name: '公司编码' },
                    { key: 'companyName', name: '名称' },
                    { key: 'national', name: '国家' },
                    { key: 'province', name: '省' },
                    { key: 'city', name: '市' },
                    { key: 'district', name: '区县' }
                ]
            } else if (key == 'purchaseUnitName') {
                this.popover.queryBarObj = [
                    {
                        label: '部门编码',
                        moduleBind: 'departmentCode',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/department'
                this.popover.itemName = '部门资料'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'departmentCode', name: '部门编码' },
                    { key: 'departmentName', name: '部门名称' },
                    { key: 'parentDepartment', name: '上级部门' },
                    { key: 'remark', name: '部门说明' }
                ]
            } else if (key == 'clientName') {
                this.popover.queryBarObj = [
                    {
                        label: '委托方编号',
                        moduleBind: 'clientNo',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/client'
                this.popover.itemName = '委托方'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'clientNo', name: '委托方编号' },
                    { key: 'clientName', name: '委托方名称' },
                    { key: 'tel', name: '电话' },
                    { key: 'billStatus', name: '单据状态' },
                    { key: 'clientLevel', name: '委托方等级' }
                ]
            } else if (key == 'clientContactName') {
                if (!this.entrustOrder.clientCode) {
                    this.$message.warning('请选择委托方')
                    return
                }
                this.popover.queryBarObj = [
                    {
                        label: '联系人编号',
                        moduleBind: 'clientNo',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/clientcontact'
                this.popover.ruleForm.clientNo = this.entrustOrder.clientCode
                this.popover.itemName = '委托方联系人'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'clientNo', name: '委托方编号' },
                    { key: 'leader', name: '负责人' },
                    { key: 'duty', name: '职务' },
                    { key: 'tel', name: '电话' },
                    { key: 'phone', name: '手机' },
                    { key: 'email', name: 'Email' }
                ]
            } else if (key == 'supplierName') {
                this.popover.queryBarObj = [
                    {
                        label: '供应商编码',
                        moduleBind: 'supplierCode',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/supplierbase'
                this.popover.itemName = '供应商'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'supplierCode', name: '供应商编码' },
                    { key: 'supplierName', name: '供应商中文名称' },
                    { key: 'creditLevel', name: '信用等级' },
                    { key: 'withinSupplier', name: '内部供应商' },
                    { key: 'hasChecked', name: '已审核' },
                    { key: 'supplierAbb', name: '供应商简称' }
                ]
            } else if (key == 'supplierContactName') {
                if (!this.entrustOrder.supplierCode) {
                    this.$message.warning('请选择供应商')
                    return
                }
                this.popover.queryBarObj = [
                    {
                        label: '联系人编号',
                        moduleBind: 'clientNo',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/suppliercontact'
                this.popover.ruleForm.supplierCode = this.entrustOrder.supplierCode
                this.popover.itemName = '委托方联系人'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'supplierCode', name: '委托方编号' },
                    { key: 'contact', name: '联系人' },
                    { key: 'tel', name: '办公电话' },
                    { key: 'duty', name: '职务' },
                    { key: 'phone', name: 'phone' },
                    { key: 'email', name: 'Email' }
                ]
            } else if (key == 'agreementName') {
                if (!this.entrustOrder.clientCode) {
                    this.$message.warning('请选择委托方')
                    return
                }
                this.popover.queryBarObj = [
                    {
                        label: '协议编号',
                        moduleBind: 'agreementNo',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/agreement'
                this.popover.itemName = '协议名称'
                this.popover.popoverListKey = Agreement
                this.popover.ruleForm.customerCode = this.entrustOrder.clientCode
            } else if (key == 'agreementSolutionName') {
                if (!this.entrustOrder.agreementName) {
                    this.$message.warning('请选择协议名称')
                    return
                }
                this.popover.queryBarObj = [
                    {
                        label: '方案编号',
                        moduleBind: 'solutionNo',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/agreementsolution'
                this.popover.ruleForm.agreementNo = this.entrustOrder.agreementCode
                this.popover.itemName = '协议方案'
                this.popover.popoverListKey = AgreementSolution
            } else if (key == 'businessUnitName') {
                this.popover.queryBarObj = [
                    {
                        label: '公司名称',
                        moduleBind: 'companyName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/companyinfo'
                this.popover.itemName = '公司'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'companyCode', name: '公司编码' },
                    { key: 'companyName', name: '名称' },
                    { key: 'national', name: '国家' },
                    { key: 'province', name: '省' },
                    { key: 'city', name: '市' },
                    { key: 'district', name: '区县' }
                ]
            } else if (key == 'sellerName') {
                if (this.entrustCustom.sellerType) {
                    switch (this.entrustCustom.sellerType) {
                        case '1':
                            this.popover.queryBarObj = [
                                {
                                    label: '公司名称',
                                    moduleBind: 'companyName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/companyinfo'
                            this.popover.itemName = '公司'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'companyCode', name: '公司编码' },
                                { key: 'companyName', name: '名称' },
                                { key: 'national', name: '国家' },
                                { key: 'province', name: '省' },
                                { key: 'city', name: '市' },
                                { key: 'district', name: '区县' }
                            ]
                            break
                        case '2':
                            this.popover.queryBarObj = [
                                {
                                    label: '委托方编号',
                                    moduleBind: 'clientNo',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/client'
                            this.popover.itemName = '委托方'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'clientNo', name: '委托方编号' },
                                { key: 'clientName', name: '委托方名称' },
                                { key: 'tel', name: '电话' },
                                { key: 'billStatus', name: '单据状态' },
                                { key: 'clientLevel', name: '委托方等级' }
                            ]
                            break
                        case '3':
                            this.popover.queryBarObj = [
                                {
                                    label: '客户名称',
                                    moduleBind: 'customerName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/customer'
                            this.popover.itemName = '客户'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'customerNo', name: '客户编码' },
                                { key: 'customerName', name: '客户名称' },
                                {
                                    key: 'internalCustomer',
                                    name: '是否内部客户'
                                },
                                { key: 'shortName', name: '客户简称' },
                                { key: 'parentCustomerName', name: '客户' },
                                { key: 'customerNature', name: '客户性质' }
                            ]
                            break
                        default:
                            this.popover.queryBarObj = [
                                {
                                    label: '供应商编码',
                                    moduleBind: 'supplierCode',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/supplierbase'
                            this.popover.itemName = '供应商'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'supplierCode', name: '供应商编码' },
                                { key: 'supplierName', name: '供应商中文名称' },
                                { key: 'creditLevel', name: '信用等级' },
                                { key: 'withinSupplier', name: '内部供应商' },
                                { key: 'hasChecked', name: '已审核' },
                                { key: 'supplierAbb', name: '供应商简称' }
                            ]
                            break
                    }
                } else {
                    this.$message.warning('请选择报关卖方类型')
                    return
                }
            } else if (key == 'receiveUnitName') {
                if (this.entrustCustom.receiveUnitType) {
                    switch (this.entrustCustom.receiveUnitType) {
                        case '1':
                            this.popover.queryBarObj = [
                                {
                                    label: '公司名称',
                                    moduleBind: 'companyName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/companyinfo'
                            this.popover.itemName = '公司'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'companyCode', name: '公司编码' },
                                { key: 'companyName', name: '名称' },
                                { key: 'national', name: '国家' },
                                { key: 'province', name: '省' },
                                { key: 'city', name: '市' },
                                { key: 'district', name: '区县' }
                            ]
                            break
                        case '2':
                            this.popover.queryBarObj = [
                                {
                                    label: '委托方编号',
                                    moduleBind: 'clientNo',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/client'
                            this.popover.itemName = '委托方'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'clientNo', name: '委托方编号' },
                                { key: 'clientName', name: '委托方名称' },
                                { key: 'tel', name: '电话' },
                                { key: 'billStatus', name: '单据状态' },
                                { key: 'clientLevel', name: '委托方等级' }
                            ]
                            break
                        case '3':
                            this.popover.queryBarObj = [
                                {
                                    label: '客户名称',
                                    moduleBind: 'customerName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/customer'
                            this.popover.itemName = '客户'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'customerNo', name: '客户编码' },
                                { key: 'customerName', name: '客户名称' },
                                {
                                    key: 'internalCustomer',
                                    name: '是否内部客户'
                                },
                                { key: 'shortName', name: '客户简称' },
                                { key: 'parentCustomerName', name: '客户' },
                                { key: 'customerNature', name: '客户性质' }
                            ]
                            break
                        default:
                            this.popover.queryBarObj = [
                                {
                                    label: '供应商编码',
                                    moduleBind: 'supplierCode',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/supplierbase'
                            this.popover.itemName = '供应商'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'supplierCode', name: '供应商编码' },
                                { key: 'supplierName', name: '供应商中文名称' },
                                { key: 'creditLevel', name: '信用等级' },
                                { key: 'withinSupplier', name: '内部供应商' },
                                { key: 'hasChecked', name: '已审核' },
                                { key: 'supplierAbb', name: '供应商简称' }
                            ]
                            break
                    }
                } else {
                    this.$message.warning('请选择收货单位类型')
                    return
                }
            } else if (key == 'sendUnitName') {
                if (this.entrustCustom.sendUnitType) {
                    switch (this.entrustCustom.sendUnitType) {
                        case '1':
                            this.popover.queryBarObj = [
                                {
                                    label: '公司名称',
                                    moduleBind: 'companyName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/companyinfo'
                            this.popover.itemName = '公司'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'companyCode', name: '公司编码' },
                                { key: 'companyName', name: '名称' },
                                { key: 'national', name: '国家' },
                                { key: 'province', name: '省' },
                                { key: 'city', name: '市' },
                                { key: 'district', name: '区县' }
                            ]
                            break
                        case '2':
                            this.popover.queryBarObj = [
                                {
                                    label: '委托方编号',
                                    moduleBind: 'clientNo',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/client'
                            this.popover.itemName = '委托方'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'clientNo', name: '委托方编号' },
                                { key: 'clientName', name: '委托方名称' },
                                { key: 'tel', name: '电话' },
                                { key: 'billStatus', name: '单据状态' },
                                { key: 'clientLevel', name: '委托方等级' }
                            ]
                            break
                        case '3':
                            this.popover.queryBarObj = [
                                {
                                    label: '客户名称',
                                    moduleBind: 'customerName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/customer'
                            this.popover.itemName = '客户'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'customerNo', name: '客户编码' },
                                { key: 'customerName', name: '客户名称' },
                                {
                                    key: 'internalCustomer',
                                    name: '是否内部客户'
                                },
                                { key: 'shortName', name: '客户简称' },
                                { key: 'parentCustomerName', name: '上级客户' },
                                { key: 'customerNature', name: '客户性质' }
                            ]
                            break
                        default:
                            this.popover.queryBarObj = [
                                {
                                    label: '供应商编码',
                                    moduleBind: 'supplierCode',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/supplierbase'
                            this.popover.itemName = '供应商'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'supplierCode', name: '供应商编码' },
                                { key: 'supplierName', name: '供应商中文名称' },
                                { key: 'creditLevel', name: '信用等级' },
                                { key: 'withinSupplier', name: '内部供应商' },
                                { key: 'hasChecked', name: '已审核' },
                                { key: 'supplierAbb', name: '供应商简称' }
                            ]
                            break
                    }
                } else {
                    this.$message.warning('请选择发货单位类型')
                    return
                }
            } else if (key == 'customsContractBuyerName') {
                if (this.entrustCustom.customsBuyerType) {
                    switch (this.entrustCustom.customsBuyerType) {
                        case '1':
                            this.popover.queryBarObj = [
                                {
                                    label: '公司名称',
                                    moduleBind: 'companyName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/companyinfo'
                            this.popover.itemName = '公司'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'companyCode', name: '公司编码' },
                                { key: 'companyName', name: '名称' },
                                { key: 'national', name: '国家' },
                                { key: 'province', name: '省' },
                                { key: 'city', name: '市' },
                                { key: 'district', name: '区县' }
                            ]
                            break
                        case '2':
                            this.popover.queryBarObj = [
                                {
                                    label: '委托方编号',
                                    moduleBind: 'clientNo',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/client'
                            this.popover.itemName = '委托方'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'clientNo', name: '委托方编号' },
                                { key: 'clientName', name: '委托方名称' },
                                { key: 'tel', name: '电话' },
                                { key: 'billStatus', name: '单据状态' },
                                { key: 'clientLevel', name: '委托方等级' }
                            ]
                            break
                        case '3':
                            this.popover.queryBarObj = [
                                {
                                    label: '客户名称',
                                    moduleBind: 'customerName',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/customer'
                            this.popover.itemName = '客户'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'customerNo', name: '客户编码' },
                                { key: 'customerName', name: '客户名称' },
                                {
                                    key: 'internalCustomer',
                                    name: '是否内部客户'
                                },
                                { key: 'shortName', name: '客户简称' },
                                { key: 'parentCustomerName', name: '上级客户' },
                                { key: 'customerNature', name: '客户性质' }
                            ]
                            break
                        default:
                            this.popover.queryBarObj = [
                                {
                                    label: '供应商编码',
                                    moduleBind: 'supplierCode',
                                    isInput: true
                                }
                            ]
                            this.popover.apiKey = '/supplierbase'
                            this.popover.itemName = '供应商'
                            this.popover.popoverListKey = [
                                // 设置表格的表头
                                { key: 'supplierCode', name: '供应商编码' },
                                { key: 'supplierName', name: '供应商中文名称' },
                                { key: 'creditLevel', name: '信用等级' },
                                { key: 'withinSupplier', name: '内部供应商' },
                                { key: 'hasChecked', name: '已审核' },
                                { key: 'supplierAbb', name: '供应商简称' }
                            ]
                            break
                    }
                } else {
                    this.$message.warning('请选择报关买方类型')
                    return
                }
            } else if (key == 'arrivalCountryName') {
                this.popover.queryBarObj = [
                    {
                        label: '运抵国编码',
                        moduleBind: 'arrivalCountryCode',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/arrivalcountry'
                this.popover.itemName = '运抵国'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'arrivalCountryCode', name: '运抵国编码' },
                    { key: 'arrivalCountryName', name: '运抵国名称' },
                    { key: 'customsCode', name: '对应海关编码' },
                    { key: 'description', name: '描述' }
                ]
            } else if (key == 'declarationUnitName') {
                this.popover.queryBarObj = [
                    {
                        label: '公司名称',
                        moduleBind: 'companyName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/companyinfo'
                this.popover.itemName = '公司'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'companyCode', name: '公司编码' },
                    { key: 'companyName', name: '名称' },
                    { key: 'national', name: '国家' },
                    { key: 'province', name: '省' },
                    { key: 'city', name: '市' },
                    { key: 'district', name: '区县' }
                ]
            } else if (key == 'orderModel') {
                this.popover.queryBarObj = [
                    {
                        label: '商品名称',
                        moduleBind: 'tradeName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/materielbase'
                this.popover.itemName = '物料基础信息'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'materielCode', name: '物料基础编码' },
                    { key: 'tradeName', name: '商品名称' },
                    { key: 'materielStatusName', name: '物料状态' },
                    { key: 'materielTypeName', name: '物料分类' },
                    { key: 'measurementUnitName', name: '计量单位' },
                    { key: 'specificationType', name: '规格型号' }
                ]
            } else if (key == 'arrivalGoodsModel') {
                this.popover.queryBarObj = [
                    {
                        label: '规格型号',
                        moduleBind: 'specificationType',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/materielbase'
                this.popover.itemName = '物料基础信息'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'materielCode', name: '物料基础编码' },
                    { key: 'tradeName', name: '商品名称' },
                    { key: 'materielStatus', name: '物料状态' },
                    { key: 'materielType', name: '物料分类' },
                    { key: 'measurementUnitName', name: '计量单位' },
                    { key: 'specificationType', name: '规格型号' }
                ]
            } else if (key == 'sellerUnitName') {
                this.popover.queryBarObj = [
                    {
                        label: '单位名称',
                        moduleBind: 'measurementUnit',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/measurement'
                this.popover.itemName = '单位'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'measurementCode', name: '单据编号' },
                    // { key: "measurementGroup", name: "计量单位组" },
                    { key: 'measurementUnit', name: '计量单位名称' },
                    { key: 'remark', name: '备注' }
                ]
            } else if (key == 'taxTypeName') {
                this.popover.queryBarObj = [
                    {
                        label: '税种名称',
                        moduleBind: 'taxCategoryName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/taxcategory'
                this.popover.itemName = '税种信息'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'billCode', name: '税种编码' },
                    { key: 'taxCategoryName', name: '税种名称' },
                    { key: 'tax', name: '税率' }
                ]
            } else if (key == 'exciseTaxRate') {
                this.popover.queryBarObj = [
                    {
                        label: '税种名称',
                        moduleBind: 'taxCategoryName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/taxcategory'
                this.popover.itemName = '税种信息'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'billCode', name: '税种编码' },
                    { key: 'taxCategoryName', name: '税种名称' },
                    { key: 'tax', name: '税率' }
                ]
            } else if (key == 'customerName') {
                this.popover.queryBarObj = [
                    {
                        label: '客户名称',
                        moduleBind: 'customerName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/customer'
                this.popover.itemName = '客户'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'customerNo', name: '客户编码' },
                    { key: 'customerName', name: '客户名称' },
                    { key: 'internalCustomer', name: '是否内部客户' },
                    { key: 'shortName', name: '客户简称' },
                    { key: 'parentCustomerName', name: '上级客户' },
                    { key: 'customerNature', name: '客户性质' }
                ]
            } else if (key == 'brandName') {
                this.popover.queryBarObj = [
                    {
                        label: '品牌名称',
                        moduleBind: 'brandName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/brand'
                this.popover.itemName = '品牌列表'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'brandCode', name: '编码' },
                    { key: 'brandName', name: '名称' },
                    { key: 'brandAbb', name: '简称' },
                    { key: 'customsCode', name: '对应海关编码' },
                    { key: 'description', name: '描述' }
                ]
            } else if (key == 'superviseModeName') {
                this.popover.queryBarObj = [
                    {
                        label: '监管方式名称',
                        moduleBind: 'supervisionModeName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/supervisioncondition'
                this.popover.itemName = '监管方式列表'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'billCode', name: '编码' },
                    { key: 'billName', name: '名称' },
                    { key: 'billAbb', name: '简称' }
                ]
            } else if (key == 'sourceAreaName') {
                this.popover.queryBarObj = [
                    {
                        label: '原产地名称',
                        moduleBind: 'originName',
                        isInput: true
                    }
                ]
                this.popover.apiKey = '/origin'
                this.popover.itemName = '原产地'
                this.popover.popoverListKey = [
                    // 设置表格的表头
                    { key: 'originCode', name: '编码' },
                    { key: 'originName', name: '名称' },
                    { key: 'originAbb', name: '简称' },
                    { key: 'customsCode', name: '对应海关编码' },
                    { key: 'description', name: '描述' }
                ]
            }
            this.searchTarget = key
            let currencyObj = {
                // 配置当前点击请求对象
                [key]: async () => {
                    try {
                        let {
                            data: { count, list }
                        } = await api.querySearch(this.popover.apiKey, {
                            ...this.popover.ruleForm,
                            status: this.tableDialogWhiteList.includes(
                                this.searchTarget
                            )
                                ? '2'
                                : ''
                        })
                        this.popover.count = count
                        this.popover.popoverList = list
                    } catch (error) {
                        console.log(error)
                    }
                    this.popover.ruleForm = {}
                }
            }
            this.popover.currencySelectInputKey = key
            key && currencyObj[key]()
            this.popover.isShowPopover = !this.popover.isShowPopover
        },
        async handlerSubPreservation(rowData, key) {
            let _this = this
            if (key == 'orderModel' || key == 'arrivalGoodsModel') {
                this.formPopover.formData.ruleForm['arrivalGoodsModel'] =
                    rowData['specificationType'] //来货规格型号
                return
            } else if (key != undefined) {
                switch (key) {
                    case 'trusteeName':
                        this.entrustOrder.trusteeCode = rowData['companyCode']
                        this.entrustOrder[key] = rowData['companyName']
                        break
                    case 'purchaseUnitName':
                        this.entrustOrder.departmentCode =
                            rowData['departmentCode']
                        this.entrustOrder.purchaseUnitCode =
                            rowData['departmentCode']
                        this.entrustOrder[key] = rowData['departmentName']
                        break
                    case 'clientName':
                        this.entrustOrder.clientCode = rowData['clientNo']
                        this.entrustOrder[key] = rowData['clientName']
                        api.searchOneclientData(rowData['clientNo']).then(
                            res => {
                                if (res.status == '200') {
                                    _this.entrustOrder.salesmanId =
                                        res.data.orderReceiverCode
                                    _this.entrustOrder.salesmanName =
                                        res.data.orderReceiverName
                                    _this.entrustOrder.followPersonId =
                                        res.data.orderFollowerCode
                                    _this.entrustOrder.followPersonName =
                                        res.data.orderFollowerName
                                }
                            }
                        )
                        this.entrustOrder['clientContactName'] = ''
                        this.entrustOrder['clientTel'] = ''
                        this.entrustOrder['clientPhone'] = ''
                        break
                    case 'clientContactName':
                        this.entrustOrder[key] = rowData['leader']
                        // 回写
                        this.entrustOrder['clientTel'] = rowData['tel']
                        this.entrustOrder['clientPhone'] = rowData['phone']
                        break
                    case 'supplierName':
                        if (
                            sessionStorage.getItem('btnType') == 'update' &&
                            this.entrustOrder.supplierCode !=
                                rowData['supplierCode'] &&
                            !this.isCheckRoll
                        ) {
                            this.TipsClose(rowData, key)
                            return
                        }
                        this.isCheckRoll = false
                        // 回写
                        this.entrustOrder[key] = rowData[key]
                        this.entrustOrder.supplierCode = rowData['supplierCode']
                        var { data } = await api.searchOnesupplierfinanceData(
                            rowData['supplierCode']
                        )
                        this.entrustOrder.supplierCurrency = data.currency || ''
                        // 清空
                        this.entrustOrder['supplierContactName'] = ''
                        this.entrustOrder['supplierTel'] = ''
                        this.entrustOrder['supplierPhone'] = ''
                        // 重新计算
                        if (this.writeback) return
                        if (this.dataTab.tabIsDisabled) return
                        var { data } = await api.editentrustorderData(
                            this.entrustOrder
                        )
                        this.handleOrderExchangeChangeCommodity()
                        break
                    case 'supplierContactName':
                        this.entrustOrder[key] = rowData['contact']
                        // 回写
                        this.entrustOrder['supplierTel'] = rowData['tel']
                        this.entrustOrder['supplierPhone'] = rowData['phone']
                        break
                    case 'customerName':
                        if (
                            sessionStorage.getItem('btnType') == 'update' &&
                            this.entrustOrder.customerCode !=
                                rowData['customerNo'] &&
                            !this.isCheckRoll
                        ) {
                            this.TipsClose(rowData, key)
                            return
                        }
                        this.isCheckRoll = false
                        //
                        this.entrustOrder[key] = rowData[key]
                        this.entrustOrder.customerCode = rowData['customerNo']
                        // 币别
                        var { data } = await api.getCustomerFinance({
                            customerNo: rowData['customerNo']
                        })
                        this.entrustOrder.currency =
                            data.settlementCurrency || ''
                        // 重新计算
                        if (this.writeback) return
                        if (this.dataTab.tabIsDisabled) return
                        var { data } = await api.editentrustorderData(
                            this.entrustOrder
                        )
                        this.handleOrderExchangeChangeCommodity()
                        break
                    case 'businessUnitName':
                        this.entrustCustom = {
                            ...this.entrustCustom,
                            [key]: rowData['companyName']
                        }
                        this.entrustCustom['businessUnitCode'] =
                            rowData['companyCode']
                        break
                    case 'declarationUnitName':
                        this.entrustCustom = {
                            ...this.entrustCustom,
                            [key]: rowData['companyName']
                        }
                        this.entrustCustom['declarationUnitCode'] =
                            rowData['companyCode']
                        break
                    case 'receiveUnitName':
                        if (this.entrustCustom.receiveUnitType == '1') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['companyName']
                            }
                            this.entrustCustom['receiveUnitCode'] =
                                rowData['companyCode']
                        }
                        if (this.entrustCustom.receiveUnitType == '2') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['clientName']
                            }
                            this.entrustCustom['receiveUnitCode'] =
                                rowData['clientCode']
                        }
                        if (this.entrustCustom.receiveUnitType == '3') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['customerName']
                            }
                            this.entrustCustom['receiveUnitCode'] =
                                rowData['customerCode']
                        }
                        if (this.entrustCustom.receiveUnitType == '4') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['supplierName']
                            }
                            this.entrustCustom['receiveUnitCode'] =
                                rowData['supplierCode']
                        }
                        break
                    case 'sendUnitName':
                        if (this.entrustCustom.sendUnitType == '1') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['companyName']
                            }
                            this.entrustCustom['sendUnit'] =
                                rowData['companyCode']
                        }
                        if (this.entrustCustom.sendUnitType == '2') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['clientName']
                            }
                            this.entrustCustom['sendUnit'] =
                                rowData['clientCode']
                        }
                        if (this.entrustCustom.sendUnitType == '3') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['customerName']
                            }
                            this.entrustCustom['sendUnit'] =
                                rowData['customerCode']
                        }
                        if (this.entrustCustom.sendUnitType == '4') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['supplierName']
                            }
                            this.entrustCustom['sendUnit'] =
                                rowData['supplierCode']
                        }
                        break
                    case 'customsContractBuyerName':
                        if (this.entrustCustom.customsBuyerType == '1') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['companyName']
                            }
                            this.entrustCustom['customsContractBuyer'] =
                                rowData['companyCode']
                        }
                        if (this.entrustCustom.customsBuyerType == '2') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['clientName']
                            }
                            this.entrustCustom['customsContractBuyer'] =
                                rowData['clientCode']
                        }
                        if (this.entrustCustom.customsBuyerType == '3') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['customerName']
                            }
                            this.entrustCustom['customsContractBuyer'] =
                                rowData['customerCode']
                        }
                        if (this.entrustCustom.customsBuyerType == '4') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['supplierName']
                            }
                            this.entrustCustom['customsContractBuyer'] =
                                rowData['supplierCode']
                        }
                        break
                    case 'sellerName':
                        if (this.entrustCustom.sellerType == '1') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['companyName']
                            }
                            this.entrustCustom['sellerCode'] =
                                rowData['companyCode']
                        }
                        if (this.entrustCustom.sellerType == '2') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['clientName']
                            }
                            this.entrustCustom['sellerCode'] =
                                rowData['clientCode']
                        }
                        if (this.entrustCustom.sellerType == '3') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['customerName']
                            }
                            this.entrustCustom['sellerCode'] =
                                rowData['customerCode']
                        }
                        if (this.entrustCustom.sellerType == '4') {
                            this.entrustCustom = {
                                ...this.entrustCustom,
                                [key]: rowData['supplierName']
                            }
                            this.entrustCustom['sellerCode'] =
                                rowData['supplierCode']
                        }
                        break
                    case 'sellerUnitName':
                        // console.log(rowData["measurementUnit"],rowData["measurementCode"])
                        this.formPopover.formData.ruleForm['sellerUnit'] =
                            rowData['measurementCode'] //卖方单位编码
                        this.formPopover.formData.ruleForm['sellerUnitName'] =
                            rowData['measurementUnit'] //卖方单位
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm
                        }
                        break
                    case 'arrivalCountryName':
                        this.entrustCustom = {
                            ...this.entrustCustom,
                            [key]: rowData['arrivalCountryName']
                        }
                        this.entrustCustom['arrivalCountry'] =
                            rowData['arrivalCountryCode']
                        break
                    case 'taxTypeName':
                        this.formPopover.formData.ruleForm['taxTypeName'] =
                            rowData['taxCategoryName']
                        this.formPopover.formData.ruleForm['otherTaxRate'] =
                            rowData['tax']
                        break
                    case 'exciseTaxRate':
                        this.formPopover.formData.ruleForm['exciseTaxRate'] =
                            rowData['tax']
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm
                        }
                        break
                    case 'brandName':
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm,
                            [key]: rowData['brandName']
                        }
                        this.formPopover.formData.ruleForm['brand'] =
                            rowData['brandCode']
                        break
                    case 'superviseModeName':
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm,
                            [key]: rowData['billName']
                        }
                        this.formPopover.formData.ruleForm['superviseMode'] =
                            rowData['billCode']
                        break
                    case 'sourceAreaName':
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm,
                            [key]: rowData['originName']
                        }
                        this.formPopover.formData.ruleForm['sourceArea'] =
                            rowData['originCode']
                        break
                    case 'settlementUnitName':
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm,
                            ['settlementUnit']: rowData['companyCode']
                        }
                        this.formPopover.formData.ruleForm[
                            'settlementUnitName'
                        ] = rowData['companyName']
                        break
                    // 协议名称agreementName
                    case 'agreementName':
                        if (
                            this.entrustOrder.status == '1' &&
                            this.entrustOrder.agreementCode !=
                                rowData['agreementNo'] &&
                            !this.isCheckRoll
                        ) {
                            this.TipsClose(rowData, key)
                            return
                        }
                        this.isCheckRoll = false
                        //
                        this.entrustOrder[key] = rowData[key]
                        this.entrustOrder.agreementCode = rowData['agreementNo']
                        this.entrustOrder.dayRate = rowData['insideDayRate'] // 日利率
                        // 作为参数
                        this.isxymc = true
                        this.popover.curPopStorage.agreementNo =
                            rowData['agreementNo']
                        // 重置协议方案
                        this.entrustOrder.agreementSolutionName = '' //方案名称
                        this.entrustOrder.agreementSolutionCode = '' //编码
                        this.entrustOrder.entrustOrderType = '' //委托订单类型
                        this.entrustOrder.reportGateType = '' // 报关类型
                        this.entrustOrder.bizType = '' //业务类型
                        this.entrustOrder.tradeMode = '' //贸易方式
                        this.entrustOrder.dealMode = '' //成交方式
                        this.entrustOrder.invoiceType = '' //发票类型
                        this.entrustOrder.solutionNo = '' // 公式编码
                        // 服务费计算
                        this.entrustOrder.serviceCharge = ''
                        this.entrustOrder.serviceTaxRate = ''
                        this.entrustOrder.serviceFee = ''
                        // 如果是修改  也要同时选择方案  避免中途操作商品
                        if (this.writeback) return
                        if (this.dataTab.tabIsDisabled) return
                        this.rousePopover('agreementSolutionName')
                        break
                    case 'agreementSolutionName': //协议方案
                        if (
                            this.entrustOrder.status == '1' &&
                            this.entrustOrder.agreementSolutionCode &&
                            this.entrustOrder.agreementSolutionCode !=
                                rowData['solutionNo'] &&
                            !this.isCheckRoll
                        ) {
                            this.TipsClose(rowData, key)
                            return
                        }
                        this.isCheckRoll = false
                        this.entrustOrder[key] = rowData['solutionName'] //方案名称
                        this.entrustOrder.agreementSolutionCode =
                            rowData['itemCode'] //编码
                        this.entrustOrder.entrustOrderType =
                            rowData['customType'] //委托订单类型
                        this.entrustOrder.reportGateType =
                            '' + rowData['customType'] //报关类型
                        this.entrustOrder.bizType = rowData['businessType'] // 业务类型
                        this.entrustOrder.tradeMode = rowData['tradeType'] //贸易方式
                        this.entrustOrder.dealMode = rowData['establishMode'] //成交方式
                        this.entrustOrder.invoiceType = rowData['invoiceType'] //发票类型
                        this.entrustOrder.matPayment = rowData['matPayment'] //发票类型
                        this.entrustOrder.solutionNo = rowData.solutionNo // 公式编码
                        // 服务费计算
                        this.entrustOrder.serviceCharge =
                            rowData['serviceChargeType']
                        this.entrustOrder.serviceTaxRate =
                            rowData['serviceChargeRate']
                        this.entrustOrder.serviceFee = rowData['serviceCharge']
                        // 最低消费额
                        this.entrustOrder.minCharge = rowData['minimumCharge']
                        this.entrustOrder = { ...this.entrustOrder }
                        // 锁定 贸易方式、成交方式
                        // if (this.entrustOrder.entrustOrderType == 4) {
                        //   this.utools.getFromconfigObj(this.entrustOrderKey, "tradeMode")[
                        //     "disabled"
                        //   ] = true;
                        //   this.utools.getFromconfigObj(this.entrustOrderKey, "dealMode")[
                        //     "disabled"
                        //   ] = true;
                        // } else {
                        //   this.utools.getFromconfigObj(this.entrustOrderKey, "tradeMode")[
                        //     "disabled"
                        //   ] = false;
                        //   this.utools.getFromconfigObj(this.entrustOrderKey, "dealMode")[
                        //     "disabled"
                        //   ] = false;
                        // }
                        // 重新计算
                        if (this.writeback) return
                        if (this.dataTab.tabIsDisabled) return
                        var { data } = await api.editentrustorderData(
                            this.entrustOrder
                        )
                        this.handleOrderExchangeChangeCommodity()
                        break
                    default:
                        break
                }
            }
        },
        TipsClose(rowData, key) {
            this.$confirm('此操作将重新计算费用，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.isCheckRoll = true
                    this.handlerSubPreservation(rowData, key)
                })
                .catch(() => {})
        },
        // 初始化tab 表格
        async handlerTabClick({ name } = tab, event) {
            if (name == 'trusteereceipt') {
                name = 'trusteeReceipt'
            }
            if (name == 'trusteepanyment') {
                name = 'trusteePanyment'
            }
            ColumnData = require('@/domain/entities/commerce/Entrust' +
                this.capitalize(name)).default
            this.dataTab.columnDataTable = require('@/domain/tableconfig/commerce/Entrust' +
                this.capitalize(name)).default
            this.dataTab.queryTableData.entrustOrderNo = this.entrustOrder.entrustOrderNo
            // let con = JSON.parse(JSON.stringify(require("@/domain/formconfig/commerce/Entrust" + this.capitalize(name)).default))
            // console.log(con)
            this.formPopover.formData.formConfig = utools.cloneObj(
                require('@/domain/formconfig/commerce/Entrust' +
                    this.capitalize(name)).default
            )
            api.initSelect(this.formPopover.formData.formConfig)
            if (name == 'trusteeReceipt') {
                name = 'trusteereceipt'
            }
            if (name == 'trusteePanyment') {
                name = 'trusteepanyment'
            }
            this.dataTab.tabActiveName = name
            name == 'custom' && (this.formPopover.itemName = '受托方收款')
            // 报关信息关联初始化
            if (name == 'custom') {
                this.entrustCustom = new ColumnData()
                // 默认讯宇
                this.entrustCustom['businessUnitCode'] = 'GSXX2019072300015'
                this.entrustCustom['businessUnitName'] =
                    '深圳市讯宇供应链管理有限公司'
                // 申报单位
                this.entrustCustom['declarationUnitCode'] = 'GSXX2019072300015'
                this.entrustCustom['declarationUnitName'] =
                    '深圳市讯宇供应链管理有限公司'
                // 收货单位类型
                if (this.head == 'single') {
                    //单抬头
                    this.entrustCustom.receiveUnitType = '1'
                    this.entrustCustom.receiveUnitCode = 'GSXX2019072300015'
                    this.entrustCustom.receiveUnitName =
                        '深圳市讯宇供应链管理有限公司'
                } else if (this.head == 'double') {
                    // 双抬头
                    this.entrustCustom.receiveUnitType = '3'
                    this.entrustCustom.receiveUnitCode = this.entrustOrder.customerCode
                    this.entrustCustom.receiveUnitName = this.entrustOrder.customerName
                }
                this.lockcus()
                if (sessionStorage.getItem('btnType') == 'update') {
                    api.getEntrustcustom(this.entrustOrder.entrustOrderNo).then(
                        res => {
                            if (res && res.data) {
                                this.entrustCustom = res.data
                                this.lockcus()
                            }
                        }
                    )
                }
                return
            }
            this.formPopover.formData.ruleForm = new ColumnData()
            // 切换
            name == 'goods' && (this.formPopover.itemName = '商品信息')
            if (name == 'goods') {
                try {
                    const { data } = await api.getsolutionformula({
                        billNo: this.entrustOrder.solutionNo,
                        pageIndex: '',
                        pageSize: ''
                    })
                    this.utools.setCalcconfigObj(
                        this.formPopover.formData.formConfig,
                        data.list
                    )
                } catch (error) {
                    console.log(error)
                }
                // 统计栏 需要重新计算
                // this.tjval = [...this.commodityStatistics]
            }
            this.dataTab.queryTableData.pageIndex = 1 //页签调到第一页
            this.handleTabPageChange({ pageIndex: '1', pageSize: '10' })
            this.curRowData = {} // 清空当前行数据
        },
        //分页查询子表
        async handleTabPageChange(paper) {
            this.dataTab.queryTableData.pageIndex = paper.pageIndex
            this.dataTab.queryTableData.pageSize = paper.pageSize
            let val = await api.querySearch(
                '/entrust' + this.dataTab.tabActiveName,
                this.dataTab.queryTableData
            )
            const {
                data: { list, count }
            } = val
            this.dataTab.tableData = list
            this.dataTab.count = count
            // this.tj(paper);
            // 统计栏 需要重新计算
            await this.getAllCommodity()
            this.tjval = [this.commodityStatistics]
        },
        //点击查询栏按钮事件
        handleBtnClick: (() => {
            var obj = null
            return function(type, clear) {
                if (clear) {
                    obj = null
                } else {
                    !obj && (obj = this.handleBtnClickObj())
                    obj[type].bind(this)()
                }
            }
        })(),
        handleBtnClickObj() {
            return {
                search: async () => {
                    try {
                        var {
                            data: { count, list }
                        } = await api.querySearch(this.popover.apiKey, {
                            ...this.popover.ruleForm,
                            status: this.tableDialogWhiteList.includes(
                                this.searchTarget
                            )
                                ? '2'
                                : ''
                        })
                        this.popover.count = count
                        this.popover.popoverList = list
                    } catch (e) {
                        console.log(e)
                    }
                    // 清空查询数据
                    this.popover.queryBarObj.map((e, i) => {
                        if (this.popover.ruleForm[e.moduleBind])
                            this.popover.ruleForm[e.moduleBind] = ''
                    })
                }
            }
        },
        // 统计
        async tj(paper) {
            return // 换computed来计算改统计信息!!!!!!!! 2019-9-7 黄裕辉
            this.dataTab.queryTableData.pageIndex = paper.pageIndex
            this.dataTab.queryTableData.pageSize = paper.pageSize
            let val = await api.querySearch(
                '/entrustgoods',
                this.dataTab.queryTableData
            )
            if (!val.data.list.length > 0) {
                return
            }
            // 计算
            let tisj = {
                sellerQuantityCount: val.data.sellerQuantityCount,
                sellerGoodsValueCount: val.data.sellerGoodsValueCount,
                customTotalAmount: val.data.customTaxAmountCount,
                vatTaxAmountCount: val.data.vatTaxAmountCount,
                totalServiceCharge: val.data.serviceFeeCount,
                buyerGoodsValueCount: val.data.buyerGoodsValueCount,
                otherTaxAmountCount: val.data.otherTaxAmountCount,
                priceTaxCount: val.data.priceTaxCount,
                netWeightCount: val.data.netWeightCount,
                grossWeightCount: val.data.grossWeightCount
            }
            // 统计数据加入到主单据中
            this.entrustOrder = { ...this.entrustOrder, ...tisj }
            //卖方销售总货值
            this.entrustOrder.goodsValue = tisj.sellerGoodsValueCount
            // 增值税合计
            this.entrustOrder.vatTotalAmount = tisj.vatTaxAmountCount
            // 服务费总和
            this.entrustOrder.totalServiceCharge = tisj.totalServiceCharge
            // 关税合计
            this.entrustOrder.customTotalAmount = tisj.customTotalAmount
            // 受托方应付货款总额
            this.entrustOrder.trusteePayGoodsAmount = tisj.sellerGoodsValueCount
            // 展示表格
            this.dataTab.tj = []
            this.dataTab.tj.push(tisj)
        },
        //点选分页
        handlePageChange(paper) {
            this.popover.ruleForm.pageIndex = paper.pageIndex
            this.popover.ruleForm.pageSize = paper.pageSize
            this.handleBtnClick('search') //翻页查询
        },
        async beforeSubmitCb() {
            let flog = true
            for (let f = 0; f < this.$refs['formC'].length; f++) {
                this.$refs['formC'][f].$refs['formModel'].validate(valid => {
                    if (!valid) {
                        flog = false
                    }
                })
            }
            if (sessionStorage.getItem('btnType') == 'update') {
                this.$refs['formE'].$refs['formModel'].validate(valid => {
                    if (!valid) {
                        flog = false
                    }
                })
            }
            const list = await this.getAllCommodity()
            if (!list.length) {
                flog = false
                this.$message.warning('请录入商品信息')
            }
            return flog
        },
        //保存主表单
        async handlePreserve() {
            let flog = true
            for (let f = 0; f < this.$refs['formC'].length; f++) {
                this.$refs['formC'][f].$refs['formModel'].validate(valid => {
                    if (!valid) {
                        flog = false
                    }
                })
            }
            if (sessionStorage.getItem('btnType') == 'update') {
                this.$refs['formE'].$refs['formModel'].validate(valid => {
                    if (!valid) {
                        flog = false
                    }
                })
            }
            if (!flog) return
            /* // 处理请求参数 添加底部表单字段 start */
            const {
                    goodsValuecurrency, // 卖方销售总货值币别
                    customTotalAmountcurrency, // 关税合计币别
                    vatTotalAmountcurrency, // 增值税合计币别
                    totalServiceChargecurrency, // 服务费总和币别
                    trusteePayGoodsAmountcurrency, //受托方应付货款总额币别
                    invoiceAmountcurrency, // 应开票金额 币别
                    advanceActualAmountcurrency, // 预计应收总额币别
                    refundCustomerAmountcurrency, // 应退客户货款币别
                    paidGoodsAmountcurrency //已付货款总额币别
                } = this.entrustOrder,
                param = {
                    sellerCurrency: goodsValuecurrency,
                    customCurrency: customTotalAmountcurrency,
                    vatCurrency: vatTotalAmountcurrency,
                    serviceCurrency: totalServiceChargecurrency,
                    trusteeCurrency: trusteePayGoodsAmountcurrency,
                    invoiceCurrency: invoiceAmountcurrency,
                    advanceCurrency: advanceActualAmountcurrency,
                    refundCurrency: refundCustomerAmountcurrency,
                    paidCurrency: paidGoodsAmountcurrency
                }
            /* // 处理请求参数 end */

            if (sessionStorage.getItem('btnType') == 'update') {
                if (this.isVerify()) {
                    this.isLoading = true
                    try {
                        const { data } = await api.editentrustorderData({
                            ...this.entrustOrder,
                            ...param
                        })
                        if (data) {
                            // 提交成功后...
                            this.dataTab.tabActiveName = 'goods'
                            this.dataTab.tabIsDisabled = false
                            this.handlerTabClick({
                                name: this.dataTab.tabActiveName
                            }) //重新初始化tab
                            this.$message.success('操作成功')
                        }
                    } catch (e) {
                        console.log(e)
                    } finally {
                        this.isLoading = false
                    }
                }
            } else {
                if (this.isVerify()) {
                    try {
                        if (
                            this.entrustOrder.hasOwnProperty('status') &&
                            !this.entrustOrder.status
                        )
                            delete this.entrustOrder['status']
                        const { data } = await api.addentrustorderData({
                            ...this.entrustOrder,
                            ...param
                        })
                        // 保存成功后  设置 当前 单据编号
                        this.$set(
                            this.entrustOrder,
                            'entrustOrderNo',
                            data.entrustOrderNo
                        )

                        // 新增成功后 把 单据编号栏位显示处理
                        this.utools.setFormConfig(
                            this.entrustOrderKey[0].list,
                            [{ key: 'entrustOrderNo', isShow: false }]
                        )

                        this.isLoading = false
                        if (data) {
                            this.$set(this.entrustOrder, 'status', '1')

                            // 提交成功后...
                            sessionStorage.setItem('btnType', 'update')
                            this.dataTab.tabActiveName = 'goods'
                            this.dataTab.tabIsDisabled = false
                            this.handlerTabClick({
                                name: this.dataTab.tabActiveName
                            }) //重新初始化tab
                            this.$message.success('保存成功')
                        }
                    } catch (e) {
                        console.log(e)
                        this.$message.error(e.message)
                    } finally {
                        this.isLoading = false
                    }
                }
            }
        },
        // 是否新增修改
        async openTabForm(btnType) {
            if (!this.curRowData.itemCode && btnType != 'create') {
                this.$message.warning('请选择一条数据')
                return
            }
            let curRowData = this.curRowData
            /* if (btnType == "update" && JSON.stringify(curRowData) != "{}") {
  try {
    const { data: searchOneData } = await api.searchOneData(
      "/entrust" + this.dataTab.tabActiveName,
      {
        itemCode: curRowData.itemCode
      }
    );
    this.curRowData = searchOneData;
  } catch (e) {
    console.log(e);
  }
}*/
            // 拿数据
            if (btnType == 'create') {
                this.formPopover.formData.ruleForm = new ColumnData()
                if (this.dataTab.tabActiveName == 'goods') {
                    if (this.entrustOrderType == '1') {
                        this.formPopover.formData.formConfig = utools.cloneObj(
                            require('@/domain/formconfig/commerce/EntrustGoodsImported')
                                .default
                        )
                    } else if (this.entrustOrderType == '2') {
                        this.formPopover.formData.formConfig = utools.cloneObj(
                            require('@/domain/formconfig/commerce/EntrustGoodsExit')
                                .default
                        )
                    } else {
                        this.formPopover.formData.formConfig = utools.cloneObj(
                            require('@/domain/formconfig/commerce/EntrustGoodsOther')
                                .default
                        )
                    }
                    api.initSelect(this.formPopover.formData.formConfig)
                    try {
                        const { data } = await api.getsolutionformula({
                            billNo: this.entrustOrder.solutionNo,
                            pageIndex: '',
                            pageSize: ''
                        })
                        this.utools.setCalcconfigObj(
                            this.formPopover.formData.formConfig,
                            data.list
                        )
                    } catch (error) {
                        console.log(error)
                    }

                    this.formPopover.formData.ruleForm[
                        'sellerCurrency'
                    ] = this.entrustOrder.supplierCurrency // 卖方币别
                    this.formPopover.formData.ruleForm[
                        'buyerCurrency'
                    ] = this.entrustOrder.currency // 买方币别
                    this.formPopover.formData.ruleForm[
                        'serviceExchangeRate'
                    ] = this.entrustOrder.serviceTaxRate //费率%
                    this.formPopover.formData.ruleForm['serviceCurrency'] = '3' // 服务费币别固定本位币人命币
                    if (this.entrustOrderType == '1') {
                        // this.formPopover.formData.ruleForm["vatTaxRate"] = "1"; // 进口增值税税率  默认13%
                        this.formPopover.formData.ruleForm = {
                            ...this.formPopover.formData.ruleForm
                        }
                    }
                    this.gethgtimeExchangerate() //海关汇率
                    this.formPopover.formData.ruleForm['buyerExchangeRate'] = // 货款汇率 = 订单汇率 / 买方汇率
                        (this.orderExchangeRate * 1000000) /
                        (this.entrustOrder.buyerExchangeRate * 1000000)

                    // 获取签订日期 的汇率
                    // await this.getSignTimeExchange();
                }
            } else {
                if (this.dataTab.tabActiveName == 'goods') {
                    if (this.entrustOrderType == '1') {
                        this.formPopover.formData.formConfig = utools.cloneObj(
                            require('@/domain/formconfig/commerce/EntrustGoodsImported')
                                .default
                        )
                    } else if (this.entrustOrderType == '2') {
                        this.formPopover.formData.formConfig = utools.cloneObj(
                            require('@/domain/formconfig/commerce/EntrustGoodsExit')
                                .default
                        )
                    } else {
                        this.formPopover.formData.formConfig = utools.cloneObj(
                            require('@/domain/formconfig/commerce/EntrustGoodsOther')
                                .default
                        )
                    }
                    api.initSelect(this.formPopover.formData.formConfig)
                    try {
                        const { data } = await api.getsolutionformula({
                            billNo: this.entrustOrder.solutionNo,
                            pageIndex: '',
                            pageSize: ''
                        })
                        this.utools.setCalcconfigObj(
                            this.formPopover.formData.formConfig,
                            data.list
                        )
                    } catch (error) {
                        console.log(error)
                    }

                    // 关务需要做归类的动作 ，但是不允许修改其他商品信息的字段
                    this.$nextTick(() => {
                        for (let item of this.formPopover.formData.formConfig) {
                            for (let configItem of item.list) {
                                if (
                                    item.title === '海关商品归类' &&
                                    configItem.key === 'customsGoodsCode' &&
                                    !this.formPopover.formData.ruleForm
                                        .goodsName
                                ) {
                                    configItem.isShow = !this
                                        .isClassifyJurisdiction
                                } else {
                                    ;(configItem.disabled = this.isClassifyJurisdiction),
                                        (configItem.btn = !this
                                            .isClassifyJurisdiction)
                                }
                            }
                        }
                    })
                }
                this.xgspdt = true
                this.formPopover.formData.ruleForm = utools.cloneObj(
                    this.curRowData
                )
                // await this.getSignTimeExchange();
                // this.formPopover.formData.ruleForm["buyerExchangeRate"] = // 货款汇率 = 订单汇率 / 买方汇率
                // ((this.orderExchangeRate * 1000000) / (this.entrustOrder.buyerExchangeRate * 1000000))
            }

            // 往商品信息中 插入 订单汇率, 便于计算
            this.dataTab.tabActiveName === 'goods' &&
                this.$set(
                    this.formPopover.formData.ruleForm,
                    'data_orderExchangeRate',
                    +this.entrustOrder.orderExchangeRate
                )

            // 赋值
            this.formPopover.formData.ruleForm.entrustOrderNo = this.entrustOrder.entrustOrderNo
            //显示空选提示语
            if (btnType != 'create' && JSON.stringify(curRowData) == '{}') {
                this.$message.warning('请选择数据')
            } else if (btnType != 'delete') {
                this.$store.commit('btnType', btnType)
                this.rouseFormPopover()
            }
            // 确认删除
            if (btnType == 'delete' && JSON.stringify(curRowData) != '{}') {
                this.$alert('删除不可恢复，是否确定删除？', '删除', {
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true
                            instance.confirmButtonText = '执行中...'
                            setTimeout(() => {
                                // 删除
                                api.deleteData(
                                    '/entrust' + this.dataTab.tabActiveName,
                                    curRowData.itemCode
                                ).then(res => {
                                    if (res) {
                                        // 提交成功后...
                                        this.handlerTabClick({
                                            name: this.dataTab.tabActiveName
                                        })
                                        this.$message.success('保存成功')
                                        // 刷新统计
                                    }
                                })
                                done()
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false
                                }, 300)
                            }, 1000)
                        } else {
                            done()
                        }
                    }
                })
            }
        },
        // 新增修改子form（商品信息）
        async saveTabForm() {
            let flog = true
            // for (let f = 0; f < this.$refs["formD"].length; f++) {
            //   this.$refs["formD"][f].$refs["formModel"].validate(valid => {
            //     if (!valid) {
            //       flog = false;
            //     }
            //   });
            // }
            if (flog) {
                try {
                    // 验证成功
                    if (this.$store.state.other.btnType == 'create') {
                        const { data: addData } = await api.addData(
                            '/entrust' + this.dataTab.tabActiveName,
                            this.formPopover.formData.ruleForm
                        )
                        if (addData) {
                            // 提交成功后...
                            this.$message.success('保存成功')
                            this.formPopover.isShowPopover = false
                            this.handlerTabClick({
                                name: this.dataTab.tabActiveName
                            })
                        }
                    } else {
                        const { data: editData } = await api.editData(
                            '/entrust' + this.dataTab.tabActiveName,
                            this.formPopover.formData.ruleForm
                        )
                        if (editData) {
                            debugger
                            // 提交成功后...
                            this.$message.success('操作成功')
                            this.handlerTabClick({
                                name: this.dataTab.tabActiveName
                            })
                            this.formPopover.isShowPopover = false
                        }
                    }
                } catch (error) {
                    this.$message.error('保存失败，请重试！')
                    console.log(error)
                }
            }
        },

        // 获取签订日期汇率
        async getSignTimeExchange() {
            return new Promise(async (resolve, reject) => {
                if (!this.entrustOrder.buyerExchangeRate) {
                    let data = this.signDate.slice(0, 10)
                    let currency = this.utools.gecongfig(
                        this.entrustOrderKey,
                        'currency',
                        this.currency
                    )
                    this.entrustOrder.buyerExchangeRate = await this.getexchangeratetodata(
                        data,
                        currency
                    )
                }
                resolve(this.entrustOrder.buyerExchangeRate)
            })
        },

        async saveCostom() {
            if (this.isVerify()) {
                this.entrustCustom.entrustOrderNo = this.entrustOrder.entrustOrderNo
                const { data } = await api.addentrustcustomData(
                    this.entrustCustom
                )
                if (data) {
                    // 提交成功后...
                    this.$message({ type: 'success', message: '保存成功' })
                }
            }
        },
        async rouseFormPopover(key) {
            this.formPopover.isShowPopover = !this.formPopover.isShowPopover
            if (
                this.formPopover.isShowPopover &&
                this.dataTab.tabActiveName == 'goods'
            ) {
                this.lockingcommodity() // 锁定子表
            }
        },

        // 选中当前行
        clickTabRow(row) {
            // 获取修改内容
            this.curRowData = row
            this.$store.commit('curRowData', row)
        },
        lockingUtil(arr) {
            for (let value of arr) {
                for (let item of this.entrustOrderKey) {
                    for (let data of item.list) {
                        if (value.key === data.key) {
                            data = { ...data, ...value }
                        }
                    }
                }
            }
        },
        // 商品信息锁定
        lockingcommodity() {
            // 委托订单类型---控制 各项费
            try {
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'increaseTaxRate'
                )['disabled'] = false //关税加征%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'exciseTaxRate'
                )['disabled'] = false(
                    //消费税率%
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'exciseTaxRate'
                    )
                )['btn'] = true(
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'vatTaxRate'
                    ) || {}
                )['disabled'] = false(
                    //进口增值税率%
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'taxTypeName'
                    ) || {}
                )['disabled'] = false(
                    //其他税种%
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'taxTypeName'
                    ) || {}
                )['btn'] = true(
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'buyerExchangeRate'
                    ) || {}
                )['disabled'] = true(
                    //货款汇率
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'buyerPrice'
                    ) || {}
                )['disabled'] = true(
                    //买方采购单价
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'buyerPrice'
                    ) || {}
                )['type'] = 'calc'(
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'drawbackRate'
                    ) || {}
                )['disabled'] = false //退税率%
            } catch (error) {
                console.log(error)
            }
            // 进口以外  不可录入 无值
            if (
                this.entrustOrderType == '2' ||
                this.entrustOrderType == '3' ||
                this.entrustOrderType == '4'
            ) {
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'increaseTaxRate'
                )['disabled'] = true //关税加征%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'exciseTaxRate'
                )['disabled'] = true //消费税率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'exciseTaxRate'
                )['btn'] = false
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'vatTaxRate'
                )['disabled'] = true //进口增值税率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'taxTypeName'
                )['disabled'] = true //其他税种%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'taxTypeName'
                )['btn'] = false
            }
            if (
                this.entrustOrderType == '1' ||
                this.entrustOrderType == '3' ||
                this.entrustOrderType == '4'
            ) {
                ;(this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'drawbackRate'
                ) || {})['disabled'] = true //退税率%
            }
            if (this.entrustOrderType == '3' || this.entrustOrderType == '4') {
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'buyerExchangeRate'
                )['disabled'] = false //货款汇率
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'buyerPrice'
                )['disabled'] = false //买方采购单价
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'buyerPrice'
                )['type'] = 'money'
            }

            // 成交方式，委托订单类型---控制 运保杂
            try {
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'freightRate'
                )['disabled'] = false //运费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'premiumRate'
                )['disabled'] = false //保费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'extrasRate'
                )['disabled'] = false //杂费费率%
                if (this.dealMode == '1' && this.entrustOrderType == '2') {
                    //FOB && 出口
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'freightRate'
                    )['disabled'] = true //运费费率%
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'premiumRate'
                    )['disabled'] = true //保费费率%
                    this.utools.getFromconfigObj(
                        this.formPopover.formData.formConfig,
                        'extrasRate'
                    )['disabled'] = true //杂费费率%
                }
            } catch (error) {
                console.log(error)
            }
            if (this.dealMode == '2' && this.entrustOrderType == '1') {
                //CIF && 进口
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'freightRate'
                )['disabled'] = true //运费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'premiumRate'
                )['disabled'] = true //保费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'extrasRate'
                )['disabled'] = true //杂费费率%
            }
            if (this.dealMode == '3' && this.entrustOrderType == '1') {
                //C&F && 进口
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'freightRate'
                )['disabled'] = true //运费费率%
            }
            if (this.dealMode == '3' && this.entrustOrderType == '2') {
                //C&F && 出口
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'premiumRate'
                )['disabled'] = true //保费费率%
            }
            if (this.dealMode == '4' && this.entrustOrderType == '1') {
                //C&I && 进口
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'premiumRate'
                )['disabled'] = true //保费费率%
            }
            if (this.dealMode == '4' && this.entrustOrderType == '2') {
                //C&I && 出口
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'freightRate'
                )['disabled'] = true //运费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'premiumRate'
                )['disabled'] = true //保费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'extrasRate'
                )['disabled'] = true //杂费费率%
            }
            if (this.entrustOrderType == '4') {
                //C&I && 出口
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'freightRate'
                )['disabled'] = true //运费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'premiumRate'
                )['disabled'] = true //保费费率%
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'extrasRate'
                )['disabled'] = true //杂费费率%
            }
            try {
                this.$set(this.formPopover.formData, 'formConfig', formConfig)
            } catch (error) {
                console.log(error)
            }
        },
        // 锁定报关信息
        lockcus() {
            // -----进口
            // 收货单位类型
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'receiveUnitType'
            )['disabled'] = true
            // 收货单位
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'receiveUnitName'
            )['disabled'] = true
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'receiveUnitName'
            )['btn'] = false
            // 进口口岸
            // this.utools.getFromconfigObj(
            //   this.formPopover.formData.formConfig,
            //   "importPortName"
            // )["disabled"] = true;
            // 报关卖方类型
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'sellerType'
            )['disabled'] = true
            // 报关合同卖方
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'sellerName'
            )['disabled'] = true
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'sellerName'
            )['btn'] = false
            // ----出口
            // 发货单位类型
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'sendUnitType'
            )['disabled'] = true
            // 发货单位
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'sendUnitName'
            )['disabled'] = true
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'sendUnitName'
            )['btn'] = false
            // FCL/LCF
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'importExportHandoverMode'
            )['disabled'] = true
            // 出口口岸
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'exportPort'
            )['disabled'] = true
            // 报关买方类型
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'customsBuyerType'
            )['disabled'] = true
            // 报关合同买方
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'customsContractBuyerName'
            )['disabled'] = true
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'customsContractBuyerName'
            )['btn'] = false
            // 柜型及数量
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'containerNumber'
            )['disabled'] = true
            // 抵运国
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'arrivalCountryName'
            )['disabled'] = true
            this.utools.getFromconfigObj(
                this.formPopover.formData.formConfig,
                'arrivalCountryName'
            )['btn'] = false
            if (this.entrustOrderType == '1') {
                // ----进口
                // 收货单位类型
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'receiveUnitType'
                )['disabled'] = false
                // 收货单位
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'receiveUnitName'
                )['disabled'] = false
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'receiveUnitName'
                )['btn'] = true
                // 进口口岸
                // this.utools.getFromconfigObj(
                //   this.formPopover.formData.formConfig,
                //   "importPortName"
                // )["disabled"] = false;
                // 报关卖方类型
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'sellerType'
                )['disabled'] = false
                // 报关合同卖方
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'sellerName'
                )['disabled'] = false
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'sellerName'
                )['btn'] = true
                this.entrustCustom['sendUnitType'] = ''
                this.entrustCustom['sendUnit'] = ''
                this.entrustCustom['sendUnitName'] = ''
                this.entrustCustom['importExportHandoverMode'] = ''
                this.entrustCustom['exportPort'] = ''
                this.entrustCustom['customsBuyerType'] = ''
                this.entrustCustom['customsContractBuyer'] = ''
                this.entrustCustom['customsContractBuyerName'] = ''
                this.entrustCustom['containerNumber'] = ''
                this.entrustCustom['arrivalCountry'] = ''
                this.entrustCustom['arrivalCountryName'] = ''
                this.entrustCustom = { ...this.entrustCustom }
            }
            if (this.entrustOrderType == '2') {
                // ----出口
                // 发货单位类型
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'sendUnitType'
                )['disabled'] = false
                // 发货单位
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'sendUnitName'
                )['disabled'] = false
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'sendUnitName'
                )['btn'] = true
                // FCL/LCF
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'importExportHandoverMode'
                )['disabled'] = false
                // 出口口岸
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'exportPort'
                )['disabled'] = false
                // 报关买方类型
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'customsBuyerType'
                )['disabled'] = false
                // 报关合同买方
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'customsContractBuyerName'
                )['disabled'] = false
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'customsContractBuyerName'
                )['btn'] = true
                // 柜型及数量
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'containerNumber'
                )['disabled'] = false
                // 抵运国
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'arrivalCountryName'
                )['disabled'] = false
                this.utools.getFromconfigObj(
                    this.formPopover.formData.formConfig,
                    'arrivalCountryName'
                )['btn'] = true
                this.entrustCustom['receiveUnitType'] = ''
                this.entrustCustom['receiveUnitCode'] = ''
                this.entrustCustom['receiveUnitName'] = ''
                this.entrustCustom['importPortName'] = ''
                this.entrustCustom['sellerType'] = ''
                this.entrustCustom['sellerCode'] = ''
                this.entrustCustom['sellerName'] = ''
                this.entrustCustom = { ...this.entrustCustom }
            }
        },
        //  规格型号 带出
        onArrivalGoodsModel(rowData) {
            if (this.xgspdt) {
                return (this.xgspdt = false)
            }
            // this.formPopover.formData.ruleForm["arrivalGoodsModel"] = rowData["specificationType"]; //来货规格型号
            this.formPopover.formData.ruleForm['orderModel'] =
                rowData['materielCode'] //来货编码
            this.formPopover.formData.ruleForm['arrivalGoodsName'] =
                rowData['tradeName'] //来货名称
            this.formPopover.formData.ruleForm['goodsCode'] =
                rowData['materielCode'] //商品编码
            this.formPopover.formData.ruleForm['goodsName'] =
                rowData['customsAbbreviation'] //商品名称
            this.formPopover.formData.ruleForm['sellerUnit'] =
                rowData['measurementUnit'] //成交单位编码
            this.formPopover.formData.ruleForm['sellerUnitName'] =
                rowData['measurementUnitName'] //成交单位
            this.formPopover.formData.ruleForm['arrivalGoodsCode'] =
                rowData['materielCode']
            this.formPopover.formData.ruleForm['taxNo'] = rowData['taxNo'] // 税号
            this.formPopover.formData.ruleForm['attachNo'] = rowData['attachNo'] // 附号
            this.formPopover.formData.ruleForm['customTaxRate'] =
                rowData['customsRate'] // 关税税率
            this.formPopover.formData.ruleForm['increaseTaxRate'] =
                rowData['levyRate'] // 关税加征
            this.formPopover.formData.ruleForm['superviseMode'] =
                rowData['superCondition'] // 监管条件
            this.formPopover.formData.ruleForm['superviseModeName'] =
                rowData['superConditionName'] //监管条件
            this.formPopover.formData.ruleForm['vatTaxRate'] =
                rowData['valueAddRate'] //进口增值税率
            this.formPopover.formData.ruleForm = {
                ...this.formPopover.formData.ruleForm
            }
        },
        // 规格型号 清空
        toArrivalGoodsModel() {
            if (this.tanstionStatus > 1) return
            // this.formPopover.formData.ruleForm["arrivalGoodsModel"] = ''; //来货规格型号
            this.formPopover.formData.ruleForm['orderModel'] = '' //来货编码
            this.formPopover.formData.ruleForm['arrivalGoodsName'] = '' //来货名称
            this.formPopover.formData.ruleForm['goodsCode'] = '' //商品编码
            this.formPopover.formData.ruleForm['goodsName'] = '' //商品名称
            this.formPopover.formData.ruleForm['sellerUnit'] = '' //成交单位编码
            this.formPopover.formData.ruleForm['sellerUnitName'] = '' //成交单位
            this.formPopover.formData.ruleForm['arrivalGoodsCode'] = ''
            this.formPopover.formData.ruleForm['taxNo'] = '' // 税号
            this.formPopover.formData.ruleForm['attachNo'] = '' // 附号
            this.formPopover.formData.ruleForm['customTaxRate'] = '' // 关税税率
            this.formPopover.formData.ruleForm['increaseTaxRate'] = '' // 关税加征
            this.formPopover.formData.ruleForm['superviseMode'] = '' // 监管条件
            this.formPopover.formData.ruleForm['superviseModeName'] = '' //监管条件
            this.formPopover.formData.ruleForm['vatTaxRate'] = '' //进口增值税率
            this.formPopover.formData.ruleForm = {
                ...this.formPopover.formData.ruleForm
            }
        },
        // 回调验证规则
        handlerFormVerify($refs) {
            this.verify = $refs
        },
        // 验证规则
        isVerify() {
            let isVerify = true
            return isVerify
        },
        handlebackspacing() {
            this.$router.push('M0402')
        },
        // 第一个字母转大写
        capitalize([first, ...rest]) {
            return first.toUpperCase() + rest.join('')
        },
        // 给定日期 查询汇率
        async getexchangeratetodata(data, currency) {
            if (currency == '人民币') {
                return '1.0000'
            }
            try {
                const vdata = await api.gettimeExchangerate(data)
                var list = vdata.data
                for (let i = 0; i < list.length; i++) {
                    var exchangerate = ''
                    list.forEach(b => {
                        if (currency == b.currency) {
                            exchangerate = b.cenPrice
                        }
                    })
                    return exchangerate
                }
                this.$message.warning('请录入系统汇率')
            } catch (e) {
                console.log(e)
            }
        },
        // 查询商品的海关汇率
        async gethgtimeExchangerate() {
            let data = this.signDate.slice(0, 7)
            let currency = this.utools.gecongfig(
                this.entrustOrderKey,
                'supplierCurrency',
                this.supplierCurrency
            )
            try {
                const vdata = await api.gethgtimeExchangerate(data)
                var list = vdata.data
                for (let i = 0; i < list.length; i++) {
                    var exchangerate = ''
                    list.forEach(b => {
                        if (currency == b.currency) {
                            exchangerate = b.cenPrice
                        }
                    })
                    return (this.formPopover.formData.ruleForm[
                        'customsExchangeRate'
                    ] = exchangerate) // 海关汇率
                }
                this.$message.warning('请录入系统汇率')
            } catch (e) {
                console.log(e)
            }
        },

        // 订单汇率改变时 所有商品信息 都要进行从新计算，并且保存 该单据时批量保存 商品信息
        async handleOrderExchangeChangeCommodity(exchange) {
            this.calculateLoading = true
            try {
                // if (this.dataTab.tabActiveName === 'goods') {
                if (true) {
                    // 如果当前 页签 是商品信息才参与的运算逻辑;
                    {
                        // 商品信息需要重新计算
                        const list = await this.getAllCommodity()
                        var newTableData = []
                        for await (let item of list) {
                            this.curRowData = this.utools.cloneObj(item)
                            await this.openTabForm('update')
                            newTableData.push(
                                this.formPopover.formData.ruleForm
                            )
                        }
                        this.allNewCommodityList = newTableData
                        // 计算
                        this.dataTab.tableData = newTableData.slice(0, 10)
                        this.formPopover.isShowPopover = false
                        console.log('重新计算所有的商品费用')
                    }
                    {
                        const {
                            status
                        } = await api.queryEntrustOrdergoodreplace(
                            this.entrustOrder.entrustOrderNo,
                            this.allNewCommodityList
                        )
                        if (status == '200') {
                            // 计算成功
                            this.handlerTabClick({
                                name: this.dataTab.tabActiveName
                            }) //重新初始化tab
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => {
                    this.calculateLoading = false
                }, 500)
            }
        },
        async getAllCommodity() {
            try {
                const {
                    data: { list = [] }
                } = await api.getEntrustGoods({
                    entrustOrderNo: this.entrustOrder.entrustOrderNo,
                    pageIndex: 1,
                    pageSize: ''
                })
                this.allNewCommodityList = list
                return list
            } catch (error) {
                console.log(error)
            }
        },

        // 导出委托订单
        async handleExport() {
            try {
                // 接口配置
                const port = new Map([
                    ['entrustOrder', 'exportEntrustOrder'],
                    ['paymentNotification', 'exportPaymentNotification']
                ]).get(this.downFileDialog.data.type)

                if (port === undefined)
                    return this.$message.warning('请选择需导出的类型')
                const { data, headers } = await api[port](
                    this.entrustOrder.entrustOrderNo
                )
                function downloadFile(data) {
                    var a = document.createElement('a')
                    data = new Blob([data], { type: headers['content-type'] })
                    var href = window.URL.createObjectURL(data)
                    a.href = href
                    const finame = (() => {
                        const disposition = headers['content-disposition']
                        let i = disposition.indexOf('=')
                        return disposition.slice(i + 1)
                    })()
                    a.download = decodeURI(finame)
                    a.click()
                    this.downFileDialog.visible = false
                    window.URL.revokeObjectURL(href)
                }
                downloadFile.call(this, data)
            } catch (error) {
                this.$message.error(`导出失败，请重试！`)
                console.log(error)
            }
        },

        //  计算子表
        async getjszb() {
            const list = await this.getAllCommodity()
            var newTableData = []
            for await (let item of list) {
                var row = item
                console.log(row)
                this.utools.resCalcConfig(
                    row,
                    this.formPopover.formData.formConfig,
                    this.entrustOrder
                )
                newTableData.push(row)
            }
            this.allNewCommodityList = newTableData
        }
    },
    async created() {
        this.writeback = true
        api.initSelect(this.entrustOrderKey)
        api.initSelect(this.entrustOrderKey7)
        // 业务类型下拉
        api.getEnum('businessTypeG').then(result => {
            this.sellist = result.data
            let sel = []
            if (this.entrustOrderType == '1') {
                sel.push(this.sellist[0])
                sel.push(this.sellist[1])
            }
            if (this.entrustOrderType == '2') {
                sel.push(this.sellist[2])
                sel.push(this.sellist[3])
            }
            if (this.entrustOrderType == '3') {
                sel.push(this.sellist[1])
            }
            if (this.entrustOrderType == '4') {
                sel.push(this.sellist[4])
                sel.push(this.sellist[5])
            }
            this.utools.setFromconfigOption(
                this.entrustOrderKey,
                'bizType',
                sel
            )
        })
        const { formData = {} } = this.getActivePathData(this.$route.path) || {}
        if (formData) {
            Object.assign(this.entrustOrder, formData)
        }
        const is_Create = sessionStorage.getItem('btnType') === 'create'

        // 设置下拉币种
        const setCurrencySelect = () => {
            this.$set(this.entrustOrder, 'vatTotalAmountcurrency', '3')
            this.$set(this.entrustOrder, 'totalServiceChargecurrency', '3')
            this.$set(this.entrustOrder, 'customTotalAmountcurrency', '3')
            this.$set(this.entrustOrder, 'trusteePayGoodsAmountcurrency', '3')
            this.$set(this.entrustOrder, 'invoiceAmountcurrency', '3')
            this.$set(this.entrustOrder, 'advanceActualAmountcurrency', '3')
        }
        setCurrencySelect() // 2019-9-6 修改 黄裕辉
        if (is_Create) {
            // 默认
            // setCurrencySelect()

            // 默认讯宇
            this.entrustOrder.trusteeCode = 'GSXX2019072300015'
            this.entrustOrder.trusteeName = '深圳市讯宇供应链管理有限公司'

            // 采购组织默认操作人 修改于 2019-9-6 黄裕辉
            const data = {
                departmentCode: this.userInfo.department,
                purchaseUnitCode: this.userInfo.department,
                purchaseUnitName: this.userInfo.departmentName
            }
            for (let key in data) {
                if (data.hasOwnProperty(key))
                    this.$set(this.entrustOrder, key, data[key])
            }
            /* if (localStorage.userCode) {
  try {
    let { data } = await api.querySearch("/user", {
      userCode: localStorage.userCode
    });
    if (data.list.length > 0) {
      this.entrustOrder.departmentCode = data.list[0].department;
      this.entrustOrder.purchaseUnitCode = data.list[0].department;
      this.entrustOrder.purchaseUnitName = data.list[0].departmentName;
    }
  } catch (e) {
    console.log(e);
  }
} */

            // 签订日期
            this.entrustOrder.signDate =
                new Date().toJSON().slice(0, 10) + ' 00:00:00'
        } else {
            this.dataTab.tabIsDisabled = false
            this.dataTab.tabActiveName = 'goods' // 默认
            this.handlerTabClick({ name: 'goods' }) //初始化tab
        }
        // 如果是 新增 进来的话 隐藏 单据编号栏位
        this.utools.setFormConfig(this.entrustOrderKey[0].list, [
            { key: 'entrustOrderNo', isShow: is_Create }
        ])

        this.$nextTick(function() {
            this.writeback = false
        })
    },
    watch: {
        // 委托订单类型
        entrustOrderType: {
            handler(newVal, oldVal) {
                // 业务类型下拉
                if (newVal && this.sellist.length > 0) {
                    var sel = []
                    if (this.entrustOrderType == '1') {
                        sel.push(this.sellist[0])
                        sel.push(this.sellist[1])
                    }
                    if (this.entrustOrderType == '2') {
                        sel.push(this.sellist[2])
                        sel.push(this.sellist[3])
                    }
                    if (this.entrustOrderType == '3') {
                        sel.push(this.sellist[1])
                    }
                    if (this.entrustOrderType == '4') {
                        sel.push(this.sellist[4])
                        sel.push(this.sellist[5])
                    }
                    if (this.entrustOrderType == '5') {
                        sel.push(this.sellist[4])
                        sel.push(this.sellist[5])
                    }
                    this.utools.setFromconfigOption(
                        this.entrustOrderKey,
                        'bizType',
                        sel
                    )
                }
                // 报关数据
                if (newVal && this.dataTab.tabActiveName == 'custom') {
                    this.lockcus()
                }
            },
            deep: true
        },
        // 销售币别
        supplierCurrency: {
            async handler(newVal, oldVal) {
                if (newVal) {
                    this.$set(this.entrustOrder, 'goodsValuecurrency', newVal)
                    this.$set(
                        this.entrustOrder,
                        'refundCustomerAmountcurrency',
                        newVal
                    )
                    this.$set(
                        this.entrustOrder,
                        'paidGoodsAmountcurrency',
                        newVal
                    )
                    this.$set(
                        this.entrustOrder,
                        'trusteePayGoodsAmountcurrency',
                        newVal
                    )
                    if (this.writeback) return
                    // if(!(newVal && oldVal && newVal != oldVal)) return
                    // 订单汇率 = 卖方汇率
                    if (!this.signDate) return
                    let data = this.signDate.slice(0, 10)
                    let currency = this.utools.gecongfig(
                        this.entrustOrderKey,
                        'supplierCurrency',
                        this.supplierCurrency
                    )
                    this.entrustOrder.orderExchangeRate = await this.getexchangeratetodata(
                        data,
                        currency
                    )
                } else {
                    this.entrustOrder.goodsValuecurrency = ''
                    this.entrustOrder.refundCustomerAmountcurrency = ''
                    this.entrustOrder.paidGoodsAmountcurrency = ''
                    this.entrustOrder.trusteePayGoodsAmountcurrency = ''
                    // this.entrustOrder.orderExchangeRate = "";
                }
            },
            deep: true
        },
        currency: {
            async handler(newVal, oldVal) {
                if (newVal) {
                    if (this.writeback) return
                    // if(!(newVal && oldVal && newVal != oldVal)) return
                    // 买方汇率
                    if (this.signDate) {
                        let data = this.signDate.slice(0, 10)
                        let currency = this.utools.gecongfig(
                            this.entrustOrderKey,
                            'currency',
                            this.currency
                        )
                        this.entrustOrder.buyerExchangeRate = await this.getexchangeratetodata(
                            data,
                            currency
                        )
                    }
                }
            },
            deep: true
        },
        signDate: {
            async handler(newVal, oldVal) {
                if (newVal) {
                    if (this.writeback) return
                    // if(!(newVal && oldVal && newVal != oldVal)) return
                    // 买方汇率
                    if (this.entrustOrder.currency) {
                        let data1 = this.signDate.slice(0, 10)
                        let currency1 = this.utools.gecongfig(
                            this.entrustOrderKey,
                            'currency',
                            this.currency
                        )
                        this.entrustOrder.buyerExchangeRate = await this.getexchangeratetodata(
                            data1,
                            currency1
                        )
                    }
                    // 订单汇率 = 卖方汇率
                    if (this.entrustOrder.supplierCurrency) {
                        let data = this.signDate.slice(0, 10)
                        let currency = this.utools.gecongfig(
                            this.entrustOrderKey,
                            'supplierCurrency',
                            this.supplierCurrency
                        )
                        this.entrustOrder.orderExchangeRate = await this.getexchangeratetodata(
                            data,
                            currency
                        )
                    }
                }
            },
            deep: true
        },
        'formPopover.formData.ruleForm': {
            handler(newVal, oldVal) {
                if (this.dataTab.tabActiveName == 'goods') {
                    this.utools.resCalcConfig(
                        this.formPopover.formData.ruleForm,
                        this.formPopover.formData.formConfig,
                        this.entrustOrder
                    )
                }
            },
            deep: true
        },
        invoiceAmount: {
            handler(newVal, oldVal) {
                // console.log(newVal)
                this.$set(this.entrustOrder, 'invoiceAmount', newVal.toFixed(2))
            },
            deep: true
        },
        advanceAmount: {
            handler(newVal, oldVal) {
                this.$set(this.entrustOrder, 'advanceAmount', newVal.toFixed(2))
            },
            deep: true
        },
        minimumCharge: {
            handler(newVal, oldVal) {
                this.$set(this.entrustOrder, 'minimumCharge', newVal)
            },
            deep: true
        },
        //受托方应付货款总额
        'entrustOrder.matPayment': {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.$set(
                        this.entrustOrder,
                        'trusteePayGoodsAmount',
                        this.entrustOrder.goodsValue
                    )
                } else {
                    this.$set(this.entrustOrder, 'trusteePayGoodsAmount', '')
                }
            },
            deep: true
        },
        'formPopover.formData.ruleForm.arrivalGoodsModel': {
            async handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    if (newVal) {
                        // 录入
                        try {
                            const { data } = await api.getList('materielbase', {
                                specificationType: newVal,
                                pageIndex: '',
                                pageSize: ''
                            })
                            if (data.list.length > 0) {
                                // 录入
                                this.onArrivalGoodsModel(data.list[0])
                                // this.onbrandNameorder()
                            } else {
                                // 清除
                                this.toArrivalGoodsModel()
                                // this.tobrandNameorder()
                            }
                        } catch (e) {
                            console.log(e)
                        }
                    } else {
                        // 清除
                        this.toArrivalGoodsModel()
                        // this.tobrandNameorder()
                    }
                }
            },
            deep: true
        },
        // 订单汇率变化 逻辑
        // 'entrustOrder.orderExchangeRate' (newVal, oldVal) {
        // if(val){
        //   this.getjszb()
        // }
        // if (!oldVal) {
        //   // 页面初始化时需要获取所有商品信息的进行统计的计算
        //   if (this.dataTab.tabActiveName == 'goods') this.getAllCommodity();
        //   return;
        // }
        // if(!(newVal && oldVal && newVal != oldVal)) return
        // if(this.writeback) return
        // this.handleOrderExchangeChangeCommodity(newVal)
        // },
        orderExchangeRate(newVal, oldVal) {
            if (this.writeback) return
            if (!(newVal && oldVal && newVal != oldVal)) return
            if (this.dataTab.tabIsDisabled) return
            this.handleOrderExchangeChangeCommodity(newVal)
        },
        zbbuyerExchangeRate(newVal, oldVal) {
            if (this.writeback) return
            if (!(newVal && oldVal && newVal != oldVal)) return
            if (this.dataTab.tabIsDisabled) return
            this.handleOrderExchangeChangeCommodity(newVal)
        },
        // 弹窗取消显示时清空分页数据
        'popover.isShowPopover'(val) {
            if (!val) {
                ;(this.popover.ruleForm.pageIndex = 1),
                    (this.popover.ruleForm.pageSize = 10)
            }
        }
    },
    beforeRouteLeave(to, form, next) {
        this.addbreadCrumbsList({
            // title: "/委托订单信息",
            data: {
                formData: this.entrustOrder,
                status:
                    sessionStorage.getItem('btnType') == 'update'
                        ? 'update'
                        : 'create'
            },
            path: this.$route.path
        })
        next()
    }
}
</script>
<style lang="less">
.EntrustOrderForm {
    .entrustOrderNametitle {
        display: inline-block;
        width: 100%;
        text-align: center;
        line-height: 32px;
    }
    .btn-right {
        text-align: right;
        margin: 25px 0 0 0;
        & > button {
            margin-left: 30px !important;
        }
    }
    .tabs-defined {
        > :first-child {
            > div > div > div {
                > :first-child::before,
                :nth-child(2)::before {
                    content: '*';
                    color: red;
                }
            }
        }
    }
    .diawtd {
        max-height: 70vh;
        overflow: auto;
    }
}
</style>