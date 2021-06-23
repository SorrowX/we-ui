import baseWidgets from './base';
import plugsWidgets from './plugs';

const widgets = {
  ...baseWidgets,
  ...plugsWidgets
};

widgets.use = function(type, component) {
  if (!widgets[type]) {
    widgets[type] = component;
  } else {
    console.error(`${type} widget component already exists!`);
  }
};

export default widgets;
