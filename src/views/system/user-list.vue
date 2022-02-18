<template>
  <div class="user-list im-card">
    <el-form :inline="true" class="demo-form-inline user-form" size="mini">
      <!-- <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="success" @click="editUserVisible = true"
          >新增用户</el-button
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
      <template #headImgUrl="{ row }">
        <img
          class="headImg"
          :src="row.headImgUrl"
          :title="`${row.username}的头像`"
        />
      </template>
      <template #enabled="{ row }">
        <el-tag :type="row.enabled ? 'success' : 'danger'" effect="plain">
          {{ row.enabled ? "正常" : "禁用" }}
        </el-tag>
      </template>
      <template #action="{ row }">
        <div class="btn-options">
          <el-button type="text" @click="editUser(row)">编辑</el-button>
          <el-button type="text" @click="removeUser(row)" class="text-error"
            >删除</el-button
          >
        </div>
      </template>
    </Table>
    <Drawer
      :value.sync="editUserVisible"
      :title="toggleTitle"
      :loading="formLoading"
      @confirm="onSubmit"
    >
      <el-form class="editUser" ref="form" :model="userForm" label-width="90px">
        <el-form-item label="用户头像" size="mini">
          <img
            class="headImg"
            :src="userForm.headImgUrl ? userForm.headImgUrl : defaultImg"
          />
        </el-form-item>
        <el-form-item label="用户账号" size="mini" prop="username" required>
          <el-input
            v-model="userForm.username"
            clearable
            placeholder="请输入用户账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别" size="mini" prop="gender">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
            <el-option label="保密" :value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户住址" size="mini" prop="address">
          <el-input
            type="textarea"
            v-model="userForm.address"
            :rows="4"
            clearable
            placeholder="请输入用户住址"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号状态" size="mini" prop="enabled">
          <el-switch
            v-model="userForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </Drawer>
  </div>
</template>

<script>
import C from "@/components";

import {
  fetchUserList,
  insertUser,
  updateUser,
  deleteUser,
} from "@/api/system";
export default {
  components: {
    Table: C.Table,
    Drawer: C.Drawer,
  },
  data() {
    return {
      loading: false,
      userForm: {
        id: "",
        headImgUrl: "",
        username: "",
        gender: "",
        address: "",
        enabled: false,
      },
      formLoading: false,
      editUserVisible: false,
      columns: [
        {
          width: 50,
          label: "序号",
          type: "index",
          align: "center",
        },
        {
          width: 100,
          label: "头像",
          prop: "headImgUrl",
          align: "center",
          slotScope: true,
        },
        {
          width: 140,
          label: "账号",
          prop: "username",
          align: "left",
        },
        {
          width: 100,
          label: "性别",
          prop: "gender",
          align: "center",
        },
        {
          width: 260,
          label: "住址",
          prop: "address",
          align: "center",
        },
        {
          width: 120,
          label: "账号状态",
          prop: "enabled",
          align: "center",
          slotScope: true,
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
      data: [],
      defaultImg:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190124%2Fc602bf5eb25b4c58ac3f73e06327237b.jpeg",
    };
  },
  watch: {
    editUserVisible: function (v) {
      if (!v) this.userForm = this.$options.data().userForm;
    },
  },
  computed: {
    toggleTitle: function () {
      return this.userForm.id ? "编辑用户" : "新增用户";
    },
  },
  created() {
    this.getList();
  },
  methods: {
    editUser(row) {
      this.userForm = { ...this.userForm, ...row };
      this.editUserVisible = true;
    },
    onSubmit() {
      try {
        let form = this.userForm;
        if (!form.username) {
          Msg.warning("必须填写用户账号~");
          return false;
        }
        if (form.id) {
          this.editUserInfo();
        } else {
          this.addUserInfo();
        }
      } catch (e) {
        console.log(e);
        this.formLoading = false;
      }
    },
    async editUserInfo() {
      try {
        this.formLoading = true;
        let params = {
          ...this.userForm,
        };
        const res = await updateUser(params);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.editUserVisible = false;
        Msg.success("修改成功~");
        this.getList();
        this.formLoading = false;
      } catch (e) {
        console.log(e);
        this.formLoading = false;
      }
    },
    async addUserInfo() {
      try {
        this.formLoading = true;
        let params = {
          ...this.userForm,
          password: "123456",
        };
        const res = await insertUser(params);
        if (res.code != 0) {
          Msg.error(res.msg);
          return false;
        }
        this.editUserVisible = false;
        Msg.success("添加成功~");
        this.getList();
        this.formLoading = false;
      } catch (e) {
        console.log(e);
        this.formLoading = false;
      }
    },
    async removeUser(row) {
      try {
        this.$confirm(`是否删除 ${row.username} 该用户？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const res = await deleteUser([row.id]);
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
        // const res = await fetchUserList(params);
        this.loading = false;
        // if (res.code != 0) {
        //   Msg.error(res.msg);
        //   return false;
        // }
        let list=[
          {
            headImgUrl:"",
            username:"郑小智",
            gender:"男",
            address:"",
            enabled:"1",
            action:"",
          },
          {
            headImgUrl:"https://i.ibb.co/27Hr9WV/20220217110648.png",
            username:"郑小智2号",
            gender:"女",
            address:"西平县",
            enabled:0,
            action:"",
          }
        ]
        // this.data = this.filterUserList(res.page.list);
        this.data = this.filterUserList(list);
        // this.total = res.page.totalCount;
        this.total = list.length;
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    filterUserList(list) {
      return list.map((item, index) => {
        if (!item.headImgUrl || item.headImgUrl == "--------") {
          item.headImgUrl = this.defaultImg;
        }
        if (!item.gender) item.gender = "未知";
        if (!item.address) item.address = "未知地址";
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  .user-form {
    display: flex;
    justify-content: flex-end;
  }
  .editUser {
    width: 320px;
  }
  .headImg {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>