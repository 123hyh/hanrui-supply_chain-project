/* 老板报表 */
<template>
  <div class="form-layout">
    <div>
      <div id="YOYT" :style="{height: '500px'}"></div>
      <div id="saleroomTable"></div>
    </div>
    <div>
      <div id="riskManagement"></div>
      <div id="salesHistory"></div>
      <div id="marketingPlan"></div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    /* lineChartData,
    pieChartData */
  }),
  mounted() {
    try {
      this.drawYOYT();
      this.drawSaleroomTable();
      this.drawRiskManagement();
      this.drawSalesHistory();
      this.drawMarketingPlan();
    } catch (error) {
      console.log(error);
    }
    
  },
  components:{
  },
  methods: {
    // 营业额图
    drawYOYT() {
      this.draw("YOYT", {
        title: {
          text: "营业额同比",
          x: 'center'
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["2017", "2018"],
          bottom:10,
          itemGap: 50,
          icon: 'circle'
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2017",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "2018",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 销售额图
    drawSaleroomTable() {
      this.draw("saleroomTable", {
        title: {
          text: "销售额表(亿)",
          x: 'center'
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["进口", "出口", "其他"],
          icon: 'circle',
          bottom: 10,
          itemGap:30,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "9%",
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "进口",
            type: "line",
            data: [30, 60, 30, 50, 180, 160, 5]
          },
          {
            name: "出口",
            type: "line",
            data: [50, 30, 360, 234, 290, 330, 310]
          },
          {
            name: "其他",
            type: "line",
            data: [150, 232, 201, 60, 190, 330, 410]
          }
        ]
      });
    },
    //	风控图
    drawRiskManagement() {
      this.draw("riskManagement", {
        title: {
          text: "风控数据图标",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          data: ["HFY对客户B的授信额度(亿)", "客户B已用额度(亿)", "客户B剩余额度(亿)"],
          icon: 'circle',
          bottom:0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "HFY对客户B的授信额度(亿)" },
              { value: 950, name: "客户B已用额度(亿)" },
              { value: 234, name: "客户B剩余额度(亿)" },
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
      });
    },
    // 历史销售图
    drawSalesHistory() {
      this.draw("salesHistory", {
        title: {
          text: "前一天最高销售额/历史最高销售额(亿)",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          // left: "left",
          data: ["前一天最高销售额(亿)", "历史最高销售额(亿)"],
          icon: 'circle', // 设置图例为圆形
          bottom: 0
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "前一天最高销售额(亿)" },
              { value: 310, name: "历史最高销售额(亿)" },
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
      });
    },
    // 销售计划
    drawMarketingPlan() {
      this.draw("marketingPlan",{
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          // left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          icon: 'circle',
          bottom:0
        },
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
      });
    },
    draw(id, option) {
      let chart = this.$echarts.init(document.getElementById(id));
      chart.setOption(option);
    }
  }
};
</script>
<style scoped lang="less">
.flex-layout() {
  display: flex;
  flex-wrap: wrap;
}
.form-layout {
  > div:first-child {
    .flex-layout();
    width: 100%;
    > div {
      flex: 1;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 340px;
    .flex-layout();
    & > div {
      flex: 1;
    }
  }
}
</style>
