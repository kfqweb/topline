<!-- 组件的模板 -->
<template>
  <el-card class="publish">
    <div slot="header"
         class="header">
      <span>数据筛选</span>
      <div>
        <el-button type="success"
                   @click="handlePublish(false)">发布</el-button>
        <el-button type="info"
                   @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-form>
      <el-form-item label="标题"
                    width="100">
        <el-input type="text"
                  v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容"
                    width="100">
        <el-input type="textarea"
                  v-model="articleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="封面"
                    width="100">
      </el-form-item>
      <el-form-item label="频道"
                    width="100">
        <!-- <el-select v-model="articleForm.channel_id">
          <el-option label="区域一"
                     value="shanghai"></el-option>
        </el-select> -->
        <!--
              v-model="articleForm.channel_id" 相当于
              v-bind:value="articleForm.channel_id"
                绑定一个名字叫 value 的数据给子组件
              v-on:input="articleForm.channel_id = $event"
                默认监听子组件的 input 自定义事件，事件发生以后，将事件参数赋值给你绑定的数据
             -->
        <article-channel v-model="articleForm.channel_id"></article-channel>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<!-- 组件的 JavaScript -->
<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'public',
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '', // 频道
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      }
    }
  },
  components: {
    ArticleChannel
  },
  methods: {
    handlePublish (draft = false) {
      this.axios({
        method: 'POST',
        url: '/articles',
        data: this.articleForm,
        params: {
          draft
        }
      }).then(() => {
        this.$message.success('发布成功！！！')
      })
        .catch(() => {
          this.$message.error('发布失败！！！')
        })
    }
  }
}

</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
.publish {
  min-height: 99%;
  .header {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>
