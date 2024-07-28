import React from "react";
import vi from "../assets/seco.gif";
const Loading = () => {
  return (
    <div className="mt-28 w-full h-full flex justify-center items-center">
      <img src={vi} width={70} height={50} />
    </div>
  );
};

export default Loading;
