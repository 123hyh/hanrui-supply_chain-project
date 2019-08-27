<template>
  <div class="tags">
    <ul>
      <template v-for="(item,index) in getbreadCrumbsList">
        <!-- !!!勿动 判断 title ，不显示 form 页关闭后存储的数据 -->
        <li
          class="tags-li"
          v-show="item.title"
          :title="item.title"
          :class="{ [setThemeClass]: isActive(item.fullPath || item.path)}"
          :key="index"
        >
          <router-link :to="(item.fullPath || item.path)" class="set-width">{{item.title}}</router-link>
          <span
            v-if="item.path !== '/M00'"
            class="tags-li-icon"
            @click.stop="closeTags(index, (item.fullPath || item.path))"
          >
            <i :style="{'font-size': '14px'}" class="el-icon-close hover"></i>
          </span>
        </li>
      </template>
    </ul>
    <div class="tags-close-box">
      <!-- 更多菜单 -->
      <el-dropdown v-show="getbreadCrumbsList.length">
        <span class="el-dropdown-link">
          <i :style="{'font-size': '20px'}" class="el-icon-d-arrow-right el-icon--right hover"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in getbreadCrumbsList"
            :class="{'active': isActive(item.fullPath || item.path)}"
            :key="item.path"
            @click.native="$router.push(item.fullPath)"
          >{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 扩展功能 -->
      <el-dropdown @command="handleTags">
        <span class="el-dropdown-link">
          <i :style="{'font-size': '20px'}" class="el-icon-setting el-icon--right hover"></i>
        </span>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import utools from "@/domain/common/utools.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      tagsList: []
    };
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList", "removebreadCrumbData"]),
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index, path) {
      this.removebreadCrumbData({ index, isActive: this.isActive(path) });
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        // TODO: 8个导航标签限制
        if (this.tagsList.length >= 20) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        });
      }
      bus.$emit("tags", this.tagsList);
    },
    handleTags(command) {
      this.removebreadCrumbData({ type: command, active: this.$route.path });
    }
  },
  computed: {
    ...mapGetters(["getbreadCrumbsList", "getTheme"]),
    setThemeClass() {
      let obj = {
        "#409EFF": "theme-color-blur",
        "#FF8C02": "theme-color-warning",
        "#242F42": "theme-color-info"
      };
      return obj[this.getTheme];
    }
  },
  watch: {
    $route: {
      handler(cur, pre) {
        // this.$nextTick(()=>{
        this.addbreadCrumbsList({
          path: cur.path,
          fullPath: cur.fullPath,
          title: this.$route.meta.title
        });
        // })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // TODO: 暂时关闭 tags
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on("close_current_tags", () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push("/");
          }
          this.tagsList.splice(i, 1);
        }
      }
    });
  },
  mounted() {}
};
</script>


<style  lang='less'>
.tags {
  display: flex;
  width: 100%;
  height: 30px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;

  ul {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
  }

  .tags-li {
    float: left;
    width: 100px;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
    > a {
      color: #666;
    }
  }
  .active {
    background: #409eff;
    color: #fff !important;
  }
  .router-link-active {
    color: #fff !important;
  }
  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }
  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }
  .tags-close-box {
    display: flex;
    margin: auto;
    box-sizing: border-box;
  }
  .hover {
    &:hover {
      color: #409eff;
    }
  }
  .set-width {
    width: 100%;
    text-align: center;
  }
}
</style>
