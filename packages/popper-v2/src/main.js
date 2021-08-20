import defaultProps from './use-popper/defaults';
import { UPDATE_VISIBLE_EVENT } from './use-popper/defaults';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import usePopper from './use-popper/index';
import { renderArrow, renderPopper, renderTrigger } from './renderers/index';

const compName = 'ElPopper';

export default {
  name: compName,

  directives: { Clickoutside },

  mixins: [ usePopper ],

  props: defaultProps,

  model: {
    prop: 'visible',
    event: UPDATE_VISIBLE_EVENT
  },

  render(h) {
    const {
      $slots,
      showArrow,
      content,
      effect,
      transition,
      popperClass,
      popperStyle,
      pure,
      stopPopperMouseEvent,
      triggerClass,
      triggerStyle,
      popperId,
      onPopperMouseEnter,
      onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      onBeforeEnter,
      onBeforeLeave,
      visibility,
      triggerEvents,
      isManualMode,
      hide
    } = this;

    if (!$slots.trigger) {
      throw new Error(`${compName}: Trigger must be provided`);
    }

    const arrow = renderArrow(h, showArrow);

    const popper = renderPopper(h, {
      effect,
      name: transition,
      popperClass,
      popperId,
      popperStyle,
      pure,
      stopPopperMouseEvent,
      onPopperMouseEnter,
      onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      onBeforeEnter,
      onBeforeLeave,
      visibility
    }, ([].concat(arrow, $slots.default || []) || [arrow, h('span', content)]));

    const trigger = renderTrigger(h, {
      popperId,
      triggerClass,
      triggerStyle,
      events: triggerEvents(),
      isManualMode,
      hide
    }, $slots.trigger);

    return h('div', {
      class: 'el-popper-v2'
    }, [ trigger, popper ]);
  },

  mounted() {
    this.popperElm = this.$refs.popperRef;
    this.initializePopper();
  },

  activated() {
    this.popperElm = this.$refs.popperRef;
    this.initializePopper();
  },

  destroyed() {
    this.doDestroy(true);
  },

  deactivated() {
    this.doDestroy(true);
  }

};
