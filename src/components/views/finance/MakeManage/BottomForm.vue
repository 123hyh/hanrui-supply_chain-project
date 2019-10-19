<template>
  <!-- 开票 最下面 的form -->
  <div>
    <form-component
      :formConfig="form.config"
      :formModel="form.data"
      @handlerFormVerify=" item=> $emit('handlerFormVerify_bottom', item)"
    ></form-component>
  </div>
</template>
<script>
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'

export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    tableChecked: Object
  },
  watch: {
    'form.data.goodsDetail' (val) {
      if (val === '0')
        return this.handleToGoods();
      this.handleToDetail()
    },
    'form.data.projectPpportion' (val) {
      this.handleProjectPpportion(val)
    }
  },
  methods: {

    /* 按商品明细开票
      开票设置中选择【按商品明细开票】时，需判断货款、关税、增值税明细已同时勾选，否则提示无法选择按商品明细开票；
     */
    handleToGoods () {
      this.handleApportionIsNull()
    },

    // 按开票明细开
    handleToDetail () {
      this.handleApportionIsNull()
    },

    handleApportionIsNull () {
      const isNull = !!this.tableChecked.apportion.length;
      if (!isNull) {
        this.$message.warning('请选择需要分摊的项目');
        this.form.data.goodsDetail = ''
      }
      return isNull
    },

    // 项目分摊操作逻辑
    handleProjectPpportion (val) {
      const isNull = !!this.tableChecked.selectData.length;
      if (!isNull) {
        this.form.data.projectPpportion = '';
        this.$message.warning('请先选择需要分摊到的选项')
      }
    },

    // 校验规则
    handlerFormVerify (verify) {
      const x = utools.checkFormPass(verify);
      debugger
    },
  },

  components: {
    FormComponent
  }
}
</script>