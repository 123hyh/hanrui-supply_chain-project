<template>
	<div>
		<el-form ref="form" :model="fromConfig.data" :label-position="fromConfig.labelPosition || 'right'" size="mini"
		 label-width="120px">
			<div v-for="(box,index) in fromConfig.config" :key="index">
				<div v-if='box.show !== false' class="itemtitle">{{box.itemtitle}}</div>
				<el-form-item v-show="box.show !== false" v-for="(item,index) in box.itemconfig" :key="index" :label="item.label" class='form-item' :class='item.big?"form-item-big":""'>
					<!-- 文本 -->
					<template v-if="box.edit === false">
						<label>：</label>
						<i v-if='item.type == "input" || item.type == "inputbutton" || item.type == "textarea"'>{{fromConfig.data[item.name] || '*'}}</i>
						<i v-if='item.type == "date"'><i class="el-icon-time"></i>{{fromConfig.data[item.name] || '*'}}</i>
						<i v-if='item.type == "select" || item.type == "radio"'>{{item['options'][fromConfig.data[item.name]]?item['options'][fromConfig.data[item.name]]["label"]:'*'}}</i>
						<i v-if='item.type == "checkbox"'>
							<template v-if="item['options'].length>0">
								<span v-for="(e,i) in item['options']" :key="i">
									<el-divider direction="vertical" v-if='i!=0'></el-divider>
									<template v-if='fromConfig.data[item.name].indexOf(e["value"])!="-1"'>
										{{e["label"]}}
									</template>
								</span>
							</template>
							<span v-else>*</span>
						</i>
						<i v-if='item.type == "switch"'>{{fromConfig.data[item.name]===true?'是':fromConfig.data[item.name]===false?'否':'*'}}</i>
						<i v-if='item.type == "money"'>{{fromConfig.data[item.name]?(item['symbol'] || '$'):'*'}}{{fromConfig.data[item.name]}}</i>
					</template>
					<template v-else>
						<!-- 输入框 -->
						<el-input v-if='item.type == "input"' v-model="fromConfig.data[item.name]" :disabled="item.disabled" :placeholder="item.placeholder || '请输入内容'"></el-input>
						<!-- 点选框 -->
						<el-input v-if="item.type == 'inputbutton'" v-model="fromConfig.data[item.name]" :disabled="item.disabled"
						 :readonly='true' :placeholder="item.placeholder || '请选择按钮内容'">
							<el-button slot="append" icon="el-icon-search" @click="pointSelection(fromConfig.data,item)"></el-button>
						</el-input>
						<!-- 日期框 -->
						<el-date-picker v-model="fromConfig.data[item.name]" :disabled="item.disabled" type="date" :placeholder="item.placeholder || '请选择日期'"
						 value-format="yyyy-MM-dd" v-if="item.type == 'date'">
						</el-date-picker>
						<!-- 下拉框 -->
						<el-select v-model="fromConfig.data[item.name]" :disabled="item.disabled" :placeholder="item.placeholder || '请选择内容'"
						 v-if="item.type == 'select'">
							<el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
						</el-select>
						<!-- 单选框 -->
						<el-radio-group v-model="fromConfig.data[item.name]" :disabled="item.disabled" v-if="item.type == 'radio'">
							<el-radio v-for="(option,index) in item.options" :key="index" :label="option['value']">{{option['label']}}</el-radio>
						</el-radio-group>
						<!-- 多选框 -->
						<el-checkbox-group v-model="fromConfig.data[item.name]" :disabled="item.disabled" v-if="item.type == 'checkbox'">
							<el-checkbox v-for="(option,index) in item.options" :key="index" :label="option['value']">{{option['label']}}</el-checkbox>、
						</el-checkbox-group>
						<!-- 文本域 -->
						<el-input v-model="fromConfig.data[item.name]" :disabled="item.disabled" :placeholder="item.placeholder || '请输入内容'"
						 type="textarea" v-if="item.type=='textarea'"></el-input>
						<!-- 布尔框 -->
						<el-switch v-model="fromConfig.data[item.name]" :disabled="item.disabled" v-if="item.type=='switch'"></el-switch>
						<!-- 数字/金额 -->
						<currency v-if="item.type=='money'" v-model="fromConfig.data[item.name]" :disabled="item.disabled" :symbol="item.symbol"
						 :decimal="item.decimal"></currency>
						 <!-- 计算 -->
						<currency v-if="item.type=='calc'" v-model="fromConfig.data[item.name]" disabled :symbol="item.symbol"
						 :decimal="item.decimal"></currency>
					</template>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>
<script>
	import Currency from "./currency.vue";
	import utils from "../utils";
	export default {
		name: 'From',
		components: {
			Currency
		},
		props: {
			fromConfig: {
				type: Object,
				required: true
			}
		},
		methods: {
			pointSelection(obj, item) {
				this.$emit('handlerPointSelection', obj, item)
			}
		},
		created() {
			utils.getConfigSelect(this.fromConfig.config);
		},
		// watch: {
		// 	'fromConfig.data': {
		// 		handler(newVal, oldVal) {
		// 			utils.getConfigCalc(this.data, this.configs)
		// 			this.$emit("update:fromConfig", fromConfig);
		// 		},
		// 		deep: true,
		// 	}
		// }
	};
</script>
<style>
	.el-form {
		text-align: left;
	}
	.itemtitle{
		width: 100%; height: 28px; line-height: 28px;margin-bottom: 18px;
		background: linear-gradient(45deg, #0000005e, transparent);padding-left: 10px;
	}
	.form-item {
		width: 300px;
		vertical-align: top;
		display: inline-block;
	}
	.form-item-big {
		width: 600px;
	}
	.el-date-editor.el-input,
	.el-select,
	.el-radio-group,
	.el-checkbox-group {
		width: 100%;
		text-align: left;
	}
	.el-radio {
		height: 28px;
		line-height: 28px;
	}
</style>
