<template>
  <header
    class="header"
    :style="{'background-color': getTheme}"
  >
    <!-- 修改登录密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="pwdPopVisible"
      width="25%"
    >
      <el-form
        :model="pwdForm"
        ref="pwdForm"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item
          label="旧密码"
          prop="oldPassword"
        >
          <el-input
            v-model="pwdForm.oldPassword"
            style="width: 70%;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            v-model="pwdForm.newPassword"
            style="width: 70%;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="checkPwd"
        >
          <el-input
            v-model="pwdForm.checkPwd"
            style="width: 70%;"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="pwdPopVisible = false;">取 消</el-button>
        <el-button
          type="primary"
          @click.native="surePwdPop('pwdForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 折叠按钮 -->
    <div
      class="collapse-btn"
      @click="collapseChage"
    >
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">{{systemName}}
      <!-- 智慧供应链综合服务平台 -->
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div
          class="form-layout"
          style="flex-wrap:nowrap"
        >
          <span class="el-dropdown-link hoverDialog"> {{userName}} <i class="el-icon-caret-bottom"></i>
            <!-- hover显示 -->
            <el-card class="box-card user-message user-dialog">
              <div
                class="form-layout"
                style="flex-wrap: nowrap"
              >
                <div>主题：</div>
                <div class="form-layout theme-list">
                  <div
                    v-for="item in themeList"
                    @click.stop="switchTheme(item)"
                    :key="item"
                    :style="{'background': item}"
                  ></div>
                </div>
              </div>
              <div @click.stop="handleCommand('editPwd')">修改密码</div>
              <div @click.stop="handleCommand('loginout')">退出登录</div>
            </el-card>
          </span>
          <!-- 全屏显示 -->
          <div
            style="display: block"
            class="btn-fullscreen"
            @click="handleFullScreen"
          >
            <el-tooltip
              effect="dark"
              :content="fullscreen?`取消全屏`:`全屏`"
              placement="bottom"
            >
              <i class="el-icon-rank"></i>
            </el-tooltip>
          </div>
        </div>
        <!-- 消息中心 -->
        <div
          style="display: none"
          class="btn-bell"
        >
          <el-tooltip
            effect="dark"
            :content="message?`有${message}条未读消息`:`消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span
            class="btn-bell-badge"
            v-if="message"
          ></span>
        </div>
        <!-- 用户头像 -->
        <!-- <div class="user-avator"><img src="../../assets/img/img.jpg"></div>  -->
        <!-- 用户名下拉菜单 -->

        <!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu>
						<el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
      </div>
    </div>
  </header>
</template>
<script>
import bus from '../common/bus';
import api from '@/assets/js/appHelper.js'
import qs from 'qs'
import md5 from 'md5'
import utools from '@/domain/common/utools.js';
import { instance as service } from '@/assets/js/initApi.js'

import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      themeList: [
        '#409EFF', '#FF8C02', '#242F42'
      ],
      collapse: false,
      fullscreen: false,
      name: 'linxin',
      message: 2,
      //密码弹窗
      pwdPopVisible: false,
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        checkPwd: '',
      },
      rules: {
        oldPassword: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        checkPwd: [
          {
            required: true,
            message: '请输入验证密码',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: ['blur', 'change'] }],
      },
    }
  },
  computed: {
    ...mapGetters(['getTheme', 'systemName','userName']),
 
  },
  created () {
    const { getLocal } = utools;
    this.switchTheme('', () => {
      return getLocal('theme');
    });
  },
  methods: {
    ...mapMutations(['setTheme', 'initbreadCrumbsList', 'resetAuthority']),
    /**
     * @method switchTheme 切换主题
     */

    switchTheme (color, callback) {
      color && utools.setLocal('theme', color);
      this.setTheme(color || callback() || '#409EFF');
    },
    // 用户名下拉菜单选择事件
    async handleCommand (command) {
      if (command == 'loginout') {
        this.handlerLogout();
      } else if (command == 'editPwd') {
        this.pwdPopVisible = true;
      }
    },

    // 退出登录事件
    async handlerLogout () {
      localStorage.removeItem('token');
      sessionStorage.clear();

      // 清空菜单和按钮
      this.resetAuthority();

      this.$router.push('/login');

      // reset axios 实例的 自定义token头的值
      service.defaults.headers.common['x-auth-token'] = '';

      try {
        const { data } = await api.goLogout();
      } catch (e) {
        console.log(e)
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    //修改密码
    surePwdPop (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = {
            userCode: localStorage.getItem('userCode'),
            oldPassword: md5(this.pwdForm.oldPassword),
            newPassword: md5(this.pwdForm.newPassword),
          }
          const { data } = await api.editPwd(qs.stringify(params));
          console.log(data)
          if (data) {
            this.$alert('密码修改成功，请重新登录！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.pwdPopVisible = false;
                this.$router.push('/login');
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
}
</script>
<style scoped lang='less'>
.header {
  transition: background-color 0.5s linear;
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;

  > .form-layout {
    // width: 135px;
    justify-content: space-around;
  }
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}

.form-layout {
  list-style: none;

  & > li {
    margin-left: 5px;
    width: 20px;
    height: 20px;
    background: #000;
  }
}

.user-message {
  font-size: 13px;
  position: absolute;
  text-align: center;
  margin-top: 5px;
  right: 48px;
  top: 40px;
  cursor: pointer;
  z-index: 1000;
  & > div > div {
    margin-top: 10px;
    height: 30px;
    text-align: center;
    line-height: 40px;
  }
}

.theme-list > div {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  line-height: 30px;
  text-align: center;
}
.user-dialog {
  display: none;
}
.hoverDialog:hover .user-dialog {
  display: block;
}
</style>
