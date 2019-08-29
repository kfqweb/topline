<template>
  <div class="login-wrap">
    <div class="login-wrap-main">
      <div class="login-head">
        <img src="./logo_index.png"
             alt="">
      </div>
      <div class="login-form">
        <el-form :model="loginForm"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile"
                      placeholder="请输入手机号"
                      @keyup.enter.native="handleLogin1"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="14">
              <el-input v-model="loginForm.code"
                        placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8"
                    :offset="2">
              <el-button @click="handleSendCode"
                         class="login-btn-ma"
                         :disabled="!!timerSet">
                {{ timerSet ? `${timer}秒后，可再次发送·` : '发送验证码'}}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <label>
              <el-col :span="1">
                <el-checkbox-group v-model="checkType">
                  <el-checkbox label=""
                               name="type"></el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="23">
                <span class="txt">
                  我已阅读并同意
                  <a href="#">用户协议</a>和
                  <a href="#">隐私条款</a>
                </span>
              </el-col>
            </label>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="!checkType"
                       class="login-btn"
                       type="primary"
                       @click="handleLogin"
                       :loading="subLoginLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { setUser } from '@/utils/auth'
import '@/vendor/gt' // 引入极验 JavaScript SDK 文件，通过 window.initGeetest 使用

export default {
  name: 'AppLogin',
  data () {
    return {
      // 倒计时
      timer: 60,
      timerSet: null,
      // 极验初始化数据
      captchaObj: null,
      // loading 控制
      subLoginLoading: false,
      loginForm: { // 表单数据
        mobile: '13911111111',
        code: '246810'
      },
      // 同意按钮
      checkType: false,
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return
        }
        this.subLogin()
      })
    },
    // 登录验证
    subLogin () {
      // 改变 loading 状态
      this.subLoginLoading = true
      this.axios({
        method: 'POST',
        url: '/authorizations',
        data: this.loginForm
      }).then(res => {
        this.subLoginLoading = false
        const { message, data } = JSON.parse(res.data)
        console.log(res);
        if (message === 'OK') {
          // window.localStorage.setItem('token', JSON.stringify(data))
          setUser(data)
          this.$router.push({
            name: 'home'
          })
        }
      })
    },
    // 发送人机验证码
    handleSendCode () {
      // alert(0)
      const { mobile } = this.loginForm
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }
      this.axios({
        method: 'GET',
        url: `/captchas/${mobile}`
      }).then(res => {
        // 数据被包装了，所以需要用解构赋值取出数据
        const { data } = res.data
        // console.log(data);
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏，直接弹出式
        }, captchaObj => {
          this.captchaObj = captchaObj
          // console.log(captchaObj);
          captchaObj.onReady(function () {
            // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify() // 弹出验证码内容框
          }).onSuccess(async () => {
            // your code
            // console.log('ghjkl');
            // console.log(captchaObj.getValidate())
            // const {
            //   geetest_challenge: challenge,
            //   geetest_validate: validate,
            //   geetest_seccode: seccode
            // } = captchaObj.getValidathis.axios({
            //   method: 'GET',
            //   url: `/sms/codes/${mobile}`,
            //   params: {
            //     geetest_challenge,
            //     geetest_validate,
            //     geetest_seccode
            //   }
            // })
            // console.log(res.data)
            this.countDownTimer()
            const { message } = res.data
            if (message === 'OK') {
              // console.log(1);
              // window.setInterval(() => {

              // }, 1000)
            }
          }).onError(function () {
            // your code
          })

          // 在这里注册 “发送验证码” 按钮的点击事件，然后验证用户是否输入手机号以及手机号格式是否正确，没有问题：
          // captchaObj.verify
        })
      })
    },
    /**
     * countDownTimer
     *  */
    countDownTimer () {
      this.timerSet = window.setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          this.timer = 60
          window.clearInterval(this.timerSet)
          this.timerSet = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  background-image: url('./login_bg.jpg');

  .login-wrap-main {
    width: 30%;
    padding: 50px;
    border-radius: 15px;
    background-color: #fff;

    .login-head {
      text-align: center;
      margin-bottom: 15px;
    }

    .login-form {
      a {
        text-decoration: none;
        color: #409eff;
      }

      .txt {
        color: #999;
      }
    }

    .login-btn-ma {
      width: 100%;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
