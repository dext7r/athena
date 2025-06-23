/**
 * Header 语言切换器 Island 组件
 * 专为 Header 设计的紧凑型语言切换器
 */

import { LANGUAGE_CONFIGS, SUPPORTED_LANGUAGES } from "@/i18n/config.ts";
import { useGlobalLanguage } from "@islands/GlobalLanguageProvider.tsx";
import { useEffect, useState } from "preact/hooks";

interface HeaderLanguageSwitcherProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "dropdown" | "toggle";
}

export default function HeaderLanguageSwitcher({
  className = "",
  showText = false,
  size = "md",
  variant = "dropdown",
}: HeaderLanguageSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useGlobalLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest("[data-language-switcher]")) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // 服务端渲染时显示加载状态
  if (!mounted) {
    return (
      <div
        className={`
        relative inline-block
        ${getSizeClasses(size)}
        ${className}
      `}
      >
        <div className="
          glass rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60
          bg-white/80 dark:bg-neutral-800/80
          animate-pulse
        ">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-xl">
          </div>
        </div>
      </div>
    );
  }

  const currentLangConfig = LANGUAGE_CONFIGS[currentLanguage];
  const otherLanguages = SUPPORTED_LANGUAGES.filter((lang) =>
    lang !== currentLanguage
  );

  const handleLanguageChange = (lang: typeof currentLanguage) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  const sizeClasses = getSizeClasses(size);

  // 如果是 toggle 模式且只有两种语言，显示简单的切换按钮
  if (variant === "toggle" && SUPPORTED_LANGUAGES.length === 2) {
    const otherLang = otherLanguages[0];
    const otherLangConfig = LANGUAGE_CONFIGS[otherLang];

    return (
      <button
        type="button"
        onClick={() => handleLanguageChange(otherLang)}
        className={`
          group relative
          glass rounded-2xl
          bg-white/80 hover:bg-white/90
          dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90
          border border-neutral-200/60 dark:border-neutral-700/60
          hover:border-primary-300/60 dark:hover:border-primary-600/60
          shadow-glass hover:shadow-glow-lg
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          magnetic-element cursor-none
          flex items-center gap-2 px-3 py-2
          ${sizeClasses} ${className}
        `}
        aria-label={`切换到 ${otherLangConfig.nativeName}`}
        title={`切换到 ${otherLangConfig.nativeName}`}
      >
        {/* 当前语言标志 */}
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
          {currentLangConfig.flag}
        </span>

        {/* 切换箭头 */}
        <svg
          className="w-3 h-3 text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>

        {/* 目标语言标志 */}
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
          {otherLangConfig.flag}
        </span>

        {/* 悬停装饰效果 */}
        <div className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-r from-primary-500/10 to-secondary-500/10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          -z-10
        ">
        </div>
      </button>
    );
  }

  return (
    <div
      className={`relative inline-block ${sizeClasses} ${className}`}
      data-language-switcher
    >
      {/* 当前语言按钮 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          group relative
          glass rounded-2xl
          bg-white/80 hover:bg-white/90
          dark:bg-neutral-800/80 dark:hover:bg-neutral-800/90
          border border-neutral-200/60 dark:border-neutral-700/60
          hover:border-primary-300/60 dark:hover:border-primary-600/60
          shadow-glass hover:shadow-glow-lg
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          magnetic-element cursor-none
          flex items-center gap-2 px-3 py-2
        "
        aria-label={`当前语言: ${currentLangConfig.nativeName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* 语言标志 */}
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
          {currentLangConfig.flag}
        </span>

        {/* 语言名称（可选） */}
        {showText && (
          <span className="
            text-sm font-medium 
            text-neutral-700 dark:text-neutral-300
            group-hover:text-primary-600 dark:group-hover:text-primary-400
            transition-colors duration-300
            hidden sm:block
          ">
            {currentLangConfig.nativeName}
          </span>
        )}

        {/* 下拉箭头 */}
        <svg
          className={`
            w-4 h-4 text-neutral-500 dark:text-neutral-400
            group-hover:text-primary-500 dark:group-hover:text-primary-400
            transition-all duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
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

        {/* 悬停装饰效果 */}
        <div className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-r from-primary-500/10 to-secondary-500/10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          -z-10
        ">
        </div>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="
          absolute top-full right-0 mt-2 z-50
          min-w-full w-max
          glass rounded-2xl
          bg-white/95 dark:bg-neutral-800/95
          border border-neutral-200/60 dark:border-neutral-700/60
          shadow-glow-lg backdrop-blur-xl
          animate-zoom-in origin-top-right
        ">
          <div className="py-2" role="listbox">
            {otherLanguages.map((lang) => {
              const config = LANGUAGE_CONFIGS[lang];
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className="
                    w-full flex items-center gap-3 px-4 py-3
                    text-left hover:bg-primary-50/80 dark:hover:bg-primary-900/30
                    text-neutral-700 dark:text-neutral-300
                    hover:text-primary-600 dark:hover:text-primary-400
                    transition-all duration-200
                    first:rounded-t-xl last:rounded-b-xl
                    group cursor-none
                  "
                  role="option"
                  aria-selected={false}
                >
                  {/* 语言标志 */}
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {config.flag}
                  </span>

                  {/* 语言信息 */}
                  <div className="flex-1">
                    <div className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {config.nativeName}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {config.name}
                    </div>
                  </div>

                  {/* 切换图标 */}
                  <svg
                    className="
                      w-4 h-4 text-neutral-400 dark:text-neutral-500
                      group-hover:text-primary-500 dark:group-hover:text-primary-400
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300
                      group-hover:translate-x-1
                    "
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
              );
            })}
          </div>

          {/* 底部提示 */}
          <div className="
            px-4 py-2 border-t border-neutral-200/60 dark:border-neutral-700/60
            text-xs text-neutral-500 dark:text-neutral-400
            text-center
          ">
            实时切换语言
          </div>
        </div>
      )}

      {/* 新语言指示器 */}
      {mounted && (
        <div className="
          absolute -top-1 -right-1 w-3 h-3
          bg-gradient-to-r from-primary-400 to-secondary-500
          rounded-full opacity-75
          animate-pulse
        ">
        </div>
      )}
    </div>
  );
}

/**
 * 获取尺寸相关的 CSS 类
 */
function getSizeClasses(size: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return "text-sm";
    case "lg":
      return "text-lg";
    default:
      return "text-base";
  }
}
