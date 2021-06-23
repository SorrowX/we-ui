import ElTimePicker from 'element-ui/packages/time-picker';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElTimePickerWidget',

  componentName: 'ElTimePickerWidget',

  type: 'time-picker',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    value: [Array, String, Date],

    timePickerData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('timePickerData');

    return !this.readonly
      ? h(ElTimePicker, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
