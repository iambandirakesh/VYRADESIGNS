import React from "react";
import "./Loading.css";
function Loading({ data }) {
  return (
    <div>
      <div
        class={`${
          data === "products"
            ? "loader-container-product"
            : "loader-container-main"
        }`}
      >
        <div class="bouncing-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Loading;
