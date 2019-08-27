<template>
  <div :id="id" :style="{height}"></div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: String,
      required: false
    }
  },
  mounted() {
    this.setOption();
  },
  methods: {
    setOption() {
      let id = this.$echarts.init(document.getElementById(this.id));
      id.setOption(this.data);
    }
  }
};
</script>
<style>
</style>
