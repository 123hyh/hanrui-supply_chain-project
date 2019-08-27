<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        :btnObj="btnObj"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
        <el-table-column
          v-for='item in tableconfig'
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align='center'
        >
          <!-- :formatter="func(item)" -->
        </el-table-column>
      </el-table>
      <div class="pagination">
        <pagination
          @handlePageChange="handleChange"
          :count="ruleForm.total"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'
import tableconfig from '@/domain/tableconfig/commerce/EntrustOrder'

export default {
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "委托订单编码", moduleBind: "entrustOrderNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "委托方名称", moduleBind: "clientName", isInput: true },
      ]
    },
  },
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    tableData: [],
    tableconfig,
    menuName: '委托订单',
    curRowData: '',
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    },

    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "修改" },
      { type: "delete", label: "删除" },
    ]
  }),
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // func (item) {
    //   if (item.prop == 'status') {
    //     return this.statusformatter
    //   }
    //   if (item.prop == 'consignmentCollection') {
    //     return this.formatterconsignmentCollection
    //   }
    //   if (item.prop == 'deliverGoods') {
    //     return this.deliverGoodsformatter
    //   }
    //   if (item.prop == 'consignmentPayment') {
    //     return this.consignmentPaymentformatter
    //   }
    //   if (item.prop == 'pickUpGoods') {
    //     return this.pickUpGoodsformatter
    //   }
    // },
    // statusformatter (row, column) {
    //   if (row.status == '10') {
    //     return '新增'
    //   }
    //   if (row.status == '20') {
    //     return '提交'
    //   }
    //   if (row.status == '30') {
    //     return '审核'
    //   }
    // },
    // formatterconsignmentCollection (row, column) {
    //   if (row.consignmentCollection) {
    //     return '是'
    //   } else {
    //     return '否'
    //   }
    // },
    // deliverGoodsformatter (row, column) {
    //   if (row.deliverGoods) {
    //     return '是'
    //   } else {
    //     return '否'
    //   }
    // },
    // consignmentPaymentformatter (row, column) {
    //   if (row.consignmentPayment) {
    //     return '是'
    //   } else {
    //     return '否'
    //   }
    // },
    // pickUpGoodsformatter (row, column) {
    //   if (row.pickUpGoods) {
    //     return '是'
    //   } else {
    //     return '否'
    //   }
    // },
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.queryentrustorderSearch(this.ruleForm);
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {}; // 清空当前行数据
        let Line = this.tableData.filter(e => (e[this.$route.query.key] == this.$route.query.code))[0] || '' // 选中行
        this.$refs.moviesTable.setCurrentRow(Line);
        // if(this.$route.query.key && this.$route.query.code && !Line){
        // 	this.ruleForm[this.$route.query.key] = this.$route.query.code
        // 	const {data} = await api.queryentrustorderSearch(this.ruleForm);
        // 	this.tableData = data.list;
        // 	this.ruleForm.total = data.count;
        // 	this.curRowData = {}; // 清空当前行数据
        //   	this.$refs.moviesTable.setCurrentRow(this.tableData.filter(e=>(e[this.$route.query.key] == this.$route.query.code))[0]||'');
        // }
      } catch (e) {
        console.log(e)
      }
    },
    goStartPage () {
      this.ruleForm.pageIndex = 1; //页签调到第一页
      this.queryData();
    },
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
      var obj = null;
      return function (type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    handleBtnClickObj () {
      return {
        search () {
          this.goStartPage();
        },
        add () {
          sessionStorage.setItem('btnType', 'create');
          this.addbreadCrumbsList({
            title: '/委托订单信息',
            data: { formData: '', status: "create" },
            path: '/EntrustOrderForm'
          });
          this.handleJump("create");
        },
        async update () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.warning('请选择要修改的数据');
          } else {
            sessionStorage.setItem('btnType', 'update');
            const { data } = await api.searchOneentrustorderData(this.curRowData.entrustOrderNo);
            // sessionStorage.curRowData = JSON.stringify(data);
            this.addbreadCrumbsList({
              title: '/委托订单信息',
              data: { formData: data, status: "update" },
              path: '/EntrustOrderForm'
            });
            this.handleJump("update");
          }
        },
        delete () {
          if (JSON.stringify(this.curRowData) == '{}') {
            this.$message.warning('请选择要删除的数据')
          } else {
            this.$alert('删除不可恢复，是否确定删除？', '删除', {
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '执行中...';
                  setTimeout(() => {
                    // 删除
                    api.deleteentrustorderData(this.curRowData.entrustOrderNo)
                      .then(res => {
                        if (res) {
                          this.$message.success('删除成功');
                          this.goStartPage();
                          // 提交成功后...
                          // this.$alert('删除成功', '删除', {
                          // 	confirmButtonText: '确定',
                          // 	callback: action => {
                          // 		this.goStartPage();
                          // 		done();
                          // 	}
                          // })
                        }
                      })
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done()
                }
              }
            });
          }
        }
      };
    },
    handleJump (param) {
      this.$router.push({
        name: "EntrustOrderForm",
        params: {
          jumpType: param
        }
      });
    },
    handleChange (paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;
      this.queryData();
    },
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.handleBtnClick('update');
    },
  },
  created () {
    this.goStartPage()
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
