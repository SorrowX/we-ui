import ElForm from 'element-ui/packages/form';
import ElFormItem from 'element-ui/packages/form-item';
import ElRow from 'element-ui/packages/row';
import ElCol from 'element-ui/packages/col';
import ElButton from 'element-ui/packages/button';
import Widgets from 'element-ui/packages/widgets';
import * as config from 'element-ui/packages/widgets/src/config';
import * as utils from 'element-ui/packages/widgets/src/utils';
import { isVNode } from 'element-ui/src/utils/vdom';
import { isObject } from 'element-ui/src/utils/types';

const { store } = Widgets;

const {
  createStore,
  mapStates
} = store;

const {
  widgetBaseProps,
  CHANGE_EVENT_NAME
} = config;

const {
  getPropByType,
  deepCopy,
  merge
} = utils;

const DEFAULT_LABELWIDTH = '125px';

const DEFAULT_LAYOUT = 'grid';

export default {
  name: 'ElFormWidgets',

  componentName: 'ElFormWidgets',

  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: {
      type: String,
      default: DEFAULT_LABELWIDTH
    },
    inline: Boolean,
    inlineMessage: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small', 'mini'].indexOf(value) !== -1;
      }
    },
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },

    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    layout: {
      type: String,
      default: DEFAULT_LAYOUT // grid|classic
    },
    props: {
      type: Object,
      default: () => {
        return widgetBaseProps;
      }
    },
    labelBackgroundColor: {
      type: String,
      default: '#fdfdfd'
    },
    showLabelTitle: {
      type: Boolean,
      default: false
    },
    showActionButtons: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    submitText: {
      type: String,
      default: 'submit'
    },
    customClass: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    this.store = createStore(this, {});

    return {

    };
  },

  methods: {
    getValue() {
      return this.model;
    },

    setValue(value) {
      const { model, $set } = this;
      if (!isObject(value)) {
        console.error('[Element Error][FormWidgets] value type need object.');
        return;
      }
      Object.keys(value).forEach(key => {
        $set(model, key, value[key]);
      });
    },

    emitEvent(...args) {
      this.$emit.apply(this, args);
    },

    validate(callback) {
      if (typeof callback !== 'function' && window.Promise) {
        return new window.Promise((resolve, reject) => {
          callback = (valid, invalidFields) => {
            return valid ? resolve(true) : reject(invalidFields);
          };
          this.formInstance.validate((valid, invalidFields) => {
            callback(valid, invalidFields);
          });
        });
      } else {
        this.formInstance.validate((valid, invalidFields) => {
          callback && callback(valid, invalidFields);
        });
      }
    },

    resetFields() {
      return this.formInstance.resetFields();
    },

    validateField(props, cb) {
      this.formInstance.validateField(props, cb);
    },

    clearValidate(props = []) {
      this.formInstance.clearValidate(props);
    },

    _setLabelBackgroundColor(backgroundColor) {
      this.$nextTick(() => {
        const { layout } = this;
        if (layout === 'grid') {
          const parent = this.formInstance.$el;
          const labels = parent.querySelectorAll('label[class*="el-form-item__label"]');
          labels.forEach(dom => {
            dom.style.background = backgroundColor || this.labelBackgroundColor;
          });
        }
      });
    },

    _getElFormData(width) {
      return {
        props: {
          model: this.model,
          rules: this.rules,
          labelPosition: this.labelPosition,
          labelWidth: width || this.labelWidth,
          showMessage: this.showMessage,
          size: this.size,
          disabled: this.disabled,
          validateOnRuleChange: this.validateOnRuleChange,
          hideRequiredAsterisk: this.hideRequiredAsterisk
        },
        ref: 'formInstance'
      };
    },

    _getElFormItemData(widget, key) {
      const data = merge(
        {},
        widget['formItemData'],
        {
          props: {
            label: widget.label,
            prop: widget.prop,
            required: widget.required
          },
          attrs: {
            prop: widget.prop
          },
          ref: 'form-item-' + widget['prop']
        }
      );
      if (typeof key !== 'undefined') {
        data.key = key;
      }
      return data;
    },

    _getWidgetVNode(h, widget) {
      const typeData = getPropByType(widget['type']);
      const { model, showLabelTitle, readonly } = this;

      const labelVNode = h('span', {
        slot: 'label',
        attrs: {
          title: widget.label
        }
      }, widget.label);

      const labelSoltFn = ((widget.formItemData || {}).slots || {}).label;
      const defaultlSoltFn = ((widget.formItemData || {}).slots || {}).default;
      const userLabelVNode = labelSoltFn && labelSoltFn.call(this, h, widget);
      const defaultVNode = defaultlSoltFn && defaultlSoltFn.call(this, h, widget);

      return [ // 根据type自动生成控件
        h(widget.widgetComponent, {
          props: {
            type: widget.type,
            readonly: (typeof widget.readonly !== 'undefined') ? widget.readonly : readonly,
            renderReadonly: widget.renderReadonly,
            renderWidget: widget.renderWidget,
            placeholder: widget.placeholder,
            disabled: widget.disabled,
            [typeData]: widget[typeData],
            ajaxOptions: widget.ajaxOptions
          },
          attrs: {
            prop: widget.prop
          },
          model: { // v-mode="form[widget['prop']]"
            expression: "form[widget['prop']]",
            value: model[widget['prop']],
            callback: function($$v) {
              model[widget['prop']] = $$v;
            }
          },
          ref: 'widget-' + widget['prop']
        }),
        [
          isVNode(userLabelVNode)
            ? userLabelVNode
            : showLabelTitle
              ? labelVNode
              : '',
          defaultVNode
        ]

      ];
    },

    _renderActionBtn(h, tag, data) {
      const { size, cancelText, submitText, customClass, emitEvent } = this;

      const getButtonVNode = (props, text) => {
        return h(ElButton, props, text);
      };

      return h(tag, data, [
        h('div', {
          class: customClass
        }, [
          getButtonVNode({
            props: {
              size,
              type: 'primary'
            },
            on: {
              click: () => emitEvent('on-submit')
            }
          }, submitText),
          getButtonVNode({
            props: {
              size
            },
            on: {
              click: () => emitEvent('on-cancel')
            }
          }, cancelText)
        ])
      ]);

    },

    renderActionBtnForTypicalForm(h) {
      const { size } = this;
      return this._renderActionBtn(h, ElFormItem, {
        props: { size }
      });
    },

    renderActionBtnForGridForm(h) {
      return this._renderActionBtn(h, 'div', {
        class: [
          'el-form-widgets__actions'
        ]
      });
    },

    renderTypicalForm(h) { // 渲染典型表单
      const { widgets, showActionButtons } = this;

      const formItemVNodes = this._l(widgets, (widget, index) => {
        return h(
          ElFormItem,
          this._getElFormItemData(widget, index),
          this._getWidgetVNode(h, widget)
        );
      });
      if (showActionButtons) {
        formItemVNodes.push(this.renderActionBtnForTypicalForm(h));
      }

      return h('div', {
        class: 'el-form-widgets__classic'
      }, [
        h(
          ElForm,
          this._getElFormData(),
          formItemVNodes
        )
      ]);
    },

    renderGridForm(h) { // 渲染网格表单
      const { labelWidth, widgetsGroup } = this;

      let width = labelWidth;
      if (labelWidth === 'auto') {
        console.error('[Element Error][FormWidgets]layout is grid, FormWidgets labelWidth prop can\'t be auto.');
        width = DEFAULT_LABELWIDTH;
      }

      const createWidget = (widget) => {
        return h('div', {
          class: 'el-form-widgets__form-item-wrap'
        }, [
          h(ElFormItem, this._getElFormItemData(widget),
            this._getWidgetVNode(h, widget)
          )
        ]);
      };

      return h('div', {
        class: 'el-form-widgets__grid'
      }, [
        h(
          ElForm,
          this._getElFormData(width),
          this._l(widgetsGroup, (widgets, index) => {
            return h(
              ElRow,
              {
                class: {
                  'el-form-widgets__row-wrap': true
                },
                key: index,
                props: {
                  type: 'flex'
                }
              },
              this._l(widgets, widget => {
                return h(
                  ElCol,
                  {
                    class: {
                      'is-not-fully-covered': widget['is-not-fully-covered']
                    },
                    key: widget.prop,
                    props: {
                      span: widget.span,
                      xs: 24
                    }
                  },
                  [ createWidget(widget) ]
                );
              })
            );
          })
        )
      ]);
    }
  },

  computed: {
    formInstance() {
      return this.$refs.formInstance;
    },

    ...mapStates({
      widgetsGroup: 'widgetsGroup',
      widgets: 'widgets'
    })
  },

  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
      }
    },

    labelBackgroundColor: {
      handler(backgroundColor) {
        this._setLabelBackgroundColor(backgroundColor);
      }
    }
  },

  created() {
    this.$on(CHANGE_EVENT_NAME, (...args) => {
      const arg0 = args[0];
      const widgetInstance = arg0['widgetInstance'];
      const prop = widgetInstance.$attrs.prop;
      arg0['formInstance'] = this;
      arg0['formItemInstance'] = this.$refs['form-item-' + prop];
      arg0['prop'] = prop;
      arg0['model'] = deepCopy(this.model);
      this.$emit.apply(this, ['change'].concat(args));
    });
  },

  mounted() {
    this.store.commit('setVmInstance', this.$refs);
    this._setLabelBackgroundColor();
  },

  updated() {
    this._setLabelBackgroundColor();
  },

  render(h) {
    const {
      layout,
      renderGridForm,
      renderTypicalForm,
      renderActionBtnForGridForm,
      showActionButtons,
      data
    } = this;

    if (!data.length) {
      process.env.NODE_ENV !== 'production' &&
        console.warn('[Element Warn][FormWidgets] prop data length is 0.');
      return;
    }

    const gridFormVNode = [
      renderGridForm(h),
      showActionButtons ? renderActionBtnForGridForm(h) : ''
    ];

    const typicalFormVNode = [ renderTypicalForm(h) ];

    const layoutVNode = layout === DEFAULT_LAYOUT
      ? gridFormVNode
      : typicalFormVNode;

    return h('div', {
      class: 'el-form-widgets'
    }, layoutVNode);
  }
};
