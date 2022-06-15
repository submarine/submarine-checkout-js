const BraintreeCreditCardForm = () => {
  return (
    <div className="braintree-credit-card-wrapper">
      <div id="braintree-credit-card-mount" className="braintree-credit-card-mount" />
      <div id="braintree-credit-card-interstitial-loader" className="braintree-interstitial-upper-container">
        <div className="braintree-interstitial-loader__container">
          <div className="braintree-interstitial-loader__indicator">
            <svg width="14" height="16" className="braintree-interstitial-loader__lock">
              <svg id="iconLockLoader" viewBox="0 0 28 32">
                <title>Lock Loader</title>
                <path d="M6 10V8c0-4.422 3.582-8 8-8 4.41 0 8 3.582 8 8v2h-4V7.995C18 5.79 16.205 4 14 4c-2.21 0-4 1.792-4 3.995V10H6zM.997 14c-.55 0-.997.445-.997.993v16.014c0 .548.44.993.997.993h26.006c.55 0 .997-.445.997-.993V14.993c0-.548-.44-.993-.997-.993H.997z" />
              </svg>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BraintreeCreditCardForm;
