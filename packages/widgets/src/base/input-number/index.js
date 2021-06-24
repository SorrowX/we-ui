import ElInputNumber from 'element-ui/packages/input-number';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElInputNumberWidget',

  componentName: 'ElInputNumberWidget',

  type: 'input-number',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    type: {
      type: String,
      default: 'input-number'
    },

    value: {},

    inputNumberData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly, renderWidget } = this;
    const data = this.mergeData('inputNumberData');

    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElInputNumber, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
