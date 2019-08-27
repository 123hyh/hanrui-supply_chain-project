<template>
  <section class="section-main">
    <!-- 头部 -->
    <header-component></header-component>
    <div class="content-main">
      <!-- 侧栏菜单 -->
      <sidebar-component></sidebar-component>
      <!-- 主体 -->
      <main
        class="content-box"
        :class="{'content-collapse':collapse}"
      >
        <!-- 页签 -->
        <tags-component></tags-component>
        <div class="content">
          <!-- <transition name="move" mode="out-in"> -->
          <!-- <keep-alive :include="buffer"> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
          <!-- </transition> -->
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import HeaderComponent from "@/components/common/Header.vue";
import SidebarComponent from "@/components/common/Sidebar.vue";
import TagsComponent from "@/components/common/Tags.vue";
import bus from "./bus";
import 'echarts';
import 'echarts-liquidfill'
import { mapMutations, mapGetters } from "vuex";
import { instance as service } from '@/assets/js/initApi.js'

export default {
  data () {
    return {
      /**
       * @param buffer 需缓存组件的name集合
       */
      buffer: [],
      collapse: false
    };
  },
  computed: {
    ...mapGetters(["getListBtn"])
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"])
  },
  components: {
    HeaderComponent,
    SidebarComponent,
    TagsComponent
  },
  created () {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    // 设置页面刷新 后 防止重新登录，从localStorage中取出之前存取的token值
    service.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
  }
};
</script>
<style scoped lang='less'>
.section-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-main {
  width: 100vw;
  height: calc(100vh - 70px);
  overflow: hidden;
}
</style>
