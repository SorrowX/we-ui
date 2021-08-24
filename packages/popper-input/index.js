import PopperInput from './src/main';

/* istanbul ignore next */
PopperInput.install = function(Vue) {
  Vue.component(PopperInput.name, PopperInput);
};

export default PopperInput;
