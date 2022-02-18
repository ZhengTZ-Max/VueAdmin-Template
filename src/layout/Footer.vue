<template>
  <div class="footer">
    Copyright © 2018 All Rights Resreved | 京ICP备13038154号-6
    河南xxx荣誉出品
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  user-select: none;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #909399;
  font-size: 12px;
  text-align: center;
  // 超出隐藏
  overflow: hidden; //超出隐藏
  text-overflow: ellipsis; // 超出显示省略号
  -webkit-line-clamp: 1; // 显示行数
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>