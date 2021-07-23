export const ajaxOptions = {
  url: '',
  data: '',
  type: 'get',
  async: true,
  before: () => {},
  success: () => {},
  error: () => {},

  props: {
    label: 'label',
    value: 'value',
    disabled: 'disabled',
    children: 'children', // for el-cascader
    leaf: 'leaf' // for el-cascader
  },
  localList: [], // 本地列表数据代替接口请求
  ajaxResult: null,
  path: '' // 该属性在接口成功后会根据path取正确的值 eg: let status = { code: 0, data: { data: { rows: [] } } }  如果path="data.data.rows",则结果就是 status.data.data.rows
};

export const widgetBaseProps = {
  type: 'type', // require
  label: 'label', // require
  prop: 'prop', // require
  span: 'span',
  value: 'value',
  required: 'required',
  disabled: 'disabled',
  placeholder: 'placeholder',
  readonly: 'readonly',
  rules: 'rules',
  ajaxOptions: 'ajaxOptions',
  renderWidget: 'renderWidget',
  renderReadonly: 'renderReadonly',
  formItemData: 'formItemData'
  // type + 'Data': { props: {}, on: {} }
};

export const CHANGE_EVENT_NAME = 'el.widget.change';

export const INPUT_EVENT_NAME = 'el.widget.input';
