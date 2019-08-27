<template>
  <el-container class="CustomPubData">
    <el-aside width="14rem">
      <el-row class="tac">
        <el-col>
          <el-menu
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item
              :index="menu.menuName"
              :key="index"
              v-for="(menu, index) in SubMenus"
              @click.native='handlerMenuItemClick(menu)'
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
      <div class="breadcrumb-navigation">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item,i) of [{label: '商务管理'},{label: '订单基础资料'},{label: breadcrumbTitle}]"
            :key="i"
          >{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <component
        :is='childName'
        :btnObj='btnObj'
      ></component>
    </el-main>
  </el-container>
</template>

<script>

import appHelper from '@/assets/js/appHelper'
import levelThreeMenuMixins from '@/assets/js/mixins/levelThreeMenu.js'
//import MaterielCustomForm from "@/components/views/basicdata/MaterielCustomForm"
import Pagination from '@/components/common/Pagination'

export default {
  mixins: [levelThreeMenuMixins],
  provide () {
    return {
      path: this.route
    }
  },
  components: {
    Pagination,
    // 菜单组件
    ControlledGoodsList: () => import('@/components/views/basicdata/ControlledGoodsList.vue'), // 管制品清单
    CalculatingItemFormula: () => import('@/components/views/basicdata/CalculatingItemFormula.vue'),//计费项目公式
    BusinessProtocolSolution: ()=> import('@/components/views/commerce/BusinessProtocolSolution.vue') // 业务协议方案

  },
  data () {
    return {
      delVisible: false,
      form: {
        name: '',
        date: '',
        address: ''
      },

      // 表格数据
      tableData: [],
      totalCount: '', //数据总数
      columnDataTable: [],
      // 查询条件
      queryMaterielCustom: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      popForm: false,

      breadcrumbTitle: '管制品清单', // 面包屑默认
      // 侧栏数据
      SubMenus: [],
      childName: 'ControlledGoodsList',
      route: {
        location: 'M040101'
      },
      //	查询栏
      btnObj: []
    }
  },
  created () {
    //this.handleSelect('物料海关信息'); //改变
    // 加载列表数据
    this.queryData()
  },
  methods: {
    handlerMenuItemClick ({ menuCode, menuName } = data) {
      this.breadcrumbTitle = menuName;
      let obj = {
        M040101: 'ControlledGoodsList',
        M040102: 'CalculatingItemFormula',
        M040103: 'BusinessProtocolSolution'
      };
      this.childName = obj[menuCode];
      this.route.location = menuCode
    },
    //侧栏控件点击事件
    handleSelect (key, keyPath) {

    },

    queryPage () {
      appHelper
        .query('/businesscontact/search', this.queryMaterielCustom)
        .then(result => {
          this.tableData = result.data.list
          this.totalCount = this.queryMaterielCustom.total = result.data.count
        })
    },

    queryData () {
      this.queryMaterielCustom.pageIndex = 1

      this.queryPage()
    },
    // 翻页处理
    goPage: function (index) {
      let pager = this.$refs.pager
      let vmTblData = this.tableData

      this.$axios
        .post(appHelper.apiPath('/businesscontact/search'), {
          pageIndex: index,
          pageSize: pager.pageSize
          //   queryMap: {},
          //   sorting: ["string"]
        })
        .then(function (result) {
          // 替换数据
          vmTblData.splice(0, vmTblData.length, ...result.data.list)
          // 设置分页
          pager.total = result.data.total
        })
    },

    goCreate () {
      this.formEvents.$emit('openform')
    },
    // 修改
    goUpdate () {
      if (this.$store.state.curRowData.code) {
        this.$store.commit('btnType', 'update'); //判断是否新增修改删除
        this.$router.push('HkscheduleBaseForm')
      } else {
        this.$message.error('请选择要修改的数据');
      }
    },
    // 删除
    goDelete () {
      if (this.$store.state.curRowData.code) {
        this.delVisible = true;
      } else {
        this.$message.error('请选择要删除的数据');
      }
    },
    // 确定删除
    deleteRow () {
      // 删除
      let self = this;
      appHelper
        .deleteData("/hkschedulebase/" + this.$store.state.curRowData.code)
        .then(function (res) {
          console.log(res)
          if (res.status == '200') {
            // 提交成功后...
            self.$alert('删除成功', '删除', {
              confirmButtonText: '确定',
              callback: action => {
                self.queryPage(); //数据刷新
                self.delVisible = false;
              }
            });
          }
        });
    },
    closeForm () {
      this.popForm = false
    },
    // 选中当前行
    clickRow (row) {
      // 获取修改内容
      this.$store.commit('curRowData', row)
      this.$refs.moviesTable.toggleRowSelection(row)
    },
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
.breadcrumb-btoom {
  margin-bottom: 15px;
}
.set-menu-color {
  color: #409eff;
}
</style>
