import emitter from 'element-ui/src/mixins/emitter';

import {
  CHANGE_EVENT_NAME,
  INPUT_EVENT_NAME
} from '../config';

export default {
  mixins: [emitter],

  methods: {
    emitEvent(...args) {
      this.emitChangeEvent.apply(this, args);
      this.emitInputEvent.apply(this, args);
    },

    emitChangeEvent(...args) {
      this.dispatch('ElFormWidgets', CHANGE_EVENT_NAME, args);
      this.dispatch('ElTableWidgets', CHANGE_EVENT_NAME, args);
    },

    emitInputEvent(...args) {
      this.dispatch('ElFormWidgets', INPUT_EVENT_NAME, args);
      this.dispatch('ElTableWidgets', INPUT_EVENT_NAME, args);
    },

    setValue(value) {
      this.modelValue = value;
    },

    getValue() {
      return this.modelValue;
    }

  }
};
