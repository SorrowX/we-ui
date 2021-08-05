import TableWidgets from './src/index';

/* istanbul ignore next */
TableWidgets.install = function(Vue) {
  Vue.component(TableWidgets.name, TableWidgets);
};

export default TableWidgets;
