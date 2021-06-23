import Widgets from './src/main';

const { widgets } = Widgets;

/* istanbul ignore next */
Widgets.install = function(Vue) {
  Object.keys(widgets).forEach(type => {
    const component = widgets[type];
    Vue.component(component.componentName, component);
  });
};

export default Widgets;
