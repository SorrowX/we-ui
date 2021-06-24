import widgets from 'element-ui/packages/widgets/src/widgets';

const InputWidget = widgets.input;

/* istanbul ignore next */
InputWidget.install = function(Vue) {
  Vue.component(InputWidget.name, InputWidget);
};

export default InputWidget;
