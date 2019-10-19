<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <!-- 一级菜单 -->
      <template v-for="(item,i) in IndexMenuList">

        <!-- 有二级菜单 -->
        <template v-if="item.subs.length">
          <el-submenu
            :index="item.menuCode"
            :key="item.menuCode"
            @click.native="clickMenuToggleIcon(i,$event)"
          >
            <template slot="title">
              <i :class="'menu-icon-'+i" :data-icon-index="i"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>
            
            <!-- 显示二级菜单 -->
            <template v-for="subItem in item.subs">

              <!-- 目前只显示到二级， 注释一下subs -->

              <!-- <el-submenu v-if="subItem.subs" :index="subItem.menuCode" :key="subItem.menuCode">
                <template slot="title">{{ subItem.menuName }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.menuCode"
                >{{ threeItem.menuName }}</el-menu-item>
              </el-submenu> -->

              <!-- TODO: 取消绑定 协议管理 -->
              <el-menu-item
                :index="subItem.menuCode"
                :key="subItem.menuCode"
                style="padding-left: 70px"
                @click="clickMenu(subItem.menuName)"
              >{{ subItem.menuName }}</el-menu-item>
            </template>
          </el-submenu>
        </template>

        <!-- 无二级菜单 -->
        <template v-else>
          <el-menu-item
            :index="item.menuCode"
            :key="item.menuCode"
            @click.native="clickMenuToggleIcon(0,$event)"
          >
            <div>
              <i :class="'menu-icon-0-index-1'" :data-icon-index="0"></i>
              <span slot="title">{{ item.menuName }}</span>
            </div>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
import appHelper from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'
// 引入vuex
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  data() {
    return {
      collapse: false,
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
		...mapGetters([
      'openMenu',
      'IndexMenuList'
		]),
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
	updated(){
		this.clickMenuToggleIcon(+this.$route.path.slice(3,4));
	},
  methods: {
		...mapMutations([
			'addOpenMenuList',
		]),
    clickMenu(menuName) {
      // TODO: 点击菜单修改全局数据
			this.addOpenMenuList(menuName);
    },
    // 点击菜单高亮显示
    clickMenuToggleIcon(current, e) {
			if ( !e ) { // 处理刷新后菜单高亮重复首页
				if( !current ) return; // 如果是首页不进行处理
				let className = document.getElementsByClassName(`menu-icon-0-index-1`)[0];
				if( !className ) return; // 二次触发直接 return
				( document.getElementsByClassName(`menu-icon-0-index-1`)[0] ).className = 'menu-icon-0';
				let activeIcon = document.getElementsByClassName(`menu-icon-${current}`)[0];
				activeIcon.className = `menu-icon-${current}-index-1`;
				activeIcon.nextSibling.style.color = '#20A0FF';
				return ;
			}
			let i = e.currentTarget.firstElementChild.firstElementChild;
			if ( i.className.includes(`menu-icon-${current}-index-1`) && current !== 0 ) return; // 重复点击该菜单的时候直接 return 不做处理;
      {
				// 取消前一个高亮的菜单
        let iconList = [...document.querySelectorAll("[data-icon-index]")];
        for (let elem of iconList) {
          if (elem.className.includes("index-1")) {
            let eClass = elem.className;
            elem.className = eClass.slice(0, -8);
            elem.nextSibling.style.color = "#303133";
            break;
          }
        }
      }
      i.nextSibling.style.color = "#20A0FF";
      i.className = `menu-icon-${current}-index-1`;
    }
  }
};
</script>

<style  lang='less'>

.sidebar {
  
  height: 100%;
  height: 100%;
  overflow-y: hidden;
  box-sizing: border-box;
 

 > ul {
  height: 100%;
  overflow: auto;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.menu-icon(@x,@y) {
  display: inline-block;
  width: 25px;
  height: 20px;
  margin-right: 10px;
  background-image: url(~@/assets/img/menu-icon.png);
  background-repeat: no-repeat;
  background-position: @x @y;
}
// 首页
.menu-icon-0 {
  .menu-icon(-92px, -85px);
}
.menu-icon-0-index-1 {
  .menu-icon(-128px, -85px);
}
// 基础资料
.menu-icon-1 {
  .menu-icon(-19px, -28px);
}
.menu-icon-1-index-1 {
  .menu-icon(-55px, -28px);
}
// 业务
.menu-icon-2 {
  .menu-icon(-19px, -85px);
}
.menu-icon-2-index-1 {
  .menu-icon(-55px, -85px);
}
// 风控
.menu-icon-3 {
  .menu-icon(-91px, -28px);
}
.menu-icon-3-index-1 {
  .menu-icon(-128px, -28px);
}
// 商务管理
.menu-icon-4 {
  .menu-icon(-164px, -85px);
}
.menu-icon-4-index-1 {
  .menu-icon(-200px, -85px);
}
// 仓储
.menu-icon-5 {
  .menu-icon(-19px, -200px);
}

.menu-icon-5-index-1 {
  .menu-icon(-55px, -200px);
}
// 关务
.menu-icon-6 {
  .menu-icon(-165px, -28px);
}
.menu-icon-6-index-1 {
  .menu-icon(-201px, -28px);
}
// 仓储
.menu-icon-7 {
  .menu-icon(-19px, -200px);
}
.menu-icon-7-index-1 {
  .menu-icon(-55px, -200px);
}
// 结算
.menu-icon-8 {
  .menu-icon(-91px, -143px);
}
.menu-icon-8-index-1 {
  .menu-icon(-128px, -144px);
}
// 智能报表
.menu-icon-9{
  .menu-icon(-91px, -200px)
}
.menu-icon-9-index-1{
  .menu-icon(-128px, -200px)
}
// 系统
.menu-icon-10{
  .menu-icon(-165px, -200px);
}
.menu-icon-10-index-1{
  .menu-icon(-200px, -200px)
}
.menu-icon-11 {
  .menu-icon(-164px, -142px);
}
.menu-icon-11-index-1 {
  .menu-icon(-201px, -143px);
}
}

</style>
