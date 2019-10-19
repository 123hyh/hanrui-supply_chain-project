<template>
  <div class="table">
    <div class="operationDiv" v-if="operationConfigs.length">
      <el-button :type="item.type" v-for="(item,index) in operationConfigs" :key="index" @click="operation(item.event)" size="small">{{item.label}}</el-button>
    </div>
    <div v-if='noneRules !== true'>
      <el-form :model="ruleData" label-position="left" size="small" label-width="120px">
        <el-form-item v-for="(item,index) in ruleConfigs" :key="index" :label="item.label" class='form-item' style="margin-right: 20px;">
          <!-- 输入框 -->
          <el-input v-if='item.type == "input"' v-model.trim="ruleData[item.name]" :placeholder="item.placeholder || '请输入搜索内容'" clearable></el-input>
          <!-- 日期框 -->
          <el-date-picker v-if="item.type == 'date'" v-model="ruleData[item.name]" type="date" :placeholder="item.placeholder || '请选择日期'" value-format="yyyy-MM-dd">
          </el-date-picker>
          <!-- 下拉框 -->
          <el-select v-if="item.type == 'select'" v-model="ruleData[item.name]" :placeholder="item.placeholder || '请选择筛选内容'">
            <el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
          </el-select>
          <!-- 布尔框 -->
          <el-switch v-if="item.type=='switch'" v-model="data[item.name]"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="table" border :data="data" highlight-current-row @current-change="currentSelected" @cell-dblclick="cellDblclick" size="small">
      <el-table-column type="selection" width="50" v-if="configs.selection === true"></el-table-column>
      <template v-for="(item,index) in configs.items">
        <el-table-column v-if="item.template === true" :width="item.width || 150" :key="index" :label="item.label">
			<template slot-scope="scope">
              <slot :name='item.prop' :prop='scope.row' ></slot>
            </template>
        </el-table-column>
        <el-table-column v-else :width="item.width || 150" :show-overflow-tooltip='true' :key="index" :label="item.label" :prop="item.prop"></el-table-column>
      </template>
    </el-table>
    <el-pagination background layout="total, sizes, prev, pager, next" :current-page="ruleData.pageIndex || 1" :page-size="ruleData.pageSize || 10" :total="count || 0" @size-change="sizeChange" @current-change="currentChange" :hide-on-single-page='true' class="page"></el-pagination>
  </div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => [],
				desc: "表格值"
			},
			count: {
				type: Number,
				default: 0,
				desc: "总条数"
			},
			configs: {
				type: Object,
				required: true,
				desc: "表格配置"
			},
			ruleData: {
				type: Object,
				default: () => {},
				desc: "搜索值"
			},
			ruleConfigs: {
				type: Array,
				default: () => [],
				desc: "搜索"
			},
			operationConfigs: {
				type: Array,
				default: () => [],
				desc: '操作'
			},
			noneRules: {
				type: Boolean,
				default: false,
				desc: '是否显示搜索栏'
			}
		},
		methods: {
			currentChange(val) {
				this.$emit("handlerRuleChange", {...this.ruleData,pageIndex: val});
			},
			sizeChange(val) {
				this.$emit("handlerRuleChange", {...this.ruleData,pageSize: val});
			},
			currentSelected(currentRow) {
				this.$emit('handlerCurrentSelected', currentRow)
			},
			cellDblclick(currentRow) {
				this.$emit('handlerCellDblclick', currentRow)
			},
			operation(val) {
				this.$emit("handlerOperation", val);
			},
		},
		watch:{
			ruleData: {
				handler(newVal, oldVal) {
					this.$emit("handlerRuleEvent", newVal, oldVal);
				},
				deep: true,
				// immediate:true
			},
		},
	};
</script>

<style scoped>
</style>
