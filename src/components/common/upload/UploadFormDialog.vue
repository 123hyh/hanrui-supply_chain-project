<template>
  <div>
    <!-- 上传表单弹窗 -->
    <dialog-component
      :zIndex="'3500'"
      itemName='附件上传'
      :isShowPopover.sync='formData.visible'
      popoverType='form'
      :formData='formData'
      @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
      @formClickPreservation='formClickPreservation'
    >
      <template slot='upload'>
        <div class="
      upload">
          <el-upload
            ref="upload"
            drag
            action=""
            :http-request='handleUpload'
            :on-remove='handleRemoveFile'
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
      </template>
    </dialog-component>
    <!-- 表格弹窗 -->
    <dialog-component
      :itemName='tableDialog.itemName'
      :activeRow.sync='tableDialog.activeRow'
      :isShowPopover.sync='tableDialog.visible'
      :popoverList='tableDialog.list'
      :popoverListKey='tableDialog.config'
      :count='tableDialog.count'
      @handlePageChange='handlePageChange'
      @handlerSubPreservation='handlerSubPreservation'
    ></dialog-component>
  </div>

</template>
<script>
import DialogComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import attachmentType from '@/domain/tableconfig/basicdata/AttachmentType'
import api from '@/assets/js/appHelper'

export default {
  data: _ => ({
    tableDialog: {
      visible: false,
      activeRow: {},
      itemName: '附件类型',
      list: [],
      config: attachmentType,
      count: 0,
    },
  }),
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {

    // 表单的点击按钮事件
    handlerFormConfigClickSearch (target) {
      this.tableDialog.visible = true;
      this.setTableDialogData()
    },

    handlerSubPreservation () {
      const { attachmentTypeCode, classifyName } = this.tableDialog.activeRow;
      this.$set(this.formData.ruleForm, 'attachType', attachmentTypeCode)
      this.$set(this.formData.ruleForm, 'attachTypeName', classifyName)
    },

    getTableDialogData (pageData = {}) {
      return Promise.resolve(api.queryattachmenttypeSearch(pageData))
    },

    async setTableDialogData (pageData = {}) {
      try {
        const { data: { list, count } } = await this.getTableDialogData({ ...pageData, status: '2' });
        this.tableDialog = { ...this.tableDialog, list, count };
      } catch (error) {
        this.$message({ type: 'error', message: '数据获取失败，请重试！' })
        console.log(error)
      }
    },
    // 表格弹窗事件
    handlePageChange (pageData = {}) {
      this.setTableDialogData(pageData)
    },


    // 点击上传
    formClickPreservation () {
      this.$emit('formClickPreservation')
    },
    handleUpload (data) {
      this.$emit('handleUpload', data)
    },
    handleRemoveFile (data) {
      this.$emit('handleRemoveFile', data)
    }
  },
  components: {
    DialogComponent
  }
}
</script>