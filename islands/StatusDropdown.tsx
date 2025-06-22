import { useEffect, useRef, useState } from "preact/hooks";

interface StatusDropdownProps {
  active?: boolean;
}

export default function StatusDropdown(
  { active = false }: StatusDropdownProps,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusItems = [
    { href: "/status", label: "状态码总览", icon: "📋" },
    { href: "/status/401", label: "401 未授权", icon: "🔒" },
    { href: "/status/403", label: "403 禁止访问", icon: "🚫" },
    { href: "/nonexistent-page", label: "404 页面未找到", icon: "🔍" },
    { href: "/status/500", label: "500 服务器错误", icon: "❌" },
    { href: "/status/502", label: "502 网关错误", icon: "🌐" },
    { href: "/status/503", label: "503 服务不可用", icon: "🔧" },
  ];

  // 获取当前路径
  useEffect(() => {
    setCurrentPath(globalThis.location.pathname);
  }, []);

  // 检查菜单项是否为激活状态
  const isItemActive = (href: string) => {
    if (href === "/nonexistent-page") {
      // 404页面的特殊处理
      return currentPath !== "/" && currentPath !== "/status" &&
        currentPath !== "/status/401" && currentPath !== "/status/403" &&
        currentPath !== "/status/500" && currentPath !== "/status/502" &&
        currentPath !== "/status/503" && currentPath !== "/components" &&
        currentPath !== "/hooks" && currentPath !== "/state" &&
        currentPath !== "/about";
    }
    return currentPath === href;
  };

  // 关闭下拉菜单的函数
  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150); // 给动画时间完成
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 处理菜单项点击
  const handleItemClick = (href: string) => {
    // 延迟导航，让关闭动画完成
    closeDropdown();
    setTimeout(() => {
      globalThis.location.href = href;
    }, 100);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            closeDropdown();
          } else {
            setIsOpen(true);
          }
        }}
        className={`
          relative px-4 py-2 rounded-xl text-sm font-medium 
          transition-all duration-300 ease-out
          group overflow-hidden
          ${
          isOpen || active
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:shadow-md hover:scale-105"
        } flex items-center gap-2
        `}
      >
        {/* 活跃状态的发光效果 */}
        {(isOpen || active) && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50 blur-sm">
          </div>
        )}

        {/* 悬停时的动画背景 */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30
          transform origin-left scale-x-0 group-hover:scale-x-100
          transition-transform duration-300 ease-out rounded-xl
          ${(isOpen || active) ? "opacity-0" : "opacity-100"}
        `}
        >
        </div>

        {/* 文本内容 */}
        <span className="relative z-10 tracking-wide">状态码</span>
        <svg
          className={`relative z-10 w-4 h-4 transition-all duration-300 ${
            isOpen ? "rotate-180 scale-110" : "group-hover:scale-110"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>

        {/* 底部装饰线 */}
        {!(isOpen || active) && (
          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full">
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full left-0 mt-2 w-56 
            bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
            rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 
            z-[9999] overflow-hidden
            transition-all duration-200 ease-out
            ${
            isClosing
              ? "opacity-0 transform scale-95 translate-y-2"
              : "opacity-100 transform scale-100 translate-y-0"
          }
          `}
        >
          {/* 装饰性渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 dark:from-blue-400/10 dark:to-purple-400/10">
          </div>

          <div className="relative py-2">
            {statusItems.map((item, index) => {
              const itemActive = isItemActive(item.href);
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleItemClick(item.href)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm text-left
                    transition-all duration-200 group relative overflow-hidden
                    ${isClosing ? "opacity-50" : "opacity-100"}
                    ${
                    itemActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                  `}
                  style={{
                    transitionDelay: isClosing ? "0ms" : `${index * 30}ms`,
                  }}
                >
                  {/* 激活状态的左侧装饰条 */}
                  {itemActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full">
                    </div>
                  )}

                  {/* 悬停背景动画 */}
                  {!itemActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out">
                    </div>
                  )}

                  <span
                    className={`relative z-10 text-lg ${
                      itemActive ? "scale-110" : ""
                    } transition-transform duration-200`}
                  >
                    {item.icon}
                  </span>
                  <span className="relative z-10 tracking-wide">
                    {item.label}
                  </span>

                  {/* 激活状态的右侧图标 */}
                  {itemActive && (
                    <div className="ml-auto relative z-10">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
