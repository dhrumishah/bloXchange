import React from "react";

const Product = (props) => {
  return (
    <div className="items-center mb-4">
      <div className="w-full mb-6 ">
        <div className="w-full h-full min-h-[250px]  min-w-[340px] flex items-center rounded-[20px] mb-6 justify-center bg-[#3C3F59] ">
          <img
            className="w-full object-cover object-center min-h-[250px] rounded-[20px] aspect-square h-full"
            src={props.image}
          ></img>
        </div>
      </div>
    </div>
  );
};
export default Product;
