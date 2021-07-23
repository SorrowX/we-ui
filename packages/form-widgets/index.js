import FormWidgets from './src/main.js';

/* istanbul ignore next */
FormWidgets.install = function(Vue) {
  Vue.component(FormWidgets.name, FormWidgets);
};

export default FormWidgets;
