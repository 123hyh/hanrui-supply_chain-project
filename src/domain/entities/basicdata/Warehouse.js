import _ from 'lodash';

export default function () {
    // 实体：仓库信息

    // 默认值，可以从接口文档复制
    let defaults = {
        "address": "",
        "city": "",
        "depositType": "",
        "district": "",
        "fax": "",
        "id": 0,
        "phone": "",
        "province": "",
        "stockStatus": "",
        "stockType": "",
        "tenantId": "",
        "warePerson": "",
        "wareTelephone": "",
        "warehouseCode": "",
        "warehouseGroup": "",
        "warehouseGroupName": "",
        "warehouseName": "",
        "warehouseStatus": ""
      };

    _.assign(this, defaults);
}