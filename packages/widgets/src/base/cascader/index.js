import ElCascader from 'element-ui/packages/cascader';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';

export default {
  name: 'ElCascaderWidget',

  componentName: 'ElCascaderWidget',

  type: 'cascader',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    type: {
      type: String,
      default: 'cascader'
    },

    value: {},

    cascaderData: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    hasOptions() {
      return !!((this.cascaderData || {}).props || {}).options;
    },
    hasScopedSlots() {
      return Object.keys(this.$scopedSlots).length;
    }
  },

  render(h) {
    const {
      renderReadonly,
      renderWidget,
      hasOptions,
      dataList,
      hasScopedSlots
    } = this;
    const data = this.mergeData('cascaderData');

    if (!hasOptions) {
      data.props.options = dataList;
    }

    if (hasScopedSlots) { // 模板优先级比scopedSlots配置高
      data.scopedSlots = this.$scopedSlots;
    }

    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElCascader, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  },

  mounted() {
    if (!this.hasOptions) {
      this.setDataList({
        convertData: (rawList) => {
          const { props } = this.mergedAjaxOptions;
          const cascaderProps = ((this.selectData || {}).props || {}).props || {};
          const valueKey = cascaderProps['value'] || props['value'] || 'value';
          const labelKey = cascaderProps['label'] || props['label'] || 'value';
          const childrenKey = cascaderProps['children'] || props['children'] || 'children';

          const getList = (list) => {
            return list.map(item => {
              const map = {
                value: item[valueKey],
                label: item[labelKey]
              };
              ['disabled', 'leaf'].forEach(key => {
                const userKey = cascaderProps[key] || props[key] || key;
                if (item.hasOwnProperty(item[props[key]])) {
                  map[key] = item[userKey];
                }
              });
              const children = item[childrenKey];
              if (Array.isArray(children) && children.length) {
                map.children = getList(children);
              }
              return map;
            });
          };
          return getList(rawList);
        }
      });
    }
  }
};
