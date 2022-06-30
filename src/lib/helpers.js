import get from 'lodash.get';

// helper method to extract an integer amount value from a formatted amount string
export const parseFormattedAmount = (formattedAmount) => {
  return parseInt(formattedAmount.replace(/[^\d]/g, ''));
};

// helper method to format an integer amount value into a string
export const formatAmount = (amount) => {
  return `$${(amount / 100).toFixed(2)}`;
};

// helper method to format an integer amount value into a reduction string
export const formatReductionAmount = (amount) => {
  return `(-$${(amount / 100).toFixed(2)})`;
};

// parse a JSON configuration object from the DOM
export const parseJSONScript = (document, id) => {
  const script = document.getElementById(id);
  try {
    return JSON.parse(script.innerHTML);
  } catch { return null; }
};

// deep merge a simple options objects
export const mergeOptions = (defaults, options) => {
  const result = Object.assign({}, defaults);

  Object.keys(options).forEach(key => {
    if(options[key] instanceof Object) {
      result[key] = mergeOptions(defaults[key], options[key]);
    } else {
      result[key] = options[key];
    }
  });

  return result;
};

// return a translation
export const t = (key, translations) => {
  return get(translations, key, key);
};
