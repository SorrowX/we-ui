import { ajaxOptions } from '../config';

export default {
  props: {
    type: String,

    readonly: {
      type: Boolean,
      default: false
    },

    renderReadonly: Function,

    value: String, // 各个widget组件重写这个属性

    placeholder: String,

    disabled: {
      type: Boolean,
      default: false
    },

    ajaxOptions: {
      type: Object,
      default: () => ajaxOptions
    }
  }
};
