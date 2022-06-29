import { Fragment } from "preact";

export const Attributes = ({ attributes }) => {
  return (
    <Fragment>
      {Object.entries(attributes).map(([key, value]) => {
        return <input type="hidden" name={`checkout[attributes][${key}]`} value={value} />
      })}
    </Fragment>
  );
};
