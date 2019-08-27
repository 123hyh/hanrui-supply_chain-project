import _ from 'lodash';

export default function () {
    // 实体：协议管理方案
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"solutionNo": "",
		"agreementNo": "",
		"solutionName": "",
		"customType": "",
		"businessType": "",
		"tradeType": "",
		"establishMode": "",
		"invoiceType": "",
		"matPayment": false,
		"exportTaxMat": "",
		"taxRebateBySelf": false,
		"collectionCharge": false,
		"offerType": "",
		"serviceChargeType": "",
		"serviceChargeRate": "",
		"serviceCharge": "",
		"serviceChargeCurrency": "",
		"serviceChargeParity": "",
		"parityServiceCurrency": "",
		"paritydealCurrency": "",
		"chargeMode": "",
		"loanRateFlag": "",
		"seviceRateFlag": "",
		"matTaxesRateFlag": "",
		"minimumCharge": "",
		"miniChargeCurrency": "",
		"containInterest": false,
		"noMinerviceCharge": false,
		"chargeInterest": false,
		"cancel": false,
		"storageChargeMode": "",
		"containCorporation": false,
		"corporationRate": "",
		"rateParameter": "",
		"noChargeScope": "",
		"outScopeRate": "",
		"chargeFormula": "",
		"chargeAgreement": "",
		"accountPeriod": "",
		"accountPeriodRemark": "",
		"Remark": ""

      };

    _.assign(this, defaults);
}
