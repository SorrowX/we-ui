## InputWidget 输入框控件

通过鼠标或键盘输入字符。该组件是基于 Input 组件封装的,含有 Input 组件的全部功能,且扩展了部分功能。

### 基础用法

:::demo

```html
<el-input-widget
  v-model="input"
  placeholder="请输入内容"
  style="width: 320px;"
></el-input-widget>

<script>
  export default {
    data() {
      return {
        input: "",
      };
    },
  };
</script>
```

:::

### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input-widget 组件

```html
<el-input-widget
  placeholder="请输入内容"
  v-model="input"
  :disabled="true"
  style="width: 320px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        input: "",
      };
    },
  };
</script>
```

:::

### 可清空

:::demo `inputData`属性是\$createElement api 中的第二个参数, 在`inputData.props`对象中使用`clearable`属性即可得到一个可清空的输入框

```html
<el-input-widget
  placeholder="请输入内容"
  v-model="input"
  :input-data="inputData"
  style="width: 320px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        input: "",
        inputData: {
          props: {
            clearable: true,
          },
        },
      };
    },
  };
</script>
```

:::

### 密码框

:::demo 在`inputData.props`中使用`show-password`属性即可得到一个可切换显示隐藏的密码框

```html
<el-input-widget
  placeholder="请输入内容"
  v-model="input"
  :input-data="inputData"
  style="width: 320px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        input: "",
        inputData: {
          props: {
            showPassword: true,
          },
        },
      };
    },
  };
</script>
```

:::

### 带 icon 的输入框

带有图标标记输入类型

:::demo 在`inputData.props`中使用 `prefix-icon` 和 `suffix-icon` 属性就能在 input-widget 组件首部和尾部增加显示图标，也可以在`inputData.slots`中编写 具名 slot render 来放置图标。

```html
<div class="demo-input-suffix">
  属性方式：
  <el-input-widget
    placeholder="请选择日期"
    v-model="input1"
    :input-data="{ props: { suffixIcon: 'el-icon-date' } }"
    style="width: 320px;"
  >
  </el-input-widget>

  <el-input-widget
    placeholder="请输入内容"
    v-model="input2"
    :input-data="{ props: { prefixIcon: 'el-icon-search' } }"
    style="width: 320px;"
  >
  </el-input-widget>
</div>
<div class="demo-input-suffix">
  slot 方式：
  <el-input-widget
    placeholder="请选择日期"
    v-model="input3"
    :input-data="inputData1"
    style="width: 320px;"
  >
  </el-input-widget>

  <el-input-widget
    placeholder="请输入内容"
    v-model="input4"
    :input-data="inputData2"
    style="width: 320px;"
  >
  </el-input-widget>
</div>

<script>
  export default {
    data() {
      return {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        inputData1: {
          slots: {
            suffix: function(h) {
              return h("i", {
                staticClass: "el-input__icon el-icon-date",
                slot: "suffix",
              });
            },
          },
        },
        inputData2: {
          slots: {
            prefix: function(h) {
              const vm = this;
              return h("i", {
                staticClass: "el-input__icon el-icon-search",
                style: {
                  cursor: "pointer",
                },
                slot: "prefix",
                on: {
                  click() {
                    vm.$message("点击事件");
                  },
                },
              });
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 文本域

用于输入多行文本信息，在`inputData.props`中通过将 `type` 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制

```html
<el-input-widget
  placeholder="请输入内容"
  v-model="textarea"
  :input-data="{ props: { type: 'textarea', rows: 2 } }"
  style="width: 420px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        textarea: "",
      };
    },
  };
</script>
```

:::

### 可自适应文本高度的文本域

在`inputData.props`中通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

:::demo

```html
<el-input-widget
  placeholder="请输入内容"
  v-model="textarea1"
  :input-data="{ props: { type: 'textarea', autosize: true } }"
  style="width: 420px;"
>
</el-input-widget>
<div style="margin: 20px 0;"></div>
<el-input-widget
  placeholder="请输入内容"
  v-model="textarea2"
  :input-data="{ props: { type: 'textarea', autosize: { minRows: 2, maxRows: 4} } }"
  style="width: 420px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        textarea1: "",
        textarea2: "",
      };
    },
  };
</script>
```

:::

### 复合型输入框

可前置或后置元素，一般为标签或按钮

:::demo 在`inputData.slots`中编写 具名 slot render 来指定在 input-widget 中前置或者后置内容。

```html
<div>
  <el-input-widget
    placeholder="请输入内容"
    v-model="input1"
    :input-data="inputData1"
  >
  </el-input-widget>
</div>
<div style="margin-top: 15px;">
  <el-input-widget
    placeholder="请输入内容"
    v-model="input2"
    :input-data="inputData2"
  >
  </el-input-widget>
</div>
<div style="margin-top: 15px;">
  <el-input-widget
    placeholder="请输入内容"
    v-model="input3"
    :input-data="inputData3"
  >
  </el-input-widget>
</div>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
  export default {
    data() {
      const _this = this;
      return {
        input1: "",
        input2: "",
        input3: "",
        select: "",
        inputData1: {
          slots: {
            prepend: function(h) {
              return h(
                "template",
                {
                  slot: "prepend",
                },
                [this._v("Http://")]
              );
            },
          },
        },
        inputData2: {
          slots: {
            append: function(h) {
              return h(
                "template",
                {
                  slot: "append",
                },
                [this._v(".com")]
              );
            },
          },
        },

        options: [
          { label: "餐厅名", value: "1" },
          { label: "订单号", value: "2" },
          { label: "用户电话", value: "3" },
        ],
        value: "1",
        inputData3: {
          slots: {
            prepend: function(h) {
              const { _l } = this;
              return h(
                "el-select",
                {
                  slot: "prepend",
                  props: {
                    value: _this.value,
                  },
                  style: {
                    width: "110px",
                  },
                  on: {
                    input(val) {
                      _this.value = val;
                    },
                  },
                },
                _l(_this.options, (item) => {
                  return h("el-option", {
                    props: {
                      label: item.label,
                      value: item.value,
                    },
                  });
                })
              );
            },
            append: function(h) {
              return h("el-button", {
                slot: "append",
                props: {
                  icon: "el-icon-search",
                },
              });
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 尺寸

:::demo 在`inputData.props`中通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。

```html
<div class="demo-input-size">
  <el-input-widget
    placeholder="请输入内容"
    v-model="input1"
    :input-data="{ props: { suffixIcon: 'el-icon-date' } }"
    style="margin-bottom: 10px;"
  >
  </el-input-widget>
  <el-input-widget
    placeholder="请输入内容"
    v-model="input2"
    :input-data="{ props: { suffixIcon: 'el-icon-date', size: 'medium' } }"
    style="margin-bottom: 10px;"
  >
  </el-input-widget>
  <el-input-widget
    placeholder="请输入内容"
    v-model="input3"
    :input-data="{ props: { suffixIcon: 'el-icon-date', size: 'small' } }"
    style="margin-bottom: 10px;"
  >
  </el-input-widget>
  <el-input-widget
    placeholder="请输入内容"
    v-model="input4"
    :input-data="{ props: { suffixIcon: 'el-icon-date', size: 'mini' } }"
  >
  </el-input-widget>
</div>

<script>
  export default {
    data() {
      return {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      };
    },
  };
</script>
```

:::

### 输入长度限制

:::demo `maxlength` 和 `minlength` 是原生属性[原生属性定义在`inputData.attrs`]，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。对于类型为 `text` 或 `textarea` 的输入框，在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。

```html
<el-input-widget
  placeholder="请输入内容"
  v-model="text"
  :input-data="{ props: { type: 'text', showWordLimit: true }, attrs: { maxlength: 10 } }"
  style="width: 320px;"
>
</el-input-widget>
<div style="margin: 20px 0;"></div>
<el-input-widget
  placeholder="请输入内容"
  v-model="textarea"
  :input-data="{ props: { type: 'textarea', showWordLimit: true }, attrs: { maxlength: 30 } }"
  style="width: 520px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        text: "",
        textarea: "",
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

:::demo `readonly`属性可以开启该组件不渲染 input 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-input-widget
  placeholder="请输入内容"
  readonly
  v-model="text1"
  style="width: 320px;"
>
</el-input-widget>
<div style="margin: 20px 0;"></div>
<el-input-widget
  placeholder="请输入内容"
  readonly
  v-model="text2"
  :renderReadonly="renderReadonly"
  style="width: 520px;"
>
</el-input-widget>

<script>
  export default {
    data() {
      return {
        text1: "只读内容",
        text2: "我是自定义只读内容",
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
  <el-input-widget
    placeholder="请输入内容"
    v-model="text1"
    :renderWidget="renderWidget"
    style="width: 520px;"
  >
  </el-input-widget>
  <p>{{ text1 }}</p>
</div>
<script>
  export default {
    data() {
      return {
        text1: "我是自定义渲染控件",
        renderWidget: function(h) {
          const vm = this;
          return h("input", {
            domProps: { value: vm.value },
            attrs: {
              placeholder: vm.placeholder,
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

### InputWidget Attributes

| 参数            | 说明                                                                              | 类型            | 可选值 | 默认值 |
| --------------- | --------------------------------------------------------------------------------- | --------------- | ------ | ------ |
| type            | 控件类型                                                                          | string          | —      | input  |
| value / v-model | 绑定值                                                                            | string / number | —      | —      |
| placeholder     | 输入框占位文本                                                                    | string          | —      | —      |
| readonly        | 控件是否只读                                                                      | boolean         | —      | false  |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                  | boolean         | —      | false  |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 input-widget 组件实例,含有一个 h 参数   | function        | —      | —      |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 input-widget 组件实例,含有一个 h 参数 | function        | —      | —      |
| inputData       | input 组件的所有 props 属性,attrs 属性,on 事件,和 slots 都定义在其对象上,详见下文 | object          | —      | {}     |

### inputData.props

| 参数            | 说明                                                                                    | 类型             | 可选值                                                                                                                                | 默认值 |
| --------------- | --------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type            | 类型                                                                                    | string           | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text   |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效                | boolean          | —                                                                                                                                     | false  |
| clearable       | 是否可清空                                                                              | boolean          | —                                                                                                                                     | false  |
| show-password   | 是否显示切换密码图标                                                                    | boolean          | —                                                                                                                                     | false  |
| disabled        | 禁用                                                                                    | boolean          | —                                                                                                                                     | false  |
| size            | 输入框尺寸，只在 `type!="textarea"` 时有效                                              | string           | medium / small / mini                                                                                                                 | —      |
| prefix-icon     | 输入框头部图标                                                                          | string           | —                                                                                                                                     | —      |
| suffix-icon     | 输入框尾部图标                                                                          | string           | —                                                                                                                                     | —      |
| rows            | 输入框行数，只对 `type="textarea"` 有效                                                 | number           | —                                                                                                                                     | 2      |
| autosize        | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | —                                                                                                                                     | false  |
| auto-complete   | 下个主版本弃用                                                                          | string           | on, off                                                                                                                               | off    |
| resize          | 控制是否能被用户缩放                                                                    | string           | none, both, horizontal, vertical                                                                                                      | —      |
| label           | 输入框关联的 label 文字                                                                 | string           | —                                                                                                                                     | —      |
| tabindex        | 输入框的 tabindex                                                                       | string           | -                                                                                                                                     | -      |
| validate-event  | 输入时是否触发表单的校验                                                                | boolean          | -                                                                                                                                     | true   |

### inputData.attrs

| 参数         | 说明                                 | 类型    | 可选值      | 默认值 |
| ------------ | ------------------------------------ | ------- | ----------- | ------ |
| maxlength    | 原生属性，最大输入长度               | number  | —           | —      |
| minlength    | 原生属性，最小输入长度               | number  | —           | —      |
| placeholder  | 输入框占位文本                       | string  | —           | —      |
| autocomplete | 原生属性，自动补全                   | string  | on, off     | off    |
| name         | 原生属性                             | string  | —           | —      |
| readonly     | 原生属性，是否只读                   | boolean | —           | false  |
| max          | 原生属性，设置最大值                 | —       | —           | —      |
| min          | 原生属性，设置最小值                 | —       | —           | —      |
| step         | 原生属性，设置输入字段的合法数字间隔 | —       | —           | —      |
| autofocus    | 原生属性，自动获取焦点               | boolean | true, false | false  |
| form         | 原生属性                             | string  | —           | —      |

### inputData.slots

| name    | 说明                                                                                                  |
| ------- | ----------------------------------------------------------------------------------------------------- |
| prefix  | 输入框头部内容，只对 `type="text"` 有效, render 函数, this 指向 input-widget 组件实例,含有一个 h 参数 |
| suffix  | 输入框尾部内容，只对 `type="text"` 有效, render 函数, this 指向 input-widget 组件实例,含有一个 h 参数 |
| prepend | 输入框前置内容，只对 `type="text"` 有效, render 函数, this 指向 input-widget 组件实例,含有一个 h 参数 |
| append  | 输入框后置内容，只对 `type="text"` 有效, render 函数, this 指向 input-widget 组件实例,含有一个 h 参数 |

### inputData.on

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| blur     | 在 InputWidget 失去焦点时触发                 | (event: Event)            |
| focus    | 在 InputWidget 获得焦点时触发                 | (event: Event)            |
| change   | 仅在输入框失去焦点或用户按下回车时触发        | (value: string \| number) |
| input    | 在 InputWidget 值改变时触发                   | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |

### InputWidget Methods

| 方法名   | 说明                                                                   | 参数 |
| -------- | ---------------------------------------------------------------------- | ---- |
| getValue | 获取 inputWidget 组件绑定的值（input-widget 组件的方法）               | —    |
| setValue | 给 inputWidget 组件绑定的值赋值（input-widget 组件的方法）             | —    |
| focus    | 使 input 获取焦点（input 组件的方法, eg: this.\$refs.core.focus()）    | —    |
| blur     | 使 input 失去焦点（input 组件的方法, eg: this.\$refs.core.blur()）     | —    |
| select   | 选中 input 中的文字（input 组件的方法, eg: this.\$refs.core.select()） | —    |
