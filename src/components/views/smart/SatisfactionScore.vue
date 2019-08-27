/* 老板报表 */
<template>
	<div class="form-layout">
		<div>
			<div id="YOYT" :style="{height: '800px'}"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data: () => ({
			labelOption: {
				/* normal: {
					show: true,
					position: app.config.position,
					distance: app.config.distance,
					align: app.config.align,
					verticalAlign: app.config.verticalAlign,
					rotate: app.config.rotate,
					formatter: '{c}  {name|{a}}',
					fontSize: 16,
					rich: {
						name: {
							textBorderColor: '#fff'
						}
					}
				} */
			}
		}),
		mounted() {
			try {
				this.drawYOYT();
			} catch (error) {
				console.log(error);
			}

		},
		methods: {
			// 营业额图
			drawYOYT() {
				this.draw("YOYT", {
					color: ['#003366', '#006699', '#4cabce', '#e5323e'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['服务类型评分 业务体系满意度', '服务体系满意度', '流程时效满意度', '运输、派送、售后满意度']
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center',
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar', 'stack', 'tiled']
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
						type: 'category',
						axisTick: {
							show: false
						},
						data: ['业务管理部', '业务项目部', '业务事业部', '商务部', '财务部', '投融资部', '关务部']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '服务类型评分 业务体系满意度',
							type: 'bar',
							barGap: 0,
							label: this.labelOption,
							data: [320, 332, 301, 334, 390, 340, 370]
						},
						{
							name: '服务体系满意度',
							type: 'bar',
							label: this.labelOption,
							data: [220, 182, 191, 234, 290, 260, 240]
						},
						{
							name: '流程时效满意度',
							type: 'bar',
							label: this.labelOption,
							data: [150, 232, 201, 154, 190, 150, 170]
						},
						{
							name: '运输、派送、售后满意度',
							type: 'bar',
							label: this.labelOption,
							data: [98, 77, 101, 99, 40, 50, 60]
						}
					]
				})
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
		>div:first-child {
			.flex-layout();
			width: 100%;

			>div {
				flex: 1;
			}
		}
	}
</style>
