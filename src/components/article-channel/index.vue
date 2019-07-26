<!-- 组件的模板 -->
<template>
  <el-select :value="value"
             clearable
             @change="handleChange">
    <el-option v-for="item in channels"
               :key="item.id"
               :label="item.name"
               :value="item.id"></el-option>
  </el-select>
</template>

<!-- 组件的 JavaScript -->
<script>
export default {
  name: 'articleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data: { data } } = await this.axios({
          method: 'GET',
          url: '/channels'
        })
        console.log(data)
        this.channels = data.channels
      } catch (err) {
        console.log(err)
        this.$message.error('获取频道数据失败')
      }
    },
    handleChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
