import { mapGetters, mapMutations } from 'vuex'
import api from '@/assets/js/appHelper.js'
import submitPathConfig from '@/domain/common/submitPortConfig/submitModulePortConfig.js'
import UploadDialog from '@/components/common/upload/UploadDialog.vue'
export default {
  install: Vue => {
    Vue.component('preserve-btn', {
      components: {
        UploadDialog
      },
      render() {
        return (
          <section class="set-back">
            {this.btnData.map(item => {
              return (
                <el-button
                  type={item.key !== 'return' ? 'primary' : ''}
                  loading={item.key === 'save' ? this.isLoading : false}
                  key={item.key}
                  onClick={() => this.emitBtnMethod(item.method)}
                >
                  {item.name}
                </el-button>
              )
            })}
            {/* 上传组件 */}
            <UploadDialog
              form={this.form}
              visible={this.dialogVisible}
              on-handleCloseDialog={() => (this.dialogVisible = false)}
            />
          </section>
        )
      },
      data: () => ({
        dialogVisible: false,
        message: '保存',
        btnset: {
          return: {
            name: '返回',
            key: 'return',
            method: 'handleRollback',
            index: 0
          },
          save: {
            name: '保存',
            key: 'save',
            method: 'handlePreserve',
            index: 1
          },
          submit: {
            name: '提交',
            key: 'submit',
            method: 'handleSubmit',
            index: 2
          },
          verify: {
            name: '审核',
            key: 'verify',
            method: 'handleVerify',
            index: 3
          },
          export: {
            name: '导出',
            key: 'export',
            method: 'handleExport',
            index: 4
          },
          print: {
            name: '打印',
            key: 'print',
            method: 'handlePrint',
            index: 5
          },
          attachments: {
            name: '附件',
            key: 'attachments',
            method: 'handleUpload',
            index: 6
          },
          blacklist: {
            name: '黑名单',
            key: 'blacklist',
            method: 'hanldeBlacklist',
            index: 7
          }
        }
      }),
      props: {
        isLoading: {
          type: Boolean,
          default: false
        },
        // 单据状态，控制按钮
        billsStatus: {
          type: String,
          default: ''
        },
        form: {
          type: Object,
          default: () => ({})
        }
      },
      watch: {
        isLoading(is) {
          this.btnset['save']['name'] = is ? '保存中' : '保存'
        }
      },
      computed: {
        ...mapGetters(['getListBtn']),
        btnData() {
          let arr = []
          ;(this.getListBtn[this.$route.meta.parentRoute] || []).reduce(
            (pre, cur) => {
              this.btnset[cur] &&
                (pre[this.btnset[cur]['index']] = this.btnset[cur])
              arr = pre
              return pre
            },
            []
          )
          arr = arr.filter(item => item)
          // 处理btn的个数->不同的单据按钮
          // 状态 1=>保存状态； 2=>提交状态；3=>审核中； 4=>审核通过；
          let saveIndex = ~arr.findIndex(item => item.key === 'save')
          let submitIndex = ~arr.findIndex(item => item.key === 'submit')

          // 以下步骤渐进
          let statusCode = ''
          if (this.billsStatus !== '') {
            statusCode = this.billsStatus
          } else {
            statusCode = this.form.status || ''
          }
          switch (statusCode) {
            case '':
              {
                submitIndex && arr.splice(~submitIndex, 1)
              }
              break
            case '2': {
              // !submit && !saveIndex && (arr.splice(saveIndex, 2))
              saveIndex &&
                arr.splice(~saveIndex, 1) &&
                submitIndex &&
                arr.splice(~submitIndex - 1, 1)
            }
          }
          // 控制 黑名单按钮
          if (this.form.hasBlack || !statusCode) {
            arr.splice(
              (() => {
                return arr.findIndex(item => item.key === 'blacklist')
              })(),
              1
            )
          }

          return arr
        }
      },
      methods: {
        ...mapMutations(['removebreadCrumbData']),
        async emitBtnMethod(params) {
          params === 'handleRollback' &&
            this.removebreadCrumbData({ path: this.$route.path })
          if (
            params === 'handleSubmit' &&
            !(await this.clickDialogAffirm(params))
          )
            return
          if (params === 'handlePrint') {
            /* 打印功能 */
            return window.print()
          }
          if (params === 'handleUpload') {
            return this.handleUpload()
          }
          if (params === 'hanldeBlacklist') {
            return this.$confirm('确定要加入黑名单吗？', '提示', {
              type: 'wraning'
            }).then(_ => {
              this.$emit('hanldeBlacklist')
            })
          }
          this.$emit(params)
        },
        // 确认框点击确定事件
        clickDialogAffirm(params) {
          return this.$confirm('一旦提交将无法修改，是否确定提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submitBills()
          })
        },
        // 单据的提交
        async submitBills() {
          let sCode = 200
          const { path } = this.$route
          if (!submitPathConfig[path])
            /* 没有注册 接口的处理 */
            throw new Error(
              `error-message: 请先在接口配置表当中注册，configPath: src/domain/common/submitPortConfig/submitModulePortConfig.js`
            )
          try {
            const reqPath = submitPathConfig[path]
            const { status } = await api.submitUpdate(
              `${reqPath}/billflow/submit`,
              this.form
            )
            this.form.status = '2'
          } catch (error) {
            sCode = 0
            console.log(error)
          } finally {
            this.$message({
              type: sCode ? 'success' : 'error',
              message: sCode ? '提交成功！' : '提交失败，请重试！'
            })
          }
        },

        //  附件上传
        handleUpload() {
          this.dialogVisible = true
          /* this.$router.push({
            name: 'AccessoryManageList',
            params: {
              form: this.form
            }
          }) */
        },
        handleClose() {
          this.dialogVisible = false
        },
        // 黑名单
        hanldeBlacklist() {}
      }
    })
    Vue.component('BreadcrumbNavigation', {
      computed: {
        ...mapGetters(['navigatorList']),
        breadcrumbList() {
          return this.navigatorList[this.$route.path.slice(1)] || []
        }
      },
      render() {
        return (
          <el-breadcrumb separator="/" class="breadcrumb-navigation">
            {this.breadcrumbList.map((item, i) => (
              <el-breadcrumb-item key={i}>{item.label}</el-breadcrumb-item>
            ))}
          </el-breadcrumb>
        )
      }
    })
  }
}
