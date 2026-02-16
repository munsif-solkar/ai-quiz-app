import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary"
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  const base = "px-4 py-2 rounded font-medium transition-colors"
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "text-black bg-white hover:bg-black hover:text-white border-2 border-black rounded-lg font-semibold transition py-2",
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...props}/>
}
