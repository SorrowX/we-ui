import ElUpload from 'element-ui/packages/upload';
import { isEqual } from 'element-ui/src/utils/util';
import widgetProp from '../../mixin/widget-prop';
import widgetApi from '../../mixin/widget-api';
import widgetCommon from '../../mixin/widget-common';
import { bindContext } from '../../utils';

export default {
  name: 'ElUploadWidget',

  componentName: 'ElUploadWidget',

  type: 'upload',

  mixins: [ widgetProp, widgetApi, widgetCommon ],

  props: {
    type: {
      type: String,
      default: 'upload'
    },

    value: {
      type: [Array, String], // Array: fileList; String: 只读渲染时使用
      default: () => []
    },

    uploadData: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    fileList: {
      get() {
        return this.value;
      },
      set(list) {
        this.$emit('input', list);
      }
    },

    hasScopedSlots() {
      return Object.keys(this.$scopedSlots).length;
    }
  },

  methods: {
    _registerWatch() {
      const uploadVm = this.$refs.core;
      uploadVm.$watch('uploadFiles', {
        handler: (list) => {
          if (!isEqual(list, this.value)) {
            this.fileList = list;
          }
        },
        immediate: true
      });
    }
  },

  render(h) {
    const {
      fileList,
      renderReadonly,
      renderWidget,
      hasScopedSlots,
      $slots = {},
      uploadData = {}
    } = this;
    const data = this.mergeData('uploadData');

    // handle fileList
    delete data.model;
    data.props.fileList = (uploadData.props || {}).fileList || fileList || [];

    // handle props function bind this
    const { props } = data;
    Object.keys(props).forEach(key => {
      const f = props[key];
      if (typeof f === 'function') {
        props[key] = bindContext(f, this);
      }
    });

    // handle slots
    const slotsConfig = data['slots'] || {};
    const getSlots = (slots) => {
      return Object.keys(slots).map(slotName => {
        const f = slots[slotName];
        return f && f.call(this, h);
      });
    };
    const userTemplateSlots = Object.keys($slots).map(slotName => $slots[slotName]);

    // handle scopedSlots
    if (hasScopedSlots) {
      data.scopedSlots = this.$scopedSlots;
    }

    // render
    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElUpload, data, userTemplateSlots.length > 0 ? userTemplateSlots : getSlots(slotsConfig))
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  },

  mounted() {
    this._registerWatch();
  }
};
