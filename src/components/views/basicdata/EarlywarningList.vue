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
        <el-form
          ref="form"
          label-position="top"
          label-width="80px"
        >
          <el-form-item label>
            <el-radio-group v-model="radioData">
              <el-radio
                v-for="(option,index) in currentConfig.radiolist"
                :key="index"
                :label="index"
              >{{option}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div style="text-align: right;margin-bottom: 20px;">
          <el-button
            type
            style="margin-left:20px"
            @click="add"
          >增加</el-button>
          <el-button
            type
            style="margin-left:20px"
            @click="update"
          >修改</el-button>
          <el-button
            type
            style="margin-left:20px"
            @click="dalete"
          >删除</el-button>
        </div>
        <!-- 表格 -->
        <table-component
          :tableDataKey="table.config"
          :tableData="table.data.list"
          @row-click="clickRow"
          @row-dblclick="dblclickTableRow"
        ></table-component>
        <!-- 分页 -->
        <pagination
          ref="pagination"
          :count="table.data.count"
          @handlePageChange="handleChange"
        ></pagination>
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
        breadcrumbTitle: "",
        radiolist: []
      },
      Allconfig: {
        M100901: {
          breadcrumbTitle: "商机管理",
          radiolist: ["保护截止日期"]
        },
        M100902: {
          breadcrumbTitle: "委托方",
          radiolist: ["允许超帐期", "允许超额度", "不允许下单", "是否黑名单"]
        },
        M100903: {
          breadcrumbTitle: "协议管理",
          radiolist: ["到期前三个月提醒"]
        },
        M100904: {
          breadcrumbTitle: "担保管理",
          radiolist: ["截止日撤保"]
        },
        M100905: {
          breadcrumbTitle: "保证金（押金）管理",
          radiolist: ["截止日撤保"]
        },
        M100906: {
          breadcrumbTitle: "无担保授信",
          radiolist: ["截止日撤保"]
        },
        M100907: {
          breadcrumbTitle: "抵（质）押物管理",
          radiolist: ["截止日撤保"]
        },
        M100908: {
          breadcrumbTitle: "买方接（提）货",
          radiolist: ["要求发货日期", "要求到货日期"]
        },
        M100909: {
          breadcrumbTitle: "卖方交（发）货",
          radiolist: ["要求提货日期"]
        },
        M100910: {
          breadcrumbTitle: "深圳发货通知单",
          radiolist: ["要求到货时间"]
        },
        M100911: {
          breadcrumbTitle: "深圳发运单",
          radiolist: ["计划送达时间"]
        },
        M100912: {
          breadcrumbTitle: "进/出口报关计划单",
          radiolist: ["计划装车日期"]
        },
        M100913: {
          breadcrumbTitle: "委托付款单",
          radiolist: ["计划付款日期"]
        },
        M100914: {
          breadcrumbTitle: "应收结算单",
          radiolist: ["应收日期"]
        },
        M100915: {
          breadcrumbTitle: "付款申请单",
          radiolist: ["计划付款日期"]
        }
      },
      radioData: {},
      table: {
        config: [
          {
            prop: "billNo",
            label: "预警编码",
            width: "150"
          },
          {
            prop: "bizName",
            label: "预警业务名称",
            width: "150"
          },
          {
            prop: "jobName",
            label: "预警名称",
            width: "150"
          },
          {
            prop: "cronExpression",
            label: "CRON表达式",
            width: "150"
          },
          {
            prop: "jobDescription",
            label: "描述",
            width: "150"
          },
          {
            prop: "jobStatusName",
            label: "状态",
            width: "150"
          }
        ],
        data: {
          list: [],
          count: 0
        },
        rowData: {}
      }
    };
  },
  created () {
    // 加载列表数据
    this.init();
  },
  computed: {},
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    init () {
      this.menuCode = "M100901";
    },
    // 菜单列标事件
    handleMenuClick ({ menuCode, menuName } = menu) {
      this.menuCode = menuCode;
    },
    handleChange () { },
    clickRow (row) {
      this.curRowData = row;
    },
    dblclickTableRow (row) {
      this.clickRow(row);
    },
    add () {
      this.handleJump("create", "");
    },
    update () {
      if (JSON.stringify(this.table.rowData) == "{}") {
        this.$message.warning("请选择要修改的数据");
      } else {
        this.handleJump("update", this.table.rowData);
      }
    },
    dalete () { },
    // 跳转操作
    handleJump (param, data) {
      this.addbreadCrumbsList({
        title: "/智能预警设置",
        data: { status: param, formData: data },
        path: "/EarlywarningFrom"
      });
      this.$router.push({
        name: "EarlywarningFrom"
      });
    }
  },
  watch: {
    menuCode (val) {
      this.radioData = "";
      this.currentConfig = this.Allconfig[val];
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
