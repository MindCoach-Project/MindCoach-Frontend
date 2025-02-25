import * as React from "react";
import { cn } from "../../libs/utils";

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-left text-14 text-brown">{label}</label>}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-full border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brown",
          error ? "border-red-500 focus:ring-red-200" : "",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-red-600 text-left text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export { Input };

