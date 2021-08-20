import Popper from './src/main.js';

/* istanbul ignore next */
Popper.install = function(Vue) {
  Vue.component(Popper.name, Popper);
};

export default Popper;
