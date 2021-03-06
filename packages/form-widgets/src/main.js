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
    },
    customRender: {
      type: Function
    }
  },

  data() {
    this.store = createStore(this, {});

    return { };
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
          this.getFormInstance().validate((valid, invalidFields) => {
            callback(valid, invalidFields);
          });
        });
      } else {
        this.getFormInstance().validate((valid, invalidFields) => {
          callback && callback(valid, invalidFields);
        });
      }
    },

    resetFields() {
      return this.getFormInstance().resetFields();
    },

    validateField(props, cb) {
      this.getFormInstance().validateField(props, cb);
    },

    clearValidate(props = []) {
      this.getFormInstance().clearValidate(props);
    },

    _setLabelBackgroundColor(backgroundColor) {
      this.$nextTick(() => {
        const { layout } = this;
        const parent = this.getFormInstance().$el;
        if (layout === 'grid' && parent) {
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
      const props = {
        label: widget.label,
        prop: widget.prop
      };

      const parentRules = (this.rules || {})[widget.prop] || [];
      const selfRules = widget.rules || [];
      props.rules = [].concat(selfRules, parentRules);

      const data = merge(
        {},
        widget['formItemData'],
        {
          props,
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

      const prependSoltFn = ((widget.formItemData || {}).slots || {}).prepend;
      const labelSoltFn = ((widget.formItemData || {}).slots || {}).label;
      const appendSoltFn = ((widget.formItemData || {}).slots || {}).append;
      const prependVNode = prependSoltFn && prependSoltFn.call(this, h, widget);
      const userLabelVNode = labelSoltFn && labelSoltFn.call(this, h, widget);
      const appendVNode = appendSoltFn && appendSoltFn.call(this, h, widget);

      const props = {
        type: widget.type,
        readonly: (typeof widget.readonly !== 'undefined') ? widget.readonly : readonly,
        renderReadonly: widget.renderReadonly,
        renderWidget: widget.renderWidget,
        placeholder: widget.placeholder,
        disabled: widget.disabled,
        [typeData]: widget[typeData],
        ajaxOptions: widget.ajaxOptions
      };

      const bind = widget['v-bind']; // ????????????????????????props??????
      Object.keys(bind).forEach(key => {
        props[key] = bind[key];
      });
      props['form'] = this;

      const defaultVNode = h('div', {
        slot: 'default'
      }, [
        prependVNode,
        h(widget.widgetComponent, { // ??????type??????????????????
          props,
          attrs: {
            prop: widget.prop
          },
          model: { // v-mode="form[widget['prop']]"
            expression: 'form[widget[\'prop\']]',
            value: model[widget['prop']],
            callback: function($$v) {
              model[widget['prop']] = $$v;
            }
          },
          ref: 'widget-' + widget['prop'],
          key: 'widget-' + widget['prop']
        }),
        appendVNode
      ]);

      const innerLabelVNode = h('span', {
        slot: 'label',
        attrs: {
          title: widget.label
        }
      }, widget.label);

      const labelVNode = isVNode(userLabelVNode)
        ? userLabelVNode
        : showLabelTitle
          ? innerLabelVNode
          : '';

      return [
        defaultVNode,
        labelVNode
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

    renderTypicalForm(h) { // ??????????????????
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

    renderGridForm(h) { // ??????????????????
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
    },

    emitChangeEvent(...args) { // { value: '', widgetInstance: null }
      const arg0 = args[0];
      const widgetInstance = arg0['widgetInstance'];
      const prop = widgetInstance.$attrs.prop;
      arg0['formInstance'] = this.getFormInstance();
      arg0['formItemInstance'] = this.$refs['form-item-' + prop];
      arg0['prop'] = prop;
      arg0['model'] = deepCopy(this.model);
      this.$emit.apply(this, ['change'].concat(args));
    },

    getFormInstance() {
      return this.$refs.formInstance || {};
    }
  },

  computed: {
    ...mapStates({
      widgetsGroup: 'widgetsGroup',
      widgets: 'widgets'
    })
  },

  watch: {
    data: {
      immediate: true,
      deep: true,
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
    this.$on(CHANGE_EVENT_NAME, this.emitChangeEvent);
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
      data,
      layout,
      renderGridForm,
      renderTypicalForm,
      renderActionBtnForGridForm,
      showActionButtons,
      customRender
    } = this;

    if (customRender) {
      return customRender.call(this, h);
    }

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
