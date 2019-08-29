import { instance as service, isProd } from '@/assets/js/initApi.js'
import qs from 'qs'
import apiPort from '@/api/index.js'
import utools from '@/domain/common/utools.js'

// 创建 web api 地址
function createApiPath(path) {
  //  开发环境使用  /service
  return (isProd ? '/apis' : '/service') + path
}
let api = {
  apiPath(path) {
    return createApiPath(path)
  },

  // 最终出口
  _getData({ url, method, data, headers, responseType } = {}) {
    return service({
      url,
      method,
      headers: headers
        ? headers
        : {
            'Content-Type': 'application/json;charset=UTF-8'
          },
      responseType: !responseType ? 'json' : responseType,
      [method !== 'GET' ? 'data' : 'params']: data
    })
  },

  // 分页的处理
  _handlePage({ pageIndex = 1, pageSize = 10, ...data } = {}) {
    return {
      pageIndex,
      pageSize,
      ...data
    }
  },

  // 获取标题版权
  getCopyright() {
    return this._getData({
      url: `/prop/copyright`,
      method: 'GET'
    })
  },

  // 获取系统名称
  getSystemName() {
    return this._getData({
      url: `/prop/systemName`,
      method: 'GET'
    })
  },

  // 单据编号出口
  _getCode(keyword) {
    return this._getData({
      url: `/common/getCodeNo?bizCode=${keyword}`,
      method: 'GET'
    })
  },

  submitCreate(url, data) {
    return this._getData({
      url,
      method: 'POST',
      data
    })
  },

  // 单据状态 提交
  updateBillStatus({ type, code } = {}) {
    return this._getData({
      url: `/common/pubdata/${type}/${code.slice(0, 4)}/${code}`,
      method: 'PUT'
    })
  },

  // 修改业务单据状态
  /**
   * @param {string} type submit
   * @param {string} code 编码
   */
  updateBusinessBillsStatus({ type, code }) {
    return this._getData({
      url: `/common/bizdata/${type}/${code.slice(0, 4)}/${code}`,
      method: 'PUT'
    })
  },

  // 单据提交修改
  submitUpdate(url, data) {
    return this._getData({
      url,
      method: 'PUT',
      data
    })
  },

  query(url, data) {
    return this._getData({
      url,
      method: 'POST',
      data
    })
  },

  // 查询省份
  getProvince() {
    return this._getData({
      url: `/areainfo/province`,
      method: 'GET'
    })
  },

  // 城市列表 - 分页查询
  getCityList(data) {
    return this._getData({
      url: '/areainfo/city',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 查询城市
  getCity(code) {
    return this._getData({
      url: `/areainfo/city/${code}`,
      method: 'GET'
    })
  },

  // 获取区县
  getDistrict(code) {
    return this._getData({
      url: `/areainfo/district/${code}`,
      method: 'GET'
    })
  },

  // 普通 GET 请求
  get(path, data) {
    return this._getData({
      url: `${path}?${data}`,
      method: 'GET'
    })
  },
  // 获取所有数据
  queryAll(apiKey) {
    return this._getData({
      url: `${apiKey}/search`,
      method: 'POST',
      data: {}
    })
  },
  // search
  querySearch(apiKey, data) {
    return this._getData({
      url: `${apiKey}/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询所有角色
  queryAllrole() {
    return this._getData({
      url: '/role/all',
      method: 'GET'
    })
  },
  // add 新增
  addData(apiKey, data) {
    return this._getData({
      url: `${apiKey}/`,
      method: 'POST',
      data
    })
  },
  // 修改权限
  upuserrole(apiKey, data) {
    return this._getData({
      url: apiKey,
      method: 'POST',
      data
    })
  },
  // edit
  editData(apiKey, data) {
    return this._getData({
      url: `${apiKey}/`,
      method: 'PUT',
      data
    })
  },
  // delete /agreementsolution/N2034575
  deleteData(apiKey, codeNo) {
    return this._getData({
      url: `${apiKey}/${codeNo}`,
      method: 'DELETE'
    })
  },
  // searchOne  { itemCode: params.itemCode }
  searchOneData(apiKey, data) {
    return this._getData({
      url: `${apiKey}/searchOne`,
      method: 'GET',
      data
    })
  },
  // searchOne/itemCode
  searchOneApi(apiKey, itemCode) {
    return this._getData({
      url: `${apiKey}/searchOne/${itemCode}`,
      method: 'GET'
    })
  },
  upapiKey(apiKey) {
    return this._getData({
      url: `${apiKey}`,
      method: 'GET'
    })
  },
  // get itemCode /agreementsolution/itemCode
  getCode(url) {
    return this._getData({
      url,
      method: 'GET'
    })
  },
  // 首页菜单获取
  getIndexMenu() {
    return this._getData({
      url: '/menu/searchByUser',
      method: 'GET'
    })
  },

  // 登陆 login
  goLogin(data) {
    return this._getData({
      url: `auth/login?${data}`,
      method: 'POST',
      // data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 登出 logout
  goLogout() {
    return this._getData({
      url: `auth/logout`,
      method: 'POST'
    })
  },
  // 修改密码
  editPwd(data) {
    return this._getData({
      url: `/auth/setpassword?${data}`,
      method: 'POST'
    })
  }, // 提交新建

  // 构建下拉选项
  createOption(value, label) {
    return {
      value,
      label
    }
  },

  // 数据字典
  queryDictList(data) {
    return this._getData({
      url: '/dict/list/',
      method: 'POST',
      data
    })
  },

  // 请求数据字典
  getEnum(itemType) {
    return this._getData({
      url: `/dict/search/${itemType}`,
      method: 'GET'
    })
  },

  // 表单 中 下拉选项的初始化
  async initSelect(formObject) {
    let requestArr = [],
      isPartitioning
    for await (let item of formObject) {
      if ('list' in item) {
        if (!isPartitioning) isPartitioning = true
        let { list } = item
        for (let elem of list) {
          elem.type === 'select' &&
            elem.selectKey &&
            requestArr.push(elem.selectKey)
        }
      } else {
        ;(item.type === 'select' || item.isSelect) &&
          item.selectKey &&
          requestArr.push(item.selectKey)
      }
    }
    // 特殊的 下拉列表 处理
    let handleFn = new Map([
      [
        /* 口岸 */
        'entryPort',
        this.getEnterOutPort()
          .then(data => {
            return {
              data: utools.setSelectOption({
                data: data.data,
                fields: {
                  itemKey: 'entryportCode',
                  itemValue: 'entryportName'
                }
              })
            }
          })
          .catch(err => err)
      ]
    ])
    try {
      const [...response] = await Promise.all(
        requestArr.map(item =>
          handleFn.get(item)
            ? handleFn.get(item)
            : this.getEnum(item).catch(err => err)
        )
      )
      let index = 0
      if (isPartitioning) {
        for (let item of formObject) {
          for (let elem of item.list) {
            if (elem.type == 'select' && elem.selectKey) {
              elem.selectOption = response[index]['data']
              index++
            }
          }
        }
      } else {
        requestArr.forEach((item, i) => {
          for (let elem of formObject) {
            if (elem.selectKey !== item) continue
            elem.selectOption = response[i]['data']
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 验证规则
  validateRule: {
    required(fieldName) {
      return {
        required: true,
        message: fieldName + '不能为空！'
      }
    }
  },
  /************** 基础资料模块 start *************/

  // 财务计费方式表 - 查询列表
  queryfinancechargeSearch(data) {
    return this._getData({
      url: '/financecharge/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 财务计费方式表-新增
  addfinancechargeData(data) {
    let options = {
      url: '/financecharge/',
      method: 'POST',
      data
    }
    return this._getData(options)
  },
  // 财务计费方式表-修改
  editfinancechargeData(data) {
    return this._getData({
      url: '/financecharge/',
      method: 'PUT',
      data
    })
  },
  // 财务计费方式表-删除
  deletefinancechargeData(codeNo) {
    return this._getData({
      url: `/financecharge/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 财务计费方式表-加载编码
  getfinancechargeCode() {
    return this._getCode('CWFS')
  },
  // 财务计费方式表 - 查询单条
  searchOnefinancechargeData(codeNo) {
    return this._getData({
      url: `/financecharge/searchOne/${codeNo}`,
      method: 'GET'
    })
  },

  // 加载无担保授信编码
  getNoensureCode() {
    return this._getCode('RZWB')
  },

  // 公司信息表
  getCreditCompanyNameData(data) {
    // 许传入参数
    return this.querycompanyinfoSearch(data)
  },

  // 待报关列表-查询
  queryprecustomsSearch(data) {
    return this._getData({
      url: '/precustoms/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 待报关列表-新增
  addprecustomsData(data) {
    return this._getData({
      url: '/precustoms/',
      method: 'POST',
      data
    })
  },
  // 待报关列表-修改
  editprecustomsData(data) {
    return this._getData({
      url: '/precustoms/',
      method: 'PUT',
      data
    })
  },
  // 待报关列表-删除
  deleteprecustomsData(codeNo) {
    return this._getData({
      url: '/precustoms/' + codeNo,
      method: 'DELETE'
    })
  },
  // 待报关列表-获取编号
  getprecustomsCode() {
    return this._getCode('DBGX')
  },
  // 待报关列表-获取单条
  searchOneprecustomsData(preCustomsCode) {
    return this._getData({
      url: '/precustoms/searchOne?preCustomsCode=' + preCustomsCode,
      method: 'GET'
    })
  },
  // 待报关列表-商品明细-分页查询
  queryprecustomsgoodsSearch(data) {
    return this._getData({
      url: '/precustomsgoods/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 待报关列表- 商品明细 - 删除
  deleteprecustomsgoodsData(codeNo) {
    return this._getData({
      url: '/precustomsgoods/' + codeNo,
      method: 'DELETE'
    })
  },
  // 待报关列表-商品明细-新增/修改
  changeprecustomsgoodsData(data, method = 'POST') {
    return this._getData({
      url: '/precustomsgoods/',
      method,
      data
    })
  },

  // 获取所有菜单权限
  getAllMenu() {
    return this._getData({
      url: '/menu/',
      method: 'GET'
    })
  },

  // 香港收货单 获取列表
  getReceiptOrderList(data) {
    return this._getData({
      url: `/receiptorder/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港收货单 单挑
  getReceiptOrdernentry(receiptOrderCode) {
    return this._getData({
      url: `receiptorder/searchOne?receiptOrderCode=${receiptOrderCode}`,
      method: 'GET'
    })
  },
  // 香港收货单 新增修改
  changeReceiptOrderData(data, method = 'POST') {
    return this._getData({
      url: `/receiptorder/${method === 'POST' ? 'addAll' : ''}`,
      method,
      data
    })
  },
  // 香港收货单新增获取code
  getReceiptOrderCode() {
    return this._getCode('HKSH')
  },
  // 删除 香港收货单 数据
  deleteReceiptOrderData(code) {
    return this._getData({
      url: `/receiptorder/${code}`,
      method: 'DELETE'
    })
  },
  // 香港收货单子表 列表获取
  getReceiptBaseList(data) {
    return this._getData({
      url: `/receiptbase/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港收货单子表 新增 修改
  changeReceiptBaseData(data = {}, method = 'POST') {
    return this._getData({
      url: `/receiptbase/`,
      method,
      data
    })
  },
  // 删除 香港收货单子表 数据
  deleteReceiptBaseData(code) {
    return this._getData({
      url: `/receiptbase/${code}`,
      method: 'DELETE'
    })
  },

  // 弹出框 - 分页查询
  queryPopover(url, data) {
    let options = {
      url: url,
      method: 'POST',
      data: this._handlePage(data)
    }
    return this._getData(options)
  },

  // 委托单表 - 分页查询
  getDelegetebill(data) {
    return this._getData({
      url: '/delegetebill/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 根据模块code获取自增长编码
  getCommonCodeNo(code) {
    return this._getCode(code)
  },

  // 物流车型 - 分页查询
  getCarModelList(data) {
    return this._getData({
      url: '/cartype/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 品牌表分页查询
  getBrandList(data) {
    return this._getData({
      url: `/brand/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //品牌表获取新增 编码
  getBrandCode() {
    return this._getData({
      url: `/brand/brandCode`,
      method: 'GET'
    })
  },
  // 品牌表新增 修改
  changeBrandData(data = {}, method = 'POST') {
    return this._getData({
      url: `/brand/`,
      method,
      data
    })
  },
  // 删除品牌表数据
  deleteBrandData(code) {
    return this._getData({
      url: `/brand/${code}`,
      method: 'DELETE'
    })
  },
  // 产地表分页查询
  getOriginList(data) {
    let options = {
      url: `/origin/search`,
      method: 'POST',
      data: this._handlePage(data)
    }
    return this._getData(options)
  },
  // 产地新增 | 修改
  editOriginData(data = {}, method = 'POST') {
    return this._getData({
      url: `/origin/`,
      method,
      data
    })
  },
  // 产地获取编码
  getOriginCode() {
    return this._getCode('CDXX')
  },
  // 删除产地
  deleteOriginData(code = '') {
    return this._getData({
      url: `/origin/${code}`,
      method: 'DELETE'
    })
  },

  //保存香港入库单子表-基本信息
  addGodownbase(data) {
    return this._getData({
      url: `/godownbase/`,
      method: 'POST',
      data
    })
  },
  //修改香港入库单子表-基本信息
  updateGodownbase(data) {
    return this._getData({
      url: `/godownbase/`,
      method: 'PUT',
      data
    })
  },
  //分页查询香港入库单子表-基本信息
  queryGodownbase(data) {
    return this._getData({
      url: `/godownbase/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查询当条香港入库单子表-基本信息
  getGodownbase(itemCode) {
    return this._getData({
      url: `/godownbase/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },
  //删除香港入库单子表-基本信息
  removeGodownbase(itemCode) {
    return this._getData({
      url: `/godownbase/${itemCode}`,
      method: 'DELETE'
    })
  },

  //保存香港上货单计划相关信息
  addHkschedulerele(data) {
    return this._getData({
      url: `/hkschedulerele/`,
      method: 'POST',
      data
    })
  },
  //修改香港上货单计划相关信息
  updateHkschedulerele(data) {
    return this._getData({
      url: `/hkschedulerele/`,
      method: 'PUT',
      data
    })
  },
  //分页查询香港上货单计划相关信息
  queryHkschedulerele(data) {
    return this._getData({
      url: `/hkschedulerele/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查询当条香港上货单计划相关信息
  getHkschedulerele(scheduleBaseCode) {
    return this._getData({
      url: `/hkschedulerele/searchOne?scheduleBaseCode=${scheduleBaseCode}`,
      method: 'GET'
    })
  },
  //删除香港上货单计划相关信息
  removeHkschedulerele(scheduleBaseCode) {
    return this._getData({
      url: `/hkschedulerele/${scheduleBaseCode}`,
      method: 'DELETE'
    })
  },

  // 关务客品税号分页查询
  getProductTaxList(data) {
    return this._getData({
      url: `/producttax/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //客品税号获取编码
  getProductTaxCode() {
    return this._getData({
      url: `/producttax/productTaxCode`,
      method: 'GET'
    })
  },
  // 客品税号新增 修改
  changeProductTaxData(data = {}, method = 'POST') {
    return this._getData({
      url: `/producttax/`,
      method,
      data
    })
  },
  // 删除客品税号数据
  deleteProductTaxData(code) {
    return this._getData({
      url: `/producttax/${code}`,
      method: 'DELETE'
    })
  },

  // 关务税则分页查询
  getCustomsTariffList(data) {
    return this._getData({
      url: `/customstariff/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //关务税则获取编码
  getCustomsTariffCode() {
    return this._getData({
      url: `/customstariff/customsTariffCode`,
      method: 'GET'
    })
  },
  // 关务税则新增 修改
  changeCustomsTariffData(data = {}, method = 'POST') {
    return this._getData({
      url: `/customstariff/`,
      method,
      data
    })
  },
  // 关务税则删除数据
  deleteCustomsTariffData(code) {
    return this._getData({
      url: `/customstariff/${code}`,
      method: 'DELETE'
    })
  },

  // 原始舱单分页查询
  getSourceBillList(data) {
    return this._getData({
      url: `/sourcebill/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //原始舱单获取编码
  getSourceBillCode() {
    return this._getData({
      url: `/sourcebill/sourceBillCode`,
      method: 'GET'
    })
  },
  // 原始舱单新增 修改
  changeSourceBillData(data = {}, method = 'POST') {
    return this._getData({
      url: `/sourcebill/`,
      method,
      data
    })
  },
  // 删除原始舱单数据
  deleteSourceBillData(code) {
    return this._getData({
      url: `/sourcebill/${code}`,
      method: 'DELETE'
    })
  },

  // 分页查询商品税号
  queryGoodstax(data) {
    return this._getData({
      url: `/goodstax/search`,
      method: 'POST',
      data
    })
  },

  // 首页代办事项列表 查询
  getTodoList(data = {}) {
    return {
      url: `/todo/search`,
      method: 'POST',
      data
    }
  },
  // 上传附件
  uploadSectionFile(data) {
    return this._getData({
      url: `/files/upload`,
      method: 'POST',
      data
    })
  },
  // 文件上传, 并设置请求头
  accessoryUpload(data) {
    return this._getData({
      url: `/files/upload`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  },
  // 文件下载
  downlaodFile({ filename, fileType } = {}) {
    return this._getData({
      url: `/files/${filename}?${qs.stringify({ fileType })}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  // 单据附件信息 分页查询
  getAttachmentPageData(data) {
    return this._getData({
      url: `/attachment/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 删除附件
  removeattachment(attachCode) {
    return this._getData({
      url: `/attachment/${attachCode}`,
      method: 'DELETE'
    })
  },
  // 批量删除附件
  batchRemoveAttachment(data = []) {
    return this._getData({
      url: `/attachment/deleteBatch`,
      method: 'POST',
      data
    })
  },

  // 全局设定
  getGlobalSetting(data = {}) {
    return this._getData({
      url: `/prop/search`,
      method: 'POST',
      data
    })
  },
  // 全局设定查询一个
  getOneGlobalSetting(propKey = {}) {
    return this._getData({
      url: `/prop/${propKey}`,
      method: 'GET'
    })
  },
  // 审核设定
  getVerifysetting(data = {}) {
    return this._getData({
      url: `/verifysetting/search`,
      method: 'POST',
      data
    })
  },
  // 审核设定查询一个
  getOneVerifysetting(propKey = {}) {
    return this._getData({
      url: `/verifysetting/${propKey}`,
      method: 'GET'
    })
  },
  // 保存审核设定
  saveVerifysetting(data) {
    return this._getData({
      url: `/verifysetting/`,
      method: 'PUT',
      data
    })
  },
  // 流程图记录
  getFlowLog(data = {}) {
    return this._getData({
      url: `/todo/search/process`,
      method: 'POST',
      data
    })
  },
  // 查询代办流程
  getTodo(itemCode) {
    return this._getData({
      url: `/todo/${itemCode}`,
      method: 'GET'
    })
  },

  getOneentrustpaybillData(billNo) {
    return this._getData({
      url: `/entrustpaybill/${billNo}`,
      method: 'GET'
    })
  },
  testExport() {
    return this._getData({
      url: `/file`,
      method: 'GET',
      responseType: 'blob'
    })
  },

  // 前端子表临时编码
  getitemCode() {
    return this._getData({
      url: '/common/getCodeNo?bizCode=',
      method: 'GET'
    })
  },

  // 查询数据列表
  getList(data, rule) {
    return this._getData({
      url: `/${data}/search`,
      method: 'POST',
      data: this._handlePage(rule)
    })
  },

  // 商机管理预警提醒
  getwarningbusiness() {
    return this._getData({
      url: `/warning/business`,
      method: 'GET'
    })
  },

  // 香港收货登记 - 查询单条
  searchOnehkreceiveregisterData(codeNo) {
    return this._getData({
      url: `/hkreceiveregister/searchOne?billNo=${codeNo}`,
      method: 'GET'
    })
  },

  // 查询物料品牌表次数
  postMaterielbrand(data) {
    return this._getData({
      url: `/materielbrand/search`,
      method: 'POST',
      data
    })
  },

  // 委托方，承运商，客户，供应商，银行信息 分页查询
  getALLBankData(data) {
    return this._getData({
      url: `/bankinfo/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 委托方，承运商，客户，供应商，银行信息 新增 || 修改
  changeAllBankData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/bankinfo/`,
      data,
      method
    })
  },
  // 委托方，承运商，客户，供应商，银行信息 删除
  deleteBankData(code) {
    return this._getData({
      url: `/bankinfo/${code}`,
      method: 'DELETE'
    })
  },
  // 请求口岸下拉的列表
  async getEnterOutPort() {
    /* try {
      const { data = [] } = await this._getData({
        url: `/entryport/`,
        method: 'GET'
      })
      return data.forEach(item => {
        item.itemKey = item.entryportCode
        item.itemValue = item.entryportName
      })
    } catch (error) {
      console.log(error)
      return []
    } */
    return this._getData({
      url: `/entryport/`,
      method: 'GET'
    })
  }
}
Reflect.setPrototypeOf(api, apiPort)
export default Object.freeze(api)
