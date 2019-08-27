<template>
  <div class="form-module-head">
    <hr>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.form-module-head {
  margin: 10px 0;
  padding: 10px 0;
  position: relative;
  color: #606266;
}
hr{
  border: none;
  border-top: 1px solid #c7c7c7;
}
.title {
  position: absolute;
  top: 0;
  left: 10px;
  background: #fff;
  padding: 0 5px;
}
</style>