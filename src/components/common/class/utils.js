import router from '@/router/index.js'
import api from '@/assets/js/appHelper.js'
import { instance as service, isProd } from '@/assets/js/initApi.js'
export default {

    /**
     *
     * @param {名称} 请求头
     * @param {参数} key
     */
    _getData({ url, method, data, headers, responseType } = {}) {
        const IS_GET_DATA =
            method.toLowerCase() === 'get' && typeof data === 'object'
        let options = {
            url: url,
            method: method,
            headers: headers
                ? headers
                : {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            responseType: !responseType ? 'json' : responseType,
            [method !== 'GET' ? 'data' : 'params']: data
        }
        return service(options)
    },

    /**
     *
     * @param {名称} 请求数据字典
     * @param {参数} key
     */
    getEnum(itemType) {
        let options = {
            url: `/dict/search/${itemType}`,
            method: 'GET'
        }
        return this._getData(options)
    },

    /**
     *
     * @param {名称} 请求下拉数据
     * @param {参数} 表配置
     */
    async getConfigSelect(models) {
        for await (let model of models) {
            let requestArr = []
            for (let config of model.itemconfig) {
                config.type === 'select' && config.selectapi && requestArr.push(config.selectapi)
            }
            try {
                const [...response] = await Promise.all(
                    requestArr.map(item => this.getEnum(item).catch(err => err))
                )
                let index = 0
                for (let config of model.itemconfig) {
                    if (config.type == 'select' && config.selectapi) {
                        config.options = []
                        for (let item of response[index]['data']) {
                            config.options.push({ value: item.itemKey, label: item.itemValue})
                        }
                        index++
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    /**
     *
     * @param {名称} 修改配置
     * @param {参数} 表配置
     */
    async setConfigItemConfig(fromDialog, key, obj) {
        for (let item of fromDialog.content.fromConfig.config) {
            for (let con of item.itemconfig) {
                if(con.name == key){
                    for (let i in obj) {
                        con[i] = obj[i]
                    }
                    con = {...con}
                }
            }
        }
    },
}
