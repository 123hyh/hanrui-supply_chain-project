import _ from 'lodash';

export default function () {
    // 实体：物料海关信息
    let defaults = {
		"id": "",
		"tenantId": "",
		"materielId": "",
		"materielCustomCode": "",
		"customsAbbreviation": "",
		"customsAlias": "",
		"foreignName": "",
		"customsRate": "",
		"levyRate":"",
		"maxRate": "",
		"rebateRate": "",
		"averagePrice": "",
		"maxPrice": "",
		"minPrice": "",
		"totalNo": "",
		"taxNo": "",
		"attachNo": "",
		"conditionCustom": "",
		"declaredModel": "",
		"remarks": "",
		"verify": false

      };

    _.assign(this, defaults);
}
