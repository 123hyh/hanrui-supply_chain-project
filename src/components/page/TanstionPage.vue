<template>
  <section
    class="tanstionPage"
    @click="jumpIndexPage"
  ></section>
</template>
<script>
export default {
  data: () => ({
    time: ''
  }),
  mounted () {
    this.time = setTimeout(() => {
      this.jumpIndexPage()
    }, 1000 * 10);
  },
  methods: {
    jumpIndexPage () {
      clearTimeout(this.time)
      this.$router.push({
        path: '/M00'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tanstionPage {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-image: url(~@/assets/img/login.tanstion.jpg);
  background-size: 100% 100%;
}
</style>
