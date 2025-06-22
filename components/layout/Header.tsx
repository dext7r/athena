import Button from "@components/ui/Button.tsx";
import AuthMenuIsland from "@islands/AuthMenu.tsx";
import HeaderNavigationIsland from "@islands/HeaderNavigation.tsx";
import ThemeToggleIsland from "@islands/ThemeToggle.tsx";
import { JSX } from "preact";

interface HeaderProps {
  title?: string;
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
  showThemeToggle?: boolean;
  showUserMenu?: boolean;
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const Header = ({
  title = "Athena",
  showSidebarToggle = true,
  onSidebarToggle,
  showThemeToggle = true,
  showUserMenu = true,
  className = "",
  children,
}: HeaderProps) => {
  return (
    <header
      className={`
        relative z-40
        glass backdrop-blur-xl
        bg-gradient-to-r from-white/90 via-blue-50/40 to-white/90 
        dark:from-neutral-900/90 dark:via-blue-900/30 dark:to-neutral-900/90
        border-b border-neutral-200/60 dark:border-neutral-700/60
        shadow-glass hover:shadow-glow-lg
        px-6 py-4 transition-all duration-500 ease-out
        hover-lift magnetic-element
        ${className}
      `}
    >
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 particle-bg opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent animate-gradient-flow">
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent animate-gradient-flow">
        </div>
      </div>

      {/* 浮动装饰元素 */}
      <div className="absolute top-2 left-1/4 w-2 h-2 bg-primary-400/20 rounded-full animate-float">
      </div>
      <div className="absolute top-6 right-1/3 w-1 h-1 bg-secondary-400/30 rounded-full animate-float-delayed">
      </div>

      <div className="relative flex items-center justify-between">
        {/* 左侧区域 */}
        <div className="flex items-center gap-6 animate-slide-right">
          {showSidebarToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              aria-label="切换侧边栏"
              className="
                p-3 rounded-2xl glass hover:glass-dark
                hover:bg-primary-50 dark:hover:bg-primary-900/30 
                hover:shadow-colored hover:scale-110 active:scale-95
                transition-all duration-300 ease-out
                btn-animate ripple magnetic-element
                group cursor-none
              "
            >
              <MenuIcon />
            </Button>
          )}

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="
                flex items-center gap-3 
                hover:scale-105 active:scale-95
                transition-all duration-500 ease-out
                magnetic-element cursor-none
                group
              "
            >
              <Logo />
              <h1 className="
                text-2xl font-display font-bold tracking-tight
                text-gradient-primary animate-text-gradient
                group-hover:scale-105 transition-transform duration-300
                hidden sm:block
              ">
                {title}
              </h1>
            </a>
          </div>
        </div>

        {/* 中间自定义内容 */}
        {children && (
          <div className="flex-1 flex justify-center animate-zoom-in animate-delay-200">
            <div className="glass rounded-2xl px-6 py-2 hover:shadow-glow transition-all duration-300">
              {children}
            </div>
          </div>
        )}

        {/* 右侧区域 */}
        <div className="flex items-center gap-4 animate-slide-left">
          {/* 导航链接 */}
          <div className="hidden lg:block">
            <HeaderNavigationIsland />
          </div>

          {/* 功能按钮区域 */}
          <div className="
            flex items-center gap-3 
            pl-4 border-l border-neutral-200/60 dark:border-neutral-700/60
            animate-fade-in animate-delay-300
          ">
            {/* 主题切换按钮 */}
            {showThemeToggle && (
              <div className="magnetic-element">
                <ThemeToggleIsland />
              </div>
            )}

            {/* 用户菜单 */}
            {showUserMenu && (
              <div className="magnetic-element">
                <AuthMenuIsland />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 响应式移动端导航 */}
      <div className="lg:hidden mt-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-700/60 animate-slide-up animate-delay-100">
        <HeaderNavigationIsland />
      </div>
    </header>
  );
};

// 增强的Logo组件
const Logo = () => (
  <div className="relative group magnetic-element">
    {/* 多层发光效果 */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-glow-pulse blur-sm">
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-700 rounded-2xl opacity-0 group-hover:opacity-50 transition-all duration-300 blur-lg">
    </div>

    {/* 主要logo容器 */}
    <div className="
      relative w-12 h-12 
      bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 
      rounded-2xl flex items-center justify-center 
      shadow-colored hover:shadow-glow-lg
      transform group-hover:scale-110 group-hover:rotate-6 
      transition-all duration-500 ease-out
      btn-animate cursor-none
    ">
      {/* 主字母 */}
      <span className="
        text-white font-display font-black text-xl 
        tracking-tighter drop-shadow-lg
        group-hover:scale-110 transition-transform duration-300
      ">
        A
      </span>

      {/* 动态装饰元素 */}
      <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full animate-pulse group-hover:animate-bounce">
      </div>
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/30 rounded-full animate-float group-hover:animate-spin-slow">
      </div>

      {/* 边框装饰 */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300">
      </div>
    </div>

    {/* 悬停时的粒子效果指示 */}
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping">
    </div>
  </div>
);

// 增强的菜单图标组件
const MenuIcon = () => (
  <div className="relative">
    <svg
      className="
        w-6 h-6 text-neutral-600 dark:text-neutral-300 
        group-hover:text-primary-600 dark:group-hover:text-primary-400 
        transition-all duration-300 ease-out
        group-hover:scale-110 group-hover:rotate-180
      "
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
        className="group-hover:stroke-[2.5] transition-all duration-200"
      />
    </svg>

    {/* 悬停装饰效果 */}
    <div className="absolute inset-0 bg-primary-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
    </div>
  </div>
);

export default Header;
