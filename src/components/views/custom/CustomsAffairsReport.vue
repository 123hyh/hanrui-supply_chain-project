/* 商务报表 */
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
				tableData: [{
						name: "第一季度",
						saleroom: 4.6
					},
					{
						name: "第二季度",
						saleroom: 4.8
					},
					{
						name: "第三季度",
						saleroom: 2.1
					},
					{
						name: "第四季度",
						saleroom: 1.334
					}
				],
				tableData1: [{
						name: "进口",
						saleroom: 4.6
					},
					{
						name: "出口",
						saleroom: 4.8
					},
					{
						name: "转口",
						saleroom: 2.1
					},
					{
						name: "纯物流",
						saleroom: 1.334
					}
				],
				tableData3: [{
						name: "销售一部",
						saleroom: 4.6
					},
					{
						name: "销售二部",
						saleroom: 4.8
					},
					{
						name: "销售三部",
						saleroom: 2.1
					},
					{
						name: "销售四部",
						saleroom: 1.334
					}
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
				let myChart3 = this.$echarts.init(document.getElementById("myChart3"));

				let chartData = {
					/*  title: {
					  text: "对数轴示例",
					  left: "center"
					}, */
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c}"
					},
					legend: {
						left: "left",
						data: ["2的指数", "3的指数"]
					},
					xAxis: {
						type: "category",
						name: "x",
						splitLine: {
							show: false
						},
						data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					yAxis: {
						type: "log",
						name: "y"
					},
					series: [{
							name: "3的指数",
							type: "line",
							data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
						},
						{
							name: "2的指数",
							type: "line",
							data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
						}
					]
				};

				let chart1Data = {
					title: {
						text: "年龄段",
						textStyle: {
							fontSize: 14,
							color: "#444444",
							fontFamily: "Microsoft Yahei",
							fontWeight: "100"
						},
						x: "center"
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "none"
						},
						formatter: function(params) {
							return params[0].name + ": " + params[0].value;
						}
					},
					xAxis: {
						data: [
							"驯鹿",
							"火箭",
							"飞机",
							"高铁",
							"轮船",
							"汽车",
							"跑步",
							"步行"
						],
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: "#444444"
							}
						}
					},
					yAxis: {
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisLabel: {
							show: false
						}
					},
					color: ["#89DA4F", "#FCC828", "#8EC7F4", "#CDCBEC", "#14B961"],
					series: [{
						name: "hill",
						type: "pictorialBar",
						barCategoryGap: "0%",
						// symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
						symbol: "path://M10 600 Q 95 0 180 600",
						label: {
							normal: {
								show: true,
								position: "top",
								formatter: "{c}%"
							}
						},
						itemStyle: {
							normal: {
								opacity: 0.5,
								color: function(params) {
									var colorList = [
										"#89DA4F",
										"#FCC828",
										"#8EC7F4",
										"#CDCBEC",
										"#14B961",
										"#E3E3E3"
									];
									return colorList[params.dataIndex];
								}
							},
							emphasis: {
								opacity: 1
							}
						},
						data: [123, 60, 25, 18, 150, 99, 20, 15]
					}]
				};

				let chart3Data = {
					xAxis: {
						type: "category",
						boundaryGap: false,
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
					},
					yAxis: {
						type: "value"
					},
					series: [{
							data: [820, 932, 901, 934, 1290, 1330, 1320],
							type: "line",
							areaStyle: { /* 区域样式 */ }
						},
						{
							data: [120, 932, 650, 500, 1290, 350, 1320],
							type: "line",
							areaStyle: {}
						},
						{
							data: [50, 100, 80, 320, 500, 50, 300],
							type: "line",
							areaStyle: {}
						}
					]
				};

				// 绘制图表

				myChart.setOption(chartData);
				myChart1.setOption(chart1Data);
				myChart3.setOption(chart3Data);
			},
			selfClick() {}
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
