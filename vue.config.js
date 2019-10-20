const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProd = process.env.NODE_ENV == 'production';
const HappyPack = require('happypack');
const path = require('path');
const cdn = {
	/*  css: [
    'http://at.alicdn.com/t/font_830376_qzecyukz0s.css',
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
  ],
  js: [
    'https://unpkg.com/axios/dist/axios.min.js',
    'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
    'https://unpkg.com/vue-router@3.1.2/dist/vue-router.min.js',
    'https://unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js',
    './echarts-liquidfill/echarts-liquidfill.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.5/tinymce.min.js'
  ] */
	css: ['./static/font_830376_qzecyukz0s.css', /* './static/element-ui.css' */ 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
	js: [
		/* 2.2 */
		'https://cdn.jsdelivr.net/npm/vue',
		'https://unpkg.com/vue-router/dist/vue-router.js',
		'https://cdn.jsdelivr.net/npm/vuex',
		'https://unpkg.com/element-ui@2.12.0/lib/index.js',
		'https://unpkg.com/axios/dist/axios.min.js',
		'https://unpkg.com/echarts@4.4.0/index.js',
		'./static/echarts-liquidfill.min.js',
		'https://unpkg.com/accounting@0.4.1/accounting.min.js',
		'https://unpkg.com/tinymce@5.1.0/tinymce.min.js'

		/* 1.1 */
		/* './static/vue@2.6.10.min.js',
		'./static/vue-router@3.1.2.min.js',
		'./static/vuex@3.1.1.min.js',
		'./static/element-ui@2.11.1.index.js',
		'./static/axios@0.19.0.min.js',

		'./static/echarts@4.2.1.min.js',
		'./static/echarts-liquidfill.min.js',
		'./static/accounting@0.4.1.min.js',
		'./tinymce4.7.5/tinymce.min.js', */
		
	]
};
let externals = {
	'element-ui': 'ELEMENT',
	vue: 'Vue',
	'vue-router': 'VueRouter',
	axios: 'axios',
	echarts: 'echarts',
	Vuex: 'Vuex'
};
module.exports = {
	devServer: {
		// port: 8888,  // 端口
		// open: true, // 自动开启浏览器
		compress: false, // 开启压缩
		hot: true,
		overlay: {
			warnings: true,
			errors: true
		},
		proxy: {
			'/api': {
				target: 'http://jsonplaceholder.typicode.com',
				changeOrigin: true,
				pathRewrite: {
					'/api': ''
				}
			},
			'/service': {
				// target: 'http://192.168.0.104:8082/scp', // 李鹏建
				// target: 'http://192.168.0.110:8082/scp', // 罗冲
				// target: 'http://192.168.0.200:8082/scp', // 郭工
				// target: 'http://192.168.0.168:8082/scp', // 陈新进
				target: 'http://47.107.253.252:8082/scp', // 生成
				changeOrigin: true,
				pathRewrite: {
					'/service': ''
				}
			},
			// 仓储
			'/storage': {
				target: 'http://192.168.0.168:8085/api',
				changeOrigin: true,
				pathRewrite: {
					'/storage': ''
				}
			},
			'/ms': {
				target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
				changeOrigin: true
			},
			'/file': {
				// 文件预览
				target: 'http://47.107.253.252:8090/fileview/preview',
				changeOrigin: true,
				pathRewrite: {
					'/file': ''
				}
			},
			'/declare': {
				target: 'http://www.hscode.net/IntegrateQueries/YsInfoPager',
				changeOrigin: true,
				pathRewrite: {
					'/declare': ''
				}
			}
		}
	},
	publicPath: './',
	productionSourceMap: false,
	configureWebpack: config => {
		if (isProd) {
			// 用cdn方式引入
			(config.externals = externals),
				config.plugins.push(
					new CompressionWebpackPlugin({
						test: /\.(js|html|css)$/,
						// asset: '[path].gz[query]',
						threshold: 25600,
						minRatio: 0.9
					})
				);
			config.plugins
				.push
				//生产环境自动删除console
				
				(  /*  new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              // drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        }) */);
		} else {
			config.plugins.push(
				new HappyPack({
					id: 'js',
					threads: 4,
					loaders: ['babel-loader']
				})
			);
		}
	},
	chainWebpack: config => {
		// 修复HMR
		// config.resolve.symlinks(true);
		// 移除 prefetch, preload 插件
		config.plugins.delete('prefetch');
		config.plugins.delete('preload');
		if (isProd) {
			// babel-polyfill
			config
				.entry('index')
				.add('babel-polyfill')
				.end();
			// 压缩代码
			config.optimization.minimize(true);
			// 分割代码
			config.optimization.splitChunks({
				chunks: 'all'
			});
			// 生产环境注入cdn
			config.plugin('html').tap(args => {
				args[0].cdn = cdn;
				return args;
			});
		} else {
			// config.module.rule('js').use('happypack/loader?id=js')
		}
	}
	// 为生产构建中的babel&ts使用线程加载器
	// parallel:  require('os').cpus().length > 1
};
