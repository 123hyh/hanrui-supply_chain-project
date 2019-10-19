import _ from 'lodash'

export default function() {
  // 实体：委托订单表
  let defaults = {
    entrustOrderType: '',
    id: '',
    tenantId: 'hfy',
    trusteeCode: '',
    trusteeName: '',
    clientCode: '',
    clientName: '',
    clientAssociatedInfo: '',
    clientContactId: '',
    clientContactName: '',
    clientTel: '',
    clientPhone: '',
    clientOrderNo: '',
    agreementCode: '',
    agreementName: '',
    agreementSolutionName: '',
    agreementSolutionCode: '',
    supplierCode: '',
    supplierName: '',
    supplierContactId: '',
    supplierContactName: '',
    supplierAssociatedInfo: '',
    supplierPhone: '',
    supplierTel: '',
    supplierCurrency: '',
    consignmentCollection: 'false',
    deliverGoods: 'false',
    entrustOrderNo: '',
    signDate: '',
    purchaseUnitCode: '',
    purchaseUnitName: '',
    salesmanId: '',
    salesmanName: '',
    followPersonId: '',
    followPersonName: '',
    customerCode: '',
    customerName: '',
    currency: '',
    consignmentPayment: 'false',
    pickUpGoods: 'false',
    bizType: '',
    reportGateType: '',
    tradeMode: '',
    dealMode: '',
    receivableMethod: '',
    chargeMode: '',
    serviceCharge: '',
    serviceTaxRate: '',
    orderExchangeRate: '',
    serviceFee: '',
    pickUpType: '',
    orderType: '',
    remark: '',
    reportUntilComplete: 'false',
    sendUntilComplete: 'false',
    specialTips: '',
    serviceCharge: '',
    invoiceRemark: '',
    goodsValue: '',
    sellerCurrency: '',
    trusteePayGoodsAmount: '',
    trusteeCurrency: '',
    matPayment: '',
    refundCustomerAmount: '',
    refundCurrency: '',
    InStorage: '',
    paidGoodsAmount: '',
    paidCurrency: '',
    vatTotalAmount: '',
    vatCurrency: '',
    customTotalAmount: '',
    customCurrency: '',
    invoiceAmount: '',
    invoiceCurrency: '',
    dayRate: '',
    chargeInterest: '',
    invoiceType: '',
    minCharge: '',
    minChargeCurrency: '',
    totalServiceCharge: '',
    serviceCurrency: '',
    advanceActualAmount: '',
    actualCurrency: '',
    advanceAmount: '',
    advanceCurrency: '',
    advanceReceivableDate: '',
    supplierPayMode: '',
    status: null,
    agencyFee: 0,
    quarantineFee: 0,
    goodsValuecurrency: ''
  }

  _.assign(this, defaults)
}
