<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-login-bg"></div>
      <div class="ms-login-form">
        <div class="ms-login-form-box">
          <div class="ms-title">{{systemName}}
            <!-- 领先的供应链管理服务 -->
          </div>
          <p class="small">集物流仓储、通关商检、退税结汇、供应链金融服务等智慧供应链综合服务于一体</p>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            v-enterToNext
            label-width="0px"
            class="ms-content"
          >
            <el-form-item prop="userCode">
              <el-input
                id="username"
                v-model="ruleForm.userCode"
                autofocus
                placeholder="请输入登录账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                id="password"
                type="password"
                v-model="ruleForm.password"
                @keyup.enter.native="submitForm('ruleForm')"
                placeholder="请输入登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="vCode"
              class="vCode-form"
            >
              <el-input
                id="vCode"
                type="vCode"
                v-model="ruleForm.vCode"
                @keyup.enter.native="submitForm('ruleForm')"
                placeholder="请输入验证码"
              ></el-input>
              <div
                class="verify-box"
                @click="refreshCode"
              >
                <Sidentify :identifyCode="identifyCode"></Sidentify>
              </div>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="success"
                round
                @click="submitForm('ruleForm')"
              >登录</el-button>
            </div>
            <br />
          </el-form>
        </div>
      </div>
      <p class="login-tips">{{copyright}}
        <!-- Copyright © 瀚锐咨询（深圳）有限公司 -->
      </p>
    </div>
  </div>
</template>

<script>
// 引入验证码组件
import Sidentify from '@/components/common/identify.vue'
import api from '@/assets/js/appHelper.js'
import qs from 'qs'
import md5 from 'md5'
import { instance as service } from '@/assets/js/initApi.js'

import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    Sidentify
  },
  computed: {
    ...mapGetters(['systemName', 'copyright'])
  },
  data: function () {
    var validateVcode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入验证码'));
      } else if (value.toUpperCase() !== this.identifyCode.toUpperCase()) {
        callback(new Error('验证码输入有误!'));
      } else {
        callback();
      }
    };
    return {
      // 验证码
      identifyCode: '',
      identifyCodes: "1234567890qwertyuipasdfghjkzxcvbnmQWERTYUIPASDFGHJKLZXCVBNM",
      focusIndex: 0, //用来存放下一个应该聚焦的index值
      ruleForm: {
        userCode: process.env.NODE_ENV !== 'production' ? 'admin' : '',
        password: process.env.NODE_ENV !== 'production' ? '654321' : '',
        vCode: '',
      },
      rules: {
        userCode: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        vCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          validator: validateVcode,
          trigger: 'blur'
        }],
      },
    }
  },
  mounted () {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    this.getSystem() // 获取公司和版权
    // process.env.NODE_ENV !== 'production' && this.submitForm('ruleForm')
  },
  methods: {
    ...mapMutations(['initbreadCrumbsList', 'setUserInfo']),

    ...mapActions(['getMenuList', 'getOrderStatus', 'getSystem']),


    /* 图形验证码 s*/
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    refreshCode () {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log('当前验证码==', this.identifyCode);
    },

    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      };
      process.env.NODE_ENV !== 'production' && (this.ruleForm.vCode = this.identifyCode)
    },

    /* 图形验证码 e*/
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const { data, token } = await api.goLogin(qs.stringify({
              userCode: this.ruleForm.userCode,
              password: md5(this.ruleForm.password)
            }));
            const { userName, userCode } = data;

            // 客户信息存储到 vuex中
            this.setUserInfo(data)

            /*
            *如果 用户更换账号登录将清空 页签
            *与上一次登录过的账户比较 
            */
            if (!(userCode == localStorage.getItem('userCode'))) {
              this.initbreadCrumbsList()
            }

            // 把 参数 存储 到浏览器
            localStorage.setItem('ms_username', userName);
            localStorage.setItem('userCode', userCode);
            localStorage.setItem('token', token);

            /*  
            * 这一步的 前提是 为的是 用户在刷新时 会保存当前 的 vuex 的 state 数据；防止丢失，
            * 而在路由鉴权时 会判断 sesstionStorage中是否存在 state, 有的话会赋值给 vuex，
            * 避免出现不准确的数据 必须清空这个 sesstionStorage中是否存在 的 state
            * 
            */

            sessionStorage.removeItem('state');

            // 设置 接下来的 http 请求都携带上 token 这个请求头 
            service.defaults.headers.common['x-auth-token'] = token;

            // 请求列表页面 单据状态查询条件
            this.getOrderStatus();

            // 请求菜单 及初始化list页面的按钮
            this.getMenuList(this.jumpPage);

          } catch (e) {
            if (e.status === 401) {
              this.$message.error(e.message);
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    jumpPage () {
      console.log(`准备跳转页面....`)
      this.$router.push({
        path: (this.$route.query.redirect === '#/login?redirect=%2FM00' || this.$route.path === '/login') ? '/tanstion' : this.$route.query.redirect
      });
    }
  }
}
</script>

<style scoped lang='less'>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left bottom, #ddeafb, #afeafc);
  // background-image: url(../../assets/img/login/login_bg.png);
  background-size: 100%;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 47%;
  width: 1040px;
  height: 500px;
  margin: -240px 0 0 -520px;
  border-radius: 20px;
  // background: #fff;
  // overflow: hidden;
}

.ms-login-bg {
  float: left;
  width: 480px;
  height: 480px;
  // background-image: url(../../assets/img/login/login_img.png);
  background-image: url(~@/assets/img/login/20190910155850.png);
  background-repeat: no-repeat;
  background-size: 100%;
  // transform:  translate(10%, 20%)
  transform: scale(1.38);
  transform-origin: center top;
}

.ms-login-form {
  float: left;
  width: 560px;
  height: 480px;
  padding: 35px 90px 0px;
  box-sizing: border-box;
}

.ms-login-form-box {
  overflow: hidden;
}

.ms-title {
  width: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 32px;
}

.ms-login-form-box .small {
  padding: 0 24px;
  color: #999;
  font-size: 15px;
  margin-top: 16px;
  line-height: 24px;
}

.ms-login-form-box .vCode-form {
  position: relative;
}

.ms-login-form-box .verify-box {
  position: absolute;
  top: 8px;
  right: 16px;
}

.ms-content {
  padding: 24px 24px;
}

.login-btn {
  margin-top: 32px;
  text-align: center;
}

.login-btn button {
  width: 240px;
  height: 40px;
  font-size: 20px;
  // background: linear-gradient(to right, #ffaf4d, #fb8436);
  background: #80c8ec;
  border: none;
}

.login-tips {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 12px;
  color: #bfbfbf;
  text-align: center;
}
</style>
