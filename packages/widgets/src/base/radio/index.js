import ElRadio from 'element-ui/packages/radio';
import ElRadioGroup from 'element-ui/packages/radio-group';
import ElRadioButton from 'element-ui/packages/radio-button';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElRadioWidget',

  componentName: 'ElRadioWidget',

  type: 'radio',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    value: [Number, String, Boolean],

    radioData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    let innerChange = ((value) => {
      const { ajaxOptions } = this;
      const valuekey = ajaxOptions.props.value;
      const rawData = this.rawDataList.find(_ => _[valuekey] === value);
      this.emitEvent({ value, rawData, valuekey, widgetInstance: this });
    });
    const data = this.mergeData('radioData', innerChange);
    const radioType = (data.props || {}).type;
    const hasBorder = (data.props || {}).border;

    return !this.readonly
      ? h(
        ElRadioGroup,
        data,
        this._l(this.dataList, item => {
          return h(radioType === 'button' ? ElRadioButton : ElRadio, {
            props: {
              label: item.value,
              disabled: item.disabled,
              border: hasBorder
            }
          }, item.label);
        }))
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  },

  created() {
    this.setDataList(); // 初始化 this.dataList
  }
};
