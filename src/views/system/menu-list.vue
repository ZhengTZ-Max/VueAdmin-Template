<template>
  <div class="im-card menu-list">
    <!-- <div v-loading="rolesLoading" class="left">
      <p class="label-text">角色列表</p>
      <ul class="role-list">
        <li
          v-for="item in rolesList"
          :key="item.code"
          @click="currentRole = item.code"
          :class="{ actived: currentRole == item.code }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div> -->
    <div class="right" v-loading="treeLoading">
      <div class="r-title label-text">
        <p>菜单列表</p>
        <el-button
          @click="editRouterShow = true"
          type="success"
          size="mini"
          icon="el-icon-plus"
          >添加菜单</el-button
        >
      </div>
      <el-tree
        :data="data"
        :props="defaultProps"
        default-expand-all
        draggable
        :render-content="renderContent"
        :expand-on-click-node="false"
      ></el-tree>
    </div>
    <Drawer
      v-if="editRouterShow"
      width="35%"
      :value.sync="editRouterShow"
      :title="toggleTitle"
      @confirm="onSubmit"
    >
      <el-form
        class="addRouterForm"
        ref="form"
        :model="routerForm"
        label-width="100px"
        :rules="rules"
      >
        <p class="label-text">基本信息</p>
        <el-form-item label="路由名称" size="mini" prop="title">
          <el-input
            v-model="routerForm.title"
            clearable
            placeholder="请输入路由名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由地址" size="mini" prop="path">
          <el-input
            v-model="routerForm.path"
            clearable
            placeholder="请输入路由地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="组件路径"
          size="mini"
          prop="component"
          :required="!routerForm.jump"
        >
          <el-input
            v-model="routerForm.component"
            clearable
            placeholder="请输入组件路径"
          ></el-input>
        </el-form-item>
        <p class="label-text">路由拓展</p>
        <el-form-item label="路由图标" size="mini">
          <el-input
            v-model="routerForm.icon"
            clearable
            placeholder="请输入Element Icon图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由重定向" size="mini">
          <el-input
            v-model="routerForm.redirect"
            clearable
            placeholder="请输入路由重定向地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由缓存" size="mini">
          <el-switch
            v-model="routerForm.noCache"
            active-color="#67C23A"
            inactive-color="#F56C6C"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否隐藏" size="mini">
          <el-switch
            v-model="routerForm.hidden"
            active-color="#67C23A"
            inactive-color="#F56C6C"
          ></el-switch>
        </el-form-item>
        <el-form-item label="外部链接" size="mini">
          <el-switch
            v-model="routerForm.jump"
            active-color="#67C23A"
            inactive-color="#F56C6C"
          ></el-switch>
        </el-form-item>
      </el-form>
    </Drawer>
  </div>
</template>

<script>
import C from "@/components";
import {
  getMenuList,
  addMenu,
  updateMenu,
  deleteMenu,
  fetchAllRoles,
} from "@/api/system.js";
export default {
  components: {
    Drawer: C.Drawer,
  },
  data() {
    const checkComponent = (rule, value, callback) => {
      if (this.routerForm.jump) {
        callback();
      } else if (!this.routerForm.jump && !value) {
        callback(new Error("请输入组件地址"));
      }
      callback();
    };
    return {
      currentRole: "admin",
      rolesLoading: false,
      rolesList: [
        { name: "管理员", code: "1" },
        { name: "测试人员", code: "2" },
      ],
      editRouterShow: false,
      routerForm: {
        title: "",
        path: "",
        component: "",
        icon: "",
        redirect: "",
        noCache: false,
        hidden: false,
        jump: false,
      },
      treeLoading: false,
      defaultProps: {
        children: "children",
        label: "title",
      },
      data: [],
      rules: {
        title: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
        path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
        component: [{ validator: checkComponent, trigger: "blur" }],
      },
    };
  },
  watch: {
    editRouterShow: function (v) {
      if (!v) this.routerForm = this.$options.data().routerForm;
    },
  },
  computed: {
    toggleTitle() {
      let row = this.routerForm;
      if (row.id) {
        return "修改路由信息";
      } else if (row.parentId || row.parentId == 0) {
        return "添加子级路由";
      } else {
        return "添加菜单";
      }
    },
  },
  created() {
    // this.getRoles();
    // this.getTreeList();
    this.data = this.$store.getters["user/menuList"];
  },
  methods: {
    async getRoles() {
      try {
        this.rolesLoading = true;
        const res = await fetchAllRoles();
        this.rolesLoading = false;
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.rolesList = res.data;
      } catch (e) {
        console.log(e);
        this.rolesLoading = false;
      }
    },
    async getTreeList() {
      try {
        this.treeLoading = true;
        const res = await getMenuList();
        this.treeLoading = false;
        this.data = res.data;
      } catch (e) {
        console.log(e);
        this.treeLoading = false;
      }
    },
    // /system/user-list
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.routerForm.id) {
            this.updateMenuInfo();
          } else {
            this.addMenuList();
          }
        } else {
          Msg.waring("请输入完整信息！");
        }
      });
    },
    async addMenuList() {
      try {
        let params = { ...this.routerForm };
        const res = await addMenu(params);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.editRouterShow = false;
        Msg.success("添加成功~");
        this.getTreeList();
      } catch (e) {
        console.log(e);
      }
    },
    async updateMenuInfo() {
      try {
        let params = { ...this.routerForm };
        const res = await updateMenu(params);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.editRouterShow = false;
        Msg.success("修改成功~");
        this.getTreeList();
      } catch (e) {
        console.log(e);
      }
    },
    async removeMenu() {
      try {
        const res = await deleteMenu(this.routerForm.removeIds);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        Msg.success("删除成功~");
        this.getTreeList();
      } catch (e) {
        console.log(e);
      }
    },
    edit(data) {
      let params = {
        id: data.id,
        title: data.title,
        path: data.path,
        component: data.component,
        icon: data.icon,
        redirect: data.redirect,
        noCache: data.noCache,
        hidden: data.hidden,
        jump: data.jump,
      };
      this.routerForm = { ...this.routerForm, ...params };
      this.editRouterShow = true;
    },
    append(data) {
      let params = {
        parentId: data.id,
      };
      this.routerForm = { ...this.routerForm, ...params };
      this.editRouterShow = true;
    },
    remove(node, data) {
      let params = {
        ...this.routerForm,
        removeIds: [data.id],
      };
      this.routerForm = params;
      this.$confirm(`是否删除 ${data.title} 路由`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.removeMenu();
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <div>
            <el-button
              size="mini"
              type="text"
              class="text-success"
              icon="el-icon-plus"
              on-click={() => this.append(data)}
            >
              添加下级路由
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              on-click={() => this.edit(data)}
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              class="text-error"
              icon="el-icon-delete"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </div>
        </span>
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-list {
  min-width: 500px;
  user-select: none;
  display: flex;
  .left {
    padding-right: 20px;
    width: 200px;
    min-width: 150px;
    border-right: 1px solid var(--border-color);
    .role-list {
      > li {
        cursor: pointer;
        transition: 0.2s;
        padding: 10px 16px;
        font-weight: bold;
        border-left: 2px solid transparent;
        &:hover {
          background-color: var(--primary-hover);
        }
        &.actived {
          color: var(--primary);
          background-color: var(--primary-hover);
          border-left: 2px solid var(--primary);
        }
      }
    }
  }
  .right {
    padding-left: 20px;
    flex: 1;
    .r-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > p {
        font-size: 13px;
      }
    }
  }
  ::v-deep .el-tree-node__label {
    font-size: 12px;
  }
  .addRouterForm {
    max-width: 320px;
  }
  ::v-deep .custom-tree-node {
    width: 100%;
    display: flex;
    align-items: center;
    > div {
      margin-left: 16px;
      opacity: 0;
      transition: 0.3s;
      > button {
        margin: 0 6px;
      }
    }
    &:hover {
      > div {
        opacity: 1;
      }
    }
  }
}
</style>