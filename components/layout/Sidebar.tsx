import SidebarNavigationIsland from "@islands/SidebarNavigation.tsx";
import { JSX } from "preact";

interface SidebarProps {
  children?: JSX.Element | JSX.Element[];
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ children, isOpen = true, onClose }: SidebarProps) => {
  const handleOverlayClick = () => {
    onClose?.();
  };

  return (
    <>
      {/* 移动端遮罩 - 增强视觉效果 */}
      {isOpen && (
        <div
          className="
            fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden 
            transition-all duration-500 ease-out
            animate-fade-in cursor-none
          "
          onClick={handleOverlayClick}
        />
      )}

      {/* 侧边栏 - 现代化设计 */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-80 
          glass backdrop-blur-2xl
          bg-gradient-to-b from-white/95 via-neutral-50/80 to-white/95
          dark:from-neutral-900/95 dark:via-neutral-800/80 dark:to-neutral-900/95
          border-r border-neutral-200/60 dark:border-neutral-700/60
          shadow-glass hover:shadow-glow-lg
          transform transition-all duration-500 ease-out
          lg:relative lg:translate-x-0 lg:z-auto lg:h-full
          hover-lift particle-bg
          ${
          isOpen
            ? "translate-x-0 animate-slide-right"
            : "-translate-x-full animate-slide-left"
        } 
          lg:translate-x-0
        `}
      >
        {/* 动态背景装饰 */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary-500/50 to-transparent animate-gradient-flow">
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent animate-gradient-flow">
          </div>
        </div>

        {/* 浮动装饰元素 */}
        <div className="absolute top-10 right-6 w-2 h-2 bg-primary-400/30 rounded-full animate-float">
        </div>
        <div className="absolute top-32 left-6 w-1.5 h-1.5 bg-secondary-400/40 rounded-full animate-float-delayed">
        </div>
        <div className="absolute top-64 right-8 w-1 h-1 bg-accent-400/50 rounded-full animate-float-small">
        </div>

        <div className="relative flex flex-col h-full">
          {/* 侧边栏头部 - 美化设计 */}
          <div className="
            flex items-center justify-between p-6 
            border-b border-neutral-200/60 dark:border-neutral-700/60
            glass rounded-br-2xl
            bg-gradient-to-r from-primary-50/50 via-transparent to-secondary-50/50
            dark:from-primary-900/20 dark:via-transparent dark:to-secondary-900/20
            animate-slide-down animate-delay-100
          ">
            <div className="flex items-center gap-4">
              {/* 装饰性图标 */}
              <div className="
                w-10 h-10 
                bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 
                rounded-2xl flex items-center justify-center 
                shadow-colored hover:shadow-glow-lg
                hover:scale-110 hover:rotate-12 
                transition-all duration-500 ease-out
                btn-animate magnetic-element cursor-none
                group
              ">
                <svg
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    className="group-hover:stroke-3 transition-all duration-200"
                  />
                </svg>

                {/* 装饰性发光点 */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping">
                </div>
              </div>

              <h2 className="
                text-xl font-display font-bold tracking-tight
                text-gradient-primary animate-text-gradient
                hover:scale-105 transition-transform duration-300
                cursor-none
              ">
                导航菜单
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                p-3 rounded-2xl glass hover:glass-dark
                hover:bg-error-50 dark:hover:bg-error-900/30 
                hover:text-error-600 dark:hover:text-error-400 
                hover:shadow-colored hover:scale-110 active:scale-95
                transition-all duration-300 ease-out
                lg:hidden group btn-animate ripple magnetic-element cursor-none
              "
              aria-label="关闭侧边栏"
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
          </div>

          {/* 侧边栏内容 - 改进滚动和间距 */}
          <div className="
            flex-1 overflow-y-auto p-6 space-y-3
            scrollbar-hide scroll-animate
            animate-fade-in animate-delay-200
          ">
            {/* 装饰性分割线 */}
            <div className="
              h-px bg-gradient-to-r 
              from-transparent via-primary-300/50 to-transparent 
              dark:via-primary-600/50 
              mb-6 animate-gradient-shift
            ">
            </div>

            {children || <SidebarNavigationIsland />}

            {/* 底部装饰性分割线 */}
            <div className="
              mt-6 h-px bg-gradient-to-r 
              from-transparent via-primary-300/30 to-transparent 
              dark:via-primary-600/30 
              animate-gradient-shift
            ">
            </div>
          </div>

          {/* 侧边栏底部状态栏 */}
          <div className="
            p-6 border-t border-neutral-200/60 dark:border-neutral-700/60
            glass rounded-tr-2xl
            bg-gradient-to-r from-success-50/50 via-transparent to-accent-50/50
            dark:from-success-900/20 dark:via-transparent dark:to-accent-900/20
            animate-slide-up animate-delay-300
          ">
            <div className="flex items-center justify-center">
              <div className="
                text-sm text-neutral-600 dark:text-neutral-400 
                flex items-center gap-3
                hover:scale-105 transition-transform duration-300
                cursor-none
              ">
                {/* 状态指示器 */}
                <div className="relative">
                  <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse">
                  </div>
                  <div className="absolute inset-0 w-3 h-3 bg-success-400 rounded-full animate-ping opacity-75">
                  </div>
                </div>

                <span className="font-medium tracking-wide">
                  系统运行正常
                </span>

                {/* 装饰性图标 */}
                <svg
                  className="w-4 h-4 text-success-500 animate-spin-slow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* 底部装饰线 */}
            <div className="
              mt-4 h-px bg-gradient-to-r 
              from-transparent via-success-400/50 to-transparent
              animate-gradient-flow
            ">
            </div>
          </div>
        </div>

        {/* 侧边栏边缘发光效果 */}
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-primary-500/0 via-primary-500/30 to-primary-500/0 animate-gradient-flow">
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
