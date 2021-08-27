import { merge, bindContext, renderReadonly } from '../utils';
import ajax from '../utils/ajax';
import { ajaxOptions as defaultAjaxOptions } from '../config';
import { getValueByPath } from 'element-ui/src/utils/util';
import { isObject } from 'element-ui/src/utils/types';

export default {
  data() {
    return {
      dataList: [] // radio checkbox select 控件使用的列表数据(转换后的数据) [{ lable: '', value: '', disabled?: true}]
    };
  },

  computed: {
    rawDataList() {
      return this.ajaxOptions.localList || [];
    },
    mergedAjaxOptions() {
      return merge({}, defaultAjaxOptions, this.ajaxOptions);
    }
  },

  methods: {
    // 用户手动请求接口获取数据
    request(params, callback) {
      params = !isObject(params) ? {} : params;

      this.setDataList({
        force: true,
        callback,
        ajaxOptions: Object.keys(params).length > 0 ? params : this.mergedAjaxOptions
      });
    },
    getDataListFromApi(ajaxOptions, callback) {
      const before = ajaxOptions.before;
      const success = ajaxOptions.success;
      const error = ajaxOptions.error;

      const handleErrorCallback = (e, cb) => {
        this.ajaxOptions.ajaxResult = null;
        const list = error && error(e);
        if (Array.isArray(list) && list.every(item => isObject(item))) {
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
            const ajaxResult = this.ajaxOptions.ajaxResult = JSON.parse(data);

            let apiList = success && success(JSON.parse(data));
            let list = getValueByPath(ajaxResult, ajaxOptions.path);

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
      const { props } = this.mergedAjaxOptions;
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
          _.options = getList(_.options); // el-option-group
          return _;
        });
        return list;
      } else {
        return getList(list);
      }
    },

    setDataList(options = {}) {
      const {
        askNetwork = true,
        callback = () => {},
        convertData = this.getDataList,
        force = false,
        ajaxOptions = this.mergedAjaxOptions
      } = options;
      const { localList = [] } = ajaxOptions;
      if (this.dataList.length && !force) return;
      if (Array.isArray(localList) && localList.length > 0 && !force) {
        this.dataList = convertData(localList);
        callback && callback(null, this.dataList);
      } else if (askNetwork || force) {
        this.getDataListFromApi(ajaxOptions, (error, rawData) => {
          if (!error) {
            const serializeData = convertData(rawData);
            this.dataList = serializeData;
            this._setLocalList(rawData);
          } else {
            this.dataList = [];
            this._setLocalList([]);
          }
          callback && callback(error ? error : null, this.dataList);
        });
      }
    },

    _setLocalList(rawData) {
      this.$set(this.ajaxOptions, 'localList', rawData);
    },

    _renderReadonly() {
      const h = this.$createElement;
      return renderReadonly(h, this.value);
    },

    mergeData(dataKey, innerChange) {
      const vm = this;
      let data = this[dataKey] || {};
      const { type } = this;

      // v-model
      const model = {
        model: {
          expression: 'value',
          value: this.value,
          callback: function($$v) {
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
            ? [].concat(userChange, innerChange)
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
