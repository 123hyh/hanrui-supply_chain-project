import _ from 'lodash';

export default function () {
    // 实体：委托单收货信息
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"itemCode": "",
		"entrustOrderNo": "",
		"goodsModel": "",
		"goodsCode": "",
		"goodsName": "",
		"sellerQuantity": "",
		"hkStorageQuantity": "",
		"deliverQuantity": "",
		"receiveQuantity": "",
		"unReceiveQuantity": "",
		"purchaseQuantity": "",
		"customQuantity": "",
		"szStorageQuantity": "",
		"receiveGoodsValue": "",
		"exportReceiveQuantity": ""

      };

    _.assign(this, defaults);
}
