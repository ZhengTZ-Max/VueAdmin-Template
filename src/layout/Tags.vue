<template>
  <div v-if="list.length" class="tags">
    <div class="list">
      <template v-for="(item, i) in list">
        <span
          :key="i"
          class="list-item"
          :class="{ actived: activedPath == item.path }"
          @click="setPath(item.path)"
          >{{ item.label }}
          <i @click.stop="remove(item, i)" class="el-icon-close text-error"></i>
        </span>
      </template>
    </div>
    <div class="clear text-error" @click="list = []">
      全部清空
      <i class="el-icon-delete"></i>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [], // 路由导航列表
      activedPath: "", // 选中时的路由
    };
  },
  watch: {
    // 监听路由变化 向路由导航列表添加
    $route: function (v) {
      let row = {
        label: v.meta.title,
        path: v.path,
      };
      this.filterRoutes(row);
    },
  },
  computed: {},
  created() {},
  methods: {
    /**
     * @description: 删除路由标签
     * @Date: 2021-09-26 17:25:30
     * @param {*} row
     * @param {*} i
     * @return {*}
     * @author: 郑智卿
     */
    remove(row, i) {
      if (this.list.length == 1) {
        this.list = [];
        return false;
      }
      if (row.path != this.activedPath) {
        this.list.splice(i, 1);
      } else {
        let path;
        if (i + 1 < this.list.length) {
          path = this.list[i + 1].path;
        } else if (i + 1 == this.list.length) {
          path = this.list[i - 1].path;
        }
        this.setPath(path);
        this.list.splice(i, 1);
      }
    },
    /**
     * @description: 设置路由路径
     * @Date: 2021-09-26 17:25:48
     * @param {*} path
     * @return {*}
     * @author: 郑智卿
     */
    setPath(path) {
      if (path == this.activedPath) {
        return false;
      }
      this.activedPath = path;
      this.$router.push(path);
    },
    /**
     * @description: 过滤已点击的路由
     * @Date: 2021-09-26 17:26:10
     * @param {*} row
     * @return {*}
     * @author: 郑智卿
     */
    filterRoutes(row) {
      if (!this.list.length) {
        this.list.push(row);
      } else {
        let isPush = this.list.some((item, index) => {
          return item.path == row.path;
        });
        if (!isPush) {
          this.list.push(row);
        }
      }
      this.activedPath = row.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  user-select: none;
  background: #fff;
  display: flex;
  align-items: center;
  .list {
    padding: 10px 16px;
    flex: 1;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 5px;
    }
    .list-item {
      cursor: pointer;
      margin: 0 8px;
      padding: 8px;
      border-radius: 3px;
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      word-break: keep-all;
      font-size: 12px;
      font-weight: bold;
      transition: 0.3s;
      &:hover {
        background: var(--primary-hover);
      }
      &:active {
        transform: scale(0.95);
      }
      &.actived {
        color: var(--primary);
        transform: scale(1.05);
        > i {
          font-weight: bold;
        }
      }
      > i {
        margin-left: 4px;
        &:hover {
          color: var(--error-hover);
        }
      }
    }
  }
  .clear {
    flex-shrink: 0;
    padding-right: 36px;
    padding-left: 16px;
    color: var(--error);
    cursor: pointer;
  }
}
</style>