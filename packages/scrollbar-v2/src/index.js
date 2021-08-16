// reference https://github.com/element-plus/element-plus/tree/dev/packages/scrollbar
// reference https://github.com/element-plus/element-plus/pull/2916

import { isString } from 'element-ui/src/utils/types';
import { toObject, addUnit, isNumber } from 'element-ui/src/utils/util';
import { warn } from 'element-ui/src/utils/error';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import Bar from './bar';

const SCOPE = 'ElScrollbarV2';
const GAP = 4; // top 2 + bottom 2 of bar instance

export default {
  name: 'ElScrollbarV2',

  components: { Bar },

  props: {
    height: {
      type: [String, Number],
      default: ''
    },
    maxHeight: {
      type: [String, Number],
      default: ''
    },
    native: {
      type: Boolean,
      default: false
    },
    wrapStyle: {
      type: [String, Array],
      default: ''
    },
    wrapClass: {
      type: [String, Array],
      default: ''
    },
    viewClass: {
      type: [String, Array],
      default: ''
    },
    viewStyle: {
      type: [String, Array],
      default: ''
    },
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    },
    always: {
      type: Boolean,
      default: false
    },
    minSize: {
      type: Number,
      default: 20
    }
  },

  provide() {
    return {
      scrollbar: this
    };
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      ratioX: 1,
      ratioY: 1
    };
  },

  computed: {
    style() {
      const { height, maxHeight } = this;
      let style = this.wrapStyle;
      if (Array.isArray(style)) {
        style = toObject(style);
        style.height = addUnit(height);
        style.maxHeight = addUnit(maxHeight);
      } else if (isString(style)) {
        style += addUnit(height) ? `height: ${addUnit(height)}` : '';
        style += addUnit(maxHeight) ? `max-height: ${addUnit(maxHeight)}` : '';
      }
      return style;
    }
  },

  methods: {
    update() {
      const wrap = this.$refs.wrap;
      const { minSize } = this;
      if (!wrap) return;

      const offsetHeight = wrap.offsetHeight - GAP;
      const offsetWidth = wrap.offsetWidth - GAP;

      const originalHeight = offsetHeight / wrap.scrollHeight * offsetHeight;
      const originalWidth = offsetWidth / wrap.scrollWidth * offsetWidth;

      const height = Math.max(originalHeight, minSize);
      const width = Math.max(originalWidth, minSize);

      this.ratioY = (originalHeight / (offsetHeight - originalHeight)) / (height / (offsetHeight - height));
      this.ratioX = (originalWidth / (offsetWidth - originalWidth)) / (width / (offsetWidth - width));

      this.sizeHeight = height + GAP < offsetHeight ? height + 'px' : '';
      this.sizeWidth = width + GAP < offsetWidth ? width + 'px' : '';
    },

    handleScroll() {
      const wrap = this.$refs.wrap;
      if (!wrap) return;

      const offsetHeight = wrap.offsetHeight - GAP;
      const offsetWidth = wrap.offsetWidth - GAP;

      this.moveY = (wrap.scrollTop * 100) / offsetHeight * this.ratioY;
      this.moveX = (wrap.scrollLeft * 100) / offsetWidth * this.ratioX;

      this.$emit('scroll', {
        scrollLeft: wrap.scrollLeft,
        scrollTop: wrap.scrollTop
      });
    },

    setScrollTop(value) {
      const wrap = this.$refs.wrap;
      if (!isNumber(value)) {
        if (process.env.NODE_ENV !== 'production') {
          warn(SCOPE, 'value must be a number');
          return;
        }
      }
      wrap && (wrap.scrollTop = value);
    },

    setScrollLeft(value) {
      const wrap = this.$refs.wrap;
      if (!isNumber(value)) {
        if (process.env.NODE_ENV !== 'production') {
          warn(SCOPE, 'value must be a number');
          return;
        }
      }
      wrap && (wrap.scrollLeft = value);
    },

    renderWrap(h) {
      const {
        tag,
        style,
        native,
        wrapClass,
        viewClass,
        viewStyle,
        handleScroll,
        $slots
      } = this;

      const tagVNode = h(
        tag,
        {
          tag: 'component',
          ref: 'resize',
          class: ['el-scrollbar-v2__view', viewClass],
          style: viewStyle
        },
        $slots.default
      );

      return h(
        'div',
        {
          ref: 'wrap',
          style,
          class: [
            wrapClass,
            'el-scrollbar-v2__wrap',
            native ? '' : 'el-scrollbar-v2__wrap--hidden-default'
          ],
          on: {
            scroll: handleScroll
          }
        },
        [tagVNode]
      );
    }
  },

  mounted() {
    const { native, noresize, update, $nextTick, $refs } = this;

    if (!native) {
      $nextTick(update);
    }
    if (!noresize) {
      addEventListener('resize', update);
      addResizeListener($refs.resize, update);
    }
  },

  destroyed() {
    const { noresize, update, $refs } = this;

    if (!noresize) {
      removeEventListener('resize', update);
      removeResizeListener($refs.resize, update);
    }
  },

  render(h) {
    const { native, sizeHeight, sizeWidth, moveX, moveY, ratioX, ratioY, always } = this;

    const wrapVNode = this.renderWrap(h);

    const barVNodes = native
      ? ''
      : [
        h(Bar, {
          props: {
            always,
            size: sizeWidth,
            move: moveX,
            ratio: ratioX
          },
          ref: 'horizontalBar'
        }),
        h(Bar, {
          props: {
            always,
            vertical: true,
            size: sizeHeight,
            move: moveY,
            ratio: ratioY
          },
          ref: 'verticalBar'
        })
      ];

    return h(
      'div',
      {
        ref: 'scrollbar',
        class: 'el-scrollbar-v2'
      },
      [wrapVNode, barVNodes]
    );
  }
};
