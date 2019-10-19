<template>
  <div class="index-exchange">
    <span @click.stop="showChart = !showChart" class="toggle">{{text}}</span>
    <!-- 列表 -->
    <el-card class="box-card" shadow="never">
      <div class="wise-reminder">
        <i class="draw-circle-orange"></i>
        <span>{{ `${exchangeRateTime}外汇牌价`}}</span>
      </div>
      <ul>
        <li :key="i" class="text item form-layout item-space" v-for="(item,i) in exchangeRateList">
          <div>
            <span>{{item}}</span>
          </div>
        </li>
      </ul>
    </el-card>
    <div :style="{'z-index': showChart ? 1000:-1000}" class="charts" id="myChart2"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import api from '@/assets/js/appHelper.js'
export default {
  data: _ => ({
    showChart: false
  }),
  computed: {
    ...mapGetters(['exchangeRate', 'userInfo']),
    text() {
      return this.showChart ? '汇率' : '走势'
    },
    exchangeRateTime() {
      var data = this.exchangeRate.length
        ? this.exchangeRate
        : [{ releasedate: '' }]
      return data[0].releasedate.slice(0, 11) || ''
    },
    exchangeRateList() {
      return this.exchangeRate.reduce((pre, cur, i) => {
        pre = [
          ...pre,
          `1 ${
            cur['currency'] == '澳大利亚元' ? '澳元' : cur['currency']
          } = ${+cur['cenPrice']} 人民币`
        ]
        return pre
      }, [])
    }
  },
  methods: {
    async drawCharts() {
      try {
        const {
          data: { list }
        } = await api.getExchangerate({
          pageIndex: 1,
          pageSize: 10,
          source: 'system',
         /*  timeFrom: '2019-10-15 00:00:00',
          timeTo: '2019-10-17 00:00:00' */
        })
        // 图标渲染数据
        let chartsData = {
          date: [],
          us: [], // 美元
          hk: [], // 港币
          euro: [], // 欧元
          pound: [], // 英镑
          yen: [] // 日元
        }
        // 取值放位置
        let fn = (type, item) => {
          chartsData[type].push(+item.cenPrice)
        }
        let handleObj = {
          美元: _ => fn('us', _),
          港币: _ => fn('hk', _),
          欧元: _ => fn('euro', _),
          英镑: _ => fn('pound', _),
          日元: _ => fn('yen', _)
        }
        // 处理 图标数据
        for (let { date, rate = [] } of list) {
          var d = new Date(date)
          chartsData.date.push(`${d.getMonth() + 1}.${d.getDate()}`)
          for (let item of rate) {
            handleObj[item.currency] && handleObj[item.currency](item)
          }
        }
        
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'))

        let chart2Data = {
          color: ['#3CE99D', '#FFBD00', '#497FFF', '#909399', '#F56C6C'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['美元', '港币', '欧元', '英镑', '日元'],
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 10
            },
            bottom: 0
          },
          grid: {
            height: '80%',
            left: '2%',
            right: '3%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartsData.date.reverse()
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '美元',
              type: 'line',
              data: chartsData.us.reverse(),
              smooth: true
            },
            {
              name: '港币',
              type: 'line',
              data: chartsData.hk.reverse(),
              smooth: true
            },
            {
              name: '欧元',
              type: 'line',
              data: chartsData.euro.reverse(),
              smooth: true
            },
            {
              name: '英镑',
              type: 'line',
              data: chartsData.pound.reverse(),
              smooth: true
            },
            {
              name: '日元',
              type: 'line',
              data: chartsData.yen.reverse(),
              smooth: true
            }
          ]
        }
        myChart2.setOption(chart2Data)
      } catch (error) {
        console.log(error)
        this.$message.error('汇率走势图获取数据失败！')
      }
    }
  },
  mounted() {
    this.drawCharts()
  }
}
</script>
<style lang="less">
.index-exchange {
  flex-basis: 400px;
  position: relative;
  .toggle {
    z-index: 1001;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 12px;
    color: #0099ff;
    &:hover {
      cursor: pointer;
    }
  }
  .charts {
    border-radius: 5px;
    position: absolute;
    background: #fff;
    width: 100%;
    height: 100%;
    top: 0;
  }
}
</style>

