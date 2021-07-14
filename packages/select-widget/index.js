import widgets from 'element-ui/packages/widgets/src/widgets';

const SelectWidget = widgets['select'];

/* istanbul ignore next */
SelectWidget.install = function(Vue) {
  Vue.component(SelectWidget.name, SelectWidget);
};

export default SelectWidget;
