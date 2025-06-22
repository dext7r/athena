import { useNavigationState } from "./NavigationState.tsx";
import StatusDropdownIsland from "./StatusDropdown.tsx";

export default function HeaderNavigation() {
  const { isPathActive, isStatusActive } = useNavigationState();

  return (
    <nav className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-3 py-2 border border-gray-200/50 dark:border-gray-700/50 shadow-lg relative">
      <NavLink href="/" label="首页" active={isPathActive("/")} />
      <NavLink
        href="/components"
        label="组件"
        active={isPathActive("/components")}
      />
      <NavLink href="/hooks" label="Hooks" active={isPathActive("/hooks")} />
      <NavLink href="/state" label="状态" active={isPathActive("/state")} />
      <StatusDropdownIsland active={isStatusActive()} />
      <NavLink href="/about" label="关于" active={isPathActive("/about")} />
    </nav>
  );
}

// 导航链接组件 - 现代化设计
interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

const NavLink = ({ href, label, active }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`
        relative px-4 py-2 rounded-xl text-sm font-medium 
        transition-all duration-300 ease-out
        group overflow-hidden
        ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:shadow-md hover:scale-105"
      }
      `}
    >
      {/* 活跃状态的发光效果 */}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50 blur-sm">
        </div>
      )}

      {/* 悬停时的动画背景 */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30
        transform origin-left scale-x-0 group-hover:scale-x-100
        transition-transform duration-300 ease-out rounded-xl
        ${active ? "opacity-0" : "opacity-100"}
      `}
      >
      </div>

      {/* 文本内容 */}
      <span className="relative z-10 tracking-wide">{label}</span>

      {/* 底部装饰线 */}
      {!active && (
        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full">
        </div>
      )}
    </a>
  );
};
