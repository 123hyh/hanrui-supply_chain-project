import _ from 'lodash';

export default function () {
  // 实体：仓储报价单
  let defaults = {
    "id": "",
    "tenantId": "hfy",
    "billCode": "",
    "warehouseQuotionName": "",
    "companyName": "",
    "companyCode": "",
    "clientName": "",
    "clientNo": "",
    "currency": "",
    "warehouseName": "",
    "warehouseCode": "",
    "calcuMethod": "",
    "remark": "",
    status: null
    // "useStatus": ""

  };

  _.assign(this, defaults);
}
