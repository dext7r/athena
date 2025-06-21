import { useEffect, useState } from "preact/hooks";
import Button from "@components/ui/Button.tsx";

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
      <Button
        variant="ghost"
        size="sm"
        aria-label="切换主题"
      >
        <svg
          className="w-5 h-5"
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
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`切换到${isDark ? "亮色" : "暗色"}主题`}
    >
      {isDark
        ? (
          // 太阳图标 (暗色模式时显示)
          <svg
            className="w-5 h-5"
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
            className="w-5 h-5"
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
    </Button>
  );
};

export default ThemeToggle;
