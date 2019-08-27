<template>
  <div class="queryBar-margin">
    <el-form :inline="true">
      <!-- 表单 -->
      <el-form-item v-for="item in formConfig" :key="item.label" :label="item.label">
        <!-- 文本输入 -->
        <el-input v-if="item.isInput" v-model="ruleForm[item['moduleBind']]" style="width:9rem">
					<el-button
						v-if="item.btn"
						slot="append"
						icon="el-icon-search"
						@click.stop="rousePopover(item.key)"
					></el-button>
				</el-input>
        <!-- 时间选择 -->
        <el-date-picker
          v-if="item.isDate"
          v-model="ruleForm[item['moduleBind']]"
          style="width:7.7rem"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        ></el-date-picker>
				 <!-- 多选框 -->
				<el-checkbox
				  v-if="item.checkbox"
				  v-model="ruleForm[item['moduleBind']]"
					:disabled="item.readonly"
				></el-checkbox>
        <!-- 下拉框 -->
        <el-select v-if="item.isSelect" style="width:7.7rem"  v-model="ruleForm[item['moduleBind']]" placeholder="请选择">
           <el-option
            v-for="option in item.selectOption"
            :key="option['itemValue']"
            :label="option['itemValue']"
            :value="option['itemKey']"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 按钮 -->
      <div class="transform-inline-block">
        <template v-for="item of btnObj">
        <el-button
          :key="item.type"
          :type="item.type === 'delete' ? 'danger' : 'primary'"
          :class="{[ item.type !=='delete' && setThemeClass]: true}"
					:disabled="item.readonly"
          @click="handlerClick(item.type)"
        >{{item.label}}</el-button>
        </template>
      </div>
    </el-form>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data: () => ({
    btnList: [],
    btnset: {
      query: { type: "search", label: "查询" },
      insert: { type: "add", label: "新增" },
      operate: { type: "update", label: "操作" },
      delete: { type: "delete", label: "删除" }
    }
  }),
  created(){
    // this.btnList = this.getListBtn[this.$route.path.slice(1)] || [];
  },
  props: {
    formConfig: {
      type: Array,
      default: ()=>([])
      /* default: () => [
        { label: "编码", moduleBind: "creditNo" },
        { label: "名称", moduleBind: "name" },
        { label: "制单人", moduleBind: "creator" },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true }
      ] */
    },
    ruleForm: {
      type: Object,
      default: ()=>({})
    },
    btnObj: {
      type: Array,
      required: true,
//       default: () => [
//         { type: "search", label: "查询" },
//         { type: "add", label: "新增" },
//         { type: "update", label: "操作" },
//         { type: "delete", label: "删除" },
//         { type: "reset", label: "重置" },
//         { type: "refresh", label: "刷新" }
      // ]
    }
  },
  computed: {
    ...mapGetters(['getTheme'/* , 'getListBtn' */]),
    setThemeClass(){
      let obj = {
        '#409EFF': 'theme-color-blur',
        '#FF8C02': 'theme-color-warning',
        '#242F42': 'theme-color-info'
      }
      return obj[this.getTheme]
    },
    /* getbtn(){
      let obj = [];
      for(let item of this.getListBtn[this.$route.path.slice(1)] || []){
        if(this.btnset[item]){
          obj.push(this.btnset[item])
        }
      }
      return obj
    } */
  },
  methods: {
    handlerClick(params) {
      this.$emit("handleBtnClickType", params);
    },
		rousePopover(key) {
		  this.$emit("queryBarPopSearch", key);
		}
  }
};
</script>
<style scoped lang="less">
.queryBar-margin {
  > form {
    > div {
      margin-bottom: 10px !important;
    }
  }
}
.transform-inline-block {
  display: inline-block;
}
</style>
