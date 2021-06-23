import ElInput from 'element-ui/packages/input';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElInputWidget',

  componentName: 'ElInputWidget',

  type: 'input',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    value: [String, Number],

    inputData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('inputData');
    const slotsConfig = data['slots'] || {};

    const getInputSlots = (slots = {}) => {
      return Object.keys(slots).map(slotName => {
        const f = slots[slotName];
        return f && f.call(this, h);
      });
    };

    return !this.readonly
      ? h(ElInput, data, getInputSlots(slotsConfig))
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
