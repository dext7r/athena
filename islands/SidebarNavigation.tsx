import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

// 导航状态钩子
function useNavigationState() {
  const getCurrentPath = () => {
    if (typeof globalThis.location !== "undefined") {
      return globalThis.location.pathname;
    }
    return "";
  };

  const currentPath = getCurrentPath();

  const isPathActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const isStatusActive = () => {
    return currentPath.startsWith("/status") ||
      currentPath === "/nonexistent-page";
  };

  return {
    currentPath,
    isPathActive,
    isStatusActive,
  };
}

// 菜单项接口
interface MenuItem {
  href?: string;
  label: string;
  icon: string;
  children?: MenuItem[];
}

// 图标映射 - 优化图标设计
const iconMap: Record<string, JSX.Element> = {
  home: (
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  components: (
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
  hooks: (
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  state: (
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      />
    </svg>
  ),
  status: (
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  overview: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  ),
  lock: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  ban: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  ),
  search: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  gateway: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01"
      />
    </svg>
  ),
  maintenance: (
    <svg
      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
    </svg>
  ),
};

export default function SidebarNavigation() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isPathActive, isStatusActive } = useNavigationState();

  // 当访问状态码相关页面时，自动展开状态码菜单
  useEffect(() => {
    if (isStatusActive()) {
      setExpandedItems((prev) =>
        prev.includes("状态码页面") ? prev : [...prev, "状态码页面"]
      );
    }
  }, [isStatusActive()]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const menuItems: MenuItem[] = [
    { href: "/", label: "首页", icon: "home" },
    { href: "/components", label: "组件展示", icon: "components" },
    { href: "/hooks", label: "Hooks演示", icon: "hooks" },
    { href: "/state", label: "状态管理", icon: "state" },
    {
      label: "状态码页面",
      icon: "status",
      children: [
        { href: "/status", label: "状态码总览", icon: "overview" },
        { href: "/status/401", label: "401 未授权", icon: "lock" },
        { href: "/status/403", label: "403 禁止访问", icon: "ban" },
        { href: "/nonexistent-page", label: "404 页面未找到", icon: "search" },
        { href: "/status/500", label: "500 服务器错误", icon: "error" },
        { href: "/status/502", label: "502 网关错误", icon: "gateway" },
        { href: "/status/503", label: "503 服务不可用", icon: "maintenance" },
      ],
    },
    { href: "/about", label: "关于", icon: "info" },
  ];

  return (
    <nav className="space-y-2">
      {menuItems.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.label);
        const isActive = item.href ? isPathActive(item.href) : isStatusActive();

        if (hasChildren) {
          return (
            <div key={item.label} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleExpanded(item.label)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl 
                  transition-all duration-300 ease-out group relative overflow-hidden
                  font-medium
                  ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-[1.02]"
                }`}
              >
                {/* 活跃状态的发光效果 */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50 blur-sm">
                  </div>
                )}

                {/* 悬停时的动画背景 */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30
                  transform origin-left scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-out rounded-xl
                  ${isActive ? "opacity-0" : "opacity-100"}
                `}
                >
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div
                    className={`p-1 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/20"
                        : "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
                    }`}
                  >
                    {iconMap[item.icon]}
                  </div>
                  <span className="tracking-wide">{item.label}</span>
                </div>

                <svg
                  className={`
                    relative z-10 w-5 h-5 transition-all duration-300 
                    ${
                    isExpanded ? "rotate-90 scale-110" : "group-hover:scale-110"
                  }
                  `}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* 子菜单 - 改进动画 */}
              <div
                className={`
                ml-4 border-l-2 border-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 pl-4
                overflow-hidden transition-all duration-300 ease-out space-y-1
                ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
              `}
              >
                {item.children?.map((child, childIndex) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg 
                      transition-all duration-300 ease-out group relative overflow-hidden
                      text-sm font-medium
                      ${
                      child.href && isPathActive(child.href)
                        ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md transform scale-[1.02]"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-800/30 dark:hover:to-purple-800/30 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm hover:scale-[1.02]"
                    }
                    `}
                    style={{
                      animationDelay: `${childIndex * 50}ms`,
                      animation: isExpanded
                        ? "slideUp 0.3s ease-out forwards"
                        : "none",
                    }}
                  >
                    {/* 活跃状态指示器 */}
                    {child.href && isPathActive(child.href) && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full">
                      </div>
                    )}

                    {/* 悬停背景动画 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-lg">
                    </div>

                    <div
                      className={`relative z-10 p-1 rounded transition-all duration-300 ${
                        child.href && isPathActive(child.href)
                          ? "bg-white/20"
                          : "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
                      }`}
                    >
                      {iconMap[child.icon]}
                    </div>
                    <span className="relative z-10 tracking-wide">
                      {child.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl 
              transition-all duration-300 ease-out group relative overflow-hidden
              font-medium
              ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-[1.02]"
            }
            `}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "slideUp 0.5s ease-out forwards",
            }}
          >
            {/* 活跃状态的发光效果 */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50 blur-sm">
              </div>
            )}

            {/* 悬停时的动画背景 */}
            <div
              className={`
              absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30
              transform origin-left scale-x-0 group-hover:scale-x-100
              transition-transform duration-300 ease-out rounded-xl
              ${isActive ? "opacity-0" : "opacity-100"}
            `}
            >
            </div>

            <div
              className={`relative z-10 p-1 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-white/20"
                  : "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
              }`}
            >
              {iconMap[item.icon]}
            </div>
            <span className="relative z-10 tracking-wide">{item.label}</span>

            {/* 底部装饰线 */}
            {!isActive && (
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full">
              </div>
            )}
          </a>
        );
      })}
    </nav>
  );
}
