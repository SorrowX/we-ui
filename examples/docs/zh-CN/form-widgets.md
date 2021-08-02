## FormWidgets 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。与`Form`组件的区别是`FormWidgets`组件的使用配置化。

### 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 FormWidgets 组件中，每一个表单域控件由`data`中的成员配置决定,下文会详细介绍其属性。通过`model`属性来和每个控件进行数据双向绑定。使用`rules`来校验表单。
```html
<el-form-widgets 
  style="width: 600px"
  ref="comp"
  :data="data" 
  :model="model"
  :rules="rules"
  layout="classic"
  :show-action-buttons="true"
  cancelText="取消"
  submitText="提交"
  @on-submit="handleSubmit"
  @on-cancel="handleCancel"
  @change="handleChange"
/>
<script>
  export default {
    data() {
      return {
        model: {
          name: '徐志伟',
          region: '',
          date: '',
          delivery: false,
          type: ['地推活动'],
          resource: '',
          desc: ''
        },
        data: [
          {
            type: 'input',
            placeholder: '请输入活动名称',
            prop: 'name',
            label: '活动名称'
          },
          {
            type: 'select',
            placeholder: '请选择活动区域',
            prop: 'region',
            label: '活动区域',
            ajaxOptions: {
              localList: [
                {
                  value: "区域1",
                  label: "区域1",
                },
                {
                  value: "区域2",
                  label: "区域2",
                }
              ],
            },
          },
          {
            type: 'date-picker',
            placeholder: '选择日期',
            prop: 'date',
            label: '活动时间'
          },
          {
            type: 'switch',
            placeholder: '',
            prop: 'delivery',
            label: '即时配送'
          },
          {
            type: 'checkbox',
            placeholder: '请输入活动名称',
            prop: 'type',
            label: '活动',
            ajaxOptions: {
              localList: [
                {
                  label: "美食/餐厅线上活动",
                  value: "美食/餐厅线上活动",
                },
                {
                  label: "地推活动",
                  value: "地推活动",
                },
                {
                  label: "线下主题活动",
                  value: "线下主题活动",
                },
                {
                  label: "单纯品牌曝光",
                  value: "单纯品牌曝光",
                }
              ],
            },
          },
          {
            type: 'radio',
            prop: 'resource',
            label: '特殊资源',
            ajaxOptions: {
              localList: [
                {
                  label: "线上品牌商赞助",
                  value: "线上品牌商赞助",
                },
                {
                  label: "线下场地免费",
                  value: "线下场地免费",
                }
              ],
            },
          },
          {
            type: 'input',
            placeholder: '活动形式',
            prop: 'desc',
            label: '活动形式',
            inputData: {
              props: {
                type: 'textarea'
              }
            }
          },
        ],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
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
      },
      handleChange(...args) {
        console.log('change: ', args)
      }
    }
  };
</script>
```
:::

### 网格表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等，也可以用在网格表单布局中。

:::demo 通过`layout`属性值`grid`来开启网格表单布局。`data`成员中的`span`属性可以控制栅格占据的列数，一行24等份，超出24则往下排列。
```html
<el-form-widgets 
  ref="comp"
  :data="data" 
  :model="model"
  :rules="rules"
  layout="grid"
  :show-action-buttons="true"
  cancelText="取消"
  submitText="提交"
  @on-submit="handleSubmit"
  @on-cancel="handleCancel"
  @change="handleChange"
/>
<script>
  export default {
    data() {
      return {
        model: {
          name: '徐志伟',
          region: '',
          date: '',
          delivery: false,
          type: ['地推活动'],
          resource: '',
          desc: ''
        },
        data: [
          {
            type: 'input',
            span: 12,
            placeholder: '请输入活动名称',
            prop: 'name',
            label: '活动名称'
          },
          {
            type: 'select',
            span: 12,
            placeholder: '请选择活动区域',
            prop: 'region',
            label: '活动区域',
            ajaxOptions: {
              localList: [
                {
                  value: "区域1",
                  label: "区域1",
                },
                {
                  value: "区域2",
                  label: "区域2",
                }
              ],
            },
          },
          {
            type: 'date-picker',
            span: 12,
            placeholder: '选择日期',
            prop: 'date',
            label: '活动时间'
          },
          {
            type: 'switch',
            span: 12,
            placeholder: '',
            prop: 'delivery',
            label: '即时配送'
          },
          {
            type: 'checkbox',
            span: 12,
            placeholder: '请输入活动名称',
            prop: 'type',
            label: '活动',
            ajaxOptions: {
              localList: [
                {
                  label: "美食/餐厅线上活动",
                  value: "美食/餐厅线上活动",
                },
                {
                  label: "地推活动",
                  value: "地推活动",
                },
                {
                  label: "线下主题活动",
                  value: "线下主题活动",
                },
                {
                  label: "单纯品牌曝光",
                  value: "单纯品牌曝光",
                }
              ],
            },
          },
          {
            type: 'radio',
            span: 12,
            prop: 'resource',
            label: '特殊资源',
            ajaxOptions: {
              localList: [
                {
                  label: "线上品牌商赞助",
                  value: "线上品牌商赞助",
                },
                {
                  label: "线下场地免费",
                  value: "线下场地免费",
                }
              ],
            },
          },
          {
            type: 'input',
            span: 24,
            placeholder: '活动形式',
            prop: 'desc',
            label: '活动形式',
            inputData: {
              props: {
                type: 'textarea'
              },
              attrs: {
                rows: 5
              }
            }
          },
        ],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
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
      },
      handleChange(...args) {
        console.log('change: ', args)
      }
    }
  };
</script>
```
:::

### 只读表单

只读表单只是渲染文本，而不是各个控件，所以更加轻量级。

:::demo 在`data`成员中通过设置`renderReadonly`函数，可以自定义展示文本。
```html
<el-form-widgets 
  ref="comp"
  :data="data" 
  :model="model"
  layout="grid"
  readonly
  :show-action-buttons="false"
/>
<script>
  export default {
    data() {
      return {
        model: {
          name: '徐志伟',
          region: '区域1',
          date: '2021-07-23',
          delivery: false,
          type: ['地推活动'],
          resource: '线下场地免费',
          desc: '啥活动形式都可以'
        },
        data: [
          {
            type: 'input',
            span: 12,
            placeholder: '请输入活动名称',
            prop: 'name',
            label: '活动名称'
          },
          {
            type: 'select',
            span: 12,
            placeholder: '请选择活动区域',
            prop: 'region',
            label: '活动区域',
            ajaxOptions: {
              localList: [
                {
                  value: "区域1",
                  label: "区域1",
                },
                {
                  value: "区域2",
                  label: "区域2",
                }
              ],
            },
          },
          {
            type: 'date-picker',
            span: 12,
            placeholder: '选择日期',
            prop: 'date',
            label: '活动时间'
          },
          {
            type: 'switch',
            span: 12,
            placeholder: '',
            prop: 'delivery',
            label: '即时配送'
          },
          {
            type: 'checkbox',
            span: 12,
            placeholder: '请输入活动名称',
            prop: 'type',
            label: '活动',
            ajaxOptions: {
              localList: [
                {
                  label: "美食/餐厅线上活动",
                  value: "美食/餐厅线上活动",
                },
                {
                  label: "地推活动",
                  value: "地推活动",
                },
                {
                  label: "线下主题活动",
                  value: "线下主题活动",
                },
                {
                  label: "单纯品牌曝光",
                  value: "单纯品牌曝光",
                }
              ],
            },
          },
          {
            type: 'radio',
            span: 12,
            prop: 'resource',
            label: '特殊资源',
            ajaxOptions: {
              localList: [
                {
                  label: "线上品牌商赞助",
                  value: "线上品牌商赞助",
                },
                {
                  label: "线下场地免费",
                  value: "线下场地免费",
                }
              ],
            },
          },
          {
            type: 'input',
            span: 24,
            placeholder: '活动形式',
            prop: 'desc',
            label: '活动形式',
            inputData: {
              props: {
                type: 'textarea'
              },
              attrs: {
                rows: 5
              }
            }
          },
        ]
      };
    }
  };
</script>
```
:::

### 基础配置

下面使用各个控件,来展示下目前常用的控件，注意每个控件的使用姿势有很多，具体可以参考对应控件的文档。

:::demo 关于头像上传和文件上传建议使用单独的vue文件组件编写，这里为了展示所以才写在一起。也支持自定义控件,使用this.$widgets.use('type', '自定义控件组件'),这样就可以在`data`配置自己编写的自定义控件,自定义组件控件需满足v-model的使用即可。
```html
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
    </el-form>

    <p>基础控件:</p>

    <el-form-widgets 
      class="form-widgets-demo"
      ref="comp"
      :data="data" 
      :model="model"
      :label-width="labelWidth" 
      :label-position="labelPosition"
      :label-background-color="labelBackgroundColor"
      :size="size"
      :show-action-buttons="true"
      :rules="rules"
      cancelText="取消"
      submitText="提交"
      @on-submit="handleSubmit"
      @on-cancel="handleCancel"
      @change="handleChange"
    />
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <pre>{{ JSON.stringify(model, null, 4) }}</pre>
  </div>
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
        labelBackgroundColor: "#fff",
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
                      props: { size: _this.size },
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
                        class: "el-upload__item-actions",
                      },
                      [
                        h(
                          "span",
                          {
                            class: "el-upload__item-preview-icon",
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
                            class: "el-upload__item-delete-icon",
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
    }
  };
</script>
```
:::

### 自定义label和追加新的内容

使用label slot render函数 来自定义label。使用default slot render函数 来追加新的内容。

:::demo 在`data`成员中通过配置`formItemData.slots.label`函数，即可使用自定义label。在`data`成员中通过配置`formItemData.slots.default`函数，可以追加新的内容
```html
<el-form-widgets 
  :data="data" 
  :model="model"
  layout="grid"
/>
<script>
  export default {
    data() {
      return {
        model: {
          name: '徐志伟'
        },
        data: [
          {
            type: 'input',
            span: 24,
            placeholder: '请输入活动名称',
            prop: 'name',
            label: '活动名称活动名称活动名称活动名称活动名称活动名称活动名称',
            inputData: {
              style: {
                marginTop: '4px'
              }
            },
            formItemData: {
              slots: {
                label: function(h, widget) {
                  return h('div', {
                    slot: 'label',
                    class: 'form-widgets-custom-label__wrap'
                  }, [
                    h('p', {
                      class: 'form-widgets-custom-label__text',
                      attrs: {
                        title: widget.label
                      }
                    }, widget.label)
                  ])
                },
                default: function(h, widget) {
                  return h('p', {
                    style: {
                      fontSize: '12px',
                      color: 'red',
                      margin: '6px 0 0 0'
                    },
                  }, '我是一个特殊的说明，其实也没啥说的，就想说一下。')
                }
              }
            }
          }
        ]
      };
    }
  };
</script>
```
:::

### FormWidgets Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。 | string | — | — |
| hide-required-asterisk | 是否隐藏必填字段的标签旁边的红色星号 | boolean | — | false |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |
| data | 控件的配置项 | array | — | [] |
| layout | 布局方式(grid/classic) | string | — | grid |
| props | 和data的成员配置一致，用于转换data成员的key | object | — | 具体参考下面文档 |
| labelBackgroundColor | 设置label的背景色 | string | — | #fdfdfd |
| showLabelTitle | 鼠标移入label时是否展示原生title | boolean | — | false |
| showActionButtons | 是否展示操作按钮组 | boolean | — | false |
| cancelText | 取消按钮文本 | string | — | cancel |
| submitText | 提交按钮文本 | string | — | submit |
| customClass | 按钮组的自定义样式 | string | — | — |
| readonly | 表单是否只读 | boolean | — | false |

### data 成员配置项
#### props属性可以转换下面的key

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type   | 控件类型(具体查看各个控件文档) | string      |                  必填                |  — |
| prop   | 控件双向绑定的变量 | string      |                  必填                |  — |
| label   | label文本 | string      |                  —              |  — |
| span   | 栅格系统行占比(1-24) | number      |                  —              |  24 |
| required   | 是否必填 | boolean      |                  —              |  — |
| disabled   | 控件是否禁用 | boolean      |                  —              |  false |
| placeholder   | 控件占位符 | string      |                  —              |  — |
| readonly   | 控件只读(渲染文本) | boolean      |                  —              |  false |
| rules   | 控件校验规则，该选项会合并form-widgets的rules | array      |                  —              |   — |
| ajaxOptions   | 接口请求(具体参考各个控件的文档) | object      |                  —              |   — |
| renderWidget   | 自定义控件渲染 | function      |                  —              |   — |
| renderReadonly   | 自定义只读控件渲染 | function      |                  —              |   — |
| formItemData   | form-item组件的配置 | object      |                  —              |   — |
| type + Data   | 控件组件的配置 | object      |                  —              |   — |

### FormWidgets Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| validateField | 对部分表单字段进行校验的方法 | Function(props: array \| string, callback: Function(errorMessage: string))
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array \| string)
| getValue | 获取到model的值 | —
| setValue | 更新model的值 | model

### FormWidgets Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| change | 任一控件触发change | { prop: '控件绑定的prop', value: '控件当前的值', model: '整个表单的值(深拷贝出来的副本)', formInstance:'表单实例', formItemInstance: '表单域实例', widgetInstance: '控件实例' }, rawData?: '接口的原始数据(当前被选中的)', valuekey?: '用于转换接口中的key值' |
| on-sumit | 点击提交按钮的回调 |  |
| on-cancel | 点击取消按钮的回调 |  |