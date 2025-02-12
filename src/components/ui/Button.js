import React from "react";

const Button = ({ children, onClick, className = "", ...props }) => {
  const baseStyles =
    "px-[24px] py-[12px] min-w-[200px] bg-aqua rounded-full font-light text-20 text-white";
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
