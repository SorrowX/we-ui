<template>
  <div class="play">
    <div>
      <el-row>
        <el-col :span="8">
          <el-button size="small" @click="handleClick1">全部禁用</el-button>
          <el-button size="small" @click="handleClick2">局部禁用</el-button>
          <el-button size="small" @click="handleClick3">全部启用</el-button>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
      </el-row>

      <el-table-widgets
        ref="table"
        :data="tableData"
        :columns="columns"
      >
      </el-table-widgets>
    </div>
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
      handleClick1() {
        this.$refs.table.disable()
      },
      handleClick2() {
        this.$refs.table.enable()
        this.$refs.table.disable([[0, ['address']], [2, ['name', 'education']]])
      },
      handleClick3() {
        this.$refs.table.enable()
      }
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
