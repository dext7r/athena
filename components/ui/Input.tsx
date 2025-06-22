import { JSX } from "preact";
import { forwardRef } from "preact/compat";
import { useState } from "preact/hooks";

interface InputProps
  extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "size" | "icon"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?:
    | "default"
    | "floating"
    | "outlined"
    | "filled"
    | "glass"
    | "gradient";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  clearable?: boolean;
  animate?: boolean;
  magnetic?: boolean;
  value?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = "default",
  size = "md",
  type = "text",
  icon,
  iconPosition = "left",
  clearable = false,
  animate = true,
  magnetic = false,
  className = "",
  value,
  ...props
}, ref) => {
  const [hasValue, setHasValue] = useState(!!value);
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = `
    w-full transition-all duration-300 ease-out
    focus:outline-none disabled:cursor-not-allowed
    ${animate ? "input-animate" : ""}
    ${magnetic ? "magnetic-element" : ""}
    cursor-none
  `;

  const sizeClasses = {
    xs: "px-3 py-1 text-xs rounded-lg",
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-5 py-3 text-base rounded-2xl",
    xl: "px-6 py-4 text-lg rounded-2xl",
  };

  const iconSizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  const variantClasses = {
    default: `
      input bg-white dark:bg-neutral-800
      border border-neutral-300 dark:border-neutral-600
      hover:border-primary-400 dark:hover:border-primary-500
      focus:border-primary-500 dark:focus:border-primary-400
      focus:ring-2 focus:ring-primary-500/20
      shadow-sm hover:shadow-md focus:shadow-lg
      disabled:bg-neutral-100 dark:disabled:bg-neutral-700
      disabled:border-neutral-200 dark:disabled:border-neutral-600
      text-neutral-900 dark:text-neutral-100
      placeholder:text-neutral-500 dark:placeholder:text-neutral-400
    `,
    floating: `
      input bg-white dark:bg-neutral-800
      border border-neutral-300 dark:border-neutral-600
      hover:border-primary-400 dark:hover:border-primary-500
      focus:border-primary-500 dark:focus:border-primary-400
      focus:ring-2 focus:ring-primary-500/20
      shadow-sm hover:shadow-md focus:shadow-lg
      disabled:bg-neutral-100 dark:disabled:bg-neutral-700
      text-neutral-900 dark:text-neutral-100
    `,
    outlined: `
      bg-transparent border-2 border-neutral-300 dark:border-neutral-600
      hover:border-primary-400 dark:hover:border-primary-500
      focus:border-primary-500 dark:focus:border-primary-400
      focus:ring-2 focus:ring-primary-500/20
      shadow-sm hover:shadow-md focus:shadow-lg
      text-neutral-900 dark:text-neutral-100
      placeholder:text-neutral-500 dark:placeholder:text-neutral-400
    `,
    filled: `
      bg-neutral-100 dark:bg-neutral-700
      border border-transparent
      hover:bg-neutral-200 dark:hover:bg-neutral-600
      focus:bg-white dark:focus:bg-neutral-800
      focus:border-primary-500 dark:focus:border-primary-400
      focus:ring-2 focus:ring-primary-500/20
      shadow-sm hover:shadow-md focus:shadow-lg
      text-neutral-900 dark:text-neutral-100
      placeholder:text-neutral-500 dark:placeholder:text-neutral-400
    `,
    glass: `
      glass backdrop-blur-xl
      bg-white/20 dark:bg-neutral-900/20
      border border-white/30 dark:border-neutral-700/30
      hover:bg-white/30 dark:hover:bg-neutral-800/30
      focus:bg-white/40 dark:focus:bg-neutral-800/40
      focus:border-primary-400/50 dark:focus:border-primary-500/50
      focus:ring-2 focus:ring-primary-500/20
      shadow-glass hover:shadow-glow-lg
      text-neutral-900 dark:text-neutral-100
      placeholder:text-neutral-600 dark:placeholder:text-neutral-300
    `,
    gradient: `
      bg-gradient-to-r from-primary-50 via-white to-secondary-50
      dark:from-primary-900/20 dark:via-neutral-800 dark:to-secondary-900/20
      border border-primary-200 dark:border-primary-700
      hover:border-primary-400 dark:hover:border-primary-500
      focus:border-primary-500 dark:focus:border-primary-400
      focus:ring-2 focus:ring-primary-500/20
      shadow-colored hover:shadow-glow-lg
      text-neutral-900 dark:text-neutral-100
      placeholder:text-neutral-600 dark:placeholder:text-neutral-400
    `,
  };

  const errorClasses = error
    ? `border-error-500 focus:border-error-500 focus:ring-error-500/20 
       hover:border-error-600 shadow-error-500/10`
    : "";

  const classes = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${errorClasses}
    ${icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
    ${clearable && hasValue ? "pr-10" : ""}
    ${className}
  `;

  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setHasValue(!!target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleFocus = (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleClear = () => {
    setHasValue(false);
    if (props.onChange) {
      const event = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as unknown as JSX.TargetedEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };

  const renderIcon = (position: "left" | "right") => {
    if (!icon || iconPosition !== position) return null;

    return (
      <div
        className={`
        absolute ${
          position === "left" ? "left-3" : "right-3"
        } top-1/2 transform -translate-y-1/2
        ${iconSizeClasses[size]} text-neutral-500 dark:text-neutral-400
        ${isFocused ? "text-primary-500 dark:text-primary-400" : ""}
        ${animate ? "transition-colors duration-300" : ""}
        pointer-events-none
      `}
      >
        {icon}
      </div>
    );
  };

  const renderClearButton = () => {
    if (!clearable || !hasValue) return null;

    return (
      <button
        type="button"
        onClick={handleClear}
        className={`
          absolute right-3 top-1/2 transform -translate-y-1/2
          ${iconSizeClasses[size]} text-neutral-400 hover:text-neutral-600
          dark:text-neutral-500 dark:hover:text-neutral-300
          ${animate ? "hover:scale-110 transition-all duration-200" : ""}
          cursor-none magnetic-element
        `}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
  };

  if (variant === "floating") {
    return (
      <div
        className={`
        relative group
        ${animate ? "animate-fade-in" : ""}
      `}
      >
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={`${classes} peer`}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=" "
            {...props}
          />

          {/* 左侧图标 */}
          {renderIcon("left")}

          {/* 清除按钮 */}
          {renderClearButton()}

          {/* 右侧图标 */}
          {!clearable && renderIcon("right")}

          {/* 浮动标签 */}
          {label && (
            <label
              className={`
              absolute left-4 top-1/2 transform -translate-y-1/2
              text-neutral-500 dark:text-neutral-400
              transition-all duration-300 ease-out pointer-events-none
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
              peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500
              peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs 
              peer-focus:text-primary-500 dark:peer-focus:text-primary-400
              peer-focus:bg-white dark:peer-focus:bg-neutral-800 
              peer-focus:px-2 peer-focus:mx-2
              ${
                hasValue
                  ? "top-0 -translate-y-1/2 text-xs text-primary-500 dark:text-primary-400 bg-white dark:bg-neutral-800 px-2 mx-2"
                  : ""
              }
              ${icon && iconPosition === "left" ? "left-10" : ""}
            `}
            >
              {label}
            </label>
          )}

          {/* 底部装饰线 */}
          {animate && (
            <div
              className={`
              absolute bottom-0 left-0 h-0.5 bg-primary-500 dark:bg-primary-400
              transition-all duration-300 ease-out
              ${isFocused ? "w-full" : "w-0"}
            `}
            />
          )}
        </div>

        {/* 错误信息 */}
        {error && (
          <p
            className={`
            mt-2 text-sm text-error-600 dark:text-error-400 flex items-center gap-2
            ${animate ? "animate-slide-down" : ""}
          `}
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* 帮助文本 */}
        {helperText && !error && (
          <p
            className={`
            mt-2 text-sm text-neutral-500 dark:text-neutral-400
            ${animate ? "animate-fade-in animate-delay-100" : ""}
          `}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`
      space-y-2 group
      ${animate ? "animate-fade-in" : ""}
    `}
    >
      {/* 标签 */}
      {label && (
        <label
          className={`
          block text-sm font-medium tracking-wide
          text-neutral-700 dark:text-neutral-300
          group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400
          ${animate ? "transition-colors duration-300" : ""}
        `}
        >
          {label}
        </label>
      )}

      {/* 输入框容器 */}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={classes}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* 左侧图标 */}
        {renderIcon("left")}

        {/* 清除按钮 */}
        {renderClearButton()}

        {/* 右侧图标 */}
        {!clearable && renderIcon("right")}

        {/* 聚焦发光效果 */}
        {animate && (
          <div
            className={`
            absolute inset-0 rounded-inherit pointer-events-none
            transition-opacity duration-300
            ${isFocused ? "opacity-100" : "opacity-0"}
            bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10
            blur-sm
          `}
          />
        )}
      </div>

      {/* 错误信息 */}
      {error && (
        <p
          className={`
          text-sm text-error-600 dark:text-error-400 flex items-center gap-2
          ${animate ? "animate-slide-down" : ""}
        `}
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* 帮助文本 */}
      {helperText && !error && (
        <p
          className={`
          text-sm text-neutral-500 dark:text-neutral-400
          ${animate ? "animate-fade-in animate-delay-100" : ""}
        `}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
