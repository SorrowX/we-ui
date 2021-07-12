<template>
  <div style="margin: 20px;">
    <el-upload-widget v-model="fileList" :uploadData="uploadData1">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload-widget>

    <el-upload-widget v-model="fileList" :uploadData="uploadData2">
    </el-upload-widget>
  </div>
</template>

<script>
  import widgets from 'element-ui/packages/widgets/src/widgets';

  const ElUploadWidget = widgets.upload;
  export default {
    components: { ElUploadWidget },
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        uploadData1: {
          class: "upload-demo",
          props: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            multiple: true,
            limit: 3,
            onPreview: function(file) {
              console.log(file);
            },
            onRemove: function(file, fileList) {
              console.log(this, file, fileList);
              const uploadWidgetVm = this
              uploadWidgetVm.fileList = fileList
            },
            beforeRemove: function(file, fileList) {
              return this.$confirm(`确定移除 ${ file.name }？`);
            },
            onExceed: function(files, fileList) {
              this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }
          }
        },
        uploadData2: {
          class: "upload-demo",
          props: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            multiple: true,
            limit: 3,
            onPreview: function(file) {
              console.log(file);
            },
            onRemove: function(file, fileList) {
              console.log(this, file, fileList);
              const uploadWidgetVm = this
              uploadWidgetVm.fileList = fileList
            },
            beforeRemove: function(file, fileList) {
              return this.$confirm(`确定移除 ${ file.name }？`);
            },
            onExceed: function(files, fileList) {
              this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }
          },
          slots: {
            default: function(h) {
              return h('el-button', {
                slot: 'default',
                props: {
                  size: 'small',
                  type: 'primary'
                }
              }, '点击上传')
            },
            tip: function(h) {
              return h('div', {
                slot: 'tip',
                class: 'el-upload__tip',
              }, '只能上传jpg/png文件，且不超过500kb')
            },

          }
        }
      };
    },
    mounted() {
      window.xxx = this
    }
  };
</script>
