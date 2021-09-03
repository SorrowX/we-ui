<template>
  <el-popper-input
    style="width: 250px"
    placeholder="请选择"
    v-model="value"
    ref="popper"
  >
    <el-scrollbar-v2 height="280px" ref="scrollbar">
      <ul class="el-popper-input__list">
        <li
          v-for="num in 20"
          :key="num"
          class="el-popper-input__item"
          @click="handleClick(num)"
        >
          {{ num }}
        </li>
      </ul>
    </el-scrollbar-v2>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: {},
      };
    },
    methods: {
      handleClick(num) {
        this.value = {
          label: num,
          value: num,
        };
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
      },
    },
  };
</script>
