/**
 * @message 饼状图
 */
export default {
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
        bottom: "10%",
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
}