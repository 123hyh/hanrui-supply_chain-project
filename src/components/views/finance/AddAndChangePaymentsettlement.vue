<template>
  <div>
    		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="primary" @click.stop="handleSubmit">返回</el-button>
		</div>
    <!-- 表单 -->
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="form-layout"
      >
        <el-form-item
          v-for="(item,index) of formConfig"
          :key="index"
          :label="item.name"
          :prop="item.prop"
        >
          <!-- 字符串类型输入框 -->
          <el-input
            style="width: 9vw"
            v-if="item.isString"
            v-model="ruleForm[item['key']]"
            :readonly="item.readonly"
          >
            <el-button
              v-if="item.btn"
              slot="append"
              icon="el-icon-search"
              @click="rousePopover(elem.key,elem.isShowPopover)"
            ></el-button>
          </el-input>
          <!-- 数字类型输入框 -->
          <el-input
            style="width: 9vw"
            v-if="item.isNumber"
            v-model.number="ruleForm[item['key']]"
            :readonly="item.readonly"
          ></el-input>
          <!-- 时间选择 -->
          <el-date-picker
            v-if="item.date"
            style="width: 9vw"
            v-model="ruleForm[item['key']]"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- 多选框 -->
          <el-checkbox v-if="item.checked" v-model="ruleForm[item['key']]"></el-checkbox>
                    <!-- 下拉列表 -->
					<el-select v-if = "item.select" v-model = "ruleForm[item['key']]" style="width: 9vw"  placeholder = "请选择选项">
						<el-option v-for = "(option) in item.selectOption" :key = "option['itemValue']" :label = "option['itemValue']" :value = "option['itemKey']" ></el-option>
					</el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- tab页签 -->
    <div>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="计费信息" name="chargeinformation" :disabled="tabIsDisabled">
          <!-- 表格 -->
          <div class="handleTableHeight">
						<div class="mb-10">
							<el-button type="primary" @click="handlerAddCreditPawn">新增</el-button>
							<el-button type="primary">修改</el-button>
							<el-button type="danger">删除</el-button>
						</div>
            <el-table :data="tableData" height="100%" border style="width: 100%">
              <el-table-column
                v-for="item in chargeinformationData"
                :key="item"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="物料信息" name="materialinformation" :disabled="tabIsDisabled">
          <!-- 表格 -->
          <div class="handleTableHeight">
						<div class="mb-10">
							<el-button type="primary" @click="handlerAddCreditPawn">新增</el-button>
							<el-button type="primary">修改</el-button>
							<el-button type="danger">删除</el-button>
						</div>
            <el-table :data="tableData" height="100%" border style="width: 100%">
              <el-table-column
                v-for="item in materialinformationData"
                :key="item"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              ></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表格 -->
    <div class="table-nowrap scrollbar">
      <el-table :data="tableData" height="250" style="width: 100%" border>
        <el-table-column v-for="(item,index) of tableConfig" min-width='100' :key="index" :prop="item.prop" :label="item.label" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import formConfig from "@/domain/formconfig/finance/Paymentsettlement";
import chargeinformation from "@/domain/tableconfig/finance/Chargeinformation";
import materialinformation from "@/domain/tableconfig/finance/Materialinformation";
import api from "@/assets/js/appHelper.js";
export default {
  data: () => ({
    formConfig,
    ruleForm: {},
    rules: {},
    activeName: "first",
    chargeinformationData: chargeinformation,
    materialinformationData: materialinformation
  }),
  methods: {
    handleClick() {},
    rousePopover() {},
    handleInputNumber(e) {

    }
  },
  created() {
			api.initSelect(this.formConfig);
	}
};
</script>
<style lang="less" scoped>
.form-layout {
  > div {
    flex-basis: 21vw;
  }
}
.table-nowrap{
    th{
        >div{
            text-align: center
        }
    }
}


</style>
