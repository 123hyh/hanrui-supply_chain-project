<template>
  <div class="to-do-list">
    <el-card class="box-card" shadow="never">
      <div class="wise-reminder">
        <i class="draw-circle-blue"></i>
        <span>待办事项({{dataDescri.total}}个)</span>
      </div>
      <ul v-infinite-scroll="getDescri">
        <li
          :key="index"
          class="text item form-layout item-space set-height"
          v-for="(item,index) in dataDescri.descri"
        >
          <a
            @click="viewprocess(item)"
            style="cursor: pointer;flex: 1;white-space: nowrap;overflow: hidden;margin-right: 10px;"
          >{{item.title}}</a>
          <span>[{{item.createTime.slice(0,10)}}]</span>
        </li>
      </ul>
      <p v-show="loading">加载中...</p>
    </el-card>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
export default {
  data() {
    return {
      loading: false,
      // 代办
      dataDescri: {
        descri: [],
        total: 0
      },
      // 分页参数
      pageParam: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 查询待办
    async getDescri() {
      this.loading = true
      try {
        const { data } = await api.query('/todo/search', this.pageParam)
        this.dataDescri.descri.push(...data.list)
        this.dataDescri.total = data.count
        this.pageParam.pageIndex++
      } catch (e) {
        this.$message.error('获取待办事项失败！')
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    // 点击某一条数据 打开 流程图
    viewprocess(param) {
      if (param.messageType == '1') {
        this.$notify.info({
          title: '待办',
          message: param.content
        })
        return
      }
      this.$emit('update:item', param)
      this.$emit('update:processVisible', true)
      // this.processVisible = true
      // this.$nextTick(()=>{
      // this.$refs.flowchart.init();
      // this.$refs.flowchart.down();// 绘制
      // this.$refs.flowchart.selectNode();//高亮
      // });
    }
  }
}
</script>

<style lang='less' scoped>
.to-do-list {
}
</style>