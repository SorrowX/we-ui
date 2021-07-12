import ElUpload from 'element-ui/packages/upload';
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
    }
  },

  render(h) {
    const { renderReadonly, renderWidget, $slots = {} } = this;
    const data = this.mergeData('uploadData');

    // handle fileList
    delete data.model;
    data.props.fileList = this.fileList;

    // handle props function
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

    // render
    return !this.readonly
      ? renderWidget
        ? renderWidget.call(this, h)
        : h(ElUpload, data, userTemplateSlots.length > 0 ? userTemplateSlots : getSlots(slotsConfig))
      : renderReadonly
        ? renderReadonly.call(this, h)
        : this._renderReadonly();
  }
};
