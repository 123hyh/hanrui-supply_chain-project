import _ from 'lodash';

export default function () {
    // 实体：其他信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"customsOtherCode": "",
		"customsFormCode": "",
		"recordNo": "",
		"approvalNo": "",
		"permitNo": "",
		"voyageNo": "",
		"shippingType": "",
		"purpose": "",
		"levyRate": "",
		"supervisionType": "",
		"exemption": "",
		"stopoverSeaport": "",
		"originCountry": "",
		"originSeaport": "",
		"tradingCountry": "",
		"declarationUnit": "",
		"freight": "",
		"premium": "",
		"incidental": "",
		"hasQP": "",
		"sendUser": "",
		"sendTime": "",
		"specialConfirm": "",
		"priceConfirm": "",
		"royaltyConfirm": ""

      };

    _.assign(this, defaults);
}
