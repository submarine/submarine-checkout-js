const ErrorMessage = ({ errors }) => {
  if(errors.length === 0) {
    return null;
  }

  return (
    <div
      className="notice notice--error default-background card-input-error-notice"
      data-banner="true"
      role="alert"
      tabIndex="-1"
      aria-atomic="true"
      aria-live="polite"
    >
      <svg className="icon-svg icon-svg--size-24 notice__icon" aria-hidden="true" focusable="false">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11h1v7h-2v-5c-.552 0-1-.448-1-1s.448-1 1-1h1zm0 13C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10.5 7.5c0-.828.666-1.5 1.5-1.5.828 0 1.5.666 1.5 1.5 0 .828-.666 1.5-1.5 1.5-.828 0-1.5-.666-1.5-1.5z"/></svg>
      </svg>
      <div className="notice__content">
        {errors.map(error => {
          return <p className="notice__text">{error}</p>;
        })}
      </div>
    </div>
  );
}

export default ErrorMessage;
