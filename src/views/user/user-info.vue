<template>
  <Drawer
    :value.sync="visible"
    title="个人资料"
    width="100%"
    @confirm="onSubmit"
    direction="ttb"
    :isConfirm="false"
  >
    <div v-if="info" class="user-info">
      <el-form class="demo-form-inline" size="mini" label-width="100px">
        <el-row>
          <p class="info-label">组织架构</p>
          <el-divider></el-divider>
          <el-col :span="8">
            <el-form-item label="名字："
              ><span>{{ info.realName }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label=" 项目/部门："
              ><span>{{ info.realName }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位："
              ><span>{{ info.job }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职日期："
              ><span>{{ info.dateOfEntry }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="兼职部门："
              ><span>{{ info.secondDepartmentId }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="兼职职位："
              ><span>{{ info.secondJobId }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="登录账号："
              ><span>{{ info.username }}</span></el-form-item
            >
          </el-col>
        </el-row>
        <el-row>
          <p class="info-label">基本信息</p>
          <el-divider></el-divider>

          <el-col :span="8">
            <el-form-item label="名字："
              ><span>{{ info.realName }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别："
              ><span>{{ info.sex }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族："
              ><span>{{ info.nation }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="籍贯："
              ><span>{{ info.homeAddress }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号："
              ><span>{{ info.idNumber }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生年月："
              ><span>{{ info.realName }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄："
              ><span>{{ info.age }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证住址："
              ><span>{{ info.idCardAddress }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历："
              ><span>{{ info.education }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业院校："
              ><span>{{ info.graduateSchool }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="所修专业："
              ><span>{{ info.major }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="现居住地："
              ><span>{{ info.currentAddress }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌："
              ><span>{{ info.politicalOutlook }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话："
              ><span>{{ info.phone }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序："
              ><span>{{ info.sort }}</span></el-form-item
            >
          </el-col>
        </el-row>
        <el-row>
          <p class="info-label">岗位情况</p>
          <el-divider></el-divider>

          <el-col :span="8">
            <el-form-item label="职务："
              ><span>{{ info.job }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="考勤号："
              ><span>{{ info.attendance }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="工龄："
              ><span>{{ info.job }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司固话："
              ><span>{{ info.job }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行账号："
              ><span>{{ info.bankNo }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行信息："
              ><span>{{ info.job }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行行号："
              ><span>{{ info.bankInformation }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱："
              ><span>{{ info.email }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="劳务合同："
              ><span>{{ info.ifSignContract }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="签订日期："
              ><span>{{ info.signContractDate }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同开始日期："
              ><span>{{ info.contractStartDate }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同结束日期："
              ><span>{{ info.contractEndDate }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="离职日期："
              ><span>{{ info.departureDate }}</span></el-form-item
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
  </Drawer>
</template>

<script>
import C from "@/components";
import { fetchUserInfo } from "@/api/user";
export default {
  components: {
    Drawer: C.Drawer,
  },
  data() {
    return {
      visible: true,
      info: null,
    };
  },
  watch: {
    visible: function (v) {
      if (!v) {
        this.$emit("close");
      }
    },
  },
  computed: {},
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        let params = {
          id: $Storage.get("userId"),
        };
        const res = await fetchUserInfo(params);
        if (res.ret != 200) {
          Msg.error(res.msg);
          return;
        }
        this.info = res.data;
        for (const key in this.info) {
          if (key == "sex") {
            this.info[key] = this.info[key] == 0 ? "男" : "女";
          } else {
            this.info[key] = this.info[key] || "无";
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    onSubmit() {
      console.log(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  max-width: 1200px;
  min-width: 1000px;
  color: #303030;
  margin: 0 auto;
  .info-label {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin: 30px 0;
  }
  ::v-deep .el-form .el-form-item {
    margin: 16px 0;
    padding: 0 16px;
    display: flex;
    .el-form-item__label {
      font-weight: bold;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>