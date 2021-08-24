## PopperInput 输入框触发器

点击输入框弹出用户自定义的内容,通过绑定的数据来展示到输入框上。

### 基础用法

在 popper-input 组件中,写入默认插槽内容就能在弹出时展示。

:::demo 使用`v-model`指令就能绑定输入框的值,值得注意的是,绑定的值在单选模式下是一个对象`{ label: '', value: '' }`，这么做为了更好的与用户的自定义内容选中的数据进行匹配。多选模式下是一个数组`[{label: '', value: ''}]`

```html
<template>
  <el-popper-input
    style="width: 250px"
    placeholder="请选择"
    v-model="value"
    ref="popper"
  >
    <el-scrollbar-v2 height="280px" ref="scrollbar">
      <ul class="el-popper-input__list">
        <li
          v-for="num in 20"
          :key="num"
          class="el-popper-input__item"
          @click="handleClick(num)"
        >
          {{ num }}
        </li>
      </ul>
    </el-scrollbar-v2>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: {},
      };
    },
    methods: {
      handleClick(num) {
        this.value = {
          label: num,
          value: num,
        };
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
      },
    },
  };
</script>
```

:::

### 禁用状态

:::demo 使用`disabled`属性就能禁用触发器

```html
<template>
  <el-popper-input
    disabled
    style="width: 250px"
    placeholder="请选择"
    v-model="value"
    ref="popper"
  >
    <el-scrollbar-v2 height="280px" ref="scrollbar">
      <ul class="el-popper-input__list">
        <li
          v-for="num in 20"
          :key="num"
          class="el-popper-input__item"
          @click="handleClick(num)"
        >
          {{ num }}
        </li>
      </ul>
    </el-scrollbar-v2>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: {},
      };
    },
    methods: {
      handleClick(num) {
        this.value = {
          label: num,
          value: num,
        };
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
      },
    },
  };
</script>
```

:::

### 可清空

:::demo 使用`clearable`属性就能快速清空当前选中的值

```html
<template>
  <el-popper-input
    clearable
    style="width: 250px"
    placeholder="请选择"
    v-model="value"
    ref="popper"
  >
    <el-scrollbar-v2 height="280px" ref="scrollbar">
      <ul class="el-popper-input__list">
        <li
          v-for="num in 20"
          :key="num"
          class="el-popper-input__item"
          @click="handleClick(num)"
        >
          {{ num }}
        </li>
      </ul>
    </el-scrollbar-v2>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: {
          value: 10,
          label: 10,
        },
      };
    },
    methods: {
      handleClick(num) {
        this.value = {
          label: num,
          value: num,
        };
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
      },
    },
  };
</script>
```

:::

### 基础多选

:::demo 使用`multiple`属性就能进行多选

```html
<template>
  <el-popper-input
    clearable
    multiple
    style="width: 250px;"
    placeholder="请选择"
    v-model="value"
    ref="popper"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
    @remove-tag="handleRemoveTag"
  >
    <el-scrollbar-v2 height="280px" ref="scrollbar">
      <ul class="el-popper-input__list">
        <li
          v-for="item in list"
          :key="item.value"
          class="el-popper-input__item2"
        >
          <el-checkbox v-model="item.checked"></el-checkbox>
          {{ item.label }}
        </li>
      </ul>
    </el-scrollbar-v2>
    <el-row style="margin-top: 5px;">
      <el-col :offset="8">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" type="primary" @click="sure">确定</el-button>
      </el-col>
    </el-row>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        list: Array.from({ length: 20 }).map((_, index) => {
          return {
            label: `数据${index + 1}`,
            value: index + 1,
            checked: false,
          };
        }),
      };
    },
    methods: {
      sure() {
        this._clickBtn = true;
        this.value = this.list.filter((m) => m.checked);
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
      },
      cancel() {
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
        this.reset();
      },
      reset() {
        this.list.forEach((m) => {
          if (this._oldSelectValue.findIndex((v) => v === m.value) !== -1) {
            m.checked = true;
          } else {
            m.checked = false;
          }
        });
      },
      handleClear() {
        this.list.forEach((item) => {
          item.checked = false;
        });
      },
      handleVisibleChange(visible) {
        if (visible) {
          this._clickBtn = false;
          this._oldSelectValue = this.list
            .filter((_) => _.checked)
            .map((_) => _.value);
        } else if (!this._clickBtn) {
          this.reset();
        }
      },
      handleRemoveTag(tag) {
        this.list.forEach((item) => {
          if (item.value === tag.value) {
            item.checked = false;
          }
        });
      },
    },
  };
</script>
```

:::

### 多选折叠

:::demo 使用`collapseTags`属性就能讲多选进行折叠

```html
<template>
  <el-popper-input
    collapse-tags
    clearable
    multiple
    style="width: 250px;"
    placeholder="请选择"
    v-model="value"
    ref="popper"
    @clear="handleClear"
    @visible-change="handleVisibleChange"
    @remove-tag="handleRemoveTag"
  >
    <el-scrollbar-v2 height="280px" ref="scrollbar">
      <ul class="el-popper-input__list">
        <li
          v-for="item in list"
          :key="item.value"
          class="el-popper-input__item2"
        >
          <el-checkbox v-model="item.checked"></el-checkbox>
          {{ item.label }}
        </li>
      </ul>
    </el-scrollbar-v2>
    <el-row style="margin-top: 5px;">
      <el-col :offset="8">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" type="primary" @click="sure">确定</el-button>
      </el-col>
    </el-row>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        list: Array.from({ length: 20 }).map((_, index) => {
          return {
            label: `数据${index + 1}`,
            value: index + 1,
            checked: false,
          };
        }),
      };
    },
    methods: {
      sure() {
        this._clickBtn = true;
        this.value = this.list.filter((m) => m.checked);
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
      },
      cancel() {
        this.$refs.popper.hide();
        this.$refs.scrollbar.setScrollTop(0);
        this.reset();
      },
      reset() {
        this.list.forEach((m) => {
          if (this._oldSelectValue.findIndex((v) => v === m.value) !== -1) {
            m.checked = true;
          } else {
            m.checked = false;
          }
        });
      },
      handleClear() {
        this.list.forEach((item) => {
          item.checked = false;
        });
      },
      handleVisibleChange(visible) {
        if (visible) {
          this._clickBtn = false;
          this._oldSelectValue = this.list
            .filter((_) => _.checked)
            .map((_) => _.value);
        } else if (!this._clickBtn) {
          this.reset();
        }
      },
      handleRemoveTag(tag) {
        this.list.forEach((item) => {
          if (item.value === tag.value) {
            item.checked = false;
          }
        });
      },
    },
  };
</script>
```

:::

### 开启搜索

:::demo 在多选模式下使用`filterable`属性就能开启搜索功能,配合`enter`事件,来处理业务。

```html
<template>
  <el-popper-input
    filterable
    clearable
    multiple
    style="width: 250px; margin-bottom: 10px;"
    placeholder="请选择"
    v-model="value"
    ref="popper"
    @enter="handleSearch"
  >
    <div>
      这里你可以嵌入任何内容来配合该组件使用
      <p>{{ msg }}</p>
    </div>
  </el-popper-input>

  <el-popper-input
    size="medium"
    filterable
    clearable
    multiple
    style="width: 250px; margin-bottom: 10px;"
    placeholder="请选择"
    v-model="value2"
    ref="popper"
    @enter="handleSearch"
  >
    <el-scrollbar-v2 height="200px">
      <div style="height: 400px; width: 400px;"><p>我是选人组件</p></div>
    </el-scrollbar-v2>
  </el-popper-input>

  <el-popper-input
    size="small"
    filterable
    clearable
    multiple
    style="width: 250px; margin-bottom: 10px;"
    placeholder="请选择"
    v-model="value2"
    ref="popper"
    @enter="handleSearch"
  >
    <el-scrollbar-v2 height="200px">
      <div style="height: 400px; width: 400px;"><p>我是选部门组件</p></div>
    </el-scrollbar-v2>
  </el-popper-input>

  <el-popper-input
    size="mini"
    filterable
    clearable
    multiple
    style="width: 250px"
    placeholder="请选择"
    v-model="value2"
    ref="popper"
    @enter="handleSearch"
  >
    <div>
      <el-scrollbar-v2 height="200px">
        <div style="width: 220px; height: 300px"><p>我是下拉树组件</p></div>
      </el-scrollbar-v2>
    </div>
  </el-popper-input>
</template>

<script>
  export default {
    data() {
      return {
        value: [
          {
            label: "徐志伟",
            value: "xzw",
          },
          {
            label: "徐志康",
            value: "xzk",
          },
        ],
        value2: [],
        msg: "",
      };
    },
    methods: {
      handleSearch(searchKey) {
        this.msg = searchKey;
      },
    },
  };
</script>
```

:::

### popper-input Attributes

| 参数                  | 说明                   | 类型    | 可选值                | 默认值  |
| --------------------- | ---------------------- | ------- | --------------------- | ------- |
| value / v-model       | 选中项绑定值           | object  | array                 | —       | — |
| size                  | 尺寸                   | string  | medium / small / mini | —       |
| placeholder           | 输入框占位文本         | string  | —                     | 请选择  |
| disabled              | 是否禁用               | boolean | —                     | false   |
| clearable             | 是否支持清空选项       | boolean | —                     | false   |
| collapse-tags         | 多选模式下是否折叠 Tag | boolean | —                     | false   |
| filterable            | 是否可搜索选项         | boolean | —                     | —       |
| popper-class          | 自定义浮层类名         | string  | —                     | —       |
| placeholder           | 占位符名称             | string  | —                     | —       |
| multiple              | 是否多选               | boolean | —                     | false   |
| fallback-placements   | popper.js 配置项       | array   | —                     | ['top'] |
| arrow-position-center | 箭头是否居中           | boolean | —                     | false   |

### popper-input Events

| 事件名称       | 说明                                                | 回调参数                      |
| -------------- | --------------------------------------------------- | ----------------------------- |
| visible-change | 下拉框出现/隐藏时触发                               | 出现则为 true，隐藏则为 false |
| remove-tag     | 在多选模式下，移除 Tag 时触发                       | 移除的 Tag 对应的节点的值     |
| clear          | 点击清楚按钮时触发                                  | {}或者[]                      |
| search         | 多选模式下开发了搜索，当输入框发生 input 事件时触发 | input 当前的值                |
| enter          | 多选模式下开发了搜索，在输入框发生回车时触发        | input 当前的值                |

### popper-input Methods

| 方法名 | 说明       | 参数 |
| ------ | ---------- | ---- |
| show   | 显示弹出层 |
| hide   | 隐藏弹出层 |

### popper-input Slots

| 名称 | 说明         |
| ---- | ------------ |
| -    | 弹出层的内容 |
