<template>
  <!-- 分页条组件 -->
  <div class="pagination-right">
    <pagination
      v-if='anewRender'
      :count='count'
      @handlePageChange='handlePageChange'
    ></pagination>
  </div>
</template>
<script>
import Vue from 'vue'
const Pagination = {
  render (h) {
    return (
      <el-pagination
        background
        current-page={this.currentPage}
        on-size-change={(item) => this.handleSizeChange(item)}
        on-current-change={(item) => this.handleCurrentChange(item)}
        page-sizes={this.initPageSize}
        page-size={this.currentPageSize}
        layout=" sizes, total, prev, pager, next"
        total={this.count}
      ></el-pagination>
    )
  },
  /*  template: `<el-pagination
       background
       :current-page="currentPage"
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="initPageSize"
       :page-size="currentPageSize"
       layout=" sizes, total, prev, pager, next"
       :total="count"
     ></el-pagination>`, */
  data () {
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
      handler (cur, pre) {
        this.currentPage = 1;
      },
      deep: true
    },
    currentPage: {
      handler (newVal) {
        this.handlePageChange();
      },
      deep: true
    },
    currentPageSize: {
      handler: {
        handler (newVal) {
          this.handlePageChange();
        },
        deep: true
      }
    },
  },
  computed: {
    initPageSize () {
      let arr = [];
      for (let i = 0; i < parseInt(this.count / 10); i++) {
        if (i < 4) arr.push((i + 1) * 10)
      }
      return arr;
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.currentPageSize = pageSize;
    },
    handleCurrentChange (pageIndex) {
      this.currentPage = pageIndex;
    },
    handlePageChange: (() => {
      let time;
      return function (x) {
        time && (clearTimeout(time), (time = null));
        !x &&
          (time = setTimeout(_ => {
            this.$emit("handlePageChange", {
              pageIndex: this.currentPage,
              pageSize: this.currentPageSize
            });
          }, 50));
      };
    })()
  },
  beforeDestroy () {
    this.handlePageChange(1);
  }
}

export default {
  data: _ => ({
    anewRender: true
  }),
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  watch: {
    count: {
      handler (val) {
        this.anewRender = false;
        this.$nextTick(() => {
          this.anewRender = true
        })
      },
      deep: true,
      immediate: true
    }
  },

  components: {
    Pagination
  },

  methods: {
    handlePageChange (data = {}) {
      this.$nextTick(() => {
        if (!this.anewRender) return
        this.$emit('handlePageChange', data)
      })
    }
  }
};
</script>
<style lang="less">
.pagination-right {
  margin: 10px 0;
  text-align: right;
}
</style>
