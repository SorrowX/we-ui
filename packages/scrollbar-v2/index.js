import ScrollbarV2 from './src/index';

/* istanbul ignore next */
ScrollbarV2.install = function(Vue) {
  Vue.component(ScrollbarV2.name, ScrollbarV2);
};

export default ScrollbarV2;
