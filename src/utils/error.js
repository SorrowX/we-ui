class ElementPlusError extends Error {
  constructor(m) {
    super(m);
    this.name = 'ElementPlusError';
  }
}

export default (scope, m) => {
  throw new ElementPlusError(`[${scope}] ${m}`);
};

export function warn(scope, m) {
  console.warn(new ElementPlusError(`[${scope}] ${m}`));
}
