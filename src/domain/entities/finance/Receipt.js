import _ from 'lodash'

export default function() {
  // 实体：收款单表
  let defaults = {
    id: '',
    tenantId: 'hfy',
    billNo: '',
    company: '',
    actualReceiptCompany: '',
    receivedDate: '',
    receiptsAndPaymentsType: '',
    immediateBalance: '',
    receiptsType: '',
    moneyType: '',
    receiptsAmount: 0,
    exchangeRate: '',
    baseCurrency: '',
    receiverAccount: '',
    receiverSubject: '',
    receiveBank: '',
    bizType: '',
    settlementMethod: '',
    settlementNo: '',
    flowedInPlannedItem: '',
    department: '',
    repulseOpinion: '',
    flowedOutPlannedItem: '',
    costCenter: '',
    payerType: '',
    payerName: '',
    paymentAccount: '',
    paymentBank: '',
    project: '',
    projectManager: '',
    attachment: '',
    otherPaymentSubject: '',
    summary: '',
    recognizedMoneyAmount: '',
    originalMoneyAmount: '',
    originalSettlementExchangeRate: '',
    billState: '',
    paymentCustomer: '',
    billReceive: '',
    billCreator: '',
    billCreateDate: '',
    auditor: '',
    auditDate: '',
    cashier: '',
    accounting: ''
  }

  _.assign(this, defaults)
}
