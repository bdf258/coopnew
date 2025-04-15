import React from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-[#064c39] hover:bg-[#032b1a] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#064c39] disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
