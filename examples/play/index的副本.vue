<template>
  <div style="margin: 20px;">
    <div>
      <el-row>
        <el-col :span="6">
          <el-switch
            style="margin: 0 0 20px 10px;"
            v-model="readonly"
            active-text="只读"
            inactive-text="编辑"
            @change="handleChange"
          >
          </el-switch>
        </el-col>
        <el-col :span="6">
          <el-switch
            style="margin: 0 0 20px 10px;"
            v-model="setMaxHeight"
            active-text="流体高度"
            inactive-text="自适应"
            @change="handleChangeHeight"
          >
          </el-switch>
        </el-col>
        <el-col :span="6">
          <el-switch
            style="margin: 0 0 20px 10px;"
            v-model="border"
            active-text="带边框"
            inactive-text="不带边框"
            @change="(bool) => { border = bool }"
          >
          </el-switch>
        </el-col>
        <el-col :span="6">
          <el-switch
            style="margin: 0 0 20px 10px;"
            v-model="fixed"
            active-text="固定"
            inactive-text="不固定"
            @change="handleChangeFixed"
          >
          </el-switch>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form>
            <el-form-item label="大小设置">
              <el-radio v-model="size" label="large">large</el-radio>
              <el-radio v-model="size" label="medium">medium</el-radio>
              <el-radio v-model="size" label="small">small</el-radio>
              <el-radio v-model="size" label="mini">mini</el-radio>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-table-widgets
        rowKey="id"
        :data="tableData"
        :columns="columns"
        :border="border"
        ref="comp"
        style="width: 100%"
        @sort-change="sortChange"
        :size="size"
        mode="pagination"
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

        <el-col>
          <pre>{{ msg }}</pre>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
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
            hobby: '喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步',
            fruit: ['2'],
            age: 29,
            education: '',
            marry: true,
            address: ['江苏', '南京'],
            date: '2021-06-08',
            dateTime: '',
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
            dateTime: '',
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
            dateTime: '',
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
            dateTime: '',
            id: geUniqueId()
          },

          {
            name: '徐志伟1',
            sex: '1',
            hobby: '喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步',
            fruit: ['2'],
            age: 29,
            education: '',
            marry: true,
            address: ['江苏', '南京'],
            date: '2021-06-08',
            dateTime: '',
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
          },

          {
            name: '徐志伟2',
            sex: '1',
            hobby: '喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步喜欢睡觉,跑步',
            fruit: ['2'],
            age: 29,
            education: '',
            marry: true,
            address: ['江苏', '南京'],
            date: '2021-06-08',
            dateTime: '',
            id: geUniqueId()
          },
          {
            name: '徐志康2',
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
          // {
          //   name: '王琦2',
          //   sex: '2',
          //   hobby: '喜欢玩3A大作',
          //   fruit: ['3'],
          //   age: 29,
          //   education: '2',
          //   marry: false,
          //   address: ['浙江', '杭州'],
          //   date: '2021-06-08',
          //   dateTime: '',
          //   id: geUniqueId()
          // },
          // {
          //   name: '李谢平2',
          //   sex: '2',
          //   hobby: '喜欢跑马拉松',
          //   fruit: ['1'],
          //   age: 28,
          //   education: '1',
          //   marry: false,
          //   address: ['上海', '徐汇'],
          //   date: '2021-06-08',
          //   dateTime: '',
          //   id: geUniqueId()
          // }

        ],
  
        columns: [
          {
            columnData: {
              props: {
                width: 165,
                label: '操作',
                fixed: false
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
                          console.log(scope);
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
                label: '#'
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
                options: [
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
      sortChange() {
        console.log(99)
      },
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
        // this.$refs.comp.validate().catch((...args) => {
        //   console.log(args);
        // });
        this.$refs.comp.validate((valid, invalidFields) => {
          console.log('使用者: ', valid, invalidFields)
        })
      },

      resetFields() {
        this.$refs.comp.resetFields();
      },

      handleChange(val) {
        this.columns = this.columns.map((_) => {
          _.readonly = val;
          return _;
        });
      },

      handleChangeHeight(bool) {
        this.maxHeight = bool ? '350px' : '';
      },

      handleChangeFixed(bool) {
        this.columns[0]['columnData']['props']['fixed'] = bool;
      }
  
    },
    mounted() {
      window.xxx = this.$refs.comp;
      window.vue = Vue;
      window.ddd = this;
    }
  };
</script>

<style>
  .tip {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
    margin: 30px 0;
  }
</style>
