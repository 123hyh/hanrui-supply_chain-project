<template>
  <div class="form">
    <div class="operationDiv" v-if="operationConfigs.length">
      <el-button :type="item.type" v-for="(item,index) in operationConfigs" :key="index" @click="operation(item.event)" size="small">{{item.label}}</el-button>
    </div>
    <div style="min-height: 1px;"></div><!--避免浮动元素超出遮罩层-->
    <slot></slot>
    <el-form ref="form" :model.sync="data" label-position="right" size="small" label-width="140px">
      <template v-for="(config, i) in configs">
        <template v-if="config.none !== true">
          <div :key="i" v-show="config.disab !== true">
            <el-divider content-position="left" v-if="config.nonetitle !== true">{{config.title}}</el-divider>
            <div style="width: 1400px;">
            <template v-for="(item, e) in config.items">
              <template v-if="item.none !== true">
                <template v-if="config.text !== true">
                  <!---rules没有时选取null，解决数字框校验‘is not string’---->
                  <el-form-item :key="e" v-show="item.disab !== true" :prop="item.name" :rules="item.disabled !== true ? item.rules : null" class='form-item' :label="item.label" :class='item.big?"form-item-big":item.long?"form-item-long":""'>
                    <!-- 输入框/点选框/下拉输入框 -->
                    <el-input v-if='item.type == "input" || item.type == "inputbutton" || item.type == "inputselect"' v-model.trim="data[item.name]" :disabled="item.disabled" :readonly='item.readonly' @change='inputChange(data,item)' :placeholder="item.placeholder || '请输入内容'">
                      <el-button v-if="item.type == 'inputbutton' && item.disabled !== true" slot="append" icon="el-icon-search" @click="pointSelection(data,item)"></el-button>
                      <el-select v-if="item.type == 'inputselect'" slot="prepend" v-model.trim="data[item.selsect]" :disabled="item.disabled" @change='selectChange(data,item)' :placeholder="item.placeholder || '请选择'">
                        <el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
                      </el-select>
                    </el-input>
                    <!-- 日期框 -->
                    <el-date-picker v-if="item.type == 'date'" v-model="data[item.name]" :disabled="item.disabled" :readonly='item.readonly' type="date" @change='dateChange(data,item)' :placeholder="item.placeholder || '请选择日期'"  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    <!-- 下拉框 -->
                    <el-select v-if="item.type == 'select'" v-model="data[item.name]" :disabled="item.disabled" :readonly='item.readonly' @change='selectChange(data,item)' :placeholder="item.placeholder || '请选择内容'">
                      <el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
                    </el-select>
                    <!-- 布尔框 -->
                    <el-switch v-if="item.type=='switch'" v-model="data[item.name]" :disabled="item.disabled" @change='switchChange(data,item)'></el-switch>
                    <!-- 单选框 -->
                    <el-radio-group v-if="item.type == 'radio'" v-model="data[item.name]" :disabled="item.disabled" @change='radioChange(data,item)'>
                      <el-radio v-for="(option,index) in item.options" :key="index" :label="option['value']">{{option['label']}}</el-radio>
                    </el-radio-group>
                    <!-- 多选框 -->
                    <el-checkbox-group v-if="item.type == 'checkbox'" v-model="data[item.name]" :disabled="item.disabled" @change='checkboxChange(data,item)'>
                      <el-checkbox v-for="(option,index) in item.options" :key="index" :label="option['value']">{{option['label']}}</el-checkbox>
                    </el-checkbox-group>
                    <!-- （下拉）数字框[支持计算] -->
                    <number-input v-if="item.type=='num' || item.type=='numbutton' || item.type=='numselect'" v-model.number="data[item.name]"  type="number" :disabled="item.disabled" :readonly='item.readonly' :decimal="item.decimal" @change='inputChange(data,item)' :placeholder="item.placeholder || '请录入数字'">
                      <el-button v-if="item.type == 'numbutton' && item.disabled !== true" slot="append" icon="el-icon-search" @click="pointSelection(data,item)"></el-button>
                      <el-select v-if="item.type=='numselect'" slot="prepend" v-model="data[item.selsect]" :disabled="item.selsectDisabled" @change='selectChange(data,item)' :placeholder="item.placeholder || '请选择'">
                        <el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
                      </el-select>
                    </number-input>
                    <!-- （下拉）金额框[支持计算] -->
                    <money-input v-if="item.type=='money' || item.type=='moneyselect'" v-model.trim="data[item.name]" :disabled="item.disabled" :readonly='item.readonly' :decimal="item.decimal" :symbol="item.symbol" @change='inputChange(data,item)' :placeholder="item.placeholder || '请录入金额'" class="text-r">
                      <el-button v-if="item.type == 'moneybutton' && item.disabled !== true" slot="append" icon="el-icon-search" @click="pointSelection(data,item)"></el-button>
                      <el-select v-if="item.type=='moneyselect'" slot="prepend" v-model="data[item.selsect]" :disabled="item.selsectDisabled" @change='selectChange(data,item)' :placeholder="item.placeholder || '请选择'">
                        <el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
                      </el-select>
                    </money-input>
                    <!-- （下拉）百分比框[支持计算] -->
                    <percent-input v-if="item.type=='percent' || item.type=='percentselect'" v-model.trim="data[item.name]" :disabled="item.disabled" :readonly='item.readonly' :decimal="item.decimal" @change='inputChange(data,item)' :placeholder="item.placeholder || '请录入比率'" class="text-r">
                      <el-button v-if="item.type == 'percentbutton' && item.disabled !== true" slot="append" icon="el-icon-search" @click="pointSelection(data,item)"></el-button>
                      <el-select v-if="item.type=='percentselect'" slot="prepend" v-model="data[item.selsect]" :disabled="item.selsectDisabled" @change='selectChange(data,item)' :placeholder="item.placeholder || '请选择'">
                        <el-option v-for="(option,index) in item.options" :key="index" :label="option['label']" :value="option['value']"></el-option>
                      </el-select>
                    </percent-input>
                    <!-- 文本域 -->
                    <el-input v-if='item.type == "textarea"' type="textarea" v-model.trim="data[item.name]" :disabled="item.disabled" :readonly='item.readonly' :placeholder="item.placeholder || '请输入详细内容'"></el-input>
                    <el-button v-if='item.type == "button"' :icon="item.icon"  @click="buttonClick(data,item)">{{item.text}}</el-button>
                  </el-form-item>
                </template>
                <template v-else>
                  <el-form-item :key="e" v-show="item.disab !== true" class='form-item-text' :label="item.label" :class='item.big?"form-item-text-big":item.long?"form-item-text-long":""'>
                    <i class="colon">:</i>
                    <label v-if='item.type == "input" || item.type == "num" || item.type == "inputbutton" || item.type == "numbutton" || item.type == "textarea"'>{{data[item.name] || '*'}}</label>
                    <label v-if='item.type == "date"'><i class="el-icon-time"></i>{{data[item.name]? data[item.name].slice(0, 10) : '*'}}</label>
                    <label v-if='item.type == "select" || item.type == "radio"'>{{(data[item.name] && getlabelOfselect(item['options'],data[item.name]))?getlabelOfselect(item['options'],data[item.name]):'*'}}</label>
                    <label v-if='item.type == "switch"'>{{data[item.name]===true?'是':'否'}}</label>
                    <label v-if='item.type == "checkbox"'>
                      <template v-if="item['options'].length>0">
                        <span v-for="(e,i) in item['options']" :key="i">
                          <el-divider direction="vertical" v-if='i!=0'></el-divider>
                          <template v-if='data[item.name].indexOf(e["value"])!="-1"'>
                            {{e["label"]}}
                          </template>
                        </span>
                      </template>
                      <span v-else>*</span>
                    </label>
                    <label v-if='item.type == "inputselect" || item.type == "numselect"'>{{(data[item.selsect] && getlabelOfselect(item['options'],data[item.selsect]))?getlabelOfselect(item['options'],data[item.selsect]):'*'}}<el-divider direction="vertical"></el-divider>{{data[item.name] || '*'}}</label>
                    <label v-if='item.type == "money"'>{{data[item.name]?(item['symbol'] || ''):'*'}}{{data[item.name]}}</label>
                    <label v-if='item.type == "moneyselect"'>{{(data[item.selsect] && getlabelOfselect(item['options'],data[item.selsect]))?getlabelOfselect(item['options'],data[item.selsect]):'*'}}<el-divider direction="vertical"></el-divider>{{data[item.name]?(item['symbol'] || '$')+data[item.name]:'*'}}</label>
                    <label v-if='item.type == "percent"'>{{data[item.name]}}{{data[item.name]?'%':'*'}}</label>
                    <label v-if='item.type == "percentselect"'>{{(data[item.selsect] && item['options'][data[item.selsect]])?item['options'][data[item.selsect]]["label"]:'*'}}<el-divider direction="vertical"></el-divider>{{data[item.name]?'%'+data[item.name]:'*'}}</label>
                  </el-form-item>
                </template>
              </template>
            </template>
            </div>
          </div>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import NumberInput from "../Basics/numberiput";
import MoneyInput from "../Basics/moneyinput";
import PercentInput from "../Basics/percentinput";
export default {
	components: {
    NumberInput,
    MoneyInput,
    PercentInput
	},
  props: {
    data: {
      type: Object,
      default: {},
      desc: "表单值"
    },
    configs: {
      type: Array,
      required: true,
      desc: "表单配置"
    },
    operationConfigs: {
      type: Array,
			default: () => [],
      desc: '操作'
    },
  },
  methods: {
    inputChange(data, item) {
      this.$emit("handlerInputChange", data, item);
    },
    pointSelection(data, item) {
      this.$emit("handlerPointSelection", data, item);
    },
    selectChange(data, item) {
      this.$emit("handlerSelectChange", data, item);
    },
    switchChange(data, item) {
      this.$emit("handlerSwitchChange", data, item);
    },
    radioChange(data, item) {
      this.$emit("handlerRadioChange", data, item);
    },
    dateChange(data, item) {
      this.$emit("handlerDateChange", data, item);
    },
    buttonClick(data, item) {
      this.$emit("handlerButtonClick", data, item);
    },
		operation(val) {
			this.$emit("handlerOperation", val);
    },
    // 去下拉制定value的label
    getlabelOfselect(options,value){
      for (let i = 0; i < options.length; i++) {
        if(options[i]['value'] == value){
          return options[i]['label']
        }
      }
    }
  }
};
</script>

<style>
</style>
