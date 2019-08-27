<template>
  <div class="viewprocess">
    <div class="title">供应链进口全景流程图</div>
    <div class="deptbox">
      <div class="box" style="flex: 2;">
        <img src="icon/nav_ye.png" class="img-icon">业务部
      </div>
      <div class="box">
        <img src="icon/nav_control.png" class="img-icon">风控部
      </div>
      <div class="box">
        <img src="icon/nav_business.png" class="img-icon">商务部
      </div>
      <div class="box" style="flex: 2;">
        <img src="icon/nav_finance.png" class="img-icon">财务部
      </div>
      <div class="box">
        <img src="icon/nav_xiang.png" class="img-icon">香港仓储
      </div>
      <div class="box">
        <img src="icon/nav_customs.png" class="img-icon">关务部
      </div>
      <div class="box">
        <img src="icon/nav_shen.png" class="img-icon">深圳仓储
      </div>
    </div>
    <div class="content">
      <div class="line" style="left: calc(100%/9*2);"></div>
      <div class="line" style="left: calc(100%/9*3);"></div>
      <div class="line" style="left: calc(100%/9*4);"></div>
      <div class="line" style="left: calc(100%/9*6);"></div>
      <div class="line" style="left: calc(100%/9*7);"></div>
      <div class="line" style="left: calc(100%/9*8);"></div>
      <!-- 创建图容器 -->
      <div id="canvasContent"></div>
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "flow-chart",
  data() {
    return {
      data: {},
      graph: "",
      timer: null,
      select: {
        vnode: "WTPG",
        vedge: "edge3",
        flog: 1
      }
    };
  },
  components: {},
  created() {
    this.$nextTick(function() {
      this.init();
      this.down();
      this.selectNode();
    });
  },
  mounted() {
    var _this = this;
    window.onresize = function() {
      _this.down();
    };
  },
  distroyed() {
    clearInterval(this.timer);
  },
  computed: {},
  methods: {
    w() {
      return (window.innerWidth / 9) * 0.6;
    },
    h() {
      return (window.innerHeight / 9) * 0.6;
    },
    getX(i) {
      var base = window.innerWidth / 9;
      return (i - 0.5) * base;
    },
    getY(i) {
      var base = window.innerHeight / 9;
      return (i - 0.5) * base;
    },
    init() {
      var self = this;
      // 初始化
      this.graph = new G6.Graph({
        container: "canvasContent",
        defaultIntersectBox: "rect"
      });
      // 全局属性
      G6.Global.labelStyle = {
        fill: "#ff5942",
        textAlign: "center",
        textBaseline: "middle",
        fontSize: 14
      };
      // 节点
      G6.registerNode("fillet", {
        draw(item) {
          const group = item.getGraphicGroup();
          const model = item.getModel();
          // 默认颜色
          var bgcolor = "#e6edf8";
          var textcolor = "#00205c";
          // 已完成
          if (model.type == "2") {
            bgcolor = "#409EFF";
            textcolor = "white";
          }
          // 闪烁
          if (model.type == "3") {
            bgcolor = "#46D4ba";
            textcolor = "white";
          }
          if (model.color != null) {
            bgcolor = model.color;
          }
          // 如果是椭圆
          if (model.sp == "ellipse") {
            group.addShape("rect", {
              attrs: {
                x: 0 - self.w() / 2,
                y: 0 - self.h() / 2,
                width: self.w(),
                height: self.h(),
                radius: self.h() / 2,
                fill: bgcolor
              }
            });
            group.addShape("text", {
              attrs: {
                x: 0,
                y: 0,
                textBaseline: "middle",
                textAlign: "center",
                fill: textcolor,
                text: model.label,
                fontSize: 16
              }
            });
            return group.addShape("rect", {
              attrs: {
                x: 0 - self.w() / 2 - 6,
                y: 0 - self.h() / 2 - 6,
                width: self.w() + 12,
                height: self.h() + 12,
                radius: self.h() / 2
              }
            });
          } else {
            group.addShape("rect", {
              attrs: {
                x: 0 - self.w() / 2,
                y: 0 - self.h() / 2,
                width: self.w(),
                height: self.h(),
                radius: 4,
                fill: bgcolor
              }
            });
            group.addShape("text", {
              attrs: {
                x: 0,
                y: 0,
                textBaseline: "middle",
                textAlign: "center",
                fill: textcolor,
                text: model.label,
                fontSize: 16
              }
            });
            return group.addShape("rect", {
              attrs: {
                x: 0 - self.w() / 2 - 6,
                y: 0 - self.h() / 2 - 6,
                width: self.w() + 12,
                height: self.h() + 12,
                radius: 4
              }
            });
          }
        }
      });

      //箭头边
      G6.registerEdge("customEdge", {
        // 绘制
        draw(item) {
          const group = item.getGraphicGroup();
          const path = this.getPath(item);
          const model = item.getModel();
          var color = "#c8d6f2";
          var textcolor = "#00205c";
          if (item.model.type == 2) {
            color = "#409eff";
          }
          return group.addShape("path", {
            attrs: {
              path,
              stroke: color,
              lineWidth: 2
            }
          });
        },
        getPath(item) {
          const points = item.getPoints();
          return G6.Util.pointsToPolygon(points);
        },
        // 终止箭头
        endArrow: {
          path(item) {
            const keyShape = item.getKeyShape();
            let lineWidth = keyShape.attr("lineWidth");
            lineWidth = lineWidth > 3 ? lineWidth : 3;
            const width = (lineWidth * 10) / 3;
            const halfHeight = (lineWidth * 4) / 3;
            const radius = lineWidth * 4;
            return [
              ["M", -width, halfHeight],
              ["L", 0, 0],
              ["L", -width, -halfHeight],
              ["A", radius, radius, 0, 0, 1, -width, halfHeight],
              ["Z"]
            ];
          },
          style(item) {
            const keyShape = item.getKeyShape();
            const { strokeOpacity, stroke } = keyShape.attr();
            return {
              fill: stroke
            };
          }
        }
      });
      // 节点
      this.graph.node({
        shape: "fillet"
      });
      // 边
      this.graph.edge({
        // shape: "customEdge",
        endArrow: true,
        // color: "#cbd6f2",
        color(model) {
          if(model.type == '2'){
            return "#409eff"
          }else if(model.type == '3'){
            return "#666666"
          }else{
            "#cbd6f2"
          }
        },
        size: 3
      });
      // 鼠标点击
      this.graph.on("node:click", ev => {
        if (ev.item.model.sel) {
          this.$router.push({
            path: ev.item.model.sel.go,
            query: { mun: ev.item.model.sel.mun }
          });
        }
      });
    },
    down() {
      this.data = {
        nodes: [
          {
            id: "KS",
            sp: "ellipse",
            type: "2",
            x: this.getX(1),
            y: this.getY(1),
            label: "开始"
          },
          {
            id: "SJGL",
            type: "2",
            x: this.getX(1),
            y: this.getY(2),
            sel: { go: "M0202", mun: "SJGL2019040900011" },
            label: "商机管理"
          },
          {
            id: "WTFX",
            type: "2",
            x: this.getX(1),
            y: this.getY(3),
            sel: { go: "M0204", mun: "WTFX2019040900072" },
            label: "委托方"
          },
          {
            id: "XXGL",
            x: this.getX(1),
            y: this.getY(4),
            label: "协议管理"
          },
          {
            id: "GYJC",
            x: this.getX(1),
            y: this.getY(5),
            label: "供应商"
          },
          {
            id: "KHXX",
            x: this.getX(1),
            y: this.getY(5.66),
            label: "客户"
          },
          {
            id: "CYSJ",
            x: this.getX(1),
            y: this.getY(6.33),
            label: "承运商"
          },
          {
            id: "WTPG", //第二列
            type: "3",
            x: this.getX(2),
            y: this.getY(3),
            label: "委托方\n评估"
          },
          {
            id: "DBGL", //第三列
            x: this.getX(3),
            y: this.getY(1),
            label: "担保管理"
          },
          {
            id: "RZBZ",
            x: this.getX(3),
            y: this.getY(1.66),
            label: "保证金(押\n金)管理"
          },
          {
            id: "RZWB",
            x: this.getX(3),
            y: this.getY(2.33),
            label: "无担保\n授信"
          },
          {
            id: "RZDY",
            x: this.getX(3),
            y: this.getY(3),
            label: "抵(质)押物\n管理"
          },
          {
            id: "RZSX",
            x: this.getX(3),
            y: this.getY(4),
            label: "融资授信"
          },
          {
            // 第四列
            id: "WTDD",
            x: this.getX(4),
            y: this.getY(1),
            label: "委托单"
          },
          {
            id: "node42",
            x: this.getX(4),
            y: this.getY(2),
            label: "采购订单"
          },
          {
            id: "node43",
            x: this.getX(4),
            y: this.getY(2.66),
            label: "卖方\n交发货"
          },
          {
            id: "node44",
            x: this.getX(4),
            y: this.getY(3.33),
            label: "买方\n接提货"
          },
          {
            // 第五列
            id: "node51",
            x: this.getX(5),
            y: this.getY(1),
            label: "委托\n付款单"
          },
          {
            id: "node52",
            x: this.getX(5),
            y: this.getY(1.66),
            label: "其他\n计费单"
          },
          {
            id: "node53",
            x: this.getX(5),
            y: this.getY(4),
            label: "应收\n结算单"
          },
          {
            id: "node54",
            x: this.getX(5),
            y: this.getY(5),
            label: "收款单"
          },
          {
            id: "node55",
            x: this.getX(5),
            y: this.getY(6),
            label: "认款单"
          },
          {
            id: "node56",
            x: this.getX(5),
            y: this.getY(7),
            label: "认款后逾\n期利息表"
          },
          {
            id: "node57",
            x: this.getX(5),
            y: this.getY(8),
            label: "账务\n核销单"
          },
          {
            // 第六列
            id: "node61",
            x: this.getX(6),
            y: this.getY(1),
            label: "付款\n申请单"
          },
          {
            id: "node62",
            x: this.getX(6),
            y: this.getY(2),
            label: "付款单"
          },
          {
            id: "node63",
            x: this.getX(6),
            y: this.getY(3),
            label: "应付\n结算单"
          },
          {
            id: "node64",
            x: this.getX(6),
            y: this.getY(6),
            label: "发票"
          },
          {
            id: "node65",
            x: this.getX(6),
            y: this.getY(7),
            label: "凭证"
          },
          {
            //第七列
            id: "node71",
            x: this.getX(7),
            y: this.getY(1),
            label: "香港\n收货登记"
          },
          {
            id: "node72",
            x: this.getX(7),
            y: this.getY(2),
            label: "香港\n收货单"
          },
          {
            id: "node73",
            x: this.getX(7),
            y: this.getY(3),
            label: "香港\n入库单"
          },
          {
            id: "node74",
            x: this.getX(7),
            y: this.getY(4),
            label: "上货计划"
          },
          {
            id: "node75",
            x: this.getX(7),
            y: this.getY(5),
            label: "香港\n出库单"
          },
          {
            // 第八列
            id: "node81",
            x: this.getX(8),
            y: this.getY(1),
            label: "报关计划"
          },
          {
            id: "node82",
            x: this.getX(8),
            y: this.getY(2),
            label: "待报关\n列表"
          },
          {
            id: "node83",
            x: this.getX(8),
            y: this.getY(3),
            label: "报关单"
          },
          {
            // 第九列
            id: "node91",
            x: this.getX(9),
            y: this.getY(1),
            label: "深圳\n收货单"
          },
          {
            id: "node92",
            x: this.getX(9),
            y: this.getY(2),
            label: "深圳\n入库单"
          },
          {
            id: "node93",
            x: this.getX(9),
            y: this.getY(3),
            label: "发货\n通知单"
          },
          {
            id: "node94",
            x: this.getX(9),
            y: this.getY(4),
            label: "配送车次"
          },
          {
            id: "node95",
            x: this.getX(9),
            y: this.getY(4.66),
            label: "集中\n调度单"
          },
          {
            id: "node96",
            x: this.getX(9),
            y: this.getY(5.33),
            label: "调度单"
          },
          {
            id: "node97",
            x: this.getX(9),
            y: this.getY(6),
            label: "发运单"
          },
          {
            id: "node98",
            x: this.getX(9),
            y: this.getY(7),
            label: "深圳\n出库单"
          },
          {
            id: "node99",
            sp: "ellipse",
            x: this.getX(9),
            y: this.getY(8),
            label: "结束"
          }
        ],
        edges: [
          {
            id: "edge1",
            type: "2",
            source: "KS",
            target: "SJGL"
          },
          {
            id: "edge2",
            type: "2",
            source: "SJGL",
            target: "WTFX"
          },
          {
            id: "edge3",
            type: "3",
            source: "WTFX",
            target: "WTPG",
            label: {
              text: "垫资"
            }
          },
          {
            id: "edge4",
            source: "WTPG",
            target: "RZSX",
            controlPoints: [
              {
                x: this.getX(2.6),
                y: this.getY(3)
              },
              {
                x: this.getX(2.6),
                y: this.getY(4)
              }
            ]
          },
          {
            id: "edge5",
            source: "RZDY",
            target: "RZSX"
          },
          {
            id: "edge6",
            source: "WTFX",
            target: "XXGL"
          },
          {
            id: "edge7",
            source: "XXGL",
            target: "GYJC"
          },
          {
            id: "edge8",
            source: "KHXX",
            target: "WTDD",
            controlPoints: [
              {
                x: this.getX(3.4),
                y: this.getY(5.66)
              },
              {
                x: this.getX(3.4),
                y: this.getY(1)
              }
            ]
          },
          {
            id: "edge9",
            source: "WTDD",
            target: "node51",
            label: {
              text: "垫资"
            }
          },
          {
            id: "edge10",
            source: "node51",
            target: "node61"
          },
          {
            id: "edge11",
            source: "node61",
            target: "node62"
          },
          {
            id: "edge12",
            source: "node62",
            target: "node63"
          },
          {
            id: "edge13",
            source: "WTDD",
            target: "node42"
          },
          {
            id: "edge14",
            source: "node43",
            target: "node71",
            controlPoints: [
              {
                x: this.getX(5.5),
                y: this.getY(2.66)
              },
              {
                x: this.getX(5.5),
                y: this.getY(3.5)
              },
              {
                x: this.getX(6.6),
                y: this.getY(3.5)
              },
              {
                x: this.getX(6.6),
                y: this.getY(1)
              }
            ]
          },
          {
            id: "edge15",
            source: "node71",
            target: "node72"
          },
          {
            id: "edge16",
            source: "node72",
            target: "node73"
          },
          {
            id: "edge17",
            source: "node73",
            target: "node74"
          },
          {
            id: "edge18",
            source: "node74",
            target: "node81",
            controlPoints: [
              {
                x: this.getX(7.6),
                y: this.getY(4)
              },
              {
                x: this.getX(7.6),
                y: this.getY(1)
              }
            ]
          },
          {
            id: "edge19",
            source: "node81",
            target: "node82"
          },
          {
            id: "edge20",
            source: "node82",
            target: "node83"
          },
          {
            id: "edge21",
            source: "node74",
            target: "node75"
          },
          {
            id: "edge23",
            source: "node75",
            target: "node91",
            controlPoints: [
              {
                x: this.getX(8.4),
                y: this.getY(5)
              },
              {
                x: this.getX(8.4),
                y: this.getY(1)
              }
            ]
          },
          {
            id: "edge24",
            source: "node91",
            target: "node92"
          },
          {
            id: "edge25",
            source: "node92",
            target: "node53",
            controlPoints: [
              {
                x: this.getX(8.5),
                y: this.getY(2)
              },
              {
                x: this.getX(8.5),
                y: this.getY(5.5)
              },
              {
                x: this.getX(5.4),
                y: this.getY(5.5)
              },
              {
                x: this.getX(5.4),
                y: this.getY(4)
              }
            ]
          },
          {
            id: "edge26",
            source: "node53",
            target: "node54"
          },
          {
            id: "edge27",
            source: "node54",
            target: "node55"
          },
          {
            id: "edge28",
            source: "node55",
            target: "node56"
          },
          {
            id: "edge29",
            source: "node56",
            target: "node53",
            controlPoints: [
              {
                x: this.getX(4.6),
                y: this.getY(7)
              },
              {
                x: this.getX(4.6),
                y: this.getY(4)
              }
            ]
          },
          {
            id: "edge30",
            source: "node56",
            target: "node57"
          },
          {
            id: "edge31",
            source: "node57",
            target: "node64",
            controlPoints: [
              {
                x: this.getX(5.5),
                y: this.getY(8)
              },
              {
                x: this.getX(5.5),
                y: this.getY(6)
              }
            ]
          },
          {
            id: "edge32",
            source: "node64",
            target: "node65"
          },
          {
            id: "edge33",
            source: "node92",
            target: "node93"
          },
          {
            id: "edge34",
            source: "node44",
            target: "node93",
            controlPoints: [
              {
                x: this.getX(4),
                y: this.getY(8.4)
              },
              {
                x: this.getX(8.6),
                y: this.getY(8.4)
              },
              {
                x: this.getX(8.6),
                y: this.getY(3)
              }
            ]
          },
          {
            id: "edge35",
            source: "node93",
            target: "node94"
          },
          {
            id: "edge36",
            source: "node97",
            target: "node98"
          },
          {
            id: "edge37",
            source: "node98",
            target: "node99"
          }
        ]
      };
      this.graph.read(this.data);
    },
    selectNode() {
      var self = this;
      this.timer = setInterval(() => {
        if (!self.select.flog) {
          return;
        }
        if (self.select.flog == 1) {
          self.graph.update(self.select.vnode, {
            type: "2"
          });
					self.graph.update(self.select.vedge, {
						type: "2"
					});
          self.select.flog = 2;
        } else {
          self.graph.update(self.select.vnode, {
            type: "3"
          });
					self.graph.update(self.select.vedge, {
						type: "3"
					});
          self.select.flog = 1;
        }
      }, 500);
    }
  }
};
</script>
<style scoped>
.viewprocess {
  width: 100vw;
  height: 100vh;
  font-size: 18px;
  color: white;
  text-align: center;
}
.title {
  width: 100%;
  height: calc(100vh / 9 / 2);
  line-height: calc(100vh / 9 / 2);
  background-color: rgb(111, 156, 157);
}
.deptbox {
  display: flex;
  width: 100%;
  height: calc(100vh / 9 / 2);
  line-height: calc(100vh / 9 / 2);
  background-color: #409eff;
}
.box {
  flex: 1;
}
.img-icon {
  vertical-align: sub;
  margin-right: 12px;
}
.content {
  width: 100%;
  height: calc(100vh / 9 * 8.5);
  line-height: calc(100vh / 9 * 8.5);
  margin: 0;
  padding: 0;
  margin-top: calc(-100vh / 9 * 0.5);
  padding-top: calc(100vh / 9 * 0.5);
  position: relative;
}
.line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 0px;
  height: 100%;
  color: #a9a9a9;
  z-index: 12;
  border-left: 1px solid #bfbfbf;
}

#canvasContent {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
