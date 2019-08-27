import _ from 'lodash';

export default function () {
    // 实体：委托方其他信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"clientNo": "",
		"allowOrder": false,
		"printAmount": false,
		"autoLock": false,
		"noTransFeeVat": false,
		"monthly": false,
		"printOtherFee": false,
		"noOtherFeeVat": false,
		"noInterestNoTax": false,
		"printTaxAndAgencyFee": false,
		"corporationCustomer": false,
		"noInterest": false,
		"aloneCustom": false,
		"outlandOtherFee": false,
		"notAllowTgb": false,
		"prePayBackInterest": false,
		"chargeSingleFee": false,
		"putOff": false,
		"canFindTgb": false,
		"mergeTransport": false,
		"putOffDate": "",
		"courseRating": "",
		"outLimit": false,
		"notLostCustomer": false,
		"inlandChargeFee": false,
		"orderNoEqContactNo": false,
		"h": false,
		"customerNameCustom": false,
		"invoiceContainOrderNo": false,
		"taxGenerationCustome": false,
		"trustee": false,
		"toEChain": false,
		"allowExportYsh": false

      };

    _.assign(this, defaults);
}
