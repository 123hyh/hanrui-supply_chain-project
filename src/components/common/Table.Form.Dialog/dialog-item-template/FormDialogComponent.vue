<template>
  <form-config
    ref="formModel"
    :formModel='formData.ruleForm'
    :formConfig='formData.formConfig'
    :calculate='calculate'
    @handlerSearchClick='handlerFormConfigClickSearch'
    @handlerFormVerify="handlerFormVerify"
  ></form-config>
</template>
<script>
import FormConfig from '@/components/common/form-template/FormComponent.vue';

export default {
  props: {
    formData: {
      validator (value) {
        const { ruleForm, formConfig } = value;
        return value;
      }
    },
    calculate: Object
  },
  methods: {
    /**
     * @method handlerFormConfigClickSearch 点击弹窗的search按钮
     * @method handlerFormVerify 向上发送验证规则
     */
    handlerFormConfigClickSearch (params) {
      this.$emit('handlerFormConfigClickSearch', params)
    },
    /* emit 验证规则 */
    handlerFormVerify ($refs) {
      this.$emit('handlerFormVerify', $refs)
    },
  },
  components: {
    FormConfig
  }
}
</script>