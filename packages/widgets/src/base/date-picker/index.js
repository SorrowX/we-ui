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
    value: [String, Array, Date, Number, Object],

    datePickerData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('datePickerData');

    return !this.readonly
      ? h(ElDatePicker, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
