## SwitchWidget 开关控件

表示两种相互对立的状态间的切换，多用于触发「开/关」。该组件是基于 Switch 组件封装的,含有 Switch 组件的全部功能,且扩展了部分功能。

### 基本用法

:::demo 绑定`v-model`到一个`Boolean`类型的变量。在`switchData.props`上可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

```html
<el-switch-widget v-model="value" :switchData="switchData"> </el-switch-widget>

<script>
  export default {
    data() {
      return {
        value: true,
        switchData: {
          props: {
            activeColor: "#13ce66",
            inactiveColor: "#ff4949",
          },
        },
      };
    },
  };
</script>
```

:::

### 文字描述

:::demo 在`switchData.props`上使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

```html
<el-switch-widget
  v-model="value1"
  :switchData="{ props: { activeText: '按月付费', inactiveText: '按年付费' } }"
>
</el-switch-widget>
<el-switch-widget
  style="display: block; margin-top: 30px;"
  v-model="value2"
  :switchData="{ props:
    {
      activeText: '按月付费',
      inactiveText: '按年付费',
      activeColor: '#13ce66',
      inactiveColor: '#ff4949',
    }
  }"
>
</el-switch-widget>

<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true,
      };
    },
  };
</script>
```

:::

### 扩展的 value 类型

:::demo 在`switchData.props`上设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。

```html
<el-tooltip :content="'Switch value: ' + value" placement="top">
  <el-switch-widget
    v-model="value"
    :switchData="{ props:
      {
        activeValue: 100,
        inactiveValue: 0,
        activeColor: '#13ce66',
        inactiveColor: '#ff4949',
      }
    }"
    style="width: 40px;"
  >
  </el-switch-widget>
</el-tooltip>

<script>
  export default {
    data() {
      return {
        value: 100,
      };
    },
  };
</script>
```

:::

### 禁用状态

:::demo 设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

```html
<el-switch-widget
  v-model="value1"
  disabled
  style="display: inline-block; width: 40px;"
>
</el-switch-widget>
<el-switch-widget
  v-model="value2"
  disabled
  style="display: inline-block; width: 40px; margin-left: 50px;"
>
</el-switch-widget>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: false,
      };
    },
  };
</script>
```

:::

### SwitchWidget Attributes

| 参数            | 说明                                                                              | 类型                      | 可选值 | 默认值 |
| --------------- | --------------------------------------------------------------------------------- | ------------------------- | ------ | ------ |
| type            | 控件类型                                                                          | string                    | —      | switch |
| value / v-model | 绑定值                                                                            | boolean / string / number | —      | —      |
| readonly        | 控件是否只读                                                                      | boolean                   | —      | false  |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                  | boolean                   | —      | false  |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 input-widget 组件实例,含有一个 h 参数   | function                  | —      | —      |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 input-widget 组件实例,含有一个 h 参数 | function                  | —      | —      |
| switchData      | switch 组件的所有 props 属性,attrs 属性,on 事件都定义在其对象上,详见下文          | object                    | —      | {}     |

### switchData.props

| 参数                | 说明                                                          | 类型                      | 可选值 | 默认值  |
| ------------------- | ------------------------------------------------------------- | ------------------------- | ------ | ------- |
| disabled            | 是否禁用                                                      | boolean                   | —      | false   |
| width               | switch 的宽度（像素）                                         | number                    | —      | 40      |
| active-icon-class   | switch 打开时所显示图标的类名，设置此项会忽略 `active-text`   | string                    | —      | —       |
| inactive-icon-class | switch 关闭时所显示图标的类名，设置此项会忽略 `inactive-text` | string                    | —      | —       |
| active-text         | switch 打开时的文字描述                                       | string                    | —      | —       |
| inactive-text       | switch 关闭时的文字描述                                       | string                    | —      | —       |
| active-value        | switch 打开时的值                                             | boolean / string / number | —      | true    |
| inactive-value      | switch 关闭时的值                                             | boolean / string / number | —      | false   |
| active-color        | switch 打开时的背景色                                         | string                    | —      | #409EFF |
| inactive-color      | switch 关闭时的背景色                                         | string                    | —      | #C0CCDA |
| name                | switch 对应的 name 属性                                       | string                    | —      | —       |
| validate-event      | 改变 switch 状态时是否触发表单的校验                          | boolean                   | -      | true    |

### switchData.on

| 事件名称 | 说明                            | 回调参数   |
| -------- | ------------------------------- | ---------- |
| change   | switch 状态发生变化时的回调函数 | 新状态的值 |

### SwitchWidget Methods

| 方法名   | 说明                                                                   | 参数 |
| -------- | ---------------------------------------------------------------------- | ---- |
| getValue | 获取 SwitchWidget 组件绑定的值（switch-widget 组件的方法）             | —    |
| setValue | 给 SwitchWidget 组件绑定的值赋值（switch-widget 组件的方法）           | —    |
| focus    | 使 Switch 获取焦点 （switch 组件的方法, eg: this.\$refs.core.focus()） | -    |
