<template>
  <div style="margin: 20px;">
    <el-image-viewer :url-list="urlList" />
  </div>
</template>

<script>
  import widgets from 'element-ui/packages/widgets/src/widgets';

  const ElUploadWidget = widgets.upload;
  export default {
    components: { ElUploadWidget },
    data() {
      return {
        urlList: ['../assets/test/2.jpg', 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'],
      };
    },
    mounted() {
      window.xxx = this.$widgets
    }
  };
</script>
