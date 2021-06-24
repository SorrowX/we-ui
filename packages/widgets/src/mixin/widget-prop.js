import { ajaxOptions } from '../config';

export default {
  props: {
    type: String, // 控件类型

    value: null,

    placeholder: String,

    readonly: {
      type: Boolean,
      default: false
    },

    renderReadonly: Function,

    renderWidget: Function,

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
