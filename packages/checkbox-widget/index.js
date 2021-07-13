import widgets from 'element-ui/packages/widgets/src/widgets';

const CheckboxWidget = widgets['checkbox'];

/* istanbul ignore next */
CheckboxWidget.install = function(Vue) {
  Vue.component(CheckboxWidget.name, CheckboxWidget);
};

export default CheckboxWidget;
