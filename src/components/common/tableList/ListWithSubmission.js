import Vue from 'vue'
export default Vue.compile(`<div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :dialog='false'
        :queryBarVisible='false'
        :popoverList='table.list'
        :popoverListKey='table.config'
        :count='table.count'
        :activeRow.sync='table.activeRow'
        @dblclickTableRow="clickTableRow"
        @handlePageChange="handlePageChange"
      ></table-component>
    </div>

    <popover-component
      :itemName='formDialog.title'
      :isShowPopover.sync='formDialog.isShowPopover'
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData='formDialog'
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerOtherSubmit"
      @handlerFormConfigClickSearch='rousePopover'
      @handlerFormVerify="handlerFormVerify"
    ></popover-component>

    <popover-component
      :isShowPopover='popover.isShowPopover'
      :popoverType="popover.popoverType"
      :currencySelectInputKey='popover.currencySelectInputKey'
      :formConfig='popover.queryBarObj'
      :popoverListKey='popover.popoverListKey'
      :popoverList='popover.popoverList'
      :ruleForm='popover.ruleForm'
      :count='popover.count'
      :btnObj='popover.btnObj'
      :itemName='popover.itemName'
      @handleBtnClickType="tableDialogBtnSearchAndPageChange"
      @changeisShowPopover='rousePopover' 
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="tableDialogBtnSearchAndPageChange"
    ></popover-component>
</div>`)
