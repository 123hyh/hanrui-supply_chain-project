<style scoped lang="less">
	.flex-layout() {
		display: flex;
		flex-wrap: wrap;
	}

	.form-layout {
		.left,.right {
			.flex-layout;
			height: 800px;
			&.left {
				flex: 1;
				div {
					width: 100%;
					height: 400px;
				}
			}
			&.right {
				flex: 2;
				.top,.bottom{
					.flex-layout;
					width: 100%;
					height: 400px;
					&.top {
						div{
							.flex-layout;
							flex: 1;
						}
					}
					&.bottom{
						div{
							.flex-layout;
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>

/* 老板报表 */
<template>
	<div class="form-layout">
		<div class="left">
			<div id="riskManagement"></div>
			<div id="marketingPlan"></div>
		</div>
		<div class="right">
			<div class="top">
				<div id="saleroomTable"></div>
				<div id="YOYT"></div>
			</div>
			<div class="bottom">
				<div id="monthlySales"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: () => ({}),
		mounted() {
			try {
				this.drawYOYT();
				this.drawSaleroomTable();
				this.drawRiskManagement();
				this.drawMarketingPlan();
				this.drawMonthlySales();
			} catch (error) {
				console.log(error);
			}

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
						data: ["蒸发量", "降水量"],
						bottom: 10,
						itemGap: 50,
						icon: 'circle'
					},
					toolbox: {
						show: true,
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ["line", "bar"]
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					xAxis: [{
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
					}],
					yAxis: [{
						type: "value"
					}],
					series: [{
							name: "蒸发量",
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
								data: [{
										type: "max",
										name: "最大值"
									},
									{
										type: "min",
										name: "最小值"
									}
								]
							},
							markLine: {
								data: [{
									type: "average",
									name: "平均值"
								}]
							}
						},
						{
							name: "降水量",
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
								data: [{
										name: "年最高",
										value: 182.2,
										xAxis: 7,
										yAxis: 183
									},
									{
										name: "年最低",
										value: 2.3,
										xAxis: 11,
										yAxis: 3
									}
								]
							},
							markLine: {
								data: [{
									type: "average",
									name: "平均值"
								}]
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
						data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
						icon: 'circle',
						bottom: 10,
						itemGap: 30,
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "9%",
						containLabel: true
					},
					toolbox: {
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ["line", "bar"]
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
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
					series: [{
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
						bottom: 0,
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "9%",
						containLabel: true
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: [{
								value: 335,
								name: "HFY对客户B的授信额度(亿)"
							},
							{
								value: 950,
								name: "客户B已用额度(亿)"
							},
							{
								value: 234,
								name: "客户B剩余额度(亿)"
							},
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}]
				});
			},
			// 销售计划
			drawMarketingPlan() {
				this.draw("marketingPlan", {
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
						bottom: 0
					},
					series: [{
						name: "访问来源",
						type: "pie",
						radius: "55%",
						center: ["50%", "60%"],
						data: [{
								value: 335,
								name: "直接访问"
							},
							{
								value: 310,
								name: "邮件营销"
							},
							{
								value: 234,
								name: "联盟广告"
							},
							{
								value: 135,
								name: "视频广告"
							},
							{
								value: 1548,
								name: "搜索引擎"
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}]
				});
			},
			// 地区事业部月销售额报表
			drawMonthlySales() {
				this.draw("monthlySales", {
					title: {
						text: '未来一周气温变化',
						subtext: '纯属虚构'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['最高气温', '最低气温']
					},
					toolbox: {
						show: true,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							magicType: {
								type: ['line', 'bar']
							},
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '{value} °C'
						}
					},
					series: [{
							name: '最高气温',
							type: 'line',
							data: [11, 11, 15, 13, 12, 13, 10],
							markPoint: {
								data: [{
										type: 'max',
										name: '最大值'
									},
									{
										type: 'min',
										name: '最小值'
									}
								]
							},
							markLine: {
								data: [{
									type: 'average',
									name: '平均值'
								}]
							}
						},
						{
							name: '最低气温',
							type: 'line',
							data: [1, -2, 2, 5, 3, 2, 0],
							markPoint: {
								data: [{
									name: '周最低',
									value: -2,
									xAxis: 1,
									yAxis: -1.5
								}]
							},
							markLine: {
								data: [{
										type: 'average',
										name: '平均值'
									},
									[{
										symbol: 'none',
										x: '90%',
										yAxis: 'max'
									}, {
										symbol: 'circle',
										label: {
											normal: {
												position: 'start',
												formatter: '最大值'
											}
										},
										type: 'max',
										name: '最高点'
									}]
								]
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
