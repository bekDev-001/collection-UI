import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const laoadingState = useSelector((state: any) => state.loading.isLoading);

  return (
    <>
      {laoadingState && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default Loading;
