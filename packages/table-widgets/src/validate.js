import AsyncValidator from 'async-validator';
import objectAssign from 'element-ui/src/utils/merge';
import { noop } from 'element-ui/src/utils/util';

export const getRules = (rules, required) => {
  const selfRules = rules;
  const requiredRule = required !== undefined ? { required: !!required } : [];
  return [].concat(selfRules || []).concat(requiredRule);
};

export const getFilteredRule = (rules, required, trigger) => {
  return getRules(rules, required).filter(rule => {
    if (!rule.trigger || trigger === '') return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.indexOf(trigger) > -1;
    } else {
      return rule.trigger === trigger;
    }
  }).map(rule => objectAssign({}, rule));
};

export const validate = (
  rawRules,
  required,
  trigger,
  prop,
  fieldValue,
  callback = noop
) => {
  const rules = getFilteredRule(rawRules, required, trigger);
  if ((!rules || rules.length === 0) && this.required === undefined) {
    callback();
    return true;
  }

  const descriptor = {};
  if (rules && rules.length > 0) {
    rules.forEach(rule => {
      delete rule.trigger;
    });
  }
  descriptor[prop] = rules;

  const validator = new AsyncValidator(descriptor);
  const model = {};

  model[prop] = fieldValue;

  validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
    const validateMessage = errors ? errors[0].message : '';
    callback(validateMessage, invalidFields);
  });
};
