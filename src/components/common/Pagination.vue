<template>
  <!-- 分页条组件 -->
  <div class="pagination-right">
    <el-pagination
	  background
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="initPageSize"
      :page-size="currentPageSize"
      layout=" sizes, total, prev, pager, next"
      :total="count"
    ></el-pagination>
  </div>
</template>
<script>

export default {
  data() {
    return {
      currentPage: 1,
      currentPageSize: 10
    };
  },
  props: {
    count: {
      // 数据总条数
      type: Number,
      default: 0
    }
  },
  watch: {
    count: {
      handler(cur, pre){
        this.currentPage = 1;
      },
      deep: true
    },
    currentPage: {
      handler(newVal) {
        this.handlePageChange();
      },
      deep: true
    },
    currentPageSize: {
      handler: {
        handler(newVal) {
          this.handlePageChange();
        },
        deep: true
      }
    },
  },
  computed: {
 
    initPageSize() {
      let arr = [];
			for (let i = 0; i <= parseInt(this.count / 10); i++ ) {
				if ( i < 4 ) arr.push((i+1)*10)
			}
      return arr;
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.currentPageSize = pageSize;
    },
    handleCurrentChange(pageIndex) {
      this.currentPage = pageIndex;
    },
    handlePageChange: (() => {
      let time;
      return function(x) {
        time && (clearTimeout(time), (time = null));
        !x &&
          (time = setTimeout( _ => {
            this.$emit("handlePageChange", {
              pageIndex: this.currentPage,
              pageSize: this.currentPageSize
            });
          }, 50));
      };
    })()
  },
  beforeDestroy() {
    this.handlePageChange(1);
  }
};
</script>
<style lang="less">
  .pagination-right{
    margin: 10px 0;
    text-align: right
  }
</style>
