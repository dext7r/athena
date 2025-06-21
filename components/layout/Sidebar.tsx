import { JSX } from "preact";
import SidebarNavigationIsland from "@islands/SidebarNavigation.tsx";

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
      {/* 移动端遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto lg:h-full
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      >
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              导航菜单
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              aria-label="关闭侧边栏"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 侧边栏内容 */}
          <div className="flex-1 overflow-y-auto p-4">
            {children || <SidebarNavigationIsland />}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
