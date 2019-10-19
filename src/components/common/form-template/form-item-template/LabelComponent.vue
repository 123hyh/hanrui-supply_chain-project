<template>
  <div class="label" :style='styles' >{{formModel[config['key']]}}</div>
</template>
<script>
export default {
   props: {
        formStatus:Boolean,
    // form 实体
    formModel: {
      type: Object,
      required: true
    },
    // 当前 渲染模版 的 配置
    config: {
      type: Object,
      required: true
    },
    styles: {
      type: [Number, String],
      required: false
    }
  }
};
</script>

