const CreditCardVerificationValueTooltip = () => {
  return (
    <div id="credit_card_verification_value_tooltip" role="tooltip" className="field__icon has-tooltip">
      <span id="tooltip-for-verification_value" className="tooltip">
        <span data-cvv-tooltip="unknown">
          3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.
        </span>
        <span data-cvv-tooltip="amex" className="hidden">
          4-digit security code on the front of your card
        </span>
        <span data-cvv-tooltip="other" className="hidden">
          3-digit security code on the back of your card
        </span>
      </span>
      <div className="field__icon-svg">
        <svg className="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-16 icon-svg--block" role="presentation" aria-hidden="true" focusable="false">
          <svg id="question" width="100%" height="100%">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm.7 13H6.8v-2h1.9v2zm2.6-7.1c0 1.8-1.3 2.6-2.8 2.8l-.1 1.1H7.3L7 7.5l.1-.1c1.8-.1 2.6-.6 2.6-1.6 0-.8-.6-1.3-1.6-1.3-.9 0-1.6.4-2.3 1.1L4.7 4.5c.8-.9 1.9-1.6 3.4-1.6 1.9.1 3.2 1.2 3.2 3z"></path>
            </svg>
          </svg>
        </svg>
      </div>
    </div>
  );
}

export default CreditCardVerificationValueTooltip;
