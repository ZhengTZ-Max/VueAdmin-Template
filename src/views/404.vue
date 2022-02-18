<template>
  <div class="error-404">
    <img class="error-image" src="@/assets/layout/404.png" alt="" />
    <div class="error-info">
      <p>啊哦~ 没有找到该页面</p>
      <el-button @click="$router.replace('/')" type="primary" size="mini"
        >返回主页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this);
  },
};
</script>

<style lang="scss" scoped>
.error-404 {
  user-select: none;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  .error-image {
    width: 512px;
    height: 512px;
  }
  .error-info {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    > p {
      margin: 16px 0;
      font-size: 14px;
    }
    ::v-deep .el-button {
      width: 100px;
      font-weight: bold;
    }
  }
}
</style>