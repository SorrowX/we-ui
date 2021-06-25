import widgets from 'element-ui/packages/widgets/src/widgets';

const TimePickerWidget = widgets['time-picker'];

/* istanbul ignore next */
TimePickerWidget.install = function(Vue) {
  Vue.component(TimePickerWidget.name, TimePickerWidget);
};

export default TimePickerWidget;
