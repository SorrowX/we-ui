## CascaderWidget 级联选择器控件

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。该组件基于 `ElCascader` 组件编写。

### 基础用法

有两种触发子菜单的方式

:::demo `el-cascader-widget`组件接受 cascaderData 属性,原来 Cascader 组件的 props 属性都可定义在`cascaderData.props`,原来 Cascader 组件的事件都可定义在`cascaderData.on`。现在只需为 `el-cascader-widget` 的`cascaderData.props.options`属性指定选项数组即可渲染出一个级联选择器。通过`cascaderData.props.props.expandTrigger`可以定义展开子级菜单的触发方式。

```html
<div class="block">
  <span class="demonstration">默认 click 触发子菜单</span>
  <el-cascader-widget
    v-model="value1"
    :cascader-data="cascaderData1"
    style="width: 320px"
  ></el-cascader-widget>
</div>
<div class="block">
  <span class="demonstration">hover 触发子菜单</span>
  <el-cascader-widget
    v-model="value2"
    :cascader-data="cascaderData2"
    style="width: 320px"
  ></el-cascader-widget>
</div>

<script>
  export default {
    data() {
      const getOptions = () => {
        return [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致",
                  },
                  {
                    value: "fankui",
                    label: "反馈",
                  },
                  {
                    value: "xiaolv",
                    label: "效率",
                  },
                  {
                    value: "kekong",
                    label: "可控",
                  },
                ],
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
          {
            value: "zujian",
            label: "组件",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout 布局",
                  },
                  {
                    value: "color",
                    label: "Color 色彩",
                  },
                  {
                    value: "typography",
                    label: "Typography 字体",
                  },
                  {
                    value: "icon",
                    label: "Icon 图标",
                  },
                  {
                    value: "button",
                    label: "Button 按钮",
                  },
                ],
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio 单选框",
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框",
                  },
                  {
                    value: "input",
                    label: "Input 输入框",
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器",
                  },
                  {
                    value: "select",
                    label: "Select 选择器",
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器",
                  },
                  {
                    value: "switch",
                    label: "Switch 开关",
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块",
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器",
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器",
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器",
                  },
                  {
                    value: "upload",
                    label: "Upload 上传",
                  },
                  {
                    value: "rate",
                    label: "Rate 评分",
                  },
                  {
                    value: "form",
                    label: "Form 表单",
                  },
                ],
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条",
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件",
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页",
                  },
                  {
                    value: "badge",
                    label: "Badge 标记",
                  },
                ],
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert 警告",
                  },
                  {
                    value: "loading",
                    label: "Loading 加载",
                  },
                  {
                    value: "message",
                    label: "Message 消息提示",
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框",
                  },
                  {
                    value: "notification",
                    label: "Notification 通知",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu 导航菜单",
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页",
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑",
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单",
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条",
                  },
                ],
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog 对话框",
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示",
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框",
                  },
                  {
                    value: "card",
                    label: "Card 卡片",
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯",
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板",
                  },
                ],
              },
            ],
          },
          {
            value: "ziyuan",
            label: "资源",
            children: [
              {
                value: "axure",
                label: "Axure Components",
              },
              {
                value: "sketch",
                label: "Sketch Templates",
              },
              {
                value: "jiaohu",
                label: "组件交互文档",
              },
            ],
          },
        ];
      };

      return {
        value1: ["zhinan", "shejiyuanze", "yizhi"],
        value2: [],
        cascaderData1: {
          props: {
            options: getOptions(),
          },
          on: {
            handleChange: function(value) {
              console.log(value, this); // this 指向 cascader-widget组件实例
            },
          },
        },
        cascaderData2: {
          props: {
            options: getOptions(),
            props: {
              expandTrigger: "hover",
            },
          },
          on: {
            handleChange: function(value) {
              console.log(value, this); // this 指向 cascader-widget组件实例
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 禁用选项

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的

:::demo 本例中，`cascaderData.props.options`指定的数组中的第一个元素含有`disabled: true`键值对，因此是禁用的。在默认情况下，Cascader 会检查数据中每一项的`disabled`字段是否为`true`，如果你的数据中表示禁用含义的字段名不为`disabled`，可以通过`ajaxOptions.props`属性(使用接口请求时)来指定。通过`cascaderData.props.props.disabled`属性(非接口请求时)来指定（详见下方 API 表格）。当然，`value`、`label`和`children`这三个字段名也可以通过同样的方式指定。

```html
<el-cascader-widget
  v-model="value"
  :cascader-data="cascaderData"
  style="width: 320px"
></el-cascader-widget>

<script>
  export default {
    data() {
      return {
        value: [],
        cascaderData: {
          props: {
            options: [
              {
                value: "zhinan",
                label: "指南",
                disabled: true,
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                      {
                        value: "xiaolv",
                        label: "效率",
                      },
                      {
                        value: "kekong",
                        label: "可控",
                      },
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                      {
                        value: "typography",
                        label: "Typography 字体",
                      },
                      {
                        value: "icon",
                        label: "Icon 图标",
                      },
                      {
                        value: "button",
                        label: "Button 按钮",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                      {
                        value: "input",
                        label: "Input 输入框",
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器",
                      },
                      {
                        value: "select",
                        label: "Select 选择器",
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器",
                      },
                      {
                        value: "switch",
                        label: "Switch 开关",
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块",
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器",
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器",
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器",
                      },
                      {
                        value: "upload",
                        label: "Upload 上传",
                      },
                      {
                        value: "rate",
                        label: "Rate 评分",
                      },
                      {
                        value: "form",
                        label: "Form 表单",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条",
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件",
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页",
                      },
                      {
                        value: "badge",
                        label: "Badge 标记",
                      },
                    ],
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告",
                      },
                      {
                        value: "loading",
                        label: "Loading 加载",
                      },
                      {
                        value: "message",
                        label: "Message 消息提示",
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框",
                      },
                      {
                        value: "notification",
                        label: "Notification 通知",
                      },
                    ],
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单",
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页",
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑",
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单",
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条",
                      },
                    ],
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框",
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示",
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框",
                      },
                      {
                        value: "card",
                        label: "Card 卡片",
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯",
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板",
                      },
                    ],
                  },
                ],
              },
              {
                value: "ziyuan",
                label: "资源",
                children: [
                  {
                    value: "axure",
                    label: "Axure Components",
                  },
                  {
                    value: "sketch",
                    label: "Sketch Templates",
                  },
                  {
                    value: "jiaohu",
                    label: "组件交互文档",
                  },
                ],
              },
            ],
          },
        },
      };
    },
  };
</script>
```

:::

### 可清空

通过 `cascaderData.props.clearable` 设置输入框可清空

:::demo

```html
<el-cascader-widget
  v-model="value"
  :cascader-data="cascaderData"
  style="width: 320px"
></el-cascader-widget>

<script>
  export default {
    data() {
      return {
        value: [],
        cascaderData: {
          props: {
            clearable: true,
            options: [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                      {
                        value: "xiaolv",
                        label: "效率",
                      },
                      {
                        value: "kekong",
                        label: "可控",
                      },
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                      {
                        value: "typography",
                        label: "Typography 字体",
                      },
                      {
                        value: "icon",
                        label: "Icon 图标",
                      },
                      {
                        value: "button",
                        label: "Button 按钮",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                      {
                        value: "input",
                        label: "Input 输入框",
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器",
                      },
                      {
                        value: "select",
                        label: "Select 选择器",
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器",
                      },
                      {
                        value: "switch",
                        label: "Switch 开关",
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块",
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器",
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器",
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器",
                      },
                      {
                        value: "upload",
                        label: "Upload 上传",
                      },
                      {
                        value: "rate",
                        label: "Rate 评分",
                      },
                      {
                        value: "form",
                        label: "Form 表单",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条",
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件",
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页",
                      },
                      {
                        value: "badge",
                        label: "Badge 标记",
                      },
                    ],
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告",
                      },
                      {
                        value: "loading",
                        label: "Loading 加载",
                      },
                      {
                        value: "message",
                        label: "Message 消息提示",
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框",
                      },
                      {
                        value: "notification",
                        label: "Notification 通知",
                      },
                    ],
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单",
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页",
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑",
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单",
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条",
                      },
                    ],
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框",
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示",
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框",
                      },
                      {
                        value: "card",
                        label: "Card 卡片",
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯",
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板",
                      },
                    ],
                  },
                ],
              },
              {
                value: "ziyuan",
                label: "资源",
                children: [
                  {
                    value: "axure",
                    label: "Axure Components",
                  },
                  {
                    value: "sketch",
                    label: "Sketch Templates",
                  },
                  {
                    value: "jiaohu",
                    label: "组件交互文档",
                  },
                ],
              },
            ],
          },
        },
      };
    },
  };
</script>
```

:::

### 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

:::demo 属性`show-all-levels`定义了是否显示完整的路径，将其赋值为`false`则仅显示最后一级

```html
<el-cascader-widget
  v-model="value"
  :cascader-data="cascaderData"
  style="width: 320px"
></el-cascader-widget>

<script>
  export default {
    data() {
      return {
        value: ["zhinan", "shejiyuanze", "yizhi"],
        cascaderData: {
          props: {
            showAllLevels: false,
            clearable: true,
            options: [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                      {
                        value: "xiaolv",
                        label: "效率",
                      },
                      {
                        value: "kekong",
                        label: "可控",
                      },
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                      {
                        value: "typography",
                        label: "Typography 字体",
                      },
                      {
                        value: "icon",
                        label: "Icon 图标",
                      },
                      {
                        value: "button",
                        label: "Button 按钮",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                      {
                        value: "input",
                        label: "Input 输入框",
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器",
                      },
                      {
                        value: "select",
                        label: "Select 选择器",
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器",
                      },
                      {
                        value: "switch",
                        label: "Switch 开关",
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块",
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器",
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器",
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器",
                      },
                      {
                        value: "upload",
                        label: "Upload 上传",
                      },
                      {
                        value: "rate",
                        label: "Rate 评分",
                      },
                      {
                        value: "form",
                        label: "Form 表单",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条",
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件",
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页",
                      },
                      {
                        value: "badge",
                        label: "Badge 标记",
                      },
                    ],
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告",
                      },
                      {
                        value: "loading",
                        label: "Loading 加载",
                      },
                      {
                        value: "message",
                        label: "Message 消息提示",
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框",
                      },
                      {
                        value: "notification",
                        label: "Notification 通知",
                      },
                    ],
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单",
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页",
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑",
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单",
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条",
                      },
                    ],
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框",
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示",
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框",
                      },
                      {
                        value: "card",
                        label: "Card 卡片",
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯",
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板",
                      },
                    ],
                  },
                ],
              },
              {
                value: "ziyuan",
                label: "资源",
                children: [
                  {
                    value: "axure",
                    label: "Axure Components",
                  },
                  {
                    value: "sketch",
                    label: "Sketch Templates",
                  },
                  {
                    value: "jiaohu",
                    label: "组件交互文档",
                  },
                ],
              },
            ],
          },
        },
      };
    },
  };
</script>
```

:::

### 多选

可通过 `props.multiple = true` 来开启多选模式

:::demo 在开启多选模式后，默认情况下会展示所有已选中的选项的 Tag，你可以使用`collapse-tags`来折叠 Tag

```html
<div class="block">
  <span class="demonstration">默认显示所有Tag</span>
  <el-cascader-widget
    v-model="value1"
    :cascader-data="cascaderData1"
    style="width: 320px"
  ></el-cascader-widget>
</div>
<div class="block">
  <span class="demonstration">折叠展示Tag</span>
  <el-cascader-widget
    v-model="value2"
    :cascader-data="cascaderData2"
    style="width: 320px"
  ></el-cascader-widget>
</div>

<script>
  export default {
    data() {
      const getOptions = () => {
        return [
          {
            value: 1,
            label: "东南",
            children: [
              {
                value: 2,
                label: "上海",
                children: [
                  { value: 3, label: "普陀" },
                  { value: 4, label: "黄埔" },
                  { value: 5, label: "徐汇" },
                ],
              },
              {
                value: 7,
                label: "江苏",
                children: [
                  { value: 8, label: "南京" },
                  { value: 9, label: "苏州" },
                  { value: 10, label: "无锡" },
                ],
              },
              {
                value: 12,
                label: "浙江",
                children: [
                  { value: 13, label: "杭州" },
                  { value: 14, label: "宁波" },
                  { value: 15, label: "嘉兴" },
                ],
              },
            ],
          },
          {
            value: 17,
            label: "西北",
            children: [
              {
                value: 18,
                label: "陕西",
                children: [
                  { value: 19, label: "西安" },
                  { value: 20, label: "延安" },
                ],
              },
              {
                value: 21,
                label: "新疆维吾尔族自治区",
                children: [
                  { value: 22, label: "乌鲁木齐" },
                  { value: 23, label: "克拉玛依" },
                ],
              },
            ],
          },
        ];
      };
      return {
        value1: [],
        value2: [],
        cascaderData1: {
          props: {
            clearable: true,
            props: { multiple: true },
            options: getOptions(),
          },
        },
        cascaderData2: {
          props: {
            clearable: true,
            collapseTags: true,
            props: { multiple: true },
            options: getOptions(),
          },
        },
      };
    },
  };
</script>
```

:::

### 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。启用该功能后，可让父子节点取消关联，选择任意一级选项。

:::demo 可通过 `cascaderData.props.props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

```html
<div class="block">
  <span class="demonstration">单选选择任意一级选项</span>
  <el-cascader-widget
    v-model="value1"
    :cascader-data="cascaderData1"
    style="width: 320px"
  ></el-cascader-widget>
</div>
<div class="block">
  <span class="demonstration">多选选择任意一级选项</span>
  <el-cascader-widget
    v-model="value2"
    :cascader-data="cascaderData2"
    style="width: 320px"
  ></el-cascader-widget>
</div>

<script>
  export default {
    data() {
      const getOptions = () => {
        return [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致",
                  },
                  {
                    value: "fankui",
                    label: "反馈",
                  },
                  {
                    value: "xiaolv",
                    label: "效率",
                  },
                  {
                    value: "kekong",
                    label: "可控",
                  },
                ],
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
          {
            value: "zujian",
            label: "组件",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout 布局",
                  },
                  {
                    value: "color",
                    label: "Color 色彩",
                  },
                  {
                    value: "typography",
                    label: "Typography 字体",
                  },
                  {
                    value: "icon",
                    label: "Icon 图标",
                  },
                  {
                    value: "button",
                    label: "Button 按钮",
                  },
                ],
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio 单选框",
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框",
                  },
                  {
                    value: "input",
                    label: "Input 输入框",
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器",
                  },
                  {
                    value: "select",
                    label: "Select 选择器",
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器",
                  },
                  {
                    value: "switch",
                    label: "Switch 开关",
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块",
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器",
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器",
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器",
                  },
                  {
                    value: "upload",
                    label: "Upload 上传",
                  },
                  {
                    value: "rate",
                    label: "Rate 评分",
                  },
                  {
                    value: "form",
                    label: "Form 表单",
                  },
                ],
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条",
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件",
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页",
                  },
                  {
                    value: "badge",
                    label: "Badge 标记",
                  },
                ],
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert 警告",
                  },
                  {
                    value: "loading",
                    label: "Loading 加载",
                  },
                  {
                    value: "message",
                    label: "Message 消息提示",
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框",
                  },
                  {
                    value: "notification",
                    label: "Notification 通知",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu 导航菜单",
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页",
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑",
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单",
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条",
                  },
                ],
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog 对话框",
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示",
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框",
                  },
                  {
                    value: "card",
                    label: "Card 卡片",
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯",
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板",
                  },
                ],
              },
            ],
          },
          {
            value: "ziyuan",
            label: "资源",
            children: [
              {
                value: "axure",
                label: "Axure Components",
              },
              {
                value: "sketch",
                label: "Sketch Templates",
              },
              {
                value: "jiaohu",
                label: "组件交互文档",
              },
            ],
          },
        ];
      };

      return {
        value1: [],
        value2: [["zhinan", "shejiyuanze"], ["zujian"]],
        cascaderData1: {
          props: {
            options: getOptions(),
            clearable: true,
            props: { checkStrictly: true },
          },
        },
        cascaderData2: {
          props: {
            options: getOptions(),
            clearable: true,
            props: { checkStrictly: true, multiple: true },
          },
        },
      };
    },
    mounted() {
      window.xxx = this;
    },
  };
</script>
```

:::

### 动态加载

当选中某一级时，动态加载该级下的选项。

:::demo 通过`lazy`开启动态加载，并通过`lazyload`来设置加载数据源的方法。`lazyload`方法有两个参数，第一个参数`node`为当前点击的节点，第二个`resolve`为数据加载完成的回调(必须调用)。为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为`leaf`，可通过`props.leaf`修改)，否则会简单的以有无子节点来判断是否为叶子节点。

```html
<el-cascader-widget
  v-model="value"
  :cascader-data="cascaderData"
  style="width: 320px"
></el-cascader-widget>

<script>
  let id = 0;

  export default {
    data() {
      return {
        value: "",
        cascaderData: {
          props: {
            props: {
              lazy: true,
              lazyLoad(node, resolve) {
                const { level } = node;
                setTimeout(() => {
                  const nodes = Array.from({ length: level + 1 }).map(
                    (item) => ({
                      value: ++id,
                      label: `选项${id}`,
                      leaf: level >= 2,
                    })
                  );
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }, 1000);
              },
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 可搜索

可以快捷地搜索选项并选择。

:::demo 将`filterable`赋值为`true`即可打开搜索功能，默认会匹配节点的`label`或所有父节点的`label`(由`show-all-levels`决定)中包含输入值的选项。你也可以用`filter-method`自定义搜索逻辑，接受一个函数，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中。

```html
<div class="block">
  <span class="demonstration">单选可搜索</span>
  <el-cascader-widget
    placeholder="试试搜索：指南"
    v-model="value1"
    :cascader-data="cascaderData1"
    style="width: 320px"
  ></el-cascader-widget>
</div>
<div class="block">
  <span class="demonstration">多选可搜索(有bug，待解决)</span>
  <el-cascader-widget
    v-model="value2"
    placeholder="试试搜索：指南"
    :cascader-data="cascaderData2"
    style="width: 320px"
  ></el-cascader-widget>
</div>

<script>
  export default {
    data() {
      const getOptions = () => {
        return [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致",
                  },
                  {
                    value: "fankui",
                    label: "反馈",
                  },
                  {
                    value: "xiaolv",
                    label: "效率",
                  },
                  {
                    value: "kekong",
                    label: "可控",
                  },
                ],
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
          {
            value: "zujian",
            label: "组件",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout 布局",
                  },
                  {
                    value: "color",
                    label: "Color 色彩",
                  },
                  {
                    value: "typography",
                    label: "Typography 字体",
                  },
                  {
                    value: "icon",
                    label: "Icon 图标",
                  },
                  {
                    value: "button",
                    label: "Button 按钮",
                  },
                ],
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio 单选框",
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框",
                  },
                  {
                    value: "input",
                    label: "Input 输入框",
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器",
                  },
                  {
                    value: "select",
                    label: "Select 选择器",
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器",
                  },
                  {
                    value: "switch",
                    label: "Switch 开关",
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块",
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器",
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器",
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器",
                  },
                  {
                    value: "upload",
                    label: "Upload 上传",
                  },
                  {
                    value: "rate",
                    label: "Rate 评分",
                  },
                  {
                    value: "form",
                    label: "Form 表单",
                  },
                ],
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条",
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件",
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页",
                  },
                  {
                    value: "badge",
                    label: "Badge 标记",
                  },
                ],
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert 警告",
                  },
                  {
                    value: "loading",
                    label: "Loading 加载",
                  },
                  {
                    value: "message",
                    label: "Message 消息提示",
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框",
                  },
                  {
                    value: "notification",
                    label: "Notification 通知",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu 导航菜单",
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页",
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑",
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单",
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条",
                  },
                ],
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog 对话框",
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示",
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框",
                  },
                  {
                    value: "card",
                    label: "Card 卡片",
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯",
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板",
                  },
                ],
              },
            ],
          },
          {
            value: "ziyuan",
            label: "资源",
            children: [
              {
                value: "axure",
                label: "Axure Components",
              },
              {
                value: "sketch",
                label: "Sketch Templates",
              },
              {
                value: "jiaohu",
                label: "组件交互文档",
              },
            ],
          },
        ];
      };
      return {
        value1: [],
        value2: null,
        cascaderData1: {
          props: {
            filterable: true,
            options: getOptions(),
          },
        },
        cascaderData2: {
          props: {
            filterable: true,
            options: getOptions(),
            clearable: true,
            props: { multiple: true },
          },
        },
      };
    },
  };
</script>
```

:::

### 自定义节点内容

可以自定义备选项的节点内容

:::demo 可以通过`scopedSlots.default`对级联选择器的备选项的节点内容进行自定义，scoped slot 会传入两个字段 `node` 和 `data`，分别表示当前节点的 Node 对象和数据。

```html
<el-cascader-widget
  v-model="value"
  :cascader-data="cascaderData"
  style="width: 320px"
>
</el-cascader-widget>

<script>
  export default {
    data() {
      const getOptions = () => [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ];
      return {
        value: [],
        cascaderData: {
          props: {
            clearable: true,
            options: getOptions(),
          },
          scopedSlots: {
            default: (props) => {
              const { node, data } = props;
              const h = this.$createElement; // cascader-widget组件内部没有对scopedSlots中的函数进行绑定this执行
              return h("div", {}, [
                h(
                  "span",
                  {
                    style: {
                      color: "#76a6e2",
                    },
                  },
                  data.label
                ),
                !node.isLeaf ? h("span", ` ( ${data.children.length} )`) : "",
              ]);
            },
          },
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
  <el-cascader-widget
    v-model="value"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-cascader-widget>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
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
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                      {
                        value: "xiaolv",
                        label: "效率",
                      },
                      {
                        value: "kekong",
                        label: "可控",
                      },
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                      {
                        value: "typography",
                        label: "Typography 字体",
                      },
                      {
                        value: "icon",
                        label: "Icon 图标",
                      },
                      {
                        value: "button",
                        label: "Button 按钮",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                      {
                        value: "input",
                        label: "Input 输入框",
                      },
                      {
                        value: "input-number",
                        label: "InputNumber 计数器",
                      },
                      {
                        value: "select",
                        label: "Select 选择器",
                      },
                      {
                        value: "cascader",
                        label: "Cascader 级联选择器",
                      },
                      {
                        value: "switch",
                        label: "Switch 开关",
                      },
                      {
                        value: "slider",
                        label: "Slider 滑块",
                      },
                      {
                        value: "time-picker",
                        label: "TimePicker 时间选择器",
                      },
                      {
                        value: "date-picker",
                        label: "DatePicker 日期选择器",
                      },
                      {
                        value: "datetime-picker",
                        label: "DateTimePicker 日期时间选择器",
                      },
                      {
                        value: "upload",
                        label: "Upload 上传",
                      },
                      {
                        value: "rate",
                        label: "Rate 评分",
                      },
                      {
                        value: "form",
                        label: "Form 表单",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                      {
                        value: "progress",
                        label: "Progress 进度条",
                      },
                      {
                        value: "tree",
                        label: "Tree 树形控件",
                      },
                      {
                        value: "pagination",
                        label: "Pagination 分页",
                      },
                      {
                        value: "badge",
                        label: "Badge 标记",
                      },
                    ],
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告",
                      },
                      {
                        value: "loading",
                        label: "Loading 加载",
                      },
                      {
                        value: "message",
                        label: "Message 消息提示",
                      },
                      {
                        value: "message-box",
                        label: "MessageBox 弹框",
                      },
                      {
                        value: "notification",
                        label: "Notification 通知",
                      },
                    ],
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单",
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页",
                      },
                      {
                        value: "breadcrumb",
                        label: "Breadcrumb 面包屑",
                      },
                      {
                        value: "dropdown",
                        label: "Dropdown 下拉菜单",
                      },
                      {
                        value: "steps",
                        label: "Steps 步骤条",
                      },
                    ],
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框",
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示",
                      },
                      {
                        value: "popover",
                        label: "Popover 弹出框",
                      },
                      {
                        value: "card",
                        label: "Card 卡片",
                      },
                      {
                        value: "carousel",
                        label: "Carousel 走马灯",
                      },
                      {
                        value: "collapse",
                        label: "Collapse 折叠面板",
                      },
                    ],
                  },
                ],
              },
              {
                value: "ziyuan",
                label: "资源",
                children: [
                  {
                    value: "axure",
                    label: "Axure Components",
                  },
                  {
                    value: "sketch",
                    label: "Sketch Templates",
                  },
                  {
                    value: "jiaohu",
                    label: "组件交互文档",
                  },
                ],
              },
            ];
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
  <el-cascader-widget
    v-model="value"
    :ajax-options="ajaxOptions"
    style="width: 320px;"
  >
  </el-cascader-widget>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
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

:::demo `readonly`属性可以开启该组件不渲染 cascader 组件而是渲染文本，更加轻量级。使用`renderReadonly`属性可以自定义只读渲染函数.

```html
<el-cascader-widget readonly v-model="cascader1" style="width: 100%;">
</el-cascader-widget>

<el-cascader-widget
  readonly
  v-model="cascader2"
  :render-readonly="renderReadonly"
  style="width: 100%;"
>
</el-cascader-widget>

<script>
  export default {
    data() {
      return {
        cascader1: ["徐志康", "徐志伟"],
        cascader2: ["徐志康", "徐志伟"],
        renderReadonly: function(h) {
          return h(
            "span",
            {
              style: { color: "red" },
            },
            this.value.join("/")
          );
        },
      };
    },
  };
</script>
```

:::

### CascaderWidget Attributes

| 参数            | 说明                                                                                 | 类型     | 可选值 | 默认值   |
| --------------- | ------------------------------------------------------------------------------------ | -------- | ------ | -------- |
| type            | 控件类型                                                                             | string   | —      | cascsder |
| value / v-model | 绑定值                                                                               | —        | —      | —        |
| placeholder     | 输入框占位文本                                                                       | string   | —      | —        |
| readonly        | 控件是否只读                                                                         | boolean  | —      | false    |
| disabled        | 控件是否禁用(只有在非只读时可用)                                                     | boolean  | —      | false    |
| renderReadonly  | 当控件只读时,自定义只读渲染函数,this 指向 cascader-widget 组件实例,含有一个 h 参数   | function | —      | —        |
| renderWidget    | 当控件非只读时,自定义控件渲染函数,this 指向 cascader-widget 组件实例,含有一个 h 参数 | function | —      | —        |
| cascaderData    | cascader 组件的所有 props 属性,attrs 属性,on 事件 详见下文                           | object   | —      | {}       |

### cascaderData.props

| 参数            | 说明                                                                                                | 类型                    | 可选值                | 默认值    |
| --------------- | --------------------------------------------------------------------------------------------------- | ----------------------- | --------------------- | --------- |
| options         | 可选项数据源，键名可通过 `Props` 属性配置                                                           | array                   | —                     | —         |
| props           | 配置选项，具体见下表                                                                                | object                  | —                     | —         |
| size            | 尺寸                                                                                                | string                  | medium / small / mini | —         |
| placeholder     | 输入框占位文本                                                                                      | string                  | —                     | 请选择    |
| disabled        | 是否禁用                                                                                            | boolean                 | —                     | false     |
| clearable       | 是否支持清空选项                                                                                    | boolean                 | —                     | false     |
| show-all-levels | 输入框中是否显示选中值的完整路径                                                                    | boolean                 | —                     | true      |
| collapse-tags   | 多选模式下是否折叠 Tag                                                                              | boolean                 | -                     | false     |
| separator       | 选项分隔符                                                                                          | string                  | —                     | 斜杠' / ' |
| filterable      | 是否可搜索选项                                                                                      | boolean                 | —                     | —         |
| filter-method   | 自定义搜索逻辑，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中 | function(node, keyword) | -                     | -         |
| debounce        | 搜索关键词输入的去抖延迟，毫秒                                                                      | number                  | —                     | 300       |
| before-filter   | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选               | function(value)         | —                     | —         |
| popper-class    | 自定义浮层类名                                                                                      | string                  | —                     | —         |

### cascaderData.props.props

| 参数          | 说明                                                                                               | 类型                                                                                     | 可选值        | 默认值     |
| ------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- | ---------- |
| expandTrigger | 次级菜单的展开方式                                                                                 | string                                                                                   | click / hover | 'click'    |
| multiple      | 是否多选                                                                                           | boolean                                                                                  | -             | false      |
| checkStrictly | 是否严格的遵守父子节点不互相关联                                                                   | boolean                                                                                  | -             | false      |
| emitPath      | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | boolean                                                                                  | -             | true       |
| lazy          | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                     | boolean                                                                                  | -             | false      |
| lazyLoad      | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                       | function(node, resolve)，`node`为当前点击的节点，`resolve`为数据加载完成的回调(必须调用) | -             | -          |
| value         | 指定选项的值为选项对象的某个属性值                                                                 | string                                                                                   | —             | 'value'    |
| label         | 指定选项标签为选项对象的某个属性值                                                                 | string                                                                                   | —             | 'label'    |
| children      | 指定选项的子选项为选项对象的某个属性值                                                             | string                                                                                   | —             | 'children' |
| disabled      | 指定选项的禁用为选项对象的某个属性值                                                               | string                                                                                   | —             | 'disabled' |
| leaf          | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                   | string                                                                                   | —             | 'leaf'     |

### cascaderData.on

#### 函数的 this 的指向 cascader-widget 组件实例,不要使用箭头函数

| 事件名称       | 说明                          | 回调参数                      |
| -------------- | ----------------------------- | ----------------------------- |
| change         | 当选中节点变化时触发          | 选中节点的值                  |
| expand-change  | 当展开节点发生变化时触发      | 各父级选项值组成的数组        |
| blur           | 当失去焦点时触发              | (event: Event)                |
| focus          | 当获得焦点时触发              | (event: Event)                |
| visible-change | 下拉框出现/隐藏时触发         | 出现则为 true，隐藏则为 false |
| remove-tag     | 在多选模式下，移除 Tag 时触发 | 移除的 Tag 对应的节点的值     |

### CascaderWidget Methods

| 方法名          | 说明                                                | 参数                                          |
| --------------- | --------------------------------------------------- | --------------------------------------------- |
| getCheckedNodes | eg: vm.\$refs.core.getCheckedNodes() 获取选中的节点 | (leafOnly) 是否只是叶子节点，默认值为 `false` |

### cascaderData.scopedSlots

| 名称    | 说明                                                                                                                        |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| default | this 指向没有绑定 cascader-widget 组件实例。自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据 |
