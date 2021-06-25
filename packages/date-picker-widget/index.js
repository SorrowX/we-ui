import widgets from 'element-ui/packages/widgets/src/widgets';

const DatePickerWidget = widgets['date-picker'];

/* istanbul ignore next */
DatePickerWidget.install = function(Vue) {
  Vue.component(DatePickerWidget.name, DatePickerWidget);
};

export default DatePickerWidget;
