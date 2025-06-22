import { useEffect, useState } from "preact/hooks";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载
    setMounted(true);

    // 检查当前主题状态
    const checkCurrentTheme = () => {
      if (typeof document !== "undefined") {
        const hasDarkClass = document.documentElement.classList.contains(
          "dark",
        );
        setIsDark(hasDarkClass);
        return hasDarkClass;
      }
      return false;
    };

    // 初始化主题
    const initTheme = () => {
      if (
        typeof document !== "undefined" && typeof localStorage !== "undefined"
      ) {
        try {
          const savedTheme = localStorage.getItem("theme");

          if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
          } else if (savedTheme === "light") {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
          } else {
            // 使用系统主题偏好
            const prefersDark = globalThis.window?.matchMedia &&
              globalThis.window.matchMedia("(prefers-color-scheme: dark)")
                .matches;
            if (prefersDark) {
              document.documentElement.classList.add("dark");
              setIsDark(true);
            } else {
              document.documentElement.classList.remove("dark");
              setIsDark(false);
            }
          }
        } catch (error) {
          console.warn("Theme initialization failed:", error);
          // 回退到检查当前状态
          checkCurrentTheme();
        }
      }
    };

    // 延迟初始化，确保DOM已准备好
    const timer = setTimeout(() => {
      initTheme();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      const willBeDark = !html.classList.contains("dark");

      if (willBeDark) {
        html.classList.add("dark");
        setIsDark(true);
      } else {
        html.classList.remove("dark");
        setIsDark(false);
      }

      // 保存主题偏好
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", willBeDark ? "dark" : "light");
        }
      } catch (error) {
        console.warn("Failed to save theme preference:", error);
      }
    }
  };

  // 服务端渲染时的占位符
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md hover:scale-105 transition-all duration-200 group"
        aria-label="切换主题"
      >
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md hover:scale-105 transition-all duration-300 group overflow-hidden"
      aria-label={`切换到${isDark ? "亮色" : "暗色"}主题`}
    >
      {/* 悬停时的动画背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 transform origin-center scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-xl opacity-50">
      </div>

      {/* 图标容器 */}
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
        {isDark
          ? (
            // 太阳图标 (暗色模式时显示)
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )
          : (
            // 月亮图标 (亮色模式时显示)
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
      </div>

      {/* 装饰性发光效果 */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-sm">
      </div>
    </button>
  );
};

export default ThemeToggle;
