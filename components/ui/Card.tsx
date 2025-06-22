import { JSX } from "preact";
import { forwardRef } from "preact/compat";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "hover"
    | "glass"
    | "gradient"
    | "outlined"
    | "elevated"
    | "interactive"
    | "glow";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  children: JSX.Element | JSX.Element[] | string;
  animate?: boolean;
  magnetic?: boolean;
  clickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = "default",
  padding = "md",
  children,
  animate = true,
  magnetic = false,
  clickable = false,
  className = "",
  ...props
}, ref) => {
  const baseClasses = `
    rounded-2xl transition-all duration-500 ease-out
    ${animate ? "hover:scale-[1.02] active:scale-[0.98]" : ""}
    ${magnetic ? "magnetic-element" : ""}
    ${clickable ? "cursor-none" : ""}
    relative overflow-hidden
  `;

  const variantClasses = {
    default: `
      card bg-white dark:bg-neutral-800 
      border border-neutral-200 dark:border-neutral-700
      shadow-md hover:shadow-lg
      ${animate ? "card-animate" : ""}
    `,
    hover: `
      card bg-white dark:bg-neutral-800
      border border-neutral-200 dark:border-neutral-700
      shadow-lg hover:shadow-2xl hover:shadow-primary-500/10
      hover:border-primary-300 dark:hover:border-primary-600
      ${animate ? "hover-lift card-animate" : ""}
      ${clickable ? "cursor-pointer" : ""}
    `,
    glass: `
      card-glass glass backdrop-blur-2xl
      bg-white/80 dark:bg-neutral-900/80
      border border-white/20 dark:border-neutral-700/20
      shadow-glass hover:shadow-glow-lg
      ${animate ? "hover-glow" : ""}
    `,
    gradient: `
      bg-gradient-to-br from-primary-50 via-white to-secondary-50
      dark:from-primary-900/20 dark:via-neutral-800 dark:to-secondary-900/20
      border border-gradient-to-br border-primary-200 dark:border-primary-700
      shadow-colored hover:shadow-glow-lg
      ${animate ? "card-animate hover-glow" : ""}
    `,
    outlined: `
      bg-transparent border-2 border-primary-200 dark:border-primary-700
      hover:bg-primary-50/50 dark:hover:bg-primary-900/20
      hover:border-primary-400 dark:hover:border-primary-500
      shadow-sm hover:shadow-lg hover:shadow-primary-500/10
      ${animate ? "hover-lift" : ""}
    `,
    elevated: `
      card bg-white dark:bg-neutral-800
      border border-neutral-200/50 dark:border-neutral-700/50
      shadow-2xl shadow-neutral-900/10 dark:shadow-black/20
      hover:shadow-3xl hover:shadow-primary-500/20
      ${animate ? "hover-lift card-animate" : ""}
    `,
    interactive: `
      card bg-gradient-to-br from-white via-primary-50/30 to-white
      dark:from-neutral-800 dark:via-primary-900/20 dark:to-neutral-800
      border border-primary-200/60 dark:border-primary-700/60
      shadow-lg hover:shadow-2xl hover:shadow-primary-500/20
      hover:border-primary-400 dark:hover:border-primary-500
      ${animate ? "hover-lift card-animate btn-animate" : ""}
      ${clickable ? "cursor-pointer ripple" : ""}
    `,
    glow: `
      card bg-white dark:bg-neutral-800
      border border-primary-300 dark:border-primary-600
      shadow-glow-lg shadow-primary-500/25
      hover:shadow-glow-xl hover:shadow-primary-500/40
      ${animate ? "glow-pulse hover-glow" : ""}
    `,
  };

  const paddingClasses = {
    none: "",
    xs: "p-3",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    paddingClasses[padding]
  } ${className}`;

  return (
    <div
      ref={ref}
      className={`${classes} group`}
      {...props}
    >
      {/* 装饰性背景效果 */}
      {animate && (variant === "interactive" || variant === "hover") && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/5 to-secondary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl">
        </div>
      )}

      {/* 边缘发光效果 */}
      {variant === "glow" && animate && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none">
        </div>
      )}

      {children}
    </div>
  );
});

Card.displayName = "Card";

// Card子组件 - 增强版本
interface CardHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string;
  variant?: "default" | "gradient" | "bordered";
  animate?: boolean;
}

export const CardHeader = ({
  children,
  variant = "default",
  animate = true,
  className = "",
  ...props
}: CardHeaderProps) => {
  const variantClasses = {
    default: "mb-6",
    gradient: `
      mb-6 pb-4 
      bg-gradient-to-r from-primary-50 via-transparent to-secondary-50
      dark:from-primary-900/20 dark:via-transparent dark:to-secondary-900/20
      rounded-xl -mx-2 px-2 py-3
    `,
    bordered: `
      mb-6 pb-4 
      border-b border-gradient-to-r border-primary-200 dark:border-primary-700
    `,
  };

  return (
    <div
      className={`
        ${variantClasses[variant]} 
        ${animate ? "animate-slide-down animate-delay-100" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  children: JSX.Element | string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  gradient?: boolean;
  animate?: boolean;
}

export const CardTitle = ({
  children,
  as: Component = "h3",
  gradient = false,
  animate = true,
  className = "",
  ...props
}: CardTitleProps) => (
  <Component
    className={`
      text-xl font-display font-bold tracking-tight
      ${
      gradient
        ? "text-gradient-primary animate-text-gradient"
        : "text-neutral-900 dark:text-white"
    }
      ${animate ? "hover:scale-105 transition-transform duration-300" : ""}
      ${className}
    `}
    {...props}
  >
    {children}
  </Component>
);

interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string;
  animate?: boolean;
}

export const CardContent = ({
  children,
  animate = true,
  className = "",
  ...props
}: CardContentProps) => (
  <div
    className={`
      text-neutral-600 dark:text-neutral-300 
      leading-relaxed
      ${animate ? "animate-fade-in animate-delay-200" : ""}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

interface CardFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string;
  variant?: "default" | "gradient" | "actions";
  animate?: boolean;
}

export const CardFooter = ({
  children,
  variant = "default",
  animate = true,
  className = "",
  ...props
}: CardFooterProps) => {
  const variantClasses = {
    default: `
      mt-6 pt-4 
      border-t border-neutral-200 dark:border-neutral-700
    `,
    gradient: `
      mt-6 pt-4 
      bg-gradient-to-r from-primary-50/50 via-transparent to-secondary-50/50
      dark:from-primary-900/10 dark:via-transparent dark:to-secondary-900/10
      rounded-xl -mx-2 px-2 py-3
    `,
    actions: `
      mt-6 pt-4
      border-t border-neutral-200 dark:border-neutral-700
      flex items-center justify-end gap-3
    `,
  };

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${animate ? "animate-slide-up animate-delay-300" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
