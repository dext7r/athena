import Footer from "@components/layout/Footer.tsx";
import Header from "@components/layout/Header.tsx";
import Sidebar from "@components/layout/Sidebar.tsx";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import BackToTop from "./BackToTop.tsx";

interface LayoutManagerProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
  showSidebar?: boolean;
  /** 是否显示返回顶部按钮，默认 true */
  showBackToTop?: boolean;
  /** 返回顶部按钮样式变体 */
  backToTopVariant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** 返回顶部按钮显示阈值，默认 300px */
  backToTopThreshold?: number;
  /** 强制显示返回顶部按钮（用于调试），默认 false */
  backToTopForceVisible?: boolean;
}

const LayoutManager = ({
  children,
  title,
  showSidebar = true,
  showBackToTop = true,
  backToTopVariant = "primary",
  backToTopThreshold = 300,
  backToTopForceVisible = false,
}: LayoutManagerProps) => {
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
    <>
      <div className="
        h-screen max-h-screen flex flex-col
        bg-gradient-to-br from-neutral-50 via-white to-neutral-50
        dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900
        transition-all duration-500 ease-out
        overflow-hidden
      ">
        {/* 固定头部 */}
        <Header
          title={title}
          showSidebarToggle
          onSidebarToggle={toggleSidebar}
          className="flex-shrink-0 z-30"
        />

        {/* 中间内容区域 - 受限高度 */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* 侧边栏 */}
          {sidebarVisible && (
            <Sidebar
              isOpen={sidebarOpen}
              onClose={closeSidebar}
            />
          )}

          {/* 主内容区域 - 严格控制高度 */}
          <main className="
            flex-1 overflow-y-auto
            transition-all duration-300 ease-in-out
            h-full max-h-full
            scrollbar-hide scroll-animate
          ">
            <div
              className={`
                py-6 px-4 md:px-6
                h-full min-h-full
                transition-all duration-300 ease-in-out
                ${sidebarVisible ? "lg:pl-6 lg:pr-6" : ""}
                max-w-none w-full
                flex flex-col
              `}
            >
              <div className="flex-1 animate-fade-in animate-delay-100">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* 固定底部 */}
        <Footer className="flex-shrink-0 z-20" />
      </div>

      {/* 返回顶部按钮 - 放在外层避免被overflow-hidden影响 */}
      {showBackToTop && (
        <BackToTop
          variant={backToTopVariant}
          threshold={backToTopThreshold}
          size="md"
          position="bottom-right"
          forceVisible={backToTopForceVisible}
        />
      )}
    </>
  );
};

export default LayoutManager;
