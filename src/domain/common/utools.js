import router from '@/router/index.js'
import api from '@/assets/js/appHelper.js'
import submitPathConfig from '@/domain/common/submitPortConfig/submitModulePortConfig.js'
import { mapGetters } from 'vuex'

export default {
  setSession(name, params) {
    sessionStorage.setItem(name, JSON.stringify(params))
  },
  getSession: name => JSON.parse(sessionStorage.getItem(name)),
  removeSession: name => {
    sessionStorage.removeItem(name)
  },
  /**
   *
   * @param {名称} name
   * @param {参数} params
   * @method setsetLocal 设置 localStorage
   * @method getLocal 获取 localStorage
   */
  setLocal(name, params) {
    localStorage.setItem(name, JSON.stringify(params))
  },
  getLocal(name) {
    return JSON.parse(localStorage.getItem(name))
  },
  // 第一个字母转大写
  capitalize([first, ...rest]) {
    return first ? first.toUpperCase() + rest.join('') : ''
  },
  // 判断 数据类型
  getDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1)
  },
  turnCodeToView(code) {
    const codeToViewForCn = {
      //允许超账期 - 状态
      undefined: '否',
      false: '否',
      true: '是',
      是: true,
      否: false
    }
    return codeToViewForCn[code]
  },
  // 深克隆
  cloneObj(data) {
    return JSON.parse(JSON.stringify(data))
  },
  turnCodeBoolean(dataTab) {
    //改变true和false的映射
    dataTab.map((e, i) => {
      for (let s in e) {
        e[s] =
          e[s] === true
            ? this.turnCodeToView('true')
            : e[s] === false
            ? this.turnCodeToView('false')
            : e[s]
      }
    })
  },
  turnStringBoolean(dataTab) {
    //改变true和false的映射
    dataTab.map((e, i) => {
      for (let s in e) {
        e[s] =
          e[s] === '是'
            ? this.turnCodeToView('是')
            : e[s] === '否'
            ? this.turnCodeToView('否')
            : e[s]
      }
    })
  },
  setSelectKey() {
    return {
      status: {
        新增: '1',
        保存: '2',
        提交: '3',
        作废: '4',
        审核中: '5',
        调整中: '6',
        已审核: '7',
        不通过: '8',
        冻结: '9',
        关闭: '10',
        变更审核中: '11',
        已复核: '12'
      },
      declareCustoms: {
        //报关类型
        中国进口: '1',
        进口报关: '2',
        中国出口: '3',
        出口报关: '4',
        转口: '5',
        纯物流: '6'
      },
      usageMode: {
        周期使用: '1',
        专向使用: '2'
      },
      currency: {
        澳元: '1',
        瑞士法郎: '2',
        人民币: '3',
        欧元: '4',
        英镑: '5',
        港币: '6',
        日元: '7',
        美元: '8'
      }
    }
  },
  /**
   *
   * @param {Object} clickRow
   * @param {Function} callback  // clickRow 不为空 时 调用该方法
   */
  titleCallBack(clickRow, callback) {
    // 修改删除没选中数据的提示语
    JSON.stringify(clickRow) === '{}' || !clickRow
      ? this.$message({
          center: true,
          message: '请选择一条数据再操作',
          type: 'warning'
        })
      : callback()
  },
  /**
   * @method 删除提示确认框
   * @param callBack 确认删除的回调函数
   */
  deleteMessage(callBack) {
    // 删除提示
    this.$confirm('删除不可恢复，是否确定删除？', '提示', {
      type: 'warning'
    })
      .then(() => {
        callBack()
      })
      .catch(err => {
        console.log(err)
      })
  },
  alertMessage(status, message = '操作失败,请重试', delType = '操作') {
    switch (status) {
      case 200:
        this.$message({
          center: true,
          type: 'success',
          message: `${delType}成功`
        })
        break
      default:
        this.$message({
          center: true,
          type: 'error',
          message
        })
        break
    }
  },
  /**
   * @method judgeNullObj 判断是否为空对象
   * @param obj 判断的对象
   * @param len 对象的length 判断对象是否为空的条件
   */
  judgeNullObj(obj = {}, len = 0) {
    return Object.keys(obj).length > len ? true : false
  },
  /**
   *
   * @method isNull 判断空对象 或者空数组
   */
  isNull(param) {
    if (typeof param !== 'object')
      throw new Error('传入的参数必须是array || object')
    if (Array.isArray(param)) {
      return !param.length
    }
    return !Object.keys(param).length
  },

  /**
   *
   * @method alertNullData 提示alert（选中一条数据）
   */
  alertNullData(that) {
    if (!that) throw new Error('请传入当前Vue实例对象')
    that.$message({
      type: 'warning',
      message: '请选中一条数据'
    })
  },

  /**
   *
   * @method setRegionList 处理 省 市 区 的下拉
   *
   */
  setRegionList(data) {
    return data.map(item => ({
      itemKey: item.code,
      itemValue: item.name
    }))
  },

  /**
   *
   * @method setFormConfig 设置 表单的 disabled 和 search 按钮
   * @param { Object } formObj 表单实体
   * @param { Array } params 需修改的参数
   *
   */

  setFormConfig(formObj, params) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          for (let { type, key, disabled, btn, name } of params) {
            if (key === con.key) {
              name !== undefined && (con.name = name)
              btn !== undefined && (con.btn = btn)
              disabled !== undefined && (con.disabled = disabled)
            }
          }
        }
        continue
      }

      for (let { type, key, disabled, btn, name, rules } of params) {
        if (key === item.key) {
          type !== undefined && (item.type = type)
          disabled !== undefined && (item.disabled = disabled)
          btn !== undefined && (item.btn = btn)
          name !== undefined && (item.name = name)
          rules !== undefined && (item.rules = rules)
        }
      }
    }
  },

  // 通过表单配置 查询条件栏位的下拉文本
  gecongfig(formObj, params, index) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          if (con.selectKey) {
            let { key, selectOption } = con
            if (params === key) {
              return selectOption[index - 1].itemValue || ''
            }
          }
        }
      }else{
        if (item.selectKey) {
          let { key, selectOption } = item
          if (params === key) {
            return selectOption[index - 1].itemValue || ''
          }
        }
      }
    }
  },
  // 通过表单配置设定下拉内容
  setFromconfigOption(formObj, params, selectOption) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          if (params === con.key) {
            con['selectOption'] = [...selectOption] || []
          }
        }
      }
    }
  },
  // 通过key获取指定的栏位配置
  getFromconfigObj(formObj, params) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          if (params === con.key) {
            return con || {}
          }
        }
      } else {
        if (params === item.key) {
          return item || {}
        }
      }
    }
  },

  // 通过key修改栏位btn为input
  getFromconfigbtntoinput(formObj, params) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          if (params === con.key) {
            delete con.btn
            return con || {}
          }
        }
      } else {
        if (params === item.key) {
          delete item.btn
          return item || {}
        }
      }
    }
  },

  /**
   *
   * @method setTableConfig 设置 表单的 prop 和 label 按钮
   * @param { Object } tableObj 表单实体
   * @param { Array } params 需修改的参数
   *
   */

  setTableConfig(tableObj, params) {
    if (this.getDataType(tableObj) !== 'Array') {
      throw new Error('需传入table实体')
    }
    for (let item of tableObj) {
      for (let { prop, label, width } of params) {
        if (prop === item.prop) {
          prop !== undefined && (item.prop = prop)
          label !== undefined && (item.label = label)
          width !== undefined && (item.width = width)
        }
      }
    }
  },
  /**
   * @method getTimeLimit 截至日期 = 结束日期 - 开始日期
   * @param { Date } start
   * @param { Date } end
   */
  getTimeLimit(start = new Date(), end = new Date()) {
    ;(start = +new Date(start)), (end = +new Date(end))
    var s = end - start
    return s < 0 ? '0' : (s / (60 * 60 * 24 * 1000)).toFixed()
  },

  /**
   * @method splitDate 截取日期 年-月-日
   * @param { tableData } Array 列表数组
   * @param { keyArr } Array 字段数组
   */
  splitDate(dataTab, keyArr) {
    dataTab.map((e, i) => {
      keyArr.map(key => {
        e[key] = e[key].includes(' ') ? e[key].split(' ')[0] : e[key]
      })
    })
  },
  /**
   * @method setlevelThreeMenuListAndBtn 三级菜单和btn
   * @param {Array} IndexMenuList 菜单列表
   */
  setlevelThreeMenuListAndBtn(IndexMenuList) {
    // 处理 list页面的btn按钮

    /**
     * @variation listBtn list btn 按钮
     * @variation levelThreeMenuList 三级菜单
     */
    let listBtn = {}
    let levelThreeMenuList = {}
    for (let item of IndexMenuList) {
      if (item.subs.length) {
        for (let elem of item.subs) {
          //  处理页面对应的按钮
          elem.functionCode &&
            (listBtn[elem.menuCode] = elem.functionCode.split(';'))
          // 处理 三级菜单列表
          if (elem.subs.length) {
            levelThreeMenuList[elem.menuCode] = elem.subs
            // 三级 菜单 按钮
            for (let { menuCode, functionCode = '' } of elem.subs) {
              menuCode &&
                (listBtn[menuCode] = functionCode
                  ? functionCode.split(';')
                  : [])
            }
          }
        }
      }
    }
    return {
      listBtn,
      levelThreeMenuList
    }
  },
  // 刷新当前路由
  F5CurrentRoute() {
    router.go(-1)
    router.go(-1)
  },
  // 定制弹窗请求显示内容
  alertStatusMessage({
    status,
    msg /* : { error = '', success = '', warning = '' } */
  } = {}) {
    let isSuc = /^2/.test(status)
    let type = status === undefined ? 'warning' : isSuc ? 'success' : 'error'
    let message =
      status === undefined
        ? msg['warning']
        : isSuc
        ? msg['success']
        : msg['error']
    this.$message({
      center: true,
      type: type,
      message
    })
  },
  /**
   *
   * @param { String } port  接口
   * @param { String } code 单据编号
   * @param { Object } form form表单的对象
   * @param { String } type 单据需要修改的状态
   * @param { Object } ctx  当前上下文，提示信息的需要
   * @param { String } target 如果没有  form 中 没有 ruleForm和 data 时，用ctx.target
   * @param { String } definedFormKey  form需要重置的key值， 需要配合form 使用
   */
  submitBillStatus({
    port = 'updateBillStatus',
    code = '',
    form = {},
    type = 'submit',
    ctx = {},
    target = '',
    definedFormKey = ''
  } = {}) {
    return new Promise(async (resolve, reject) => {
      let statusCode = 0
      try {
        const { data, status } = await api[port]({
          type,
          code
        })
        if (target) {
          ctx[target] = {
            ...ctx[target],
            status: data.status || '2'
          }
        } else {
          let formData = definedFormKey
            ? definedFormKey
            : Object.keys(form).includes('ruleForm')
            ? 'ruleForm'
            : 'data'
          form[formData] = {
            ...form[formData],
            status: data.status || '2'
          }
        }
        statusCode = status
        resolve(statusCode)
      } catch (error) {
        reject(0)
        console.log(error)
      } finally {
        // eslint-disable-next-line standard/object-curly-even-spacing
        this.alertStatusMessage.call(ctx, {
          status: statusCode,
          msg: {
            success: '提交成功',
            error: '提交失败，请重试'
          }
        })
      }
    })
  },
  // 业务单据 提交接口
  submitBusinessStatus(
    data = {} /* { code = '', form = {}, type = 'submit', ctx = {}, target = '' } = {} */
  ) {
    return new Promise(async (resolve, reject) => {
      const status = await this.submitBillStatus(
        {
          ...data,
          port: 'updateBusinessBillsStatus'
        } /* { port: 'updateBusinessBillsStatus', code, form, type, ctx, target } */
      )
      if (status) {
        resolve(status)
      } else {
        reject(0)
      }
    })
  },
  submitBill({ fn, param = {}, ctx = {} } = {}) {
    return new Promise(async (resolve, reject) => {
      const { path } = ctx.$route
      if (!submitPathConfig[path]) {
        /* 没有注册 接口的处理 */
        return reject(
          `error-message: 请先在接口配置表当中注册，configPath: src/domain/common/submitPortConfig/submitModulePortConfig.js`
        )
      }
      const { data, status } = await api.submitUpdate(
        `${submitPathConfig[path]}/submit`,
        param
      )
      // const { data, status } = await fn.call(api, { data: param, path: modules[path] });
      status === 200 && (param.status = '2')
      this.alertStatusMessage.call(ctx, {
        status,
        msg: {
          success: '提交成功',
          error: '提交失败，请重试'
        }
      })
      ;(status === 200 ? resolve : reject)({
        data,
        status
      })
    })
  },
  // 重置 表单 校验效果
  resetVerify(formList = []) {
    for (let form of formList) {
      form['formModel'].clearValidate()
    }
  },
  // 校验 表单结果
  testFormValidate(verifyList) {
    let arr = Object.keys(verifyList)
    let i = 0 // 累计通过的校验个数， 如果不等于 arr的长度 则 视为不通过验证
    // 不分组 的  form 校验 处理( 分组的formModel_下标 )
    if (arr.length === 1 && arr[0] === 'formModel') {
      verifyList['formModel'].validate(bool => {
        if (bool) i += 1
      })
      return i === arr.length && true
    }
    // 分组 的 form 校验 处理
    for (let item of arr) {
      verifyList[item][0].validate(bool => {
        if (bool) i += 1
      })
    }
    return i === arr.length && true
  },
  // 字符串（输入框默输入数字也是字符串类型）转换指定小数点Num
  StringOrfromttoMoneydecimal(strfromt, decimal) {
    if (
      Object.prototype.toString.call(strfromt).slice(8, -1) == 'String' &&
      strfromt
    ) {
      if (strfromt.substr(strfromt.length - 1, 1) == '.') {
        return (
          Number(
            (
              parseFloat(strfromt.replace(new RegExp(',', 'g'), '')) || 0
            ).toFixed(decimal || 2)
          ).toLocaleString() + '.'
        )
      }
      return Number(
        (parseFloat(strfromt.replace(new RegExp(',', 'g'), '')) || 0).toFixed(
          decimal || 2
        )
      ).toLocaleString()
    }
    return ''
  },
  // 数字转换金额（转字符串）
  NumtoMoney(mun, decimal) {
    Object.prototype.toString.call(mun).slice(8, -1) != 'Number' && (mun = 0)
    return new Number(new Number(mun).toFixed(2)).toLocaleString() || ''
  },
  // 金额转换数字
  MoneytoNum(Money, decimal) {
    return parseFloat(Money.replace(',', '')) || ''
  },

  transitonBoolean(code) {
    const codeToViewForCn = {
      //允许超账期 - 状态
      null: '否',
      undefined: '否',
      false: '否',
      true: '是'
    }
    return codeToViewForCn[code]
  },
  // 表格转换为中文
  tableDataTranstionBoolen({ data = [], config = [] }) {
    // 转中午
    return data.map(item => {
      for (let elem of config) {
        item[elem] = this.transitonBoolean(item[elem])
      }
      return item
    })
  },

  // 导出表格
  downFile(path) {
    let a = document.createElement('a')
    a.href = `http://47.107.253.252:8082/scp${path}`
    a.target = '_self'
    a.click()
  },
  // 判断为空 提示消息

  //取汇率
  async getExchange(currency, obj, cenPrice) {
    let { data } = await api.getExchange()
    data.forEach(item => {
      item.currency == '澳大利亚元' &&
        currency == 1 &&
        (obj[cenPrice] = item.cenPrice),
        item.currency == '瑞士法郎' &&
          currency == 2 &&
          (obj[cenPrice] = item.cenPrice),
        item.currency == '人民币' &&
          currency == 3 &&
          (obj[cenPrice] = '1.0000'),
        item.currency == '欧元' &&
          currency == 4 &&
          (obj[cenPrice] = item.cenPrice),
        item.currency == '英镑' &&
          currency == 5 &&
          (obj[cenPrice] = item.cenPrice),
        item.currency == '港币' &&
          currency == 6 &&
          (obj[cenPrice] = item.cenPrice),
        item.currency == '日元' &&
          currency == 7 &&
          (obj[cenPrice] = item.cenPrice),
        item.currency == '美元' &&
          currency == 8 &&
          (obj[cenPrice] = item.cenPrice)
    })
  },

  // 获取市的列表 设置城市下拉
  /**
   *
   * @method getLocation 获取 省 市 区 下拉列表并设置下拉
   * @param location 需要获取的位置
   * @param code 需要这个code下的地址
   * @param formConfig 表单的配置, 后续会设置selectOption
   * @param fields 后续需要设置的字段
   */
  async getLocation({
    location = '',
    code = '',
    form: { formConfig, fields }
  }) {
    const port = {
      province: api.getProvince,
      city: api.getCity,
      district: api.getDistrict
    }
    try {
      let { data: response } = await port[location].call(api, code)
      const config = formConfig.list ? formConfig.list : formConfig // 判断是否数据结构中含有list
      response = await this.setRegionList(response) // 处理下拉的itemCode 和 ItemValue
      for (let item of config) {
        if (item.key === fields) {
          item.selectOption = response
          break
        }
      }
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * @method pullDownCurrency 下拉币别 得出汇率
   * @param exchangeRate 来自vuex中的汇率
   */
  pullDownCurrency(exchangeRate) {
    return exchangeRate.reduce((pre, cur) => {
      let money = +(Math.round(+cur.cenPrice * 10000) / 1000000).toFixed(4)
      switch (cur.currency) {
        case '澳大利亚元':
          pre['1'] = money
          break
        case '瑞士法郎':
          pre['2'] = money
          break
        /* case '人民币': 
            pre['3'] = 1.0000; //人民币暂定
            break; */
        case '欧元':
          pre['4'] = money
          break
        case '英镑':
          pre['5'] = money
          break
        case '港币':
          pre['6'] = money
          break
        case '日元':
          pre['7'] = money
          break
        case '美元':
          pre['8'] = money
          break
      }
      pre['3'] = 1.0 // 人民币暂定
      return pre
    }, {})
  },

  // 设置可响应式的form对象
  $set({ form = {}, set = {}, ctx = {} } = {}) {
    for (let item of Object.keys(set)) {
      ctx.$set(form, item, set[item])
    }
  },

  // 计算公式，修改栏配置为计算栏位
  setCalcconfigObj(formObj, solutionFormulaList) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    for (let i = 0; i < solutionFormulaList.length; i++) {
      let calckey = (
        solutionFormulaList[i].formula.split('=')[0] || ''
      ).replace(/\s/g, '')
      let calcval = (
        solutionFormulaList[i].formula.split('=')[1] || ''
      ).replace(/\s/g, '')
      for (let item of formObj) {
        if (item.list) {
          for (let con of item.list) {
            if (con.key == calckey) {
              con['type'] = 'calc'
              con['solutionFormula'] = calcval
            }
          }
        } else {
          if (item.key == calckey) {
            item['type'] = 'calc'
            item['solutionFormula'] = calcval
          }
        }
      }
    }
  },

  // 计算更新
  resCalcConfig(data, formObj, dataother) {
    if (this.getDataType(formObj) !== 'Array') {
      throw new Error('需传入form实体')
    }
    var ratios = [] //百分比的栏位
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          if (con.ratio == true) {
            ratios.push(con.key)
          }
        }
      } else {
        if (item.ratio == true) {
          ratios.push(item.key)
        }
      }
    }
    for (let item of formObj) {
      if (item.list) {
        for (let con of item.list) {
          if (con.type == 'calc') {
            console.log(con.name + con.key+":     "+con.solutionFormula)
            data[con.key] = this.calcConfig(
              data,
              con.solutionFormula,
              ratios,
              dataother,
              con
            )
          }
        }
      } else {
        if (item.type == 'calc') {
          console.log(item.name + item.key+":     "+item.solutionFormula)
          data[item.key] = this.calcConfig(
            data,
            item.solutionFormula,
            ratios,
            dataother,
            item
          )
        }
      }
      
    }
  },

  // 计算
  calcConfig(data, solutionFormula, ratios, dataother, con) {
    let fh = ['+', '-', '*', '/', '(', ')']
    var gs = [solutionFormula]
    for (let o = 0; o < fh.length; o++) {
      var v = []
      for (let i = 0; i < gs.length; i++) {
        let z = gs[i].split(fh[o])
        v.push(...z)
      }
      gs = v
    }
    for (let f = 0; f < gs.length; f++) {
      var key = gs[f].trim()
      if (key) {
        if (data[key]) {
          if (key == 'vatTaxRate') { //  //进口增值税率%
            var da = 0
            if (data[key] == '1') {
              da = 0.13
            } else if (data[key] == '2') {
              da = 0.09
            } else if (data[key] == '3') {
              da = 0.16
            } else if (data[key] == '4') {
              da = 0.1
            }
            solutionFormula = solutionFormula.replace(key, da).replace(' ', '')
          } else if (ratios.indexOf(key) != -1) {
            solutionFormula = solutionFormula
              .replace(key, data[key] + '/100')
              .replace(' ', '')
          } else {
            solutionFormula = solutionFormula
              .replace(key, data[key])
              .replace(' ', '')
          }
        } else if (dataother[key]) {
          if (ratios.indexOf(key) != -1) {
            solutionFormula = solutionFormula
              .replace(key, dataother[key] + '/100')
              .replace(' ', '')
          } else {
            solutionFormula = solutionFormula
              .replace(key, dataother[key])
              .replace(' ', '')
          }
        } else {
          if (key != '1') {
            // 如果值不存在，取0，特殊情况除数取1
            if (key == con.divisor) {
              solutionFormula = solutionFormula.replace(key, 1).replace(' ', '')
            } else {
              solutionFormula = solutionFormula.replace(key, 0).replace(' ', '')
            }
          }
        }
      }
    }
    console.log(solutionFormula +"    =     "+eval(solutionFormula).toFixed(4))
    console.log(" ")
    return eval(solutionFormula).toFixed(4)
  },

  // 文件下载
  downloadFile(data, name) {
    var a = document.createElement('a')
    var href = window.URL.createObjectURL(data)
    a.href = href
    a.download = name
    a.click()
    window.URL.revokeObjectURL(href)
  },

  // (修改 | 保存) 表单 带状态提示语 删除单据 带状态提示语
  ...((msgFn, cb) => ({
    // 修改
    saveReceiptsTips(fn) {
      cb.apply(this, [msgFn, fn, '保存'])
    },
    // 删除
    removeReceiptsTips(fn) {
      cb.apply(this, [msgFn, fn, '删除'])
    },
    // 提交
    sbumitReceiptsTips(fn) {
      cb.apply(this, [msgFn, fn, '提交'])
    },
    blacklist(fn) {
      cb.apply(this, [msgFn, fn, '添加黑名单'])
    }
  }))(
    // 提示信息
    function(scode, tips) {
      this.$message({
        type: scode ? 'success' : 'error',
        message: `${tips}${scode ? '成功！' : '失败，请重试！'}`
      })
    },
    // 逻辑函数的调用
    async function(msgFn, fn /* Function || Object */, type) {
      let scode = 200,
        successFn,
        finallyFn,
        errorFn
      // 允许 fn 传入是一个集合 {success (成功函数): Function, finally (结束后函数): Function}
      if (Object.prototype.toString.call(fn).slice(8, -1) === 'Object') {
        const { successCallback, finallyCallback, errorCallback } = fn
        ;(successFn = successCallback),
          (finallyFn = finallyCallback),
          (errorFn = errorCallback)
      }
      try {
        successFn && (await successFn.call(this))

        typeof fn === 'function' && (await fn.call(this))
      } catch (error) {
        console.log(error)
        scode = 0
        errorFn && errorFn.call(this)
      } finally {
        finallyFn && finallyFn.call(this)

        msgFn.apply(this, [scode, type])
      }
    }
  ),

  // 转换 布尔值 或 中文
  toggleDataBoolean: (fn => {
    return function({ data, isCn } = {}) {
      if (isCn) {
        for (let oneData of data) {
          fn(oneData, arguments[0])
        }
      } else {
        fn(data, arguments[0])
      }
      return data
    }
  })((oneData, { transFormFields, isCn } = {}) => {
    for (let key of Object.keys(oneData)) {
      if (transFormFields.includes(key)) {
        if (isCn) {
          oneData[key] = !!oneData[key] ? '是' : '否'
        } else {
          oneData[key] = oneData[key] == '是' ? true : false
        }
      }
    }
  }) 
  /*  // (修改 | 保存) 表单 带状态提示语
  saveReceiptsTips: (msgFn => {
    return async function(fn) {
      let scode = 200
      try {
        await fn()
      } catch (error) {
        console.log(error)
        scode = 0
      } finally {
        msgFn.call(this, scode)
      }
    }
  })(function(scode) {
    this.$message({
      type: scode ? 'success' : 'error',
      message: `保存${scode ? '成功！' : '失败，请重试！'}`
    })
  }),

  // 删除单据 带状态提示语
  removeReceiptsTips: (msgFn =>
    async function(fn) {
      let scode = 200
      try {
        await fn()
      } catch (error) {
        console.log(error)
        scode = 0
      } finally {
        msgFn.call(this, scode)
      }
    })(function(scode) {
    this.$message({
      type: scode ? 'success' : 'error',
      message: `删除${scode ? '成功！' : '失败，请重试！'}`
    })
  }) */
}
