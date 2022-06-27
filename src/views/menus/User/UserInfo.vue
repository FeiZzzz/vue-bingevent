<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <!-- 表单 -->
    <el-form
      :model="userForm"
      :rules="userFormRules"
      ref="userFormRef"
      label-width="100px"
    >
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="userForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="userForm.nickname"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Modify">提交修改</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      // 基于浅拷贝，把 Vuex 中的用户信息对象复制一份，交给 userForm
      userForm: Object.assign({}, this.$store.state.userInfo),
      userFormRules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "昵称必须是1-10位的非空字符串",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 确认修改功能
    Modify() {
      // 兜底校验
      this.$refs.userFormRef.validate(async (valid) => {
        // 没通过
        if (!valid) return;
        // 通过
        // 发送Ajax
        const { data: res } = await this.$http({
          url: "/my/userinfo",
          method: "put",
          data: this.userForm,
        });
        if (res.code !== 0) return this.$message.error(res.message);
        this.$message.success(res.message);
        // 4. 更新用户信息成功，刷新 Vuex 中的数据

        this.$store.dispatch("initUserInfo");
      });
    },
    // 重置函数,清空表单
    reset() {
      // 每次重置，都把 store 中最新的值取出来，赋值给 userForm
      this.userForm = Object.assign({}, this.$store.state.userinfo);
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
