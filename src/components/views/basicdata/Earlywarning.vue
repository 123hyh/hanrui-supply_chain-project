<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 智能预警设置
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-aside width="14rem">
        <!-- <div>预警平台</div> -->
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
          <span>{{breadcrumbTitle}}</span>
        </p>
        <form-component
          :inputKey="ruleConfig"
          :formModel="ruleData"
          @handlerFormConfigClickSearch="handlerSearchClick"
        ></form-component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import levelThreeMenuMixins from "@/assets/js/mixins/levelThreeMenu.js";
import FormComponent from "@/components/common/FormConfig.vue";
export default {
  components: {
    FormComponent,
  },
  mixins: [levelThreeMenuMixins],
  data() {
    return {
      SubMenus: [], // 侧栏数据
      menuCode: "", // 当前项
      breadcrumbTitle: "",
      ruleConfig:[],
      ruleData:{}
    };
  },
  created() {
    // 加载列表数据
    this.init();
  },
  computed: {},
  methods: {
    init() {
      this.menuCode = "M100901";
      this.breadcrumbTitle = "商机管理";
    },
    // 菜单列标事件
    handleMenuClick({ menuCode, menuName } = menu) {
      this.menuCode = menuCode;
      this.breadcrumbTitle = menuName;
    },
    // 点选
    handlerSearchClick(){}
  }
};
</script>

<style scoped>
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
</style>
