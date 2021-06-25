import widgets from 'element-ui/packages/widgets/src/widgets';

const TimeSelectWidget = widgets['time-select'];

/* istanbul ignore next */
TimeSelectWidget.install = function(Vue) {
  Vue.component(TimeSelectWidget.name, TimeSelectWidget);
};

export default TimeSelectWidget;
