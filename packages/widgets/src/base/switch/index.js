import ElSwitch from 'element-ui/packages/switch';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElSwitchWidget',

  componentName: 'ElSwitchWidget',

  type: 'switch',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    type: {
      type: String,
      default: 'switch'
    },

    value: [String, Boolean, Number],

    switchData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly, renderWidget } = this;
    const data = this.mergeData('switchData');

    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElSwitch, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
