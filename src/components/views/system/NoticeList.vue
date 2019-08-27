<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="formConfig"
        :btnObj="btnObj"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @row-click="clickRow"
        ref="moviesTable"
      >
        <el-table-column
          v-for='item in tableconfig'
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
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
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'
export default {
  components: {
    QueryBar,
    Pagination
  },
  data: () => ({
    menuName: '系统公告',
    formConfig: [
      { label: "公告名称", moduleBind: "title", isInput: true }
    ],
    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新建发布" },
      // { type: "update", label: "修改" },
      { type: "delete", label: "删除" },
    ],
    tableconfig: [
      {
        prop: 'itemCode',
        label: '公告编码',
        width: '200',
      },
      {
        prop: 'title',
        label: '公告名称',
        width: '200',
      },
      {
        prop: 'publicTime',
        label: '公告时间',
        width: '200',
      }],
    tableData: [],
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    },
    curRowData: ''
  }),
  methods: {
    //搜索列表数据
    async queryData () {
      try {
        const { data } = await api.querySearch("/notification", this.ruleForm)
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {}; // 清空当前行数据
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
          this.handleJump("create");
          // sessionStorage.setItem('btnType', 'create');
        },
        // async update() {
        // 	if(JSON.stringify(this.curRowData)=='{}'){
        // 		this.$message.warning('请选择要修改的数据');
        // 	}else{
        // 		this.handleJump("update");
        // 		sessionStorage.setItem('btnType', 'update');
        // 		const { data } = await api.searchOneentrustorderData(this.curRowData.entrustOrderNo);
        // 		sessionStorage.curRowData = JSON.stringify(data);
        // 	}
        // },
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
                    api.deleteData('/notification', this.curRowData.itemCode)
                      .then(res => {
                        if (res) {
                          // 提交成功后...
                          this.$alert('删除成功', '删除', {
                            confirmButtonText: '确定',
                            callback: action => {
                              this.goStartPage();
                              done();
                            }
                          })
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
        name: "NoticeEdit",
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
