<template>
  <div class="form-layout item-layout">
    <div class="transform-inline-block" @click="selfClick">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>季度销售额</h3>
        </div>
        <div id="myChart" :style="{width: '100%', height: '20vh'}"></div>
        <div>
          <el-table :data="tableData" height="250" style>
            <el-table-column prop="name" label width></el-table-column>
            <el-table-column prop="saleroom" label="2018年度销售额(亿)"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <div class="transform-inline-block">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>进、出口、纯物流销售额</h3>
        </div>
        <div id="myChart1" :style="{width: '100%', height: '20vh'}"></div>
        <div>
          <el-table :data="tableData1" height="250" style>
            <el-table-column prop="name" label></el-table-column>
            <el-table-column prop="saleroom" label="服装类"></el-table-column>
            <el-table-column prop="saleroom" label="电子类"></el-table-column>
            <el-table-column prop="saleroom" label="医药类"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <div class="transform-inline-block">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>销售同比(亿)</h3>
        </div>
        <div id="myChart2" :style="{width: '100%', height: '20vh'}"></div>
        <div>
          <el-table :data="tableData1" height="250" style>
            <el-table-column prop="name" label></el-table-column>
            <el-table-column prop="saleroom" label="今日销售"></el-table-column>
            <el-table-column prop="saleroom" label="昨日销售"></el-table-column>
            <el-table-column prop="saleroom" label="前日销售"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <div class="transform-inline-block">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>业务部日开发客户</h3>
        </div>
        <div id="myChart3" :style="{width: '100%', height: '20vh'}"></div>
        <div>
          <el-table :data="tableData3" height="250" style>
            <el-table-column prop="name" label="开发的客户数"></el-table-column>
            <el-table-column prop="saleroom" label="2019-3-4"></el-table-column>
            <el-table-column prop="saleroom" label="2019-3-5"></el-table-column>
            <el-table-column prop="saleroom" label="2019-3-6"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      tableData: [
        { name: "第一季度", saleroom: 4.6 },
        { name: "第二季度", saleroom: 4.8 },
        { name: "第三季度", saleroom: 2.1 },
        { name: "第四季度", saleroom: 1.334 }
      ],
      tableData1: [
        { name: "进口", saleroom: 4.6 },
        { name: "出口", saleroom: 4.8 },
        { name: "转口", saleroom: 2.1 },
        { name: "纯物流", saleroom: 1.334 }
      ],
      tableData3: [
        { name: "销售一部", saleroom: 4.6 },
        { name: "销售二部", saleroom: 4.8 },
        { name: "销售三部", saleroom: 2.1 },
        { name: "销售四部", saleroom: 1.334 }
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      
      let chartData = {
        /* title: {
          text: "",
          // subtext: "纯属虚构",
          x: "center"
        }, */
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /* legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        }, */
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let chart1Data = {
        /* title: {
          text: "",
          // subtext: "纯属虚构",
          x: "center"
        }, */
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /* legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        }, */
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let chart2Data = {
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      let chart3Data = {
        /* title: {
          text: "",
          subtext: "纯属虚构",
          x: "center"
        }, */
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /*  legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        }, */
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      // 绘制图表

      myChart.setOption(chartData);
      myChart1.setOption(chart1Data);
      myChart2.setOption(chart2Data);
      myChart3.setOption(chart3Data);
    },
    selfClick() {
    }
  }
};
</script>
<style scoped lang="less">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 20vw;
  height: 470px;
}
.transform-inline-block {
  display: inline-block;
  margin-top: 10px;
}
.item-layout {
  justify-content: space-around;
}
</style>
