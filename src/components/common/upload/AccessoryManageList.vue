<template>
  <div class="manage-list">
    <!-- 按钮 -->
    <div>
      <el-button
        v-for="(val,key,i) of btnList"
        :key="i"
        :type="val.type"
        @click.stop='handleBtnClick(key)'
      >{{val.label}}</el-button>
    </div>
    <!-- 表格 -->
    <table-component
      popoverType='selectTable'
      :dialog='false'
      :popoverList='table.list'
      :popoverListKey='table.config'
      :count='table.count'
      :activeRow.sync='table.activeRow'
      :multipleTable.sync='table.multipleTable'
      :addSlot="{label: '预览文件'}"
      @handlePageChange='handleListPageChange'
      @handleSlotEvent='handlePreviewFile'
    ></table-component>

    <!-- 上传表单弹窗 -->
    <upload-form-dialog
      ref='UploadFormDialog'
      :formData='uploadDialog'
      @formClickPreservation='handleFormDialogPreservation'
      @handleUpload='handleUpload'
      @handleRemoveFile='handleRemoveFile'
    ></upload-form-dialog>

  </div>
</template>
<script>

import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import attachmentType from '@/domain/tableconfig/basicdata/AttachmentType'
import UploadFormDialog from '@/components/common/upload/UploadFormDialog.vue'
import api from '@/assets/js/appHelper'
import billNoConfig from '@/components/common/upload/billNoConfig.js'
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
import utools from '@/domain/common/utools.js'
const { deleteMessage } = utools

export default {
  name: 'AccessoryList',
  components: {
    TableComponent,
    UploadFormDialog
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    visible: Boolean,
    isDocumentsManagement: Boolean, // 单证管理为另一套逻辑
  },
  watch: {
    visible: {
      handler (cur) {
        cur && (
          this.getAttachmentPageData(),
          this.table.activeRow = {}
        )
      },
      deep: true,
      immediate: true
    },
    form: {
      handler (val, oldVal) {
        // 控制新增按钮的显示  根据当前单据状态
        if ((val.status || 0) < 2)
          return this.btnList = {
            'create': {
              type: 'primary',
              label: '新增'
            },
            ...this.btnList
          };
        return delete this.btnList.create
      },
      deep: true,
      immediate: true
    }
  },
  data: _ => ({
    btnList: {
      'down': {
        type: 'primary',
        label: '下载',
      },
      'update': {
        type: 'primary',
        label: '修改',
      },
      'remove': {
        type: 'danger',
        label: '删除'
      }
    },
    table: {
      activeRow: {},
      list: [],
      count: 0,
      config: [
        { prop: 'attachCode', label: '附件编码', width: '200' },
        { prop: 'attachName', label: '附件文件名', width: '150' },
        { prop: 'attachTypeName', label: '附件类型', width: '50' },
        { prop: 'attachSize', label: '附件大小(KB)', width: '50' },
        { prop: 'attachRemark', label: '附件说明', width: '100' },
        { prop: 'attachUrl', label: '存储位置', width: '100' },
        { prop: 'creator', label: '上传人', width: '100' },
        { prop: 'createTime', label: '存储时间', width: '100' },
      ],
      multipleTable: []
    },
    uploadDialog: {
      visible: false,
      ruleForm: {},
      formConfig: [
        {
          type: "string",
          readonly: true,
          key: "attachCode",
          name: "附件编码",
          isShow: true
        },
        {
          type: 'string',
          readonly: true,
          key: 'attachTypeName',
          name: '附件类型',
          btn: true
        },
        {
          type: 'string',
          key: 'attachRemark',
          name: '附件说明'
        },
        {
          type: 'string',
          key: 'attachUrl',
          name: '存储位置',
          isShow: true
        }
      ]
    },

    fileList: []
  }),

  computed: {
    ...mapGetters(['getActivePathData', 'navigatorList']),
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),

    // 获取表格分页列表
    async getAttachmentPageData (pageData = {}) {
      // 处理请求参数
      let billNo;
      this.table.list = [], this.table.count = 0;
      if (this.isDocumentsManagement) {
        billNo = this.form.billNo;
      } else {
        if (!billNoConfig[this.$route.path.slice(1)]) {
          throw new Error('必须先在src/components/common/upload/billNoConfig.js文件中注册当前路由对应的单据编码取值')
        }
        let params = billNoConfig[this.$route.path.slice(1)];
        billNo = this.form[typeof (params) === 'object' ? params.billNo : params]
      }

      if (!billNo) throw new Error('缺少单据编号');
      try {
        const { data: {
          list,
          count
        } } = await api.getAttachmentPageData({
          ...pageData, billNo
        });
        this.table.list = list, this.table.count = count;
      } catch (error) {
        console.log(error)
      }
    },

    formAppend (set) {
      let formData = new FormData();
      for (let item of Object.keys(set)) {
        formData.append(item, set[item])
      }
      return formData
    },

    // 点击文件上传事件
    async handleFormDialogPreservation () {
      let reqData;
      if (this.isDocumentsManagement) {
        // 单证管理需要把点击当条的参数添加到
        const { attachNavigation, billNo, entrustOrderNo } = this.form
        reqData = this.formAppend({
          attachNavigation,
          billNo,
          fileType: 'bizbill',
          entrustOrderNo
        })

      } else {

        // 不是单证管理的逻辑
        let params = billNoConfig[this.$route.path.slice(1)],
          entrustOrderNo = null;

        // 设置请求参数
        if (typeof (params) === 'object') {
          entrustOrderNo = this.form[params.entrustOrderNo],
            params = this.form[params.billNo]
        } else {
          params = this.form[params];
        };

        // 设置单证导航
        let attachNavigation = this.navigatorList[this.$route.path.slice(1)];
        if (typeof (attachNavigation) === 'object') {
          attachNavigation = attachNavigation.map(item => item.label).join('/')
        }

        reqData = this.formAppend({
          billNo: params,
          fileType: 'bizbill',
          attachNavigation,
          entrustOrderNo,
        });
      }

      for (let file of this.fileList) {
        // 遍历多个文件
        reqData.append('files', file);
      }
      for (let item of Object.keys(this.uploadDialog.ruleForm)) {
        reqData.append(item, this.uploadDialog.ruleForm[item])
      }

      let sCode = 200;
      try {
        const { data } = await api.accessoryUpload(reqData);
        // 清空文件列表
        this.$refs.UploadFormDialog.$refs.upload.clearFiles();
        this.fileList = [];
        this.uploadDialog.visible = false;
        // 上传成功后加载列表
        this.getAttachmentPageData();
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '上传成功' : '上传失败，请重试！'
        })
      }
    },

    // 点击删除事件
    async removeattachment () {
      if (this.utools.isNull(this.table.multipleTable)) return this.$message({ type: 'warning', message: '请选择一条数据进行操作！' });
      
      deleteMessage.call(this, async () => {
        const codeList = this.table.multipleTable.map(item => item.attachCode)
        let sCode = 200;
        try {
          const { data } = await api.batchRemoveAttachment(codeList);
          this.getAttachmentPageData(), this.table.activeRow = {}, this.table.multipleTable = [];
          this.$emit('updateTableData')
        } catch (error) {
          sCode = 0;
          console.log(error)
        } finally {
          this.$message({
            type: sCode ? 'success' : 'error',
            message: sCode ? '删除成功！' : '删除失败，请重试！'
          })
        }
      })

    },

    // 点击顶部操作按钮事件
    handleBtnClick (target) {
      switch (target) {
        case 'create': // 新增
          this.uploadDialog.visible = true;
          break;
        case 'down': this.downlaodFile(); break;
        case 'remove': this.removeattachment();
      }
    },
    // 下载文件
    async downlaodFile () {
      if (!this.table.multipleTable.length) return this.$message({ type: 'warning', message: '请选择一条数据进行下载！' });
      let names = this.table.multipleTable.map(item => (item.attachName));
      try {
        this.traversalDown(
          await Promise.all(
            names
              .map(item => api.downlaodFile({ filename: item, fileType: 'bizbill' })
              )),
          names
        )
      } catch (error) {
        console.log(error)
      }
    },

    //遍历下载
    traversalDown (data = [], names) {
      data.forEach(({ data }, i) => {
        var a = document.createElement('a');
        var href = URL.createObjectURL(data);
        a.href = href;
        a.download = names[i];
        a.click();
        URL.revokeObjectURL(href);
      });
      this.table.activeRow = {}
    },

    // 文件选择后的事件及限制大小处理(20M)
    handleUpload ({ file, uid }) {
      if (file.size <= (1024 * 20 * 1024)) {
        this.fileList.push(file)
      } else {
        this.$refs.UploadFormDialog.$refs.upload.uploadFiles.splice((() => {
          return this.$refs.UploadFormDialog.$refs.upload.uploadFiles.findIndex(item => item.uid === uid)
        })(), 1)
        this.$message({
          type: 'warning',
          message: '文件不能大于20M'
        })
      }
    },


    // 主表格的分页事件
    handleListPageChange (pageData = {}) {
      this.getAttachmentPageData(pageData)
    },

    // 删除文件
    handleRemoveFile ({ uid }) {
      const i = this.fileList.findIndex(item => item.uid === uid);
      ~i && this.fileList.splice(i, 1);
    },

    // 点击预览文件
    async handlePreviewFile ({ attachUrl, attachName } = {}) {
      try {
        const { data } = await axios({
          url: process.env.NODE_ENV !== 'production' ? '/file' : '',
          method: 'GET',
          responseType: 'blob',
          params: {
            fileUrl: attachUrl.replace(/\\/g, '/'),
            fileName: attachName
          }
        }),
          url = URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>
<style lang="less">
.manage-list {
  .upload {
    margin-top: 50px;
    text-align: center;
    .el-upload--text {
      border: none;
    }
  }
}
</style>
