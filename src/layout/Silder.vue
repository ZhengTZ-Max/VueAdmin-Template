<template>
  <div class="silder">
    <!-- <div @click="isCollapse = !isCollapse" class="collapse-top">
      <i
        class="el-icon-d-arrow-left"
        :class="{ 'collapse-icon': isCollapse }"
      ></i>
    </div> -->
    <el-menu
      :default-active="actived"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <template v-for="(item, i) in menuList">
        <MenuItem :item="item" :key="i" :isCollapse="isCollapse"></MenuItem>
      </template>
    </el-menu>
    <div @click="isCollapse = !isCollapse" class="collapse">
      <i
        class="el-icon-d-arrow-left"
        :class="{ 'collapse-icon': isCollapse }"
      ></i>
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      isCollapse: false,
      menuList: [],
      actived: this.$route.fullPath || "",
    };
  },
  watch: {
    $route: function (v) {
      this.actived = v.fullPath;
    },
  },
  created() {
    let routes = this.$store.getters["user/menuList"];
    let routerList = this.filterRoutes(routes);
    this.menuList = this.filterHidden(routerList);
  },
  methods: {
    filterRoutes(list) {
      return list.map((item, index) => {
        console.log(item);
        if (item.showMenu) {
          return item;
        } else if (
          item.asyncComponent == "Layout" &&
          item.children &&
          item.children.length == 1
        ) {
          return item.children[0];
        }
        return item;
      });
    },
    filterHidden(list) {
      return list.filter((item, index) => {
        if (item.children && item.children.length) {
          item.children = this.filterHidden(item.children);
        }
        if (!item.hidden) {
          return item;
        }
      });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
};
</script>
<style lang="scss" scoped>
.silder {
  user-select: none;
  height: 100%;
  position: relative;
  .el-menu {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .icon {
    transition: 0.2s;
    &.collapse-icon {
      transform: rotate(-180deg);
    }
  }
  .collapse {
    cursor: pointer;
    font-size: 10px;
    width: 14px;
    height: 100px;
    position: absolute;
    right: -10px;
    top: calc(50% - 50px);
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 0 6px 6px 0;
    transition: 0.2s;
    &:hover {
      color: #409eff;
    }
    > i {
      @extend .icon;
    }
  }
  .collapse-top {
    cursor: pointer;
    height: 20px;
    width: calc(100% - 1px);
    background-color: #fff;
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: #409eff;
    }
    > i {
      @extend .icon;
    }
  }
}
</style>