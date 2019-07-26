import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routers'
import './styles/index.css'
import 'nprogress'
import axios from '@/utils/apiAxios.js'

// 5. 在入门文件模块 main.js 加载使插件生效
Vue.use(axios)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
