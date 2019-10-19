
<template>
    <!-- 需要计算出来的输入框  数字类型输入框 -->
    <el-input
        :data-key="config.key"
        :disabled=" formStatus ? true : config.disabled"
        :readonly="config.readonly"
        :style="styles"
        @blur="setNumber(config.key)"
        autocomplete="off"
        v-model="calculate[config['key']]"
    ></el-input>
</template>
<script>
export default {
    props: {
        // form 实体
        formStatus:Boolean,
        formModel: {
            type: Object,
            required: true
        },
        // 当前 渲染模版 的 配置
        config: {
            type: Object,
            required: true
        },
        /* 自定义样式 */
        styles: {
            type: [Number, String],
            required: false
        },
        /* 取值 该集合 内 的结果 */
        calculate: {
            type: Object,
            required: true
        }
    },
    methods: {
        setNumber(key) {
            if (!isNaN(+this.formModel[key])) {
                this.formModel[key] = +this.formModel[key]
            }
        }
    }
}
</script>

