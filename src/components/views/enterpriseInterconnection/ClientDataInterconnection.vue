<template>
  <el-container>
    <el-aside width="11rem">
      <el-menu
        default-active
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item
          :index="menu.menuName"
          :key="index"
          v-for="(menu,index) in SubMenus"
          @click.native="handleMenuClick(menu)"
        >
          <i class="el-icon-arrow-right"></i>
          <span
            :class="{'set-menu-color': route.location === menu.menuCode}"
            slot="title"
          >{{menu.menuName}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="table">
        <div class="breadcrumb-navigation">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item,i) of [{label: '政企互联'},{label: '客户数据互联'},{label: breadcrumbTitle}]"
              :key="i"
            >{{item.label}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <component :is="childName"></component>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import levelThreeMenuMixins from '@/assets/js/mixins/levelThreeMenu.js'

export default {

  mixins: [levelThreeMenuMixins],

  data: _ => ({

    // 表格数据
    tableData: [],

    // 侧栏数据
    SubMenus: [],

    route: {
      location: 'M110301'
    },

    childName: "WarehousingDetail",

    childConfig: {
      M110301: "WarehousingDetail",
      M110302: "OutboundDetails",
      M110303: "JustInTimeInventory",
    },

    breadcrumbTitle: "入库明细表"

  }),

  created () {
    // 获取侧边栏菜单
    this.SubMenus = this.levelThreeMenuList[this.$route.path.slice(1)]
  },


  methods: {

    handleMenuClick ({ menuCode, menuName } = {}) {
      this.childName = this.childConfig[menuCode];
      this.route['location'] = menuCode;
      this.breadcrumbTitle = menuName;
    },

    //侧栏控件点击事件
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  
  components: {
    WarehousingDetail: _ => import("@/components/views/enterpriseInterconnection/WarehousingDetail.vue"), // 入库明细
    OutboundDetails: _ => import('@/components/views/enterpriseInterconnection/OutboundDetails.vue'), // 出库明细
    JustInTimeInventory: _ => import('@/components/views/enterpriseInterconnection/JustInTimeInventory.vue') // 即时库存
  },

  provide () {
    return {
      // formEvents: this.formEvents,
      // 向 子孙组件 queryBar.vue 注入当前点击三级菜单的path
      path: this.route
    }
  }
};
</script>

<style scoped>
.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.el-menu {
  border: 0px;
  height: 36px;
  line-height: 36px;
}

.el-menu > li {
  height: 36px;
  line-height: 36px;
}
.el-aside {
  overflow: visible;
}
.set-menu-color {
  color: #409eff;
}
</style>
