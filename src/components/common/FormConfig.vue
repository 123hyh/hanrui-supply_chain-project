<template>
  <div class="my-form-config">
    <el-form
      :inline-message="true"
      :model="formModel"
      class="form-layout "
      label-position="right"
      label-width="10rem"
      ref="formModel"
      :rules='rules'
    >
      <template v-for="(item) of inputKey">
        <el-form-item
          :class="[item.type,{ 'lan': lan == '3' }]"
          :key="item.key"
          :label="item.name"
          :prop="item.key"
          :rules="item.rules"
          :style="item.layout"
          class="formitem"
          v-show="!item.isShow"
        >
          <!-- 字符串类型输入框 -->
          <el-input
            :disabled="formStatus ? true : item.disabled"
            :placeholder="item.btn && '请点击按钮选择'"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            v-if="item.type=='string'"
            v-model="formModel[item['key']]"
          >
            <el-button
              @click.stop="rousePopover(item.key,item)"
              icon="el-icon-search"
              slot="append"
              v-if="item.btn"
            ></el-button>
            <template slot="append" v-if="item.slotType=='元'">元</template>
            <template slot="append" v-if="item.slotType=='%'">%</template>
            <el-select
              placeholder="请选择选项"
              slot="append"
              v-if="item.slotType=='select'"
              v-model="item['skey']"
            >
              <el-option
                :key="option['itemValue']"
                :label="option['itemValue']"
                :value="option['itemKey']"
                v-for="option in item.selectOption"
              ></el-option>
            </el-select>
          </el-input>
          <!-- 数字类型输入框 -->
          <!-- 	<input type="text" v-if="item.type=='number'" :style="style"  class="number-input" @input="setNumber"/> -->
          <el-input-number
            :controls="false"
            :data-key="item.key"
            :disabled="formStatus ? true : item.disabled"
            :max="item.max"
            :min="item.min"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            autocomplete="off"
            class="el-input-number-item"
            v-if="item.type=='number'"
            v-model="formModel[item['key']]"
          ></el-input-number>
          <!-- <el-input
            v-if="item.type == 'number'"
            :style="lan == '3'?lanstyle:style"
            @blur="setNumber(item.key)"
            v-model="formModel[item['key']]"
            autocomplete="off"
            :disabled="(+formModel.status || 0)>=2 ? true : item.disabled"
            :readonly="item.readonly"
            :data-key="item.key"
          ></el-input>-->
          <div :style="style" class="label" v-if="item.type == 'label'">{{formModel[item['key']]}}</div>
          <!-- 日期选择 -->
          <el-date-picker
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            placeholder="选择日期"
            type="date"
            v-if="item.type=='date'"
            v-model="formModel[item['key']]"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <!-- 多选框 -->
          <el-checkbox
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            v-if="item.type=='checkbox'"
            v-model="formModel[item['key']]"
          ></el-checkbox>
          <!-- 下拉列表 -->
          <el-select
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            @change="$emit('selectChange',$event,item)"
            filterable
            placeholder="请选择选项"
            v-if="item.type=='select' && (!item.money)"
            v-model="formModel[item['key']]"
          >
            <el-option
              :key="option['itemValue']"
              :label="option['itemValue']"
              :value="option['itemKey']"
              v-for="option in item.selectOption"
            ></el-option>
          </el-select>
          <!-- 大文本框 宽度可以 配置 layout字段 -->
          <el-input
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle: item.layout"
            type="textarea"
            v-if="item.type=='textarea'"
            v-model="formModel[item['key']]"
          ></el-input>
          <!-- 时间选择 -->
          <el-date-picker
            placeholder="选择日期时间"
            type="datetime"
            v-if="item.type === 'time'"
            v-model="formModel[item['key']]"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>

          <!-- 数字 -->
          <integerinput
            :decimal="item.decimal"
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            :symbol="item.symbol"
            v-if="item.type=='integer'"
            v-model="formModel[item['key']]"
          ></integerinput>
          <!-- 百分比率     项目未用上 -->
          <ratio
            :decimal="item.decimal"
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            v-if="item.type=='ratio'"
            v-model="formModel[item['key']]"
          ></ratio>
          <!-- 金额 -->
          <currencyinput
            :decimal="item.decimal"
            :disabled="formStatus ? true : item.disabled"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            :symbol="item.symbol"
            v-if="item.type=='money'"
            v-model="formModel[item['key']]"
          ></currencyinput>
          <!-- 金额（计算） -->
          <currencyinput
            :decimal="item.decimal"
            :disabled="true"
            :style="lan == '3'?lanstyle:style"
            :symbol="item.symbol"
            v-if="item.type=='calc'"
            v-model="formModel[item['key']]"
          ></currencyinput>
          <!-- 下拉联动金额（计算） -->
          <money-input
            :decimal="item.decimal"
            :disabled="formStatus ? true : item.disabled"
            :placeholder="item.placeholder || '请录入金额'"
            :readonly="item.readonly"
            :style="lan == '3'?lanstyle:style"
            :symbol="item.symbol"
            v-if="item.type=='select' && item.money"
            v-model="formModel[item['key']]"
          >
            <el-select
              :disabled="formStatus ? true : item.selectdisabled"
              :readonly="item.selectreadonly"
              placeholder
              slot="prepend"
              style="width: 84px;"
              v-model="formModel[item['typekey']]"
            >
              <el-option
                :key="option['itemValue']"
                :label="option['itemValue']"
                :value="option['itemKey']"
                v-for="option in item.selectOption"
              ></el-option>
            </el-select>
          </money-input>
          <!-- 按钮 -->
          <el-button
            @click.stop="rousePopover(item.key,item)"
            v-if="item.type=='button'"
          >{{item.lable}}</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import utools from '@/domain/common/utools'
import Currencyinput from '@/components/common/Currencyinput.vue'
import Integerinput from '@/components/common/Integerinput.vue'
import Ratio from '@/components/common/Ratio.vue'
import MoneyInput from '@/components/common/moneyinput'

export default {
  components: {
    Currencyinput,
    Integerinput,
    Ratio,
    MoneyInput
  },
  data: () => ({
    isShowPopover: false, //是否显示弹窗组件
    style: 'width: 160px',
    lanstyle: 'width: 260px',
    moneystyle: 'width: 160px;text-align: right;'
  }),
  watch: {
    'formModel.status': {
      handler(cur, pre) {
        this.setFormConfig(cur)
      },
      deep: true,
      immediate: true
    },
    inputKey() {
      if (+this.formModel.status > 1) {
        this.setFormConfig(this.formModel.status)
      }
      this.$nextTick(() => {
        this.$emit('handlerFormVerify', this.$refs)
      })
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
    },
    rules:{
      type: Object,
      default: _=>({})
    }
  },
  computed: {
    // 用该状态区分是否可输入
    formStatus() {
      const status = this.formModel.status || '0'
      const s = +status.replace(/-/, '.').replace(/-/, '')
      return s >= 2 && s !== 6
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
  mounted() {
    this.$emit('handlerFormVerify', this.$refs)
  },
  methods: {
    // strFormat: function(target, model) {
    //   Object.prototype.toString.call(target).slice(8, -1) != "Number" &&
    //     (target = 0);
    //   return new Number(new Number(mun).toFixed(2)).toLocaleString();
    // },
    rousePopover(key, item) {
      this.$emit('handlerFormConfigClickSearch', key, item)
    },
    setNumber(key) {
      if (!isNaN(+this.formModel[key])) {
        this.formModel[key] = +this.formModel[key] || null
      }
    },
    // 处理 单据状态 为提交的 search按钮 显示
    setFormConfig(status) {
      function set(formConfig) {
        if (Array.isArray(formConfig)) {
          for (let item of formConfig) {
            if ('list' in item && typeof item.list === 'object') {
              set(item['list'])
            } else {
              if ('btn' in item) {
                const s = +status || 0
                'btn' in item && item['btn'] && (item.btn = s < 2 || s == 6)
              }
              // 单据状态未提交之后的表单都会被禁用
              // +status >= 2 &&( item.disabled = true)
            }
          }
        } else if ('list' in formConfig) {
          set(formConfig.list)
        } else {
          'btn' in formConfig && (formConfig.btn = (+status || 0) < 2)
        }
      }
      set(this.inputKey)
    }
  }
}
</script>
<style  lang="less">
.my-form-config{
.form-layout {
  .el-input-number-item {
    .el-input__inner {
      text-align: start !important;
    }
  }
  .el-input-number-item {
    .el-input__inner {
      text-align: start;
    }
  }
  display: flex;
  flex-wrap: wrap;
  > div {
    flex-basis: 25%;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 3px !important;
  }
  > .lan {
    flex-basis: 33%;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 3px ;
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
}
</style>
