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
    value: [Array, String], // String类型只是为了只读情况下展示只读文本

    cascaderData: {
      type: Object,
      default: () => {}
    }
  },

  render(h) {
    const { renderReadonly } = this;
    const data = this.mergeData('cascaderData');

    return !this.readonly
      ? h(ElCascader, data)
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
