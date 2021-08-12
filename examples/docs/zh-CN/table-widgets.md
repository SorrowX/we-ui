## TableWidgets 表格

用于展示或编辑多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 表格编辑

基础的表格编辑和展示用法。

:::demo 使用`columns`属性来定义列,关于`columns`成员对象的属性下文会详细介绍。使用`data`属性用于绑定表格编辑或展示的数据,`data`成员中的key对应`columns`成员中的`prop`属性。`columns`成员中的`renderReadonly`render函数,可以自定义只读展示内容。
```html
  <template>
    <div>
      <el-switch
        style="margin: 0 0 20px 10px;"
        v-model="readonly"
        active-text="只读"
        inactive-text="编辑"
        @change="handleChange"
      >
      </el-switch>

      <el-table-widgets
        :data="tableData"
        :columns="columns"
      >
      </el-table-widgets>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        readonly: false,
        tableData: [
          {
            name: '徐志伟',
            education: '',
            address: ['江苏', '南京'],
          },
          {
            name: '徐志康',
            education: '3',
            address: ['上海', '普陀'],
          },
          {
            name: '王琦',
            education: '2',
            address: ['浙江', '杭州'],
          }
        ],
  
        columns: [
          {
            type: 'input',
            label: '姓名',
            prop: 'name',
            placeholder: '请输入姓名',
            readonly: false,
            columnData: {
              props: {
                width: 250
              }
            }
          },

          {
            type: 'select',
            label: '学历',
            prop: 'education',
            readonly: false,
            ajaxOptions: {
              localList: [
                {
                  value: '1',
                  label: '本科'
                },
                {
                  value: '2',
                  label: '大专'
                },
                {
                  value: '3',
                  label: '职高'
                }
              ]
            },
            columnData: {
              props: {
                width: 250
              }
            }
          },

          {
            type: 'cascader',
            label: '住址',
            prop: 'address',
            placeholder: '选择省市',
            renderReadonly: function(h, props, form, key) {
              const value = form[key]
              return h('span', {
                style: {
                  display: 'inline-block',
                  color: 'red',
                  padding: '3px 0'
                }
              }, value.join(' / '))
            },
            cascaderData: {
              props: {
                props: { checkStrictly: false },
              }
            },
            ajaxOptions: {
              localList: [
                {
                  value: '上海',
                  label: '上海',
                  children: [
                    { value: '普陀', label: '普陀' },
                    { value: '黄埔', label: '黄埔' },
                    { value: '徐汇', label: '徐汇' }
                  ]
                },
                {
                  value: '江苏',
                  label: '江苏',
                  children: [
                    { value: '南京', label: '南京' },
                    { value: '苏州', label: '苏州' },
                    { value: '无锡', label: '无锡' }
                  ]
                },
                {
                  value: '浙江',
                  label: '浙江',
                  children: [
                    { value: '杭州', label: '杭州' },
                    { value: '宁波', label: '宁波' },
                    { value: '嘉兴', label: '嘉兴' }
                  ]
                }
              ]
            }
          }
        ]
      };
    },
    methods: {
      handleChange(val) {
        this.columns = this.columns.map((_) => {
          _.readonly = val;
          return _;
        });
      }
    }
  };
  </script>
```
:::

### 表格分页

数据量过大时,可以使用分页来展示。

:::demo 使用`border`属性可以给表格添加边框。使用`max-height`属性开启流体布局,在一定的高度内滚动。使用`mode`属性且属性值是`pagination`时,其内部会开启分页功能,不添加则会全部展示出来。分页功能基于`el-pagination`组件开发,保留了该组件的所有功能,具体查看下文的`paginationData`属性。
```html
  <template>
    <div>
      <el-switch
        style="margin: 0 0 20px 10px;"
        v-model="readonly"
        active-text="只读"
        inactive-text="编辑"
        @change="handleChange"
      >
      </el-switch>
      <el-switch
        style="margin: 0 0 20px 30px;"
        v-model="useMaxHeight"
        active-text="流体高度"
        inactive-text="自适应"
        @change="handleChangeHeight"
      >
      </el-switch>

      <el-table-widgets
        border
        :data="tableData"
        :columns="columns"
        :max-height="maxHeight"
        mode="pagination"
      >
      </el-table-widgets>
    </div>
  </template>

  <script>
    export default {
    data() {
      return {
        readonly: false,
        maxHeight: '320px',
        useMaxHeight: true,

        tableData: [
          {
            name: '徐志伟1',
            education: '',
            address: ['江苏', '南京'],
          },
          {
            name: '李谢平1',
            education: '3',
            address: ['上海', '普陀'],
          },
          {
            name: '王琦1',
            education: '2',
            address: [],
          },
          {
            name: '刘文龙1',
            education: '2',
            address: ['浙江', '杭州'],
          },
          {
            name: '沙良兵1',
            education: '2',
            address: [],
          },

          {
            name: '徐志伟2',
            education: '',
            address: ['江苏', '南京'],
          },
          {
            name: '李谢平2',
            education: '3',
            address: ['上海', '普陀'],
          },
          {
            name: '王琦2',
            education: '2',
            address: [],
          },
          {
            name: '刘文龙2',
            education: '2',
            address: ['浙江', '杭州'],
          },
          {
            name: '沙良兵2',
            education: '2',
            address: [],
          },

          {
            name: '徐志伟3',
            education: '',
            address: ['江苏', '南京'],
          },
          {
            name: '李谢平3',
            education: '3',
            address: ['上海', '普陀'],
          },
          {
            name: '王琦3',
            education: '2',
            address: [],
          },
          {
            name: '刘文龙3',
            education: '2',
            address: ['浙江', '杭州'],
          },
          {
            name: '沙良兵3',
            education: '2',
            address: [],
          }
        ],
  
        columns: [
          {
            type: 'input',
            label: '姓名',
            prop: 'name',
            placeholder: '请输入姓名',
            readonly: false,
            columnData: {
              props: {
                width: 250
              }
            }
          },

          {
            type: 'select',
            label: '学历',
            prop: 'education',
            readonly: false,
            ajaxOptions: {
              localList: [
                {
                  value: '1',
                  label: '本科'
                },
                {
                  value: '2',
                  label: '大专'
                },
                {
                  value: '3',
                  label: '职高'
                }
              ]
            },
            columnData: {
              props: {
                width: 250
              }
            }
          },

          {
            type: 'cascader',
            label: '住址',
            prop: 'address',
            placeholder: '选择省市',
            cascaderData: {
              props: {
                props: { checkStrictly: false },
              }
            },
            ajaxOptions: {
              localList: [
                {
                  value: '上海',
                  label: '上海',
                  children: [
                    { value: '普陀', label: '普陀' },
                    { value: '黄埔', label: '黄埔' },
                    { value: '徐汇', label: '徐汇' }
                  ]
                },
                {
                  value: '江苏',
                  label: '江苏',
                  children: [
                    { value: '南京', label: '南京' },
                    { value: '苏州', label: '苏州' },
                    { value: '无锡', label: '无锡' }
                  ]
                },
                {
                  value: '浙江',
                  label: '浙江',
                  children: [
                    { value: '杭州', label: '杭州' },
                    { value: '宁波', label: '宁波' },
                    { value: '嘉兴', label: '嘉兴' }
                  ]
                }
              ]
            }
          }
        ]
      };
    },
    methods: {
      handleChange(val) {
        this.columns = this.columns.map((_) => {
          _.readonly = val;
          return _;
        });
      },

      handleChangeHeight(bool) {
        this.maxHeight = bool ? '320px' : '';
      },
    }
  };
  </script>
```
:::

### 常见控件

table-widgets组件和form-widgets组件中的控件都源于widgets对象,其包含基础控件和用户自定义控件和内置存储中心,所以这2个组件中的控件都是通用的。

:::demo 当使用排序功能时,一定要给定`rowKey`属性。使用`size`属性,可以控制控件尺寸。给`columns`成员添加`required`或者`rules`属性，则会开启校验功能。值得一提的是,当开启分页功能后，校验会检验所有数据，发现哪页数据校验不通过，会自动定位到需要校验的页面。
```html
  <template>
  <div>
    <el-table-widgets
      border
      rowKey="id"
      ref="comp"
      size="medium"
      mode="pagination"
      :data="tableData"
      :columns="columns"
      @change="handleChange"
    >
    </el-table-widgets>

    <el-row style="margin-top: 40px">
      <el-col>
        <el-button size="small" @click="addRow">新增一行</el-button>
        <el-button size="small" @click="getValue">getValue</el-button>
        <el-button size="small" @click="validate">validate</el-button>
        <el-button size="small" @click="resetFields">resetFields</el-button>
        <el-button size="small" @click="msg = ''">清空日志</el-button>
      </el-col>

      <el-col style="max-height: 300px; overflow: auto;">
        <pre>{{ msg }}</pre>
      </el-col>
    </el-row>
  </div>
  </template>

  <script>
  let id = 0;
  const geUniqueId = () => {
    return ++id;
  };
  export default {
    data() {

      const _this = this;
  
      return {
        size: 'medium',
        border: true,
        readonly: false,
        setMaxHeight: false,
        maxHeight: '350px',

        fixed: false,

        msg: '',

        tableData: [
          {
            name: '徐志伟',
            sex: '1',
            hobby: '喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉',
            fruit: ['2'],
            age: 29,
            education: '1',
            marry: true,
            address: ['江苏', '南京'],
            date: '2021-06-08',
            dateTime: '2021-08-05 00:00:00',
            id: geUniqueId()
          },
          {
            name: '徐志康',
            sex: '1',
            hobby: '喜欢的事可多呢',
            fruit: ['1'],
            age: 28,
            education: '3',
            marry: false,
            address: ['上海', '普陀'],
            date: '2021-06-08',
            dateTime: '2021-08-05 00:00:00',
            id: geUniqueId()
          },
          {
            name: '王琦',
            sex: '2',
            hobby: '喜欢玩3A大作',
            fruit: ['3'],
            age: 29,
            education: '2',
            marry: false,
            address: ['浙江', '杭州'],
            date: '2021-06-08',
            dateTime: '2021-08-05 00:00:00',
            id: geUniqueId()
          },
          {
            name: '李谢平',
            sex: '2',
            hobby: '喜欢跑马拉松',
            fruit: ['1'],
            age: 28,
            education: '1',
            marry: false,
            address: ['上海', '徐汇'],
            date: '2021-06-08',
            dateTime: '2021-08-05 00:00:00',
            id: geUniqueId()
          },

          {
            name: '徐志伟1',
            sex: '1',
            hobby: '喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉',
            fruit: ['2'],
            age: 29,
            education: '1',
            marry: true,
            address: ['江苏', '南京'],
            date: '2021-06-08',
            dateTime: '2021-08-05 00:00:00',
            id: geUniqueId()
          },
          {
            name: '徐志康1',
            sex: '1',
            hobby: '喜欢的事可多呢',
            fruit: ['1'],
            age: 28,
            education: '3',
            marry: false,
            address: ['上海', '普陀'],
            date: '2021-06-08',
            dateTime: '',
            id: geUniqueId()
          },
          {
            name: '王琦1',
            sex: '2',
            hobby: '喜欢玩3A大作',
            fruit: ['3'],
            age: 29,
            education: '2',
            marry: false,
            address: ['浙江', '杭州'],
            date: '2021-06-08',
            dateTime: '',
            id: geUniqueId()
          },
          {
            name: '李谢平1',
            sex: '2',
            hobby: '喜欢跑马拉松',
            fruit: ['1'],
            age: 28,
            education: '1',
            marry: false,
            address: ['上海', '徐汇'],
            date: '2021-06-08',
            dateTime: '',
            id: geUniqueId()
          }
        ],
  
        columns: [
          {
            columnData: {
              props: {
                width: 165,
                label: '操作',
                fixed: 'left'
              },
              scopedSlots: {
                default: function(scope) {
                  const h = this.$createElement;
                  return h('div', [
                    h('el-button', {
                      props: {
                        circle: true,
                        size: 'mini',
                        icon: 'el-icon-view'
                      },
                      on: {
                        click: function() {
                          const value = _this.tableData[scope.$index];
                          _this.msg = JSON.stringify(value, null, 2);
                        }
                      }
                    }),
                    h('el-button', {
                      props: {
                        circle: true,
                        icon: 'el-icon-top',
                        size: 'mini',
                        disabled: scope.$index === 0
                      },
                      on: {
                        click: function() {
                          const row = _this.tableData.splice(scope.$index, 1);
                          _this.tableData.splice(scope.$index - 1, 0, row[0]);
                        }
                      }
                    }),
                    h('el-button', {
                      props: {
                        circle: true,
                        icon: 'el-icon-bottom',
                        size: 'mini',
                        disabled: scope.$index === _this.tableData.length - 1
                      },
                      on: {
                        click: function() {
                          const row = _this.tableData.splice(scope.$index, 1);
                          _this.tableData.splice(scope.$index + 1, 0, row[0]);
                        }
                      }
                    }),
                    h('el-button', {
                      props: {
                        type: 'danger',
                        circle: true,
                        icon: 'el-icon-delete',
                        size: 'mini'
                      },
                      on: {
                        click: function() {
                          _this.tableData.splice(scope.$index, 1);
                        }
                      }
                    })
                  ]);
                }
              }
            }
          },

          {
            columnData: {
              props: {
                type: 'index',
                width: '50',
                label: '#',
                fixed: 'left'
              },
              scopedSlots: { // 如果不考虑样式的话，这里可以不用这么写，直接走el-table组件的内部头部渲染和列内容渲染
                header: function(scope) {
                  const h = this.$createElement;
                  return h('div', {
                    style: {
                      display: 'flex',
                      'justify-content': 'center'
                    }
                  }, '序号')
                },
                default: function(scope) {
                  const h = this.$createElement;
                  return h('div', {
                    style: {
                      display: 'flex',
                      'justify-content': 'center'
                    }
                  }, scope.$index + 1)
                }
              }
            }
          },
  
          {
            type: 'input',
            label: '姓名',
            prop: 'name',
            required: true,
            disabled: false,
            placeholder: '请输入姓名',
            readonly: false,
            inputData: {
              props: {
                clearable: true
              }
            },
            columnData: {
              props: {
                width: 200,
                sortable: true
              }
            }
          },

          {
            type: 'select',
            label: '学历',
            prop: 'education',
            required: true,
            disabled: false,
            readonly: false,
            ajaxOptions: {
              localList: [
                {
                  value: '1',
                  label: '本科'
                },
                {
                  value: '2',
                  label: '大专'
                },
                {
                  value: '3',
                  label: '职高'
                }
              ]
            },
            columnData: {
              props: {
                width: 200
              }
            }
          },

          {
            type: 'cascader',
            label: '住址',
            prop: 'address',
            required: true,
            placeholder: '选择省市',
            rules: [
              { type: 'array', required: true, message: '请至少地点', trigger: 'change' }
            ],
            columnData: {
              props: {
                width: 200
              }
            },
            cascaderData: {
              props: {
                props: { checkStrictly: false },
              }
            },
            ajaxOptions: {
              localList: [
                {
                  value: '上海',
                  label: '上海',
                  children: [
                    { value: '普陀', label: '普陀' },
                    { value: '黄埔', label: '黄埔' },
                    { value: '徐汇', label: '徐汇' }
                  ]
                },
                {
                  value: '江苏',
                  label: '江苏',
                  children: [
                    { value: '南京', label: '南京' },
                    { value: '苏州', label: '苏州' },
                    { value: '无锡', label: '无锡' }
                  ]
                },
                {
                  value: '浙江',
                  label: '浙江',
                  children: [
                    { value: '杭州', label: '杭州' },
                    { value: '宁波', label: '宁波' },
                    { value: '嘉兴', label: '嘉兴' }
                  ]
                }
              ]
            }
          },

          {
            type: 'input-number',
            label: '年龄',
            prop: 'age',
            required: true,
            disabled: false,
            readonly: false,
            inputNumberData: {
              props: {
                step: 1,
                controlsPosition: 'right'
              }
            },
            columnData: {
              props: {
                width: 150
              }
            }
          },

          {
            type: 'switch',
            span: 8,
            label: '已婚',
            prop: 'marry',
            required: true,
            disabled: false,
            readonly: false,
            columnData: {
              props: {
                width: 60
              }
            }
          },

          {
            type: 'date-picker',
            label: '日期',
            prop: 'date',
            required: true,
            disabled: false,
            placeholder: '选择日期',
            readonly: false,
            datePickerData: {
              props: {
                type: 'date'
              }
            },
            columnData: {
              props: {
                width: 200
              }
            }
          },

          {
            type: 'date-picker',
            label: '日期和时间点',
            prop: 'dateTime',
            required: true,
            disabled: false,
            placeholder: '选择日期和时间',
            readonly: false,
            datePickerData: {
              props: {
                type: 'datetime',
                valueFormat: 'yyyy-MM-dd HH:mm:ss'
              }
            },
            columnData: {
              props: {
                width: 212
              }
            }
          },

          {
            type: 'radio',
            span: 12,
            label: '性别',
            prop: 'sex',
            required: true,
            disabled: false,
            readonly: false,
            ajaxOptions: {
              localList: [
                {
                  label: '男',
                  value: '1'
                },
                {
                  label: '女',
                  value: '2'
                }
              ]
            },
            columnData: {
              props: {
                width: 130
              }
            }
          },

          {
            type: 'checkbox',
            label: '水果',
            prop: 'fruit',
            required: true,
            disabled: false,
            readonly: false,
            rules: [
              { type: 'array', required: true, message: '请至少选择一个水果', trigger: 'change' }
            ],
            ajaxOptions: {
              localList: [
                {
                  label: '苹果',
                  value: '1'
                },
                {
                  label: '香蕉',
                  value: '2'
                },
                {
                  label: '荔枝',
                  value: '3'
                }
              ]
            },
            columnData: {
              props: {
                width: 240
              }
            }
          },

          {
            type: 'input',
            label: '爱好',
            prop: 'hobby',
            required: true,
            disabled: false,
            placeholder: '请填写爱好',
            readonly: false,
            inputData: {
              props: {
                type: 'textarea',
                resize: 'none'
              }
            },
            columnData: {
              props: {
                width: 200
              }
            },
            renderReadonly: function(data, form, key) {
              const h = this.$createElement;
              return h('div', {
                style: {
                  height: '54px',
                  overflow: 'auto'
                }
              }, form[key]);
            }
          }
        ]
      };
    },
    methods: {
      addRow() {
        this.tableData.push({
          name: '',
          sex: '',
          hobby: '',
          fruit: [],
          age: 0,
          education: '',
          marry: false,
          address: [],
          date: '',
          id: geUniqueId()
        });
      },

      getValue() {
        this.msg = JSON.stringify(this.tableData, null, 2);
      },

      validate() {
        this.$refs.comp.validate((valid, invalidFields) => {
          console.log(valid, invalidFields)
        })
      },

      resetFields() {
        this.$refs.comp.resetFields();
      },

      handleChange(...args) {
        console.log(args)
      }
    }
  };
  </script>
```
:::

### TableWidgets Attributes
#### 以下是比较常用的属性,其他属性请参考Table组件
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | — | — |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。  | string/number | — | — |
| max-height | Table 的最大高度。合法的值为数字或者单位为 px 的高度。 | string/number | — | — |
| border | 是否带有纵向边框 | boolean | — | false |
| size | Table 的尺寸 | string | medium / small / mini | — |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/String | — | — |
| empty-text | 空数据时显示的文本内容，也可以通过 `slot="empty"` 设置 | String | — | 暂无数据 |
| default-sort | 默认的排序列的 prop 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序| Object | `order`: ascending, descending | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是ascending |
| columns  | 定义列的配置 | Array | — | 成员配置参考下面文档|
| props | 和columns的成员配置一致，用于转换columns成员的key | object | — | 具体参考下面文档 |
| mode | 是否开启分页功能 | string | — | pagination/'' |
| pagination-data | 分页组件的配置项 | object | — | 具体参考下面文档 |
| pagination-class | 分页组件包装容器的自定义样式 | string | — | — |

### columns 成员配置项
#### props属性可以转换下面的key

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type   | 控件类型(具体查看各个控件文档) | string      |                  必填                |  — |
| prop   | 控件双向绑定的变量 | string      |                  必填                |  — |
| label   | label文本 | string      |                  —              |  — |
| required   | 是否必填 | boolean      |                  —              |  — |
| disabled   | 控件是否禁用 | boolean      |                  —              |  false |
| placeholder   | 控件占位符 | string      |                  —              |  — |
| readonly   | 控件只读(渲染文本) | boolean      |                  —              |  false |
| rules   | 控件校验规则 | array/object      |                  —              |   — |
| ajaxOptions   | 接口请求(具体参考各个控件的文档) | object      |                  —              |   — |
| renderWidget   | 自定义控件渲染 | function      |                  —              |   — |
| renderReadonly   | 自定义只读控件渲染 | function      |                  —              |   — |
| columnData   | el-table-column组件的配置 | object      |                  —              |   具体参考下面文档 |
| type + Data   | 控件组件的配置 | object      |                  —              |   — |

### columnData.props

#### 以下是比较常用的属性,其他属性请参考TableColumn组件属性
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮 | string | selection/index/expand | — |
| index | 如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引 | number, Function(index) | - | - |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string | — | — |
| min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| resizable | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真） | boolean | — | true |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | Boolean | — | false |
| align | 对齐方式 | String | left/center/right | left |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | — |
| class-name | 列的 className | string | — | — |
| label-class-name | 当前列标题的自定义类名 | string | — | — |

### columnData.scopedSlots
| name | 说明 |
|------|--------|
| default | render函数，自定义列的内容，参数为 { row, column, $index } |
| header | render函数，自定义表头的内容. 参数为 { column, $index } |

### TableWidgets Events
#### 以下是比较常用的事件,其他属性请参考Table组件
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| change | 任一控件触发change | { prop: '控件绑定的prop', value: '控件当前的值', widgetInstance: '控件实例' }, rawData?: '接口的原始数据(当前被选中的)', valuekey?: '用于转换接口中的key值', rowIndex: '当前处于第一行' |

### TableWidgets Methods
#### table-widget组件基于table组件编写,使用`组件实例.tableInstance`便可以调用table组件的所有方法,下面是新增方法
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| validate | 对table进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。 | Function(callback: Function(boolean, object))
| validateAll | 对整个table进行校验的方法(内部不走el-form-item组件的校验)，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。 | Function(callback: Function(boolean, object))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
