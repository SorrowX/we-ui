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
    value: Number,

    inputNumberData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('inputNumberData');

    return !this.readonly
      ? h(ElInputNumber, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
