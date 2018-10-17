
module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
	configureWebpack: {
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.js',
			},
		}
	}
}