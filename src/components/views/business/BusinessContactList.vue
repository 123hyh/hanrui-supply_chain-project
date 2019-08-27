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
              v-for="(item,i) of [{label: '业务管理'},{label: '业务基础资料'},{label: breadcrumbTitle}]"
              :key="i"
            >{{item.label}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <component
          :is="childName"
          :btnObj='btnObj'
        ></component>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import appHelper from "@/assets/js/appHelper";
import levelThreeMenuMixins from '@/assets/js/mixins/levelThreeMenu.js'

export default {
  mixins: [levelThreeMenuMixins],
  data () {
    return {
      url: "./vuetable.json",
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,

      // 表格数据
      tableData: [],
      // 查询条件
      queryBusinessContact: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },

      popForm: false,

      //公用表格弹窗组件
      popPublicForm: false,

      // 侧栏数据
      SubMenus: [],
      route: {
        location: 'M020101'
      },
      childName: "CarrierBaseList",
      childConfig: {
        M020101: "CarrierBaseList",
        M020104: "CustomerList",
        M020105: "SupplierBaseList",
        M020109: 'BlackList'
      },
      breadcrumbTitle: "承运商基础信息",
      //	查询栏
      btnObj: [
        { type: "search", label: "查询" },
        { type: "add", label: "新增" },
        { type: "update", label: "修改" },
        { type: "delete", label: "删除" }
      ]
    };
  },
  created () {
    // 获取侧边栏菜单
    this.SubMenus = this.levelThreeMenuList[this.$route.path.slice(1)]
    // 加载列表数据
    this.queryData();
  },
  computed: {
    data () {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    handleMenuClick ({ menuCode, menuName } = menu) {
      this.childName = this.childConfig[menuCode];
      this.route['location'] = menuCode;
      this.breadcrumbTitle = menuName;
    },
    //侧栏控件点击事件
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },

    queryPage () {
      appHelper
        .query("/businesscontact/search", this.queryBusinessContact)
        .then(result => {
          this.tableData = result.data.list;
          this.queryBusinessContact.total = result.data.count;
        });
    },

    queryData () {
      this.queryBusinessContact.pageIndex = 1;

      this.queryPage();
    },
    // 翻页处理
    goPage: function (index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/businesscontact/search"), {
          pageIndex: index,
          pageSize: pager.pageSize
          //   queryMap: {},
          //   sorting: ["string"]
        })
        .then(function (result) {
          // 替换数据
          vmTblData.splice(0, vmTblData.length, ...result.data.list);
          // 设置分页
          pager.total = result.data.total;
        });
    },

    goCreate () {
      this.formEvents.$emit("openform");
    },
    //显示公用弹窗组件
    showPublicForm () {
      console.log(123);
      this.popPublicForm = true;
      this.$store.commit("popPublicForm", this.popPublicForm);
      // this.formEvents.$emit('popPublicForm');
    },
    goDelete () { },
    goUpdate () { },
    closeForm () {
      this.popForm = false;
    },
    // 关闭公用弹窗组件
    closePublicForm () {
      this.popPublicForm = false;
    },

    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData () {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    search () {
      this.is_search = true;
    },
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    handleEdit (index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete (index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll () {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit () {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  components: {
    //	子菜单组件
    CarrierBaseList: () =>
      import("@/components/views/basicdata/CarrierBaseList.vue"), // 承运商基础信息
    CustomerList: () => import("@/components/views/basicdata/CustomerList.vue"), // 客户
    SupplierBaseList: () =>
      import("@/components/views/basicdata/SupplierBaseList.vue"), //	供应商
    BlackList: () => import('@/components/views/basicdata/BlackList.vue') // 黑名单
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
