import widgets from 'element-ui/packages/widgets/src/widgets';

const SwitchWidget = widgets['switch'];

/* istanbul ignore next */
SwitchWidget.install = function(Vue) {
  Vue.component(SwitchWidget.name, SwitchWidget);
};

export default SwitchWidget;
