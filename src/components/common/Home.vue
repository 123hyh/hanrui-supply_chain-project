<template>
  <section class="section-main">
    <!-- 头部 -->
    <header-component></header-component>
    <div class="content-main">
      <!-- 侧栏菜单 -->
      <sidebar-component></sidebar-component>
      <!-- 主体 -->
      <main :class="{'content-collapse':collapse}" class="content-box">
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
import HeaderComponent from '@/components/common/Header.vue'
import SidebarComponent from '@/components/common/Sidebar.vue'
import TagsComponent from '@/components/common/Tags.vue'
import bus from './bus'
import 'echarts'
import 'echarts-liquidfill'
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      /**
       * @param buffer 需缓存组件的name集合
       */
      buffer: [],
      collapse: false
    }
  },
  computed: {
    ...mapGetters(['getListBtn'])
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList'])
  },
  components: {
    HeaderComponent,
    SidebarComponent,
    TagsComponent
  },
  created() {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>
<style  lang='less'>
.section-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content-main {
    position: relative;
    width: 100vw;
    height: calc(100vh - 70px);
    overflow: hidden;
  }
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 0px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
  }

  .content {
    width: 100%;
    min-width: 1300px;
    height: calc(100% - 30px);
    padding: 10px 0 10px 10px;
    overflow: auto;
    box-sizing: border-box;
  }

  .content-collapse {
    left: 65px;
  }
}
</style>
