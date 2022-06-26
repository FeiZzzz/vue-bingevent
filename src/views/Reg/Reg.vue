<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="regForm" :rules="regRules" ref="regRef">
        <el-form-item prop="username">
          <el-input
            v-model="regForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="regForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="regForm.repassword"
            placeholder="请输入确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
              <el-button type="primary"  class="btn-reg" @click="register">注册</el-button>
        </el-form-item>
        
          <el-link type="primary" @click="$router.push('/login')" style="margin-bottom:10px">去登陆</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    var rePwd = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 注册表单的数据对象
      regForm: {
        username: "",
        password: "",
        repassword: "",
      },
      // 注册表单的验证规则对象
      regRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: "字母数字、长度 1-10", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
             pattern: /^\S{6,15}$/,
            message: "非空字符串、长度 6-15",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: rePwd, trigger: "blur" },
        ],
      },
    };
  },
  methods:{
    // 注册
    register() {
    // 兜底校验
    this.$refs.regRef.validate( async valid => {
        if(!valid) return
        const {data:res } = await this.$http({
            method:'post',
            url:'/api/reg',
            data:this.regForm
        })
        // console.log(res);
        //  注册失败
        if(res.code !== 0) return this.$message.error(res.message)
        // 注册成功
        this.$message.success(res.message)
        // 并跳转到登录页
        this.$router.push('/login')
    })
    }
  }
};
</script>

<style lang="less" scoped>
.reg-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }
  }
}
.reg-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }

    .btn-reg {
      width: 100%;
      
    }
  }
}
</style>
