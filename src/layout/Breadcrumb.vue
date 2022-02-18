<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in list">
        <el-breadcrumb-item
          v-if="index + 1 != list.length"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
        <el-breadcrumb-item v-else :key="index">{{
          item.label
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  watch: {
    $route: {
      handler: "filterBread",
      immediate: true,
    },
  },
  computed: {},
  created() {},
  methods: {
    filterBread(route) {
      if (route && route.matched && route.matched.length) {
        this.list = route.matched.map((item, index) => {
          let row = {
            label: item.meta.title,
            path: item.path,
          };
          return row;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 16px;
}
</style>