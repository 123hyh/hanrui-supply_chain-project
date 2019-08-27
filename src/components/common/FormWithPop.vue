<template>
    <div>
        <!-- 弹窗 -->
        <popover
            :width="popover.width"
            :isShowPopover="popover.isShowPopover"
            :popoverType="popover.popoverType"
            :currencySelectInputKey="popover.currencySelectInputKey"
            :formConfig="popover.formConfig"
            :popoverListKey="popover.popoverListKey"
            :popoverList="popover.popoverList"
            :ruleForm="popover.ruleForm"
            :count="popover.count"
            :btnObj="popover.btnObj"
            :itemName="popover.itemName"
            @handleBtnClickType="handleBtnClick"
            @handlerSubPreservation="handlerSubPreservation"
            @changeisShowPopover="changeisShowPopover"
            @handlePageChange="handlePageChange"
        ></popover>
        <!-- 表单 -->
        <div>
            <div v-for="block in formConfig" :key="block.title">
                <form-module-head v-if="formConfig.length>1" :title="block.title"></form-module-head>
                <form-component
                    :formModel="ruleForm"
                    :inputKey="block.list"
                    @handlerFormConfigClickSearch="rousePopover"
                    @selectChange="selectChange"
                ></form-component>
            </div>
        </div>
    </div>
</template>

<script>
//组件
import Popover from "@/components/common/Popover.vue";
import FormComponent from "@/components/common/FormConfig.vue";
import formModuleHead from "@/components/common/FormModuleHead.vue";

//公用方法
import api from "@/assets/js/appHelper";

export default {
    components: { FormComponent, formModuleHead, Popover },
    props: {
        formConfig: Array,
        ruleForm: Object
    },
    data() {
        return {
            typeUrls:[//承担方类型选中不同值，承担对象对应不同的api
                {
                    key:"1",
                    text:"公司",
                    api:"getCreditCompanyNameData",
                    nameFrom:"companyName",
                    codeFrom:"companyCode"
                },
                {
                    key:"2",
                    text:"委托方",
                    api:"queryclientSearch",
                    nameFrom:"clientName",
                    codeFrom:"clientNo"
                },
                {
                    key:"3",
                    text:"客户",
                    api:"getCustomerList",
                    nameFrom:"customerName",
                    codeFrom:"customerNo"
                },
                {
                    key:"4",
                    text:"供应商",
                    api:"querysupplierbaseSearch",
                    nameFrom:"supplierName",
                    codeFrom:"supplierCode"
                },
                {
                    key:"5",
                    text:"业务员",
                    api:"getEmployeeInfo",
                    nameFrom:"employeeInfoName",
                    codeFrom:"employeeInfoCode"
                },
                {
                    key:"6",
                    text:"其它",
                    api:"",
                    nameFrom:"",
                    codeFrom:""
                },
                {
                    key:"7",
                    text:"退款客户",
                    api:"getCustomerList",
                    nameFrom:"customerName",
                    codeFrom:"customerNo"
                },
            ],
            popover: {
                //弹出框组件参数
                isShowPopover: false, // 弹窗显示
                width: "50%", // 弹窗宽度
                popoverType: "table", // 弹出框类型
                itemName: "", // 弹窗标题
                formConfig: [], // 弹出框查询栏
                btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
                ruleForm: {}, // 查询栏的model绑定
                popoverListKey: [], // 弹出框表头绑定的 key
                popoverList: [], // 表格数据
                currencySelectInputKey: "", //弹出框选中对应的key值
                count: 0, // 分页数据总条数
                element: {} //查询元素的整个对象
            }
        };
    },
    computed:{
        tableConfigBind: _ => ({
            querycarrierbaseSearch: _ => require('@/domain/tableconfig/basicdata/CarrierBase.js').default,
            queryentrustorderSearch: _ => require('@/domain/tableconfig/commerce/EntrustOrder.js').default,
            getCreditCompanyNameData: _ => require('@/domain/tableconfig/basicdata/CompanyInfo.js').default,
            getCityList: _ => require('@/domain/tableconfig/other/CityList.js').default,
            getTimeLimitData: _ => require('@/domain/tableconfig/basicdata/TransportTime.js').default,
            getCustomerContact: _ => require('@/domain/tableconfig/basicdata/CustomerContact.js').default,
            getDispatchLineData: _ => require('@/domain/tableconfig/basicdata/ShippingRoute.js').default,
            getAreaData: _ => require('@/domain/tableconfig/basicdata/DeliveryArea.js').default,
            getCreditCompanyNameData: _ => require('@/domain/tableconfig/basicdata/CompanyInfo.js').default,
            queryclientSearch: _ => require('@/domain/tableconfig/business/Client.js').default,
            getCustomerList: _ => require('@/domain/tableconfig/basicdata/Customer.js').default,
            querysupplierbaseSearch: _ => require('@/domain/tableconfig/basicdata/SupplierBase.js').default,
            getEmployeeInfo: _ => require('@/domain/tableconfig/basicdata/EmployeeInfo.js').default,
            getCarModelList: _ => require('@/domain/tableconfig/basicdata/CarType.js').default,
            getFinanceProject: _ => require('@/domain/tableconfig/basicdata/FinanceProject.js').default,
        }),
    },
    methods: {
        //表单中，承担方类型下拉框，与承担方对象搜索弹窗联动
        selectChange:function(value,element){
            const relation = {
                "underPartyType":"underPartyName",
                "premiumPartyType":"premiumPartyName"
            }
            if(element.key=="underPartyType"||element.key=="premiumPartyType"){
                let one = this.formConfig[2].list.find(item=>item.key==relation[element.key])
                const typeApi = this.typeUrls.find(item=>item.key==value)
                one.api = typeApi.api
                one.tableConfig[0].key = typeApi.nameFrom
                one.tableConfig[1].key = typeApi.codeFrom
                //其它时，可输入
                value=="6"?one.disabled = false:one.disabled = true
                //切换类型时，清除对象值
                if(element.key=="underPartyType"){
                    this.ruleForm["underPartyName"]=""
                    this.ruleForm["underParty"]=""
                }
                if(element.key=="premiumPartyType"){
                    this.ruleForm["premiumPartyName"]=""
                    this.ruleForm["premiumParty"]=""
                }
            }
        },
        //点击输入框的搜索图标，弹出弹窗
        async rousePopover(key, obj) {
            if (!obj.api) return;
            this.popover.element = obj;
            this.popover.ruleForm = {
                [key]: ""
            };
            this.requestTable().then(val => {
                this.popover = Object.assign({}, this.popover, {
                    currencySelectInputKey: key,
                    formConfig: [
                        { label: obj.name, moduleBind: key, isInput: true }
                    ],
                    popoverListKey: this.tableConfigBind[obj.api](),
                    popoverList: val.list,
                    count: val.count,
                    isShowPopover: true
                });
            });
        },
        //请求弹窗中表格数据
        async requestTable() {
            const obj = this.popover.element;
            const { data } = await api[obj.api](this.popover.ruleForm);
            console.log(data,"初始数据---")
            return data
        },
        //弹窗中，点击查询
        handleBtnClick: function() {
            this.requestTable().then(val => {
                this.popover = Object.assign({}, this.popover, {
                    popoverList: val.list,
                    count: val.count
                });
            });
        },
        //弹窗中，点击页码查询
        handlePageChange: function(paper) {
            this.popover.ruleForm.pageIndex = paper.pageIndex;
            this.popover.ruleForm.pageSize = paper.pageSize;
            this.handleBtnClick();
        },
        //弹窗中，点击保存
        handlerSubPreservation: function(data, key) {
            this.popover.element.tableConfig.forEach(item=>{
                if(item.value){
                    this.ruleForm[item.value]=data[item.key]
                }
            })
            console.log(this.ruleForm,"this.ruleForm")
        },
        //关闭弹窗
        changeisShowPopover: function() {
            this.$set(this.popover, "isShowPopover", false);
        },
    },
    created(){
        api.initSelect(this.formConfig);
    }
};
</script>

<style lang='less' scoped>
</style>