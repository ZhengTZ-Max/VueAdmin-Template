<template>
  <!-- 封装弹框 -->
  <div class="popup">
    <el-dialog
      :visible.sync="visible"
      :title="dialogTitle"
      :width="popupWidth"
      :before-close="handleClose"
      :close-on-click-modal="modalClose"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if="isConfirm">
        <el-button @click="handleClose" size="mini" v-if="cancel"
          >取 消</el-button
        >
        <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialogTitle: {
      type: String,
      default: "标题",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    popupWidth: {
      type: String,
      default: "宽度",
    },
    isConfirm: {
      //确定取消显示隐藏
      type: Boolean,
      default: false,
    },
    cancel: {
      //取消显示隐藏
      type: Boolean,
      default: true,
    },
    modalClose: {
      //点击遮罩层是否能显示隐藏
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    handleClose() {
      this.$emit("update:visible");
    },
  },
};
</script>
<style lang="scss">
.popup {
  .el-dialog {
    z-index: 10000;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .el-dialog__header {
    border-bottom: 1px solid var(--border-color);
  }
  .el-dialog__close.el-icon.el-icon-close {
    font-size: 20px;
    width: 17px;
    height: 17px;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__title {
    color: #72767b;
    font-size: 13px;
    font-weight: bold;
  }
  .el-dialog__footer {
    text-align: right;
  }
}
</style>