## RadioWidget 单选框控件

在一组备选项中进行单选。该组件是基于 ElRadioGroup 和 ElRadio 和 ElRadioButton 组件封装的,所以 ElRadio 单独使用的功能暂不支持,如需单独使用请直接使用 ElRadio 组件即可), 并且扩展了部分功能。

### 禁用状态

单选框不可用的状态。

:::demo 只要在`el-radio-widget`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。

```html
<template>
  <el-radio-widget disabled v-model="radio" :ajax-options="ajaxOptions">
  </el-radio-widget>
</template>

<script>
  export default {
    data() {
      return {
        radio: 2,
        ajaxOptions: {
          localList: [
            {
              label: "备选项1",
              value: 1,
            },
            {
              label: "备选项2",
              value: 2,
            },
            {
              label: "备选项3",
              value: 3,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo `el-radio-widget`元素可以实现单选组，给`ajaxOptions.localList`赋于数组列表，则会渲染多个 ElRadio 组件。另外，使用`radioData.on.change`事件来响应变化，它会传入一个参数`value`。

```html
<template>
  <el-radio-widget
    v-model="radio"
    :radio-data="radioData"
    :ajax-options="ajaxOptions"
  >
  </el-radio-widget>
</template>

<script>
  export default {
    data() {
      return {
        radio: 2,
        radioData: {
          on: {
            change: function(value) {
              console.log(this, value); // this: 指向 el-radio-widget 组件实例
            },
          },
        },
        ajaxOptions: {
          localList: [
            {
              label: "备选项1",
              value: 1,
            },
            {
              label: "备选项2",
              value: 2,
            },
            {
              label: "备选项3",
              value: 3,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

### 按钮样式

按钮样式的单选组合。

:::demo 设置`radioData.props.size = medium / small / mini`属性就能调整大小，设置`radioData.props.type = button`属性就能变成按钮样式的单选组合。

```html
<template>
  <div>
    <el-radio-widget
      v-model="radio"
      :radio-data="radioData"
      :ajax-options="ajaxOptions"
    >
    </el-radio-widget>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio: 2,
        radioData: {
          props: {
            type: "button",
            size: "small",
          },
          on: {
            change: function(value) {
              console.log(this, value); // this: 指向 el-radio-widget 组件实例
            },
          },
        },
        ajaxOptions: {
          localList: [
            {
              label: "上海",
              value: 1,
            },
            {
              label: "北京",
              value: 2,
            },
            {
              label: "深圳",
              value: 3,
            },
            {
              label: "广州",
              value: 4,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

### 带有边框

:::demo 设置`radioData.props.border = true`属性可以渲染为带有边框的单选框。给`ajaxOptions.localList`的成员添加`disabled`属性就能单独禁用

```html
<template>
  <el-radio-widget
    v-model="radio"
    :radio-data="radioData"
    :ajax-options="ajaxOptions"
  >
  </el-radio-widget>
</template>

<script>
  export default {
    data() {
      return {
        radio: 2,
        radioData: {
          props: {
            border: true,
            size: "small",
          },
        },
        ajaxOptions: {
          localList: [
            {
              label: "备选项1",
              value: 1,
            },
            {
              label: "备选项2",
              value: 2,
              disabled: true,
            },
            {
              label: "备选项3",
              value: 3,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

### 接口数据(回调)

:::demo `ajaxOptions`详细属性参考下文,提供接口地址及参数，根据接口请求成功或者失败回调中返回列表数据,通过`props`属性来转换列表数据的属性

```html
<template>
  <el-radio-widget
    v-model="radio"
    :radio-data="radioData"
    :ajax-options="ajaxOptions"
  >
  </el-radio-widget>
</template>

<script>
  export default {
    data() {
      return {
        radio: 2,
        radioData: {
          props: {},
        },
        ajaxOptions: {
          url: "/gemini/sys/eetablecore/dic/4.do",
          type: "post",
          data: {
            sign: "A6A0166DD91699E1462A53B20E455742",
            time: "1622509478336",
          },
          success(res) {
            return res.datas.code.rows;
          },
          error(status) {
            // 在error回调中返回一个数组对象,也能设置列表数据(建议在success中返回,这里因为演示数据，所以才加了此功能)
            return [
              {
                name: "数据1",
                id: "1",
              },
              {
                name: "数据2",
                id: "2",
              },
            ];
          },
          props: {
            // 数据转换 因为接口返回的数据的字段不统一,需要使用 props 属性来转换
            label: "name",
            value: "id",
          },
        },
      };
    },
  };
</script>
```

:::

### 接口数据(path)

:::demo `ajaxOptions`详细属性参考下文,提供接口地址及参数，根据接口请求成功或者失败回调中返回列表数据,通过`path`属性来获取接口数据对应 path 的值

```html
<template>
  <el-radio-widget
    v-model="radio"
    :radio-data="radioData"
    :ajax-options="ajaxOptions"
  >
  </el-radio-widget>
  <p>接口无数据,无渲染ui</p>
</template>

<script>
  export default {
    data() {
      return {
        radio: 2,
        radioData: {
          props: {},
        },
        ajaxOptions: {
          url: "/gemini/sys/eetablecore/dic/4.do",
          type: "post",
          data: {
            sign: "A6A0166DD91699E1462A53B20E455742",
            time: "1622509478336",
          },
          path: "datas.code.rows", // 根据key自动获取到对应的值
          props: {
            // 数据转换 因为接口返回的数据的字段不统一,需要使用 props 属性来转换
            label: "name",
            value: "id",
          },
        },
      };
    },
  };
</script>
```

:::

### 只读控件

:::demo `readonly`属性可以开启该组件不渲染 radio 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-radio-widget readonly v-model="radio1" style="width: 320px;">
</el-radio-widget>
<div style="margin: 20px 0;"></div>
<el-radio-widget
  readonly
  v-model="radio2"
  :render-readonly="renderReadonly"
  style="width: 520px;"
>
</el-radio-widget>

<script>
  export default {
    data() {
      return {
        radio1: "1",
        radio2: "2",
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
  <el-radio-widget
    v-model="radio"
    :render-widget="renderWidget"
    :ajax-options="ajaxOptions"
  >
  </el-radio-widget>
  <p>{{ radio }}</p>
</div>
<script>
  export default {
    data() {
      const render = function(h, item) {
        const { label, value } = item;
        const vm = this;

        const inputVnode = h("input", {
          domProps: { value, checked: value == vm.value },
          attrs: {
            type: "radio",
            id: value,
          },
          on: {
            input(evt) {
              vm.$emit("input", evt.target.value);
            },
          },
        });
        const labelVnode = h(
          "label",
          {
            attrs: {
              for: value,
            },
          },
          label
        );
        return [inputVnode, labelVnode];
      };

      return {
        radio: "2",
        ajaxOptions: {
          localList: [
            {
              label: "备选项1",
              value: "1",
            },
            {
              label: "备选项2",
              value: "2",
            },
            {
              label: "备选项3",
              value: "3",
            },
          ],
        },
        renderWidget: function(h) {
          const vm = this;
          return h(
            "div",
            vm.dataList.map((item) => {
              return render.call(vm, h, item);
            })
          );
        },
      };
    },
  };
</script>
```

:::

### RadioWidget Attributes

| 参数            | 说明                                                                              | 类型                      | 可选值 | 默认值 |
| --------------- | --------------------------------------------------------------------------------- | ------------------------- | ------ | ------ |
| type            | 控件类型                                                                          | string                    | —      | radio  |
| value / v-model | 绑定值                                                                            | string / number / boolean | —      | —      |
| readonly        | 控件是否只读                                                                      | boolean                   | —      | false  |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                  | boolean                   | —      | false  |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 radio-widget 组件实例,含有一个 h 参数   | function                  | —      | —      |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 radio-widget 组件实例,含有一个 h 参数 | function                  | —      | —      |
| radioData       | radio 组件的所有 props 属性,attrs 属性,on 事件 详见下文                           | object                    | —      | {}     |

### radioData.props

| 参数   | 说明                                 | 类型    | 可选值                | 默认值 |
| ------ | ------------------------------------ | ------- | --------------------- | ------ |
| border | 是否显示边框                         | boolean | —                     | false  |
| size   | Radio 的尺寸，仅在 border 为真时有效 | string  | medium / small / mini | —      |

### radioData.on

| 事件名称 | 说明                   | 回调参数  |
| -------- | ---------------------- | --------- |
| change   | 绑定值变化时触发的事件 | 选中时 值 |

### ajaxOptions 属性

| 参数      | 说明                                                                  | 类型     | 可选值 | 默认值                            |
| --------- | --------------------------------------------------------------------- | -------- | ------ | --------------------------------- |
| localList | 当不使用接口请求时,使用本地数据时,可以使用该字段                      | array    | —      | —                                 |
| url       | 接口地址                                                              | string   | —      | —                                 |
| type      | 请求类型 post/get                                                     | string   | —      | —                                 |
| data      | 请求参数                                                              | object   | —      | —                                 |
| before    | 接口请求前的回调                                                      | function | —      | —                                 |
| success   | 接口请求后成功的回调                                                  | object   | —      | —                                 |
| error     | 接口请求后失败的回调                                                  | object   | —      | —                                 |
| props     | 对接口返回值的转换                                                    | object   | —      | { label:'label', value: 'value' } |
| path      | 如果不提供 success 函数,可直接提供获取值的路径,内部会自动获取正确的值 | string   | —      | —                                 |
