export const HORIZONTAL = 'horizontal';
export const VERTICAL = 'vertical';

export const LTR = 'ltr';
export const RTL = 'rtl';

export const ITEM_RENDER_EVT = 'item-rendered';
export const SCROLL_EVT = 'scroll';

export const FORWARD = 'forward';
export const BACKWARD = 'backward';

export const AUTO_ALIGNMENT = 'auto';
export const SMART_ALIGNMENT = 'smart';
export const START_ALIGNMENT = 'start';
export const CENTERED_ALIGNMENT = 'center';
export const END_ALIGNMENT = 'end';

export const RTL_OFFSET_NAG = 'negative';
export const RTL_OFFSET_POS_ASC = 'positive-ascending';
export const RTL_OFFSET_POS_DESC = 'positive-descending';

export const DefaultListProps = {
  cache: {
    type: Number,
    default: 2
  },
  className: {
    type: String,
    default: ''
  },
  containerElement: {
    type: [String, Object],
    default: 'div'
  },
  data: {
    type: [Array],
    default: () => []
  },
  direction: {
    type: String,
    default: 'ltr',
    validator: (val) => {
      return val === LTR || val === RTL;
    }
  },
  estimatedItemSize: {
    type: [Number]
  },
  height: {
    type: [String, Number],
    required: true
  },
  layout: {
    type: String,
    default: VERTICAL
  },
  initScrollOffset: {
    type: Number,
    default: 0
  },
  innerElement: {
    type: [String, Object],
    default: 'div'
  },
  total: {
    type: Number,
    required: true
  },
  itemSize: {
    type: [Number, Function],
    required: true
  },
  containerStyle: { // style[element-plus] -> containerStyle
    type: [Object, String, Array],
    default: () => ({})
  },
  useIsScrolling: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    required: true
  }
};

export const DefaultScrollBarProps = {
  layout: DefaultListProps.layout,
  total: Number,
  ratio: Number,
  clientSize: Number,
  scrollFrom: Number,
  visible: Boolean
};

export const PageKey = {
  [HORIZONTAL]: 'pageX',
  [VERTICAL]: 'pageY'
};

export const ScrollbarSizeKey = {
  [HORIZONTAL]: 'height',
  [VERTICAL]: 'width'
};

export const ScrollbarDirKey = {
  [HORIZONTAL]: 'left',
  [VERTICAL]: 'top'
};

export const SCROLLBAR_MIN_SIZE = 20;
