<template>
  <div style="margin: 20px;">
    <p>FormWidgets 组件 基础配置:</p>

    <el-form label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="对齐方式">
            <el-radio v-model="labelPosition" label="left">文本左对齐</el-radio>
            <el-radio v-model="labelPosition" label="right">文本右对齐</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="label宽度">
            <el-select v-model="labelWidth" placeholder="请选择label宽度">
              <el-option
                v-for="item in labelWidths"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="大小设置">
            <el-radio v-model="size" label="large">large</el-radio>
            <el-radio v-model="size" label="medium">medium</el-radio>
            <el-radio v-model="size" label="small">small</el-radio>
            <el-radio v-model="size" label="mini">mini</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="颜色设置">
            <el-color-picker v-model="labelBackgroundColor" show-alpha></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="是否只读">
            <el-radio v-model="readonly" :label="false">编辑</el-radio>
            <el-radio v-model="readonly" :label="true">只读</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-row>
      
    </el-form>

    <p>基础控件:</p>

    <el-form-widgets 
      ref="comp"
      :data="data" 
      :model="model"
      :label-width="labelWidth" 
      :label-position="labelPosition"
      :label-background-color="labelBackgroundColor"
      :size="size"
      :show-action-buttons="true"
      :readonly="readonly"
      :rules="rules"
      layout="grid"
      @on-submit="handleSubmit"
      @on-cancel="handleCancel"
      @change="handleChange"
    />
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <pre>{{ JSON.stringify(model, null, 4) }}</pre>
  </div>
</template>

<script>
  export default {
    data() {
      const _this = this
      return {
        // upload image
        imageUrl: '',
        dialogImageUrl: "",
        dialogVisible: false,

        // form-widgets props
        labelPosition: "left",
        labelWidth: "155px",
        labelWidths: [
          {
            value: "100px",
            label: "100px",
          },
          {
            value: "120px",
            label: "120px",
          },
          {
            value: "130px",
            label: "130px",
          },
          {
            value: "155px",
            label: "155px",
          }
        ],
        size: "medium",
        labelBackgroundColor: "#F0F1F9",
        readonly: false,
        layout: 'grid',
        model: {
          text: '',
          textarea: '',
          readonlyText: '我是只读文本',
          select: '',
          cascader: '',
          radio: '',
          checkbox: [],
          datetime: '',
          date: '',
          month: '',
          year: '',
          number: 0,
          switch: false,
          thumb: [],
          file: [],
          long: ''
        },
        data: [
          {
            type: 'upload',
            span: 24,
            prop: 'thumb',
            label: '头像上传',
            uploadData: {
              style: {
                height: '100px'
              },
              props: {
                action: "#",
                multiple: true,
                autoUpload: false,
                showFileList: false,
                onChange: function(res, file) {
                  const uploadWidgetVm = this
                  _this.imageUrl = URL.createObjectURL(res.raw);
                  uploadWidgetVm.fileList = [ file[file.length - 1] ]
                  uploadWidgetVm.$parent.validate('blur')
                },
                beforeUpload: function(file) {
                  const isJPG = file.type === "image/jpeg";
                  const isLt2M = file.size / 1024 / 1024 < 2;

                  if (!isJPG) {
                    _this.$message.error("上传头像图片只能是 JPG 格式!");
                  }
                  if (!isLt2M) {
                    _this.$message.error("上传头像图片大小不能超过 2MB!");
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
                      boxSizing: 'border-box'
                    },
                  });
                  return _this.imageUrl ? imgVnode : iVnode;
                },
              },
            },
            renderReadonly: function(h) {
              return h('pre', JSON.stringify(this.value, null, 4))
            }
          },
          {
            type: 'input',
            span: 24,
            placeholder: '请输入',
            prop: 'text',
            label: '单行文本',
            inputData: {
              props: {
                clearable: true,
              }
            }
          },
          {
            type: 'input',
            span: 24,
            placeholder: '请输入',
            prop: 'textarea',
            label: '多行文本',
            inputData: {
              props: {
                clearable: true,
                type: 'textarea',
                showWordLimit: true,
              },
              attrs: {
                maxlength: 30,
                rows: 5
              }
            }
          },
          {
            type: 'input',
            span: 24,
            prop: 'readonlyText',
            label: '只读文本',
            readonly: true
          },
          {
            type: 'input',
            span: 24,
            placeholder: '',
            prop: 'long',
            label: '我是一个很长的label,虽然与众不同,但是我可以单独设置lable的宽度',
            formItemData: {
              props: {
                labelWidth: 'auto'
              }
            }
          },
          {
            type: 'select',
            span: 12,
            placeholder: '请选择',
            prop: 'select',
            label: '下拉选择',
            ajaxOptions: {
              localList: [
                {
                  value: "选择1",
                  label: "选择1",
                },
                {
                  value: "选择2",
                  label: "选择2",
                }
              ],
            },
          },
          {
            type: 'cascader',
            span: 12,
            placeholder: '请选择',
            prop: 'cascader',
            label: '下拉树',
            ajaxOptions: {
              localList: [
                {
                  value: 1,
                  label: "东南",
                  children: [
                    {
                      value: 2,
                      label: "上海",
                      children: [
                        { value: 3, label: "普陀" },
                        { value: 4, label: "黄埔" },
                        { value: 5, label: "徐汇" },
                      ],
                    },
                    {
                      value: 7,
                      label: "江苏",
                      children: [
                        { value: 8, label: "南京" },
                        { value: 9, label: "苏州" },
                        { value: 10, label: "无锡" },
                      ],
                    },
                    {
                      value: 12,
                      label: "浙江",
                      children: [
                        { value: 13, label: "杭州" },
                        { value: 14, label: "宁波" },
                        { value: 15, label: "嘉兴" },
                      ],
                    },
                  ],
                },
                {
                  value: 17,
                  label: "西北",
                  children: [
                    {
                      value: 18,
                      label: "陕西",
                      children: [
                        { value: 19, label: "西安" },
                        { value: 20, label: "延安" },
                      ],
                    },
                    {
                      value: 21,
                      label: "新疆维吾尔族自治区",
                      children: [
                        { value: 22, label: "乌鲁木齐" },
                        { value: 23, label: "克拉玛依" },
                      ],
                    },
                  ],
                },
              ]
            },
          },
          {
            type: 'radio',
            span: 12,
            prop: 'radio',
            label: '单选',
            ajaxOptions: {
              localList: [
                {
                  label: "单选1",
                  value: "单选1",
                },
                {
                  label: "单选2",
                  value: "单选2",
                }
              ],
            },
          },
          {
            type: 'checkbox',
            span: 12,
            prop: 'checkbox',
            label: '多选',
            ajaxOptions: {
              localList: [
                {
                  label: "多选1",
                  value: "多选1",
                },
                {
                  label: "多选2",
                  value: "多选2",
                },
                {
                  label: "多选3",
                  value: "多选3",
                }
              ],
            },
          },
          {
            type: 'date-picker',
            span: 12,
            placeholder: '选择日期时间',
            prop: 'datetime',
            label: '日期(年月日时分秒)',
            datePickerData: {
              props: {
                type: "datetime",
                valueFormat: "yyyy-MM-dd hh:mm:ss"
              },
            },
          },
          {
            type: 'date-picker',
            span: 12,
            placeholder: '选择日期',
            prop: 'date',
            label: '日期(年月日)',
            datePickerData: {
              props: {
                type: "date",
                valueFormat: "yyyy-MM-dd"
              },
            },
          },
          {
            type: 'date-picker',
            span: 12,
            placeholder: '选择日期',
            prop: 'month',
            label: '日期(月)',
            datePickerData: {
              props: {
                type: "month",
                valueFormat: "yyyy-MM"
              },
            },
          },
          {
            type: 'date-picker',
            span: 12,
            placeholder: '选择日期',
            prop: 'year',
            label: '日期(年)',
            datePickerData: {
              props: {
                type: "year",
                valueFormat: "yyyy"
              },
            },
          },
          {
            type: 'input-number',
            span: 12,
            placeholder: '请输入数字',
            prop: 'number',
            label: '数字',
            inputNumberData: {
              props: {
                controlsPosition: "right"
              }
            }
          },
          {
            type: 'switch',
            span: 12,
            placeholder: '',
            prop: 'switch',
            label: '开关'
          },
          {
            type: 'upload',
            span: 24,
            prop: 'file',
            label: '文件上传(图片)',
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
                        margin: "6px 0",
                      },
                    },
                    "点击上传"
                  );
                },
              },
              scopedSlots: {
                file: function (scoped) {
                  const { file } = scoped;
                  const h = _this.$createElement;
                  const uploadWidgetVm = this

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
                                _this.dialogImageUrl =
                                  file.url || URL.createObjectURL(file.raw);
                                _this.dialogVisible = true;
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
                                const fileList = uploadWidgetVm.fileList;
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
              }
            }
          },
        ],
        rules: {
          text: [
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          date: [
            { 
              type: 'date', 
              validator: (rule, value, callback) => value ? callback() : callback(new Error(rule.message)), 
              required: true, 
              message: '请选择日期', 
              trigger: 'change'
            }
          ],
          thumb: [
            { 
              required: true, 
              validator: (rule, value, callback) => value.length ? callback() : callback(new Error(rule.message)), 
              message: '请上传一个头像', 
              trigger: 'blur' 
            }
          ]
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.comp.validate((valid, invalidFields) => {
          console.log(valid, invalidFields)
        })
      },
      handleCancel() {
        this.$refs.comp.resetFields()
        this.imageUrl = ''
      },
      handleChange(...args) {
        console.log('change: ', args)
      }
    },
    mounted() {
      window.xxx = this.$refs.comp
    }
  };
</script>

<style lang="scss">
// .el-upload-list__item {
//     width: 105px !important;
//     height: 105px !important;
//     border-radius: 5px;
//     display: inline-flex;
//     justify-content: center;
//     align-items: center;
//     margin: 0 8px 8px 0;
//     border: 1px solid #d9d9d9;
//     border-radius: 4px;
//     img {
//       width: 86px;
//       height: 86px;
//     }
//     .el-upload-list__item-actions {
//       position: absolute;
//       width: 86%;
//       height: 86%;
//       left: 7px;
//       top: 7px;
//       cursor: default;
//       text-align: center;
//       color: #fff;
//       opacity: 0;
//       font-size: 20px;
//       background-color: rgba(0,0,0,.5);
//       transition: opacity .3s;
//       display: flex;
//       align-items: center;
//       justify-content: space-evenly;
//       cursor: pointer;

//       &:hover {
//         opacity: 1;
//       }
//     }
//   }
</style>
