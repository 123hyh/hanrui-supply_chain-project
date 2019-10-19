<template>
  <div>
    <!-- 操作按钮 -->
    <preserve-btn
      :form='ruleForm'
      @handlePreserve="saveForm"
      @handleRollback="goBack"
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- 表单 -->
    <form-pop
      :formConfig="formConfig"
      :ruleForm="ruleForm"
    ></form-pop>
    <!-- tab栏 -->
    <el-tabs type="card">
      <!-- 商品信息 -->
      <el-tab-pane
        label="商品信息"
        :disabled="this.jumpType=='create'"
      >
        <tab-goods
          v-if="!(this.jumpType=='create')"
          :form='ruleForm'
          :enterFromBtn="enterFromBtn"
          :trusteeCodeNumber="trusteeCodeNumber"
          :salesOrderCodeNumber="salesOrderCodeNumber"
          @savePackageSuccess="requestPackageTable"
        ></tab-goods>
      </el-tab-pane>
      <!-- 装箱单 -->
      <el-tab-pane
        label="装箱单"
        :disabled="this.jumpType=='create'"
      >
        <tab-package
          ref="tabPackage"
          v-if="!(this.jumpType=='create')"
          :salesOrderCodeNumber="salesOrderCodeNumber"
          :form='ruleForm'
        ></tab-package>
      </el-tab-pane>
      <!-- 计费项目 -->
      <el-tab-pane
        label="计费项目"
        :disabled="this.jumpType=='create'"
      >
        <tab-fee
          ref="tabFee"
          v-if="!(this.jumpType=='create')"
          :salesOrderCodeNumber="salesOrderCodeNumber"
          :form='ruleForm'
        ></tab-fee>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//组件
import FormPop from "@/components/common/FormWithPop.vue";
import TabGoods from "./SalesOrderTabGoods.vue";
import TabPackage from "./SalesOrderTabPackage.vue";
import TabFee from "./SalesOrderTabFee.vue";
//表单配置
import formConfig from "@/domain/formconfig/commerce/SalesOrder";
import formBind from "@/domain/entities/commerce/SalesOrder";
//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";
import { debuglog } from 'util';

export default {
  components: { FormPop, TabGoods, TabPackage, TabFee },
  data () {
    return {
      isLoading: false, //保存按钮loading状态
      formConfig, //表单配置
      ruleForm: new formBind(), //表单值
      jumpType: '',
      enterFromBtn: false
    };
  },
  computed: {
    //委托单号
    trusteeCodeNumber: function () {
      return this.ruleForm.trusteeCode;
    },
    //单据编号
    salesOrderCodeNumber: function () {
      return this.ruleForm.salesOrderCode;
    },
  },
  methods: {
    //保存表单
    async saveForm () {
      if (this.isVerify()) {
        try {
          if (this.jumpType == "create") {
            const { data } = await api.saveSalesOrderForm(
              this.ruleForm
            );
            this.ruleForm = { ...this.ruleForm, status: data.status || '1' }
            this.$message.success("保存成功");
            utools.setSession("salesOrderForm", {
              jumpType: "update", enterFromBtn: true
            });
            utools.setSession("salesOrderbillNo", {
              billNo: this.ruleForm.salesOrderCode
            });
            this.initData();
          } else if (this.jumpType == "update") {
            const { data } = await api.editSalesOrder(
              this.ruleForm
            );
            this.$message.success("修改成功");
            this.initData();
          }
        } catch (error) {
          this.$message({ type: 'error', message: '保存失败，请重试！' })
          console.log(error);
        }
      } else {
        this.$message.error("公司、客户、委托方不能为空");
      }
    },
    //表单验证
    isVerify () {
      debugger
      return (
        this.ruleForm.company &&
        this.ruleForm.customer &&
        this.ruleForm.entrust
      );
    },
    //返回列表页
    goBack: function () {
      this.$router.push("M0403");
    },
    //页面初始化
    initData: function () {
      const pageState = utools.getSession("salesOrderForm")
      if (pageState.enterFromBtn) {
        this.jumpType = pageState.jumpType
        if (this.jumpType == "create") {
          this.getInitBillNo();
        } else if (this.jumpType == "update") {
          this.initFormData()
        }
      } else {
        for (const key in pageState) {
          this[key] = pageState[key]
        }
      }
    },
    //新增时：初始化获取单据编号
    async getInitBillNo () {
      const { data } = await api.getSalesOrderNo();
      this.ruleForm.salesOrderCode = data;
    },
    //修改时：初始化表单数据，请求装箱单，计费项目
    async initFormData () {
      const id = utools.getSession("salesOrderbillNo").billNo;
      try {
        const { data } = await api.getSalesOrderOneData(id);
        this.ruleForm = data;
        this.$nextTick(() => {
          this.requestPackageTable();
          this.requestFeeTable();
        })
      } catch (error) {
        console.log(error);
      }
    },
    //请求装箱单表格
    requestPackageTable: function () {
      this.$refs.tabPackage.requestTable();
    },
    //请求计费项目表格
    requestFeeTable: function () {
      this.$refs.tabFee.requestTable();
    },
    //整理要存储的数据
    formatSaveDatas: function (datas) {
      let datasObj = {}
      for (let i = 0; i < datas.length; i++) {
        datasObj[datas[i]] = this[datas[i]]
      }
      return datasObj
    },
  },
  created () {
    this.initData();
  },
  beforeDestroy () {
    var datas = ['ruleForm', 'jumpType']
    const dataObj = this.formatSaveDatas(datas)
    dataObj.enterFromBtn = false
    utools.setSession("salesOrderForm", dataObj);
  },
};
</script>

<style lang='less' scoped>
</style>