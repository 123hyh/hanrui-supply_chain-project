import _ from 'lodash';

export default function () {
    // 实体：附件上传类型

    // 默认值，可以从接口文档复制
    let defaults = {
		"id": "",
		"tenantId": "hfy",
		"attachmentTypeCode": "",
		"deptCode": "",
		"classifyName": "",
		"description": "",
		"creator": "",
		"createTime": "",
		"updater": "",
		"updateTime": "",
		"deleted": ""

      };

    _.assign(this, defaults); // 拼接对象this.id
}
