import ElRadioWidget from './radio';
import ElCheckboxWidget from './checkbox';
import ElInputWidget from './input';
import ElInputNumberWidget from './input-number';
import ElSelectWidget from './select';
import ElCascaderWidget from './cascader';
import ElSwitchWidget from './switch';
import ElTimeSelectWidget from './time-select';
import ElTimePickerWidget from './time-picker';
import ElDatePickerWidget from './date-picker';
import ElUploadWidget from './upload';

const components = [
  ElRadioWidget,
  ElCheckboxWidget,
  ElInputWidget,
  ElInputNumberWidget,
  ElSelectWidget,
  ElCascaderWidget,
  ElSwitchWidget,
  ElTimeSelectWidget,
  ElTimePickerWidget,
  ElDatePickerWidget,
  ElUploadWidget
];

export default components.reduce((pre, comp) => {
  return {
    ...pre,
    ...{ [comp['type']]: comp }
  };
}, {});
