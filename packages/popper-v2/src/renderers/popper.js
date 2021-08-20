const NOOP = () => {};
const stop = e => e.stopPropagation();

export default function renderPopper(h, props, children) {
  const {
    effect,
    popperClass,
    pure,
    stopPopperMouseEvent,
    name,
    onAfterEnter,
    onAfterLeave,
    onBeforeEnter,
    onBeforeLeave,
    onPopperMouseEnter,
    onPopperMouseLeave,
    visibility,
    popperStyle,
    popperId
  } = props;

  const kls = [
    popperClass,
    'el-popper-v2__default',
    'is-' + effect,
    pure ? 'is-pure' : ''
  ];

  const mouseUpAndDown = stopPopperMouseEvent ? stop : NOOP;

  /**
   * Equivalent to
   * <transition
   *   :name="name"
   *   @afterEnter="onAfterEnter"
   *   @afterLeave="onAfterLeave"
   *   @beforeEnter="onBeforeEnter"
   *   @beforeLeave="onBeforeLeave"
   * >
   *  <div
   *   v-show="visibility"
   *   :aria-hidden="!visibility"
   *   :class="kls"
   *   ref="popperRef"
   *   role="tooltip"
   *   @mouseenter="onMouseenter"
   *   @mouseleave="onMouseleave"
   *   @click="stop"
   *   @mousedown="mouseUpAndDown"
   *   @mouseup="mouseUpAndDown"
   * >
   *    <slot />
   *  </div>
   * </transition>
   */

  return h('transition', {
    props: { name },
    on: {
      beforeEnter: onBeforeEnter,
      afterEnter: onAfterEnter,
      beforeLeave: onBeforeLeave,
      afterLeave: onAfterLeave
    }
  }, [
    h('div', {
      attrs: {
        'aria-hidden': String(!visibility),
        role: 'tooltip',
        id: popperId
      },
      class: kls,
      style: popperStyle || {},
      ref: 'popperRef',
      on: {
        mouseenter: onPopperMouseEnter,
        mouseleave: onPopperMouseLeave,
        click: stop,
        mousedown: mouseUpAndDown,
        mouseup: mouseUpAndDown
      },
      directives: [{
        name: 'show',
        rawName: 'v-show',
        value: visibility,
        expression: 'visibility'
      }]
    }, children)
  ]);
}
