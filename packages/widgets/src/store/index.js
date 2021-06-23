import Watcher from './watcher';

Watcher.prototype.mutations = {
  setData(states, data) {
    const widgets = this.createWidgets(data);
    states.widgets = widgets;
    states.widgetsGroup = this.createWidgetGroup(widgets);
    states.form = this.createForm(widgets);
    // console.log('group: ', states.widgetsGroup);
  },

  setTableColumns(states, data) {
    const widgets = this.createWidgets(data);
    states.tableColumns = widgets;
  },

  setVmInstance(states, refs) {
    const { widgets } = states;
    widgets.forEach(widget => {
      const prop = widget['prop'];
      widget.widgetVm = refs['widget-' + prop] || null;
      widget.formItemVm = refs['form-item-' + prop] || null;
    });
  }
};

Watcher.prototype.commit = function(name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};

export default Watcher;
