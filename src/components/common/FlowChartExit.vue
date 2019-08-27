<template>
  <div class="viewprocess">
    <div class="title">供应链出口全景流程图</div>
    <div class="deptcon">
      <div class="box" style="flex: 2;">
        <img src="icon/nav_ye.png" class="img-icon">业务部
      </div>
      <div class="deptbox">
        <img src="icon/nav_control.png" class="img-icon">风控部
      </div>
      <div class="deptbox">
        <img src="icon/nav_business.png" class="img-icon">商务部
      </div>
      <div class="deptbox" style="flex: 2;">
        <img src="icon/nav_finance.png" class="img-icon">财务部
      </div>
      <div class="deptbox">
        <img src="icon/nav_shen.png" class="img-icon">深圳仓储
      </div>
      <div class="deptbox">
        <img src="icon/nav_customs.png" class="img-icon">关务部
      </div>
      <div class="deptbox">
        <img src="icon/nav_xiang.png" class="img-icon">香港仓储
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
import api from "@/assets/js/appHelper";
export default {
  name: "flow-chart",
  props: {
    process: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: {},
      graph: "",
      timer: null,
      select: {
        list:'',
        vnode: "",
        vedge:"",
        flog: '',
        path:'',
        query:'',
      },
    };
  },
  components: {},
  created() {
    this.$nextTick(()=>{
      this.init();// 初始化g6
      this.down();// 绘制
      this.selectNode();//高亮
    });
    
  },
	watch: {
		visible(val) {
      if(val){(this.down(),this.selectNode())}
		}
	},
  mounted() {
    window.onresize = () => {(this.down(),this.selectNode())}
  },
  distroyed() {
    clearInterval(this.timer);
  },
  computed: {},
  methods: {
    // 格子
    minW(){
      return window.innerWidth / 9
    },
    minH(){
      return window.innerHeight / 9.2
    },
    // 节点
    w() {
      return this.minW() * 0.6;
    },
    h() {
      return this.minH() * 0.6;
    },
    // 线条
    getX(i) {
      return (i - 0.5) * this.minW();
    },
    getY(i) {
      return (i - 0.5) * this.minH();
    },
    // 初始化
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

      // 节点
      this.graph.node({
        shape: "fillet"
      });
      // 边
      this.graph.edge({
        endArrow: true,
        color(model) {
          if(model.type == '2'){
            return "#409EFF"
          }else if(model.type == '3'){
            return "#46D4ba"
          }else{
            "#e6edf8"
          }
        },
        size: 3
      });
      // 鼠标点击
      this.graph.on("node:click", ev => {
        if (ev.shape.id == this.select.vnode) {
          this.$router.push({
            path: this.select.path,
            query: { mun: this.select.query }
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
            x: this.getX(1),
            y: this.getY(1),
            label: "开始"
          },
          {
            id: "SJGL",
            x: this.getX(1),
            y: this.getY(2),
            label: "商机管理"
          },
          {
            id: "WTFX",
            x: this.getX(1),
            y: this.getY(3),
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
            id: "CGDD",
            x: this.getX(4),
            y: this.getY(2),
            label: "采购订单"
          },
          {
            id: "MJFH",
            x: this.getX(4),
            y: this.getY(2.66),
            label: "卖方\n交发货"
          },
          {
            id: "MJTH",
            x: this.getX(4),
            y: this.getY(3.33),
            label: "买方\n接提货"
          },
          {
            id: "XSDD",
            x: this.getX(4),
            y: this.getY(5),
            label: "销售订单"
          },
          {
            // 第五列
            id: "WTFK",
            x: this.getX(5),
            y: this.getY(1),
            label: "委托\n付款单"
          },
          {
            id: "QTXX",
            x: this.getX(5),
            y: this.getY(1.66),
            label: "其他\n计费单"
          },
          {
            id: "YSJS",
            x: this.getX(5),
            y: this.getY(4),
            label: "应收\n结算单"
          },
          {
            id: "SKDX",
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
            id: "ZWHX",
            x: this.getX(5),
            y: this.getY(8),
            label: "账务\n核销单"
          },
          {
            // 第六列
            id: "FKSQ",
            x: this.getX(6),
            y: this.getY(1),
            label: "付款\n申请单"
          },
          {
            id: "FKDX",
            x: this.getX(6),
            y: this.getY(2),
            label: "付款单"
          },
          {
            id: "YFJS",
            x: this.getX(6),
            y: this.getY(3),
            label: "应付\n结算单"
          },
          {
            id: "JSDX",
            x: this.getX(6),
            y: this.getY(4.5),
            label: "出口\n结算单"
          },
          {
            id: "FPQS",
            x: this.getX(6),
            y: this.getY(6),
            label: "发票"
          },
          {
            id: "PZXX",
            x: this.getX(6),
            y: this.getY(7),
            label: "凭证"
          },
          {
            //第七列
            id: "JZSH",
            x: this.getX(7),
            y: this.getY(1),
            label: "深圳\n收货登记"
          },
          {
            id: "SZSH",
            x: this.getX(7),
            y: this.getY(2),
            label: "深圳\n收货单"
          },
          {
            id: "SZRK",
            x: this.getX(7),
            y: this.getY(3),
            label: "深圳\n入库单"
          },
          {
            id: "SHJH",
            x: this.getX(7),
            y: this.getY(4),
            label: "上货计划"
          },
          {
            id: "SZCK",
            x: this.getX(7),
            y: this.getY(5),
            label: "深圳\n出库单"
          },
          {
            // 第八列
            id: "BGJH",
            x: this.getX(8),
            y: this.getY(1),
            label: "报关计划"
          },
          // {
          //   id: "DBGB",
          //   x: this.getX(8),
          //   y: this.getY(2),
          //   label: "待报关\n列表"
          // },
          {
            id: "BGXX",
            x: this.getX(8),
            y: this.getY(3),
            label: "报关单"
          },
          // {
          //   // 第九列
          //   id: "HKSH",
          //   x: this.getX(9),
          //   y: this.getY(1),
          //   label: "香港\n收货单"
          // },
          {
            id: "HKRK",
            x: this.getX(9),
            y: this.getY(1),
            label: "香港收货\n入库单"
          },
          {
            id: "HKFH",
            x: this.getX(9),
            y: this.getY(3),
            label: "发货\n通知单"
          },
          {
            id: "HKDD",
            x: this.getX(9),
            y: this.getY(4),
            label: "调度单"
          },
          {
            id: "HKCK",
            x: this.getX(9),
            y: this.getY(5),
            label: "香港\n出库单"
          },
          {
            id: "node99",
            sp: "ellipse",
            x: this.getX(9),
            y: this.getY(6),
            label: "结束"
          }                      
        ],
        edges: [
          {
            id: "edge1",
            source: "KS",
            target: "SJGL"
          },
          {
            id: "edge2",
            source: "SJGL",
            target: "WTFX"
          },
          {
            id: "edge3",
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
            target: "WTFK",
            label: {
              text: "垫资"
            }
          },
          {
            id: "edge10",
            source: "WTFK",
            target: "FKSQ"
          },
          {
            id: "edge11",
            source: "FKSQ",
            target: "FKDX"
          },
          {
            id: "edge12",
            source: "FKDX",
            target: "YFJS"
          },
          {
            id: "edge13",
            source: "WTDD",
            target: "CGDD"
          },
          {
            id: "edge14",
            source: "MJFH",
            target: "JZSH",
            controlPoints: [
              {
                x: this.getX(5.5),
                y: this.getY(2.66)
              },
              {
                x: this.getX(5.5),
                y: this.getY(3.7)
              },
              {
                x: this.getX(6.6),
                y: this.getY(3.7)
              },
              {
                x: this.getX(6.6),
                y: this.getY(1)
              }
            ]
          },
          {
            id: "edge15",
            source: "JZSH",
            target: "SZSH"
          },
          {
            id: "edge16",
            source: "SZSH",
            target: "SZRK"
          },
          {
            id: "edge17",
            source: "SZRK",
            target: "SHJH"
          },
          {
            id: "edge18",
            source: "SHJH",
            target: "BGJH",
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
            source: "BGJH",
            target: "BGXX"
          },
          // {
          //   id: "edge20",
          //   source: "DBGB",
          //   target: "BGXX"
          // },
          {
            id: "edge21",
            source: "SHJH",
            target: "SZCK"
          },
          {
            id: "edge23",
            source: "SZCK",
            target: "HKRK",
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
          // {
          //   id: "edge24",
          //   source: "HKSH",
          //   target: "HKRK"
          // },
          {
            id: "edge101",
            source: "JSDX",
            target: "YSJS",
            controlPoints: [
              {
                x: this.getX(5.4),
                y: this.getY(4.5)
              },
              {
                x: this.getX(5.4),
                y: this.getY(4)
              }
            ]
          },
          {
            id: "edge25",
            source: "HKRK",
            target: "JSDX",
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
                x: this.getX(6),
                y: this.getY(5.5)
              }
            ]
          },
          {
            id: "edge102",
            source: "JSDX",
            target: "YFJS"
          },
          {
            id: "edge26",
            source: "YSJS",
            target: "SKDX"
          },
          {
            id: "edge27",
            source: "SKDX",
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
            target: "YSJS",
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
            target: "ZWHX"
          },
          {
            id: "edge31",
            source: "ZWHX",
            target: "FPQS",
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
            source: "FPQS",
            target: "PZXX"
          },
          {
            id: "edge33",
            source: "HKRK",
            target: "HKFH"
          },
          {
            id: "edge100",
            source: "MJTH",
            target: "XSDD"
          },
          {
            id: "edge34",
            source: "XSDD",
            target: "HKFH",
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
            source: "HKFH",
            target: "DDDX"
          },
          {
            id: "edge36",
            source: "DDDX",
            target: "HKCK"
          },
          {
            id: "edge37",
            source: "HKCK",
            target: "node99"
          }
        ]
      };
      this.graph.read(this.data);
    },
    selectNode() {
      // 流程
      api.getTodo(this.process.itemCode).then((res)=>{
        if(res.status == '200'){
          this.select.list = res.data.nodes
          // 已近走过的节点
          this.graph.update('KS', {
            type: "2"
          })
          this.select.list.forEach((e, i) => {
            this.graph.update(e.nodeCode, {
              type: "2"
            })
          })
          // 已经走过的线条
          this.graph.update('edge1', {
            type: "2"
          })
          this.data.edges.forEach((item, index) => {
            this.select.list.forEach((e, i) => {
              if(this.select.list.length > i+1){
                if(item.source == e.nodeCode && item.target == this.select.list[i+1].nodeCode){
                  this.graph.update(item.id, {
                    type: "2"
                  })
                }
              }
            });
          });
          // 点击事件
          this.select.path = '/'+this.select.list[this.select.list.length-1].menuCode //路由
          this.select.query = this.select.list[this.select.list.length-1].nodeKeyValue //参数
          console.log(this.select)
          // let obj = JSON.parse(this.select.list[this.select.list.length-1].searchParam)
          // if(obj){
          //   this.select.query = obj[Object.keys(obj)[0]]// 参数
          // }
          //  闪动
          this.select.vnode = this.select.list[this.select.list.length-1].nodeCode //活动节点
          this.data.edges.forEach((item, index) => { //活动线条
            if(item.target == this.select.list[this.select.list.length-1].bizCode){
              this.select.vedge = item.id
            }
          });
          var self = this;
          if(this.timer){
            window.clearInterval(this.timer)
          }
          this.timer = setInterval(() => {
            if (!self.select.flog) {
              self.select.flog = 1;
            }
            if (self.select.flog == 1) {
              self.graph.update(self.select.vnode, {
                type: "3"
              });
              self.graph.update(self.select.vedge, {
                type: "2"
              });
              self.select.flog = 2;
            } else {
              self.graph.update(self.select.vnode, {
                type: "2"
              });
              self.graph.update(self.select.vedge, {
                type: "3"
              });
              self.select.flog = 1;
            }
          }, 500);
          // end
        }
      })
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
.deptcon {
  display: flex;
  width: 100%;
  height: calc(100vh / 9 / 2);
  line-height: calc(100vh / 9 / 2);
  background-color: #409eff;
}
.deptbox {
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
  overflow: hidden;
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
