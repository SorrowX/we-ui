import { BAR_MAP, renderThumbStyle } from './util';
import { on, off } from 'element-ui/src/utils/dom';

export default {
  name: 'Bar',

  inject: ['scrollbar'],

  props: {
    vertical: Boolean,
    size: String,
    move: Number,
    always: Boolean,
    ratio: Number
  },

  data() {
    return {
      barStore: {},
      cursorDown: null,
      cursorLeave: null,
      visible: false
    };
  },

  computed: {
    bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
    },

    thumbStyle() {
      const { size, move, bar } = this;
      return renderThumbStyle({
        size, move, bar
      });
    },

    offsetRatio() {
      // offsetRatioX = original width of thumb / current width of thumb / ratioX
      // offsetRatioY = original height of thumb / current height of thumb / ratioY
      // instance height = wrap height - GAP

      const { bar, $refs, scrollbar, ratio } = this;
      const instance = $refs.instance;
      const thumb = $refs.thumb;
      const wrap = scrollbar.$refs.wrap;

      const originalThumbSize = instance[bar.offset] / wrap[bar.scrollSize] * instance[bar.offset];
      const currentThumbSize = thumb[bar.offset];
      return originalThumbSize / currentThumbSize / ratio;
    }
  },

  methods: {
    clickTrackHandler(e) {
      const { bar, $refs, scrollbar, offsetRatio } = this;
      const wrap = scrollbar.$refs.wrap;
      const thumb = $refs.thumb;
      const instance = $refs.instance;

      const offset = Math.abs(e[bar.client] - instance.getBoundingClientRect()[bar.direction]);
      const thumbHalf = thumb[bar.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * offsetRatio / instance[bar.offset];

      wrap[bar.scroll] = thumbPositionPercentage * wrap[bar.scrollSize];
    },

    clickThumbHandler(e) {
      const { bar } = this;

      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return;
      }
      window.getSelection().removeAllRanges();
      this.startDrag(e);

      this.barStore[bar.axis] = (e.currentTarget[bar.offset] - (e[bar.client] - e.currentTarget.getBoundingClientRect()[bar.direction]));
    },

    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;
      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      this.onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
    },

    mouseMoveDocumentHandler(e) {
      const { bar, barStore, $refs, scrollbar, offsetRatio } = this;
      const wrap = scrollbar.$refs.wrap;
      const thumb = $refs.thumb;
      const instance = $refs.instance;

      if (this.cursorDown === false) return;
      const prevPage = barStore[bar.axis];

      if (!prevPage) return;

      const offset = (instance.getBoundingClientRect()[bar.direction] - e[bar.client]) * -1;
      const thumbClickPosition = thumb[bar.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * offsetRatio / instance[bar.offset];
      wrap[bar.scroll] = thumbPositionPercentage * wrap[bar.scrollSize];
    },

    mouseUpDocumentHandler(e) {
      const { bar } = this;

      this.cursorDown = false;
      this.barStore[bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = this.onselectstartStore;
      if (this.cursorLeave) {
        this.visible = false;
      }
    },

    mouseMoveScrollbarHandler() {
      this.cursorLeave = false;
      this.visible = !!this.size;
    },

    mouseLeaveScrollbarHandler() {
      this.cursorLeave = true;
      this.visible = this.cursorDown;
    }
  },

  beforeCreate() {
    this.onselectstartStore = null;
  },

  mounted() {
    const { scrollbar: scrollbarVm } = this;
    const scrollbar = scrollbarVm.$refs.scrollbar;
    on(scrollbar, 'mousemove', this.mouseMoveScrollbarHandler);
    on(scrollbar, 'mouseleave', this.mouseLeaveScrollbarHandler);
  },

  destroyed() {
    const { scrollbar: scrollbarVm } = this;
    const scrollbar = scrollbarVm.$refs.scrollbar;
    off(scrollbar, 'mousemove', this.mouseMoveScrollbarHandler);
    off(scrollbar, 'mouseleave', this.mouseLeaveScrollbarHandler);
  },

  render(h) {

    const renderTransition = (child) => {
      return h('transition', {
        attrs: {
          name: 'el-scrollbar-v2-fade'
        }
      }, [ child ]);
    };

    const renderBar = (child) => {
      const { always, visible, bar, clickTrackHandler } = this;

      return h('div', {
        ref: 'instance',
        class: ['el-scrollbar-v2__bar', 'is-' + bar.key],
        directives: [{
          name: 'show',
          rawName: 'v-show',
          value: always || visible,
          expression: 'always || visible'
        }],
        on: {
          'mousedown': clickTrackHandler
        }
      }, [ child ]);
    };

    const renderThumb = () => {
      const { thumbStyle, clickThumbHandler } = this;

      return h('div', {
        ref: 'thumb',
        style: thumbStyle,
        class: 'el-scrollbar-v2__thumb',
        on: {
          'mousedown': clickThumbHandler
        }
      });
    };

    return renderTransition(renderBar(renderThumb()));
  }
};
