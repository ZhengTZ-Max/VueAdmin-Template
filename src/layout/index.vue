<template>
  <el-container class="layout">
    <el-header class="layout-header">
      <Header />
    </el-header>
    <el-container class="layout-content">
      <el-aside class="layout-aside">
        <Silder />
      </el-aside>
      <el-container>
        <Tags />
        <el-main class="layout-main">
          <Breadcrumb />
          <transition name="fade" mode="out-in">
            <router-view> </router-view>
          </transition>
        </el-main>
        <el-footer class="layout-footer">
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Header from "./Header.vue";
import Silder from "./Silder.vue";
import Footer from "./Footer.vue";
import Breadcrumb from "./Breadcrumb.vue";
import Tags from "./Tags.vue";
export default {
  name: "layout",
  components: {
    Header,
    Silder,
    Footer,
    Breadcrumb,
    Tags,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(.95);
}
.layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
  .layout-header {
    background: var(--headerBg);
    color: #fff;
    display: flex;
    align-items: center;
  }
  .layout-content {
    overflow: hidden;
    .layout-aside {
      width: inherit !important;
      overflow: revert;
    }
    .layout-main {
      padding: 20px 12px;
    }
    .layout-footer {
      height: inherit !important;
      background: #fff;
      padding: 0 20px;
      border-top: 1px solid #e7e7e7;
    }
  }
}
</style>