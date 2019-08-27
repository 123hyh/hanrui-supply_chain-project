<template>
  <el-container class="CustomPubData">
    <el-aside width="200px">
      <el-row class="tac">
        <el-col>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              :index="menu.menuName"
              :key="index"
              v-for="(menu,index) in SubMenus"
              @click.native="clickMenu(menu.menuCode, menu.menuName)"
            >
              <i class="el-icon-arrow-right"></i>
              <span
                :class="{'set-menu-color': route.location === menu.menuCode}"
                slot="title"
              >{{menu.menuName}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <div class="table">
        <div class="  breadcrumb-navigation">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item,i) of [{label: '仓储管理(深圳)'},{label: '仓储物流基础资料'},{label: breadcrumbTitle}]"
              :key="i"
            >{{item.label}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <components :is='component'></components>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import levelThreeMenuMixins from '@/assets/js/mixins/levelThreeMenu.js'

export default {
  mixins: [levelThreeMenuMixins],
  provide () {
    return {
      path: this.route
    }
  },
  data () {
    return {
      breadcrumbTitle: '发运路线',
      component: 'M071105',
      SubMenus: [],
      route: {
        location: 'M071105'
      },
    }
  },
  computed: {
  },
  methods: {
    clickMenu (menu, name) {
      this.breadcrumbTitle = name;
      this.component = menu;
      this.route.location = menu
    },
  },
  components: {
    'M071105': () => import('@/components/views/basicdata/ShippingRouteList.vue'), //发运路线
    // 'M071101': () => import('@/components/views/basicdata/PackageTypeList.vue'), //包装种类
    'M071102': () => import('@/components/views/basicdata/TrainNumberList.vue'), //车次
    'M071103': () => import('@/components/views/basicdata/CarCheckList.vue'), //查车登记
    'M071104': () => import('@/components/views/basicdata/WarehouseQuotationList.vue'), // 仓储报价单
    // 'M071106': () => import('@/components/views/basicdata/MaterielLogisticsList.vue'), // 物料物流
  }
}
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
.set-menu-color {
  color: #409eff;
}
</style>
