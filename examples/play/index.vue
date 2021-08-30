<template>
  <div class="spec">
    <el-form-widgets :data="data" :model="model" layout="grid" />
  </div>
</template>

<script>
export default {
  data() {

  const prepend = function(h, text) {
    return h(
      "span",
      {
        slot: "prepend",
        style: {
          fontSize: "12px",
          color: "red",
          margin: "6px 0 0 0",
        },
      },
      text
    );
  }

  const append = function(h, html) {
    return h('div', {
      slot: "append",
      domProps: {
        'innerHTML': html
      }
    })
  }

  const label = function(h, widget) {
    return h(
      "div",
      {
        slot: "label",
        class: "form-widgets-custom-label__wrap",
      },
      [
        h(
          "p",
          {
            class: "form-widgets-custom-label__text",
            attrs: {
              title: widget.label,
            },
          },
          widget.label
        ),
        h('div', {
          style: {
            marginTop: '-12px'
          },
          domProps: {
            'innerHTML': `<div style="font-size: 12px; color: #ccc;">自定义富文本...</div>`
          }
        })
      ]
    );
  }
  
  return {
    model: {
      name: "徐志伟",
      hobby: '',
      sex: false
    },
    data: [
      {
        type: "input",
        span: 24,
        placeholder: "请输入活动名称",
        prop: "name",
        label: "活动名称活动名称活动名称活动名称活动名称活动名称活动名称",
        inputData: {
          style: {
            marginTop: "4px",
          },
        },
        formItemData: {
          slots: {
            label,
            prepend: function(h, widget) {
              return prepend(h, '我是一个特殊的说明，其实也没啥说的，就想说一下。')
            },
            append: function(h, widget) {
              return append(h, `<i>我也可以在下面显示一些说明</i>`)
            }
          },
        },
      },
      {
        type: "input",
        span: 24,
        placeholder: "请输入",
        prop: "hobby",
        label: "兴趣爱好",
        inputData: {
          style: {
            marginTop: "4px",
          },
          props: {
            type: 'textarea'
          }
        },
        formItemData: {
          slots: {
            append: function(h, widget) {
              return append(h, `<i>我是来自富文本编辑器中的文本</i>`)
            },
          },
        },
      },
      {
        type: "switch",
        placeholder: "",
        prop: "sex",
        label: "性别",
        formItemData: {
          slots: {
            prepend: function(h, widget) {
              return prepend(h, '我可以在上面显示一些说明')
            }
          },
        },
      },
    ],
  };
  },
};
</script>

<style>
/* .form-widgets-custom-label__text {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #333;
}
.form-widgets-custom-label__wrap {
    margin-left: -7px;
    line-height: 28px;
} */
</style>
