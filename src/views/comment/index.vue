<!-- 组件的模板 -->
<template>
  <el-card>
    <div slot="header"
         class="header">
      <span>评论列表</span>
    </div>
    <el-table :data="results">
      <el-table-column prop="title"
                       label="标题">
      </el-table-column>
      <el-table-column prop="total_comment_count"
                       label="总评论数">
      </el-table-column>
      <el-table-column prop="fans_comment_count"
                       label="评论粉丝数">
      </el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <div>
            <!-- {{ scope.row.changeLoading }} -->
          </div>
          <el-switch v-model="scope.row.comment_status"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="handleChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<!-- 组件的 JavaScript -->
<script>
export default {
  name: 'comment',
  data () {
    return {
      page: '',
      per_page: '',
      results: [],
      total_count: ''
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getAll () {
      // articles
      // response_type
      let data = await this.axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      })
      let abc = JSON.parse(data.data)
      console.log(abc)
      this.page = abc.data.page
      this.per_page = abc.data.per_page
      abc.data.results.forEach(item => {
        item.changeLoading = false
      })
      this.results = abc.data.results
      this.total_count = abc.data.total_count
    },
    // 修改状态
    handleChange (item) {
      console.log(item.id.toString())
      item.changeLoading = true // 禁用开关的点击状态
      this.axios({
        method: 'PUT',
        url: `/comments/status?article_id=${item.id.toString()}`,
        // params: {
        //   article_id: item.id.toString()
        // },
        data: {
          allow_comment: item.comment_status
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '关闭'}评论状态成功`
        })
        item.changeLoading = false // 启用开关的点击状态
      }).catch(err => {
        console.log(err)
        item.changeLoading = false // 启用开关的点击状态
        item.comment_status = !item.comment_status
        this.$message.error('修改评论状态失败')
      })
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
