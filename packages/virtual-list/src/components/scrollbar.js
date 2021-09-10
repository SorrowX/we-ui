import {
  DefaultScrollBarProps,
  HORIZONTAL,
  ScrollbarDirKey,
  SCROLLBAR_MIN_SIZE
} from '../default';
import { BAR_MAP } from 'element-ui/packages/scrollbar-v2/src/util';
import { renderThumbStyle, rAF, cAF } from '../utils';
import { on, off } from 'element-ui/src/utils/dom';

const GAP = 4;
let onselectstartStore = null;
let frameHandle = null;

export default {
  name: 'ElVirtualScrollBar',

  emits: ['scroll', 'start-move', 'stop-move'],

  props: {
    ...DefaultScrollBarProps
  },

  data() {
    return {
      state: {
        traveled: 0,
        isDragging: false
      }
    };
  },

  watch: {
    scrollFrom(v) {
      if (this.state.isDragging) return;
      this.state.traveled = Math.ceil(v * this.totalSteps);
    }
  },

  computed: {
    bar() {
      return BAR_MAP[this.layout];
    },

    horizontal() {
      return this.layout === HORIZONTAL;
    },

    trackStyle() {
      const {
        layout,
        visible,
        horizontal,
        trackSize
      } = this;

      return {
        display: visible ? null : 'none',
        position: 'absolute',
        width: horizontal ? trackSize + 'px' : '6px',
        height: horizontal ? '6px' : trackSize + 'px',
        [ScrollbarDirKey[layout]]: '2px',
        right: '2px',
        bottom: '2px',
        borderRadius: '4px'
      };
    },

    thumbStyle() {
      const { bar, thumbSize, layout, state } = this;

      if (!Number.isFinite(thumbSize)) {
        return {
          display: 'none'
        };
      }

      return renderThumbStyle({
        bar,
        move: state.traveled,
        size: thumbSize + 'px'
      }, layout);
    },

    trackSize() {
      return this.clientSize - GAP;
    },

    thumbSize() {
      const {
        ratio,
        clientSize
      } = this;

      if (ratio >= 100) {
        return Number.POSITIVE_INFINITY;
      }

      return Math.max(SCROLLBAR_MIN_SIZE, ratio * clientSize / 100);
    },

    totalSteps() {
      return Math.floor(this.clientSize - this.thumbSize - GAP);
    }
  },

  methods: {
    clickTrackHandler(e) {
      e.stopPropagation();
      e.preventDefault();

      const { bar, $refs, totalSteps, state } = this;
      const thumbRef = $refs.thumbRef;

      const offset = Math.abs(
        (e.target).getBoundingClientRect()[bar.direction] -
          e[bar.client]
      );
      const thumbHalf = thumbRef[bar.offset] / 2;
      const distance = offset - thumbHalf;

      state.traveled = Math.max(0, Math.min(distance, totalSteps));
      this.$emit('scroll', distance, totalSteps);
    },

    onThumbMouseDown(e) {
      const { state, bar } = this;

      e.stopImmediatePropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return;
      }

      state.isDragging = true;
      state[bar.axis] = e.currentTarget[bar.offset] - Math.abs(e[bar.client] - e.currentTarget.getBoundingClientRect()[bar.direction]); // 点击滚动条的位置到滚动条末尾的距离

      this.$emit('start-move');
      this.attachEvents();
    },

    attachEvents() {
      on(window, 'mousemove', this.onMouseMove);
      on(window, 'mouseup', this.onMouseUp);

      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
    },

    detachEvents() {
      off(window, 'mousemove', this.onMouseMove);
      off(window, 'mouseup', this.onMouseUp);

      document.onselectstart = onselectstartStore;
      onselectstartStore = null;
    },

    onMouseMove(e) {
      const { state, bar, totalSteps } = this;
      const trackRef = this.$refs.trackRef;
      const thumbRef = this.$refs.thumbRef;
      const pre = state[bar.axis];

      if (!state.isDragging || !pre) return;

      cAF(frameHandle);

      const thumbClickPosition = thumbRef[bar.offset] - pre;
      const distance = Math.abs(e[bar['client']] - trackRef.getBoundingClientRect()[bar['direction']]) - thumbClickPosition; // 点击滚动条的位置到滚动条槽开头的距离

      frameHandle = rAF(() => {
        state.traveled = Math.max(0, Math.min(distance, totalSteps));
      });

      this.$emit('scroll', distance, totalSteps);
    },

    onMouseUp() {
      const { state, bar } = this;
      state.isDragging = false;
      state[bar.axis] = 0;
      this.$emit('stop-move');
      this.detachEvents();
    }
  },

  beforeDestroy() {
    this.detachEvents();
  },

  render(h) {
    const {
      trackStyle,
      thumbStyle,
      clickTrackHandler,
      onThumbMouseDown
    } = this;

    const thumbVNode = h('div', {
      ref: 'thumbRef',
      class: 'el-virtual-scrollbar__thumb',
      style: thumbStyle,
      on: {
        mousedown: onThumbMouseDown
      }
    });

    return h('div', {
      ref: 'trackRef',
      attrs: {
        role: 'presentation'
      },
      class: 'el-virtual-scrollbar',
      style: trackStyle,
      on: {
        mousedown: clickTrackHandler
      }
    }, [ thumbVNode ]);
  }
};
