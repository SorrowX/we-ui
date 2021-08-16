<template>
  <div class="play">
    <el-scrollbar-v2 height="200px">
      <p v-for="item in 10" class="item">{{ item }}</p>
    </el-scrollbar-v2>

    <!-- <el-scrollbar-v2 height="400px">
      <p class="el-scrollbar-v2__item" v-for="item in 20">{{ item }}</p>
    </el-scrollbar-v2> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      
    }
  };
</script>

<style>
/* .play {
  border: 1px solid green;
}
.item {
  height: 40px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  border: 1px solid #f1f1f1;
  width: 15000px;
} */
</style>
