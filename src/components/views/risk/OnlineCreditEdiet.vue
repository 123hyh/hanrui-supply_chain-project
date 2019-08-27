<template>
  <div>
    <!-- 保存 返回 按钮 -->
    <div class="btnBottom">
			<el-button @click.stop="handleRollback">返回</el-button>
    </div>
  <!-- 授信申请 -->
  <div class="OnlineCreditEdiet">
    <div>
      <p style="font-size: 25px; color:#666; text-align: center">授信申请书</p>
      <div class="title">
        <span>提报单位: 德鑫科技（深圳）</span>
        <span>提报时间: 2019-5-24</span>
      </div>
      <div class="main">
        <div>
          <p
            v-for="(val, key, index) in clienMsgConfig"
            :key="index"
          >
            <span>{{val}}: </span>
            <span>{{clienMsg[key] | setHTML}}</span>
          </p>
        </div>
        <div>
          <p>申请原因: {{clienMsg.applyReason}}</p>
        </div>
        <p>
          附属资料:
          <br />
          <a href="javascript:;">xxx.png</a>
          <a href="javascript:;">xxx.png</a>
        </p>
        <div>
          <div>
            <el-button
              type="primary"
              v-for="(item, index) in ['订单受理','订单退回']"
              :disabled="(clienMsg.state === 2 || clienMsg.state === 3 && true)"
              :key="index"
              @click.stop="handleBtnClick(index)"
            >{{item}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <section>
      <el-dialog
        v-dialogDrag
        title="提示"
        :visible.sync="dialogVisible"
        width="20%"
        center
        :before-close="handleCancel"
      >
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="请输入备注"
          v-model="clienMsg.remark"
        >
        </el-input>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click.stop="handleCancel">取 消</el-button>
          <el-button
            type="primary"
            @click.stop="handleConfirm(true)"
          >确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
  </div>
</template>
<script>
import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getActivePathData'])
  },
  created () {
    const { formData: { applyNo = '' } = {} } = this.getActivePathData(this.$route.path);
    this.getData(applyNo)
  },
  filters: {
    setHTML (data) {
      return data ? data : ''
    }
  },
  data () {
    return {
      dialogVisible: false,
      btnTarget: NaN,
      clienMsgConfig: {
        applyCompanyName: '申请公司全称',
        guaranteeCompanyName: '担保公司全称',
        applyAmount: '申请综合授信额度',
        currency: '币别',
        bussnessType: '申请授信业务类别',
        timeLimit: '申请授信期限',
        collateral: '抵押物名称'
      },
      clienMsg: {
        remark: '',
        applyCompanyName: '德鑫子公司',
        guaranteeCompanyName: '中兴科技邮箱是'
      },
      code: '',
    }
  },
  methods: {
    async getData (code) {
      try {
        const { data = {} } = await api.getOneOnlineCredit(code);
        this.clienMsg = data;
      } catch (error) {
        console.log(error)
      }
    },
    handleBtnClick (index) {
      this.dialogVisible = true;
      this.btnTarget = index;
    },
    handleRollback () {
      this.$router.push('M0307');
    },
    async handleConfirm () {
      try {
        let param = this.btnTarget ? 3 : 2;
        const { data, state } = await api.handleCreditApply({ ...this.clienMsg, state: this.btnTarget ? 3 : 2 });
        this.clienMsg.state = param;
        utools.alertMessage.call(this, 200)
      } catch (error) {
        utools.alertMessage.call(this)
        console.log(error)
      } finally {
        this.dialogVisible = false
      }
    },
    handleCancel () {
      this.dialogVisible = false;
    }
  }
}
</script>
<style lang="less">
.OnlineCreditEdiet {
  height: 100%;
  display: flex;
  align-items: center;
  .pad {
    padding: 5px;
  }
  .space {
    justify-content: space-around;
  }
  > div {
    margin: 0 auto;
    box-sizing: border-box;
    font-weight: 100;
    width: 50%;
    > .title {
      display: flex;
      .space;
      padding: 20px;
    }
    & > .main {
      position: relative;
      height: 500px;
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #e9eaec;
      border-radius: 10px;
      > div:first-child {
        display: flex;
        flex-wrap: wrap;
        .space;
        &::after {
          content: "";
          flex: auto;
        }
        & > p {
          margin-top: 20px;
          flex-basis: 50%;
          display: flex;
          .space;
        }
      }
      > :nth-child(2) {
        box-sizing: border-box;
        .pad;
        height: 30%;
        margin-top: 20px;
        border-top: 1px solid #e9eaec;
      }
      > :nth-child(3) {
        .pad;
        > a {
          margin-left: 10px;
        }
        margin-top: 20px;
        border-top: 1px solid #e9eaec;
      }
      > :nth-child(4) {
        width: 100%;
        position: absolute;
        top: 87%;
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
