/**
 * import Vue from 'vue'
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

 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
// import axios from 'axios'
import axios from '@/utils/apiAxios'
// import { getUser, removeUser } from '@/utils/auth'

// 先找文件，没有就找目录
// 如果找到目录，优先加载目录中的 index
import router from './routers'

// 引入公共样式文件，最好在 element 样式文件之后，可以自定义修改 element 内置样式
import './styles/index.css'

Vue.use(ElementUI)

// 所有组件都是 Vue 的实例
// 我们可以把一些需要在组件中频繁使用的成员放到 Vue.prototype 中
// Vue.prototype.foo = 'bar'

// 给 Vue 原型对象扩展成员的时候，最好加上一个 $ 前缀，避免和组件内部的数据成员冲突
// 几乎所有组件都要去发请求，这样配置完以后，我们在组件中发请求就可以直接 this.$http({ method、url... })
Vue.use(axios)
Vue.config.productionTip = false

new Vue({
  router,
  // store, // 将 store 配置到 Vue 根实例中，然后所有组件就可以通过 this.$store 来访问容器中的数据了
  render: h => h(App)
}).$mount('#app')
