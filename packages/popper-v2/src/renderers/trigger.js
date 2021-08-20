
export default function renderTrigger(h, props, children) {
  const {
    popperId,
    triggerClass,
    triggerStyle,
    events,
    isManualMode,
    hide
  } = props;

  const triggerData = {
    attrs: {
      'aria-describedby': popperId
    },
    class: ['el-popper-v2__trigger', triggerClass],
    style: triggerStyle,
    ref: 'triggerRef',
    on: events
  };

  if (!isManualMode) {
    triggerData.directives = [{
      name: 'clickoutside',
      rawName: 'v-clickoutside',
      value: hide,
      expression: 'hide'
    }];
  }

  /**
   * Equivalent to
   * <div
   *   :aria-describedby="popperId"
   *   :class="['el-popper__trigger', triggerClass]"
   *   :style="triggerStyle"
   *   ref="triggerRef"
   * >
   *  <slot />
   * </div>
   */
  return h('div', triggerData, children);
}
