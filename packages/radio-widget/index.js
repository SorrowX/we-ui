import widgets from 'element-ui/packages/widgets/src/widgets';

const RadioWidget = widgets['radio'];

/* istanbul ignore next */
RadioWidget.install = function(Vue) {
  Vue.component(RadioWidget.name, RadioWidget);
};

export default RadioWidget;
