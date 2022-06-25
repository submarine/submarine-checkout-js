const CreditCardNumberTooltip = () => {
  return (
    <div id="credit_card_number_tooltip" className="field__icon">
      <div className="field__icon-svg">
        <svg className="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-16 icon-svg--block" role="img" aria-labelledby="lock-d8f666e1fea3212c47857504193d743d-title">
          <title id="lock-d8f666e1fea3212c47857504193d743d-title">All transactions are secure and encrypted.</title>
          <svg id="lock" width="100%" height="100%">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
              <path d="M12 6h-1V4c0-2.2-1.8-4-4-4S3 1.8 3 4v2H2c-.5 0-1 .5-1 1v6c0 .5.5 1 1 1h10c.5 0 1-.5 1-1V7c0-.5-.5-1-1-1zM5 4c0-1.1.9-2 2-2s2 .9 2 2v2H5V4z"></path>
            </svg>
          </svg>
        </svg>
      </div>
    </div>
  );
}

export default CreditCardNumberTooltip;
