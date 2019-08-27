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
            v-if="item.type=='String'"
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
          <input
            v-if="item.type=='Number'"
            style="width: 9vw"
            v-model.number="ruleForm[item['key']]"
            type="number"
            class="number-input"
            :readonly="item.readonly"
          >
          <!-- 时间选择 -->
          <el-date-picker
            v-if="item.type=='Date'"
            style="width: 9vw"
            v-model.number="ruleForm[item['key']]"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- 多选框 -->
          <el-checkbox v-if="item.type=='checkbox'" v-model="ruleForm[item['key']]"></el-checkbox>
          <!-- 下拉列表 -->
          <el-select v-if = "item.type=='select'" v-model = "ruleForm[item['key']]" style="width: 9vw"  placeholder = "请选择选项">
					  <el-option v-for = "(option) in item.selectOption" :key = "option['itemValue']" :label = "option['itemValue']" :value = "option['itemKey']" ></el-option>
				  </el-select>
        </el-form-item>
      </el-form>
    </div>

        <!-- tab页签 -->
 		<div>
			<el-tabs v-model="tabActiveName" type="border-card" @tab-click="handlerTabClick">
				<el-tab-pane label="认款信息" name="billing" :disabled='tabIsDisabled'></el-tab-pane>
				<!-- 表格 -->
				<div class="handleTableHeight">
					<div class="mb-10">
						<el-row>
							<el-col :span="24">
								<!-- 操作 -->
								<el-button type="primary" @click="openTabForm('create')">新增</el-button>
								<el-button type="primary" @click="openTabForm('update')">修改</el-button>
								<el-button type="danger" @click="openTabForm('delete')">删除</el-button>
							</el-col>
						</el-row>
					</div>
					<el-table :data="dataTab" border highlight-current-row @row-click="clickTabRow" ref="moviesTable">
						<el-table-column v-for='item in tableConfig' :key="item.label" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
					</el-table>
				</div>
			</el-tabs>
		</div>
  </div>
</template>
<script>
import formConfig from "@/domain/formconfig/finance/SubscriptionOrder.js";
import tableConfig from "@/domain/tableconfig/finance/SubscriptionItem.js";
import api from "@/assets/js/appHelper.js";
export default {
  data: () => ({
    formConfig,
    tableConfig,
    ruleForm: {},
    rules: {},
    activeName: "first",
    tableData: []
  }),
  methods: {
    handleClick() {},
    rousePopover() {},
    handleInputNumber(e) {

    },
    handleInput(e) {

    },
    handleNumberInput(x, y, z) {

    }
  },
  created() {
    api.initSelect(this.formConfig);
  }
};
</script>
<style scoped lang="less">
	.form-layout {
		>div {
			flex-basis: 20vw;
			height: 15px;
		}
	}
.table-nowrap {
  th {
    > div {
      text-align: center;
    }
  }
}
//  输入数字框样式
.number-input {
  height: 28px;
  line-height: 28px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  &:hover {
    border-color: #c4c4c4;
  }
  &:focus {
    border-color: #409eff;
    outline: 0;
  }
}
</style>
