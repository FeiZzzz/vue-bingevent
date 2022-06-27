<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img
              v-if="userInfo.user_pic"
              :src="userInfo.user_pic"
              alt=""
              class="avatar"
            />
            <img v-else src="../../assets/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="logOut"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <!-- 左侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img v-if="userInfo.user_pic" :src="userInfo.user_pic" alt="" />
          <img v-else src="../../assets/logo.png" alt="" />
          <span
            >欢迎
            {{
              userInfo.nickname ? userInfo.nickname : userInfo.username
            }}</span
          >
        </div>
        <!-- 左侧菜单栏 -->
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template v-for="item in menus">
            <!-- 不包含子菜单的“一级菜单” -->
            <el-menu-item
              :index="item.indexPath"
              :key="item.indexPath"
              v-if="!item.children"
              ><i :class="item.icon"></i>{{ item.title }}</el-menu-item
            >
            <!-- 包含子菜单的“一级菜单” -->
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                :index="items.indexPath"
                v-for="items in item.children"
                :key="items.indexPath"
                ><i :class="items.icon"></i>{{ items.title }}</el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Main",
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    // 登出函数
    logOut() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          //  确认退出，清空 token
          this.$store.commit("updateToken", "");
          // 并跳转到登录页
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 获取左侧菜单函数
    async getMenu() {
      const { data: res } = await this.$http({
        method: "get",
        url: "/my/menus",
      });
      // console.log(res);
      if (res.code !== 0) return;
      this.menus = res.data;
    },
  },
  computed: {
    // 通过 `mapState` 辅助函数，从 vuex 中把 `token` 映射到当前组件中使用
    ...mapState(["userInfo", "token"]),
  },
  //   在 created 生命周期钩子函数里面 调用 actions 函数
  created() {
    this.$store.dispatch("initUserInfo");

    // 判断token 是否有值
    if (this.token) {
      // 有值就请求数据
      this.getMenu();
    } else {
      // 没有就跳转到首页
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
