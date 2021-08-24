export default function buildModifier(props, externalModifiers) {
  const {
    arrow,
    arrowOffset = 5,
    offset = 12,
    fallbackPlacements,
    gpuAcceleration
  } = props;

  const modifiers = [
    {
      name: 'offset', // 控制popper的左右和上下位置
      options: {
        offset: [0, offset]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements: fallbackPlacements || []
      }
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
        adaptive: gpuAcceleration
      }
    }
  ];

  if (arrow) {
    modifiers.push({
      name: 'arrow',
      options: {
        element: arrow,
        padding: arrowOffset
      }
    });
  }

  modifiers.push(...externalModifiers);

  return modifiers;
}
