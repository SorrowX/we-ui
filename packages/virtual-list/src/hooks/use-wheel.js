import { HORIZONTAL, VERTICAL } from '../default';
import { rAF, cAF, isFF } from '../utils';

const LayoutKeys = {
  [HORIZONTAL]: 'deltaX',
  [VERTICAL]: 'deltaY'
};

const useWheel = (instance, onWheelDelta) => {
  let frameHandle = null;
  let offset = 0;

  const hasReachedEdge = (offset) => {
    const { atStartEdge, atEndEdge } = instance;
    return (offset < 0 && atStartEdge) || (offset > 0 && atEndEdge);
  };

  const onWheel = (e) => {
    cAF(frameHandle);

    const newOffset = e[LayoutKeys[instance.layout]];

    if (hasReachedEdge(offset) && hasReachedEdge(offset + newOffset)) return;

    offset += newOffset;

    if (!isFF) {
      e.preventDefault();
    }

    frameHandle = rAF(() => {
      onWheelDelta(offset);
      offset = 0;
    });
  };

  return {
    hasReachedEdge,
    onWheel
  };
};

export default useWheel;
