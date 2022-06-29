// helper method to extract an integer amount value from a formatted amount string
export const parseFormattedAmount = (formattedAmount) => {
  return parseInt(formattedAmount.replace(/[^\d]/g, ''));
};

// helper method to format an integer amount value into a string
export const formatAmount = (amount) => {
  return `$${(amount / 100).toFixed(2)}`;
};
