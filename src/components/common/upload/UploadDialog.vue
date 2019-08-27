/* 上传弹窗组件 */
<template>
  <div class="upload-list">
    <el-dialog
      v-dialogDrag
      title="附件列表"
      :visible.sync='visible'
      width="1100px"
      :before-close='closeDialog'
    >
      <AccessoryManageList
        :visible.sync='visible'
        :form='form'
        :isDocumentsManagement='isDocumentsManagement'
        @updateTableData="_=> $emit('updateTableData')"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click.stop='closeDialog'>
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AccessoryManageList from '@/components/common/upload/AccessoryManageList.vue'
export default {
  components: {
    AccessoryManageList
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    visible: Boolean,
    isDocumentsManagement: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭附件列表弹窗
    closeDialog () {
      Promise.all([
        this.$emit('handleCloseDialog'),
        this.$emit('update:visible', false)
      ])
    }
  }
}
</script>