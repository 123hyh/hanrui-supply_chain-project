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
            v-for="(item,i) of [{label: '关务管理'},{label: '关务基础资料'},{label: breadcrumbTitle}]"
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
/**
 * @module appHelper api接口
 * 
 */
import appHelper from '@/assets/js/appHelper'
import levelThreeMenuMixins from '@/assets/js/mixins/levelThreeMenu.js'
import Pagination from '@/components/common/Pagination'

export default {
  provide () {
    return {
      // formEvents: this.formEvents
      path: this.route
    }
  },
  mixins: [levelThreeMenuMixins],
  props: {
    btnObj: {
      type: Array,
      default: () => [
        // 暂时
        { label: "查询", type: "search" },
        { label: "新增", type: "add" },
        { label: "操作", type: "update" },
        { label: "删除", type: "delete" }
      ]
    }
  },
  components: {
    Pagination,
    MaterielBaseList: _ => import('@/components/views/basicdata/MaterielBaseList.vue'), // 物料基础
    MaterielFinanceList: _ => import('@/components/views/basicdata/MaterielFinanceList.vue'), //物料财务
    MaterielCustomList: _ => import('@/components/views/basicdata/MaterielCustomList.vue'), //	物料海关信息
    MaterielLogisticsList: _ => import('@/components/views/basicdata/MaterielLogisticsList.vue'), //物料物流
    ShippingBillList: _ => import('@/components/views/basicdata/ShippingBillList.vue'), //	关务舱单
    // UnitConvertList: () =>import('@/components/views/basicdata/UnitConvertList.vue'), //	海关单位转换
    ContainerList: _ => import('@/components/views/basicdata/ContainerList.vue'), // 集装箱信息
    SupervisionConditionList: _ => import('@/components/views/basicdata/SupervisionConditionList.vue'), //	监管条件
    ProductTaxList: _ => import('@/components/views/basicdata/ProductTaxList.vue'), //	客品税号
    ClearanceFeesList: _ => import('@/components/views/basicdata/ClearanceFeesList.vue'), //	关务清关费用
    CustomsTariffList: _ => import('@/components/views/basicdata/CustomsTariffList.vue'), //	税则表
    CustomsMaterielList: _ => import('@/components/views/basicdata/CustomsMaterielList.vue'), //	物料税号表/商品税号
    // MailSendLogList: ()=> import('@/components/views/basicdata/MailSendLogList.vue'), //	税单邮件发送日志
    // CustomsRecordList: ()=>import('@/components/views/basicdata/CustomsRecordList.vue'), //	报单删改记录
    SourceBillList: _ => import('@/components/views/basicdata/SourceBillList.vue'), //	原始舱单
    // GoodsTaxList: ()=>import('@/components/views/basicdata/GoodsTaxList.vue'),	//	商品税号
    ExemptionList: _ => import('@/components/views/basicdata/ExemptionList.vue'),	//	征免性质
    BrandList: _ => import('@/components/views/basicdata/BrandList.vue'),	//	品牌
    BrandOriginList: _ => import('@/components/views/basicdata/BrandOriginList.vue'),	//	物料品牌产地
    ControlledGoodsApplyList: _ => import('@/components/views/basicdata/ControlledGoodsApplyList.vue'),	//管制品申请表
    OriginList: _ => import('@/components/views/basicdata/OriginList.vue'),	//	原产国(地区)/启运国(地区)
    ArrivalCountryList: _ => import('@/components/views/basicdata/ArrivalCountryList.vue'),	//	运抵国
    SupervisionModeList: _ => import('@/components/views/basicdata/SupervisionModeList.vue'),	//	监管方式
    MaterialBrand: _ => import('@/components/views/basicdata/MaterialBrand.vue'), // 物料品牌
    MaterialOrigin: _ => import('@/components/views/basicdata/MaterialOrigin.vue'), // 物料产地
    DomesticDestination: _ => import('@/components/views/basicdata/DomesticDestinationList.vue'), // 境内目的地
    DeliveredGoodsPlace: _ => import('@/components/views/basicdata/DeliveredGoodsPlaceList.vue'), // 境内货源地
    PackageType: _ => import('@/components/views/basicdata/PackageTypeList.vue'), // 包装种类
    Institution: _ => import('@/components/views/basicdata/InstitutionList.vue'), // 检验检疫机关信息
    InspectionPurpose: _ => import('@/components/views/basicdata/InspectionPurposeList.vue'), // 报检用途
    Customhouse: _ => import('@/components/views/basicdata/Customhouse.vue'), // 关区代码
    Reasons: _ => import('@/components/views/basicdata/Reasons.vue'), // 关联理由代码
    Credentials: _ => import('@/components/views/basicdata/Credentials.vue'), // 监管证件代码
    EnterpriseQualification: _ => import('@/components/views/basicdata/EnterpriseQualification.vue'), // 企业资质代码
    OriginArea: _ => import('@/components/views/basicdata/OriginArea.vue'), // 原产地区代码
    GoodsAttribute: _ => import('@/components/views/basicdata/GoodsAttribute.vue'), // 货物属性代码
  },
  data () {
    return {
      delVisible: false,
      form: {
        name: '',
        date: '',
        address: ''
      },
      idx: -1,

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
      // 事件bus

      popForm: false,

      breadcrumbTitle: '物料基础信息', // 面包屑默认
      // 侧栏数据
      SubMenus: [],
      route: {
        location: 'M060120'
      },
      childName: 'MaterielBaseList',
    }
  },
  created () {
    //this.handleSelect('物料海关信息'); //改变
    // 加载列表数据
    // this.queryData()
  },
  computed: {
    data () { }
  },
  methods: {
    handlerMenuItemClick ({ menuCode, menuName } = data) {
      this.breadcrumbTitle = menuName;
      let obj = {
        'M060120': 'MaterielBaseList',
        'M060121': 'MaterielFinanceList',
        'M060122': 'MaterielLogisticsList',
        'M060115': 'MaterielCustomList',
        'M060101': 'ShippingBillList',
        'M060102': 'UnitConvertList',
        'M060103': 'ContainerList',
        'M060104': 'SupervisionConditionList',
        'M060105': 'ProductTaxList',
        'M060106': 'ClearanceFeesList', //	关务清关费用缺省
        'M060107': 'CustomsTariffList',
        'M060108': 'CustomsMaterielList',
        'M060109': 'MailSendLogList',
        'M060111': 'CustomsRecordList',
        'M060112': 'SourceBillList',
        // 'M060113': 'GoodsTaxList',
        'M060114': 'ExemptionList',
        'M060116': 'BrandOriginList',
        'M060117': 'BrandList',
        'M060118': 'OriginList',
        'M060119': 'ControlledGoodsApplyList',
        'M060123': 'ArrivalCountryList',
        'M060124': 'SupervisionModeList',

        'M060125': 'MaterialBrand',
        'M060126': 'MaterialOrigin',
        'M060127': 'DomesticDestination',
        'M060128': 'DeliveredGoodsPlace',
        'M060129': 'PackageType',
        'M060130': 'Institution',
        'M060131': 'InspectionPurpose',
        'M060135': 'Customhouse',
        'M060136': 'Reasons',
        'M060137': 'Credentials',
        'M060138': 'EnterpriseQualification',
        'M060139': 'OriginArea',
        'M060140': 'GoodsAttribute'
      };
      this.childName = obj[menuCode];
      this.route['location'] = menuCode;
    },
    //侧栏控件点击事件
    handleSelect (key, keyPath) {
      /* this.menuName = key;
      let menuArr = [{
        name: '物料海关信息',
        enName: 'Customs'
      }, {
        name: '关务舱单',
        enName: 'Manifest'
      }, {
        name: '关务海关单位转换',
        enName: 'Units'
      }, {
        name: '关务集装箱信息',
        enName: 'Container'
      }, {
        name: '关务监管条件',
        enName: 'Supervision'
      }, {
        name: '关务客品税号',
        enName: 'Duty'
      }, {
        name: '关务清关费用',
        enName: 'Clearance'
      }, {
        name: '关务税则表',
        enName: 'Schedule'
      }, {
        name: '关务物料税号表',
        enName: 'Material'
      }, {
        name: '电子税单邮件发送日志',
        enName: 'Email'
      }, {
        name: '报关单删改记录',
        enName: 'Declaration '
      }, {
        name: '原始舱单',
        enName: 'Original'
      }, {
        name: '商品税号',
        enName: 'Commodity'
      }, {
        name: '征免性质',
        enName: 'Nature'
      }]
      for (let i of menuArr) {
        if (i.name == key) {
          this.columnDataTable = require("@/domain/tableconfig/custom/CustomsFormBase/" + i.enName).default;
        }
      }
      console.log(this.columnDataTable)
      console.log(key, keyPath) */
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
