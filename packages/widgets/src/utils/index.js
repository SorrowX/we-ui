import { isObject } from 'element-ui/src/utils/types';
import widgets from '../widgets';

const camelizeRE = /-(\w)/g;
export const camelize = (str = '') => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
};

export const getPropByType = type => {
  let prop = '';
  switch (type) {
    case 'text':
      prop = 'input';
      break;
    case 'textarea':
      prop = 'input';
      break;
    default:
      prop = type;
  }
  return `${camelize(prop)}Data`;
};

export const getComponentbyType = type => {
  return widgets[type]
    ? widgets[type]
    : {
      render(h) {
        return h('div', {
          style: {
            'font-size': '12px',
            color: 'red',
            'padding-left': '4px'
          }
        }, `没找到对应type为${type}的组件`);
      }
    };
};

export const getComponentNamebyType = type => {
  return widgets[type]
    ? widgets[type]
    : null;
};

export const clone = function(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    const res = {};
    for (const key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
};

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

function baseMerge(source, other) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other;
  }
  return Object.keys({ ...source, ...other }).reduce((ret, key) => {
    ret[key] = baseMerge(source[key], other[key]);
    return ret;
  }, Array.isArray(source) ? [] : {});
}

export const merge = (target, ...args) => {
  for (let i = 0, j = args.length; i < j; i++) {
    let source = deepCopy(args[i]) || {};
    target = baseMerge(target, source);
  }
  return target;
};

export const bindContext = (f, context) => {
  if (typeof f === 'function') {
    return f.bind(context);
  } else if (Array.isArray(f)) {
    return f.map(_ => {
      return _.bind(context);
    });
  }
  return f;
};

export const getRules = (rules = [], required, message) => {
  const requiredRule =
    required !== undefined
      ? { required: !!required, message }
      : [];
  return [].concat(rules).concat(requiredRule);
};

export const renderReadonly = (h, value, props) => {
  if (Array.isArray(value)) {
    value = value.join(',');
  }
  return h('div', merge({
    style: {
      color: '#606266',
      'padding-left': '5px'
    }
  }, props), value);
};

export const getParentElement = (elm, tagName) => {
  if (!elm) return null;
  let parent = elm.parentElement;
  while (
    parent.tagName !== tagName &&
    parent.tagName !== 'BODY'
  ) {
    parent = parent.parentElement;
  }
  return parent;
};
