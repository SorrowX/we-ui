import Vue from 'vue';
import { isObject } from 'element-ui/src/utils/types';
import { ajaxOptions, widgetBaseProps } from '../config';
import {
  getPropByType,
  getComponentbyType,
  merge,
  getRules
} from '../utils';

export default Vue.extend({
  data() {
    return {
      states: {
        // form-widgets
        form: {},
        widgets: [],
        widgetsGroup: [], // [ [], [], ... ]

        // table-widgets
        tableColumns: []
      }
    };
  },

  methods: {
    createWidget(widget) {
      const props = merge({}, widgetBaseProps, this.componentInstance.props);

      const typeKey = props['type'];
      const labelKey = props['label'];
      const propKey = props['prop'];
      const spanKey = props['span'];
      const valueKey = props['value'];
      const requiredKey = props['required'];
      const disabledKey = props['disabled'];
      const placeholderKey = props['placeholder'];
      const readonlyKey = props['readonly'];
      const rulesKey = props['rules'];
      const ajaxOptionsKey = props['ajaxOptions'];
      const renderWidgetKey = props['renderWidget'];
      const renderReadonlyKey = props['renderReadonly'];
      const formItemDataKey = props['formItemData'];

      const config = {
        // 控件布局相关属性
        span: widget[spanKey] || 24,
        label: widget[labelKey] || '',

        // 控件相关属性
        type: widget[typeKey],
        prop: widget[propKey],
        value: widget[valueKey],
        required: widget[requiredKey],
        disabled: Boolean(widget[disabledKey]),
        placeholder: widget[placeholderKey],
        readonly: widget[readonlyKey],
        rules: getRules(widget[rulesKey], widget[requiredKey], `${widget[labelKey]}必须填写!`),

        // 网络请求相关属性
        ajaxOptions: merge({}, ajaxOptions, widget[ajaxOptionsKey] || {}),

        // 组件相关属性
        [getPropByType(widget[typeKey])]: widget[getPropByType(widget[typeKey])] || {},
        widgetComponent: getComponentbyType(widget[typeKey]), // 对应组件控件
        widgetVm: null, // 控件组件实例
        formItemVm: null, // FormItem组件实例
        formItemData: widget[formItemDataKey], // form-item 组件 { props, scopedSlots, on }

        // render 相关函数
        renderWidget: widget[renderWidgetKey],
        renderReadonly: widget[renderReadonlyKey]
      };

      if (widget['columnData'] && isObject(widget['columnData'])) {
        config['columnData'] = widget['columnData'];
      }

      config['$$data'] = widget; // 用户的原始数据

      return config;
    },

    createWidgets(data) {
      return data.filter(_ => !_.hidden).map(_ => this.createWidget(_));
    },

    createWidgetGroup(widgets) {
      let groups = [[]];
      const widgetsCopy = widgets.slice();

      for (let i = 0; i < widgetsCopy.length; i++) {
        let last = groups[groups.length - 1];
        const widget = widgetsCopy[i];

        const spans = last.reduce((spans, item) => spans + item.span, 0);
        if (spans + widget.span > 24) {
          last = groups[groups.length] = [];
          last.push(widget);
        } else {
          last.push(widget);
        }
      }

      if (widgets.length === 0) {
        groups = [];
      }

      groups.forEach(group => {
        const spans = group.reduce((spans, widget) => spans + widget.span, 0);
        if (spans < 24) {
          group[group.length - 1]['is-not-fully-covered'] = true;
        }
      });

      return groups;
    },

    createForm(widgets) {
      return widgets.reduce((ret, widget) => {
        return {
          ...ret,
          ...{
            [widget['prop']]: widget['value']
          }
        };
      }, {});
    }
  }
});
