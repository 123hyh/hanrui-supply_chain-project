/**
 * @message 折线图
 */
export default {
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
		data: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"]
	},
	yAxis: {
		type: "value"
	},
	series: [{
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
}