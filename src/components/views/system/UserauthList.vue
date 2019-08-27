<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <div class="handle-box">
        <el-form
          :inline="true"
          :model="queryUserauth"
          ref="queryUserauth"
        >
          <el-form-item
            label="用户名称"
            prop="classifyName"
          >
            <el-input
              v-model="queryUserauth.menuCode"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="queryPage"
          >查询</el-button>
          <el-button
            type="primary"
            @click="goUpdate"
          >设置</el-button>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        :highlight-current-row="true"
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
        <el-table-column
          prop="userCode"
          label="用户编码"
          width="300px"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          width="300px"
        ></el-table-column>
        <el-table-column
          label="查看用户权限"
          width="200px"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看权限详情"
              placement="right"
            >
              <i
                @click="openRoleName(scope.$index, scope.row)"
                class="el-icon-view"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="queryUserauth.pageSize"
          :current-page.sync="queryUserauth.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryUserauth.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <userauth-form
      :show="popForm"
      :userroleauth="userroleauth"
      :allUserauth="allUserauth"
      :allAuth="allAuth"
      :seletree="seletree"
      @closeform="closeForm"
      @newTableData="getTableData"
    ></userauth-form>
  </div>
</template>

<script>
import Vue from 'vue'
import api from "@/assets/js/appHelper.js";
import UserauthForm from "./UserauthForm";

export default {
  components: {
    UserauthForm
  },
  data () {
    return {
      // 查询条件
      queryUserauth: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),
      // 表格数据
      tableData: [],
      // 所有权限菜单
      allUserauth: [],
      // 所有操作的权限
      allAuth: [],
      // 拥有的权限
      userroleauth: [],
      seletree: [],
      // 确认删除弹窗
      delVisible: false,
      // 弹窗是否关闭
      popForm: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 查看
    openRoleName (index, row) {
      this.clickRow(row);
      var _this = this;
      api.upapiKey("/userauth/" + row.userCode).then(result => {

        _this.seletree = [];
        _this.allUserauth.forEach(val => {
          result.data.forEach(e => {
            var json1 = { menuName: _this.bmMame(val, e.auth), subs: [] };
            if (val.menuCode == e.menuCode) {
              _this.seletree.push(json1);
            }
          });

          // (1)2
          var json1;
          val.subs.forEach(val2 => {
            result.data.forEach(e => {
              if (val2.menuCode == e.menuCode) {
                var json2 = { menuName: _this.bmMame(val2, e.auth), subs: [] };
                if (!json1) {
                  json1 = { menuName: _this.bmMame(val, ""), subs: [] };
                }
                json1.subs.push(json2);
              }
            });

            // (2)3
            var json2;
            val2.subs.forEach(val3 => {
              result.data.forEach(e => {
                if (val3.menuCode == e.menuCode) {
                  var json3 = {
                    menuName: _this.bmMame(val3, e.auth),
                    subs: []
                  };
                  if (!json2) {
                    json2 = { menuName: _this.bmMame(val2, ""), subs: [] };
                  }
                  json2.subs.push(json3);
                }
              });
            });
            if (json2) {
              if (!json1) {
                json1 = { menuName: _this.bmMame(val, ""), subs: [] };
              }
              json1.subs.push(json2);
            }
            // ----end

          });
          if (json1) {
            _this.seletree.push(json1);
          }
          // ----end

        });

        // 添加1
        // _this.allUserauth.forEach(val => {
        //   result.data.forEach(e => {
        //     var json1 = { menuName: _this.bmMame(val, e.auth), subs: [] };
        //     if (val.menuCode == e.menuCode) {
        //       _this.seletree.push(json1);
        //     }
        //   });
        // });

        // // 添加2
        // _this.allUserauth.forEach(val => {
        //   var json1;
        //   val.subs.forEach(val2 => {
        //     result.data.forEach(e => {
        //       if (val2.menuCode == e.menuCode) {
        //         var json2 = { menuName: _this.bmMame(val2, e.auth), subs: [] };
        //         if (!json1) {
        //           json1 = { menuName: _this.bmMame(val, ""), subs: [] };
        //         }
        //         json1.subs.push(json2);
        //       }
        //     });
        //   });
        //   if (json1) {
        //     _this.seletree.push(json1);
        //   }
        // });

        // // // 添加3
        // _this.allUserauth.forEach(val => {
        //   var json1;
        //   val.subs.forEach(val2 => {
        //     var json2;
        //     val2.subs.forEach(val3 => {
        //       result.data.forEach(e => {
        //         if (val3.menuCode == e.menuCode) {
        //           var json3 = {
        //             menuName: _this.bmMame(val3, e.auth),
        //             subs: []
        //           };
        //           if (!json2) {
        //             json2 = { menuName: _this.bmMame(val2, ""), subs: [] };
        //           }
        //           json2.subs.push(json3);
        //         }
        //       });
        //     });
        //     if (json2) {
        //       if (!json1) {
        //         json1 = { menuName: _this.bmMame(val, ""), subs: [] };
        //       }
        //       json1.subs.push(json2);
        //     }
        //   });
        //   if (json1) {
        //     _this.seletree.push(json1);
        //   }
        // });

        console.log(_this.seletree);

        _this.$store.commit("btnType", "select"); //判断是否新增修改删除
        _this.formEvents.$emit("openform"); // 子组件向父组件传参=>打开弹窗
      });
    },

    bmMame (obj, auth) {
      var _this = this;
      var menuName;
      var menuCode = obj.menuCode;
      // 变中文
      this.allUserauth.forEach(val => {
        if (val.menuCode == menuCode) {
          menuName = val.menuName;
          if (auth) {
            _this.allAuth.forEach(e => {
              if (auth.indexOf(e.functionCode) !== -1) {
                menuName += "\xa0\xa0\xa0[" + e.functionName + "]";
              }
            });
            // if (auth.indexOf("query;") !== -1) {
            //   menuName += "\xa0\xa0\xa0[查询]";
            // }
            // if (auth.indexOf("insert;") !== -1) {
            //   menuName += "\xa0\xa0\xa0[增加]";
            // }
            // if (auth.indexOf("update;") !== -1) {
            //   menuName += "\xa0\xa0\xa0[修改]";
            // }
            // if (auth.indexOf("delete;") !== -1) {
            //   menuName += "\xa0\xa0\xa0[删除]";
            // }
          }
        }
        val.subs.forEach(val2 => {
          if (val2.menuCode == menuCode) {
            menuName = val2.menuName;
            if (auth) {
              _this.allAuth.forEach(e => {
                if (auth.indexOf(e.functionCode) !== -1) {
                  menuName += "\xa0\xa0\xa0[" + e.functionName + "]";
                }
              });
              // if (auth.indexOf("query;") !== -1) {
              //   menuName += "\xa0\xa0\xa0[查询]";
              // }
              // if (auth.indexOf("insert;") !== -1) {
              //   menuName += "\xa0\xa0\xa0[增加]";
              // }
              // if (auth.indexOf("update;") !== -1) {
              //   menuName += "\xa0\xa0\xa0[修改]";
              // }
              // if (auth.indexOf("delete;") !== -1) {
              //   menuName += "\xa0\xa0\xa0[删除]";
              // }
            }
          }
          val2.subs.forEach(val3 => {
            if (val3.menuCode == menuCode) {
              menuName = val3.menuName;
              if (auth) {
                _this.allAuth.forEach(e => {
                  if (auth.indexOf(e.functionCode) !== -1) {
                    menuName += "\xa0\xa0\xa0[" + e.functionName + "]";
                  }
                });
                // if (auth.indexOf("query;") !== -1) {
                //   menuName += "\xa0\xa0\xa0[查询]";
                // }
                // if (auth.indexOf("insert;") !== -1) {
                //   menuName += "\xa0\xa0\xa0[增加]";
                // }
                // if (auth.indexOf("update;") !== -1) {
                //   menuName += "\xa0\xa0\xa0[修改]";
                // }
                // if (auth.indexOf("delete;") !== -1) {
                //   menuName += "\xa0\xa0\xa0[删除]";
                // }
              }
            }
          });
        });
      });
      return menuName;
    },

    //  查询用户
    queryUser () {
      api.querySearch("/user", this.queryUserauth).then(result => {
        this.tableData = result.data.list;
        this.queryUserauth.total = result.data.count;
      });
    },

    //查询所欲权限
    queryAuth () {
      api.get("/function/", "").then(res => {
        this.allAuth = res.data;
      });
    },

    getCname (authe) {
      var authc = "";
      this.allAuth.forEach(e => {
        if (authe == e.functionCode) {
          authc = e.functionName;
        }
      });
      return authc;
    },

    // 查询所有权限
    queryAllmenu () {
      // 构造符合条件的最底复选框
      var _this = this;
      api.getAllMenu().then(result => {
        this.allUserauth = result.data;
        this.allUserauth.forEach(val => {
          val.subs.forEach(val2 => {
            if (val2.functionCode) {
              val2.subs = [];
              var arr = val2.functionCode.split(";");
              if (arr.length > 0) {
                arr.length--;
              }
              arr.forEach(authe => {
                let json = {};
                json.menuCode = val2.menuCode + authe;
                json.fcode = val2.menuCode;
                json.menuName = _this.getCname(authe);
                val2.subs.push(json);
              });
              // if (val2.functionCode.indexOf("query;") !== -1) {
              //   let json = {};
              //   json.menuCode = val2.menuCode + "query;";
              //   json.fcode = val2.menuCode;
              //   json.menuName = "查询";
              //   val2.subs.push(json);
              // }
              // if (val2.functionCode.indexOf("insert;") !== -1) {
              //   let json = {};
              //   json.menuCode = val2.menuCode + "insert;";
              //   json.fcode = val2.menuCode;
              //   json.menuName = "增加";
              //   val2.subs.push(json);
              // }
              // if (val2.functionCode.indexOf("update;") !== -1) {
              //   let json = {};
              //   json.menuCode = val2.menuCode + "update;";
              //   json.fcode = val2.menuCode;
              //   json.menuName = "修改";
              //   val2.subs.push(json);
              // }
              // if (val2.functionCode.indexOf("delete;") !== -1) {
              //   let json = {};
              //   json.menuCode = val2.menuCode + "delete;";
              //   json.fcode = val2.menuCode;
              //   json.menuName = "删除";
              //   val2.subs.push(json);
              // }
            } else {
              val2.subs.forEach(val3 => {
                if (val3.functionCode) {
                  val3.subs = [];
                  var arr = val3.functionCode.split(";");
                  if (arr.length > 0) {
                    arr.length--;
                  }
                  arr.forEach(authe => {
                    let json = {};
                    json.menuCode = val3.menuCode + authe;
                    json.fcode = val3.menuCode;
                    json.menuName = _this.getCname(authe);
                    val3.subs.push(json);
                  });
                  // if (val3.functionCode.indexOf("query;") !== -1) {
                  //   let json = {};
                  //   json.menuCode = val3.menuCode + "query;";
                  //   json.fcode = val3.menuCode;
                  //   json.menuName = "查询";
                  //   val3.subs.push(json);
                  // }
                  // if (val3.functionCode.indexOf("insert;") !== -1) {
                  //   let json = {};
                  //   json.menuCode = val3.menuCode + "insert;";
                  //   json.fcode = val3.menuCode;
                  //   json.menuName = "增加";
                  //   val3.subs.push(json);
                  // }
                  // if (val3.functionCode.indexOf("update;") !== -1) {
                  //   let json = {};
                  //   json.menuCode = val3.menuCode + "update;";
                  //   json.fcode = val3.menuCode;
                  //   json.menuName = "修改";
                  //   val3.subs.push(json);
                  // }
                  // if (val3.functionCode.indexOf("delete;") !== -1) {
                  //   let json = {};
                  //   json.menuCode = val3.menuCode + "delete;";
                  //   json.fcode = val3.menuCode;
                  //   json.menuName = "删除";
                  //   val3.subs.push(json);
                  // }
                }
              });
            }
          });
        });
        console.log(this.allUserauth);
      });
    },

    // 查询数据
    async queryPage () {
      await Promise.all([this.queryUser(), this.queryAuth()]).then(values => {
        this.queryAllmenu();
        this.$store.state.other.curRowData = {}; // 清空当前行数据
      });
    },
    // 翻页处理
    goPage (val) {
      this.queryUserauth.pageIndex = val;
      let vmTblData = this.tableData; //把第一页的数据重新赋值进行修改
      api.querySearch("/userrole", this.queryUserauth).then(result => {
        // // 替换数据
        vmTblData.splice(0, vmTblData.length, ...result.data.list); //用result.data.list来代替vmTblData
      });
    },
    // 改变每页行数
    handleSizeChange (val) {
      this.queryUserauth.pageSize = val;
      this.queryPage();
    },
    // 选中当前行
    clickRow (row) {
      // 获取修改内容
      let self = this;
      api.searchOneData("/user", row).then(result => {
        self.$store.commit("curRowData", row);
      });
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.goUpdate();
    },
    // 修改
    goUpdate () {
      if (this.$store.state.other.curRowData.userCode) {
        api
          .upapiKey("/userauth/" + this.$store.state.other.curRowData.userCode)
          .then(result => {
            this.userroleauth = result.data;
            this.$store.commit("btnType", "update"); //判断是否新增修改删除
            this.formEvents.$emit("openform"); // 子组件向父组件传参=>打开弹窗
          });
      } else {
        this.$message.error("请选择要修改的数据");
      }
    },

    // 修改
    getTableData (newData) {
      if (newData) {
        //如果有新编号，就再查询一遍
        this.queryPage();
      }
    },

    // 关闭弹窗
    closeForm () {
      this.popForm = false;
    }
  },
  provide () {
    return {
      formEvents: this.formEvents
    };
  },
  created () {
    // 加载列表数据
    this.queryPage();
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
</style>
