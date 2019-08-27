export default {
  title: {
    text: "营业额同比(亿)",
    x: 'center'
  },
  color: ["#5386ff", "#00e37f"],
  legend: {
    bottom: 0,
    itemGap: 100,
    itemHeight: 10,
    itemWidth: 10,
    icon: 'circle'
  },
  grid: {
    left: "2%",
    right: "2%",
    bottom: "10%",
    containLabel: true
  },
  tooltip: {},
  dataset: {
    dimensions: ["product", "2018", "2019"],
    source: [{
        product: "1月",
        "2018": 85.8,
        "2019": 93.7
      },
      {
        product: "2月",
        "2018": 30,
        "2019": 80
      },
      {
        product: "3月",
        "2018": 20,
        "2019": 30
      },
      {
        product: "4月",
        "2018": 85.8,
        "2019": 93.7
      },
      {
        product: "5月",
        "2018": 10,
        "2019": 20
      },
      {
        product: "6月",
        "2018": 90,
        "2019": 25
      },
      {
        product: "7月",
        "2018": 50,
        "2019": 30
      },
      {
        product: "8月",
        "2018": 87,
        "2019": 32
      },
      {
        product: "9月",
        "2018": 10,
        "2019": 99
      },
      {
        product: "10月",
        "2018": 75,
        "2019": 80
      },
      {
        product: "11月",
        "2018": 30,
        "2019": 20
      },
      {
        product: "12月",
        "2018": 9,
        "2019": 93.7
      }
    ]
  },
  xAxis: {
    type: "category"
  },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{
    type: "bar"
  }, {
    type: "bar"
  }]
}