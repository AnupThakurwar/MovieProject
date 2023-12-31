import React, { useState } from "react";
import "./SpinnerHoc.scss";

export const SpinnerHoc = (WrapperComponent) => {
  function HOC() {
    const [isLoading, setLoading] = useState(true);
    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };
    return (
      <>
        {isLoading && (
          <div className="spinner-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <WrapperComponent setIsLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
};
