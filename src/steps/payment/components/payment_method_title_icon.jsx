export const PaymentMethodTitleIcon = ({ icon, label }) => {
  return (
    <span className={`payment-icon payment-icon--${icon}`} data-payment-icon={icon}>
      <span className="visually-hidden">
        {` ${label} `}
      </span>
    </span>
  );
};
