import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import Header from "@components/layout/Header.tsx";
import Sidebar from "@components/layout/Sidebar.tsx";
import Footer from "@components/layout/Footer.tsx";

interface LayoutManagerProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
  showSidebar?: boolean;
}

const LayoutManager = (
  { children, title, showSidebar = true }: LayoutManagerProps,
) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(showSidebar);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // 初始化主题
  useEffect(() => {
    // 初始化主题逻辑
    const initTheme = () => {
      const savedTheme = localStorage.getItem("theme-storage");
      if (savedTheme) {
        try {
          const themeData = JSON.parse(savedTheme);
          const theme = themeData.state?.theme || "system";

          let isDark = false;
          if (theme === "system") {
            isDark =
              globalThis.window?.matchMedia("(prefers-color-scheme: dark)")
                .matches || false;
          } else {
            isDark = theme === "dark";
          }

          if (isDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (error) {
          console.warn("Failed to parse theme data:", error);
        }
      }
    };

    initTheme();
  }, []);

  // 检测屏幕尺寸和侧边栏状态
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = globalThis.innerWidth >= 1024; // lg断点
      setIsLargeScreen(isLarge);

      if (isLarge) {
        // 大屏幕下，侧边栏默认显示，但可以通过sidebarVisible控制
        setSidebarOpen(false); // 重置移动端状态
      } else {
        // 小屏幕下，侧边栏默认隐藏
        setSidebarVisible(true); // 小屏幕下总是显示切换按钮
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    globalThis.addEventListener("resize", checkScreenSize);
    return () => globalThis.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isLargeScreen) {
      // 大屏幕下切换侧边栏显示/隐藏
      setSidebarVisible(!sidebarVisible);
    } else {
      // 小屏幕下切换移动端侧边栏
      setSidebarOpen(!sidebarOpen);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* 固定头部 */}
      <Header
        title={title}
        showSidebarToggle
        onSidebarToggle={toggleSidebar}
        className="flex-shrink-0"
      />

      {/* 中间内容区域 - 可滚动 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        {sidebarVisible && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />
        )}

        {/* 主内容区域 - 可滚动 */}
        <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
          <div
            className={`
            py-6 px-4 md:px-6 min-h-full transition-all duration-300 ease-in-out
            ${sidebarVisible ? "lg:pl-6 lg:pr-6" : ""}
            max-w-none w-full
          `}
          >
            {children}
          </div>
        </main>
      </div>

      {/* 固定底部 */}
      <Footer className="flex-shrink-0" />
    </div>
  );
};

export default LayoutManager;
