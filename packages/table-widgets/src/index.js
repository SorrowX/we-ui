import ElTable from 'element-ui/packages/table';
import Widgets from 'element-ui/packages/widgets';
import table from './table';
import pagination from './pagination';
import * as config from 'element-ui/packages/widgets/src/config';
import * as utils from 'element-ui/packages/widgets/src/utils';
import { isObject } from 'element-ui/src/utils/types';
import { validate } from './validate';

const { store } = Widgets;
const { createStore } = store;
const { getParentElement, merge } = utils;
const {
  widgetBaseProps,
  CHANGE_EVENT_NAME
} = config;

export default {
  name: 'ElTableWidgets',

  componentName: 'ElTableWidgets',

  mixins: [ table, pagination ],

  props: {
    ...ElTable.props,

    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },

    props: {
      type: Object,
      default: () => {
        return widgetBaseProps;
      }
    },

    paginationData: {
      type: Object,
      default: () => {
        return {};
      }
    },

    paginationClass: {
      type: String
    },

    mode: {
      type: String // pagination: 开启tale分页; 默认: 全部展示
    },

    transition: {
      type: Boolean,
      default: false
    }
  },

  data() {
    this.store = createStore(this, {});
    return { };
  },

  methods: {
    validate(callback) {
      const { mode, _validateForPaginationMode, _validate } = this;
      return mode === 'pagination'
        ? _validateForPaginationMode(callback)
        : _validate(callback);
    },

    validateAll(callback) {
      const { tableColumns, data } = this;

      if (data.length === 0 && tableColumns.length && callback) {
        callback(true);
      }

      let valid = true;
      let invalidFields = {};

      data.forEach((dataItem, rowIndex) => {
        Object.keys(dataItem).forEach(prop => {
          const fieldValue = dataItem[prop];
          const column = tableColumns.find(_ => _.prop === prop);
          if (column) {
            validate(column.rules, column.required, '', prop, fieldValue, (message, field) => {
              if (message) {
                valid = false;
              }
              const newField = isObject(field) ? Object.keys(field).reduce((pre, key) => {
                return {
                  ...pre,
                  [`row_${rowIndex}_${key}`]: field[key]
                };
              }, {}) : {};
              invalidFields = merge({}, invalidFields, newField);
            });
          }
        });
      });

      callback(valid, invalidFields);
    },

    resetFields() {
      this.formInstance.resetFields();

      // update data value
      const { form, data, _updateDataValue } = this;
      Object.keys(form).forEach(key => {
        _updateDataValue(data, key, form[key]);
      });
    },

    _validateForPaginationMode(callback) {
      this.validateAll((valid, invalidFields) => {
        if (!valid) {
          const minRowIndex = Math.min.apply(null, Object.keys(invalidFields).map(key => Number(key.split('_')[1])));
          const currentPage = Math.ceil((minRowIndex + 1) / this.pageSize);
          this.setCurrentPage(currentPage);
        }
        this.$nextTick(() => {
          this._validate(callback);
        });
      });
    },

    _validate(callback) {
      if (typeof callback !== 'function' && window.Promise) {
        return new window.Promise((resolve, reject) => {
          callback = (valid, invalidFields) => {
            this._scrollIntoView(valid, invalidFields);
            return valid ? resolve(true) : reject(invalidFields);
          };
          this.formInstance.validate((valid, invalidFields) => {
            callback(valid, invalidFields);
          });
        });
      } else {
        this.formInstance.validate((valid, invalidFields) => {
          this._scrollIntoView(valid, invalidFields);
          callback && callback(valid, invalidFields);
        });
      }
    },

    _scrollIntoView(valid, invalidFields) {
      if (!valid) {
        const firstField = Object.keys(invalidFields)[0];
        const dom = this.tableBodyWrapper.querySelector(`[form-key=${firstField}]`);
        const parent = getParentElement(dom, 'TD');
        if (dom && parent) {
          parent.scrollIntoView && parent.scrollIntoView();
        }
      }
    }
  },

  created() {
    this.$on(CHANGE_EVENT_NAME, (...args) => {
      const arg0 = args[0];
      const widgetInstance = arg0['widgetInstance'];
      const prop = widgetInstance.$attrs.prop;
      const rowIndex = widgetInstance.$attrs.rowIndex;
      arg0['prop'] = prop;
      arg0['rowIndex'] = rowIndex;
      this.$emit.apply(this, ['change'].concat(args));
    });
  },

  render(h) {
    const {
      mode,
      renderTable,
      renderPagination
    } = this;

    const tableVNode = renderTable(h);
    const paginationVNode = mode === 'pagination' ? renderPagination(h) : '';

    return h('div',
      { class: 'el-table-widgets' },
      [
        tableVNode,
        paginationVNode
      ]);
  }
};
