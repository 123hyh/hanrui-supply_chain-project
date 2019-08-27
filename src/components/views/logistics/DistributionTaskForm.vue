<template>
  <div class="AddCreditBox">
    <!-- 保存 返回 按钮 -->
    <div class="btnBottom">
      <el-button type="primary" @click.stop="handlePreserve">保存</el-button>
      <el-button type="primary" @click.stop="handleSubmit">返回</el-button>
    </div>
    <!-- 弹出框 -->
    <component
      :ruleForm="queryPopForm"
      :formConfig="searchFormConfig"
      :btnObj="btnObj"
      @handleBtnClickType="handleBtnClick"
      :itemName="itemName"
      :is="showComponent"
      :isShowPopover="isShowPopover"
      @changeisShowPopover="rousePopover"
      @handlerSubPreservation="handlerSubPreservation"
      :popoverList="popoverList"
      :currencySelectInputKey="currencySelectInputKey"
      :popoverListKey="popoverListKey"
      :isPopoverSelection="isPopoverSelection"
      @handlePageChange="handlePageChange"
      :count="queryPopForm.total"
    ></component>
    <!-- 输入框 -->
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        label-position="right"
        :inline-message="true"
        class="form-layout"
      >
        <el-form-item
          v-for="(elem,index) of inputTable"
          :key="index"
          :label="elem.name"
          :prop="elem.prop"
        >
          <!-- 输入字符串类型 -->
          <el-input
            v-if="elem.text && !elem.type"
            v-model="ruleForm[elem['key']]"
            style="width: 9vw"
            :disabled="elem.disabled"
            :placeholder="ruleForm[elem['key']]"
            :readonly="elem.readonly"
          >
            <el-button
              v-if="elem.btn"
              slot="append"
              icon="el-icon-search"
              @click="rousePopover(elem.key,elem.isShowPopover)"
            ></el-button>
          </el-input>
          <!--  输入数字类型 -->
          <el-input
            v-if="elem.text && elem.type"
            v-model.number="ruleForm[elem['key']]"
            style="width: 9vw"
            :disabled="elem.disabled"
            :placeholder="ruleForm[elem['key']]"
            :readonly="elem.readonly"
          >
            <el-button
              v-if="elem.btn"
              slot="append"
              icon="el-icon-search"
              @click="rousePopover(elem.key,elem.isShowPopover)"
            ></el-button>
          </el-input>
          <el-checkbox v-if="elem.checked" style="width: 9vw" v-model="ruleForm[elem['key']]"></el-checkbox>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            v-model="ruleForm[elem['key']]"
            style="width: 9vw"
            v-if="elem.date"
          ></el-date-picker>
          <el-select
            v-if="elem.select"
            v-model="ruleForm[elem['key']]"
            style="width: 9vw"
            placeholder="请选择选项"
          >
            <el-option
              v-for="(option) in elem.selectOption"
              :key="option['itemValue']"
              :label="option['itemValue']"
              :value="option['itemKey']"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- tab -->
    <div>
      <el-tabs v-model="tabActiveName" type="card" @tab-click="handlerTabClick">
        <el-tab-pane label="基本信息" name="pawn" :disabled="tabIsDisabled"></el-tab-pane>
        <!-- 表格 -->
        <div class="handleTableHeight">
          <div class="mb-10">
            <el-button type="primary" @click="handlerAddCreditPawn">新增</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="danger">删除</el-button>
          </div>
          <el-table :data="tableData" height="100%" border style="width: 100%">
            <el-table-column
              v-for="item in tableColumn"
              :key="item"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </el-table>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import DistributionTask from "@/domain/entities/logistics/DistributionTask.js";
import distributionTaskFormConfig from "@/domain/formconfig/logistics/DistributionTask.js";
import distributionTaskItemTableConfig from "@/domain/tableconfig/logistics/DistributionTaskItem.js";
// 引入公共的table组件
import TabTable from "@/components/common/TabTable.vue";
import api from "@/assets/js/appHelper.js";
export default {
  components: {
    Popover: () => import("@/components/common/Popover.vue"),
    TabTable
  },
  data() {
    return {
      inputTable: distributionTaskFormConfig,
      tabIsDisabled: false, // 是否禁用tab
      ruleForm: new DistributionTask(), // 表单输入
      rules: [], // 表单验证规则
      tableColumn: distributionTaskItemTableConfig, // tab 表格数据
      /*************弹窗data 组件参数 *****************/

      isShowPopover: false, // 弹出框
      showComponent: "Popover",
      itemName: "配送任务单",
      // querybar
      apiKey: "",
      queryPopForm: {
        pageIndex: 1,
        pageSize: 10
      },
      searchFormConfig: [],
      btnObj: [{ type: "search", label: "查询" }],
      // table
      popoverList: [], // 弹出框需要的数据
      popoverListKey: [], // 弹出框表头显示列的key值
      currencySelectInputKey: "", // 当前选中数据对应的输入框
      isPopoverSelection: false // 弹出框的表格类型
      /************* 弹窗data end *****************/
    };
  },
  methods: {
    /************************** 弹窗methods start *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
      var obj = null;
      return function(type, clear) {
        console.log(type, clear);
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    handleBtnClickObj() {
      return {
        search: async () => {
          try {
            var {
              data: { count, list }
            } = await api.querySearch(this.apiKey, this.queryPopForm);
            this.queryPopForm.total = count;
            this.popoverList = list;
          } catch (e) {
            console.log(e);
          }
          // 清空查询数据
          this.searchFormConfig.map((e, i) => {
            if (this.queryPopForm[e.moduleBind])
              this.queryPopForm[e.moduleBind] = "";
          });
        }
      };
    },
    //选中数据
    handlerSubPreservation(rowData, key) {
      if (this.ruleForm[key] != undefined) {
        this.ruleForm[key] = rowData[key];
      }
    },
    rousePopover(type, is, currencySelectInputKey) {
      this.searchFormConfig = [];
      if (this.ruleForm[type] != undefined) {
        if (type == "carrier") {
          this.searchFormConfig.push({
            label: "编码",
            moduleBind: "carrierCode",
            isInput: true
          });
          this.apiKey = "/carrierbase";
          this.itemName = "承运商";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "carrierCode", name: "承运商编码" },
            { key: "carrierName", name: "承运商中文名称" },
            { key: "carrierForeignName", name: "承运商外文名称" },
            { key: "carrierAddress", name: "详细地址" },
            { key: "representative", name: "法人代表" }
          ];
        } else if (type == "deliveryTrain") {
          this.searchFormConfig.push({
            label: "单据编号",
            moduleBind: "distributionTrainCode",
            isInput: true
          });
          this.apiKey = "/distributiontrain";
          this.itemName = "配送车次";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "distributionTrainCode", name: "单据编号" },
            { key: "carrier", name: "承运方" },
            { key: "deliveryTrain", name: "配送车次" },
            { key: "deliveryLine", name: "配送线路" },
            { key: "plateNo", name: "车牌号" }
          ];
        } else if (type == "deliveryCar") {
          this.searchFormConfig.push({
            label: "车辆信息编码",
            moduleBind: "vehicleInfoCode",
            isInput: true
          });
          this.apiKey = "/vehicleinfo";
          this.itemName = "配送车辆";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "vehicleInfoCode", name: "车辆信息编码" },
            { key: "vehicleNo", name: "车牌号" },
            { key: "vehicleType", name: "类型" },
            { key: "carType", name: "车型" },
            { key: "load", name: "载重" }
          ];
        } else if (type == "driver") {
          this.searchFormConfig.push({
            label: "编码",
            moduleBind: "driverInfoCode",
            isInput: true
          });
          this.apiKey = "/driverinfo";
          this.itemName = "司机";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "driverInfoCode", name: "编码" },
            { key: "driverName", name: "姓名" },
            { key: "phone", name: "手机" },
            { key: "driverType", name: "类型" },
            { key: "homeAddress", name: "家庭住址" }
          ];
        } else if (type == "shopper") {
          this.searchFormConfig.push({
            label: "职员编码",
            moduleBind: "employeeInfoCode",
            isInput: true
          });
          this.apiKey = "/employeeinfo";
          this.itemName = "配送员";
          this.popoverListKey = [
            // 设置表格的表头
            { key: "employeeInfoCode", name: "职员编码" },
            { key: "employeeInfoName", name: "名字" },
            { key: "department", name: "部门" },
            { key: "contactInfo", name: "员工联系方式" }
          ];
        } else if (type == "shippingRoute") {
          this.searchFormConfig.push({
            label: "公司编码",
            moduleBind: "companyCode",
            isInput: true
          });
          this.apiKey = "/";
          this.itemName = "发运路线";
          this.popoverListKey = [
            // 设置表格的表头
          ];
        }
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [type]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(this.apiKey, this.queryPopForm);
            this.queryPopForm.total = count;
            this.popoverList = list;
          } catch (error) {
            console.log(error);
          }
        }
      };
      this.currencySelectInputKey = type; // 设置当前点击输入框key
      type && currencyObj[type]();
      this.isShowPopover = !this.isShowPopover;
    },
    //分页
    handlePageChange(paper) {
      this.queryPopForm.pageIndex = paper.pageIndex;
      this.queryPopForm.pageSize = paper.pageSize;
      this.handleBtnClick("search"); //翻页查询
    }
    /************************** 弹窗methods end *******************/
  },
  created() {
    api.initSelect(this.inputTable);
  }
};
</script>
<style lang='less'>
.AddCreditBox {
  .form-layout {
    display: flex;
    flex-wrap: wrap;
    > div {
      flex-basis: 21vw;
    }
  }
}
</style>