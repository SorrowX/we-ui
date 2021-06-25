## TimePickerWidget 时间选择器控件

用于选择或输入时间。该组件是基于 TimePicker 组件封装的,含有 TimePicker 组件的全部功能,且扩展了部分功能。

### 任意时间点

可以选择任意时间

:::demo 使用 el-time-picker-widget 标签，通过`selectableRange`限制可选时间范围。提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。

```html
<template>
  <el-time-picker-widget
    v-model="value1"
    :timePickerData="timePickerData1"
    placeholder="任意时间点"
    style="width: 220px;"
  >
  </el-time-picker-widget>
  <el-time-picker-widget
    arrow-control
    v-model="value2"
    :timePickerData="timePickerData2"
    placeholder="任意时间点"
    style="width: 220px;"
  >
  </el-time-picker-widget>
</template>

<script>
  export default {
    data() {
      return {
        value1: new Date(2016, 9, 10, 18, 40),
        value2: new Date(2016, 9, 10, 18, 40),
        timePickerData1: {
          props: {
            pickerOptions: {
              selectableRange: "18:30:00 - 20:30:00",
            },
          },
        },
        timePickerData2: {
          props: {
            arrowControl: true,
            pickerOptions: {
              selectableRange: "18:30:00 - 20:30:00",
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 任意时间范围

可选择任意的时间范围

:::demo 添加`is-range`属性即可选择时间范围，同样支持`arrow-control`属性。

```html
<template>
  <el-time-picker-widget
    v-model="value1"
    :timePickerData="timePickerData1"
    placeholder="选择时间范围"
    style="width: 300px;"
  >
  </el-time-picker-widget>
  <el-time-picker-widget
    v-model="value2"
    :timePickerData="timePickerData2"
    style="width: 300px;"
  >
  </el-time-picker-widget>
</template>

<script>
  export default {
    data() {
      return {
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        timePickerData1: {
          props: {
            isRange: true,
            rangeSeparator: "至",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
          },
        },
        timePickerData2: {
          props: {
            arrowControl: true,
            isRange: true,
            rangeSeparator: "至",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
          },
        },
      };
    },
  };
</script>
```

:::

:::tip
下面是新增 demo
:::

### 只读控件

:::demo `readonly`属性可以开启该组件不渲染 time-picker 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-time-picker-widget readonly v-model="time1" style="width: 320px;">
</el-time-picker-widget>
<div style="margin: 20px 0;"></div>
<el-time-picker-widget
  readonly
  v-model="time2"
  :renderReadonly="renderReadonly"
>
</el-time-picker-widget>

<script>
  export default {
    data() {
      return {
        time1: "10:26:00",
        time2: "10:26:30",
        renderReadonly: function(h) {
          return h(
            "div",
            {
              style: { color: "red" },
            },
            this.value
          );
        },
      };
    },
  };
</script>
```

:::

### 自定义渲染控件

:::demo 使用`renderWidget`属性可以自定义渲染控件.

```html
<div>
  <el-time-picker-widget
    placeholder="请选择时间"
    v-model="time1"
    :renderWidget="renderWidget"
    style="width: 300px;"
  >
  </el-time-picker-widget>
  <p>{{ time1 }}</p>
</div>
<script>
  export default {
    data() {
      return {
        time1: "10:30",
        renderWidget: function(h) {
          const vm = this;
          return h("input", {
            domProps: { value: vm.value },
            attrs: {
              placeholder: vm.placeholder,
              type: "time",
            },
            style: {
              padding: "8px 5px",
              border: "1px solid #ccc",
            },
            on: {
              input(evt) {
                vm.$emit("input", evt.target.value);
              },
            },
          });
        },
      };
    },
  };
</script>
```

:::

### TimePickerWidget Attributes

| 参数            | 说明                                                                                    | 类型     | 可选值 | 默认值      |
| --------------- | --------------------------------------------------------------------------------------- | -------- | ------ | ----------- |
| type            | 控件类型                                                                                | string   | —      | time-picker |
| value / v-model | 绑定值                                                                                  | date     | —      | —           |
| placeholder     | 输入框占位文本                                                                          | string   | —      | —           |
| readonly        | 控件是否只读                                                                            | boolean  | —      | false       |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                        | boolean  | —      | false       |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 time-picker-widget 组件实例,含有一个 h 参数   | function | —      | —           |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 time-picker-widget 组件实例,含有一个 h 参数 | function | —      | —           |
| timePickerData  | time-picker 组件的所有 props 属性,attrs 属性,on 事件都定义在其对象上,详见下文           | object   | —      | {}          |

### timePickerData.props

| 参数              | 说明                                                                 | 类型                                  | 可选值                                                   | 默认值               |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------- | -------------------- |
| readonly          | 完全只读                                                             | boolean                               | —                                                        | false                |
| disabled          | 禁用                                                                 | boolean                               | —                                                        | false                |
| editable          | 文本框可输入                                                         | boolean                               | —                                                        | true                 |
| clearable         | 是否显示清除按钮                                                     | boolean                               | —                                                        | true                 |
| size              | 输入框尺寸                                                           | string                                | medium / small / mini                                    | —                    |
| placeholder       | 非范围选择时的占位内容                                               | string                                | —                                                        | —                    |
| start-placeholder | 范围选择时开始日期的占位内容                                         | string                                | —                                                        | —                    |
| end-placeholder   | 范围选择时开始日期的占位内容                                         | string                                | —                                                        | —                    |
| is-range          | 是否为时间范围选择，仅对`<el-time-picker>`有效                       | boolean                               | —                                                        | false                |
| arrow-control     | 是否使用箭头进行时间选择，仅对`<el-time-picker>`有效                 | boolean                               | —                                                        | false                |
| align             | 对齐方式                                                             | string                                | left / center / right                                    | left                 |
| popper-class      | TimePicker 下拉框的类名                                              | string                                | —                                                        | —                    |
| picker-options    | 当前时间日期选择器特有的选项参考下表                                 | object                                | —                                                        | {}                   |
| range-separator   | 选择范围时的分隔符                                                   | string                                | -                                                        | '-'                  |
| value-format      | 可选，仅 TimePicker 时可用，绑定值的格式。不指定则绑定值为 Date 对象 | string                                | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | —                    |
| default-value     | 可选，选择器打开时默认显示的时间                                     | Date(TimePicker) / string(TimeSelect) | 可被`new Date()`解析(TimePicker) / 可选值(TimeSelect)    | —                    |
| prefix-icon       | 自定义头部图标的类名                                                 | string                                | —                                                        | el-icon-time         |
| clear-icon        | 自定义清空图标的类名                                                 | string                                | —                                                        | el-icon-circle-close |

### timePickerData.props.pickerOptions

| 参数            | 说明                                                                                                | 类型           | 可选值                                    | 默认值     |
| --------------- | --------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------- | ---------- |
| selectableRange | 可选时间段，例如`'18:30:00 - 20:30:00'`或者传入数组`['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']` | string / array | —                                         | —          |
| format          | 时间格式化(TimePicker)                                                                              | string         | 小时：`HH`，分：`mm`，秒：`ss`，AM/PM `A` | 'HH:mm:ss' |

### timePickerData.attrs

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| name | 原生属性 | string | —      | —      |

### timePickerData.on

| 事件名 | 说明                    | 参数       |
| ------ | ----------------------- | ---------- |
| change | 用户确认选定的值时触发  | 组件绑定值 |
| blur   | 当 input 失去焦点时触发 | 组件实例   |
| focus  | 当 input 获得焦点时触发 | 组件实例   |

### Methods

| 方法名   | 说明                                                                     | 参数 |
| -------- | ------------------------------------------------------------------------ | ---- |
| getValue | 获取 TimePickerWidget 组件绑定的值（TimePickerWidget 组件的方法）        | —    |
| setValue | 给 TimePickerWidget 组件绑定的值赋值（TimePickerWidget 组件的方法）      | —    |
| focus    | 使 input 获取焦点（TimePicker 组件的方法, eg: this.\$refs.core.focus()） | -    |
