import ElTimeSelect from 'element-ui/packages/time-select';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElTimeSelectWidget',

  componentName: 'ElTimeSelectWidget',

  type: 'time-select',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    type: {
      type: String,
      default: 'time-select'
    },

    value: {},

    timeSelectData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly, renderWidget } = this;
    const data = this.mergeData('timeSelectData');

    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElTimeSelect, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
