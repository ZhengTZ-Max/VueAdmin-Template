<template>
  <el-drawer
    :withHeader="showHeader"
    :title="title"
    :visible.sync="value"
    :direction="direction"
    :before-close="handleClose"
    :size="width"
    :wrapperClosable="wrapperClosable"
  >
    <div class="D-content" v-loading="loading">
      <div class="container">
        <slot></slot>
      </div>
      <div v-if="isConfirm" class="footer">
        <el-button
          class="btn"
          type="primary"
          v-if="isConfirm1"
          @click="onSubmit"
          size="mini"
          >确认并继续添加</el-button
        >
        <el-button
          class="btn"
          type="primary"
          v-if="isConfirm2"
          @click="onSubmit2"
          size="mini"
          >保存为草稿</el-button
        >
        <el-button size="mini" type="primary" @click="confirm">确认</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "Drawer",

  /**
   * 用法 -
   *  引入 - import C from "@/components";
   *  注册局部组件 -
   *    components:{
   *      Drawer:C.Drawer
   *    }
   *  使用 -
       <Drawer
         :value.sync="visible"
         :title="title"
         @confirm="onSubmit"
       >
         ...此处编写内容
       </Drawer>
   
   * 参数 -
   * props:{
   *   value: - 默认隐藏
   *   title:标题
   *   showHeader:是否显示头部 - 默认显示
   *   width:弹框宽度(百分比) - 默认为30%
   *   loading:是否显示弹框内容加载
   *   isConfirm:是否显示底部确认/取消按钮 - 默认显示
   *   wrapperClosable 点击遮罩层是否关闭 - 默认关闭
   * }
   */
  props: {
    value: {
      type: Boolean,
      defalut: "",
    },
    title: {
      type: String,
      default: "",
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [String, Number],
      default: "30%",
    },
    direction: {
      type: String,
      defalut: "rtl",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isConfirm: {
      type: Boolean,
      default: true,
    },
    isConfirm1: {
      type: Boolean,
      default: false,
    },
    wrapperClosable: {
      type: Boolean,
      default: false,
    },
    isConfirm2: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    onSubmit() {
      this.$emit("onSubmit");
    },
    handleClose() {
      this.$emit("update:value", false);
    },
    onSubmit2() {
      this.$emit("onSubmit2");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer {
  #el-drawer__title {
    margin-bottom: 0;
    padding: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    > span {
      font-size: 13px;
      font-weight: bold;
    }
    > button {
      > i {
        font-size: 14px;
      }
    }
  }
  .el-drawer__body {
    padding: 16px 0px 16px 16px;
    overflow-x: hidden;
    .el-form-item__label {
      font-size: inherit;
    }
    .D-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      .container {
        flex: 1;
        overflow-y: auto;
      }
      .footer {
        margin: 0 -16px;
        padding: 16px 0;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>