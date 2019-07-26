<!-- 组件的模板 -->
<template>
  <el-container>
    <el-aside width="200">
      <AppAside></AppAside>
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<!-- 组件的 JavaScript -->
<script>
import AppAside from '@/components/AppAside'
import AppHeader from '@/components/AppHeader'
export default {
  name: 'layout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
.el-container,
.el-header {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  width: 200px;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
</style>
