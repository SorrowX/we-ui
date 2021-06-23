import ElCheckbox from 'element-ui/packages/checkbox';
import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
import ElCheckboxButton from 'element-ui/packages/checkbox-button';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElCheckboxWidget',

  componentName: 'ElCheckboxWidget',

  type: 'checkbox',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    value: [Array, String],

    checkboxData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    let innerChange = ((value) => {
      const { ajaxOptions } = this;
      const valuekey = ajaxOptions.props.value;
      const rawData = this.rawDataList.filter(_ => value.includes(_[valuekey])) || null;
      this.emitEvent({ value, rawData, valuekey, widgetInstance: this });
    });
    const data = this.mergeData('checkboxData', innerChange);
    const checkboxType = (data.props || {}).type;
    const hasBorder = (data.props || {}).border;

    return !this.readonly
      ? h(
        ElCheckboxGroup,
        data,
        this._l(this.dataList, item => {
          return h(checkboxType === 'button' ? ElCheckboxButton : ElCheckbox, {
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
    this.setDataList();
  }
};
