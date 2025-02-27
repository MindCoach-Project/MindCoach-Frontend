import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ease-in-out  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#03C0B4] text-white hover:bg-[#02A89E] focus:ring-[#03C0B4] active:bg-[#028E89]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 active:bg-red-700",
        outline:
          "border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400 active:bg-gray-200 active:shadow-md",
        noborder: "border-transparent bg-transparent text-gray-800 hover:bg-gray-100",
        secondary:
          "bg-orange-500 text-white shadow-orange-500/40 border border-orange-500 hover:bg-orange-600 focus:ring-orange-500 active:bg-orange-700 active:shadow-md",
        ghost:
          "text-gray-700 hover:bg-gray-200 focus:ring-gray-300 active:bg-gray-300 active:shadow-md",
        link: "text-[#03C0B4] hover:underline focus:ring-[#03C0B4]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "w-1/4 px-3 py-2 text-base",
        lg: "h-10 w-1/2 px-8 text-lg",
        icon: "h-10 w-10 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

