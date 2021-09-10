import {
  HORIZONTAL,
  LTR,
  RTL,
  FORWARD,
  BACKWARD,
  RTL_OFFSET_POS_DESC,
  RTL_OFFSET_NAG,
  RTL_OFFSET_POS_ASC
} from './default';
import { isObject } from 'element-ui/src/utils/types';

export const isHorizontal = (dir) => dir === LTR || dir === RTL || dir === HORIZONTAL;

export const rAF = window.requestAnimationFrame ? f => window.requestAnimationFrame(f) : f => setTimeout(f, 16);
export const cAF = window.cancelAnimationFrame ? handle => window.cancelAnimationFrame(handle) : handle => clearTimeout(handle);

export const isFF = typeof navigator !== 'undefined' && isObject(navigator) && /Firefox/i.test(navigator.userAgent);

export const getScrollDir = (prev, cur) => prev < cur ? FORWARD : BACKWARD;

let cachedRTLResult = null;
export function getRTLOffsetType(recalculate = false) {
  if (cachedRTLResult === null || recalculate) {
    const outerDiv = document.createElement('div');
    const outerStyle = outerDiv.style;
    outerStyle.width = '50px';
    outerStyle.height = '50px';
    outerStyle.overflow = 'scroll';
    outerStyle.direction = 'rtl';

    const innerDiv = document.createElement('div');
    const innerStyle = innerDiv.style;
    innerStyle.width = '100px';
    innerStyle.height = '100px';

    outerDiv.appendChild(innerDiv);

    document.body.appendChild(outerDiv);

    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = RTL_OFFSET_POS_DESC;
    } else {
      outerDiv.scrollLeft = 1;
      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = RTL_OFFSET_NAG;
      } else {
        cachedRTLResult = RTL_OFFSET_POS_ASC;
      }
    }

    document.body.removeChild(outerDiv);

    return cachedRTLResult;
  }

  return cachedRTLResult;
}

export function renderThumbStyle({ move, size, bar }, layout) {
  const style = {};
  const translate = `translate${bar.axis}(${move}px)`;

  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate
  // polyfill
  ;(style).webkitTransform = translate;

  if (layout === 'horizontal') {
    style.height = '100%';
  } else {
    style.width = '100%';
  }

  return style;
}
