## DatePickerWidget 日期/日期时间选择器控件

用于选择或输入日期。该组件是基于 DatePicker 组件封装的,含有 DatePicker 组件的全部功能,且扩展了部分功能。

### 选择日

以「日」为基本单位，基础的日期选择控件

:::demo 基本单位由`type`属性指定。快捷选项需配置`picker-options`对象中的`shortcuts`，禁用日期通过 `disabledDate` 设置，传入函数

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-widget
      v-model="value1"
      placeholder="选择日期"
      :date-picker-data="{ props: { type: 'date' } }"
      style="width: 280px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker-widget
      v-model="value2"
      placeholder="选择日期"
      :date-picker-data="datePickerData"
      style="width: 280px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        value2: "",
        datePickerData: {
          props: {
            type: "date",
            align: "right",
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
              shortcuts: [
                {
                  text: "今天",
                  onClick(picker) {
                    picker.$emit("pick", new Date());
                  },
                },
                {
                  text: "昨天",
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", date);
                  },
                },
                {
                  text: "一周前",
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", date);
                  },
                },
              ],
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

:::demo

```html
<div class="container">
  <div class="block">
    <span class="demonstration">周</span>
    <el-date-picker-widget
      v-model="value1"
      :date-picker-data="{ props: { type: 'week', format: 'yyyy 第 WW 周' } }"
      placeholder="选择周"
      style="width: 280px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">月</span>
    <el-date-picker-widget
      v-model="value2"
      :date-picker-data="{ props: { type: 'month' } }"
      placeholder="选择月"
      style="width: 280px;"
    >
    </el-date-picker-widget>
  </div>
</div>
<div class="container">
  <div class="block">
    <span class="demonstration">年</span>
    <el-date-picker-widget
      v-model="value3"
      :date-picker-data="{ props: { type: 'year' } }"
      placeholder="选择年"
      style="width: 280px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">多个日期</span>
    <el-date-picker-widget
      v-model="value4"
      :date-picker-data="{ props: { type: 'dates' } }"
      placeholder="选择一个或多个日期"
      style="width: 280px;"
    >
    </el-date-picker-widget>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
      };
    },
  };
</script>
```

:::

### 选择日期范围

可在一个选择器中便捷地选择一个时间范围

:::demo 在选择日期范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前月份，可以使用`unlink-panels`属性解除联动。

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-widget
      v-model="value1"
      :date-picker-data="datePickerData1"
      style="width: 320px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker-widget
      v-model="value2"
      :date-picker-data="datePickerData2"
      style="width: 320px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datePickerData1: {
          props: {
            type: "daterange",
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
          },
        },
        datePickerData2: {
          props: {
            type: "daterange",
            align: "right",
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            unlinkPanels: true,
            pickerOptions: {
              shortcuts: [
                {
                  text: "最近一周",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [start, end]);
                  },
                },
                {
                  text: "最近一个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                  },
                },
                {
                  text: "最近三个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                  },
                },
              ],
            },
          },
        },
        value1: "",
        value2: "",
      };
    },
  };
</script>
```

:::

### 选择月份范围

可在一个选择器中便捷地选择一个月份范围

:::demo 在选择月份范围时，默认情况下左右面板会联动。如果希望两个面板各自独立切换当前年份，可以使用`unlink-panels`属性解除联动。

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-widget
      v-model="value1"
      :date-picker-data="datePickerData1"
      style="width: 320px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker-widget
      v-model="value2"
      :date-picker-data="datePickerData2"
      style="width: 320px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datePickerData1: {
          props: {
            type: "monthrange",
            rangeSeparator: "至",
            startPlaceholder: "开始月份",
            endPlaceholder: "结束月份",
          },
        },
        datePickerData2: {
          props: {
            type: "monthrange",
            align: "right",
            unlinkPanels: true,
            rangeSeparator: "至",
            startPlaceholder: "开始月份",
            endPlaceholder: "结束月份",
            pickerOptions: {
              shortcuts: [
                {
                  text: "本月",
                  onClick(picker) {
                    picker.$emit("pick", [new Date(), new Date()]);
                  },
                },
                {
                  text: "今年至今",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date(new Date().getFullYear(), 0);
                    picker.$emit("pick", [start, end]);
                  },
                },
                {
                  text: "最近六个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 6);
                    picker.$emit("pick", [start, end]);
                  },
                },
              ],
            },
          },
        },
        value1: "",
        value2: "",
      };
    },
  };
</script>
```

:::

### 日期格式

使用`format`指定输入框的格式；使用`value-format`指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。以下为可用的格式化字串，以 UTC 2017 年 1 月 2 日 03:04:05 为例：

:::warning
请注意大小写
:::

| 格式        | 含义             | 备注                                             | 举例          |
| ----------- | ---------------- | ------------------------------------------------ | ------------- |
| `yyyy`      | 年               |                                                  | 2017          |
| `M`         | 月               | 不补 0                                           | 1             |
| `MM`        | 月               |                                                  | 01            |
| `W`         | 周               | 仅周选择器的 `format` 可用；不补 0               | 1             |
| `WW`        | 周               | 仅周选择器的 `format` 可用                       | 01            |
| `d`         | 日               | 不补 0                                           | 2             |
| `dd`        | 日               |                                                  | 02            |
| `H`         | 小时             | 24 小时制；不补 0                                | 3             |
| `HH`        | 小时             | 24 小时制                                        | 03            |
| `h`         | 小时             | 12 小时制，须和 `A` 或 `a` 使用；不补 0          | 3             |
| `hh`        | 小时             | 12 小时制，须和 `A` 或 `a` 使用                  | 03            |
| `m`         | 分钟             | 不补 0                                           | 4             |
| `mm`        | 分钟             |                                                  | 04            |
| `s`         | 秒               | 不补 0                                           | 5             |
| `ss`        | 秒               |                                                  | 05            |
| `A`         | AM/PM            | 仅 `format` 可用，大写                           | AM            |
| `a`         | am/pm            | 仅 `format` 可用，小写                           | am            |
| `timestamp` | JS 时间戳        | 仅 `value-format` 可用；组件绑定值为`number`类型 | 1483326245000 |
| `[MM]`      | 不需要格式化字符 | 使用方括号标识不需要格式化的字符 (如 [A][mm])    | MM            |

:::demo

```html
<template>
  <div class="block">
    <span class="demonstration">默认为 Date 对象</span>
    <div class="demonstration">值：{{ value1 }}</div>
    <el-date-picker-widget
      v-model="value1"
      placeholder="选择日期"
      :date-picker-data="{ props: { type: 'date', format: 'yyyy 年 MM 月 dd 日' } }"
      style="width: 250px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">使用 value-format</span>
    <div class="demonstration">值：{{ value2 }}</div>
    <el-date-picker-widget
      v-model="value2"
      placeholder="选择日期"
      :date-picker-data="{ props: { type: 'date', format: 'yyyy 年 MM 月 dd 日', valueFormat: 'yyyy-MM-dd' } }"
      style="width: 250px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">时间戳</span>
    <div class="demonstration">值：{{ value3 }}</div>
    <el-date-picker-widget
      v-model="value3"
      placeholder="选择日期"
      :date-picker-data="{ props: { type: 'date', format: 'yyyy 年 MM 月 dd 日', valueFormat: 'timestamp' } }"
      style="width: 250px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        value2: "",
        value3: "",
      };
    },
  };
</script>
```

:::

### 默认显示日期

在选择日期范围时，指定起始日期和结束日期的默认时刻。

:::demo 选择日期范围时，默认情况下，起始日期和结束日期的时间部分均为当天的 0 点 0 分 0 秒。通过`default-time`可以分别指定二者的具体时刻。`default-time`接受一个数组，其中的值为形如`12:00:00`的字符串，第一个值控制起始日期的时刻，第二个值控制结束日期的时刻。

```html
<template>
  <div class="block">
    <p>组件值：{{ value }}</p>
    <el-date-picker-widget
      v-model="value"
      :date-picker-data="datePickerData"
      style="width: 360px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        datePickerData: {
          props: {
            type: "daterange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            defaultTime: ["00:00:00", "23:59:59"],
          },
        },
      };
    },
  };
</script>
```

:::

### 日期和时间点

:::demo 通过设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。快捷选项的使用方法与 Date Picker 相同。

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-widget
      v-model="value1"
      placeholder="选择日期时间"
      :date-picker-data="{ props: { type: 'datetime' } }"
      style="width: 200px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker-widget
      v-model="value2"
      placeholder="选择日期时间"
      :date-picker-data="datePickerData"
      style="width: 200px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">设置默认时间</span>
    <el-date-picker-widget
      v-model="value3"
      placeholder="选择日期时间"
      :date-picker-data="{ props: { type: 'datetime', defaultTime: '12:00:00' } }"
      style="width: 200px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datePickerData: {
          props: {
            type: "datetime",
            align: "right",
            pickerOptions: {
              shortcuts: [
                {
                  text: "今天",
                  onClick(picker) {
                    picker.$emit("pick", new Date());
                  },
                },
                {
                  text: "昨天",
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", date);
                  },
                },
                {
                  text: "一周前",
                  onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", date);
                  },
                },
              ],
            },
          },
        },

        value1: "",
        value2: "",
        value3: "",
      };
    },
  };
</script>
```

:::

### 日期和时间范围

:::demo 设置`type`为`datetimerange`即可选择日期和时间范围

```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker-widget
      v-model="value1"
      :date-picker-data="datePickerData1"
      style="width: 360px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker-widget
      v-model="value2"
      :date-picker-data="datePickerData2"
      style="width: 360px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datePickerData1: {
          props: {
            type: "datetimerange",
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
          },
        },
        datePickerData2: {
          props: {
            type: "datetimerange",
            align: "right",
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            pickerOptions: {
              shortcuts: [
                {
                  text: "最近一周",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [start, end]);
                  },
                },
                {
                  text: "最近一个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                  },
                },
                {
                  text: "最近三个月",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                  },
                },
              ],
            },
          },
        },
        value1: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
        value2: "",
      };
    },
  };
</script>
```

:::

### 默认的起始与结束时刻

:::demo 使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的`00:00:00`作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束日期时所使用的具体时刻。`default-time`接受一个数组，数组每项值为字符串，形如`12:00:00`，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

```html
<template>
  <div class="block">
    <span class="demonstration">起始日期时刻为 12:00:00</span>
    <el-date-picker-widget
      v-model="value1"
      :date-picker-data="datePickerData1"
      style="width: 360px;"
    >
    </el-date-picker-widget>
  </div>
  <div class="block">
    <span class="demonstration"
      >起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span
    >
    <el-date-picker-widget
      v-model="value2"
      :date-picker-data="datePickerData2"
      style="width: 360px;"
    >
    </el-date-picker-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        value2: "",
        datePickerData1: {
          props: {
            type: "datetimerange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            defaultTime: ["12:00:00"],
          },
        },
        datePickerData2: {
          props: {
            type: "datetimerange",
            rangeSeparator: "至",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            defaultTime: ["12:00:00", "08:00:00"],
            align: "right",
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

### 自定义分隔符

:::demo 使用具名`range-separator`插槽可以自定义分隔符

```html
<el-date-picker-widget
  v-model="date"
  :date-picker-data="datePickerData"
  style="width: 450px;"
>
</el-date-picker-widget>

<script>
  export default {
    data() {
      return {
        datePickerData: {
          props: {
            type: "datetimerange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          slots: {
            rangeSeparator: function(h) {
              const vm = this;
              return h(
                "div",
                {
                  slot: "range-separator",
                  style: {
                    color: "red",
                    width: "20px",
                  },
                },
                "~"
              );
            },
          },
        },
        date: "",
      };
    },
  };
</script>
```

:::

### 只读控件

:::demo `readonly`属性可以开启该组件不渲染 date-picker 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-date-picker-widget
  placeholder="请输入内容"
  readonly
  v-model="date1"
  style="width: 320px;"
>
</el-date-picker-widget>
<div style="margin: 20px 0;"></div>
<el-date-picker-widget
  placeholder="请输入内容"
  readonly
  v-model="date2"
  :renderReadonly="renderReadonly"
  style="width: 320px;"
>
</el-date-picker-widget>

<script>
  export default {
    data() {
      return {
        date1: "2021-06-25",
        date2: "2021-06-25",
        renderReadonly: function(h) {
          return h(
            "span",
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
  <el-date-picker-widget
    v-model="date1"
    :renderWidget="renderWidget1"
    style="width: 520px;"
  >
  </el-date-picker-widget>
  <p>{{ date1 }}</p>

  <el-date-picker-widget
    v-model="date2"
    :renderWidget="renderWidget2"
    style="width: 520px;"
  >
  </el-date-picker-widget>
  <p>{{ date2 }}</p>

  <el-date-picker-widget
    v-model="date3"
    :renderWidget="renderWidget3"
    style="width: 520px;"
  >
  </el-date-picker-widget>
  <p>{{ date3 }}</p>

  <el-date-picker-widget
    v-model="date4"
    :renderWidget="renderWidget4"
    style="width: 520px;"
  >
  </el-date-picker-widget>
  <p>{{ date4 }}</p>
</div>
<script>
  export default {
    data() {
      const getVnode = function(h, type) {
        const vm = this;
        return h("input", {
          domProps: { value: vm.value },
          attrs: {
            placeholder: vm.placeholder,
            type,
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
      };

      return {
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        renderWidget1: function(h) {
          return getVnode.call(this, h, "date");
        },
        renderWidget2: function(h) {
          return getVnode.call(this, h, "datetime-local");
        },
        renderWidget3: function(h) {
          return getVnode.call(this, h, "month");
        },
        renderWidget4: function(h) {
          return getVnode.call(this, h, "week");
        },
      };
    },
  };
</script>
```

:::

### DatePickerWidget Attributes

| 参数            | 说明                                                                                  | 类型            | 可选值 | 默认值      |
| --------------- | ------------------------------------------------------------------------------------- | --------------- | ------ | ----------- |
| type            | 控件类型                                                                              | string          | —      | date-picker |
| value / v-model | 绑定值                                                                                | string / number | —      | —           |
| placeholder     | 输入框占位文本                                                                        | string          | —      | —           |
| readonly        | 控件是否只读                                                                          | boolean         | —      | false       |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                      | boolean         | —      | false       |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 DatePickerWidget 组件实例,含有一个 h 参数   | function        | —      | —           |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 DatePickerWidget 组件实例,含有一个 h 参数 | function        | —      | —           |
| datePickerData  | DatePicker 组件的所有 props 属性,attrs 属性,on 事件都定义在其对象上,详见下文          | object          | —      | {}          |

### datePickerData.props

| 参数               | 说明                                           | 类型                                        | 可选值                                                                                                                                                                            | 默认值               |
| ------------------ | ---------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| readonly           | 完全只读                                       | boolean                                     | —                                                                                                                                                                                 | false                |
| disabled           | 禁用                                           | boolean                                     | —                                                                                                                                                                                 | false                |
| editable           | 文本框可输入                                   | boolean                                     | —                                                                                                                                                                                 | true                 |
| clearable          | 是否显示清除按钮                               | boolean                                     | —                                                                                                                                                                                 | true                 |
| size               | 输入框尺寸                                     | string                                      | large, small, mini                                                                                                                                                                | —                    |
| placeholder        | 非范围选择时的占位内容                         | string                                      | —                                                                                                                                                                                 | —                    |
| start-placeholder  | 范围选择时开始日期的占位内容                   | string                                      | —                                                                                                                                                                                 | —                    |
| end-placeholder    | 范围选择时结束日期的占位内容                   | string                                      | —                                                                                                                                                                                 | —                    |
| time-arrow-control | 是否使用箭头进行时间选择                       | boolean                                     | —                                                                                                                                                                                 | false                |
| type               | 显示类型                                       | string                                      | year/month/date/week/ datetime/datetimerange/daterange                                                                                                                            | date                 |
| format             | 显示在输入框中的格式                           | string                                      | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)                                                                                                                          | yyyy-MM-dd HH:mm:ss  |
| align              | 对齐方式                                       | string                                      | left, center, right                                                                                                                                                               | left                 |
| popper-class       | DateTimePicker 下拉框的类名                    | string                                      | —                                                                                                                                                                                 | —                    |
| picker-options     | 当前时间日期选择器特有的选项参考下表           | object                                      | —                                                                                                                                                                                 | {}                   |
| range-separator    | 选择范围时的分隔符                             | string                                      | -                                                                                                                                                                                 | '-'                  |
| default-value      | 可选，选择器打开时默认显示的时间               | Date                                        | 可被`new Date()`解析                                                                                                                                                              | —                    |
| default-time       | 选中日期后的默认具体时刻                       | 非范围选择时：string / 范围选择时：string[] | 非范围选择时：形如`12:00:00`的字符串；范围选择时：数组，长度为 2，每项值为字符串，形如`12:00:00`，第一项指定开始日期的时刻，第二项指定结束日期的时刻。不指定会使用时刻 `00:00:00` | —                    |
| value-format       | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string                                      | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi)                                                                                                                          | —                    |
| name               | 原生属性                                       | string                                      | —                                                                                                                                                                                 | —                    |
| unlink-panels      | 在范围选择器里取消两个日期面板之间的联动       | boolean                                     | —                                                                                                                                                                                 | false                |
| prefix-icon        | 自定义头部图标的类名                           | string                                      | —                                                                                                                                                                                 | el-icon-date         |
| clear-icon         | 自定义清空图标的类名                           | string                                      | —                                                                                                                                                                                 | el-icon-circle-close |

### datePickerData.props.pickerOptions

| 参数           | 说明                                                              | 类型           | 可选值 | 默认值 |
| -------------- | ----------------------------------------------------------------- | -------------- | ------ | ------ |
| shortcuts      | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表 | Object[]       | —      | —      |
| disabledDate   | 设置禁用状态，参数为当前日期，要求返回 Boolean                    | Function       | —      | —      |
| cellClassName  | 设置日期的 className                                              | Function(Date) | —      | —      |
| firstDayOfWeek | 周起始日                                                          | Number         | 1 到 7 | 7      |

### datePickerData.props.pickerOptions.shortcuts

| 参数    | 说明                                                                                                  | 类型     | 可选值 | 默认值 |
| ------- | ----------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| text    | 标题文本                                                                                              | string   | —      | —      |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.\$emit('pick', new Date()) | function | —      | —      |

### datePickerData.on

| Event Name | Description             | Parameters                                             |
| ---------- | ----------------------- | ------------------------------------------------------ |
| change     | 用户确认选定的值时触发  | 组件绑定值。格式与绑定值一致，可受 `value-format` 控制 |
| blur       | 当 input 失去焦点时触发 | 组件实例                                               |
| focus      | 当 input 获得焦点时触发 | 组件实例                                               |

### datePickerData.slots

| Name            | 说明         |
| --------------- | ------------ |
| range-separator | 自定义分隔符 |

### DatePickerWidget Methods

| 方法名   | 说明                                                                | 参数 |
| -------- | ------------------------------------------------------------------- | ---- |
| getValue | 获取 DatePickerWidget 组件绑定的值（DatePickerWidget 组件的方法）   | —    |
| setValue | 给 DatePickerWidget 组件绑定的值赋值（DatePickerWidget 组件的方法） | —    |
| focus    | 使 input 获取焦点（this.\$refs.core.focus()）                       | —    |
