<template>
  <section
    :class="['tanstionPage', isurl ? 'urlbg' : '']"
    @click="jumpIndexPage"
  ></section>
</template>
<script>
export default {
  data: () => ({
    time: '',
    isurl:false
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
  },
  created(){
    if(window.location.host.indexOf("dianmaotong.cn") != -1 || window.location.host.indexOf("120.78.169.181") != -1){
      this.isurl = true
    }
  }
}
</script>
<style lang="less">
.tanstionPage {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-image: url(~@/assets/img/tanstion_dev.jpg);
  background-size: 100% 100%;
}
.urlbg{
  background-image: url(~@/assets/img/tanstion.webp);
}
</style>
