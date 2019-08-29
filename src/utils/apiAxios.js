import axios from 'axios'
import { getUser, removeUser } from './auth'
import JSONbig from 'json-bigint'
import router from '../routers'
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})
// 我们这里使用 http 请求拦截器的目的是为了解决：每次请求需要授权的API手动在请求头中加 Token 令牌的问题
// 添加请求拦截器
// 拦截器的本身就是一个方法
// 该方法什么时候执行？
// 拦截器函数接收一个参数 config
// config 就是你当前请求的配置对象
// 当你使用 axios 发起请求的时候，那么就会先经过这个拦截器然后再发出请求
// 也就是说在请求拦截器内部的请求还没有发出去
// 我们可以在这里定制请求之前的行为
// 配置 axios 的基础路径
// 发请求的时候就不需要每次都写 http://xxxx
// 例如我要请求登录，直接 axios({ url: '/authorizations' })
// 路径最后的 /，多退少补

// // 线上接口直接使用你的手机号 + 246810 就可以登录
// // axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

/**
 * 如何解决后端返回数据中的数字超出安全整数范围问题？
 * axios 预留的自定义处理后端返回的原始数据
 * 可以理解成也是一个响应拦截器，这个比较特殊
 * 这里的 data 是后端返回的未经处理的原始数据
 * axios 默认使用 JONS.parse 去转换原始数据，如果其中有超出安全整数范围的数据就有问题了
 * 所以我们在这里可以手动处理这个原始数据
 *   npm i json-biginit
 *   JSONbig.parse(原始json格式字符串)
 */
http.defaults.transformResponse = [
  function (data) {
    // console.log('transformResponse => ', data)
    // return data

    // 这里使用 JSONbig.parse 转换原始数据
    // 类似于 JSON.parse
    // 但是它会处理其中超出安全整数范围的整数问题。
    // 严谨一点，如果 data 不是 json 格式字符串就会报错
    try {
      // 如果是 json 格式字符串，那就转换并返回给后续使用
      return JSONbig.parse(data)
    } catch (err) {
      // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
      return data
    }
  }
]

/**
 * Axios 请求拦截器：axios 发出去的请求会先经过这里
 * config 是本次请求相关的配置对象
 */
http.interceptors.request.use(
  config => {
    const user = getUser()

    // 如果有 user 数据，则往本次请求中添加用户 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}` // 注意 Bearer 后面的空格
    }

    // return config 是允许请求发送的开关
    // 我们可以在这之前进行一些业务逻辑操作
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Axios 响应拦截器：axios 收到的响应会先经过这里
 */
http.interceptors.response.use(
  response => {
    // >= 200 && < 400 的状态码会进入这里
    // response 就是响应结果对象
    // 这里将 response 原样返回，那么你发请求的地方收到的就是 response
    // 我们可以控制请求收到的响应数据格式
    if (typeof response.data === 'object' && response.data.data) {
      return response.data.data
    } else {
      return response.data
    }
  },
  error => {
    // >= 400 的状态码会进入这里
    console.dir(error)
    // 如果用户 token 无效，让其跳转到登录页面
    if (error.response.status === 401) {
      // 清除本地存储中的无效 token 的用户信息
      removeUser()

      // 跳转到用户登录页面
      router.push({
        name: 'login'
      })
    }

    // 返回一个理解 reject 失败的 Promise
    // 这里抛出异常是为了能让你后续 Promise 调用能正确的收到这里的异常
    return Promise.reject(error)
  }
)

// 建议通过定义插件的配置来扩展 Vue 本身
// 1. 定义一个插件对象
const httpPlugin = {}

// 2. 为插件对象添加一个成员：install
//    install 是一个函数
//    该函数接收两个参数：Vue、options
//
//   Vue.use(httpPlugin) 会来调用 install 方法
httpPlugin.install = function (Vue, options) {
  // 3. 添加实例方法
  Vue.prototype.axios = http
}

// 4. 导出插件对象
export default httpPlugin

// 5. 在入门文件模块 main.js 加载使插件生效
// Vue.use(httpPlugin)
