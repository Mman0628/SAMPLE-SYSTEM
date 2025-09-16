
process.env.VUE_CLI_SERVICE_CONFIG_PATH = './vue.config.js';
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {  
    client: {
      overlay:  false 
    }
  }, 
  // devServer: {
  //   host: '192.168.1.174',
  //   port: 8080, 
  //   allowedHosts: 'all',  
  //   client: {
  //     overlay:  false 
  //   }
  // }, 
})
   