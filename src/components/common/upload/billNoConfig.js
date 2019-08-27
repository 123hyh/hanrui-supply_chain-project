export default {
  /**
   * 业务单据
   */
  M0302: 'ensureNo',
  M0303: 'depositsNo',
  M0304: 'noCreditNo',
  M0305: 'pawnNo',
  ClientForm: 'clientNo',
  ClientEvaluationForm: 'clientEvaluationNo',
  BusinessForm: 'businessNo',
  AgreementForm: 'agreementNo',
  CreditForm: 'creditNo',
  EntrustOrderForm: 'entrustOrderNo',
  SalesOrderForm: { billNo: 'salesOrderCode', entrustOrderNo: 'trusteeCode' },
  PurchaseOrderForm: {
    billNo: 'purchaseOrderNo',
    entrustOrderNo: 'entrustOrderNo'
  },
  buyerReceiveGoodsForm: { billNo: 'billNo', entrustOrderNo: 'delegeteBillNo' },
  sellerReceiveGoodsForm: {
    billNo: 'billNo',
    entrustOrderNo: 'delegeteBillNo'
  },
  HkreceiveRegisterForm: { billNo: 'billNo', entrustOrderNo: 'delegeteBillNo' },
  GodownEntryForm: {
    billNo: 'godownEntryCode',
    entrustOrderNo: 'delegeteBillNo'
  },
  HkscheduleBaseForm: 'scheduleBaseCode',
  HkoutstoreForm: { billNo: 'billNo', entrustOrderNo: 'delegeteBillNo' },
  HkimportinvoiceForm: 'billNo',
  hkdispatchOrderForm: 'dispatchOrderCode',
  HkshipmentBaseForm: 'mainCarrier',
  ImportCustomOrderForm: 'planOrderNo',
  CustomsFormBaseForm: 'customsFormCode',
  szinstoreForm: 'billNo',
  ImportinvoiceForm: 'billNo',
  DistributionTrainForm: 'distributionTrainCode',
  dispatchOrderForm: 'dispatchOrderCode',
  centreDispatchForm: 'centreDispatchCode',
  ShipmentBaseForm: 'shipmentBaseCode',
  SzscheduleBaseForm: 'scheduleBaseCode',
  szoutstoreForm: 'billNo',
  entrustpaybillForm: { billNo: 'billNo', entrustOrderNo: 'entrustOrderNo' },
  otherbillForm: 'billNo',
  adjustApplicationForm: 'billNo',
  ReceivesettlementForm: { billNo: 'billNo', entrustOrderNo: 'delegeteBillNo' },
  ReceiptForm: 'billNo',
  SubscriptionOrderForm: 'billNo',
  AccountingwriteoffForm: {billNo: 'billNo', entrustOrderNo: 'delegeteBillNo'},
  PayapplyForm: 'billNo',
  PaymentForm: 'billNo',
  ExpensesClaimSheetForm: 'billNo',
  RemittanceForm: 'billNo',
  InvoiceReceiptForm: 'billNo'
}
