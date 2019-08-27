<template>
  <div class="index-background">
    <!-- 首部四个 -->
    <div class="form-layout first-child-layout">
      <!-- 待办事项 -->
      <div>
        <el-card
          class="box-card"
          shadow="never"
        >
          <div class="wise-reminder">
            <i class="draw-circle-blue"></i>
            <span>待办事项({{dataDescri.total}}个)</span>
          </div>
          <ul>
            <li
              v-for="(item,index) in dataDescri.descri"
              :key="index"
              class="text item form-layout item-space set-height"
            >
              <a
                style="cursor: pointer;flex: 1;white-space: nowrap;overflow: hidden;margin-right: 10px;"
                @click="viewprocess(item)"
              >{{item.title}}</a>
              <span>[{{item.createTime.slice(0,10)}}]</span>
            </li>
          </ul>
        </el-card>
      </div>
      <!-- 公告 -->
      <div>
        <el-card
          class="box-card"
          shadow="never"
        >
          <div class="wise-reminder">
            <i class="draw-circle-green"></i>
            <span>公司公告</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="notifilistVisible=true"
            >更多</el-button>
          </div>
          <ul>
            <template v-for="(item,index) in dataNotifi.notifilist">
              <li
                v-if="index < 4"
                :key="index"
                class="text item form-layout item-space set-height"
              >
                <i class="icon-trumpet"></i>
                <!-- <div class="form-layout" style="">
                <a @click="handleJump(item.itemCode)" style="cursor: pointer;flex: 1; white-space: nowrap; overflow: hidden; margin-right: 10px;">【公告】{{item.title}}</a>
                <span>[{{item.publicTime.slice(0,10)}}]</span>
              </div> -->
                <a
                  @click="handleJump(item.itemCode)"
                  style="cursor: pointer;flex: 1; white-space: nowrap; overflow: hidden; margin-right: 10px;"
                >【公告】{{item.title}}</a>
                <span>[{{item.publicTime.slice(0,10)}}]</span>
              </li>
            </template>
          </ul>
        </el-card>
      </div>
      <!-- 汇率 -->
      <div>
        <el-card
          class="box-card"
          shadow="never"
        >
          <div class="wise-reminder">
            <i class="draw-circle-orange"></i>
            <span>今日外汇牌价</span>
          </div>
          <ul>
            <li
              v-for="(item,i) in exchangeRateList"
              :key="i"
              class="text item form-layout item-space"
            >
              <div>
                <span>{{item}}</span>
              </div>
            </li>
          </ul>
        </el-card>
      </div>
      <!-- 用户信息 -->
      <div>
        <el-card
          class="box-card form-layout flex-content"
          shadow="never"
        >
          <ul class="user-message">
            <li></li>
            <li>{{userInfo.userName}}</li>
            <li>{{userInfo.phone}}</li>
            <li>
              <pre>{{userInfo.departmentName}} · {{userInfo.position}}</pre>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
    <!-- 中间图形 -->
    <div class="middle-chart">
      <div>
        <div
          id="dailySales"
          :style="{ height: '380px'}"
        ></div>
      </div>
      <div>
        <div
          id="turnoverYoy"
          :style="{ height: '380px'}"
        ></div>
      </div>
    </div>
    <!-- 底部原图 -->
    <div class="form-layout foot-pieChart">
      <div>
        <div id="historySaleroom"></div>
      </div>
      <div class="waterBox">
        <div id="water"></div>
        <div class="footerText">
          <span>
            <i class="el-icon-tickets"></i>计划销售：10亿
          </span>
          <span>
            <i class="el-icon-time"></i>目前销售：6亿
          </span>
        </div>
      </div>
      <div>
        <div id="riskManagement"></div>
      </div>
    </div>
    <!-- 弹出公告 -->
    <el-dialog
      title="系统公告"
      :visible.sync="notifilistVisible"
    >
      <el-table :data="dataNotifi.notifilist">
        <el-table-column
          property="title"
          label="公告标题"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">【公告】{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="publicTime"
          label="公告时间"
        >
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">[{{scope.row.publicTime.slice(0,10)}}]</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看"
              placement="right"
            >
              <i
                @click="handleJump(scope.row.itemCode)"
                class="el-icon-view"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="queryNotifi.pageSize"
          :current-page.sync="queryNotifi.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="dataNotifi.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 弹出流程图 -->
    <el-dialog
      class="viewdialog"
      :visible.sync="processVisible"
    >
      <flow-chart
        :process='item'
        :visible='processVisible'
        ref="flowchart"
      ></flow-chart>
    </el-dialog>
    <!-- <div style="position: fixed;left: 0;top: 0;" v-show="processVisible">
      <flow-chart :process='item' ref="flowchart"></flow-chart>
    </div> -->
  </div>
</template>

<script>
import FlowChart from "@/components/common/FlowChartImported.vue"

if (process.env.NODE_ENV !== 'production') {
  require('echarts');
  require('echarts-liquidfill')
}
import bus from "../common/bus";
import api from "@/assets/js/appHelper";
import { mapActions, mapGetters } from 'vuex'
import utools from '@/domain/common/utools.js';
import { window } from 'd3-selection';

export default {
  name: "dashboard",
  components: {
    FlowChart
  },
  computed: {
    ...mapGetters(['exchangeRate', 'userInfo']),
    exchangeRateList () {      return this.exchangeRate.reduce((pre, cur, i) => {
        pre = [
          ...pre,
          `1 ${
          cur["currency"] == "澳大利亚元" ? "澳元" : cur["currency"]
          } = ${(+cur["cenPrice"] / 100).toFixed(4)} 人民币`
        ];
        return pre;
      }, [])    }
  },
  data () {
    return {
      // 公告
      dataNotifi: {
        notifilist: [],
        total: 0
      },
      queryNotifi: {
        pageIndex: 1,
        pageSize: 10
      },
      notifilistVisible: false,
      // 代办
      dataDescri: {
        descri: [],
        total: 0
      },
      processVisible: false,
      // 流程参数
      item: {},
      name: localStorage.getItem("ms_username"),
      options: {
        title: "最近七天每天的用户访问量",
        showValue: false,
        fillColor: "rgb(45, 140, 240)",
        bottomPadding: 30,
        topPadding: 30
      },
      options2: {
        title: "最近七天用户访问趋势",
        fillColor: "#FC6FA1",
        axisColor: "#008ACD",
        contentColor: "#EEEEEE",
        bgColor: "#F5F8FD",
        bottomPadding: 30,
        topPadding: 30
      }
    };
  },
  mounted () {
    let dailySales = this.$echarts.init(document.getElementById("dailySales"));
    let turnoverYoy = this.$echarts.init(
      document.getElementById("turnoverYoy")
    );
    let historySaleroom = this.$echarts.init(
      document.getElementById("historySaleroom")
    );
    let water = this.$echarts.init(document.getElementById("water"));
    let riskManagement = this.$echarts.init(
      document.getElementById("riskManagement")
    );
    //  折线图数据
    let dailySalesOption = {
      color: ["#3CE99D", "#FFBD00", "#497FFF"],
      title: {
        text: "日销售额",
        x: "center",
        y: 10,
        fontSize: 10,
        textStyle: {
          fontWeight: 0,
          fontSize: 15
        }
      },

      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        containLabel: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["进口", "出口", "其他"],
        bottom: 0,
        icon: "circle",
        letf: "center",
        itemGap: 100,
        itemHeight: 10,
        itemWidth: 10
      },
      xAxis: {
        type: "category",
        data: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00", "24:00"],
        boundaryGap: false
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "进口",
          data: [820, 932, 901, 934, 1290, 1330, 1500],
          type: "line",
          smooth: true
        },
        {
          name: "出口",
          data: [100, 200, 300, 400, 500, 1330, 988],
          type: "line",
          smooth: true
        },
        {
          name: "其他",
          data: [400, 200, 300, 500, 300, 1330, 777],
          type: "line",
          smooth: true
        }
      ]
    };
    // 柱状图数据
    let turnoverYoyOption = {
      title: {
        text: "营业额同比(亿)",
        x: "center",
        y: 10,
        textStyle: {
          fontSize: 15,
          fontWeight: 0
        }
      },
      color: ["#5386ff", "#00e37f"],
      legend: {
        bottom: 0,
        itemGap: 100,
        itemHeight: 10,
        itemWidth: 10,
        icon: "circle"
      },
      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        containLabel: true
      },
      tooltip: {},
      dataset: {
        dimensions: ["product", "2018", "2019"],
        source: [
          {
            product: "1月",
            "2018": 85.8,
            "2019": 93.7
          },
          {
            product: "2月",
            "2018": 30,
            "2019": 80
          },
          {
            product: "3月",
            "2018": 20,
            "2019": 30
          },
          {
            product: "4月",
            "2018": 85.8,
            "2019": 93.7
          },
          {
            product: "5月",
            "2018": 10,
            "2019": 20
          },
          {
            product: "6月",
            "2018": 90,
            "2019": 25
          },
          {
            product: "7月",
            "2018": 50,
            "2019": 30
          },
          {
            product: "8月",
            "2018": 87,
            "2019": 32
          },
          {
            product: "9月",
            "2018": 10,
            "2019": 99
          },
          {
            product: "10月",
            "2018": 75,
            "2019": 80
          },
          {
            product: "11月",
            "2018": 30,
            "2019": 20
          },
          {
            product: "12月",
            "2018": 9,
            "2019": 93.7
          }
        ]
      },
      xAxis: {
        type: "category"
      },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {
          type: "bar"
        },
        {
          type: "bar"
        }
      ]
    };
    let historySaleroomOption = {
      color: ["#5386ff", "#00e37f"],
      title: {
        text: "前一天最高销售额/历史最高销售额(亿)",
        x: "center",
        y: 10,
        textStyle: {
          fontSize: 15,
          fontWeight: 0
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        bottom: 5,
        left: "center",
        data: ["历史最高", "前一天"],
        itemHeight: 10,
        itemWidth: 10,
        itemGap: 50,
        icon: "circle"
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 335,
              name: "历史最高"
            },
            {
              value: 310,
              name: "前一天"
            }
          ]
        }
      ]
    };
    let riskManagementOption = {
      color: ["#5386ff", "#00e37f", "#FFC700"],
      title: {
        text: "风险控制",
        x: "center",
        y: 10,
        textStyle: {
          fontSize: 15,
          fontWeight: 0
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },

      legend: {
        bottom: 5,
        left: "center",
        data: ["授信额度", "已用额度", "剩余额度"],
        itemHeight: 10,
        itemWidth: 10,
        itemGap: 50,
        icon: "circle"
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 335,
              name: "授信额度"
            },
            {
              value: 310,
              name: "已用额度"
            },
            {
              value: 310,
              name: "剩余额度"
            }
          ]
        }
      ]
    };
    let waterOption = {
      title: {
        //标题
        text: "年度销售计划（亿）",
        x: "center",
        y: 10,
        textStyle: {
          fontSize: 15,
          fontWeight: 0
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "计划销售: 10亿<br/> 当前进度<br/> 60%<br/> 目前销售: 6亿 "
      },
      series: [
        {
          type: "liquidFill",
          color: ["rgba(0,227,127,1)"], //水波的颜色 对应的是data里面值
          data: [0.6],
          radius: "70%",
          itemStyle: {
            shadowBlur: 0, //波浪的阴影范围
            shadowColor: "#fff" //阴影颜色
          },
          outline: {
            borderDistance: 0, //外部轮廓与图表的距离 数字
            itemStyle: {
              borderColor: "#00E37F", //边框的颜色
              borderWidth: 15 //图表的边框宽度
            }
          },
          backgroundStyle: {
            borderColor: "#E3F7FF", //图表的边框颜色
            borderWidth: 8, //图表的边框宽度
            color: "#fff" //图表的背景颜色
          },
          label: {
            formatter: () =>
              `计划销售:${10}亿\n\n 当前进度\n\n ${60}%\n\n 目前销售:${6}亿 `,
            fontSize: 14,
            fontFamily: "Lobster Two",
            color: "#000"
          }
        }
      ]
    };
    dailySales.setOption(dailySalesOption);
    turnoverYoy.setOption(turnoverYoyOption);
    historySaleroom.setOption(historySaleroomOption);
    riskManagement.setOption(riskManagementOption);
    // 水波纹图
    water.setOption(waterOption);

  },
  created () {
    let request = [this.handleListener, this.initData, this.getExchange, this.getNotifi, this.getDescri]
    Promise.all(request.map(item => item()));

  },
  activated () {
    this.handleListener();
  },
  deactivated () {
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    ...mapActions(['getExchange']),
    // 改变每页行数
    handleSizeChange (val) {
      this.queryNotifi.pageIndex = 1;
      this.queryNotifi.pageSize = val;
      this.getNotifi();
    },
    // 翻页处理
    goPage (val) {
      this.queryNotifi.pageIndex = val;
      this.getNotifi();
    },
    // 查询公告
    async getNotifi () {
      try {
        const { data } = await api.query(
          "/notification/published",
          this.queryNotifi
        );
        this.dataNotifi.notifilist = data.list;
        this.dataNotifi.total = data.count;
      } catch (e) {
        console.log(e);
      }
    },
    // 查询待办
    async getDescri () {
      try {
        const { data } = await api.query(
          "/todo/search", {});
        this.dataDescri.descri = data.list;
        this.dataDescri.total = data.count;
      } catch (e) {
        console.log(e);
      }
    },

    // 跳转公告详情
    handleJump (param) {
      console.log(param);
      this.$router.push({
        name: "NoticeDetails",
        query: {
          itemCode: param
        }
      });
    },
    viewprocess (param) {
      if (param.messageType == '1') {
        this.$notify.info({
          title: '待办',
          message: param.content,
        })
        return
      }
      this.item = param
      this.processVisible = true
      // this.$nextTick(()=>{
      // this.$refs.flowchart.init();
      // this.$refs.flowchart.down();// 绘制
      // this.$refs.flowchart.selectNode();//高亮
      // });
    },
    async initData () {
      let request = [api.getTodoList /* this.getExchang */];
      // let data = await Promise.all(request.map(callback => callback()).catch(err=>err));
    },
    handleListener () {
      bus.$on("collapse", this.handleBus);
      // 调用renderChart方法对图表进行重新渲染
    },
    handleBus (msg) {
      setTimeout(() => {
      }, 300);
    },
  }
};
</script>


<style scoped lang='less'>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
a:visited {
  color: #303133;
}
a:hover {
  color: #0099ff;
}
ul {
  list-style: none;
}
.index-background {
  background: #f5f7fa;
  padding: 10px;
  border-radius: 10px;
}
.wise-reminder {
  margin-bottom: 1rem;
}
.user-message {
  text-align: center;

  & > :first-child {
    margin: 0 auto;
    width: 60px;
    height: 60px;
    background-image: url(~@/assets/img/img.png);
    border-radius: 100%;
  }

  & > :not(:last-child) {
    margin-bottom: 7px;
  }
}

.set-height {
  height: 22px;
}
.space(@params: space-between) {
  justify-content: @params;
}

.item-space {
  .space();
}
.flex-content {
  .space(center);
}
.first-child-layout {
  .space();
  flex-wrap: nowrap;

  & > div {
    margin: 5px 5px;
  }

  & > div:nth-child(-n + 2) {
    .box-card {
      width: 25vw;
    }
  }

  & > div:nth-child(n + 3) {
    flex-grow: 1;
  }

  .box-card {
    box-sizing: border-box;
    height: 220px;
  }
}

/* 中间图形 */
.middle-chart {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  & > div {
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    height: 100%;
  }
}

.draw-circle(@color) {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: @color;
  border-radius: 50%;
  margin-right: 10px;
}

.draw-circle-blue {
  .draw-circle(#0099ff);
}

.draw-circle-green {
  .draw-circle(#00ff66);
}
.draw-circle-orange {
  .draw-circle(#ffda00);
}

.currency-fontColor {
  color: #6cb6e8;
}

.foot-pieChart {
  width: 100%;
  align-items: center;

  & > div {
    flex: 1;

    > div {
      //   width: 27.5vw;
      height: 40vh;
    }
  }
}
#dailySales,
#turnoverYoy,
#historySaleroom,
#water,
#riskManagement {
  padding: 3px;
  box-sizing: border-box;
  margin: 0 5px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  background: #fff;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.waterBox {
  position: relative;
  .footerText {
    width: 100%;
    height: 20px;
    text-align: center;
    position: absolute;
    bottom: 20px;
    span {
      padding-left: 20px;
      font-size: 14px;
      i {
        color: #00e37f;
        margin-right: 5px;
      }
    }
  }
}
.icon-trumpet {
  display: inline-block;
  width: 20px;
  height: 17px;
  background-image: url(~@/assets/img/icon_notice.png);
  background-repeat: no-repeat;
  // flex: 1;
  // margin-top: 2px;
  // & ~ div {
  //   flex: 12;
  //   justify-content: space-between;
  // }
}
</style>
<style>
/* // 流程弹窗 */
.viewdialog > .el-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  margin-top: 0 !important;
}
.viewdialog > .el-dialog > .el-dialog__header,
.viewdialog > .el-dialog > .el-dialog__body {
  padding: 0;
}
.viewdialog > .el-dialog > .el-dialog__header > .el-dialog__headerbtn {
  left: 20px;
  top: calc(100vh / 9 / 8);
  height: calc(100vh / 9 / 4);
  width: calc(100vh / 9 / 4);
  border-radius: 50%;
  background: #fff;
}
.viewdialog
  > .el-dialog
  > .el-dialog__header
  > .el-dialog__headerbtn
  .el-dialog__close {
  color: #409eff;
  margin-top: 1px;
}
.viewdialog > .el-dialog > .el-dialog__header > .el-dialog__headerbtn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ffffffbf;
}
.el-card__body {
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
}
.el-card__body > ul {
  overflow: scroll;
  flex: 1;
}
</style>

