export default {
  validateNum (rule, value, callback) { //验证4位小数点数字
    let regPos = /^\d+(\.\d{1,4})?$/;
    if (!regPos.test(value) && value) {
      callback(new Error('格式错误'));
    } else {
      value = Number(value)
      callback();
    }
  },

  validateNaN (rule, value, callback) { //验证数字
    let regPos = /^[+]{0,1}(\d+)$/;
    if (!regPos.test(value) && value) {
      callback(new Error('格式错误'));
    } else {
      value = Number(value)
      callback();
    }
  },

  //网址正则
  validateUrl (rule, value, callback) {
    let regPos = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    // let regPos = /(^https|http|ftp|rtsp|mms:\/\/)?www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if (!regPos.test(value) && value) {
      callback(new Error('格式错误'));
    } else {
      callback();
    }
  },

  validateTel (rule, value, callback) { //验证座机号
    let mobile = /^1[3-9]\d{9}$/, phone = /^(0\d{2,3}-)?\d{7,8}$/;
    if (!(mobile.test(value) || phone.test(value)) && value) { //020-12345678
      callback(new Error('格式错误'));
    } else {
      callback();
    }
  },

  validatePass2 (rule, value, callback) {
    if (value !== this.pwdForm.newPassword) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  },
  /**
   * 
   * @method setRequired 校验表单规则 
   * @param { Array} event input事件 集合
   */
  setRequired ({ event = [] } = {}) {
    return [
      { required: true, message: "必填", trigger: [...['blur'], ...event] }
    ]
  }
}