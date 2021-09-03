<template>
  <el-popper
    effect="light"
    trigger="click"
    ref="popperRef"
    transition="el-zoom-in-top"
    :popper-class="['el-popper-input__content', popperClass].join(' ')"
    v-model="visible"
    :class="[
      'el-popper-input',
      realSize && `el-popper-input--${realSize}`,
      { 'is-disabled': disabled }
    ]"
    :offset="12"
    :stopPopperMouseEvent="true"
    :gpuAcceleration="false"
    :manual-mode="disabled"
    :popper-options="popperOptions"
    :fallback-placements="fallbackPlacements"
    @mouseenter.native="inputHover = true"
    @mouseleave.native="inputHover = false"
  >
    <template slot="trigger">
      <el-input
        ref="inputRef"
        v-model="modelValue"
        :size="size"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="calcPlaceholder"
        :style="{ width: '100%' }" 
      >
        <template slot="suffix">
          <i
            v-if="clearBtnVisible"
            key="clear"
            class="el-input__icon el-icon-circle-close"
            style="cursor: pointer;"
            @click.stop.self="handleClear"></i>
          <i
            v-else
            key="arrow-down"
            style="cursor: pointer;"
            :class="[
              'el-input__icon',
              'el-icon-arrow-down',
              dropDownVisible && 'is-reverse'
            ]"
          >
          </i>
        </template>
      </el-input>
      <div v-if="multiple" class="el-popper-input__tags" ref="tagsRef">
        <el-tag
          v-for="tag in presentTags"
          :key="tag.key"
          type="info"
          :size="tagSize"
          :hit="tag.hitState"
          :closable="tag.closable"
          disable-transitions
          @close="deleteTag(tag)"
        >
          <span>{{ tag.text }}</span>
        </el-tag>
        <input
          type="text"
          ref="innerInputRef"
          v-if="filterable && !disabled"
          v-model.trim="searchKey"
          :class="['el-popper-input__search-input', realSize && `el-popper-input--${realSize}`]"
          :placeholder="presentTags.length ? '' : placeholder"
          @input="handleInput"
          @keydown.delete="handleDelete"
          @keydown.enter="$emit('enter', searchKey)"
        />
      </div>
    </template>

    <template slot="default">
      <slot></slot>
    </template>
  </el-popper>
</template>

<script>
import ElPopper from 'packages/popper-v2/index';
import { generateId } from 'element-ui/src/utils/util';

const InputSizeMap = {
  medium: 36,
  small: 32,
  mini: 28
};

const popperOptions = {
  modifiers: [
    {
      name: 'arrowPosition',
      enabled: true,
      phase: 'main',
      fn: ({ state }) => {
        const { modifiersData, placement } = state;
        if (['right', 'left'].includes(placement)) return;
        modifiersData.arrow.x = 35;
      },
      requires: ['arrow']
    }
  ]
};

export default {
  name: 'ElPopperInput',

  components: { ElPopper },

  props: {
    value: {
      type: [Object, Array],
      default: () => {}
    },
    placeholder: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large'
    },
    popperClass: {
      type: String,
      default: ''
    },
    fallbackPlacements: {
      type: Array,
      default: () => ['bottom-start', 'top-start', 'right', 'left']
    },
    arrowPositionCenter: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false,
      inputHover: false,
      searchKey: '',
      inputInitialHeight: 40,
      pressDeleteCount: 0
    };
  },

  computed: {
    realSize() {
      const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
      return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
    },

    tagSize() {
      return ['small', 'mini'].indexOf(this.realSize) > -1 ? 'mini' : 'small';
    },

    readonly() {
      return true;
    },

    clearBtnVisible() {
      return this.disabled ? false : (this.clearable && (this.modelValue || this.presentTags.length > 0) && this.inputHover);
    },

    dropDownVisible() {
      return this.visible;
    },

    modelValue() {
      return this.multiple ? '' : ((this.value || {}).label || '');
    },

    calcPlaceholder() {
      const { placeholder, multiple, value } = this;
      return multiple ? (value.length > 0 ? ' ' : placeholder) : placeholder;
    },

    presentTags() {
      const { multiple, value, collapseTags } = this;

      const getTag = (item, closable = true) => {
        return {
          key: item.value,
          hitState: false,
          closable,
          text: item.label
        };
      };

      if (multiple) {
        if (!Array.isArray(value)) {
          throw new Error('in multiple mode, value must be array.');
        }
        if (collapseTags && value.length > 0) {
          if (value.length === 1) {
            return [ getTag(value[0]) ];
          } else {
            return [ getTag(value[0]), getTag({
              value: generateId(),
              label: ` + ${ value.length - 1 } `
            }, false) ];
          }
        } else {
          return value.map(item => getTag(item));
        }
      } else {
        return [];
      }
    },

    popperOptions() {
      return this.arrowPositionCenter ? {} : popperOptions;
    }
  },

  watch: {
    presentTags: {
      immediate: true,
      handler(val) {
        if (this.multiple) {
          this.$nextTick(this.updateStyle);
        }
      }
    },

    visible(val) {
      this.$emit('visible-change', val);
    }
  },

  methods: {
    hide() {
      this.visible = false;
    },

    show() {
      this.visible = true;
    },

    handleClear() {
      const value = this.multiple ? [] : {};
      this.$emit('input', value);
      this.$emit('clear', value);
    },

    deleteTag(tag) {
      const value = this.value.slice(0);
      value.splice(value.findIndex(item => item.value === tag.key), 1);
      this.$emit('input', value);
      this.$emit('remove-tag', {
        label: tag.text,
        value: tag.key
      });
    },

    updateStyle() {
      const $el = ((this.$refs || {}).inputRef || {}).$el;
      const tagsRef = (this.$refs || {}).tagsRef;
      const popperRef = (this.$refs || {}).popperRef;
      if (this.$isServer || !$el || !tagsRef) return;

      const inputInner = $el.querySelector('.el-input__inner');

      if (!inputInner) return;

      const offsetHeight = tagsRef.offsetHeight;
      const height = this.presentTags.length > 0 ? (offsetHeight + 8) : this.inputInitialHeight;
      const maxHeight = Math.max(height, this.inputInitialHeight);

      inputInner.style.height = maxHeight + 'px';

      popperRef && popperRef.update();
    },

    handleInput() {
      this.$emit('search', this.searchKey);
    },

    handleDelete() {
      const { searchKey, pressDeleteCount, presentTags } = this;
      const lastIndex = presentTags.length - 1;
      const lastTag = presentTags[lastIndex];
      this.pressDeleteCount = searchKey ? 0 : pressDeleteCount + 1;
      const innerInputRef = (this.$refs || {}).innerInputRef;

      if (!lastTag) return;

      if (this.pressDeleteCount) {
        if (lastTag.hitState) {
          this.deleteTag(lastTag);
        } else {
          lastTag.hitState = true;
          innerInputRef && innerInputRef.blur();
          innerInputRef && innerInputRef.focus();
        }
      }
    }
  },

  beforeCreate() {
    this.tick = null;
  },

  mounted() {
    const { inputRef } = this.$refs;
    if (inputRef && inputRef.$el) {
      this.inputInitialHeight = inputRef.$el.offsetHeight || InputSizeMap[this.realSize] || 40;
    }
  }
};
</script>
