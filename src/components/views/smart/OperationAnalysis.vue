/* 经营分析 */
<template>
  <div class="form-layout left-layout">
    <!-- 左侧栏 -->
    <div>
      <!-- 日利润 -->
        <chart-component :id="'dailyProfit'" :data="monthlyProfitData" :style="'500px'"></chart-component>
      <!-- 月利润 -->
        <chart-component :id="'monthlyProfit'" :data="monthlyProfitData" :style="'500px'"></chart-component>
    </div>
    <!-- 右侧栏 -->
    <div>
      
      <div class="form-layout right-layout">
        <!-- 上二 -->
        <!-- 月事业部利润 -->
        <chart-component :id="'businessDivision'" :data="monthlyProfitData" :style="'500px'"></chart-component>
        <!-- 月类型利润 -->
        <chart-component :id="'typesOfProfit'" :data="typesOfProfitData" :style="'500px'"></chart-component>
      </div>
      <!-- 下一 -->
      <div class="right-bottom-layout">
        <chart-component :id="'businessDivisionMonthlyProfit'" :data="typesOfProfitData" :style="'100%'"></chart-component>
      </div>
    </div>
  </div>
</template>
<script>
import ChartComponent from "@/components/common/echarts/ChartComponent.vue";
import lineChart from "@/components/common/echarts/lineChart";
import columnarChart from '@/components/common/echarts/columnarChart.js'
export default {
  data: () => ({
    monthlyProfitData: lineChart,
    typesOfProfitData: columnarChart
  }),
  components: {
    ChartComponent,
  }
};
</script>
<style lang='less'>
.padding-rem(@param) {
  padding: @param;
}
.margin-rem(@param) {
  margin: @param;
}
.left-layout {
  flex-wrap: nowrap;
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div:first-child {
      height: 48%;
    }
    > div:last-child {
      height: 48%;
    }
  }
  & > div:last-child {
    flex: 2;
  }
  & > div {
    box-sizing: border-box;
    .padding-rem(0.3rem);
    height: 87vh;
  }
}
.right-layout {
  box-sizing: border-box;
  flex-wrap: nowrap;
  > div {
    flex: 1;
    .margin-rem(0 0.5rem 0.5rem 0);
    height: 87/2vh;
    // background: red;
  }
}
.right-bottom-layout {
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  padding: 0.5rem;
  >div{
    height: 100%
  }
}
</style>
