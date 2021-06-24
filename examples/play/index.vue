<template>
  <div style="margin: 20px;">
    <el-input-widget 
      v-model="input" 
      placeholder="请输入内容"
      :inputData="inputData"
    >
    </el-input-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello Element UI!',
        inputData: {
          props: {
            clearable: true,
            type: "textarea",
            rows: 2
            // suffixIcon: "el-icon-date",
            // prefixIcon: "el-icon-search",
          },
          // slots: {
          //   // slots这个配置选项不属于 $createElement api 中第二个参数选项对象中的属性,是我为了兼容el-input的全部功能,才特地添加的
          //   suffix: function(h) {
          //     return h("i", {
          //       staticClass: "el-input__icon el-icon-date",
          //       slot: "suffix",
          //     });
          //   },
          //   prefix: function(h) {
          //     // 添加点击事件
          //     const vm = this;
          //     return h("i", {
          //       staticClass: "el-input__icon el-icon-search",
          //       style: {
          //         cursor: "pointer",
          //       },
          //       slot: "prefix",
          //       on: {
          //         click() {
          //           vm.$message("点击事件");
          //         },
          //       },
          //     });
          //   },
          // },
        }
      };
    },
    mounted() {
      window.xxx = this
    }
  };
</script>
