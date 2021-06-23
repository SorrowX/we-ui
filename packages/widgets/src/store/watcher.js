import Vue from 'vue';
import { generateId } from 'element-ui/src/utils/util';
import { isObject } from 'element-ui/src/utils/types';
import { ajaxOptions } from '../config';
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
      const props = this.formWidget.props;
      const spanKey = props['span'] || 'span';
      const labelKey = props['label'] || 'label';
      const valueKey = props['value'] || 'value';
      const typeKey = props['type'] || 'type';
      const propKey = props['prop'] || 'prop';

      const config = {
        // 布局相关属性
        span: widget[spanKey] * 1,
        label: widget[labelKey],
        size: this.formWidget.size,

        // 控件相关属性
        type: widget[typeKey],
        prop: widget[propKey] || 'prop' + generateId(),
        value: widget[valueKey],
        required: widget['required'],
        disabled: Boolean(widget['disabled']),
        placeholder: widget['placeholder'],
        readonly: widget['readonly'],
        rules: getRules(widget['rules'], widget['required'], `${widget[labelKey]}必须填写!`),

        // 网络请求相关属性
        ajaxOptions: merge(ajaxOptions, widget['ajaxOptions'] || {}),

        // 组件相关属性
        [getPropByType(widget[typeKey])]: widget[getPropByType(widget[typeKey])] || {},
        widgetVm: null, // 控件组件实例
        widgetComponent: getComponentbyType(widget[typeKey]),
        formItemVm: null, // FormItem组件实例

        // render 相关函数
        renderWidget: widget['renderWidget'],
        renderReadonly: widget['renderReadonly']
      };

      if (widget['columnData'] && isObject(widget['columnData'])) {
        config['columnData'] = widget['columnData'];
      }

      config['$$data'] = widget; // 用户的原始数据

      return config;
    },

    createWidgets(data) {
      data = data.filter(_ => !_.hidden);
      return data.map(_ => this.createWidget(_));
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
