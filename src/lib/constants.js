export const ATTRIBUTE_PRESENTMENT_AMOUNT = '_presentment_amount';
export const ATTRIBUTE_PRESENTMENT_CURRENCY = '_presentment_currency';

export const DEFAULT_TRANSLATIONS = {
  "payment_methods": {
    "common": {
      "icons": {
        "american-express": "American Express",
        "master": "Mastercard",
        "paypal": "PayPal",
        "visa": "Visa"
      },
      "pay_with": "Pay with:"
    },
    "stripe": {
      "credit-card": {
        "title": "Credit Card"
      }
    },
    "braintree": {
      "credit-card": {
        "title": "Credit Card",
        "number": "Card number",
        "name": "Card number",
        "expiry": "Expiration date (MM \/ YY)",
        "cvv": "Security code",
        "errors": {
          "number": {
            "invalid": "The provided credit card number is invalid."
          },
          "expirationDate": {
            "invalid": "The provided expiration date is invalid."
          },
          "cvv": {
            "invalid": "The provided security code is invalid."
          }
        }
      },
      "paypal": {
        "title": "PayPal"
      }
    }
  }
};

export const ICON_AMEX = 'american-express';
export const ICON_MASTERCARD = 'master';
export const ICON_PAYPAL = 'paypal';
export const ICON_VISA = 'visa';
