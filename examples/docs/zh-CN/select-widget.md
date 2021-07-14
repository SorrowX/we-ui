## SelectWidget 选择器控件

当选项过多时，使用下拉菜单展示并选择内容。`SelectWidget` 组件基于 `ElSelect` `ElOption` `ElOptionGroup`组件编写。

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的 value

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请选择"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value: "选项2",
      };
    },
  };
</script>
```

:::

### 有禁用选项

:::demo 在`ajaxOptions.localList`的成员中，设定`disabled`值为 true，即可禁用该选项

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请选择"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
              disabled: true,
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value: "选项1",
      };
    },
  };
</script>
```

:::

### 禁用状态

选择器不可用状态

:::demo 为`el-select-widget`设置`disabled`属性，则整个选择器不可用

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请选择"
    disabled
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value: "选项1",
      };
    },
  };
</script>
```

:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`selectData.props`属性设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请选择"
    :select-data="{ props: { clearable: true } }"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value: "选项1",
      };
    },
  };
</script>
```

:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

:::demo 为`selectData.props`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。

```html
<template>
  <el-select-widget
    v-model="value1"
    placeholder="请选择"
    :select-data="{ props: { clearable: true, multiple: true } }"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>

  <el-select-widget
    v-model="value2"
    placeholder="请选择"
    :select-data="{ props: { clearable: true, multiple: true, collapseTags: true } }"
    :ajax-options="ajaxOptions"
    style="width: 320px; margin-left: 30px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value1: [],
        value2: ["选项1", "选项2"],
      };
    },
  };
</script>
```

:::

### 自定义模板

可以自定义备选项

:::demo `selectData.slots`设置 default 属性,编写 render 函数,接受 h,和 item={ label, value }

```html
<template>
  <el-select-widget
    v-model="value1"
    placeholder="请选择"
    :select-data="selectData"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        selectData: {
          slots: {
            default: function(h, item) {
              // this指向ElSelectWidget组件实例,所以不要使用箭头函数
              return [
                h("span", { style: { float: "left" } }, item.label),
                h(
                  "span",
                  {
                    style: {
                      float: "right",
                      color: "#8492a6",
                      fontSize: "13px",
                    },
                  },
                  item.value
                ),
              ];
            },
          },
        },
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value1: [],
        value2: ["选项1", "选项2"],
      };
    },
  };
</script>
```

:::

### 分组

备选项进行分组展示

:::demo 在`selectData.props`中设置 type 为`group`, 就能进行分组。

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请选择"
    :select-data="selectData"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        selectData: {
          props: {
            type: "group",
          },
          slots: {
            default: function(h, item) {
              // this指向ElSelectWidget组件实例,所以不要使用箭头函数
              return [
                h("span", { style: { float: "left" } }, item.label),
                h(
                  "span",
                  {
                    style: {
                      float: "right",
                      color: "#8492a6",
                      fontSize: "13px",
                    },
                  },
                  item.value
                ),
              ];
            },
          },
        },
        ajaxOptions: {
          localList: [
            {
              label: "热门城市",
              options: [
                {
                  value: "Shanghai",
                  label: "上海",
                },
                {
                  value: "Beijing",
                  label: "北京",
                },
              ],
            },
            {
              label: "城市名",
              options: [
                {
                  value: "Chengdu",
                  label: "成都",
                },
                {
                  value: "Shenzhen",
                  label: "深圳",
                },
                {
                  value: "Guangzhou",
                  label: "广州",
                },
                {
                  value: "Dalian",
                  label: "大连",
                },
              ],
            },
          ],
        },
        value: [],
      };
    },
  };
</script>
```

:::

### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`selectData.props`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`selectData.props.filterMethod`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请选择"
    :select-data="{ props: { clearable: true, filterable: true } }"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        ajaxOptions: {
          localList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        value: "",
      };
    },
  };
</script>
```

:::

### 远程搜索

从服务器搜索数据，输入关键字进行查找
:::demo 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。`remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。需要注意的是，如果`el-option`是通过`v-for`指令渲染出来的，此时需要为`el-option`添加`key`属性，且其值需具有唯一性，比如此例中的`item.value`。

```html
<template>
  <el-select-widget
    v-model="value"
    placeholder="请输入关键词"
    :select-data="selectData"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      const _this = this;
      return {
        value: [],
        states: [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
        ].map((item) => {
          return { value: `value:${item}`, label: `label:${item}` };
        }),
        selectData: {
          props: {
            multiple: true,
            filterable: true,
            remote: true,
            reserveKeyword: true,
            loading: false,
            clearable: true,
            remoteMethod: function(query) {
              const vm = this; // this指向SelectWidget组件实例
              const props = _this.selectData.props;
              if (query !== "") {
                props.loading = true;
                setTimeout(() => {
                  props.loading = false;
                  vm.dataList = _this.states.filter((item) => {
                    return (
                      item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
                    );
                  });
                }, 200);
              } else {
                vm.dataList = [];
              }
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 创建条目

可以创建并选中选项中不存在的条目
:::demo 使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

```html
<template>
  <el-select-widget
    v-model="value"
    :select-data="selectData"
    :ajax-options="ajaxOptions"
    placeholder="请选择文章标签"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        selectData: {
          props: {
            multiple: true,
            filterable: true,
            allowCreate: true,
            defaultFirstOption: true,
          },
        },
        ajaxOptions: {
          localList: [
            {
              value: "HTML",
              label: "HTML",
            },
            {
              value: "CSS",
              label: "CSS",
            },
            {
              value: "JavaScript",
              label: "JavaScript",
            },
          ],
        },
        value: [],
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
  <el-select-widget
    v-model="value"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
</template>

<script>
  export default {
    data() {
      return {
        value: "2",
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
  <el-select-widget
    v-model="select"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-select-widget>
  <p>接口无数据,无渲染ui</p>
</template>

<script>
  export default {
    data() {
      return {
        select: "",
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

:::demo `readonly`属性可以开启该组件不渲染 select 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-select-widget readonly v-model="select1"> </el-select-widget>
<div style="margin: 20px 0;"></div>
<el-select-widget readonly v-model="select2" :render-readonly="renderReadonly">
</el-select-widget>

<script>
  export default {
    data() {
      return {
        select1: "徐志伟",
        select2: "徐志康",
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

### SelectWidget Attributes

| 参数            | 说明                                                                               | 类型                       | 可选值 | 默认值 |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------- | ------ | ------ |
| type            | 控件类型                                                                           | string                     | —      | select |
| value / v-model | 绑定值                                                                             | string(只读时使用) / array | —      | —      |
| readonly        | 控件是否只读                                                                       | boolean                    | —      | false  |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                   | boolean                    | —      | false  |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 select-widget 组件实例,含有一个 h 参数   | function                   | —      | —      |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 select-widget 组件实例,含有一个 h 参数 | function                   | —      | —      |
| selectData      | radio 组件的所有 props 属性,attrs 属性,on 事件 详见下文                            | object                     | —      | {}     |

### selectData.props

| 参数                  | 说明                                                                           | 类型     | 可选值            | 默认值     |
| --------------------- | ------------------------------------------------------------------------------ | -------- | ----------------- | ---------- |
| multiple              | 是否多选                                                                       | boolean  | —                 | false      |
| disabled              | 是否禁用                                                                       | boolean  | —                 | false      |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                              | string   | —                 | value      |
| size                  | 输入框尺寸                                                                     | string   | medium/small/mini | —          |
| clearable             | 是否可以清空选项                                                               | boolean  | —                 | false      |
| collapse-tags         | 多选时是否将选中值按文字的形式展示                                             | boolean  | —                 | false      |
| multiple-limit        | 多选时用户最多可以选择的项目数，为 0 则不限制                                  | number   | —                 | 0          |
| name                  | select input 的 name 属性                                                      | string   | —                 | —          |
| autocomplete          | select input 的 autocomplete 属性                                              | string   | —                 | off        |
| auto-complete         | 下个主版本弃用                                                                 | string   | —                 | off        |
| placeholder           | 占位符                                                                         | string   | —                 | 请选择     |
| filterable            | 是否可搜索                                                                     | boolean  | —                 | false      |
| allow-create          | 是否允许用户创建新条目，需配合 `filterable` 使用                               | boolean  | —                 | false      |
| filter-method         | 自定义搜索方法                                                                 | function | —                 | —          |
| remote                | 是否为远程搜索                                                                 | boolean  | —                 | false      |
| remote-method         | 远程搜索方法                                                                   | function | —                 | —          |
| loading               | 是否正在从远程获取数据                                                         | boolean  | —                 | false      |
| loading-text          | 远程加载时显示的文字                                                           | string   | —                 | 加载中     |
| no-match-text         | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置                       | string   | —                 | 无匹配数据 |
| no-data-text          | 选项为空时显示的文字，也可以使用`slot="empty"`设置                             | string   | —                 | 无数据     |
| popper-class          | Select 下拉框的类名                                                            | string   | —                 | —          |
| reserve-keyword       | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词                       | boolean  | —                 | false      |
| default-first-option  | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用       | boolean  | -                 | false      |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean  | -                 | true       |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                  | boolean  | -                 | false      |

### selectData.on

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除 tag 时触发                | 移除的 tag 值                 |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| blur           | 当 input 失去焦点时触发                  | (event: Event)                |
| focus          | 当 input 获得焦点时触发                  | (event: Event)                |

### selectData.slots

|   name  | 说明                                 |
| ------- | ------------------------------------ |
| default | render 函数,自定义 Option 组件列表项 |

### SelectWidget Methods

| 方法名 | 说明                                                    | 参数 |
| ------ | ------------------------------------------------------- | ---- |
| focus  | this.\$refs.core.focus() 使 input 获取焦点              | -    |
| blur   | this.\$refs.core.blur() 使 input 失去焦点，并隐藏下拉框 | -    |

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
