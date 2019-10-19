/* form 表单 渲染模版 */
<template>
    <div class="form-template_2">
        <template v-for="(form, i) of FormList">
            <!-- 如果 form 的 length 为 0 的时候不继续接下来的渲染过程 -->
            <template v-if="form.length">
                <div :key="i" class="form-width">
                    <!-- 插槽 -->

                    <slot v-if="slotConfig[i] && slotConfig[i].visible"></slot>
                    <!-- 分割线 + 标题 -->
                    <template v-if="titleList[i]">
                        <div class="cut-off" v-if="titleList[i]['visible']">{{titleList[i]['text']}}</div>
                    </template>

                    <!-- form 模版 -->
                    <!-- 验证规则 formList 为对象 时 formModel_i 否则 formModel -->
                    <el-form
                        :inline-message="true"
                        :model="formModel"
                        :ref="`formModel${i ? ('_' + i): ''}`"
                        class="form-layout"
                        label-position="right"
                        label-width="10rem"
                    >
                        <template v-for="(item, index) of form">
                            <el-form-item
                                :class="item.type"
                                :key="index"
                                :label="item.name"
                                :prop="item.key"
                                :rules="item.rules"
                                :style="item.layout ? item.layout : ''"
                                class="formitem"
                                v-show="!item.isShow"
                            >
                                <!-- 如果 type 为 undefined 不渲染该组件 -->
                                <template v-if="item.type">
                                    <!-- 缓存该form组件 -->
                                    <!-- <keep-alive> -->
                                    <components
                                        :calculate="calculate"
                                        :config="item"
                                        :formModel="formModel"
                                        :formStatus="formStatus"
                                        :is="`${item.type}Component`"
                                        :styles="style"
                                        @rousePopover="rousePopover"
                                    ></components>
                                    <!-- </keep-alive> -->
                                </template>
                            </el-form-item>
                        </template>
                    </el-form>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import utools from '@/domain/common/utools'
import api from '@/assets/js/appHelper.js'
export default {
    created() {
        // 初始化下拉框的值
        // this.getSelectSet();
    },
    computed: {
        // form 分组 的 最大值
        formMaxGroup() {
            const { list, otherConfig = {} } = this.formConfig
            return Math.max(
                ...(otherConfig.title ? Object.keys(otherConfig.title) : [1])
            )
        },
        // 设置 form 配置对象
        FormList() {
            // 如果 formConfig 为 数组时 直接返回该数组 不再往下执行
            let formSort = (x, y) => {
                if (x.order < y.order) return -1
                if (x.order > y.order) return 1
                return 0
            }
            if (Array.isArray(this.formConfig))
                return [this.formConfig.sort(formSort)]
            let { list } = this.formConfig
            // form分组
            let formObj = list.reduce(
                (pre, cur, i) => {
                    !cur.isShow && cur.group && pre[cur.group].push(cur)
                    return pre
                },
                // 第二个参数 为 对象 {1: [], 2: []}
                (() => {
                    let obj = {}
                    let i = 1
                    while (i <= this.formMaxGroup) {
                        obj[i] = []
                        i++
                    }
                    return obj
                })()
            )
            // 对 formGroup 进行 排序
            for (let item of Object.keys(formObj)) {
                formObj[item].sort(formSort)
            }
            return formObj
        },
        // 分割线 配置
        titleList() {
            const { otherConfig = {} } = this.formConfig
            return otherConfig.title || {}
        },
        // 插槽
        slotConfig() {
            const { otherConfig = {} } = this.formConfig
            return otherConfig.slot || {}
        },
        // 用该状态区分是否可输入
        formStatus() {
            const status = this.formModel.status || '0',
                s = +status.replace(/-/, '.').replace(/-/, '')
            return s >= 2 && s !== 6
        }
    },
    data: () => ({
        isShowPopover: false, //是否显示弹窗组件
        style: 'width: 160px'
    }),
    components: {
        // form组件
        stringComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/StringComponent.vue'
            ),
        numberComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/NumberComponent.vue'
            ),
        checkboxComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/CheckboxComponent.vue'
            ),
        dateComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/DateComponent.vue'
            ),
        labelComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/LabelComponent.vue'
            ),
        selectComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/SelectComponent.vue'
            ),
        timeComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/TimeComponent.vue'
            ),
        textareaComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/TextareaComponent.vue'
            ),
        calculateComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/CalculateComponent.vue'
            ),
        moneyComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/MoneyComponent.vue'
            ),
        calcComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/CalcComponent.vue'
            )
    },
    props: {
        /* v-model所绑定的对象 */
        formModel: {
            type: Object,
            required: true
        },
        /* form的配置 */
        formConfig: {
            type: [Object, Array],
            required: true
        },
        /* 计算结果的集合 */
        calculate: {
            type: Object,
            default: _ => ({})
        }
    },
    watch: {
        formConfig: {
            // 当配置 变化时 重新 emit上级验证规则
            handler(cur, pre) {
                if (cur === pre) return
                this.setFormConfig(this.formModel.status)
                this.getSelectSet()
                this.$nextTick(() => {
                    const isArray = Array.isArray(this.formConfig)
                    this.$emit(
                        'handlerFormVerify',
                        isArray
                            ? {
                                  formModel: (this.$refs['formModel'] ||
                                      [
                                          /* 防止undefined */
                                      ])[0]
                              }
                            : this
                                  .$refs /* 如果 配置表的 类型 为数组时 直接返回 当前 下标为 0 的 */
                    )
                })
            },
            deep: true,
            immediate: true
        },
        'formModel.status': {
            handler(cur, pre) {
                this.setFormConfig(cur)
            },
            deep: true
            // immediate: true
        }
    },
    methods: {
        /**
         * @method rousePopover 点击 输入框中 的 search 按钮事件
         */
        rousePopover(key, item) {
            this.$emit('handlerSearchClick', key, item)
        },

        // 请求下拉框的集合
        getSelectSet() {
            const TYPE = Object.prototype.toString
                .call(this.formConfig)
                .slice(8, -1)
            if (TYPE !== 'Array' && TYPE !== 'Object') {
                console.log(TYPE)
                throw new Error('当前Form配置必须是个集合!!!')
                return
            }
            const ISARR = TYPE === 'Array'
            api.initSelect(ISARR ? this.formConfig : this.formConfig.list)
        },

        // 处理 单据状态 为提交的 search按钮 显示
        setFormConfig(status = 0) {
            function set(formConfig) {
                if (Array.isArray(formConfig)) {
                    for (let item of formConfig) {
                        if ('list' in item && typeof item.list === 'object') {
                            set.call(this, item['list'])
                        } else {
                            if ('btn' in item) {
                                'btn' in item &&
                                    item.btn &&
                                    (item.btn = +status < 2 || +status == 6)
                            }
                            // 单据状态未提交之后的表单都会被禁用
                            // +status >= 2 && (item.disabled = true)
                        }
                    }
                } else if ('list' in formConfig) {
                    set.call(this, formConfig.list)
                } else {
                    'btn' in formConfig &&
                        formConfig.btn &&
                        (formConfig.btn = +status < 2)
                }
            }
            set.call(this, this.formConfig)
        }
    },
    components: {
        // form组件
        stringComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/StringComponent.vue'
            ),
        numberComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/NumberComponent.vue'
            ),
        checkboxComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/CheckboxComponent.vue'
            ),
        dateComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/DateComponent.vue'
            ),
        labelComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/LabelComponent.vue'
            ),
        selectComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/SelectComponent.vue'
            ),
        timeComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/TimeComponent.vue'
            ),
        textareaComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/TextareaComponent.vue'
            ),
        calculateComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/CalculateComponent.vue'
            ),
        moneyComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/MoneyComponent.vue'
            ),
        calcComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/CalcComponent.vue'
            ),
        radioComponent: () =>
            import(
                '@/components/common/form-template/form-item-template/RadioComponent.vue'
            )
    }
}
</script>
<style  lang="less">
.form-template_2 {
    // overflow: auto;
    .form-width {
        // min-width: 1600px;
    }
    .form-layout {
        display: flex;
        flex-wrap: wrap;
        > div {
            flex-basis: 25%;
            height: 2rem;
            line-height: 2rem;
            margin-bottom: 3px;
        }
    }
    .form-item-layout {
        display: flex;
    }
    .textarea {
        height: 50px !important;
    }
    @color: #606266;
    .pseudo-element {
        content: '';
        height: 1px;
        display: inline-block;
        border-bottom: 1px solid #eaebec;
    }
    .cut-off {
        color: @color;
        display: flex;
        box-sizing: border-box;
        padding: 5px;
        align-items: center;
        &::before {
            .pseudo-element;
            width: 20px;
            margin-right: 10px;
        }
        &::after {
            .pseudo-element;
            flex: auto;
            margin-left: 10px;
        }
    }
}
</style>
