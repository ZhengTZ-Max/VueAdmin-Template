<template>
  <div class="free-table">
    <el-table
      ref="refname"
      size="mini"
      :data="data"
      v-bind="$attrs"
      :row-key="getRowKeys"
      v-on="$listeners"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <template v-for="item in columns">
        <el-table-column
          v-if="item.type == 'selection'"
          :align="item.align || 'center'"
          :key="item.prop"
          v-bind="item"
          v-on="$listeners"
        >
        </el-table-column>
        <el-table-column
          v-else-if="item.type == 'index'"
          :align="item.align || 'center'"
          :key="item.prop"
          v-bind="item"
          v-on="$listeners"
        >
        </el-table-column>
        <el-table-column
          v-else-if="item.slotScope"
          :key="item.prop"
          v-bind="item"
          :align="item.align || 'center'"
          :reserve-selection="item.reserveSelection"
          v-on="$listeners"
        >
          <template slot-scope="scope">
            <slot :name="item.prop" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <free-column v-else :key="item.prop" v-bind="$attrs" :column="item" />
      </template>
    </el-table>

    <template v-if="pagination">
      <pagination v-if="data.length > 0" v-bind="$attrs" v-on="$listeners" />
    </template>
  </div>
</template>

<script>
import FreeColumn from "./FreeTable/Columu.vue";
import Pagination from "./Pagination.vue";
export default {
  /**
   * 使用
   * <Table
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
   * ---------------------------------------------------------
   * 
   * 监听方法
   *  @pagination - 监听分页操作（当前分页切换、最大分页条数）
   */
  name: "FreeTable",
  components: {
    FreeColumn,
    Pagination,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    column: {
      type: Array,
      default() {
        return [];
      },
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default() {
        return [];
      },
    },
    rowKey: {
      type: String,
      default: "id",
    },
    refname: {
      type: String,
      default: "name",
    },
  },
  data() {
    return {};
  },
  computed: {
    columns() {
      const { column } = this;
      return column.map((col) => {
        const it = Object.assign({}, col);
        return it;
      });
    },
  },
  watch: {},
  updated() {},
  methods: {
    getRowKeys(row) {
      return row[this.rowKey] && row[this.rowKey].toString();
    },
    getoutall() {
      this.$refs.refname.clearSelection();
    },
  },
};
</script>
<style scoped lang="scss">
</style>
