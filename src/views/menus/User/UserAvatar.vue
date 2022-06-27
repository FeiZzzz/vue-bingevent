<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="avatar" :src="avatar" alt="" class="preview" />
      <img v-else src="../../../assets/images/avatar.jpg" alt="" class="preview" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input
          type="file"
          accept="image/*"
          style="display: none"
          ref="iptRef"
          @change="onFileChange"
        />
        <el-button type="primary" icon="el-icon-plus" @click="xImg"
          >选择图片</el-button
        >
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''"
          @click="cImg">上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserAvatar",
  data() {
    return {
        avatar:''
    }
  },
  methods: {
    // 选择图片功能
    xImg() {
      this.$refs.iptRef.click();
    },
    // input 框的change事件
    onFileChange(e) {
      // console.log(e);
      // 1. 获取用户选择的文件列表（伪数组）
      const file = e.target.files
      if(file.length === 0) {
        this.avatar = ''
      }else {
        // 1. 创建 FileReader 对象
        const fr = new FileReader()
          // 2. 调用 readAsDataURL 函数，读取文件内容
          fr.readAsDataURL(file[0])
        //   console.log(fr);
       // 3. 监听 fr 的 onload 事件
    fr.onload = e => {
      // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
      this.avatar = e.target.result
      }

      }
    },
    // 上传图片的函数
  async  cImg() {
        // 发送ajax
        const {data:res} = await this.$http({
            url:'/my/update/avatar',
            method:'patch',
            data: {avatar:this.avatar}
        })
        // console.log(res);
        if(res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$store.dispatch('initUserInfo')
    }
  },
};
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>
