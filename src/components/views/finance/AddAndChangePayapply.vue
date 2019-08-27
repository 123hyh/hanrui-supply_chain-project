<template>
  <div>
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
          <!-- 文本框 -->
          <el-input
            style="width: 9vw"
            v-if="item.text"
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
          <!-- 时间选择 -->
          <el-date-picker
            v-if="item.date"
            style="width: 9vw"
            v-model="ruleForm[item['key']]"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- 多选框 -->
          <el-checkbox v-if="item.checked" v-model="ruleForm[item['key']]">{{item.name}}</el-checkbox>
          <!-- 下拉列表 -->
          <el-select
            v-if="item.select"
            style="width: 9vw"
            v-model="ruleForm[item['key']]"
            placeholder="请选择选项"
          >
            <template v-for="obj in item.selectKey">
              <el-option
                v-for="option in elem.selectOption"
                :key="option[obj['label']]"
                :label="option[obj['label']]"
                :value="option[obj['value']]"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" height="470" border style="width: 100%">
        <el-table-column v-for="(item,index) of tableConfig" :key="index" :prop="item.prop" :label="item.label" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import formConfig from "@/domain/formconfig/finance/Payapply";
import tableConfig from '@/domain/tableconfig/finance/Payapply'
export default {
  data: () => ({
    formConfig,
    ruleForm: {},
    rules: {},
    tableData:[],
    tableConfig
  }),
  props: {
    jumpType: {
      type: String
    }
  },
  created() {},
  mounted() {},
  methods: {
    rousePopover(x, y, z) {}
  }
};
</script>
<style scoped lang="less">
.form-layout {
  > div {
    flex-basis: 20vw;
    height: 15px;
  }
}
</style>
