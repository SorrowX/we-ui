import {
  DefaultListProps,
  ITEM_RENDER_EVT,
  SCROLL_EVT,
  RTL,
  BACKWARD,
  FORWARD,
  HORIZONTAL,
  AUTO_ALIGNMENT,
  RTL_OFFSET_NAG,
  RTL_OFFSET_POS_DESC,
  RTL_OFFSET_POS_ASC
} from '../default';

import { isNumber, addUnit } from 'element-ui/src/utils/util';
import { isHorizontal, getScrollDir, getRTLOffsetType } from '../utils';
import useWheel from '../hooks/use-wheel';
import ElVirtualScrollBar from '../components/scrollbar';

const createList = ({
  name,
  initCache,
  getEstimatedTotalSize,
  getItemOffset,
  getItemSize,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
  getOffset,
  validateProps
}) => {
  return {
    name: name || 'ElVirtualList',

    props: {
      ...DefaultListProps
    },

    emits: [ ITEM_RENDER_EVT, SCROLL_EVT ],

    data() {
      return {
        states: {
          scrollDir: 'forward',
          isScrolling: false,
          updateRequested: false,
          isScrollbarDragging: false, // ?
          scrollOffset: isNumber(this.initScrollOffset) ? this.initScrollOffset : 0
        },
        dynamicSizeCache: initCache(this.$props, this)
      };
    },

    computed: {
      clientSize() {
        return this.horizontal ? this.width : this.height;
      },

      atStartEdge() {
        return this.states.scrollOffset <= 0;
      },

      atEndEdge() {
        return this.states.scrollOffset >= this.estimatedTotalSize;
      },

      horizontal() {
        return isHorizontal(this.layout);
      },

      estimatedTotalSize() {
        return getEstimatedTotalSize(this, this.dynamicSizeCache);
      },

      itemsToRender() {
        const { total, cache, states, dynamicSizeCache } = this;
        const { isScrolling, scrollDir, scrollOffset } = states;

        if (total === 0) {
          return [0, 0, 0, 0];
        }

        const startIndex = getStartIndexForOffset(this, scrollOffset, dynamicSizeCache);
        const stopIndex = getStopIndexForStartIndex(this, startIndex, scrollOffset, dynamicSizeCache);
        const cacheBackward = (!isScrolling || scrollDir === BACKWARD) ? Math.max(1, cache) : 1;
        const cacheForward = (!isScrolling || scrollDir === FORWARD) ? Math.max(1, cache) : 1;

        return [
          Math.max(0, startIndex - cacheBackward),
          Math.min(total - 1, stopIndex + cacheForward),
          startIndex,
          stopIndex
        ];
      },

      innerStyle() {
        const { horizontal, states } = this;
        const size = this.estimatedTotalSize;
        return {
          width: horizontal ? size + 'px' : '100%',
          height: horizontal ? '100%' : size + 'px',
          pointerEvents: states.isScrolling ? 'none' : undefined
        };
      },

      windowStyle() {
        return [
          {
            position: 'relative',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform'
          },
          {
            direction: this.direction,
            width: addUnit(this.width),
            height: addUnit(this.height),
            ...this.containerStyle
          }
        ];
      }
    },

    methods: {
      onScrollbarScroll(distance, totalSteps) {
        const ratio = distance / totalSteps;

        this.scrollTo(Math.min(
          ratio * (this.estimatedTotalSize - this.clientSize),
          this.estimatedTotalSize - this.clientSize
        ));
      },
      onScroll(e) {
        const {
          horizontal,
          scrollHorizontally,
          scrollVertically,
          emitEvents
        } = this;

        horizontal ? scrollHorizontally(e) : scrollVertically(e);
        emitEvents();
      },

      scrollHorizontally(e) {
        const {
          clientWidth,
          scrollWidth,
          scrollLeft
        } = e.currentTarget;

        const { states, $nextTick, resetIsScrolling, direction } = this;

        if (states.scrollOffset === scrollLeft) {
          return;
        }

        let scrollOffset = scrollLeft;

        if (direction === RTL) {
          // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
          // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
          // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
          // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
          switch (getRTLOffsetType()) {
            case RTL_OFFSET_NAG: {
              scrollOffset = -scrollLeft;
              break;
            }
            case RTL_OFFSET_POS_DESC: {
              scrollOffset = scrollWidth - clientWidth - scrollLeft;
              break;
            }
          }
        }

        scrollOffset = Math.max(
          0,
          Math.min(scrollOffset, scrollWidth - clientWidth)
        );

        this.states = {
          ...states,
          isScrolling: true,
          scrollDir: getScrollDir(states.scrollOffset, scrollOffset),
          scrollOffset,
          updateRequested: false
        };

        $nextTick(resetIsScrolling);
      },

      scrollVertically(e) {
        const {
          clientHeight,
          scrollHeight,
          scrollTop
        } = e.currentTarget;

        const { states, $nextTick, resetIsScrolling } = this;

        if (states.scrollOffset === scrollTop) {
          return;
        }

        const scrollOffset = Math.max(
          0,
          Math.min(scrollTop, scrollHeight - clientHeight)
        );

        this.states = {
          ...states,
          isScrolling: true,
          scrollDir: getScrollDir(states.scrollOffset, scrollOffset),
          scrollOffset,
          updateRequested: false
        };

        $nextTick(resetIsScrolling);
      },

      emitEvents() {
        const { total, itemsToRender, states } = this;

        if (total > 0) {
          const [cacheStart, cacheEnd, visibleStart, visibleEnd] = itemsToRender;
          this.$emit(ITEM_RENDER_EVT, cacheStart, cacheEnd, visibleStart, visibleEnd);
        }

        const { scrollDir, scrollOffset, updateRequested } = states;
        this.$emit(SCROLL_EVT, scrollDir, scrollOffset, updateRequested);
      },

      scrollTo(offset) {
        const { states, $nextTick, resetIsScrolling } = this;
        offset = Math.max(0, offset);

        if (offset === states.scrollOffset) {
          return;
        }

        this.states = {
          ...states,
          scrollOffset: offset,
          scrollDir: getScrollDir(states.scrollOffset, offset),
          updateRequested: true
        };

        $nextTick(resetIsScrolling);
      },

      scrollToItem(idx, alignment = AUTO_ALIGNMENT) {
        const { scrollOffset } = this.states;
        const { total, scrollTo, dynamicSizeCache } = this;

        idx = Math.max(0, Math.min(total - 1, idx));

        scrollTo(
          getOffset(
            this,
            idx,
            alignment,
            scrollOffset,
            dynamicSizeCache
          )
        );
      },

      resetIsScrolling() {
        this.states.isScrolling = false;
      },

      getItemStyle(idx) {
        const {
          direction,
          horizontal,
          dynamicSizeCache
        } = this;

        const offset = getItemOffset(this, idx, dynamicSizeCache);
        const size = getItemSize(this, idx, dynamicSizeCache);
        const isRtl = direction === RTL;
        const offsetHorizontal = horizontal ? offset : 0;

        const style = {
          position: 'absolute',
          left: isRtl ? void 0 : `${offsetHorizontal}px`,
          right: isRtl ? `${offsetHorizontal}px` : void 0,
          top: !horizontal ? `${offset}px` : 0,
          height: !horizontal ? `${size}px` : '100%',
          width: horizontal ? `${size}px` : '100%'
        };

        return style;
      }
    },

    created() {
      validateProps(this.props);
    },

    mounted() {
      const { initScrollOffset, horizontal, $refs } = this;
      const windowElement = $refs.windowRef;
      if (isNumber(initScrollOffset) && windowElement) {
        if (horizontal) {
          windowElement.scrollLeft = initScrollOffset;
        } else {
          windowElement.scrollTop = initScrollOffset;
        }
      }
    },

    updated() {
      const { direction, layout, states, $refs } = this;
      const { scrollOffset, updateRequested } = states;
      const windowElement = $refs.windowRef;

      if (updateRequested && windowElement) {
        if (layout === HORIZONTAL) {
          if (direction === RTL) {
            // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // So we need to determine which browser behavior we're dealing with, and mimic it.
            switch (getRTLOffsetType()) {
              case RTL_OFFSET_NAG:
                windowElement.scrollLeft = -scrollOffset;
                break;
              case RTL_OFFSET_POS_ASC:
                windowElement.scrollLeft = scrollOffset;
                break;
              default: {
                const { clientWidth, scrollWidth } = windowElement;
                windowElement.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                break;
              }
            }
          } else {
            windowElement.scrollLeft = scrollOffset;
          }
        } else {
          windowElement.scrollTop = scrollOffset;
        }
      }
    },

    render(h) {
      const {
        data,
        $scopedSlots,
        itemsToRender,
        states,
        getItemStyle,
        useIsScrolling,
        innerElement,
        innerStyle,
        containerElement,
        className,
        windowStyle,
        onScroll,
        scrollTo,
        estimatedTotalSize,
        clientSize,
        layout,
        total,
        onScrollbarScroll
      } = this;

      const { onWheel } = useWheel(this, (offset) => {
        // console.log(offset);
        scrollTo(Math.min(
          states.scrollOffset + offset,
          estimatedTotalSize - clientSize
        ));
      });

      const [ start, end ] = itemsToRender;

      const children = [];
      const defaultScopedSlots = $scopedSlots.default;

      for (let i = start; i <= end; i++) {
        children.push(defaultScopedSlots && defaultScopedSlots({
          key: i,
          index: i,
          data: data,
          style: getItemStyle(i),
          isScrolling: useIsScrolling ? states.isScrolling : undefined
        }));
      }

      const InnerVNode = h(innerElement, {
        style: innerStyle,
        ref: 'innerRef'
      }, children);

      const listContainer = h(containerElement, {
        class: className,
        style: windowStyle,
        ref: 'windowRef',
        key: 0,
        on: {
          scroll: onScroll,
          wheel: onWheel
        }
      }, [ InnerVNode ]);

      const scrollbar = h(ElVirtualScrollBar, {
        ref: 'scrollbarRef',
        props: {
          clientSize,
          layout,
          ratio: clientSize * 100 / estimatedTotalSize,
          scrollFrom: states.scrollOffset / (estimatedTotalSize - clientSize),
          total,
          visible: true
        },
        on: {
          scroll: onScrollbarScroll
        }
      });

      return h('div', {
        class: 'el-vl__wrapper'
      }, [
        listContainer,
        scrollbar
      ]);
    }
  };
};

export default createList;
