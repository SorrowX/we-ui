import buildList from '../builders/build-list';
import { isString } from 'element-ui/src/utils/types';
import {
  SMART_ALIGNMENT,
  AUTO_ALIGNMENT,
  CENTERED_ALIGNMENT,
  START_ALIGNMENT,
  END_ALIGNMENT
} from '../default';

const FixedSizeList = buildList({
  name: 'ElFixedSizeList',

  validateProps() {},

  initCache() {
    return void 0;
  },

  getEstimatedTotalSize({ total, itemSize }) {
    return total * itemSize;
  },

  getItemOffset({ itemSize }, index) {
    return index * itemSize;
  },

  getItemSize: ({ itemSize }) => itemSize,

  getStartIndexForOffset: ({ total, itemSize }, offset) => Math.max(0, Math.min(total - 1, Math.floor(offset / itemSize))),

  getStopIndexForStartIndex(
    { clientSize, total, itemSize },
    startIndex,
    scrollOffset
  ) {
    const offset = startIndex * itemSize;
    const numVisibleItems = Math.ceil((clientSize + scrollOffset - offset) / itemSize);
    return Math.max(
      0,
      Math.min(total - 1, startIndex + numVisibleItems - 1)
    );
  },

  getOffset(
    { itemSize, total, clientSize },
    index,
    alignment,
    scrollOffset
  ) {
    if (isString(clientSize) && process.env.NODE_ENV !== 'production') {
      throw new Error(`
        [ElVirtualList] You should set
          width/height
        to number when your layout is
          horizontal/vertical
      `);
    }
    const lastItemOffset = Math.max(
      0,
      total * itemSize - clientSize
    );

    const maxOffset = Math.min(
      lastItemOffset,
      index * itemSize
    );

    const minOffset = Math.max(
      0,
      (index + 1) * itemSize - clientSize
    );

    if (alignment === SMART_ALIGNMENT) {
      if (
        scrollOffset >= minOffset - clientSize &&
        scrollOffset <= maxOffset + clientSize
      ) {
        alignment = AUTO_ALIGNMENT;
      } else {
        alignment = CENTERED_ALIGNMENT;
      }
    }

    switch (alignment) {
      case START_ALIGNMENT: {
        return maxOffset;
      }
      case END_ALIGNMENT: {
        return minOffset;
      }
      case CENTERED_ALIGNMENT: {
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
        if (middleOffset < Math.ceil(clientSize / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastItemOffset + Math.floor(clientSize / 2)) {
          return lastItemOffset; // near the end
        } else {
          return middleOffset;
        }
      }
      case AUTO_ALIGNMENT:
      default: {
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
      }
    }
  }
});

export default FixedSizeList;
