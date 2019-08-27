import utools from '@/domain/common/utools.js'
import { mapGetters } from 'vuex'
let obj = {
  '/M0302': 'ensureTimeLimit',
  '/M0303': 'timeLimit'
}
export default {
  computed: {
    ...mapGetters(['exchangeRate']),
    // 处理选择 汇率
    exchangeRateList() {
      return this.exchangeRate.reduce((pre, cur) => {
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
        pre['3'] = 1.0000 // 人民币暂定
        return pre
      }, {})
    }
  },
  watch: {
    'formDialog.ruleForm.repeal': {
      handler(cur) {
        if (cur === undefined) return
        utools.setFormConfig(this.formDialog.formConfig, [
          { key: 'repealPersonId', disabled: !cur },
          { key: 'repealPersonName', disabled: !cur, btn: cur },
          { key: 'repealTime', disabled: !cur },
          { key: 'repealReason', disabled: !cur }
        ])
      },
      deep: true
    },

    // 计算质押期限
    'formDialog.ruleForm.startDate'(cur, pre) {
      if (cur == pre) return
      let { path } = this.$route
      this.formDialog.ruleForm[
        obj[path] || 'creditLimit'
      ] = utools.getTimeLimit(cur, this.formDialog.ruleForm.endDate)
    },
    'formDialog.ruleForm.endDate'(cur, pre) {
      if (cur == pre) return
      let { path } = this.$route
      this.formDialog.ruleForm[
        obj[path] || 'creditLimit'
      ] = utools.getTimeLimit(this.formDialog.ruleForm.startDate, cur)
    },
    // 币种变化 修改汇率
    'formDialog.ruleForm.creditCurrency'(cur) {
      if (!cur) return
      this.formDialog.ruleForm = {
        ...this.formDialog.ruleForm,
        exchangeRate: this.exchangeRateList[cur]
      }
    },
    'formDialog.ruleForm.currency'(cur) {
      if (!cur) return
      this.formDialog.ruleForm = {
        ...this.formDialog.ruleForm,
        exchangeRate: this.exchangeRateList[cur]
      }
    },
    //
    'formDialog.ruleForm.exchangeRate': {
      handler(cur, pre) {
        if (!cur) return
        let obj = this.formDialog.ruleForm
        let param = {
          '/M0302': () => {
            obj.ensureCurrency = +cur * (obj.ensureAmount || 0)
          },
          '/M0303': () => {
            obj.depositsCurrency = +cur * (obj.depositsAmount || 0)
          },
          '/M0304': () => {
            console.error('未配置')
          },
          '/M0305': () => {
            obj.originalPriceCurrency = +cur * (obj.originalPrice || 0)
          }
        }
        param[this.$route.path]()
      },
      deep: true
    }
  }
}
