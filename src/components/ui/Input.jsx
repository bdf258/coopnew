import React from "react";

const Input = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      ref={ref}
      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
));

export default Input;
