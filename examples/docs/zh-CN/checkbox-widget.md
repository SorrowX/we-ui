## CheckboxWidget 多选框控件

一组备选项中进行多选。该组件是基于 ElCheckbox 和 ElCheckboxGroup 和 ElCheckboxButton 组件封装的。

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo `checkbox-widget`元素能把多个 checkbox 管理为一组，只需要使用`v-model`绑定`Array`类型的变量即可。 根据`ajaxOptions.localList`列表值渲染多个 checkbox。`label`为展示的值，`value`为选中的值。

```html
<template>
  <el-checkbox-widget v-model="checkList" :ajax-options="ajaxOptions">
  </el-checkbox-widget>
</template>

<script>
  export default {
    data() {
      return {
        checkList: ["1", "5"],
        ajaxOptions: {
          localList: [
            {
              label: "复选框 A",
              value: "1",
            },
            {
              label: "复选框 B",
              value: "2",
            },
            {
              label: "复选框 C",
              value: "3",
            },
            {
              label: "禁用",
              value: "4",
              disabled: true,
            },
            {
              label: "选中且禁用",
              value: "5",
              disabled: true,
            },
          ],
        },
      };
    },
  };
</script>
```

:::

### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo

```html
<template>
  <el-checkbox-widget
    v-model="checkedCities"
    :ajax-options="ajaxOptions"
    :checkbox-data="checkboxData"
  >
  </el-checkbox-widget>
</template>
<script>
  export default {
    data() {
      return {
        checkboxData: {
          props: {
            min: 1,
            max: 2,
          },
        },
        checkedCities: ["上海", "北京"],
        ajaxOptions: {
          localList: [
            {
              label: "上海",
              value: "上海",
            },
            {
              label: "北京",
              value: "北京",
            },
            {
              label: "广州",
              value: "广州",
            },
            {
              label: "深圳",
              value: "深圳",
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

按钮样式的多选组合。

:::demo 设置`checkboxData.props.size = medium / small / mini`属性能调整大小，设置`checkboxData.props.type = button`属性就能变成按钮样式。

```html
<template>
  <el-checkbox-widget
    v-model="checkedCities"
    :ajax-options="ajaxOptions"
    :checkbox-data="checkboxData"
  >
  </el-checkbox-widget>
</template>
<script>
  export default {
    data() {
      return {
        checkboxData: {
          props: {
            type: "button",
            size: "small",
          },
        },
        checkedCities: ["上海", "北京"],
        ajaxOptions: {
          localList: [
            {
              label: "上海",
              value: "上海",
            },
            {
              label: "北京",
              value: "北京",
            },
            {
              label: "广州",
              value: "广州",
              disabled: true,
            },
            {
              label: "深圳",
              value: "深圳",
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

:::demo 设置`checkboxData.props.border`属性可以渲染为带有边框的多选框。

```html
<template>
  <el-checkbox-widget
    v-model="checkedList"
    :ajax-options="ajaxOptions"
    :checkbox-data="checkboxData"
  >
  </el-checkbox-widget>
</template>

<script>
  export default {
    data() {
      return {
        checkboxData: {
          props: {
            border: true,
            size: "small",
          },
        },
        checkedList: ["1"],
        ajaxOptions: {
          localList: [
            {
              label: "选项1",
              value: "1",
            },
            {
              label: "选项2",
              value: "2",
            },
            {
              label: "选项3",
              value: "3",
            },
            {
              label: "选项4",
              value: "4",
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
  <el-checkbox-widget v-model="checkbox" :ajax-options="ajaxOptions">
  </el-checkbox-widget>
</template>

<script>
  export default {
    data() {
      return {
        checkbox: ["2"],
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
  <el-checkbox-widget v-model="checkbox" :ajax-options="ajaxOptions">
  </el-checkbox-widget>
  <p>接口无数据,无渲染ui</p>
</template>

<script>
  export default {
    data() {
      return {
        checkbox: [],
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

:::demo `readonly`属性可以开启该组件不渲染 checkbox 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-checkbox-widget readonly v-model="checkbox1"> </el-checkbox-widget>
<div style="margin: 20px 0;"></div>
<el-checkbox-widget
  readonly
  v-model="checkbox2"
  :render-readonly="renderReadonly"
>
</el-checkbox-widget>

<script>
  export default {
    data() {
      return {
        checkbox1: ["徐志伟", "徐志康"],
        checkbox2: ["徐志伟", "徐志康"],
        renderReadonly: function(h) {
          return h(
            "span",
            {
              style: { color: "red" },
            },
            this.value.join("~")
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
  <el-checkbox-widget
    v-model="checkbox"
    :render-widget="renderWidget"
    :ajax-options="ajaxOptions"
  >
  </el-checkbox-widget>
  <p>{{ checkbox }}</p>
</div>
<script>
  export default {
    data() {
      const render = function(h, item) {
        const { label, value } = item;
        const vm = this;

        const inputVnode = h("input", {
          domProps: { value, checked: vm.value.includes(value) },
          attrs: {
            type: "checkbox",
            id: value,
          },
          on: {
            input(evt) {
              const arr = vm.value;
              const { checked, value } = evt.target;
              if (checked && !arr.includes(value)) {
                arr.push(value);
              } else if (!checked && arr.includes(value)) {
                arr.splice(arr.findIndex((_) => _ === value), 1);
              }
              vm.$emit("input", arr);
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
        checkbox: ["2"],
        ajaxOptions: {
          localList: [
            {
              label: "选项1",
              value: "1",
            },
            {
              label: "选项2",
              value: "2",
            },
            {
              label: "选项3",
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

### CheckboxWidget Attributes

| 参数            | 说明                                                                                 | 类型                       | 可选值 | 默认值   |
| --------------- | ------------------------------------------------------------------------------------ | -------------------------- | ------ | -------- |
| type            | 控件类型                                                                             | string                     | —      | checkbox |
| value / v-model | 绑定值                                                                               | string(只读时使用) / array | —      | —        |
| readonly        | 控件是否只读                                                                         | boolean                    | —      | false    |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                     | boolean                    | —      | false    |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 checkbox-widget 组件实例,含有一个 h 参数   | function                   | —      | —        |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 checkbox-widget 组件实例,含有一个 h 参数 | function                   | —      | —        |
| checkboxData    | radio 组件的所有 props 属性,attrs 属性,on 事件 详见下文                              | object                     | —      | {}       |

### checkboxData.props

| 参数       | 说明                                                             | 类型    | 可选值                | 默认值  |
| ---------- | ---------------------------------------------------------------- | ------- | --------------------- | ------- |
| size       | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效 | string  | medium / small / mini | —       |
| disabled   | 是否禁用                                                         | boolean | —                     | false   |
| min        | 可被勾选的 checkbox 的最小数量                                   | number  | —                     | —       |
| max        | 可被勾选的 checkbox 的最大数量                                   | number  | —                     | —       |
| text-color | 按钮形式的 Checkbox 激活时的文本颜色                             | string  | —                     | #ffffff |
| fill       | 按钮形式的 Checkbox 激活时的填充色和边框色                       | string  | —                     | #409EFF |

### checkboxData.on

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| change   | 当绑定值变化时触发的事件 | 更新后的值 |

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
