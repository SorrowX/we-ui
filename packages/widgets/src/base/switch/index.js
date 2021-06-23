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
    value: [String, Boolean, Number],

    switchData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('switchData');

    return !this.readonly
      ? h(ElSwitch, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
