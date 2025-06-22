import { JSX } from "preact";
import { createPortal } from "preact/compat";
import { useEffect } from "preact/hooks";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: JSX.Element | JSX.Element[] | string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "glass" | "gradient" | "minimal";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  animate?: boolean;
  centered?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  variant = "default",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  animate = true,
  centered = true,
}: ModalProps) => {
  const sizeClasses = {
    xs: "max-w-sm",
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };

  const variantClasses = {
    default: `
      bg-white dark:bg-neutral-800
      border border-neutral-200 dark:border-neutral-700
      shadow-2xl shadow-neutral-900/25 dark:shadow-black/50
    `,
    glass: `
      glass backdrop-blur-2xl
      bg-white/90 dark:bg-neutral-900/90
      border border-white/20 dark:border-neutral-700/20
      shadow-glass
    `,
    gradient: `
      bg-gradient-to-br from-white via-primary-50/30 to-white
      dark:from-neutral-800 dark:via-primary-900/20 dark:to-neutral-800
      border border-primary-200/50 dark:border-primary-700/50
      shadow-colored shadow-primary-500/20
    `,
    minimal: `
      bg-white dark:bg-neutral-800
      shadow-xl shadow-neutral-900/10 dark:shadow-black/30
    `,
  };

  useEffect(() => {
    if (!isOpen) return;

    // 禁用背景滚动
    document.body.style.overflow = "hidden";

    // ESC键关闭
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    };

    if (closeOnEscape) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      if (closeOnEscape) {
        document.removeEventListener("keydown", handleEscape);
      }
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={`
        fixed inset-0 z-50 
        flex ${
        centered
          ? "items-center justify-center"
          : "items-start justify-center pt-16"
      }
        p-4 min-h-screen
        bg-black/60 backdrop-blur-sm
        ${animate ? "animate-fade-in" : ""}
        cursor-none
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          relative w-full ${sizeClasses[size]} mx-auto
          ${variantClasses[variant]}
          rounded-2xl p-6
          transform transition-all duration-500 ease-out
          ${animate ? "animate-zoom-in animate-delay-100" : ""}
          hover-lift magnetic-element
          max-h-[90vh] overflow-hidden flex flex-col
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 装饰性背景效果 */}
        {variant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 rounded-2xl pointer-events-none">
          </div>
        )}

        {/* 浮动装饰元素 */}
        {animate && (
          <>
            <div className="absolute top-4 right-16 w-2 h-2 bg-primary-400/30 rounded-full animate-float">
            </div>
            <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-secondary-400/40 rounded-full animate-float-delayed">
            </div>
          </>
        )}

        {/* 头部 */}
        {(title || showCloseButton) && (
          <div
            className={`
            flex items-center justify-between mb-6 
            ${animate ? "animate-slide-down" : ""}
            relative z-10
          `}
          >
            {title && (
              <h2 className="
                text-2xl font-display font-bold tracking-tight
                text-neutral-900 dark:text-white
                text-gradient-primary
              ">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="
                  p-3 rounded-2xl glass hover:glass-dark
                  hover:bg-error-50 dark:hover:bg-error-900/30
                  hover:text-error-600 dark:hover:text-error-400
                  text-neutral-500 dark:text-neutral-400
                  hover:shadow-colored hover:scale-110 active:scale-95
                  transition-all duration-300 ease-out
                  btn-animate ripple magnetic-element cursor-none
                  group
                "
                aria-label="关闭"
              >
                <svg
                  className="w-5 h-5 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                    className="group-hover:stroke-[2.5] transition-all duration-200"
                  />
                </svg>

                {/* 悬停装饰效果 */}
                <div className="absolute inset-0 bg-error-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                </div>
              </button>
            )}
          </div>
        )}

        {/* 内容区域 - 可滚动 */}
        <div
          className={`
          flex-1 overflow-y-auto scrollbar-hide
          text-neutral-600 dark:text-neutral-300 leading-relaxed
          ${animate ? "animate-fade-in animate-delay-200" : ""}
          relative z-10
        `}
        >
          {children}
        </div>

        {/* 底部发光效果 */}
        {animate && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent animate-gradient-flow">
          </div>
        )}
      </div>
    </div>
  );

  // 使用Portal渲染到body
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

// Modal子组件 - 增强版本
interface ModalHeaderProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  variant?: "default" | "gradient" | "bordered";
  animate?: boolean;
}

export const ModalHeader = ({
  children,
  className = "",
  variant = "default",
  animate = true,
}: ModalHeaderProps) => {
  const variantClasses = {
    default: "mb-6",
    gradient: `
      mb-6 pb-4 -mx-2 px-2 py-3 rounded-xl
      bg-gradient-to-r from-primary-50/50 via-transparent to-secondary-50/50
      dark:from-primary-900/20 dark:via-transparent dark:to-secondary-900/20
    `,
    bordered: `
      mb-6 pb-4 
      border-b border-neutral-200 dark:border-neutral-700
    `,
  };

  return (
    <div
      className={`
      ${variantClasses[variant]}
      ${animate ? "animate-slide-down animate-delay-100" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

interface ModalBodyProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  animate?: boolean;
}

export const ModalBody = ({
  children,
  className = "",
  animate = true,
}: ModalBodyProps) => (
  <div
    className={`
    mb-6 leading-relaxed
    ${animate ? "animate-fade-in animate-delay-200" : ""}
    ${className}
  `}
  >
    {children}
  </div>
);

interface ModalFooterProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  variant?: "default" | "gradient" | "actions";
  animate?: boolean;
}

export const ModalFooter = ({
  children,
  className = "",
  variant = "actions",
  animate = true,
}: ModalFooterProps) => {
  const variantClasses = {
    default: `
      pt-4 border-t border-neutral-200 dark:border-neutral-700
    `,
    gradient: `
      pt-4 -mx-2 px-2 py-3 rounded-xl
      bg-gradient-to-r from-primary-50/30 via-transparent to-secondary-50/30
      dark:from-primary-900/10 dark:via-transparent dark:to-secondary-900/10
    `,
    actions: `
      flex justify-end gap-3 pt-4 
      border-t border-neutral-200 dark:border-neutral-700
    `,
  };

  return (
    <div
      className={`
      ${variantClasses[variant]}
      ${animate ? "animate-slide-up animate-delay-300" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default Modal;
