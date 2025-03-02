import * as React from "react";
import { cn } from "../../libs/utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="text-left text-14 text-brown">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-full border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brown",
            error ? "border-red-500 focus:ring-red-200" : "",
            isPassword ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-500" /> // Lucide EyeOff icon
            ) : (
              <Eye className="w-5 h-5 text-gray-500" /> // Lucide Eye icon
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-left text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export { Input };