<!-- 组件的模板 -->
<template>
  <div class="div">
    <div class="logo">
      <img src="@/assets/logo_admin.png"
           alt="">
    </div>
    <el-menu default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             router
             active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span class="indexHome">首页</span>
      </el-menu-item>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论列表</el-menu-item>
          <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">粉丝管理</el-menu-item>
          <el-menu-item index="1-2">图文数据</el-menu-item>
          <el-menu-item index="1-3">粉丝概况</el-menu-item>
          <el-menu-item index="1-4">粉丝画像</el-menu-item>
          <el-menu-item index="1-4">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<!-- 组件的 JavaScript -->

<script>

export default {
  name: 'AppAside',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
.div {
  width: 200px;
  height: 100%;
  background-color: rgb(84, 92, 100);
  overflow: hidden;

  .logo {
    width: 100%;
    height: 70px;
    line-height: 70px;
    vertical-align: middle;

    img {
      vertical-align: middle;
    }
  }

  .el-menu-vertical-demo {
    border-right: solid 1px;
  }

  .indexHome {
    display: inline-block;
    padding: 0 10px;
  }
}
</style>
