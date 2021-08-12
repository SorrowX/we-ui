<template>
  <div class="play">
    <el-scrollbar-v2 height="100px">
      <p v-for="item in 10" class="item">{{ item }}</p>
    </el-scrollbar-v2>
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
