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
    value: String,

    timeSelectData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('timeSelectData');

    return !this.readonly
      ? h(ElTimeSelect, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
