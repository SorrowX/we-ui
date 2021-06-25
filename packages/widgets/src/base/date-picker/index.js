import ElDatePicker from 'element-ui/packages/date-picker';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElDatePickerWidget',

  componentName: 'ElDatePickerWidget',

  type: 'date-picker',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    type: {
      type: String,
      default: 'date-picker'
    },

    value: {},

    datePickerData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly, renderWidget } = this;
    const data = this.mergeData('datePickerData');
    const slotsConfig = data['slots'] || {};

    const getSlots = (slots) => {
      return Object.keys(slots).map(slotName => {
        const f = slots[slotName];
        return f && f.call(this, h);
      });
    };

    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElDatePicker, data, getSlots(slotsConfig))
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
