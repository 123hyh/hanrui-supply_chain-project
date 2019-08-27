<template>
  <div>
    <button @click.stop="handleExport">导出</button>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250"
    >
      <el-table-column
        v-for="item of tableKey"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
      >
        <template
          v-if='is_slot.name'
          slot-scope="scope"
        >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            {{is_slot.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="form.input3"
        class="input-with-select"
      >
        <el-select
          v-model="form.select"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option
            label="餐厅名"
            value="1"
          ></el-option>
          <el-option
            label="订单号"
            value="2"
          ></el-option>
          <el-option
            label="用户电话"
            value="3"
          ></el-option>
        </el-select>
        <el-input slot="suffix">
          <el-input slot="prepend" v-model="form.input4"></el-input>
          <el-input slot="prepend" v-model="form.input"></el-input>
        </el-input>
      </el-input>
    </div>
  </div>

</template>
<script>
import api from '@/assets/js/appHelper.js'

export default {
  data: _ => ({
    form: {
      input3: '',
      select: '',
    },
    is_slot: {
      name: '预览'
    },
    tableKey: [{
      prop: "address",
      label: "地址"
    }
    ],
    tableData: [{
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-08',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-06',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }]
  }),
  methods: {
    handleExport () {
      api.testExport().then(({ data }) => {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.target = '_self',
          a.download = data
        a.click()
      })

    },
    deleteRow () { }
  }
}
</script>
<style>

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>