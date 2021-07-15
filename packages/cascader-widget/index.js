import widgets from 'element-ui/packages/widgets/src/widgets';

const CascaderWidget = widgets['cascader'];

/* istanbul ignore next */
CascaderWidget.install = function(Vue) {
  Vue.component(CascaderWidget.name, CascaderWidget);
};

export default CascaderWidget;
