import { createStore, mapStates } from './store/help';
import widgets from './widgets';

const Widgets = { };

// base and plug widgets
Widgets.widgets = widgets;

// store
Widgets.store = {
  createStore,
  mapStates
};

// custom plug install
Widgets.use = widgets.use.bind(widgets);

export default Widgets;
