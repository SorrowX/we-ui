import { generateId } from 'element-ui/src/utils/util';
import { UPDATE_VISIBLE_EVENT } from './defaults';
import { createPopper } from '../common/popper';
import buildModifier from './build-modifiers';
import { PopupManager } from 'element-ui/src/utils/popup';

export default {
  data() {
    return {
      popperId: `el-popper-${generateId()}`,
      popperStyle: { zIndex: PopupManager.nextZIndex() },
      state: {
        visible: !!this.visible
      }
    };
  },

  computed: {
    isManualMode() {
      return this.manualMode || this.trigger === 'manual';
    },

    visibility: {
      get() {
        return this.disabled ? false : (typeof this.visible === 'boolean' ? this.visible : this.state.visible);
      },
      set(val) {
        if (this.isManualMode) return;
        typeof this.visible === 'boolean' ? this.$emit(UPDATE_VISIBLE_EVENT, val) : (this.state.visible = val);
      }
    },

    usePopperOptions() {
      return {
        placement: this.placement,
        ...this.popperOptions,
        modifiers: buildModifier({
          arrow: this.$refs.arrowRef,
          arrowOffest: this.arrowOffset,
          offset: this.offset,
          gpuAcceleration: this.gpuAcceleration,
          fallbackPlacements: this.fallbackPlacements
        }, (this.popperOptions || {}).modifiers)
      };
    }
  },

  watch: {
    visibility(bool) {
      if (bool) {
        this.popperStyle.zIndex = PopupManager.nextZIndex();
        this.initializePopper();
      }
    },

    popperOptions(val) {
      if (!this.popperInstance) return;
      this.popperInstance.setOptions(val);
      this.popperInstance.update();
    }
  },

  methods: {

    initializePopper() {
      const { visibility, $refs, appendToBody, usePopperOptions } = this;

      if (!visibility) return;

      const trigger = $refs.triggerRef;
      const popper = $refs.popperRef;

      if (appendToBody) {
        document.body.appendChild(popper);
      }

      this.popperInstance = createPopper(trigger, popper, usePopperOptions);
      this.popperInstance.update();
    },

    update() {
      const { visibility, popperInstance } = this;
      if (!visibility) return;

      if (popperInstance) {
        popperInstance.update();
      } else {
        this.initializePopper();
      }
    },

    clearTimers() {
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
    },

    show() {
      const { isManualMode, disabled, clearTimers, _show, showAfter } = this;
      if (isManualMode || disabled) return;
      clearTimers();
      if (showAfter === 0) {
        _show();
      } else {
        this.showTimer = window.setTimeout(_show, showAfter);
      }
    },

    _show() {
      const { autoClose, _hide } = this;
      if (autoClose > 0) {
        this.hideTimer = window.setTimeout(_hide, autoClose);
      }
      this.visibility = true;
    },

    hide() {
      const { isManualMode, close, clearTimers, hideAfter } = this;
      if (isManualMode) return;
      clearTimers();
      if (hideAfter > 0) {
        this.hideTimer = window.setTimeout(close, hideAfter);
      } else {
        close();
      }
    },

    _hide() {
      this.visibility = false;
    },

    close() {
      this._hide();
      if (this.disabled) {
        this.doDestroy(true);
      }
    },

    onPopperMouseEnter() {
      // if trigger is click, user won't be able to close popper when
      // user tries to move the mouse over popper contents
      const { enterable, trigger } = this;
      if (enterable && trigger !== 'click') {
        clearTimeout(this.hideTimer);
      }
    },

    onPopperMouseLeave() {
      const { trigger } = this;
      const shouldPrevent =
        ((typeof trigger === 'string') && (trigger === 'click' || trigger === 'focus')) ||
        // we'd like to test array type trigger here, but the only case we need to cover is trigger === 'click' or
        // trigger === 'focus', because that when trigger is string
        // trigger.length === 1 and trigger[0] === 5 chars string is mutually exclusive.
        // so there will be no need to test if trigger is array type.
        ((Array.isArray(trigger) && trigger.length === 1) && (trigger[0] === 'click' || trigger[0] === 'focus'));

      if (shouldPrevent) return;

      this.hide();
    },

    doDestroy(forceDestroy) {
      const { popperInstance, visibility } = this;
      if (!popperInstance || visibility && !forceDestroy) return;
      this.detachPopper();
    },

    detachPopper() {
      const { popperInstance } = this;
      popperInstance && popperInstance.destroy();
      this.popperInstance = null;
    },

    triggerEvents() {
      const {
        isManualMode,
        trigger,
        show,
        hide,
        visibility
      } = this;
      const events = {};
      let triggerFocused = false;
      if (!isManualMode) {

        const toggleState = () => {
          visibility ? hide() : show();
        };

        const popperEventsHandler = e => {
          e.stopPropagation();
          switch (e.type) {
            case 'click':
              if (triggerFocused) {
                // reset previous focus event
                triggerFocused = false;
              } else {
                toggleState();
              }
              break;
            case 'mouseenter':
              show();
              break;
            case 'mouseleave':
              hide();
              break;
            case 'focus':
              triggerFocused = true;
              show();
              break;
            case 'blur':
              triggerFocused = false;
              hide();
              break;
          }

        };

        const triggerEventsMap = {
          click: ['click'],
          hover: ['mouseenter', 'mouseleave'],
          focus: ['focus', 'blur']
        };

        const mapEvents = triggerType => {
          triggerEventsMap[triggerType].forEach(event => {
            events[event] = popperEventsHandler;
          });
        };

        Array.isArray(trigger) ? Object.values(trigger).forEach(mapEvents) : mapEvents(trigger);
      }
      return events;
    },

    onBeforeEnter() {
      this.$emit('before-enter');
    },

    onAfterEnter() {
      this.$emit('after-enter');
    },

    onBeforeLeave() {
      this.$emit('before-leave');
    },

    onAfterLeave() {
      this.detachPopper();
      this.$emit('after-leave');
    }

  },

  beforeCreate() {
    this.showTimer = null;
    this.hideTimer = null;
    this.popperInstance = null;
  }
};
