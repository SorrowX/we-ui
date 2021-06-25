## TimeSelectWidget 固定时间选择器控件

用于选择或输入时间。该组件是基于 TimeSelect 组件封装的,含有 TimeSelect 组件的全部功能,且扩展了部分功能。

### 固定时间点

提供几个固定的时间点供用户选择

:::demo 使用 el-time-select-widget 标签，在`timeSelectData.props`上分别通过`start`、`end`和`step`指定可选的起始时间、结束时间和步长

```html
<el-time-select-widget
  v-model="value"
  :time-select-data="timeSelectData"
  placeholder="选择时间"
  style="width: 220px;"
>
</el-time-select-widget>

<script>
  export default {
    data() {
      return {
        value: "",
        timeSelectData: {
          props: {
            pickerOptions: {
              start: "08:30",
              step: "00:15",
              end: "18:30",
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 固定时间范围

若先选择开始时间，则结束时间内备选项的状态会随之改变

:::demo

```html
<template>
  <el-time-select-widget
    placeholder="起始时间"
    v-model="startTime"
    :time-select-data="{
      props: {
        pickerOptions: {
          start: '08:30',
          step: '00:15',
          end: '18:30',
        },
      },
    }"
    style="width: 220px;"
  >
  </el-time-select-widget>
  <el-time-select-widget
    placeholder="结束时间"
    v-model="endTime"
    :time-select-data="{
      props: {
        pickerOptions: {
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: startTime,
        },
      },
    }"
    style="width: 220px;"
  >
  </el-time-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        startTime: "",
        endTime: "",
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

:::demo `readonly`属性可以开启该组件不渲染 time-select 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-time-select-widget readonly v-model="time1" style="width: 320px;">
</el-time-select-widget>
<div style="margin: 20px 0;"></div>
<el-time-select-widget
  readonly
  v-model="time2"
  :renderReadonly="renderReadonly"
>
</el-time-select-widget>

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
  <el-time-select-widget
    placeholder="请选择时间"
    v-model="time1"
    :renderWidget="renderWidget"
    style="width: 300px;"
  >
  </el-time-select-widget>
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

### TimeSelectWidget Attributes

| 参数            | 说明                                                                                    | 类型     | 可选值 | 默认值      |
| --------------- | --------------------------------------------------------------------------------------- | -------- | ------ | ----------- |
| type            | 控件类型                                                                                | string   | —      | time-select |
| value / v-model | 绑定值                                                                                  | string   | —      | —           |
| placeholder     | 输入框占位文本                                                                          | string   | —      | —           |
| readonly        | 控件是否只读                                                                            | boolean  | —      | false       |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                        | boolean  | —      | false       |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 time-select-widget 组件实例,含有一个 h 参数   | function | —      | —           |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 time-select-widget 组件实例,含有一个 h 参数 | function | —      | —           |
| timeSelectData  | time-select 组件的所有 props 属性,attrs 属性,on 事件都定义在其对象上,详见下文           | object   | —      | {}          |

### timeSelectData.props

| 参数              | 说明                                 | 类型                                  | 可选值                                                | 默认值               |
| ----------------- | ------------------------------------ | ------------------------------------- | ----------------------------------------------------- | -------------------- |
| readonly          | 完全只读                             | boolean                               | —                                                     | false                |
| disabled          | 禁用                                 | boolean                               | —                                                     | false                |
| editable          | 文本框可输入                         | boolean                               | —                                                     | true                 |
| clearable         | 是否显示清除按钮                     | boolean                               | —                                                     | true                 |
| size              | 输入框尺寸                           | string                                | medium / small / mini                                 | —                    |
| placeholder       | 非范围选择时的占位内容               | string                                | —                                                     | —                    |
| start-placeholder | 范围选择时开始日期的占位内容         | string                                | —                                                     | —                    |
| end-placeholder   | 范围选择时开始日期的占位内容         | string                                | —                                                     | —                    |
| align             | 对齐方式                             | string                                | left / center / right                                 | left                 |
| picker-options    | 当前时间日期选择器特有的选项参考下表 | object                                | —                                                     | {}                   |
| default-value     | 可选，选择器打开时默认显示的时间     | Date(TimePicker) / string(TimeSelect) | 可被`new Date()`解析(TimePicker) / 可选值(TimeSelect) | —                    |
| prefix-icon       | 自定义头部图标的类名                 | string                                | —                                                     | el-icon-time         |
| clear-icon        | 自定义清空图标的类名                 | string                                | —                                                     | el-icon-circle-close |

### timeSelectData.props.pickerOptions

| 参数    | 说明                                 | 类型   | 可选值 | 默认值 |
| ------- | ------------------------------------ | ------ | ------ | ------ |
| start   | 开始时间                             | string | —      | 09:00  |
| end     | 结束时间                             | string | —      | 18:00  |
| step    | 间隔时间                             | string | —      | 00:30  |
| minTime | 最小时间，小于该时间的时间段将被禁用 | string | —      | 00:00  |
| maxTime | 最大时间，大于该时间的时间段将被禁用 | string | —      | —      |  | string | 小时：`HH`，分：`mm`，秒：`ss`，AM/PM `A` | 'HH:mm:ss' |

### timeSelectData.attrs

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| name | 原生属性 | string | —      | —      |

### timeSelectData.on

| 事件名 | 说明                    | 参数       |
| ------ | ----------------------- | ---------- |
| change | 用户确认选定的值时触发  | 组件绑定值 |
| blur   | 当 input 失去焦点时触发 | 组件实例   |
| focus  | 当 input 获得焦点时触发 | 组件实例   |

### Methods

| 方法名   | 说明                                                                     | 参数 |
| -------- | ------------------------------------------------------------------------ | ---- |
| getValue | 获取 TimeSelectWidget 组件绑定的值（TimeSelectWidget 组件的方法）        | —    |
| setValue | 给 TimeSelectWidget 组件绑定的值赋值（TimeSelectWidget 组件的方法）      | —    |
| focus    | 使 input 获取焦点（TimeSelect 组件的方法, eg: this.\$refs.core.focus()） | -    |
