<template>
  <div class="earlywarning">
    <breadcrumb-navigation />
    <el-container>
      <el-aside width="14rem">
        <el-menu default-active>
          <el-menu-item
            :index="menu.menuName"
            :key="index"
            v-for="(menu,index) in SubMenus"
            @click.native="handleMenuClick(menu)"
          >
            <i class="el-icon-arrow-right"></i>
            <span
              :class="{'set-menu-color': menuCode === menu.menuCode}"
              slot="title"
            >{{menu.menuName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <p class="cut-off-rule">
          <span>{{currentConfig.breadcrumbTitle}}</span>
        </p>
        <component :is="childName"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import levelThreeMenuMixins from "@/assets/js/mixins/levelThreeMenu.js";
import FormComponent from "@/components/common/FormConfig.vue";
import TableComponent from "@/components/common/TabTable.vue";
import Pagination from "@/components/common/Pagination";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    FormComponent,
    TableComponent,
    Pagination
  },
  mixins: [levelThreeMenuMixins],
  data () {
    return {
      SubMenus: [], // 侧栏列表
      menuCode: "", // 当前项路由
      currentConfig: {
        breadcrumbTitle: "公司财务资料",
      },
      Allconfig: {
        M082001: {
          breadcrumbTitle: "公司财务资料",
        },
        M082002: {
          breadcrumbTitle: "委托方财务资料",
        },
        M082003: {
          breadcrumbTitle: "客户财务资料",
        },
        M082004: {
          breadcrumbTitle: "供应商财务资料",
        },
        M082005: {
          breadcrumbTitle: "承运商财务资料",
        }
      },
      childName:'CompanyInfoList',
      childConfig: {
        M082001: "CompanyInfoList",
        M082002: "ClientList",
        M082003: "CustomerList",
        M082004: 'SupplierBaseList',
        M082005: 'CarrierBaseList'
      },
      route: {
        location: 'M060120'
      },
    };
  },
  provide () {
    return {
      path: this.route
    }
  },
  created () {
    // 加载列表数据
    this.init();
  },
  computed: {
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    init () {
      this.menuCode = "M082001";
    },
    // 菜单列标事件
    handleMenuClick ({ menuCode, menuName } = menu) {
      this.menuCode = menuCode;
      this.childNam = ''
    },
  },
  components:{
    //	子菜单组件
    CompanyInfoList: () => import("@/components/views/basicdata/SeCompanyInfoList.vue"), // 公司
    ClientList: () => import("@/components/views/business/SeClientList.vue"), // 委托方
    CustomerList: () => import("@/components/views/basicdata/SeCustomerList.vue"), // 客户
    SupplierBaseList: () => import("@/components/views/basicdata/SeSupplierBaseList.vue"), //	供应商
    CarrierBaseList: () => import("@/components/views/basicdata/SeCarrierBaseList.vue"), // 承运商
  },
  watch: {
    menuCode (val) {
      this.currentConfig = this.Allconfig[val];
      this.childName = this.childConfig[val];
      this.route['location'] = val;
    }
  }
};
</script>

<style lang='less'>
/* .box {
  height: 100%;
} */
.earlywarning {
  .el-container {
    height: calc(100% - 34px);
  }
  .el-aside,
  .el-main {
    padding: 10px;
  }
  .el-menu {
    border: 0px;
    height: calc(100%);
    overflow: auto;
  }
  .el-menu > li {
    height: 36px;
    line-height: 36px;
  }
}
</style>
