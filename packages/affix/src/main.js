import {
  on,
  off,
  getScrollContainer
} from 'element-ui/src/utils/dom';
import {
  addResizeListener,
  removeResizeListener
} from 'element-ui/src/utils/resize-event';

export default {
  name: 'ElAffix',

  props: {
    zIndex: {
      type: [Number, String],
      default: 100
    },
    target: {
      type: String,
      default: ''
    },
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'top',
      validator: function(value) {
        return ['top', 'bottom'].indexOf(value) !== -1;
      }
    }
  },

  emits: ['scroll', 'change'],

  data() {
    return {
      targetEle: null,
      scrollContainerEle: null,
      state: {
        fixed: false,
        height: 0, // height of root
        width: 0, // width of root
        scrollTop: 0, // scrollTop of documentElement | scrollTop of scrollContainer
        clientHeight: 0, // clientHeight of documentElement
        transform: 0 // transform of wrap
      }
    };
  },

  watch: {
    fixed(val) {
      this.$emit('change', val);
    }
  },

  computed: {
    rootStyle() {
      const { state } = this;
      return {
        width: state.fixed ? state.width + 'px' : '',
        height: state.fixed ? state.height + 'px' : ''
      };
    },

    affixStyle() {
      const { state, position, zIndex } = this;
      if (!state.fixed) return {};

      const offset = this.offset ? this.offset + 'px' : 0;
      const translateY = state.transform ? `translateY(${state.transform}px)` : '';

      return {
        width: state.width + 'px',
        height: state.height + 'px',
        top: position === 'top' ? offset : '',
        bottom: position === 'bottom' ? offset : '',
        transform: translateY,
        zIndex
      };
    }
  },

  methods: {
    update() {
      const { targetEle, scrollContainerEle, state, position, target, offset } = this;
      const rootEle = this.$refs.root;

      if (!targetEle || !scrollContainerEle || !rootEle) return;

      const rootRect = rootEle.getBoundingClientRect();
      const targetRect = targetEle.getBoundingClientRect();

      state.width = rootRect.width;
      state.height = rootRect.height;
      state.scrollTop = scrollContainerEle instanceof Window ? document.documentElement.scrollTop : scrollContainerEle.scrollTop;
      state.clientHeight = document.documentElement.clientHeight;

      if (position === 'top') {
        if (target) {
          const difference = targetRect.bottom - offset - state.height;
          state.fixed = targetRect.bottom > 0 && offset > targetRect.top;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offset > rootRect.top;
        }
      } else {
        if (target) {
          const difference = state.clientHeight - targetRect.top - offset - state.height;
          state.fixed = state.clientHeight - offset < rootRect.bottom && state.clientHeight > targetRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          state.fixed = rootRect.bottom > state.clientHeight - offset;
        }
      }
    },

    onScroll() {
      this.update();

      this.$emit('scroll', {
        scrollTop: this.state.scrollTop,
        fixed: this.state.fixed
      });
    }
  },

  mounted() {
    if (this.target) {
      this.targetEle = document.querySelector(this.target);
      if (!this.targetEle) {
        throw new Error(`[ElAffix]: target is not existed: ${this.target}`);
      }
    } else {
      this.targetEle = document.documentElement;
    }
    this.scrollContainerEle = getScrollContainer(this.$refs.root, true);

    on(this.scrollContainerEle, 'scroll', this.onScroll);
    addResizeListener(this.$refs.root, this.update);
  },

  beforeDestroy() {
    off(this.scrollContainerEle, 'scroll', this.onScroll);
    removeResizeListener(this.$refs.root, this.update);
  },

  render(h) {

    const { rootStyle, affixStyle, state } = this;

    const createRootVNode = (child) => {
      return h('div', {
        ref: 'root',
        class: 'el-affix',
        style: rootStyle
      }, [child]);
    };

    const createWrapVNode = () => {
      return h('div', {
        style: affixStyle,
        class: [ state.fixed ? 'el-affix--fixed' : '' ]
      }, this.$slots.default);
    };

    return createRootVNode(
      createWrapVNode()
    );
  }
};
