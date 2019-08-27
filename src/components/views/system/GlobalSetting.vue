<template>
  <div class='globalSetting'>
    <breadcrumb-navigation />
    <!-- tab -->
    <div class="container pd-10">
      <div>
        <el-tabs
          type="border-card"
          value="setting"
          @tab-click="handlerTabClick"
        >
          <el-tab-pane
            label="全局设置"
            name="setting"
          >
            <!-- 查询栏 -->
            <query-bar
              :ruleForm="ruleForm"
              :formConfig="queryConfig"
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
                label="设置名称"
                prop="propName"
                width="200"
              ></el-table-column>
              <el-table-column
                label="值"
                prop="remark"
                width="200"
              ></el-table-column>
              <el-table-column label="说明">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="light"
                    :content="scope.row.definition"
                    placement="right"
                  >
                    <span>{{scope.row.definition}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <pagination
                @handlePageChange="handleChange"
                :count="ruleForm.total"
              ></pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="审核设定"
            name="trial"
          >
            <!-- 查询栏 -->
            <query-bar
              :ruleForm="ruleForm"
              :formConfig="queryConfig2"
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
                v-for="item in tableconfig2"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              ></el-table-column>
            </el-table>
            <div class="pagination">
              <pagination
                @handlePageChange="handleChange"
                :count="ruleForm.total"
              ></pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="银行汇率"
            name="exchangeRate"
          >
            <!-- 查询栏 -->
            <query-bar
              :ruleForm="ruleForm"
              :formConfig="queryConfig3"
              :btnObj="btnObj"
              @handleBtnClickType="handleBtnClick"
            ></query-bar>
            <!-- 方块 -->
            <div class="bocend">
              <div
                class="card"
                :key="i"
                v-for="(item,i) in tableData"
              >
                <div>
                  <i class="draw-circle-orange"></i>
                  <span v-if="item.date">{{ item.date | datetitle}}外汇牌价</span>
                </div>
                <div>
                  <ul>
                    <li
                      :key="j"
                      v-for="(rate,j) in item.rate"
                    >1 {{rate.currency}} = {{rate.cenPrice}} 人民币</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="pagination">
              <pagination
                @handlePageChange="handleChange"
                :count="ruleForm.total"
              ></pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="海关汇率"
            name="customsExchange"
          >
            <!-- 查询栏 -->
            <query-bar
              :ruleForm="ruleForm"
              :formConfig="queryConfig4"
              :btnObj="btnObj"
              @handleBtnClickType="handleBtnClick"
            ></query-bar>
            <!-- 方块 -->
            <div class="bocend">
              <div
                class="card"
                :key="i"
                v-for="(item,i) in tableData"
              >
                <div>
                  <i class="draw-circle-orange"></i>
                  <span v-if="item.date">{{ item.date | datetitle}}外汇牌价</span>
                </div>
                <div>
                  <ul>
                    <li
                      :key="j"
                      v-for="(rate,j) in item.rate"
                    >1 {{rate.currency}} = {{rate.cenPrice}} 人民币</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="pagination">
              <pagination
                @handlePageChange="handleChange"
                :count="ruleForm.total"
              ></pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 设置表单弹窗 -->
    <el-dialog
      :visible.sync="popup"
      class="dia"
    >
      <el-form
        ref="form"
        :model="formEntity"
        :inline-message="false"
        label-position="right"
        :inline="true"
        :rules="formRules"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              v-if="formtype == 'input'"
              :label="formEntity.propName"
            >
              <el-input v-model="formEntity.propValue"></el-input>
            </el-form-item>
            <el-form-item
              v-if="formtype == 'select'"
              :label="formEntity.propName"
            >
              <el-select
                v-model="formEntity.propValue"
                placeholder="请选择选项"
              >
                <template v-for="(obj,index) in selectOption">
                  <el-option
                    :key="index"
                    :label="obj.itemValue"
                    :value="obj.itemKey"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="formtype == 'radio'"
              :label="formEntity.propName"
            >
              <el-radio-group v-model="formEntity.propValue">
                <!-- <el-radio v-for="index in 4" :label="index" :key='index'>{{index}}位</el-radio> -->
                <el-radio label="0">整数</el-radio>
                <el-radio label="1">小数一位</el-radio>
                <el-radio label="2">小数两位</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="formtype == 'radio2'"
              :label="formEntity.propName"
            >
              <el-radio-group v-model="formEntity.propValue">
                <el-radio label="2">小数两位</el-radio>
                <el-radio label="4">小数四位</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="popup = false;">取 消</el-button>
        <el-button
          type="primary"
          @click.native="saveEdit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--级别--->
    <el-dialog
      :visible.sync="popup2"
      :title="'设置['+formEntity.billName+']审核级别'"
    >
      <el-form
        ref="form"
        :model="formEntity"
        :rules="formRules"
        label-width="120px"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="审核级数"
              class="labnem"
            >
              <el-radio-group v-model="formEntity.levelNumber">
                <el-radio :label="1">一级审核</el-radio>
                <el-radio :label="2">二级审核</el-radio>
                <el-radio :label="3">三级审核</el-radio>
                <el-radio :label="4">四级审核</el-radio>
                <el-radio :label="5">五级审核</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-steps
                :active="formEntity.levelNumber"
                align-center
                class="el-steps-sn reset-steps"
              >
                <el-step
                  v-for="(obj,index) in formEntity.levelNumber"
                  :key="index"
                  @click.native="setPer(index)"
                ></el-step>
              </el-steps>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="审核角色"
              class="labline"
            >
              <div class="da">
                <div
                  class="shutiao"
                  v-for="(obj,index) in formEntity.levelNumber"
                  :key="index"
                >
                  <div
                    class="nrst"
                    v-if="cRoles(index).length"
                    @click="setRole(index)"
                  >
                    <el-tag
                      size="medium"
                      v-for="(e,i) in cRoles(index)"
                      :key="i"
                    >{{ e }}</el-tag>
                  </div>
                  <div
                    class="nrst"
                    v-else
                    @click="setRole(index)"
                  >
                    <el-tag size="medium">请选择角色</el-tag>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="审核人员"
              class="labdi"
            >
              <div class="cont">
                <div
                  class="box"
                  v-for="(obj,index) in formEntity.levelNumber"
                  :key="index"
                  @click="setUser(index)"
                >
                  <div
                    v-if="cUsers(index).length"
                    @click="setUser(index)"
                  >
                    <el-tag
                      size="medium"
                      v-for="(e,i) in cUsers(index)"
                      :key="i"
                    >{{ e }}</el-tag>
                  </div>
                  <div
                    class
                    v-else
                    @click="setUser(index)"
                  >
                    <el-tag size="medium">请选择用户</el-tag>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer pop"
      >
        <el-button @click="popup2 = false;">取 消</el-button>
        <el-button
          type="primary"
          @click.native="saveEdit()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 级别弹出框点选表格 -->
    <el-dialog :visible.sync="popover.isShowPopover">
      <dialog-query-bar
        :ruleForm="popover.ruleForm"
        :formConfig="popover.queryConfig"
        :btnObj="popover.btnObj"
        @handleBtnClickType="handleBtnClickpop"
      ></dialog-query-bar>
      <div v-if="sectuor == 1">
        <span style="margin-right: 20px;">已选择角色</span>
        <el-tag
          size="small"
          closable
          @close="handleClose(i)"
          :key="i"
          v-for="(e,i) in roleanduser.verifyRoleName"
        >{{e}}</el-tag>
      </div>
      <div v-else>
        <span style="margin-right: 20px;">已选择人员</span>
        <el-tag
          size="small"
          closable
          @close="handleClose(i)"
          :key="i"
          v-for="(e,i) in roleanduser.verifyUserName"
        >{{e}}</el-tag>
      </div>
      <el-table
        :data="popover.popoverList"
        highlight-current-row
        @current-change="clrow"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item,index) of popover.tableconfig"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <pagination
          @handlePageChange="handleChangepop"
          :count="popover.count"
        ></pagination>
      </div>
      <el-button
        type="primary"
        @click.native="StrRoleanduser()"
        class="btnjson"
      >确 定</el-button>
    </el-dialog>

    <el-dialog
      title="设置汇率"
      :visible.sync="popup3"
      close-on-press-escape
    >
      <el-form
        ref="form"
        :model="formEntity"
        label-width="10rem"
        :rules="formConfig3.rules"
      >
        <el-form-item
          label="汇率日期"
          prop="date"
        >
          <!-- 设置不同日和月不同的汇率日期 -->
          <el-date-picker
            :type="formConfig3.dateConfig.type"
            :value-format='formConfig3.dateConfig.format'
            :picker-options="pickerOptions"
            ref="redate"
            placeholder="请选择汇率日期"
            v-model="formEntity.date"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <!-- <form-config :formModel="formEntity" :inputKey="formConfig3.date"></form-config> -->
      <form-module-head title="汇率"></form-module-head>
      <form-config
        :formModel="formEntity"
        :inputKey="formConfig3.list"
        @handlerFormVerify='handlerFormVerify'
      ></form-config>
      <div
        slot="footer"
        class="dialog-footer pop"
      >
        <el-button @click="popup3 = false;">取 消</el-button>
        <el-button
          type="primary"
          @click.native="saveEdit()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import validate from "@/domain/common/validate";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import Popover from "@/components/common/Popover";
import FormConfig from "@/components/common/FormConfig";
import api from "@/assets/js/appHelper";
import Pagination from "@/components/common/Pagination";
import QueryBar from "@/components/common/QueryBar";
import DialogQueryBar from "@/components/common/DialogQueryBar.vue"; // 自定义按钮
const rules = [
  { required: true, message: "必填", trigger: "blur" },
  { validator: validate.validateNum, trigger: ["blur", "change"] }
]
export default {
  components: {
    QueryBar,
    DialogQueryBar,
    formModuleHead,
    Popover,
    Pagination,
    FormConfig
  },
  data: () => ({
    menuName: "全局设置",
    queryConfig: [{ label: "设定名称", moduleBind: "propName", isInput: true }],
    queryConfig2: [
      { label: "审核名称", moduleBind: "billName", isInput: true },
      {
        label: "审核类型",
        moduleBind: "type",
        isSelect: true,
        type: "select",
        selectOption: [],
        selectKey: "verifyBillType"
      }
    ],
    queryConfig3: [
      { label: "汇率日期", moduleBind: "timeFrom", isDate: true },
      { label: "~", moduleBind: "timeTo", isDate: true }
    ],
    queryConfig4: [
      { label: "汇率日期", moduleBind: "timeFrom", isDate: true },
      { label: "~", moduleBind: "timeTo", isDate: true }
    ],

    btnObj: [
      { type: "search", label: "查询" },
      { type: "update", label: "设置" }
    ],
    tableconfig2: [
      {
        prop: "billName",
        label: "审核名称",
        width: "200"
      },
      {
        prop: "levelNumber",
        label: "审核级数",
        width: "200"
      },
      {
        prop: "verifyRoleName",
        label: "所选角色",
        width: "400"
      },
      {
        prop: "verifyUserName",
        label: "所选用户",
        width: "400"
      }
    ],
    tableData: [],
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 0
    },
    formConfig3: {
      list: [
        {
          type: "string",
          key: "dollar",
          name: "美元",
          prop: "dollar",
          rules
        },
        {
          type: "string",
          key: "Euro",
          name: "欧元",
          prop: "Euro",
          rules
        },
        {
          type: "string",
          key: "HKdollar",
          name: "港币",
          prop: "HKdollar",
          rules
        },
        {
          type: "string",
          key: "Pound",
          name: "英镑",
          prop: "Pound",
          rules
        },
        {
          type: "string",
          key: "Yen",
          name: "日元",
          prop: "Yen",
          rules
        },
        {
          type: "string",
          key: "Audollar",
          name: "澳大利亚元",
          prop: "Audollar",
          rules
        },
        {
          type: "string",
          key: "NtCurrency",
          name: "新台币",
          prop: "NtCurrency",
          rules
        },
        {
          type: "string",
          key: "Cadollar",
          name: "加拿大元",
          prop: "Cadollar",
          rules
        },
        {
          type: "string",
          key: "Sidollar",
          name: "新加坡元",
          prop: "Sidollar",
          rules
        },
        {
          type: "string",
          key: "Franc",
          name: "瑞士法郎",
          prop: "Franc",
          rules
        }
      ],
      dateConfig: {
        type: 'date',
        format: 'yyyy-MM-dd HH:mm:ss'
      },
      date: [
        {
          type: "date",
          key: "date",
          name: "汇率日期",
          prop: "date",
          rules: [{ required: true, message: "必填", trigger: "blur" }]
        }
      ],
      rules: { date: [{ required: true, message: "必填", trigger: "blur" }] },
      validate: eval,
      resetFields: eval
    },
    pickerOptions: {
      disabledDate (time) {
        return time.getTime() > Date.now();
      }
    },
    curRowData: "",
    popup: false,
    popup2: false,
    popup3: false,
    formRules: {},
    formEntity: {},
    formtype: "input", // 设置模块弹窗类型
    selectOption: [], // 设置模块下拉
    tabpag: 1, // 页卡项
    onselepros: "",
    // 点选的人员个角色
    roleanduser: {
      verifyRole: "",
      verifyRoleName: "",
      verifyUser: "",
      verifyUserName: "",
      index: ""
    },
    // 弹层
    popover: {
      //弹出框组件参数
      isShowPopover: false, // 弹窗显示
      ruleForm: {}, // 查询栏的model绑定
      queryConfig: [
        { label: "角色名称", moduleBind: "roleName", isInput: true }
      ],
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      popoverList: [], // 表格数据
      count: 0, // 分页数据总条数
      tableconfig: [
        {
          prop: "roleCode",
          label: "角色编码",
          width: "200"
        },
        {
          prop: "roleName",
          label: "角色名称",
          width: "200"
        }
      ],
      itemName: "" // 弹窗标题，
    },
    sectuor: 1 // 角色人员区分
  }),
  filters: {
    datetitle (value) {
      if (!value) return "";
      value = value.slice(0, 10);
      let ondate = new Date().toJSON().slice(0, 10);
      return value == ondate ? "今日" : value;
    }
  },
  methods: {
    // 验证规则
    handlerFormVerify ({ formModel: { resetFields, validate } } = {}) {
      this.formConfig3.validate = validate;
      this.formConfig3.resetFields = resetFields
    },
    // 选中行
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.handleBtnClick('setting');
    },
    // 切换页卡
    handlerTabClick (tab, event) {
      this.curRowData = "";
      let obj = {
        setting: 1,
        trial: 2,
        exchangeRate: 3,
        customsExchange: 4
      }[tab.name]
      this.tabpag = obj;
      this.goStartPage();
    },
    // 搜索
    goStartPage () {
      this.ruleForm.pageIndex = 1;
      this.handleChange(this.ruleForm);
    },
    // 查询
    handleBtnClickpop () {
      if (this.sectuor == 1) {
        this.setRole();
      } else {
        this.setUser();
      }
    },
    // 修改翻页条数
    handleChange (paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;
      if (this.tabpag == 1) {
        this.queryData();
      } else if (this.tabpag == 2) {
        this.getVerifysetting();
      } else if (this.tabpag == 4) {
        this.getCustomsExchangeData()
      } else {
        this.getExchangerate();
      }
    },
    // 数据1
    async queryData () {
      try {
        const { data } = await api.getGlobalSetting(this.ruleForm);
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {};
      } catch (e) {
        console.log(e);
      }
    },
    // 数据2
    async getVerifysetting () {
      try {
        const { data } = await api.getVerifysetting(this.ruleForm);
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {};
      } catch (e) {
        console.log(e);
      }
    },
    // 数据3
    async getExchangerate () {
      try {
        const { data } = await api.getExchangerate({ ...this.ruleForm, source: 'system' });
        this.tableData = data.list;
        this.ruleForm.total = data.count;
        this.curRowData = {};
      } catch (e) {
        console.log(e);
      }
    },

    // 获取 海关汇率
    async getCustomsExchangeData (data = {}) {
      try {
        this.tableData = [];
        const { data: { list, count } } = await api.getCustomsExchangeData({ ...this.ruleForm, source: 'custom' });
        this.tableData = list,
          this.ruleForm.total = count,
          this.curRowData = {};
      } catch (error) {
        console.log(error)
      }
    },
    // 击查询栏按钮事件
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
        async setting () {
          if (!this.tabpag == 3 && JSON.stringify(this.curRowData) == "{}") {
            this.$message.warning("请选择要设置的数据");
          } else {
            if (this.tabpag == 1) {
              const { data } = await api.getOneGlobalSetting(
                this.curRowData.propKey
              );
              if (data.propKey == "localCurrency") {
                this.formtype = "select";
                api.getEnum("currencyName").then(result => {
                  this.selectOption = result.data;
                  this.formEntity = data;
                  this.popup = true;
                });
              } else if (data.propKey == "systemName") {
                this.formtype = "input";
                this.formEntity = data;
                this.popup = true;
              } else if (data.propKey == "numberPosition") {
                this.formtype = "radio";
                this.formEntity = data;
                this.popup = true;
              } else if (
                data.propKey == "exchangeRateRMBdecimal" ||
                data.propKey == "exchangeRateForeignCurrencyDecimal"
              ) {
                this.formtype = "radio2";
                this.formEntity = data;
                this.popup = true;
              }
            } else if (this.tabpag == 2) {
              this.formEntity = this.curRowData;
              this.popup2 = true;
            } else if (this.tabpag == 4) {
              // 海关汇率
              this.formConfig3.dateConfig.type = 'month';
              this.formEntity = { date: `${new Date().toJSON().slice(0, 7)}` };
              this.popup3 = true;
            } else {
              // 银行汇率
              this.formConfig3.dateConfig.type = 'date'
              this.formEntity = { date: new Date().toJSON().slice(0, 10) + ' 00:00:00' };
              this.popup3 = true;
            }
          }
        }
      };
    },
    formattercellValue (row, column, cellValue, index) {
      if (cellValue) {
        let vals = [];
        const arr = cellValue.split(",");
        arr.forEach((v, i) => {
          v = v.replace("[", "");
          v = v.replace("]", "");
          let e = v.split(";");
          if (e) {
            vals = vals.concat(e);
          }
        });
        return vals.join(",");
      } else {
        return "";
      }
    },
    //---------------------------------------级数窗体操作
    // 设置级数
    setPer (index) {
      this.onselepros = index + 1;
    },
    // 角色转数组
    ArrRoles (index) {
      if (!this.formEntity.verifyRole) {
        return [];
      }
      const arr = this.formEntity.verifyRole.split(",");
      var code = "";
      if (arr.length > index) {
        code = arr[index];
      } else {
        return [];
      }
      code = code.replace("[", "");
      code = code.replace("]", "");
      if (!code) {
        return [];
      }
      const roles = code.split(";");
      return roles;
    },
    ArrRolesname (index) {
      if (!this.formEntity.verifyRoleName) {
        return [];
      }
      const arr = this.formEntity.verifyRoleName.split(",");
      var code = "";
      if (arr.length > index) {
        code = arr[index];
      } else {
        return [];
      }
      code = code.replace("[", "");
      code = code.replace("]", "");
      if (!code) {
        return [];
      }
      const roles = code.split(";");
      return roles;
    },
    // 人员转数组
    ArrUsers (index) {
      if (!this.formEntity.verifyUser) {
        return [];
      }
      const arr = this.formEntity.verifyUser.split(",");
      var code = "";
      if (arr.length > index) {
        code = arr[index];
      } else {
        return [];
      }
      code = code.replace("[", "");
      code = code.replace("]", "");
      if (!code) {
        return [];
      }
      const users = code.split(";");
      return users;
    },
    ArrUsersname (index) {
      if (!this.formEntity.verifyUserName) {
        return [];
      }
      const arr = this.formEntity.verifyUserName.split(",");
      var code = "";
      if (arr.length > index) {
        code = arr[index];
      } else {
        return [];
      }
      code = code.replace("[", "");
      code = code.replace("]", "");
      if (!code) {
        return [];
      }
      const users = code.split(";");
      return users;
    },
    // 转中文
    cRoles (index) {
      return this.ArrRolesname(index);
    },
    cUsers (index) {
      return this.ArrUsersname(index);
    },
    // 展示角色
    async setRole (index) {
      this.sectuor = 1;
      this.popover.queryConfig = [
        { label: "角色名称", moduleBind: "roleName", isInput: true }
      ];
      this.popover.tableconfig = [
        {
          prop: "roleCode",
          label: "角色编码",
          width: "200"
        },
        {
          prop: "roleName",
          label: "角色名称",
          width: "200"
        }
      ];
      try {
        var {
          data: { count, list }
        } = await api.querySearch("/role", this.popover.ruleForm);
        this.popover.count = count;
        this.popover.popoverList = list;
      } catch (e) {
        console.log(e);
      }
      this.roleanduser.verifyRole = this.ArrRoles(index);
      this.roleanduser.verifyRoleName = this.ArrRolesname(index);
      this.roleanduser.index = index;
      this.popover.isShowPopover = true;
    },
    // 展示人员
    async setUser (index) {
      if (!this.ArrRoles(index).length > 0) {
        this.$message.warning("请先选择角色");
        return;
      }
      this.sectuor = 2;
      this.popover.queryConfig = [
        { label: "用户名称", moduleBind: "userName", isInput: true }
      ];
      this.popover.tableconfig = [
        {
          prop: "userCode",
          label: "用户名称",
          width: "200"
        },
        {
          prop: "userName",
          label: "角色名称",
          width: "200"
        }
      ];
      this.popover.ruleForm.roleCode = this.ArrRoles(index);
      try {
        var {
          data: { count, list }
        } = await api.querySearch("/user", this.popover.ruleForm);
        this.popover.count = count;
        this.popover.popoverList = list;
      } catch (e) {
        console.log(e);
      }
      this.roleanduser.verifyUser = this.ArrUsers(index);
      this.roleanduser.verifyUserName = this.ArrUsersname(index);
      this.roleanduser.index = index;
      this.popover.isShowPopover = true;
    },
    // 转字符串
    StrRoleanduser () {
      if (this.sectuor == 1) {
        let code = "[";
        code += this.roleanduser.verifyRole.join(";");
        code += "]";
        let arr = this.formEntity.verifyRole.split(",");
        while (arr.length <= this.roleanduser.index) {
          arr.push("[]");
        }
        arr[this.roleanduser.index] = code;
        this.formEntity.verifyRole = arr.join(",");
        code = "[";
        code += this.roleanduser.verifyRoleName.join(";");
        code += "]";
        arr = this.formEntity.verifyRoleName.split(",");
        while (arr.length <= this.roleanduser.index) {
          arr.push("[]");
        }
        arr[this.roleanduser.index] = code;
        this.formEntity.verifyRoleName = arr.join(",");
        code = "[]";
        arr = this.formEntity.verifyUser.split(",");
        while (arr.length <= this.roleanduser.index) {
          arr.push("[]");
        }
        arr[this.roleanduser.index] = code;
        this.formEntity.verifyUser = arr.join(",");
        code = "[]";
        arr = this.formEntity.verifyUserName.split(",");
        while (arr.length <= this.roleanduser.index) {
          arr.push("[]");
        }
        arr[this.roleanduser.index] = code;
        this.formEntity.verifyUserName = arr.join(",");
      } else {
        let code = "[";
        code += this.roleanduser.verifyUser.join(";");
        code += "]";
        let arr = this.formEntity.verifyUser.split(",");
        while (arr.length <= this.roleanduser.index) {
          arr.push("[]");
        }
        arr[this.roleanduser.index] = code;
        this.formEntity.verifyUser = arr.join(",");
        code = "[";
        code += this.roleanduser.verifyUserName.join(";");
        code += "]";
        arr = this.formEntity.verifyUserName.split(",");
        while (arr.length <= this.roleanduser.index) {
          arr.push("[]");
        }
        arr[this.roleanduser.index] = code;
        this.formEntity.verifyUserName = arr.join(",");
      }
      this.popover.isShowPopover = false;
    },
    // 选中行
    clrow (row) {
      if (!row) {
        return;
      }
      if (this.sectuor == 1) {
        let is = true;
        if (this.roleanduser.verifyRole.length >= 3) {
          this.$message.warning("角色最多可选3个");
          return;
        }
        this.roleanduser.verifyRole.forEach(element => {
          if (element == row.roleCode) {
            is = false;
          }
        });
        // 添加
        if (is) {
          this.roleanduser.verifyRole.push(row.roleCode);
          this.roleanduser.verifyRoleName.push(row.roleName);
        }
      } else {
        let is = true;
        if (this.roleanduser.verifyUser.length >= 3) {
          this.$message.warning("人员最多可选3个");
          return;
        }
        this.roleanduser.verifyUser.forEach(element => {
          if (element == row.userCode) {
            is = false;
          }
        });
        // 添加
        if (is) {
          this.roleanduser.verifyUser.push(row.userCode);
          this.roleanduser.verifyUserName.push(row.userName);
        }
      }
    },
    // 删除
    handleClose (i) {
      if (this.sectuor == 1) {
        this.roleanduser.verifyRole.splice(i, 1);
        this.roleanduser.verifyRoleName.splice(i, 1);
      } else {
        this.roleanduser.verifyUser.splice(i, 1);
        this.roleanduser.verifyUserName.splice(i, 1);
      }
    },


    async saveEdit () {
      try {
        if (this.tabpag == 1) {
          if (this.formtype == "select") {
            this.formEntity.remark =
              this.selectOption[this.formEntity.propValue - 1].itemValue || "";
          } else if (this.formtype == "radio" || this.formtype == "radio2") {
            switch (this.formEntity.propValue) {
              case "0":
                this.formEntity.remark = "整数";
                break;
              case "1":
                this.formEntity.remark = "小数一位";
                break;
              case "2":
                this.formEntity.remark = "小数两位位";
                break;
              case "3":
                this.formEntity.remark = "小数三位";
                break;
              case "4":
                this.formEntity.remark = "小数四位";
                break;
              default:
                this.formEntity.remark = "";
                break;
            }
          }
          const { status } = await api.editData("/prop", this.formEntity);
          if (status == "200") {
            this.popup = false;
            this.$message.success("修改成功");
            this.goStartPage();
          } else {
            this.$message.error("修改失败");
          }
        } else if (this.tabpag == 2) {
          // 保存2栏
          // this.formEntity.verifyRole.splice(',').slice(0,this.formEntity.levelNumber);
          console.log(this.formEntity);
          let arr = [];
          for (let i = 0; i < this.formEntity.levelNumber; i++) {
            if (this.formEntity.verifyRole) {
              if (this.formEntity.verifyRole.split(",").length > i) {
                arr.push(this.formEntity.verifyRole.split(",")[i]);
              } else {
                arr.push("[]");
              }
            } else {
              arr.push("[]");
            }
          }
          this.formEntity.verifyRole = arr.join(",");

          arr = [];
          for (let i = 0; i < this.formEntity.levelNumber; i++) {
            if (this.formEntity.verifyRoleName) {
              if (this.formEntity.verifyRoleName.split(",").length > i) {
                arr.push(this.formEntity.verifyRoleName.split(",")[i]);
              } else {
                arr.push("[]");
              }
            } else {
              arr.push("[]");
            }
          }
          this.formEntity.verifyRoleName = arr.join(",");

          arr = [];
          for (let i = 0; i < this.formEntity.levelNumber; i++) {
            if (this.formEntity.verifyUser) {
              if (this.formEntity.verifyUser.split(",").length > i) {
                arr.push(this.formEntity.verifyUser.split(",")[i]);
              } else {
                arr.push("[]");
              }
            } else {
              arr.push("[]");
            }
          }
          this.formEntity.verifyUser = arr.join(",");

          arr = [];
          for (let i = 0; i < this.formEntity.levelNumber; i++) {
            if (this.formEntity.verifyUserName) {
              if (this.formEntity.verifyUserName.split(",").length > i) {
                arr.push(this.formEntity.verifyUserName.split(",")[i]);
              } else {
                arr.push("[]");
              }
            } else {
              arr.push("[]");
            }
          }
          this.formEntity.verifyUserName = arr.join(",");
          let a = this.formEntity.verifyRole.split(",");
          let b = this.formEntity.verifyRoleName.split(",");
          let c = this.formEntity.verifyUser.split(",");
          let d = this.formEntity.verifyUserName.split(",");
          let e = a
            .concat(b)
            .concat(c)
            .concat(d);
          for (let i = 0; i < e.length; i++) {
            if (e[i].length <= 2) {
              this.$message.warning("请选中角色或人员");
              return;
            }
          }
          const { status } = await api.saveVerifysetting(this.formEntity);
          if (status == "200") {
            this.popup = false;
            this.$message.success("保存成功");
            this.popup2 = false;
            this.goStartPage();
          } else {
            this.$message.error("保存失败");
          }
        } if (this.tabpag === 4) {
          // 保存海关汇率
          this.formConfig3.validate(valid => {
            if (valid) {
              this.utools.saveReceiptsTips.call(
                this,
                async () => {
                  await api.changeCustomsExchangeData({ data: this.handleExchangeRateParam(this.formEntity), method: 'POST' });
                  this.getCustomsExchangeData();
                  this.ruleForm.pageIndex = 1,
                    this.ruleForm.pageSize = 10;
                  this.popup3 = false;
                  this.formConfig3.resetFields()
                }
              )
            }
          })

        } else {
          this.formConfig3.validate(valid => {
            if (valid) {
              this.utools.saveReceiptsTips.call(
                this,
                async () => {
                  if (!this.formEntity.date) return
                  // this.formEntity.date = this.formEntity.date.slice(0,10)+' 00:00:00'
                  let Ratedata = [];
                  (this.formEntity.dollar) && Ratedata.push(
                    {
                      currency: "美元",
                      cenPrice: this.formEntity.dollar,
                      releasedate: this.formEntity.date,
                      showorder: 1
                    });
                  (this.formEntity.Euro) && Ratedata.push(
                    {
                      currency: "欧元",
                      cenPrice: this.formEntity.Euro,
                      releasedate: this.formEntity.date,
                      showorder: 2
                    });
                  (this.formEntity.HKdollar) && Ratedata.push(
                    {
                      currency: "港币",
                      cenPrice: this.formEntity.HKdollar,
                      releasedate: this.formEntity.date,
                      showorder: 3
                    });
                  (this.formEntity.Pound) && Ratedata.push(
                    {
                      currency: "英镑",
                      cenPrice: this.formEntity.Pound,
                      releasedate: this.formEntity.date,
                      showorder: 4
                    });
                  (this.formEntity.Yen) && Ratedata.push(
                    {
                      currency: "日元",
                      cenPrice: this.formEntity.Yen,
                      releasedate: this.formEntity.date,
                      showorder: 5
                    });
                  (this.formEntity.Audollar) && Ratedata.push(
                    {
                      currency: "澳大利亚元",
                      cenPrice: this.formEntity.Audollar,
                      releasedate: this.formEntity.date,
                      showorder: 6
                    });
                  (this.formEntity.NtCurrency) && Ratedata.push(
                    {
                      currency: "新台币",
                      cenPrice: this.formEntity.NtCurrency,
                      releasedate: this.formEntity.date,
                      showorder: 7
                    });
                  (this.formEntity.Cadollar) && Ratedata.push(
                    {
                      currency: "加拿大元",
                      cenPrice: this.formEntity.Cadollar,
                      releasedate: this.formEntity.date,
                      showorder: 8
                    });
                  (this.formEntity.Sidollar) && Ratedata.push(
                    {
                      currency: "新加坡元",
                      cenPrice: this.formEntity.Sidollar,
                      releasedate: this.formEntity.date,
                      showorder: 9
                    });
                  (this.formEntity.Franc) && Ratedata.push(
                    {
                      currency: "瑞士法郎",
                      cenPrice: this.formEntity.Franc,
                      releasedate: this.formEntity.date,
                      showorder: 10
                    });

                  const { status } = await api.addExchangerate(Ratedata.map(item => {
                    item.source = 'system';
                    return item
                  }));
                  this.popup3 = false;
                  /* if (status == "200") {
                    this.popup3 = false;
                    this.$message.success("汇率设置成功");
                    this.goStartPage();
                  } else {
                    this.$message.error("汇率设置失败");
                  } */
                }
              )
            }
          })

        }
      } catch (error) {
        console.log(error)
      }
    },

    // 处理海关汇率的保存参数
    handleExchangeRateParam (data) {
      let currencyCn = {
        dollar: '美元',
        Euro: '欧元',
        HKdollar: '港币',
        Pound: '英镑',
        Yen: '日元',
        Audollar: '澳大利亚元',
        NtCurrency: '新台币',
        Cadollar: '加拿大元',
        Sidollar: '新加坡元',
        Franc: '瑞士法郎'
      };
      return Object.keys(currencyCn).map(item => (
        {
          currency: currencyCn[item],
          cenPrice: data[item],
          realeasemonth: data.date,
          source: 'custom'
        }
      )
      )
    },
    handleChangepop (paper) {
      this.popover.ruleForm.pageIndex = paper.pageIndex;
      this.popover.ruleForm.pageSize = paper.pageSize;
      if (this.sectuor == 1) {
        this.setRole();
      } else {
        this.setUser();
      }
    }
  },
  // computed: {
  // },
  watch: {
    popup3 (val) {
      if (!val) this.formConfig3.resetFields()
    }
    /*   isShowPopover: {
        handler(newVal, oldVal) {
          if(oldVal){
          }
        },
        deep: true
      } */
  },
  created () {
    api.initSelect(this.queryConfig2);
    this.goStartPage();
  }
};
</script>

<style lang='less'>
.globalSetting {
  .reset-steps {
    .el-step__line {
      .el-step__line-inner {
        &:before {
          content: "";
          display: inline-block;
          position: absolute;
          height: 24px;
          width: 20px;
          top: -11px;
          background: white;
        }
        &:after {
          content: "";
          display: inline-block;
          position: absolute;
          height: 10px;
          width: 10px;
          top: 4px;
          border-right: 2px solid #409eff;
          border-bottom: 2px solid #409eff;
          -webkit-transform: rotate(-45deg) translateY(-4px);
          transform: rotate(-45deg) translateY(-4px);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
      }
    }
  }

  .labnem {
    margin-bottom: 50px !important;
  }
  .labline > label {
    line-height: 200px !important;
  }
  .da {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-around;
  }
  .shutiao {
    width: 2px;
    background-color: #409eff;
    position: relative;
  }
  .nrst {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    border: 1px solid rgba(64, 158, 255, 0.2);
    width: 126px;
    border-radius: 4px;
    background: #e1f0ff;
    box-shadow: 0 -15px 0 #fdfdfd, 0 15px 0 #fdfdfd;
  }
  .el-tag {
    background: #f7f8f9;
  }

  // 3
  .labdi > label {
    line-height: 100px !important;
  }
  .cont {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .box {
    text-align: center;
    height: 100px;
    border: 1px solid rgba(64, 158, 255, 0.2);
    width: 126px;
    border-radius: 4px;
    background: #e1f0ff;
    text-align: center;
    justify-content: center;
    -webkit-box-align: center;
    flex-direction: column;
    display: flex;
  }
  .btnjson {
    margin-left: 50%;
    transform: translate(-50%, 0%);
  }

  .pop {
    margin-top: 50px;
  }
  .nrdiv {
    margin-top: 50%;
    transform: translate(0, -50%);
  }
  .el-tabs--border-card {
    box-shadow: 0 0;
  }
  .el-tooltip__popper {
    width: 200px;
  }
  .dia > .el-dialog {
    width: 30%;
    margin-top: 20vh;
  }

  //  汇率模块
  .bocend {
    // display: flex;
    // flex-flow: row wrap;
    // justify-content: flex-start;
    // padding-right: -5%;
    font-size: 12px;
    color: #606266;
    width: 100%;
    .card {
      display: inline-block;
      width: 18%;
      margin: 1%;
      box-sizing: border-box;
      margin-bottom: 2%;
      border: 1px solid #d5d9e0;
      div {
        padding: 0 1rem;
      }
      div:first-child {
        background-color: #f5f7fa;
        height: 2rem;
        line-height: 2rem;
        i.draw-circle-orange {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #0099ff;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      div:nth-child(2) {
        height: 12rem;
        overflow: auto;
        ul {
          list-style: none;
          li {
            height: 2rem;
            line-height: 2rem;
          }
        }
      }
    }
    // .card:last-child{
    //   margin-right: 0;
    // }
  }
}
</style>
