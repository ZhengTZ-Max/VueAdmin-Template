<template>
  <div>
    <el-menu-item
      v-if="!(item.children && item.children.length)"
      :index="item.path"
    >
      <template v-if="item">
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
    </el-menu-item>
    <el-submenu v-else :index="item.path" :class="{ collapse: isCollapse }">
      <template slot="title">
        <i v-if="item.icon" :class="item.icon"></i>
        <span v-show="!isCollapse">{{ item.title }}</span>
      </template>
      <template v-for="(ele, current) in item.children">
        <menu-item :key="current" :item="ele"></menu-item>
      </template>
    </el-submenu>
  </div>
  <!--  
    关于el-submenu下的问题
      问题1. - :class="{ collapse: isCollapse }"
      问题2. -  <span v-show="!isCollapse">{{ item.title }}</span>

    解决动态渲染路由 侧边栏收缩时文字及图标为隐藏
  -->
</template>

<script>
export default {
  name: "menu-item",
  props: {
    // Prors传入的菜单路由信息
    item: {
      type: Object,
      default: null,
    },
    // 菜单是否收缩
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
// 菜单收缩时 使用::v-deep 样式深层穿透 将箭头Icon图标隐藏
.collapse {
  ::v-deep .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
</style>