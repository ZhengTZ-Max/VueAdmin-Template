<template>
  <div class="role-list im-card">
    <el-form :inline="true" class="demo-form-inline user-form" size="mini">
      <!-- <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="success" @click="editRoleVisible = true"
          >新增角色</el-button
        >
      </el-form-item>
    </el-form>
    <Table
      v-loading="loading"
      :data="data"
      :column="columns"
      size="mini"
      :pagination="true"
      :total="total"
      :page.sync="page"
      :limit.sync="pageSize"
      :page-sizes="[5, 10, 20]"
      @pagination="getList"
    >
      <template #action="{ row }">
        <div class="btn-options">
          <el-button type="text" @click="editRole(row)">编辑</el-button>
          <el-button type="text" @click="removeRole(row)" class="text-error"
            >删除</el-button
          >
        </div>
      </template>
    </Table>
    <Drawer
      :value.sync="editRoleVisible"
      :title="toggleTitle"
      :loading="formLoading"
      @confirm="onSubmit"
    >
      <p class="label-text">角色信息</p>
      <el-form class="editRole" ref="form" :model="roleForm" label-width="90px">
        <el-form-item label="角色编码" size="mini" prop="code" required>
          <el-input
            v-model="roleForm.code"
            clearable
            placeholder="请输入角色编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色名称" size="mini" prop="name" required>
          <el-input
            v-model="roleForm.name"
            clearable
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" size="mini" prop="roleDescribe" required>
          <el-input
            v-model="roleForm.roleDescribe"
            clearable
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" size="mini" prop="note">
          <el-input
            type="textarea"
            :rows="4"
            v-model="roleForm.note"
            clearable
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <p class="label-text">角色菜单权限</p>
        <div class="tree-list">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            draggable
            :expand-on-click-node="false"
          ></el-tree>
        </div>
      </el-form>
    </Drawer>
  </div>
</template>

<script>
import C from "@/components";
import {
  getRoleList,
  insertRole,
  updateRole,
  deleteRole,
  getMenuList,
} from "@/api/system";
export default {
  components: {
    Table: C.Table,
    Drawer: C.Drawer,
  },
  data() {
    return {
      treeLoading: false,
      defaultProps: {
        children: "children",
        label: "title",
      },
      treeData: [],
      loading: false,
      roleForm: {
        id: "",
        code: "",
        name: "",
        roleDescribe: "",
        note: "",
      },
      formLoading: false,
      editRoleVisible: false,
      columns: [
        {
          width: 50,
          label: "序号",
          type: "index",
          align: "center",
        },
        {
          width: 100,
          label: "角色编码",
          prop: "code",
          align: "center",
        },
        {
          width: 120,
          label: "角色名称",
          prop: "name",
          align: "center",
        },
        {
          width: 140,
          label: "角色描述",
          prop: "roleDescribe",
          align: "center",
        },
        {
          label: "备注",
          prop: "note",
          align: "center",
        },
        {
          width: 140,
          label: "创建时间",
          prop: "createTime",
          align: "center",
        },
        {
          minWidth: 100,
          label: "操作",
          prop: "action",
          align: "center",
          slotScope: true,
        },
      ],
      total: 0,
      page: 1,
      pageSize: 5,
      data: [
        {
          code:"admin",
          name:"管理员",
          roleDescribe:"管理人员",
          note:"管理员备注",
          createTime:"2021-09-17"
        },
        {
          code:"test",
          name:"测试人员",
          roleDescribe:"测试人员",
          note:"测试人员备注",
          createTime:"2021-09-17"
        },
      ],
    };
  },
  watch: {
    editRoleVisible: function (v) {
      if (!v) this.roleForm = this.$options.data().roleForm;
    },
  },
  computed: {
    toggleTitle: function () {
      return this.roleForm.id ? "编辑角色" : "新增角色";
    },
  },
  created() {
    // this.getList();
    // this.getTreeList();
  },
  methods: {
    async getTreeList() {
      try {
        this.treeLoading = true;
        const res = await getMenuList();
        this.treeLoading = false;
        this.treeData = res.data;
      } catch (e) {
        console.log(e);
        this.treeLoading = false;
      }
    },
    editRole(row) {
      this.roleForm = { ...this.roleForm, ...row };
      this.editRoleVisible = true;
    },
    onSubmit() {
      try {
        let form = this.roleForm;
        if (!form.code) {
          Msg.warning("必须填写角色编码~");
          return false;
        } else if (!form.name) {
          Msg.warning("必须填写角色名称~");
          return false;
        } else if (!form.roleDescribe) {
          Msg.warning("必须填写角色描述~");
          return false;
        }
        if (form.id) {
          this.editRoleInfo();
        } else {
          this.addRoleInfo();
        }
      } catch (e) {
        console.log(e);
        this.formLoading = false;
      }
    },
    async editRoleInfo() {
      try {
        this.formLoading = true;
        let params = {
          ...this.roleForm,
        };
        const res = await updateRole(params);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.editRoleVisible = false;
        Msg.success("修改成功~");
        this.getList();
        this.formLoading = false;
      } catch (e) {
        console.log(e);
        this.formLoading = false;
      }
    },
    async addRoleInfo() {
      try {
        this.formLoading = true;
        let params = {
          ...this.roleForm,
        };
        const res = await insertRole(params);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.editRoleVisible = false;
        Msg.success("添加成功~");
        this.getList();
        this.formLoading = false;
      } catch (e) {
        console.log(e);
        this.formLoading = false;
      }
    },
    async removeRole(row) {
      try {
        this.$confirm(`是否删除 ${row.name} 该角色？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await deleteRole([row.id]);
          if (res.code != 0) {
            Msg.error(res.msg);
            return false;
          }
          Msg.success("删除成功~");
          this.getList();
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getList() {
      try {
        this.loading = true;
        let params = {
          current: this.page,
          size: this.pageSize,
        };
        const res = await getRoleList(params);
        this.loading = false;
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.data = res.page.list;
        this.total = res.page.totalCount;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    renderContent(h, { node, data, store }) {
      console.log(store);
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
.role-list {
  .user-form {
    display: flex;
    justify-content: flex-end;
  }
  .editRole {
    width: 320px;
  }
  .headImg {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  .tree-list {
    padding: 6px 12px;
  }
  ::v-deep .el-tree-node__label {
    font-size: 12px;
  }
}
</style>