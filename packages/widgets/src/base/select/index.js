import ElSelect from 'element-ui/packages/select';
import ElOption from 'element-ui/packages/select/src/option';
import ElOptionGroup from 'element-ui/packages/select/src/option-group';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';
import { merge, bindContext } from '../../utils';

export default {
  name: 'ElSelectWidget',

  componentName: 'ElSelectWidget',

  type: 'select',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    value: [String, Number, Boolean, Array],

    selectData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;

    // 内部 change 事件
    let innerChange = ((value) => {
      const { ajaxOptions } = this;
      const valuekey = ajaxOptions.props.value;
      let rawData = Array.isArray(value)
        ? this.rawDataList.filter(_ => value.includes(_[valuekey]))
        : this.rawDataList.find(_ => _[valuekey] === value);
      this.emitEvent({ value, rawData, valuekey, widgetInstance: this });
    });
    let data = this.mergeData('selectData', innerChange);
    const selectType = (data.props || {}).type;

    // 合并 visible-change 事件
    const innerVisibleChange = visible => {
      if (visible) { // 请求数据
        this.setDataList();
      }
    };
    let userVisibleChange = (data.on || {})['visible-change'];
    if (userVisibleChange) {
      userVisibleChange = bindContext(userVisibleChange, this);
    }
    const mergeVisibleChange = {
      on: {
        'visible-change': typeof userVisibleChange === 'function' || Array.isArray(userVisibleChange)
          ? [innerVisibleChange].concat(userVisibleChange)
          : innerVisibleChange
      }
    };
    data = merge({}, data, mergeVisibleChange);

    // el-options 默认插槽内容
    let defaultSlot = (data.slots || {}).default;
    delete data.slots;

    if ((data.props || {}).remoteMethod) {
      data.props.remoteMethod = bindContext(data.props.remoteMethod, this);
    }

    const createItem = (list) => {
      return this._l(list, item => {
        return h(ElOption, {
          key: item.value,
          props: {
            label: item.label,
            value: item.value,
            disabled: item.disabled
          }
        }, defaultSlot && defaultSlot.call(this, h, item));
      });
    };

    const createChild = () => {
      return selectType === 'group'
        ? this._l(this.dataList, (item, index) => {
          return h(ElOptionGroup, {
            key: index,
            props: {
              label: item.label
            }
          }, createItem(item.options));
        })
        : createItem(this.dataList);
    };

    return !this.readonly
      ? h(ElSelect, data, createChild())
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  },

  created() {
    this.setDataList();
  }
};
