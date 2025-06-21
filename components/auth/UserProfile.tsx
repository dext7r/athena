/**
 * 用户资料组件
 * 显示用户头像、姓名和下拉菜单
 */

import { useState } from "preact/hooks";
import { authUtils, useAuthStore } from "../../stores/useAuthStore.ts";

interface UserProfileProps {
  className?: string;
  showDropdown?: boolean;
}

export default function UserProfile(
  { className = "", showDropdown = true }: UserProfileProps,
) {
  const { user, performLogout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) {
    return null;
  }

  const displayName = authUtils.getDisplayName();
  const avatarUrl = authUtils.getUserAvatar(40);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await performLogout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`relative ${className}`}>
      {/* 用户头像和信息 */}
      <button
        type="button"
        onClick={showDropdown ? toggleDropdown : undefined}
        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
          showDropdown
            ? "hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            : ""
        }`}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {/* 头像 */}
        <img
          src={avatarUrl}
          alt={`${displayName}'s avatar`}
          className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
          loading="lazy"
        />

        {/* 用户名 */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {displayName}
          </span>
          {user.username && user.username !== displayName && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              @{user.username}
            </span>
          )}
        </div>

        {/* 下拉箭头 */}
        {showDropdown && (
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
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
        )}
      </button>

      {/* 下拉菜单 */}
      {showDropdown && isDropdownOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* 菜单内容 */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {/* 用户信息头部 */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={authUtils.getUserAvatar(48)}
                  alt={`${displayName}'s avatar`}
                  className="w-12 h-12 rounded-full"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    @{user.username}
                  </p>
                  {user.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 菜单项 */}
            <div className="py-2">
              <a
                href={user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                View GitHub Profile
              </a>

              <a
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
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
                Settings
              </a>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 简化的用户头像组件
export function UserAvatar(
  { size = 32, className = "" }: { size?: number; className?: string },
) {
  const { user } = useAuthStore();

  if (!user) return null;

  const avatarUrl = authUtils.getUserAvatar(size);
  const displayName = authUtils.getDisplayName();

  return (
    <img
      src={avatarUrl}
      alt={`${displayName}'s avatar`}
      className={`rounded-full border-2 border-gray-200 dark:border-gray-700 ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}
