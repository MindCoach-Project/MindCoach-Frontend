// import * as React from "react";
// import { cn } from "../../libs/utils";

// const Input = React.forwardRef(
//   ({ className, type, label, id, ...props }, ref) => {
//     return (
//       <div className="flex flex-col space-y-1">
//         {label && (
//           <label htmlFor={id} className="text-left text-14 text-brown">
//             {label}
//           </label>
//         )}
//         <input
//           id={id}
//           type={type}
//           className={cn(
//             "flex h-10 w-full rounded-full border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brown",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";

// export { Input };

import * as React from "react";
import { cn } from "../../libs/utils";

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1">
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

