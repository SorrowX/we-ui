import { merge, bindContext, renderReadonly } from '../utils';
import ajax from '../utils/ajax';
import { getValueByPath } from 'element-ui/src/utils/util';
import { isObject } from 'element-ui/src/utils/types';

export default {
  data() {
    return {
      modelValue: this.value,

      dataList: [] // radio checkbox select 控件使用的列表数据 [{ lable: '', value: '', disabled?: true}]
    };
  },

  watch: {
    value(newValue) {
      this.modelValue = newValue;
    }
  },

  computed: {
    rawDataList() {
      return this.ajaxOptions.localList || this.dataList;
    }
  },

  methods: {
    getDataListFromApi(callback) {
      const { ajaxOptions = ajaxOptions } = this;
      const before = ajaxOptions.before;
      const success = ajaxOptions.success;
      const error = ajaxOptions.error;

      const handleErrorCallback = (e, cb) => {
        ajaxOptions.ajaxResult = null;
        const list = error && error(e);
        if (Array.isArray(list) && list.every(item => isObject(item))) {
          ajaxOptions.localList = list;
          cb && cb(null, list);
        } else {
          cb && cb(e);
        }
      };

      ajax(merge(ajaxOptions, {
        before: () => {
          before && before();
        },
        success: (data) => {
          try {
            ajaxOptions.ajaxResult = JSON.parse(data);

            let apiList = success && success(JSON.parse(data));
            let list = getValueByPath(ajaxOptions.ajaxResult, ajaxOptions.path);

            let finalList;
            ;[list, apiList].some(_ => {
              if (
                Array.isArray(_) &&
              _.every(item => isObject(item))
              ) {
                finalList = _;
                return true;
              }
            });

            if (Array.isArray(finalList)) {
              ajaxOptions.localList = finalList;
              return callback && callback(null, finalList);
            } else {
              const tip = 'require return Array<object> in success callback or configure the path property in ajaxOptions';
              handleErrorCallback(tip, callback);
            }
          } catch (e) {
            handleErrorCallback(e, callback);
          }
        },
        error: status => {
          handleErrorCallback(status, callback);
        }
      }));
    },

    getDataList(list) {
      const { props } = this.ajaxOptions;
      const selectType = ((this.selectData || {}).props || {}).type;

      const getList = (listData = []) => {
        return listData.map(item => {
          return {
            value: item[props['value']],
            label: item[props['label']],
            disabled: item[props['disabled']]
          };
        });
      };

      if (selectType === 'group') {
        list.forEach(_ => {
          _.options = getList(_.options);
          return _;
        });
        return list;
      } else {
        return getList(list);
      }
    },

    setDataList() {
      const { ajaxOptions } = this;
      const { localList = [] } = ajaxOptions;
      if (this.dataList.length) return;
      if (Array.isArray(localList) && localList.length > 0) {
        this.dataList = this.getDataList(localList);
      } else {
        this.getDataListFromApi((error, list) => {
          if (!error) {
            this.dataList = this.getDataList(list);
          } else {
            this.dataList = [];
          }
        });
      }
    },

    _renderReadonly() {
      const h = this.$createElement;
      let value = this.value;
      return renderReadonly(h, value);
    },

    mergeData(dataKey, innerChange) {
      const vm = this;
      let data = this[dataKey];
      const { type } = this;

      // v-model
      const model = {
        model: {
          expression: 'modelValue',
          value: this.modelValue,
          callback: function($$v) {
            vm.modelValue = $$v;
            vm.$emit('input', $$v);
          }
        }
      };

      // change
      innerChange = innerChange || ((value) => {
        this.emitEvent({ value, widgetInstance: vm });
      });
      let userChange = (data.on || {})['change'];
      if (userChange) {
        userChange = bindContext(userChange, vm);
      }
      const mergeChange = {
        on: {
          change: typeof userChange === 'function' || Array.isArray(userChange)
            ? [innerChange].concat(userChange)
            : innerChange
        }
      };

      // on
      let userEvents = (data.on || {});
      const bindEvents = Object.keys(userEvents)
        .reduce((ret, eventName) => {
          return {
            ...ret,
            ...{
              [eventName]: bindContext(userEvents[eventName], vm)
            }
          };
        }, {});
      const on = {
        on: bindEvents
      };

      // style
      const style = {
        style: {
          width: (data.style || {})['width'] || '100%'
        }
      };

      // props
      const props = {
        props: {
          disabled: (data.props || {})['disabled'] || this.disabled
        }
      };
      if (type !== 'input') {
        props.props.placeholder = (data.props || {})['placeholder'] || this.placeholder;
      }

      // attrs
      const inputAttrs = {
        attrs: {
          placeholder: (data.attrs || {})['placeholder'] || this.placeholder
        }
      };

      data = merge(
        {},
        data,
        style,
        props,
        on,
        mergeChange,
        type === 'input' ? inputAttrs : {}
      );

      return {
        ...model,
        ...data,
        ref: 'core'
      };
    }
  }
};
