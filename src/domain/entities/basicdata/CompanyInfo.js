import _ from 'lodash';

export default function () {
    // 实体：公司信息

    // 默认值，可以从接口文档复制
    let defaults = {
        "address": "",
        "buildType": "",
        "city": "",
        "companyCode": "",
        "companyLicense": "",
        "companyName": "",
        "companyStatus": "",
        "companyType": "",
        "corporate": "",
        "district": "",
        "email": "",
        "fax": "",
        "parentCode": "",
        "parentName": "",
        "province": "",
        "registDepart": "",
        "registFund": "",
        "registNumber": "",
        "registTime": "",
        "remark": "",
        "scope": "",
        "telephone": "",
        "tenantId": "",
        "website": ""
    };

    _.assign(this, defaults);
}