import { useCopy } from "@hooks/useCopy.ts";

interface CopyButtonProps {
  text: string;
  className?: string;
  children?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function CopyButton({
  text,
  className = "",
  children = "复制",
  variant = "default",
  size = "md",
}: CopyButtonProps) {
  const { copy, copied, error } = useCopy({
    timeout: 2000,
    onSuccess: () => {
      console.log("复制成功");
    },
    onError: (err) => {
      console.error("复制失败:", err);
    },
  });

  const handleCopy = () => {
    copy(text);
  };

  const variantClasses = {
    default: "bg-primary-500 hover:bg-primary-600 text-white",
    ghost:
      "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
    outline:
      "border border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className={`
          inline-flex items-center gap-2 rounded-lg font-medium
          transition-all duration-200 hover:scale-105
          magnetic-element cursor-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        title={copied ? "已复制!" : "点击复制"}
      >
        {copied
          ? (
            <>
              <svg
                className="w-4 h-4 text-success-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-success-500">已复制</span>
            </>
          )
          : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{children}</span>
            </>
          )}
      </button>

      {/* 复制成功提示 - 优化为横向展示 */}
      {copied && (
        <div className="
          fixed top-4 left-1/2 transform -translate-x-1/2
          flex items-center gap-2
          px-4 py-2 bg-success-500 text-white text-sm font-medium
          rounded-lg shadow-lg animate-fade-in
          pointer-events-none z-50
          whitespace-nowrap
        ">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>复制成功</span>
        </div>
      )}

      {/* 错误提示 - 也优化为横向展示 */}
      {error && (
        <div className="
          fixed top-4 left-1/2 transform -translate-x-1/2
          flex items-center gap-2
          px-4 py-2 bg-error-500 text-white text-sm font-medium
          rounded-lg shadow-lg animate-fade-in
          pointer-events-none z-50
          whitespace-nowrap
        ">
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
          <span>复制失败</span>
        </div>
      )}
    </div>
  );
}
