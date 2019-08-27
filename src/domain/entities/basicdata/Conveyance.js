import _ from 'lodash';

export default function () {
    // 实体：运输工具
    let defaults = {
		"id": "",
		"tenantId": "",
		"conveyanceCode": "",
		"conveyanceName": "",
		"plateNo": "",
		"plateNoHk": "",
		"phoneNo": "",
		"phoneNoHk": "",
		"bindPhone": "",
		"description": "",
		"fax": "",
		"contact": "",
		"truckHead": "",
		"AgencyRegistration": "",
		"idCardNo": "",
		"homeVisitingCard": "",
		"icCardNo": "",
		"ForbiddenZoneNo": "",
		"driver": "",
		"carType": "",
		"carrier": "",
		"vehicleCustomsCode": "",
		"driverCustomsCode": ""

      };

    _.assign(this, defaults);
}
