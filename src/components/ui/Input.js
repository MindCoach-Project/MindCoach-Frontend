// src/components/ui/Input.js
import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  required = false,
  id,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-16 text-left font-medium text-brown mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-brown"
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
