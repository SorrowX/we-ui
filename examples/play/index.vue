<template>
  <div class="spec">
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
  </div>
</template>

<script>
const CustomInput2 = {
  props: {
    type: {
      type: String,
      default: 'custom-input'
    },
    value: null,
    placeholder: null,
    renderReadonly: {
      type: Function
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: true
    },
    bool: null,
    str: null
  },
  created() {
    console.log(this.$props)
  },
  render: function(h) {
    const vm = this;
    if (this.readonly) return renderReadonly && renderReadonly.call(this, h);
    return h("input", {
      domProps: { value: vm.value, disabled: vm.disabled },
      attrs: {
        placeholder: vm.placeholder,
      },
      style: {
        width: '95%',
        height: '28px',
        padding: "2px 5px",
        border: "1px solid #ccc",
        'border-radius': '3px'
      },
      on: {
        input(evt) {
          vm.$emit("input", evt.target.value);
          vm.$parent.validate('change');
        },
      },
      });
  },
}
export default {
    data() {
      return {
        model: {
          name: '徐志伟',
          region: '',
          date: '',
          delivery: false,
          type: ['地推活动'],
          resource: '0',
          desc: ''
        },
        data: [
          {
            type: 'input',
            span: 12,
            placeholder: '请输入活动名称',
            prop: 'name',
            label: '徐志伟',
            hidden: false,
            'v-bind': {
              bool: true,
              str: 'str'
            }
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
            label: '特殊资源hahaha',
            hidden: false,
            radioData: {
              on: {
                change: function(value) {
                  console.log(this, value)
                  window.xxx = this
                }
              }
            },
            "ajaxOptions":{
                "url":"/emap/sys/eetablecore/dic/82.do?sign=B39974D1B7CA7300066854D2B6355674&time=1630047538577",
                "type":"get",
                "path":"datas.code.rows",
                "props":{
                    "label":"name",
                    "value":"id"
                }
            }
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
          name: [{ required: true, min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
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
    },
    mounted() {
      setTimeout(() => {
        this.data[5]['hidden'] = true
        // this.data[0]['rules'] = [{ required: true, min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]

        this.rules.date[0].required = false

        
        console.log('10s', this.data)
      }, 10 * 1000)

      setTimeout(() => {
        this.data[5]['hidden'] = false
        console.log('15s', this.data)

      }, 15 * 1000)
    },
    beforeCreate() {
      if (!this._installed) {
        this._installed = true
        this.$widgets.use('custom', CustomInput2)
      }
    },
  };
</script>

<style scoped>
</style>
