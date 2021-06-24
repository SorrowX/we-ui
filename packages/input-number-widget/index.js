import widgets from 'element-ui/packages/widgets/src/widgets';

const InputNumberWidget = widgets['input-number'];

/* istanbul ignore next */
InputNumberWidget.install = function(Vue) {
  Vue.component(InputNumberWidget.name, InputNumberWidget);
};

export default InputNumberWidget;
