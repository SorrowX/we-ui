export default function renderArrow(h, showArrow) {
  return showArrow
    ? h('div', {
      ref: 'arrowRef',
      class: 'el-popper-v2__arrow',
      attrs: {
        'data-popper-arrow': ''
      }
    })
    : '';
}
