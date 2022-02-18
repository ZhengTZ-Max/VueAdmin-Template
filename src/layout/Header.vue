<template>
  <div class="header">
    <div class="h-left">
      <img src="@/assets/layout/logo.png" alt="" />
      <h1 class="title">Manage</h1>
    </div>
    <div class="h-right">
      <el-tooltip :content="`您暂无消息哦~`" placement="bottom" effect="light">
        <el-badge :value="total" :max="99" class="h-r-item message">
          <i
            class="el-icon-message-solid"
            @click="isMsgShow = !isMsgShow"
          ></i>
        </el-badge>
      </el-tooltip>
      <div class="h-r-item avatar">
        <el-dropdown placement="bottom" @command="handleCommand">
          <el-avatar
            :size="36"
            :src="
              userInfo.headImgUrl ||
              'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            "
          ></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="baseInfo">个人资料</el-dropdown-item>
            <!-- <el-dropdown-item>个人设置</el-dropdown-item> -->
            <el-dropdown-item command="outLogin" class="text-error"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>{{ userInfo.realName }}</div>
      <div class="h-r-item user-status">
        <el-popover placement="bottom" v-model="statusVisible" trigger="hover">
          <p style="margin: 6px 0">
            是否切换至
            <b :style="{ color: status ? '#67c23a' : '#c0c4cc' }">{{
              status ? "在线" : "离线"
            }}</b>
            状态？
          </p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="statusVisible = false"
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="statusTigger"
              >确定</el-button
            >
          </div>
          <div slot="reference">
            <span v-show="!status" class="status-item success">在线</span>
            <span v-show="status" class="status-item leave">离线</span>
          </div>
        </el-popover>
      </div>
    </div>
    <UserInfo v-if="isShowInfo" @close="isShowInfo = false" />
  </div>
</template>

<script>
import UserInfo from "@/views/user/user-info";
import { mapActions } from "vuex";
import { selectAllByUserId } from "@/api/user.js";
export default {
  components: {
    UserInfo,
    mapActions,
  },
  // props: {
  //   num: {
  //     type: Number,
  //     default: "",
  //   },
  // },
  data() {
    return {
      msgList: [],
      total: 0,
      isMsgShow: false,
      status: false,
      statusVisible: false,
      isShowInfo: false,
      userInfo: $Storage.get("userInfo") || {},
    };
  },
  created() {
    // this.getMsgs();
  },
  // watch: {
  //   num: function (v) {
  //     if (this.num == 1) {
  //       this.getMsgs();
  //     }
  //   },
  // },
  methods: {
    ...mapActions("user", {
      setMenuList: "actionMenuList",
    }),

    statusTigger() {
      this.statusVisible = false;
      this.status = !this.status;
      Msg.success(`您已切换至${!this.status ? "在线" : "离线"}状态~`);
    },
    handleCommand(type) {
      if (type == "outLogin") {
        this.removeAuth();
      } else if (type == "baseInfo") {
        this.isShowInfo = true;
      }
    },
    removeAuth() {
      $Storage.clear();
      this.setMenuList(null);
      this.$router.replace("/login");
      this.$notify({
        title: "您已退出该系统~",
        type: "success",
      });
    },
  },
};
</script>
<style lang="scss">
.infobox {
  height: 150px;
  overflow-y: scroll;
}
.el-tooltip__popper.is-light {
  border: 1px solid var(--border-color);
}
#info {
  cursor: pointer;
  padding: 5px 10px;
  border-bottom: 1px dashed var(--border-color);
  &:nth-last-child(1) {
    border-bottom: none;
  }
  &:hover {
    background: cornflowerblue;
    color: #fff;
  }
  & span:nth-last-child(1) {
    float: right;
  }
}
</style>
<style lang="scss" scoped>
.header {
  user-select: none;
  padding: 0 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .h-left {
    display: flex;
    align-items: center;
    > img {
      width: 32px;
      height: 32px;
    }
    .title {
      margin: 0 16px;
      font-size: 16px;
      // 超出隐藏
      overflow: hidden; //超出隐藏
      text-overflow: ellipsis; // 超出显示省略号
      -webkit-line-clamp: 1; // 显示行数
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
  .h-right {
    display: flex;
    align-items: center;
    .h-r-item {
      margin: 0 12px;
      &:last-child {
        margin-right: 0;
      }
    }
    .message {
      cursor: pointer;
      margin: 0 18px;
      > i {
        font-size: 20px;
      }
    }
    .avatar {
      cursor: pointer;
    }
    .user-status {
      cursor: pointer;
      .status-item {
        font-weight: bold;
        padding-left: 12px;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: calc(50% - 3px);
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
      }
      .success {
        &::before {
          background-color: #67c23a;
        }
      }
      .leave {
        &::before {
          background-color: #c0c4cc;
        }
      }
    }
  }
}
</style>