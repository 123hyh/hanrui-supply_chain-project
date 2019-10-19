<template>
  <div>
    <el-form
      :model="formModel"
      ref="formModel"
      label-width="10rem"
      label-position="right"
      :inline-message="true"
      class="form-layout"
    >
      <template v-for="(item) of inputKey">
        <el-form-item
          class="formitem"
          v-show="!item.isShow"
          :class="[item.type,{ 'lan': lan == '3' }]"
          :key="item.key"
          :label="item.name"
          :rules="item.rules"
          :prop="item.key"
          :style="item.layout"
        >
          <!-- 字符串类型输入框 -->
          <el-input
            v-if="item.type=='string'"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :placeholder="item.btn && '请点击按钮选择'"
          >
            <el-button
              v-if="item.btn"
              slot="append"
              icon="el-icon-search"
              @click.stop="rousePopover(item.key,item)"
            ></el-button>
            <template
              v-if="item.slotType=='元'"
              slot="append"
            >元</template>
            <template
              v-if="item.slotType=='%'"
              slot="append"
            >%</template>
            <el-select
              v-if="item.slotType=='select'"
              slot="append"
              v-model="item['skey']"
              placeholder="请选择选项"
            >
              <el-option
                v-for="option in item.selectOption"
                :key="option['itemValue']"
                :label="option['itemValue']"
                :value="option['itemKey']"
              ></el-option>
            </el-select>
          </el-input>
          <!-- 数字类型输入框 -->
          <!-- 	<input type="text" v-if="item.type=='number'" :style="style"  class="number-input" @input="setNumber"/> -->
          <el-input
            v-if="item.type == 'number'"
            :style="lan == '3'?lanstyle:style"
            @blur="setNumber(item.key)"
            v-model="formModel[item['key']]"
            autocomplete="off"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :data-key="item.key"
          ></el-input>
          <div
            class="label"
            v-if="item.type == 'label'"
            :style="style"
          >{{formModel[item['key']]}}</div>
          <!-- 日期选择 -->
          <el-date-picker
            v-if="item.type=='date'"
            :style="lan == '3'?lanstyle:style"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="formModel[item['key']]"
            type="date"
            placeholder="选择日期"
            :disabled="item.disabled"
            :readonly="item.readonly"
          ></el-date-picker>
          <!-- 多选框 -->
          <el-checkbox
            v-if="item.type=='checkbox'"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
          ></el-checkbox>
          <!-- 下拉列表 -->
          <el-select
            filterable
            v-if="item.type=='select' && (!item.money)"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            placeholder="请选择选项"
            :disabled="item.disabled"
            :readonly="item.readonly"
            @change="$emit('selectChange',$event,item)"
          >
            <el-option
              v-for="option in item.selectOption"
              :key="option['itemValue']"
              :label="option['itemValue']"
              :value="option['itemKey']"
            ></el-option>
          </el-select>
          <!-- 大文本框 宽度可以 配置 layout字段 -->
          <el-input
            :style="lan == '3'?lanstyle: item.layout"
            v-if="item.type=='textarea'"
            type="textarea"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
          ></el-input>
          <!-- 时间选择 -->
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-if="item.type === 'time'"
            v-model="formModel[item['key']]"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
          
          <!-- 数字 -->
          <integerinput
            v-if="item.type=='integer'"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :decimal="item.decimal"
            :symbol="item.symbol"
          ></integerinput>
          <!-- 百分比率     项目未用上 -->   
          <ratio
            v-if="item.type=='ratio'"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :decimal="item.decimal"
          ></ratio>
          <!-- 金额 -->
          <currencyinput
            v-if="item.type=='money'"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :decimal="item.decimal"
            :symbol="item.symbol"
          ></currencyinput>
          <!-- 金额（计算） -->
          <currencyinput
            v-if="item.type=='calc'"
            :style="lan == '3'?lanstyle:style"
            v-model="formModel[item['key']]"
            :disabled="true"
            :decimal="item.decimal"
            :symbol="item.symbol"
          ></currencyinput>
          <!-- 下拉联动金额（计算） -->
          <money-input
            :style="lan == '3'?lanstyle:style"
            v-if="item.type=='select' && item.money"
            v-model="formModel[item['key']]"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :decimal="item.decimal"
            :symbol="item.symbol"
            :placeholder="item.placeholder || '请录入金额'"
          >
            <el-select
              slot="prepend"
              style="width: 84px;"
              v-model="formModel[item['typekey']]"
              placeholder=""
              :disabled="item.selectdisabled"
              :readonly="item.selectreadonly"
            >
              <el-option
                v-for="option in item.selectOption"
                :key="option['itemValue']"
                :label="option['itemValue']"
                :value="option['itemKey']"
              ></el-option>
            </el-select>
          </money-input>
          <!-- 按钮 -->
          <el-button
            v-if="item.type=='button'"
            @click.stop="rousePopover(item.key,item)"
          >{{item.lable}}</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import utools from "@/domain/common/utools";
import Currencyinput from "@/components/common/Currencyinput.vue";
import Integerinput from "@/components/common/Integerinput.vue";
import Ratio from "@/components/common/Ratio.vue";
import MoneyInput from "@/components/common/moneyinput";

export default {
  components: {
    Currencyinput,
    Integerinput,
    Ratio,
    MoneyInput
  },
  data: () => ({
    isShowPopover: false, //是否显示弹窗组件
    style: "width: 160px",
    lanstyle: "width: 260px",
    moneystyle: "width: 160px;text-align: right;"
  }),
  watch: {
    "formModel.status": {
      handler (cur, pre) {
        this.setFormConfig(cur);
      },
      deep: true,
      immediate: true
    },
    inputKey () {
      if (+this.formModel.status > 1) {
        this.setFormConfig(this.formModel.status);
      }
    }
  },
  props: {
    formModel: {
      type: Object,
      required: true
    },
    inputKey: {
      type: Array,
      required: true
    },
    lan: {
      type: Number,
      default: 4
    }
  },
  //   computed: {
  //    strFormat: {
  //       get: function () {
  //          return this.num; //获取的时候直接获取值
  //       },
  //       set: function (value) {
  //          this.num = value.toUpperCase(); //设置的时候变为大写
  //        }
  //     }
  //   },
  //   filters: {
  //     NumtoMoney: () => {
  //       return function(mun) {
  //         Object.prototype.toString.call(mun).slice(8, -1) != "Number" &&
  //           (mun = 0);
  //         return new Number(new Number(mun).toFixed(2)).toLocaleString();
  //       };
  //     }
  //   },
  mounted () {
    this.$emit("handlerFormVerify", this.$refs);
  },
  methods: {
    // strFormat: function(target, model) {
    //   Object.prototype.toString.call(target).slice(8, -1) != "Number" &&
    //     (target = 0);
    //   return new Number(new Number(mun).toFixed(2)).toLocaleString();
    // },
    rousePopover (key, item) {
      this.$emit("handlerFormConfigClickSearch", key, item);
    },
    setNumber (key) {
      if (!isNaN(+this.formModel[key])) {
        this.formModel[key] = +this.formModel[key] || null;
      }
    },
    // 处理 单据状态 为提交的 search按钮 显示
    setFormConfig (status) {
      function set (formConfig) {
        if (Array.isArray(formConfig)) {
          for (let item of formConfig) {
            if ("list" in item && typeof item.list === "object") {
              set(item["list"]);
            } else {
              if ("btn" in item) {
                "btn" in item && (item.btn = (+status || 0) < 2);
              }
            }
          }
        } else if ("list" in formConfig) {
          set(formConfig.list);
        } else {
          "btn" in formConfig && (formConfig.btn = (+status || 0) < 2);
        }
      }
      set(this.inputKey);
    }
  }
};
</script>
<style scoped lang="less">
.form-layout {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex-basis: 25%;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 3px;
  }
  > .lan {
    flex-basis: 33%;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 3px;
  }
}
.form-item-layout {
  display: flex;
}
.textarea {
  height: 50px !important;
}
// .formitem{
//   padding-right: 30px;
// }
</style>
