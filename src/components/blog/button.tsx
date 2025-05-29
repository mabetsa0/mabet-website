import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/cn"

const buttonVariants = cva(
  " group relative   text-white focus:outline-none text-sm font-medium  disabled:pointer-events-none disabled:opacity-50 before:absolute before:inset-0 before:border before:group-active:translate-y-0 before:group-active:translate-x-0",
  {
    variants: {
      variant: {
        default: " before:border-primary  ",
        destructive: "before:border-red-500 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
const childVariants = cva(
  " block border  px-3 py-[12px] transition-transform active:!translate-y-0 active:!translate-x-0   group-hover:-translate-x-[4px] group-hover:-translate-y-[4px]",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary ",
        destructive: "border-red-500 bg-red-500 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isLoading, ...props }, ref) => {
    return (
      <button
        disabled={isLoading}
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            childVariants({ variant }),
            "inline-flex items-center justify-center"
          )}
        >
          {isLoading ? (
            <Loader2 className="mx-0.5 h-1 w-1 shrink-0 animate-spin" />
          ) : null}
          {props.children}
        </span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
