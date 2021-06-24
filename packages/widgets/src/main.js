import widgets from './widgets';
import { createStore, mapStates } from './store/help';

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
