const DEFAULT_FALLBACK_PLACEMENTS = [];

export const DEFAULT_TRIGGER = 'hover';
export const UPDATE_VISIBLE_EVENT = 'update:visible';

export default {
  arrowOffset: {
    type: Number,
    default: 5
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0
  },
  boundariesPadding: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ''
  },
  triggerClass: {
    type: String,
    default: ''
  },
  triggerStyle: Object,
  hideAfter: {
    type: Number,
    default: 200
  },
  cutoff: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  effect: {
    type: String,
    default: 'dark' // dark|light
  },
  enterable: {
    type: Boolean,
    default: true
  },
  manualMode: {
    type: Boolean,
    default: false
  },
  showAfter: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    default: 'bottom'
  },
  popperClass: {
    type: String,
    default: ''
  },
  pure: {
    type: Boolean,
    default: false
  },
  popperOptions: {
    type: Object,
    default: () => {}
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  strategy: {
    type: String,
    default: 'fixed'
  },
  transition: {
    type: String,
    default: 'el-fade-in-linear'
  },
  trigger: {
    type: [String, Array],
    default: DEFAULT_TRIGGER
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  fallbackPlacements: {
    type: Array,
    default: () => DEFAULT_FALLBACK_PLACEMENTS
  }
};

