import Affix from './src/main.js';

/* istanbul ignore next */
Affix.install = function(Vue) {
  Vue.component(Affix.name, Affix);
};

export default Affix;
