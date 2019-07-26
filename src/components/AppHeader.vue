<!-- 组件的模板 -->
<template>
  <div class="header-warp">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          江苏传智播客教育科技股份有限公司
        </div>
      </el-col>
      <el-col :offset="12"
              :span="8">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容"
                    width="100px"
                    v-model="input"
                    clearable>
          </el-input>
          <img width="100"
               height="100"
               class="imgs"
               :src="users.photo"
               alt="">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">{{ users.mobile }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus"
                                @click.native="handlerLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<!-- 组件的 JavaScript -->
<script>
import { getUser, removeUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      input: '',
      users: null
    }
  },
  created () {
    // this.users = JSON.parse(window.localStorage.getItem('token'))
    this.users = getUser()
    this.users.mobile = '17611594230'
  },
  mounted () {
  },
  methods: {
    handlerLogout () {
      removeUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
.header-warp {
  .imgs {
    width: 50px;
    height: 48px;
    vertical-align: top;
    margin: 5px 10px 0 10px;
    border-radius: 50%;
  }

  .el-input {
    width: 200px;
    margin-left: 40px;
  }
}
</style>
