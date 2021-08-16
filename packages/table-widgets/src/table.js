import ElForm from 'element-ui/packages/form';
import ElFormItem from 'element-ui/packages/form-item';
import ElTable from 'element-ui/packages/table';
import ElTableColumn from 'element-ui/packages/table-column';
import Widgets from 'element-ui/packages/widgets';
import * as utils from 'element-ui/packages/widgets/src/utils';
import { isVNode } from 'element-ui/src/utils/vdom';
const {
  merge,
  bindContext,
  getPropByType,
  renderReadonly,
  getComponentbyType,
  getComponentNamebyType
} = utils;

const { store } = Widgets;
const { mapStates } = store;

const READONLY_VNODE_STYLE = {
  'padding-left': 0,
  'font-size': '14px',
  color: '#606266'
};

export default {
  data() {
    return {
      form: {},
      widgetItemsProps: {}
    };
  },
  computed: {
    formInstance() {
      return this.$refs.formInstance;
    },

    tableInstance() {
      return this.$refs.tableInstance;
    },

    sortable() {
      const tableInstance = this.tableInstance;
      return tableInstance ? tableInstance.columns.some(_ => _.sortable) : false;
    },

    tableBodyWrapper() {
      return this.tableInstance ? this.tableInstance.$refs.bodyWrapper : null;
    },

    tableDataStartIndex() {
      const { currentPage, pageSize } = this;
      return pageSize <= 1 ? 0 : (currentPage - 1) * pageSize;
    },

    tableDataEndIndex() {
      const { currentPage, pageSize, tableDataStartIndex } = this;
      return pageSize <= 1 ? tableDataStartIndex + 1 : currentPage * pageSize;
    },

    currentTableData() { // 用于渲染当前页table的数据
      const {
        data,
        tableDataStartIndex,
        tableDataEndIndex
      } = this;
      return data.slice(tableDataStartIndex, tableDataEndIndex) || [];
    },

    ...mapStates({
      tableColumns: 'tableColumns'
    })
  },

  watch: {
    columns: {
      immediate: true,
      handler(value) {
        this.store.commit('setTableColumns', value);
        this._updateColumns();
      }
    },

    currentTableData: {
      immediate: true,
      deep: true,
      handler(data) {
        const { tableDataStartIndex } = this;
        let form = data.reduce((pre, rowData, rowIndex) => {
          const rowObject = {};
          const $index = tableDataStartIndex + rowIndex;
          Object.keys(rowData).forEach(property => {
            const key = `row-${$index}-${property}`;
            const value = rowData[property];
            rowObject[key] = value;
          });
          return { ...pre, ...rowObject };
        }, {});
        this.form = form;
        this._setWidgetItemsProps(data);
      }
    }
  },

  methods: {
    _setWidgetItemsProps(data) {
      const tableColumns = this.tableColumns;
      this.widgetItemsProps = {};
      data.forEach((rowData, rowIndex) => {
        tableColumns.forEach(column => {
          const key = `row-${rowIndex}-${column.prop}`;
          this.$set(this.widgetItemsProps, key, {
            readonly: column.readonly,
            placeholder: column.placeholder,
            disabled: column.disabled
          });
        });
      });
    },

    _updateDataValue(tableData, formKey, value) {
      const formKeyArr = formKey.split('-').reverse();
      const [prop, rowIndex] = formKeyArr;
      tableData[rowIndex][prop] = value;
    },

    _updateColumns() {
      this.$nextTick(() => {
        this.tableInstance && this.tableInstance.store.updateColumns();
      });
    },

    _sort(array, ids) {
      const { rowKey, _preSortableIds, tableDataStartIndex } = this;
      if (_preSortableIds === ids.join()) return;
      this._preSortableIds = ids.join();
      const oldArray = array.map(_ => _);
      ids.forEach((id, i) => {
        const $index = tableDataStartIndex + i;
        const obj = oldArray.find(_ => _[rowKey] === id);

        if (obj) {
          array.splice($index, 1);
          array.splice($index, 0, obj);
        }
      });
    },

    _handleSort() {
      const tableData = this.tableInstance.tableData || [];
      const { rowKey, sortable } = this;
      if (!rowKey && sortable) {
        throw new Error('[Element Error][TableWidgets] component use sortable prop need to cooperate rowKey prop.');
      } else if (sortable) {
        const ids = tableData.map(_ => _[rowKey]);
        this._sort(this.data, ids);
      }
    },

    renderWidget(h, widget, props) {
      const vm = this;
      const { form } = this;
      const {
        type,
        readonly,
        renderWidget,
        renderReadonly: userRenderReadonly
      } = widget;

      const { $index: rowIndex, column } = props;
      const { property } = column;
      const key = `row-${rowIndex}-${property}`;

      const widgetComponent = getComponentbyType(type);
      const typeData = getPropByType(type);

      const widgetVnode = renderWidget && renderWidget.call(this, h, props, form, key);
      const readonlyVnode = userRenderReadonly && userRenderReadonly.call(this, h, props, form, key);

      return !readonly
        ? h(ElFormItem, {
          key,
          ref: `form-item-${key}`,
          class: 'el-table-widgets__form-item',
          props: {
            prop: key,
            required: widget.required,
            rules: widget.rules
          }
        }, [
          isVNode(widgetVnode)
            ? widgetVnode
            : h(widgetComponent, {
              ref: key,
              attrs: {
                'form-key': key,
                prop: property,
                rowIndex
              },
              props: merge({
                type: widget.type,
                readonly: widget.readonly,
                placeholder: widget.placeholder,
                disabled: widget.disabled,
                [typeData]: widget[typeData],
                ajaxOptions: widget.ajaxOptions,
                value: form[key]
              }, this.widgetItemsProps[key]),
              on: {
                input(val) {
                  // update user data value
                  vm.$set(form, key, val);
                  vm._updateDataValue(vm.data, key, val);
                }
              }
            })
        ])
        : isVNode(readonlyVnode)
          ? readonlyVnode
          : renderReadonly(h, form[key], {
            ref: key,
            style: READONLY_VNODE_STYLE
          });
    },

    renderCell(h, widget, props) {
      const { transition, renderWidget } = this;
      return transition
        ? h('transition', {
          attrs: {
            name: 'el-fade-in',
            mode: 'out-in'
          }
        }, [ renderWidget(widget, props) ])
        : this.renderWidget(h, widget, props);
    },

    renderColumn(h, widget) {
      const { tableDataStartIndex } = this;
      const { columnData = {}, prop, label, type } = widget;
      const componentName = getComponentNamebyType(type);

      const mergeColumnData = merge({}, columnData, {
        props: {
          prop: (columnData.props || {}).prop || prop,
          label: (columnData.props || {}).label || label
        }
      });
      const scopedSlots = mergeColumnData.scopedSlots || {};
      const isExecInnerRender = componentName && !scopedSlots.hasOwnProperty('default');

      mergeColumnData.scopedSlots = Object.keys(scopedSlots).reduce((acc, key) => {
        return {
          ...acc,
          ...{ [key]: bindContext(scopedSlots[key], this) }
        };
      }, {});

      if (isExecInnerRender) {
        mergeColumnData.scopedSlots.default = props => {
          const $index = tableDataStartIndex + props.$index;
          return this.renderCell(
            h,
            widget,
            Object.assign({}, props, { $index, $originalIndex: props.$index })
          );
        };
      } else {
        const originalFn = mergeColumnData.scopedSlots.default;
        if (originalFn) {
          mergeColumnData.scopedSlots.default = props => {
            const $index = tableDataStartIndex + props.$index;
            return originalFn && originalFn(Object.assign({}, props, { $index, $originalIndex: props.$index }));
          };
        }
      }

      return h(ElTableColumn, mergeColumnData);

    },

    renderTable(h) {
      const {
        _l,
        _handleSort,
        size,
        $props,
        $listeners,
        tableColumns,
        initPageSizeAndCurrentPage
      } = this;

      initPageSizeAndCurrentPage();

      const props = merge({}, $props, {
        data: this.currentTableData
      });

      const userSortChange = $listeners['sort-change'] || (() => {});
      const innerSortChange = _handleSort;
      const sortChange = [].concat(userSortChange, innerSortChange);
      const listeners = merge({}, $listeners, {
        'sort-change': sortChange
      });

      return h(ElForm, {
        ref: 'formInstance',
        props: { size, model: this.form }
      }, [
        h(ElTable, {
          props: props,
          on: listeners,
          ref: 'tableInstance'
        }, _l(tableColumns, (widget) => {
          return this.renderColumn(h, widget);
        }))
      ]);
    }
  },

  beforeCreate() {
    this._preSortableIds = '';
  }
};
