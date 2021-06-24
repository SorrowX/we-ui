## InputNumberWidget 计数器控件

仅允许输入标准的数字值，可定义范围。该组件是基于 InputNumber 组件封装的,含有 InputNumber 组件的全部功能,且扩展了部分功能。

### 基础用法

:::demo 要使用它，只需要在`el-input-number-widget`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。`inputNumberData.props`属性中可使用 InputNumber 组件的所有 props 属性.如果你只需要控制数值在某一范围内，可以设置`min`属性和`max`属性，不设置`min`和`max`时，最小值为 0。`inputNumberData.on`属性中可使用 InputNumber 组件的所有事件。

```html
<template>
  <el-input-number-widget
    v-model="num"
    :inputNumberData="inputNumberData"
    style="width: 180px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num: 1,
        inputNumberData: {
          props: {
            min: 1,
            max: 10,
            label: "描述文字",
          },
          on: {
            change: function(value) {
              // 这里的this指向 input-number-widget 组件实例,不要使用箭头函数
              console.log(value, this);
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 禁用状态

:::demo `disabled`属性接受一个`Boolean`，设置为`true`即可禁用整个组件。

```html
<template>
  <el-input-number-widget
    v-model="num"
    :disabled="true"
    style="width: 180px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num: 1,
      };
    },
  };
</script>
```

:::

### 步数

允许定义递增递减的步数控制

:::demo 在`inputNumberData.props`上设置`step`属性可以控制步长，接受一个`Number`。

```html
<template>
  <el-input-number-widget
    v-model="num"
    :inputNumberData="{ props: { step: 2 } }"
    style="width: 180px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num: 5,
      };
    },
  };
</script>
```

:::

### 严格步数

:::demo 在`inputNumberData.props`上设置`step-strictly`属性，如果这个属性被设置为`true`，则只能输入步数的倍数。

```html
<template>
  <el-input-number-widget
    v-model="num"
    :inputNumberData="{ props: { step: 2, stepStrictly: true } }"
    style="width: 180px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num: 2,
      };
    },
  };
</script>
```

:::

### 精度

:::demo 在`inputNumberData.props`上设置 `precision` 属性可以控制数值精度，接收一个 `Number`。`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。

```html
<template>
  <el-input-number-widget
    v-model="num"
    :inputNumberData="{ props: { step: 0.1, max: 10, precision: 2 } }"
    style="width: 180px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num: 1,
      };
    },
  };
</script>
```

:::

### 尺寸

额外提供了 `medium`、`small`、`mini` 三种尺寸的数字输入框, 在`inputNumberData.props`上设置即可

:::demo

```html
<template>
  <el-input-number-widget
    v-model="num1"
    style="width: 180px"
  ></el-input-number-widget>
  <el-input-number-widget
    :inputNumberData="{ props: { size: 'medium' } }"
    v-model="num2"
    style="width: 180px"
  ></el-input-number-widget>
  <el-input-number-widget
    :inputNumberData="{ props: { size: 'small' } }"
    v-model="num3"
    style="width: 140px"
  ></el-input-number-widget>
  <el-input-number-widget
    :inputNumberData="{ props: { size: 'mini' } }"
    v-model="num4"
    style="width: 140px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1,
      };
    },
  };
</script>
```

:::

### 按钮位置

:::demo 在`inputNumberData.props`上设置 `controls-position` 属性可以控制按钮位置。

```html
<template>
  <el-input-number-widget
    v-model="num"
    :inputNumberData="inputNumberData"
    style="width: 180px"
  ></el-input-number-widget>
</template>
<script>
  export default {
    data() {
      return {
        num: 1,
        inputNumberData: {
          props: {
            controlsPosition: "right",
            min: 1,
            max: 10,
          },
          on: {
            change: function(value) {
              console.log(value);
            },
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

:::demo `readonly`属性可以开启该组件不渲染 input-number 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-input-number-widget readonly v-model="num1" style="width: 180x;">
</el-input-number-widget>
<div style="margin: 20px 0;"></div>
<el-input-number-widget
  readonly
  v-model="num2"
  :renderReadonly="renderReadonly"
  style="width: 180px;"
>
</el-input-number-widget>

<script>
  export default {
    data() {
      return {
        num1: 100,
        num2: 1000,
        renderReadonly: function(h) {
          return h(
            "span",
            {
              style: { color: "green" },
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
  <el-input-number-widget
    v-model="num1"
    :renderWidget="renderWidget"
    style="width: 320px;"
  >
  </el-input-number-widget>
  <p>{{ num1 }}</p>
</div>
<script>
  export default {
    data() {
      return {
        num1: "我是自定义渲染控件",
        renderWidget: function(h) {
          const vm = this;
          return h("input", {
            domProps: { value: vm.value },
            attrs: {
              placeholder: vm.placeholder,
              type: "number",
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

### InputNumberWidget Attributes

| 参数            | 说明                                                                                     | 类型     | 可选值 | 默认值       |
| --------------- | ---------------------------------------------------------------------------------------- | -------- | ------ | ------------ |
| type            | 控件类型                                                                                 | string   | —      | input-number |
| value / v-model | 绑定值                                                                                   | number   | —      | 0            |
| readonly        | 控件是否只读                                                                             | boolean  | —      | false        |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                         | boolean  | —      | false        |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 input-number-widget 组件实例,含有一个 h 参数   | function | —      | —            |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 input-number-widget 组件实例,含有一个 h 参数 | function | —      | —            |
| inputNumberData | input-number 组件的所有 props 属性,attrs 属性,on 事件,详见下文                           | object   | —      | {}           |

### inputNumberData.props

| 参数              | 说明                     | 类型    | 可选值       | 默认值    |
| ----------------- | ------------------------ | ------- | ------------ | --------- |
| min               | 设置计数器允许的最小值   | number  | —            | -Infinity |
| max               | 设置计数器允许的最大值   | number  | —            | Infinity  |
| step              | 计数器步长               | number  | —            | 1         |
| step-strictly     | 是否只能输入 step 的倍数 | boolean | —            | false     |
| precision         | 数值精度                 | number  | —            | —         |
| size              | 计数器尺寸               | string  | large, small | —         |
| disabled          | 是否禁用计数器           | boolean | —            | false     |
| controls          | 是否使用控制按钮         | boolean | —            | true      |
| controls-position | 控制按钮位置             | string  | right        | -         |
| name              | 原生属性                 | string  | —            | —         |
| label             | 输入框关联的 label 文字  | string  | —            | —         |
| placeholder       | 输入框默认 placeholder   | string  | -            | -         |

### inputNumberData.on

| 事件名称 | 说明                                                                                           | 回调参数               |
| -------- | ---------------------------------------------------------------------------------------------- | ---------------------- |
| change   | 绑定值被改变时触发(函数中的 this 指向 input-number-widget 组件实例,不要使用箭头函数)           | currentValue, oldValue |
| blur     | 在组件 Input 失去焦点时触发 (函数中的 this 指向 input-number-widget 组件实例,不要使用箭头函数) | (event: Event)         |
| focus    | 在组件 Input 获得焦点时触发 (函数中的 this 指向 input-number-widget 组件实例,不要使用箭头函数) | (event: Event)         |

### InputNumberWidget Methods

| 方法名   | 说明                                                                           | 参数 |
| -------- | ------------------------------------------------------------------------------ | ---- |
| getValue | 获取 inputNumberWidget 组件绑定的值（input-number-widget 组件的方法）          | —    |
| setValue | 给 inputNumberWidget 组件绑定的值赋值（input-number-widget 组件的方法）        | —    |
| focus    | 使 input 获取焦点 （input-number 组件的方法, eg: this.\$refs.core.focus()）    | -    |
| select   | 选中 input 中的文字 （input-number 组件的方法, eg: this.\$refs.core.select()） | —    |
