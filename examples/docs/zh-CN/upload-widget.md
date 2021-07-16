## UploadWidget 上传控件

通过点击或者拖拽上传文件。该组件基于 `ElUpload` 组件编写。

### 点击上传

:::demo 通过`v-model`来绑定文件列表,其值会根据 upload 组件内部的 uploadFiles 值进行同步,用户无需自己维护文件列表(比如删除和新增)。通过`uploadData`属性来设置`upload`组件的所有属性,来实现具体业务。

```html
<el-upload-widget
  class="upload-demo"
  v-model="fileList"
  :upload-data="uploadData"
>
</el-upload-widget>
<script>
  export default {
    data() {
      return {
        uploadData: {
          props: {
            action: "#",
            multiple: true,
            autoUpload: false,
            limit: 3,
            onPreview: function handlePreview(file) {
              console.log(file);
            },
            onRemove: function handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            beforeRemove: function beforeRemove(file, fileList) {
              console.log(file, fileList);
              return this.$confirm(`确定移除 ${file.name}？`);
            },
            onExceed: function handleExceed(files, fileList) {
              console.log(files, fileList);
              this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                  files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
              );
            },
          },
          slots: {
            default: function(h) {
              return h(
                "el-button",
                {
                  props: { size: "small", type: "primary" },
                },
                "点击上传"
              );
            },
            tip: function(h) {
              return h(
                "div",
                {
                  class: "el-upload__tip",
                  slot: "tip",
                },
                "只能上传jpg/png文件，且不超过500kb"
              );
            },
          },
        },
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
          {
            name: "food2.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
      };
    },
  };
</script>
```

:::

### 自定义上传列表

使用 `scopedSlots.file` 去设置缩略图模版。

:::demo

```html
<el-upload-widget
  class="file-scopedslot"
  v-model="fileList"
  :upload-data="uploadData"
>
</el-upload-widget>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="" />
</el-dialog>
<script>
  export default {
    data() {
      return {
        uploadData: {
          props: {
            action: "#",
            multiple: true,
            autoUpload: false,
            limit: 3,
            onExceed: function handleExceed(files, fileList) {
              console.log(files, fileList);
              this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                  files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
              );
            },
          },
          slots: {
            default: function(h) {
              return h(
                "el-button",
                {
                  props: { size: "small" },
                  style: {
                    marginBottom: "10px",
                  },
                },
                "点击上传"
              );
            },
          },
          scopedSlots: {
            file: (scoped) => {
              const { file } = scoped;
              const h = this.$createElement;

              return [
                h("img", {
                  attrs: {
                    src: file.url || URL.createObjectURL(file.raw),
                  },
                }),
                h(
                  "span",
                  {
                    class: "el-upload-list__item-actions",
                  },
                  [
                    h(
                      "span",
                      {
                        class: "el-upload-list__item-preview-icon",
                        on: {
                          click: () => {
                            // this指向当前组件实例
                            this.dialogImageUrl =
                              file.url || URL.createObjectURL(file.raw);
                            this.dialogVisible = true;
                          },
                        },
                      },
                      [h("i", { class: "el-icon-zoom-in" })]
                    ),
                    h(
                      "span",
                      {
                        class: "el-upload-list__item-delete-icon",
                        on: {
                          click: () => {
                            const fileList = this.fileList;
                            fileList.splice(
                              fileList.findIndex((_) => _ === file),
                              1
                            );
                          },
                        },
                      },
                      [h("i", { class: "el-icon-delete" })]
                    ),
                  ]
                ),
              ];
            },
          },
        },
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
          {
            name: "food2.jpeg",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
        ],

        dialogImageUrl: "",
        dialogVisible: false,
      };
    },
  };
</script>
```

:::

### 用户头像上传

使用 `before-upload` 限制用户上传的图片格式和大小,需要`autoUpload`设置为 true。该 demo 中没有上传到服务器,所以`autoUpload`设置为 false,则不会触发`before-upload`钩子。

:::demo

```html
<el-upload-widget v-model="fileList" :upload-data="uploadData">
</el-upload-widget>

<script>
  export default {
    data() {
      const _this = this;
      return {
        fileList: [],
        imageUrl: "",
        uploadData: {
          props: {
            action: "https://jsonplaceholder.typicode.com/posts/",
            multiple: true,
            autoUpload: false,
            showFileList: false,
            onChange: (res, file) => {
              this.imageUrl = URL.createObjectURL(res.raw);
            },
            beforeUpload: (file) => {
              const isJPG = file.type === "image/jpeg";
              const isLt2M = file.size / 1024 / 1024 < 2;

              if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
              }
              if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
              }
              return isJPG && isLt2M;
            },
          },
          slots: {
            // _createElement函数的第二个参数其实是没有slots选项的,所以该选项的函数的this指向，在upload-widget组件中做了处理,绑定了upload-widget组件的实例
            default: function(h) {
              const imgVnode = h("img", {
                attrs: {
                  src: _this.imageUrl,
                },
                class: "avatar",
                style: {
                  width: "100px",
                  height: "100px",
                  borderRadius: "3px",
                },
              });
              const iVnode = h("i", {
                class: ["el-icon-plus", "avatar-uploader-icon"],
                style: {
                  width: "100px",
                  height: "100px",
                  lineHeight: "100px",
                  border: "1px dashed #ccc",
                  fontSize: "22px",
                  borderRadius: "3px",
                },
              });
              return _this.imageUrl ? imgVnode : iVnode;
            },
          },
        },
      };
    },
    methods: {},
  };
</script>
```

:::

### 照片墙

使用 `list-type` 属性来设置文件列表的样式。

:::demo

```html
<el-upload-widget v-model="fileList" :upload-data="uploadData">
  <i class="el-icon-plus"></i>
</el-upload-widget>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="" />
</el-dialog>
<script>
  export default {
    data() {
      return {
        fileList: [],
        dialogImageUrl: "",
        dialogVisible: false,
        uploadData: {
          props: {
            action: "https://jsonplaceholder.typicode.com/posts/",
            multiple: true,
            autoUpload: false,
            listType: "picture-card",
            onRemove: (file, fileList) => {
              console.log(file, fileList);
              const list = this.fileList;
              list.splice(list.findIndex((_) => _ === file), 1);
            },
            onPreview: (file) => {
              this.dialogImageUrl = file.url;
              this.dialogVisible = true;
            },
          },
        },
      };
    },
    methods: {},
  };
</script>
```

:::

### 图片列表缩略图

:::demo

```html
<el-upload-widget
  class="upload-demo"
  v-model="fileList"
  :upload-data="uploadData"
>
</el-upload-widget>
<script>
  export default {
    data() {
      return {
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
          {
            name: "food2.jpeg",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
        ],

        uploadData: {
          props: {
            action: "#",
            multiple: true,
            autoUpload: true,
            listType: "picture",
            limit: 3,
            onPreview: function handlePreview(file) {
              console.log(file);
            },
            onRemove: function handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            beforeRemove: function beforeRemove(file, fileList) {
              console.log(file, fileList);
              return this.$confirm(`确定移除 ${file.name}？`);
            },
            onExceed: function handleExceed(files, fileList) {
              console.log(files, fileList);
              this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                  files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
              );
            },
          },
          slots: {
            default: function(h) {
              return h(
                "el-button",
                {
                  props: { size: "small", type: "primary" },
                },
                "点击上传"
              );
            },
            tip: function(h) {
              return h(
                "div",
                {
                  class: "el-upload__tip",
                  slot: "tip",
                },
                "只能上传jpg/png文件，且不超过500kb"
              );
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 拖拽上传

:::demo 除了使用 slots 和 scopedSlots 选项来编写 render 函数，也可以使用模板,保留了 upload 原有插槽的功能。如果用户同时使用了插槽模板和 slots 和 scopedSlots 选项，会优先使用模板。

```html
<el-upload-widget
  class="upload-demo"
  v-model="fileList"
  :upload-data="uploadData"
>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">
    只能上传jpg/png文件，且不超过500kb
  </div>
</el-upload-widget>
<script>
  export default {
    data() {
      return {
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
          {
            name: "food2.jpeg",
            url:
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          },
        ],

        uploadData: {
          props: {
            action: "#",
            drag: true,
            multiple: true,
            autoUpload: true,
            onPreview: function handlePreview(file) {
              console.log(file);
            },
            onRemove: function handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            beforeRemove: function beforeRemove(file, fileList) {
              console.log(file, fileList);
              return this.$confirm(`确定移除 ${file.name}？`);
            },
            onExceed: function handleExceed(files, fileList) {
              console.log(files, fileList);
              this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                  files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
              );
            },
          },
        },
      };
    },
  };
</script>
```

:::

### UploadWidget Attributes

| 参数            | 说明                                                                               | 类型     | 可选值 | 默认值 |
| --------------- | ---------------------------------------------------------------------------------- | -------- | ------ | ------ |
| type            | 控件类型                                                                           | string   | —      | upload |
| value / v-model | 绑定值                                                                             | string   | —      | —      |
| readonly        | 控件是否只读                                                                       | boolean  | —      | false  |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                   | boolean  | —      | false  |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 upload-widget 组件实例,含有一个 h 参数   | function | —      | —      |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 upload-widget 组件实例,含有一个 h 参数 | function | —      | —      |
| uploadData      | upload 组件的所有 props 属性,attrs 属性,on 事件都定义在其对象上,详见下文           | object   | —      | {}     |

### uploadData.props

| 参数             | 说明                                                                                                                                 | 类型                               | 可选值                    | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------------------------- | ------ |
| action           | 必选参数，上传的地址                                                                                                                 | string                             | —                         | —      |
| headers          | 设置上传的请求头部                                                                                                                   | object                             | —                         | —      |
| multiple         | 是否支持多选文件                                                                                                                     | boolean                            | —                         | —      |
| data             | 上传时附带的额外参数                                                                                                                 | object                             | —                         | —      |
| name             | 上传的文件字段名                                                                                                                     | string                             | —                         | file   |
| with-credentials | 支持发送 cookie 凭证信息                                                                                                             | boolean                            | —                         | false  |
| show-file-list   | 是否显示已上传文件列表                                                                                                               | boolean                            | —                         | true   |
| drag             | 是否启用拖拽上传                                                                                                                     | boolean                            | —                         | false  |
| accept           | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | string                             | —                         | —      |
| on-preview       | 点击文件列表中已上传的文件时的钩子                                                                                                   | function(file)                     | —                         | —      |
| on-remove        | 文件列表移除文件时的钩子                                                                                                             | function(file, fileList)           | —                         | —      |
| on-success       | 文件上传成功时的钩子                                                                                                                 | function(response, file, fileList) | —                         | —      |
| on-error         | 文件上传失败时的钩子                                                                                                                 | function(err, file, fileList)      | —                         | —      |
| on-progress      | 文件上传时的钩子                                                                                                                     | function(event, file, fileList)    | —                         | —      |
| on-change        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                                                       | function(file, fileList)           | —                         | —      |
| before-upload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。                                        | function(file)                     | —                         | —      |
| before-remove    | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。                              | function(file, fileList)           | —                         | —      |
| list-type        | 文件列表的类型                                                                                                                       | string                             | text/picture/picture-card | text   |
| auto-upload      | 是否在选取文件后立即进行上传                                                                                                         | boolean                            | —                         | true   |
| file-list        | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]                                                       | array                              | —                         | []     |
| http-request     | 覆盖默认的上传行为，可以自定义上传的实现                                                                                             | function                           | —                         | —      |
| disabled         | 是否禁用                                                                                                                             | boolean                            | —                         | false  |
| limit            | 最大允许上传个数                                                                                                                     | number                             | —                         | —      |
| on-exceed        | 文件超出个数限制时的钩子                                                                                                             | function(files, fileList)          | —                         | -      |

### uploadData.slots

| name            | 说明                 |
| --------------- | -------------------- |
| default/trigger | 触发文件选择框的内容 |
| tip             | 提示说明文字         |

### UploadWidget Methods

| 方法名     | 说明                                                                                        | 参数                                |
| ---------- | ------------------------------------------------------------------------------------------- | ----------------------------------- |
| clearFiles | eg: vm.\$refs.core.clearFiles() 清空已上传的文件列表（该方法不支持在 before-upload 中调用） | —                                   |
| abort      | eg: vm.\$refs.core.abort() 取消上传请求                                                     | （ file: fileList 中的 file 对象 ） |
| submit     | eg: vm.\$refs.core.submit() 手动上传文件列表                                                | —                                   |
