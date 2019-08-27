/* 测试模版 */
<template>
  <div>
    <button @click.stop="handleClick">验证</button>
    <form-component
      :formModel="formData"
      :formConfig="formConfig"
      :calculate="calculate"
      @handlerFormVerify="handlerFormVerify"
    ></form-component>
  </div>
</template>
<script>
import FormComponent from "@/components/common/form-template/FormComponent.vue";
import formConfig from "@/components/common/form-template/formConfig.js";
import c from "@/domain/formconfig/risk/Credit.js";
import utools from "@/domain/common/utools.js";
export default {
  name: "IndexComponent_1",
  computed: {
    calculate() {
      const { count = 0, price = 0 } = this.formData;
      return {
        total: count * price
      };
    }
  },
  data: _ => ({
    formConfig: formConfig,
    formData: {},
    formVerify: {}
  }),
  components: {
    FormComponent
  },
  methods: {
    handleClick() {
      // this.formVerify['formModel'].validate()
      console.log(utools.testFormValidate(this.formVerify));
    },
    handlerFormVerify(list) {
      this.formVerify = list;
    }
  }
};
</script>
