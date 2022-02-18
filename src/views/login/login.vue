<template>
  <div class="login">
    <div class="toptit">
      <p class="title">通用模板</p>
      <p class="sub-title">Template Management</p>
    </div>
    <div class="login-from">
      <div class="top-txt">
        <span>登录系统</span>
        <p>Login System</p>
      </div>
      <div class="from">
        <el-form :model="this">
          <el-form-item label="">
            <el-input
              v-model="userName"
              maxlength="11"
              prefix-icon="el-icon-user"
              placeholder="手机号/User Name"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              maxlength="16"
              v-model="passWord"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="密码/Password"
              @keyup.enter.native="loginBtn"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="LoginBT" @click="loginBtn">
              进入系统
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserInfo, fetchUserCurrent } from "@/api/user.js";
import { mapActions } from "vuex";
export default {
  components: {
    mapActions,
  },
  data() {
    return {
      userName: "",
      passWord: "",
    };
  },
  mounted() {
    // this.gettoken();
  },
  methods: {
    ...mapActions("user", {
      setAuth: "actionAuth",
    }),
    // gettoken() {
    //   var token = window.location.href
    //     .split("?")[1]
    //     .split("&")[0]
    //     .split("=")[1];
    //   $Storage.set("auth", token);
    //   if (token) {
    //     this.getsiteid();
    //   } else {
    //     this.$router.push("/login");
    //   }
    // },
    async loginBtn() {
      if (!this.userName || !this.passWord) {
        this.$message({
          message: "请填写账号密码",
          type: "warning",
        });
        return false;
      }

      $Storage.set("auth", true);
      this.setAuth(true);
      this.$notify({
        title: "登录成功",
        type: "success",
      });
      setTimeout(()=>{
      this.$router.push("/");

      },1000)

    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  user-select: none;
  width: 100%;
  height: 100vh;
  background: url(../../assets/layout/banner.jpg) no-repeat;
  background-size: cover;
  .toptit {
    position: fixed;
    left: 3vh;
    top: 3vh;
    .title {
      font-size: 2.5vh;
      font-weight: bold;
      color: #fff;
    }
    .sub-title {
      padding-top: 1vh;
      font-size: 0.2vh;
      color: #fff;
    }
  }
  .login-from {
    position: absolute;
    padding: 0.1vh 3vh;
    top: 25%;
    right: 15%;
    width: 40vh;
    height: 40vh;
    background-color: #fff;
    border-radius: 3%;
    .top-txt {
      margin: 2vh 0vh 4vh 0.6vh;
      letter-spacing: 0.02vh;
      span {
        color: #4079c9;
        font-size: 3vh;
      }
      p {
        font-size: 1.8vh;
        color: #888;
      }
    }
    .a1 .el-input__inner {
      width: 100%;
      height: 1vh;
      border: #4079c9 1px solid;
    }
    .a1 .el-input__icon {
      font-size: 0.4vh;
      color: #4079c9;
    }
    .from .LoginBT {
      margin-top: 1vh;
      width: 100%;
      height: 6vh;
    }
  }
}
</style>