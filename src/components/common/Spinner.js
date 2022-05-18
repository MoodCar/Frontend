import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Spinner() {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <MoonLoader
          color="#1f1d1d"
          size={60}
        />
      </div>
    </div>
  );
}

export default Spinner;