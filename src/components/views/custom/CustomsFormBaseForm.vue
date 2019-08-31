<!-- 报关单 -->
<template>
  <div class="customs-form-base">
    <preserve-btn
      :form='CustomsHead'
      @handlePreserve='handlerPreserve'
      @handleRollback='handlerBack'
      @handleExport="()=> {
        downFileDialog.visible = true; 
        downFileDialog.data.type=''
        }"
      :isLoading='isLoading'
    ></preserve-btn>
    <div>
      <form-component
        :formModel='CustomsHead'
        :inputKey='CustomsHeadKey'
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch='rousePopover'
      ></form-component>
      <!-- 页签 -->
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handlerTabClick"
      >
        <el-tab-pane
          v-for="item in tabObj"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          :disabled="(status === 'add' && item.name !== 'formbase')"
        >
        </el-tab-pane>
        <el-button
          v-show="activeName!='formbase' &&( (+CustomsHead.status || 0) <= 1)"
          @click='saveTab'
          :loading='isTabLoading'
          class="saveBtn mb-10"
        >{{isTabLoading? '保存中': '保存'}}</el-button>
        <form-component
          class="formConfig"
          :formModel='tabForm'
          :inputKey='formConfig'
          @handlerFormVerify="handlerTabFormVerify"
          @handlerFormConfigClickSearch='rousePopover'
        >
        </form-component>
        <el-tabs
          v-if="activeName=='other'"
          v-model="formDialog.otherTabName"
          type="card"
          @tab-click="handlerChildTabClick"
        >
          <div class="mb-10">
            <el-button
              v-for="item in formDialog.btnList"
              :type="item.type"
              :key="item.key"
              @click="openOtherFormDialog(item.key)"
            >{{item.name}}</el-button>
          </div>
          <el-tab-pane
            v-for="item in otherTabObj"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          >
          </el-tab-pane>

          <table-component
            :isSubTable='true'
            :dialog='false'
            :popoverList='formDialog.otherTabDate'
            :popoverListKey='formDialog.otherTabTableConfig'
            :count='formDialog.paper.tableCount'
            @rowClickData='clickTabRow'
            @handlePageChange='otherTabRequest'
          ></table-component>
        </el-tabs>
      </el-tabs>
      <el-tabs
        v-model="table.tableName"
        type="card"
        @tab-click="handlerTableClick"
      >
        <el-tab-pane
          v-for="item in tableObj"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
        </el-tab-pane>
        <div
          class="mb-10"
          v-show="(+CustomsHead.status||0)<=1"
        >
          <!-- 商品信息的 按钮 去除 新增 -->
          <el-button
            v-for="item in formDialog.btnList.slice(1)"
            :type="item.type"
            :key="item.key"
            @click="openTablePopForm(item.key, table.tableName)"
          >{{item.name}}</el-button>
        </div>

        <table-component
          :isSubTable='true'
          :dialog='false'
          :popoverList='table.tableData'
          :popoverListKey='table.tableConfig'
          :count='table.pageCount'
          @rowClickData='clickTableRow'
          @handlePageChange='tabRequest'
        ></table-component>

      </el-tabs>
    </div>
    <popover-component
      itemName='商品信息'
      :isShowPopover='formDialog.isShowPopover'
      :popoverType="'form'"
      :formData='formDialog'
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerOtherSubmit"
      @handlerFormConfigClickSearch='rousePopover'
    ></popover-component>
    <!-- 表格弹窗 -->
    <popover-component
      :isShowPopover='popover.isShowPopover'
      :popoverType="popover.popoverType"
      :currencySelectInputKey='popover.currencySelectInputKey'
      :formConfig='popover.queryBarObj'
      :popoverListKey='popover.popoverListKey'
      :popoverList='popover.popoverList'
      :ruleForm='popover.ruleForm'
      :count='popover.count'
      :btnObj='popover.btnObj'
      :itemName='popover.itemName'
      @handleBtnClickType="handleBtnClick"
      @changeisShowPopover='closeTableDialog'
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="handlePageChange"
    ></popover-component>
    <!-- 导出提示选择 -->
    <el-dialog
      title="选择下载类型"
      :visible.sync="downFileDialog.visible"
      width="250px"
      center
      style="text-align:center"
    >
      <el-radio-group v-model="downFileDialog.data.type">
        <el-radio label="INVOICE">INVOICE</el-radio>
        <el-radio label="container">装箱单</el-radio>
      </el-radio-group>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="downFileDialog.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleExport"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import PopoverComponent from '@/components/common/Popover.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


// 表单配置
import CustomsHead from "@/domain/entities/custom/CustomsHead";
import CustomsHeadKey from "@/domain/formconfig/custom/CustomsHead";

import CustomsFormBase from "@/domain/entities/custom/CustomsFormBase";

import api from "@/assets/js/appHelper";
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
let TabForm = '', OtherTabFormData = '', RuleForm = '';
export default {
  name: 'CustomsFormBaseForm',
  components: {
    FormComponent,
    PopoverComponent,
    PaginationComponent,
    TableComponent
  },
  data () {
    return {
      downFileDialog: {
        visible: false,
        data: { type: '' }
      },
      searchTarget: '',
      status: '',
      activeName: 'formbase',
      CustomsHeadKey,
      CustomsHead: new CustomsHead(),
      CustomsFormBase: new CustomsFormBase(),
      tabForm: {},
      customsCode: {}, //子主键
      formConfig: [],
      verify: '',
      tabVerify: '',
      isLoading: false,
      isTabLoading: false,
      formDialog: {
        isShowPopover: false,
        paper: {},
        ruleForm: {},
        formConfig: [],
        otherTabName: 'container',
        otherTabDate: [],
        otherTabTableConfig: '',
        btnKey: '',
        clickRow: {},
        btnList: [
          { type: '', key: 'add', name: '新增' },
          { type: '', key: 'edit', name: '修改' },
          { type: '', key: 'delete', name: '删除' },
        ]
      },
      // 商品明细
      table: {
        tableName: 'goodsdetail',
        tabString: '',
        tableData: [],
        tempData: [],
        // ruleForm: {},
        // formConfig: [],
        tableConfig: [],
        pageCount: 0,
        clickRowData: {}
      },
      popover: {  //弹出框组件参数
        isShowPopover: false, // 弹窗显示
        queryBarObj: [], // 弹出框查询栏
        queryCode: '', // 查询字段
        configUrl: '', // 文件路径
        popoverType: 'table', // 弹出框
        currencySelectInputKey: '', //弹出框选中对应的key值
        popoverListKey: [], // 弹出框表头绑定的 key
        popoverList: [], // 表格数据
        count: 0, // 分页数据总条数
        ruleForm: {}, // 查询栏的model绑定
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        itemName: '',// 弹窗标题
        apiKey: '',//弹窗内部的接口
        busiUnit: 'companyinfo',//改变的经营单位弹出列表
      },
      tabData: { // 页签数据
        formbase: {}, //基本资料
        other: {}, // 其他信息
        inspection: {}, //报关报检信息
        tempData: {} // 暂存 的tabForm
      }
    }
  },
  watch: {
    activeName (newVal, oldVal) {
      if (oldVal) {
        this.tabData[oldVal] = this.tabData.tempData;
        this.tabData.tempData = {}
      }
      this.utools.setSession(oldVal, this.tabForm);
    },
    status (val) {
      const setParam = [{ key: 'planOrderNo', btn: true }];
      // 设置 表单 的 栏位
      if (val !== 'add') setParam[0].btn = false;
      this.utools.setFormConfig(this.CustomsHeadKey, setParam)
    },
    'tabForm.unitType': {
      handler (cur, pre) {
        for (let item of this.formConfig) {
          switch (item.key) {
            case 'busiUnit':
              switch (cur) {
                case '1':
                  this.popover.busiUnit = 'companyinfo';
                  break;
                case '2':
                  this.popover.busiUnit = 'client';
                  break;
                case '3':
                  this.popover.busiUnit = 'customer';
                  break;
                case '4':
                  this.popover.busiUnit = 'supplierbase';
                  break;
                default:
                  this.popover.busiUnit = 'companyinfo';
                  break;
              }
              // this.popover.busiUnit = cur=='4'? 'supplierbase': 'busiUnit';
              break;
            case 'receiveUnit':
              if (cur == '4') {
                item.btn = false;
                item.disabled = true;
                item.rules = [];
              } else {
                item.btn = true;
                item.disabled = false;
                // 									item.rules = [{
                // 										required: true,
                // 										message: '必填',
                // 										trigger: 'blur'
                // 									}];
              }
              break;
          }
        }
      },
      deep: true
    },
    // 监听商品明细的按钮参数
    'table.tabString': {
      handler (cur, pre) {
        if (cur == 'goodsdetail') {
          this.handlerTableClick({ name: this.table.tableName })
        } else {
          this.handlerChildTabClick({ name: this.formDialog.otherTabName })
        }
      },
      deep: true
    },
    'CustomsHead.customsType' () {
      this.setCnFieldName()
    }
  },
  computed: {
    ...mapGetters([
      'getActivePathData'
    ]),
    tabObj: () => ([
      { name: 'formbase', label: '基本资料' },
      { name: 'other', label: '其他信息' },
      // { name: 'declaration', label: '报关信息' },
      { name: 'inspection', label: '报关报检信息' },
    ]),
    otherTabObj: () => ([
      { name: 'container', label: '集装箱' },
      { name: 'attached', label: '附件单' },
    ]),
    tableObj: () => ([{ name: 'goodsdetail', label: '商品明细' }]),
    clickTypeAsync () {
      return {
        'search': async () => {
          const { data: { list, count } } = await api.querySearch(`/customs${this.formDialog.otherTabName}`, { ...this.formDialog.paper, customsFormCode: this.CustomsHead.customsFormCode });
          list && (this.utools.turnCodeBoolean(list), this.formDialog.otherTabDate = list, this.formDialog.paper.tableCount = count);
        },
        'add': () => {
          this.formDialog.isShowPopover = true;
          this.formDialog.ruleForm = { ...new OtherTabFormData(), customsFormCode: this.CustomsHead.customsFormCode };
        },
        'edit': () => {          this.utools.titleCallBack.bind(this)(this.formDialog.clickRow, async () => {
            try {
              const { data } = await api.searchOneData(`/customs${this.formDialog.otherTabName}`, { itemCode: this.formDialog.clickRow.itemCode });
              this.formDialog.ruleForm = this.formDialog.clickRow = data;
              this.formDialog.isShowPopover = true;
            } catch (e) { console.log(e) }
          })        },
        'delete': () => {
          this.utools.titleCallBack.bind(this)(this.formDialog.clickRow, () => {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { status, data: { list, count } } = await api.deleteData(`/customs${this.formDialog.otherTabName}`, this.formDialog.clickRow.itemCode);
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.clickTypeAsync['search']()
              } catch (e) { console.log(e) }
            })
          })
        },
      }
    },
    // 商品明细按钮事件
    clickTypeGoodsAsync () {
      return {
        'search': async () => {
          const { data: { list, count } } = await api.querySearch(`/${this.table.tableName}`, { ...this.formDialog.paper, customsFormCode: this.CustomsHead.customsFormCode });
          list && (
            this.utools.turnCodeBoolean(list),
            this.table.tableData = this.table.tableName === 'goodsdetail' ? list.map((item, i) => {
              item.index = ((this.formDialog.paper.pageIndex || 1) - 1) * (this.formDialog.paper.pageSize || 10) + (++i);
              return item
            }) : list,
            this.table.pageCount = count
          );
        },
        'add': () => (
          this.formDialog.isShowPopover = true,
          this.formDialog.ruleForm = { ...new RuleForm(), customsFormCode: this.CustomsHead.customsFormCode }
        ),
        'edit': () => {
          this.utools.titleCallBack.bind(this)(this.table.clickRowData, async () => {
            try {
              const { data } = await api.searchOneData(`/${this.table.tableName}`, { itemCode: this.table.clickRowData.itemCode });
              this.formDialog.ruleForm = this.table.clickRowData = data;
              this.formDialog.isShowPopover = true;
            } catch (e) {
              console.log(e)
            }
          })
        },
        'delete': () => {
          if (this.status === 'add') {
            this.utools.titleCallBack.call(this, this.table.clickRowData, this.handleDeletegoodsdetail);
            return;
          }
          this.utools.titleCallBack.call(this, this.table.clickRowData, () => {
            this.utools.deleteMessage.call(this, async () => {
              try {
                const { status, data: { list, count } } = await api.deleteData(`/${this.table.tableName}`, this.table.clickRowData.itemCode);
                this.utools.alertMessage.call(this, status, null, '删除')
                this.clickTypeGoodsAsync['search']()
              } catch (e) { console.log(e) }
            })
          })
        },
      }
    },
    WHITE_LIST () {
      return [
        'destination', 'packagingType', 'receiveUnit', 'overseaShipper',
        'busiUnit', 'storagePlace', 'goodsName', 'originPlaceName', 'desCountryName', 'superConditions', 'homeShipperName'
      ]
    }
  },
  methods: {
    ...mapMutations([
      'addbreadCrumbsList'
    ]),

    // 报关类型变化是 修改 中文字段的显示
    setCnFieldName () {
      if (!this.CustomsHead.customsType) return;
      if(this.CustomsHead.customsType == '3' || this.CustomsHead.customsType == 4){
        this.CustomsHead.customsType = '1'
        this.utools.alertStatusMessage.call(this, { msg: { warning: '不可选择中国金内外' } })
        return;
      }
      let [entryPort, destination, category, importTime] = new Map([
        ['1', ['入', '目的地', '进', '进口']],
        ['2', ['出', '货源地', '出', '出口']]
      ]).get(this.CustomsHead.customsType);
      this.utools.setFormConfig(this.formConfig,
        [
          { key: 'entryPort', name: `${entryPort}境口岸` },
          { key: 'destination', name: `境内${destination}` },
          { key: 'category', name: `${category}境关别` },
          { key: 'importTime', name: `${importTime}日期` }
        ]
      )
    },

    // 单据状态 为新增时 删除 商品信息 
    handleDeletegoodsdetail () {
      const { itemCode } = this.table.clickRowData,
        i = this.table.tableData.findIndex(item => item.itemCode === itemCode),
        j = this.table.tempData.findIndex(item => item.itemCode === itemCode);
      let alert = { msg: { warning: '请选择一条数据！', success: '删除成功！' } };
      if (!!~i) {
        this.table.tableData.splice(i, 1), this.table.tempData.splice(j, 1);
        alert.status = 200;
      }
      this.utools.alertStatusMessage.call(this, alert)
    },
    /************************** 弹窗methods start *******************/
    handleBtnClick: (() => { //点击查询栏按钮事件
      var obj = null;
      return function (type, clear) {
        // console.log(type, clear)
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
        search: async () => {
          try {
            var { data: { count, list } } = await api.querySearch(this.popover.apiKey, { ...this.popover.ruleForm, status: this.WHITE_LIST.includes(this.searchTarget) ? '2' : '' })
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (e) {
            console.log(e)
          }
          // 清空查询数据
          this.popover.queryBarObj.map((e, i) => {
            if (this.popover.ruleForm[e.moduleBind])
              this.popover.ruleForm[e.moduleBind] = '';
          })
        },
      };
    },

    //table
    handlerSubPreservation (rowData, key) {
      if (this.tabForm[key] !== undefined) {
        if (key === 'contractNo') {
          this.tabForm[key] = rowData['agreementNo'];
          this.tabForm['contractName'] = rowData['agreementName']
        } else if (key === 'deliveryNo') {
          this.tabForm[key] = rowData['scheduleBaseCode'];
          this.tabForm['conveyance'] = rowData['platesNo'];
          this.tabForm['loadingTime'] = rowData['planDate'];
        } else if (key === 'destination') {
          this.tabForm[key] = rowData['domesticDestinationName'];
          this.tabForm['destinationCode'] = rowData['domesticDestinationCode'];
        } else if (key === 'packagingType') {
          this.tabForm[key] = rowData['packageTypeName'];
          this.tabForm['packagingTypeCode'] = rowData['packageTypeCode'];
        } else if (key === 'receiveUnit') {
          let keyName, keyCode;
          switch (this.popover.busiUnit) {
            case 'companyinfo':
              keyName = 'companyName', keyCode = 'companyCode';
              break;
            case 'client':
              keyName = 'clientName', keyCode = 'clientNo';
              break;
            case 'customer':
              keyName = 'customerName', keyCode = 'customerNo';
              break;
            case 'supplierbase':
              keyName = 'supplierName', keyCode = 'supplierCode';
              break;
          }
          this.tabForm[key] = rowData[keyName];
          this.tabForm[`${key}Code`] = rowData[keyCode];
        } else if (key === 'overseaShipper') {
          this.tabForm[key] = rowData['companyName'];
          this.tabForm['overseaShipperCode'] = rowData['companyCode'];
        } else if (key === 'declarationUnit' || key === 'busiUnit') {
          let keyName = this.popover.busiUnit == 'supplierbase' ? 'supplierName' : 'companyName';
          let keyCode = this.popover.busiUnit == 'supplierbase' ? 'supplierCode' : 'companyCode';
          this.tabForm[key] = rowData[keyName];
          this.tabForm[`${key}Code`] = rowData[keyCode];
        } else if (key === 'storagePlace') {
          this.tabForm[key] = rowData['companyName'];
          this.tabForm['storagePlaceCode'] = rowData['companyCode'];
        } else if (key === 'supervisionType') {
          this.tabForm[key] = rowData['supervisionModeName'];
          this.tabForm['supervisionTypeCode'] = rowData['supervisionModeCode'];
        } else if (key === 'exemption') {
          this.tabForm[key] = rowData['exemptionName'];
          this.tabForm['exemptionCode'] = rowData['exemptionCode'];
        } else if (key === 'originCountry' || key === 'tradingCountry') {
          this.tabForm[key] = rowData['originName'];
          this.tabForm[`${key}Code`] = rowData['originName'];
        } else if (key === 'licenseOffice' || key === 'destinationOffice' || key === 'portOffice' || key === 'iqOffice') {
          this.tabForm[key] = rowData['institutionName'];
          this.tabForm[`${key}Code`] = rowData['institutionCode'];
        } else if (key === 'inspectionWay') {
          this.tabForm[key] = rowData['inspectionPurposeName'];
          this.tabForm['inspectionWayCode'] = rowData['inspectionPurposeCode'];
        } else if (key === 'homeShipperName') {
          this.tabForm[key] = rowData['companyName'], this.tabForm['homeShipper'] = rowData['companyCode'];
        } else {
          this.tabForm[key] = rowData[key];
          /* // 报关计划单请求商品信息
          if (key === 'planOrderNo') this.requestCommodity(rowData[key]); */
        }
      } if (this.formDialog.ruleForm[key] !== undefined) {
        if (key === 'containerSpecification' || key === 'containerCode') {
          this.formDialog.ruleForm[key] = rowData[key];
        } else if (key === 'orderNos') {
          this.formDialog.ruleForm[key] = rowData.map(item => item.entrustOrderNo);
        } else if (key === 'goodsName') {
          this.formDialog.ruleForm[key] = rowData[key];
          this.formDialog.ruleForm['goodsCode'] = rowData['goodsCode'];
          this.formDialog.ruleForm['orderNos'] = [rowData['entrustOrderNo']];
        } else if (key === 'originPlaceName') {
          this.formDialog.ruleForm[key] = rowData["originName"];
          this.formDialog.ruleForm["originPlaceCode"] = rowData["originCode"];
        } else if (key === 'desCountryName') {
          this.formDialog.ruleForm[key] = rowData["arrivalCountryName"];
          this.formDialog.ruleForm["desCountryCode"] = rowData["arrivalCountryCode"];
        } else if (key === 'superConditions') {
          this.formDialog.ruleForm[key] = rowData['billName'];
          this.formDialog.ruleForm['superConditionsCode'] = rowData['billCode'];
        } else {
          this.formDialog.ruleForm[key] = rowData[key];
        }
      } else if (key === 'planOrderNo') {
        this.CustomsHead = { ...this.CustomsHead, [key]: rowData[key] };
        // 报关计划单请求商品信息 和 
        Promise.all([this.requestCommodity(rowData[key]), this.setFormTranstion(rowData)])
      } else if (key === 'superConditions') {
        this.formDialog.ruleForm = { ...this.formDialog.ruleForm, superConditions: rowData['billName'], superConditionsCode: rowData['billCode'] }
      } else if (key === 'originPlaceName') {
        this.formDialog.ruleForm = { ...this.formDialog.ruleForm, originPlaceName: rowData['originName'], originPlaceCode: rowData['originCode'] }
      } else if (key === 'desCountryName') {
        this.formDialog.ruleForm = { ...this.formDialog.ruleForm, desCountryName: rowData['arrivalCountryName'], desCountryCode: rowData['arrivalCountryCode'] }
      }
      this.$forceUpdate()
    },
    // 获取报关计划单的商品信息
    async requestCommodity (planOrderNo) {
      if (!planOrderNo) return;
      this.table = { ...this.table, clickRowData: {}, tableData: [], tempData: [], pageCount: 0 };
      try {
        const { data, status } = await api.getImportCustomGoodsList({ planOrderNo, customsFormCode: this.CustomsHead.customsFormCode });
        this.table = { ...this.table, tempData: data, pageCount: data.length, tableData: this.utools.cloneObj(data.slice(0, 10)) };
      } catch (error) {
        console.log(error)
      }
    },
    setFormTranstion (data = {}) {
      let obj = {
        // headForm
        customType: 'customsType', // 报关类型
        customTitle: 'customsFormType', //  报关单类型
        // tabForm
        deliveryOrderNo: 'deliveryNo', // 提运单号
        transportMachine: 'conveyance', // 运输工具
        customCurrency: 'currencyType', // 报关币别 
        unitType: 'unitType', // 收发货单位类型 
        packageKind: 'packagingType', // 包装种类
        receiveUnitName: 'receiveUnitName', // 收货单位 
        receiveUnitCode: 'receiveUnitCode',
        totalAmount: 'totalAmount', // 报关总金额
        quantity: 'pieces', // 件数
        netWeight: 'netWeight', // 净重
        grossWeight: 'grossWeight', //  毛重 
        businessUnitName: 'busiUnit', //  经营单位
        businessUnitCode: 'busiUnitCode',
        containerNo: 'containerNo', //  集装箱号
        entryPort: 'entryPort', //  入境口岸
        loadingDate: 'loadingTime', // 计划装车日期
        dealMode: 'transactionMode', // 成交方式
        contractNo: 'contractNo', // 合同协议号
        contractName: 'contractName' // 合同协议
      };
      for (let item of Object.keys(data)) {
        if (item === 'customType' || item === 'customTitle') {
          this.CustomsHead[obj[item]] = data[item];
          continue
        }
        this.tabForm[obj[item]] = data[item]
      }
    },
    popoverParamsFn (pop) {
      this.popover = { ...this.popover, ...pop }
    },
    rousePopover (key) {
      console.log(`当前点击弹窗对象${key}`)
      let tabDialogParam = {
        'formbase': ['contractNo', 'deliveryNo', 'destination', 'packagingType', 'receiveUnit', 'overseaShipper', 'busiUnit', 'storagePlace'],
        'other': ['supervisionType', 'exemption', 'originCountry', 'tradingCountry', 'declarationUnit'],
        'inspection': ['iqOffice', 'licenseOffice', 'destinationOffice', 'portOffice', 'inspectionWay']
      }
      if (key === 'planOrderNo') {
        // 报关计划单 的弹窗
        let popover = {
          planOrderNo: {
            queryCode: 'planOrderNo',
            apiKey: '/importcustomorder',
            itemName: '报关计划',
            configUrl: 'custom/ImportCustomOrder'
          }
        }
        this.popoverParamsFn(popover[key])
      } else if (this.tabForm[key] !== undefined) {
        let popover = {
          'contractNo': {
            queryCode: 'agreementNo',
            apiKey: '/agreement',
            itemName: '协议管理',
            configUrl: 'business/Agreement',
          },
          'deliveryNo': {
            queryCode: 'busEntrustNo',
            apiKey: '/hkschedulebase',
            itemName: '上货计划',
            configUrl: 'logistics/HkscheduleBase',
          },
          'destination': {
            queryCode: 'domesticDestinationCode',
            apiKey: '/domesticdestination',
            itemName: '境内目的地',
            configUrl: 'basicdata/DomesticDestination',
          },
          'packagingType': {
            queryCode: 'packageTypeCode',
            apiKey: '/packagetype',
            itemName: '包装种类',
            configUrl: 'basicdata/PackageType',
          },
          'overseaShipper': {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司',
            configUrl: 'basicdata/CompanyInfo',
          },
          'storagePlace': {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司列表',
            configUrl: 'basicdata/CompanyInfo',
          },
          'supervisionType': {
            queryCode: 'supervisionModeCode',
            apiKey: '/supervisionmode',
            itemName: '监管方式',
            configUrl: 'basicdata/SupervisionMode',
          },
          'exemption': {
            queryCode: 'exemptionCode',
            apiKey: '/exemption',
            itemName: '征免性质',
            configUrl: 'basicdata/Exemption',
          },
          'originCountry': {
            queryCode: 'originCode',
            apiKey: '/origin',
            itemName: '国家',
            configUrl: 'basicdata/Origin',
          },
          'iqOffice': {
            queryCode: 'institutionCode',
            apiKey: '/institution',
            itemName: '机关信息',
            configUrl: 'basicdata/Institution',
          },
          'inspectionWay': {
            queryCode: 'inspectionPurposeCode',
            apiKey: '/inspectionpurpose',
            itemName: '报检用途',
            configUrl: 'basicdata/InspectionPurpose',
          },
          'homeShipperName': {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司',
            configUrl: 'basicdata/CompanyInfo',
          }
        }
        popover['busiUnit'] = this.popover.busiUnit == 'supplierbase'
          ? {
            queryCode: 'supplierCode',
            apiKey: '/supplierbase',
            itemName: '供应商列表',
            configUrl: 'basicdata/SupplierBase',
          }
          : {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司列表',
            configUrl: 'basicdata/CompanyInfo',
          };
        popover['receiveUnit'] = this.popover.busiUnit == 'companyinfo'
          ? {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司列表',
            configUrl: 'basicdata/CompanyInfo',
          }
          : this.popover.busiUnit == 'client'
            ? {
              queryCode: 'clientNo',
              apiKey: '/client',
              itemName: '委托方',
              configUrl: 'business/Client',
            }
            : this.popover.busiUnit == 'customer'
              ? {
                queryCode: 'customerNo',
                apiKey: '/customer',
                itemName: '客户列表',
                configUrl: 'basicdata/Customer',
              }
              : {
                queryCode: 'supplierbase',
                apiKey: '/supplierbase',
                itemName: '供应商',
                configUrl: 'basicdata/SupplierBase',
              };
        let unitArr = ['declarationUnit', 'busiUnit'];
        let countryArr = ['tradingCountry', 'originCountry'];
        let officeArr = ['licenseOffice', 'destinationOffice', 'portOffice', 'iqOffice'];
        let thisKey = unitArr.includes(key) ? 'busiUnit' : countryArr.includes(key) ? 'originCountry' : officeArr.includes(key) ? 'iqOffice' : key;
        this.popoverParamsFn(popover[thisKey])
      } else /* if (this.formDialog.ruleForm[key] !== undefined)  */ {
        this.popover.popoverType = key == 'orderNos' ? 'selectTable' : 'table'; // 委托单号是多选表格
        let popover = {
          'containerCode': {
            queryCode: 'containerCode',
            apiKey: '/container',
            itemName: '集装箱基础资料',
            configUrl: 'basicdata/Container',
          },
          'orderNos': {
            queryCode: 'entrustOrderNo',
            apiKey: '/entrustorder',
            itemName: '委托订单',
            configUrl: 'commerce/EntrustOrder',
          },
          'goodsName': {
            queryCode: 'goodsCode',
            apiKey: '/entrustgoods',
            itemName: '委托订单-商品明细',
            configUrl: 'commerce/EntrustGoods',
          },
          'originPlaceName': {
            queryCode: 'originCode',
            apiKey: '/origin',
            itemName: '原产地',
            configUrl: 'basicdata/Origin',
          },
          'desCountryName': {
            queryCode: 'arrivalCountryCode',
            apiKey: '/arrivalcountry',
            itemName: '运抵国',
            configUrl: 'basicdata/ArrivalCountry',
          },
          'superConditions': {
            queryCode: 'billCode',
            apiKey: '/supervisioncondition',
            itemName: '监管条件',
            configUrl: 'basicdata/SupervisionCondition',
          },
        }
        let containerKey = ['containerSpecification', 'containerCode'];
        let thisKey = containerKey.includes(key) ? 'containerCode' : key;
        this.popoverParamsFn(popover[thisKey])
      }
      this.searchTarget = key;

      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          this.popover = {
            ...this.popover,
            queryBarObj: [{ label: "编码", moduleBind: this.popover.queryCode, isInput: true }],
            popoverListKey: require('@/domain/tableconfig/' + this.popover.configUrl).default
          }
          try {
            let queryData = {};
            if (key === 'goodsName') {
              queryData = { entrustOrderNos: this.formDialog.ruleForm.orderNos }
            } else if (key === 'planOrderNo') {
              queryData = { hasCustomed: true }
            }

            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, {
              ...this.popover.ruleForm,
              ...queryData, status:
                this.WHITE_LIST.includes(this.searchTarget) ? '2' : ''
            })
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (error) {
            console.log(error);
          }
          this.popover.ruleForm = {};
        },
      }
      this.popover.currencySelectInputKey = key;
      key && currencyObj[key]();
      console.log(this.popover.isShowPopover)
      this.popover.isShowPopover = !this.popover.isShowPopover;
    },
    closeTableDialog () {
      if (!this.popover.isShowPopover) return;
      this.popover.isShowPopover = !this.popover.isShowPopover
    },
    //分页
    handlePageChange (paper) {
      this.popover.ruleForm = { ...this.popover.ruleForm, ...paper }
      this.handleBtnClick('search'); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    async handlerTabClick ({
      name
    } = tab, event) {
      // 暂存 tabForm  / this.activeName 会存入
      this.tabData.tempData = this.utools.cloneObj(this.tabForm);
      try {
        let newValCase = name == 'formbase' ? 'formBase' : name;
        newValCase = this.utools.capitalize(newValCase);
        this.formConfig = require('@/domain/formconfig/custom/Customs' + newValCase).default;
        api.initSelect(this.formConfig);
        TabForm = require('@/domain/entities/custom/Customs' + newValCase).default;
        this.setCnFieldName(); // 设置中文字段名
        // 初始化设置 tabForm表单 的 实体内容
        {
          let newForm = new TabForm();
          newForm.customsFormCode = this.CustomsHead.customsFormCode;
          newForm.status = this.CustomsHead.status;
          this.tabForm = newForm;
        }
        let isNull = !Object.keys(this.tabData[this.activeName]).length;
        if (this.status !== 'add' && isNull) {
          const { data: { list } } = await api.querySearch('/customs' + (name == 'declaration' ? 'inspection' : name), { customsFormCode: this.CustomsHead.customsFormCode });
          list.length && (this.tabForm = list[0]);
        } else {
          let isNull = !!Object.keys(this.tabData[this.activeName]).length;
          isNull && (this.tabForm = this.utools.cloneObj(this.tabData[this.activeName]));
        }
        // 子主键
        this.customsCode = this.activeName == 'other' ?
          { customsOtherCode: this.tabForm.customsOtherCode } :
          { inspectionCode: this.tabForm.inspectionCode };
        if (name === 'formbase') {
          this.CustomsFormBase = this.tabForm;
        } else {
          // 切换页签 深克隆 基本资料 信息 
          this.CustomsFormBase = this.utools.cloneObj(this.CustomsFormBase);
        }
        /*   if (name === 'formbase') {
            if (this.status !== 'add') {
              // this.CustomsHead = this.tabForm;
              // this.CustomsFormBase = this.tabForm;
              // this.utools.setSession('formData', this.tabForm)
            }
          } else {
            // this.CustomsHead = this.utools.getSession('formData');
            // this.CustomsFormBase = this.utools.getSession('formData')
          } */
      } catch (error) {
        console.log(error)
      }
    },
    // 切换子表页签
    async handlerChildTabClick ({
      name
    } = tab, event) {
      OtherTabFormData = require("@/domain/entities/custom/Customs" + this.utools.capitalize(name)).default;
      this.formDialog.ruleForm = { ...new OtherTabFormData(), customsFormCode: this.CustomsHead.customsFormCode };
      this.formDialog.formConfig = require("@/domain/formconfig/custom/Customs" + this.utools.capitalize(name)).default;
      this.formDialog.otherTabTableConfig = require("@/domain/tableconfig/custom/Customs" + this.utools.capitalize(name)).default;
      api.initSelect(this.formDialog.formConfig);
      this.clickTypeAsync['search']()
      // this.formDialog.clickRow = {}; // 清空当前行数据
    },
    async handlerTableClick ({
      name
    } = tab, event) {
      name = name == 'goodsdetail' ? 'goodsDetail' : name;
      RuleForm = require("@/domain/entities/custom/" + this.utools.capitalize(name)).default;
      let formDialogIsNull = !!Object.keys(this.formDialog.ruleForm);
      !formDialogIsNull && (this.formDialog.ruleForm = { ...new RuleForm(), customsFormCode: sessionStorage.customsFormCode });
      this.formDialog.formConfig = require("@/domain/formconfig/custom/" + this.utools.capitalize(name)).default;
      this.table.tableConfig = require("@/domain/tableconfig/custom/" + this.utools.capitalize(name)).default;
      api.initSelect(this.formDialog.formConfig)
      this.status === 'update' && this.clickTypeGoodsAsync['search']()
      // this.table.clickRowData = {}; // 清空当前行数据
    },
    // 点击取消按钮，回到列表页
    handlerBack () {
      this.$router.push("M0606");
      sessionStorage.clear()
    },
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    handlerTabFormVerify ($refs) {
      this.tabVerify = $refs;
    },
    isVerify () {
      let isVerify = false;
      this.verify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    isTabVerify () {
      let isVerify = false;
      this.tabVerify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    // 保存
    async handlerPreserve () {
      const { status } = this;
      let formData = { ...this.CustomsFormBase, /* ...this.CustomsHead,  */customsFormCode: this.CustomsHead.customsFormCode };
      for (let key in this.CustomsHead) {
        // 这步是为了避免该集合数据被覆盖
        this.CustomsHead.hasOwnProperty(key) && !this.CustomsFormBase[key] && (formData[key] = this.CustomsHead[key])
      }
      status == 'add' && (formData.goodsDetailList = this.table.tempData);
      if (this.isVerify() && this.isTabVerify()) {
        let statusMessage = '';
        this.isLoading = true;
        // 状态为 新增和修改 调用 不一样的 method
        try {
          let apiType = this.status === 'add' ? 'addcustomsformbaseData' : 'editcustomsformbaseData';
          const {
            data,
            status
          } = await api[apiType](formData);
          this.CustomsFormBase = { ...this.CustomsFormBase, status: '1' }
          statusMessage = status;
          if (this.status === 'add') this.handlerTableClick({ name: 'goodsdetail' });
          this.status = 'update';
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoading = false;
        }
        this.utools.alertMessage.bind(this)(statusMessage);
        this.status == 'add' && (statusMessage = 200);
      }
    },

    async saveTab () {
      if (this.isVerify() && this.isTabVerify()) {
        let statusMessage = ''; this.isTabLoading = true;
        // 状态为 新增和修改 调用 不一样的 method
        let formData = {
          ...this.tabForm,
          ...this.customsCode, // 子主键
          customsFormCode: this.CustomsHead.customsFormCode,
          customsNo: this.CustomsHead.customsNo,
          customsType: this.CustomsHead.customsType,
        }
        try {
          // let apiType = this.status === 'add'? 'addData': 'editData';
          const {
            data,
            status
          } = await api.addData(`/customs${this.activeName}`, formData);
          statusMessage = status;
        } catch (e) { console.log(e) } finally {
          this.isTabLoading = false;
        }
        this.utools.alertMessage.bind(this)(statusMessage);
      }
    },
    // 打开other子tab的form弹窗
    openOtherFormDialog (btnKey) {
      this.table.tabString = this.formDialog.otherTabName; // 主列表商品明细的标识符
      this.formDialog.btnKey = btnKey;
      this.clickTypeAsync[btnKey]();
    },
    // 打开商品明细的新增，修改弹窗
    openTablePopForm (btnKey, tabString) {
      this.table.tabString = tabString, // 主列表商品明细的标识符
        this.formDialog.btnKey = btnKey;
      if (this.status === 'add' && btnKey !== 'delete') {
        const isNull = !!!Object.keys(this.table.clickRowData).length;
        if (isNull) {
          this.utools.alertStatusMessage.call(this, { msg: { warning: '请选择一条数据' } })
          return
        }
        this.formDialog.ruleForm = this.utools.cloneObj(this.table.clickRowData),
          this.formDialog.isShowPopover = true;
        return;
      }
      // 单据状态为 修改时
      this.clickTypeGoodsAsync[btnKey]();
    },
    // 弹窗提交
    async handlerOtherSubmit () {
      if (this.status === 'add' && this.table.tabString === 'goodsdetail') {
        // 单据状态为新增 时 的 商品信息修改操作
        const { itemCode } = this.formDialog.ruleForm,
          i = this.table.tempData.findIndex(item => item.itemCode === itemCode),
          j = this.table.tableData.findIndex(item => item.itemCode === itemCode);
        let msg = {};
        if (~i) {
          const data = this.utools.cloneObj(this.formDialog.ruleForm)
          this.table.tempData[i] = data, this.table.tableData[j] = data;
          this.table = this.utools.cloneObj(this.table);
          msg = { status: 200, msg: { success: '保存成功' } }
          this.formDialog.isShowPopover = false;
          this.formDialog.ruleForm = {};
        } else {
          msg = { msg: { warning: '无法保存，请重试' } }
        }
        this.utools.alertStatusMessage.call(this, msg)
      } else {
        // 单据状态为修改时
        let sCode = 0;
        try {
          let apiType = this.formDialog.btnKey === 'add' ? 'addData' : 'editData';

          // tabString 为 goodsdetail（字表 商品信息）和其他 页签不同
          let apiUrl = this.table.tabString === 'goodsdetail' ?
            (this.formDialog.btnKey === 'add' ? '/goodsdetail/insertOrderNo' : `/${this.table.tableName}`) :
            `/customs${this.formDialog.otherTabName}`;

          let {
            data,
            status
          } = await api[apiType](apiUrl, this.formDialog.ruleForm);
          this.formDialog.isShowPopover = false;
          this.table.tabString === 'goodsdetail' ? this.clickTypeGoodsAsync['search']() : this.clickTypeAsync['search']();
          sCode = status
        } catch (e) {
          console.log(e);
        } finally {
          this.utools.alertMessage.call(this, sCode);
        }
      }
    },
    // 取消弹窗
    closeFormDialog () {
      if (!this.formDialog.isShowPopover) return;
      this.formDialog.isShowPopover = !this.formDialog.isShowPopover
    },
    // 选中当前行
    clickTabRow (row) {
      this.formDialog.clickRow = row;
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    // 选中当前行
    clickTableRow (row) {
      this.table.clickRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getcustomsformbaseCode()
        // console.log(data)
        sessionStorage.customsFormCode = this.CustomsHead.customsFormCode = data;
        this.CustomsHead = { ...this.CustomsHead, billStatus: '10', customsStatus: '2' }
        // this.tabRequest() // 进来修改时默认加载页签表格
      } catch (e) { console.log(e) }
    },
    // 加载子列表
    otherTabRequest (params = {}) {
      if (!this.CustomsHead.customsFormCode) return;
      this.formDialog.paper = params
      this.clickTypeAsync['search']()
    },
    // 加载列表
    tabRequest (params = {}) {
      if (!this.CustomsHead.customsFormCode) return;
      this.formDialog.paper = params
      this.clickTypeGoodsAsync['search']()
    },
    // 初始化数据
    initData () {
      api.initSelect(this.CustomsHeadKey);
      // 切换路由数据保存
      const { formData: { CustomsHead = {}, CustomsFormBase = {}, tabData, goodsdetail }, status } = this.getActivePathData(this.$route.path);
      tabData && (this.tabData = tabData); // 页签的数据
      goodsdetail && this.getStatusGoodsdetail(goodsdetail);
      this.CustomsHead = CustomsHead, this.CustomsFormBase = CustomsFormBase;
      this.status = status;
      if (status === 'add' && !this.CustomsHead.customsFormCode) this.loadCodeNo();
      this.handlerTabClick({ name: 'formbase' })
      this.handlerChildTabClick({ name: 'container' })
      this.handlerTableClick({ name: 'goodsdetail' })
    },

    // 单据状态为新增时 切换页签回 商品信息
    getStatusGoodsdetail (data = []) {
      this.table.tempData = data;
      this.table.tableData = this.table.tempData.slice(0, 10);
    },

    // 导出  INVOICE 装箱单
    async handleExport () {
      const { type } = this.downFileDialog.data;
      let path, name;
      switch (type) {
        case 'INVOICE':
          path = '/customsformbase/export/invoice/';
          name = 'INVOICE'
          break;
        case 'container':
          path = '/customsformbase/export/packinglist/';
          name = '集装箱'
      };
      try {
        this.utools.downFile(`${path}${this.CustomsHead.customsFormCode}`);
        this.downFileDialog.visible = false, this.downFileDialog.data.type = ''
      } catch (error) {
        this.$message.error('下载失败！，请重试')
        console.log(error)
      }
    }
  },

  created () {
    this.initData();
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    // 页签切换时 保存 当前 页签的内容
    this.tabData[this.activeName] = this.tabForm;
    let obj = {
      data: { formData: { CustomsHead: this.CustomsHead, CustomsFormBase: this.CustomsFormBase, tabData: this.tabData }, status: this.status },
      path: this.$route.path,
    }
    if (this.status === 'add') obj.data.formData.goodsdetail = this.table.tempData;
    this.addbreadCrumbsList(obj);
    next();
  }
};
</script>
<style lang="less">
.customs-form-base {
  .formConfig {
    padding: 0 0 20px;
  }
  .saveBtn {
    width: 80px !important;
    height: 30px !important;
  }
}
</style>
