import clsx from "clsx";

export const Button = ({ 
  children, 
  className, 
  variant = "primary",
  type = "button",
  ...props 
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center transition-colors",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "danger" && "btn-danger",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
