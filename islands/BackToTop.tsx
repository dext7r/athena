/**
 * 返回顶部Island组件
 * 具有滚动检测、动画效果和渐隐功能
 */

import { useEffect, useState } from "preact/hooks";

interface BackToTopProps {
  /** 显示按钮的滚动阈值，默认 300px */
  threshold?: number;
  /** 按钮样式变体 */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** 按钮大小 */
  size?: "sm" | "md" | "lg";
  /** 自定义类名 */
  className?: string;
  /** 滚动到顶部的持续时间（毫秒），默认 800ms */
  duration?: number;
  /** 按钮位置 */
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  /** 强制显示按钮（用于调试），默认 false */
  forceVisible?: boolean;
}

export default function BackToTop({
  threshold = 300,
  variant = "default",
  size = "md",
  className = "",
  duration = 800,
  position = "bottom-right",
  forceVisible = false,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 滚动进度 0-1

  // 监听滚动事件 - 支持自定义滚动容器
  useEffect(() => {
    const handleScroll = () => {
      // 尝试找到实际的滚动容器
      const scrollContainer = document.querySelector(
        'main[class*="overflow-y-auto"]',
      ) as HTMLElement;

      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (scrollContainer) {
        // 如果找到了滚动容器，使用容器的滚动信息
        scrollTop = scrollContainer.scrollTop;
        scrollHeight = scrollContainer.scrollHeight;
        clientHeight = scrollContainer.clientHeight;
      } else {
        // 否则使用window的滚动信息
        scrollTop = globalThis.pageYOffset ||
          document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = globalThis.innerHeight;
      }

      // 计算滚动进度 (0-1)
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      const shouldShow = scrollTop > threshold;
      setIsVisible(shouldShow);
      setScrollProgress(progress);
    };

    // 监听window滚动
    globalThis.addEventListener("scroll", handleScroll);

    // 同时监听可能的滚动容器
    const scrollContainer = document.querySelector(
      'main[class*="overflow-y-auto"]',
    );
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [threshold]);

  // 平滑滚动到顶部 - 支持自定义滚动容器
  const scrollToTop = () => {
    if (isScrolling) return;

    setIsScrolling(true);
    const startTime = performance.now();

    // 找到实际的滚动容器
    const scrollContainer = document.querySelector(
      'main[class*="overflow-y-auto"]',
    ) as HTMLElement;

    let startScrollTop = 0;
    if (scrollContainer) {
      startScrollTop = scrollContainer.scrollTop;
    } else {
      startScrollTop = globalThis.pageYOffset ||
        document.documentElement.scrollTop;
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用 easeOutCubic 缓动函数
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const scrollTop = startScrollTop * (1 - easeOutCubic);

      if (scrollContainer) {
        // 滚动容器元素
        scrollContainer.scrollTop = scrollTop;
      } else {
        // 滚动window
        globalThis.scrollTo(0, scrollTop);
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // 根据滚动进度生成动态颜色
  const getDynamicColor = () => {
    // 定义颜色渐变路径：蓝色 -> 紫色 -> 粉色 -> 红色 -> 橙色 -> 黄色 -> 绿色
    const colorStops = [
      { r: 59, g: 130, b: 246 }, // blue-500
      { r: 147, g: 51, b: 234 }, // purple-600
      { r: 236, g: 72, b: 153 }, // pink-500
      { r: 239, g: 68, b: 68 }, // red-500
      { r: 249, g: 115, b: 22 }, // orange-500
      { r: 234, g: 179, b: 8 }, // yellow-500
      { r: 34, g: 197, b: 94 }, // green-500
    ];

    // 根据滚动进度计算当前颜色
    const segmentCount = colorStops.length - 1;
    const segment = Math.floor(scrollProgress * segmentCount);
    const segmentProgress = (scrollProgress * segmentCount) % 1;

    const startColor = colorStops[Math.min(segment, segmentCount)];
    const endColor = colorStops[Math.min(segment + 1, segmentCount)];

    // 线性插值计算颜色
    const r = Math.round(
      startColor.r + (endColor.r - startColor.r) * segmentProgress,
    );
    const g = Math.round(
      startColor.g + (endColor.g - startColor.g) * segmentProgress,
    );
    const b = Math.round(
      startColor.b + (endColor.b - startColor.b) * segmentProgress,
    );

    return `rgb(${r}, ${g}, ${b})`;
  };

  // 获取变体样式 - 支持动态颜色
  const getVariantStyles = () => {
    // 如果滚动进度大于0，使用动态颜色
    if (scrollProgress > 0) {
      const dynamicColor = getDynamicColor();
      return `text-white shadow-lg`;
    }

    // 否则使用预设样式
    const variants = {
      default:
        "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
      primary:
        "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      success:
        "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700",
      warning:
        "bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700",
      danger:
        "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700",
    };
    return variants[variant];
  };

  // 获取尺寸样式
  const getSizeStyles = () => {
    const sizes = {
      sm: "w-10 h-10 p-2",
      md: "w-12 h-12 p-3",
      lg: "w-14 h-14 p-4",
    };
    return sizes[size];
  };

  // 获取位置样式 - 调整高度避开footer
  const getPositionStyles = () => {
    const positions = {
      "bottom-right": "bottom-28 right-6", // 进一步增加底部距离避开footer
      "bottom-left": "bottom-28 left-6", // 进一步增加底部距离避开footer
      "bottom-center": "bottom-28 left-1/2 transform -translate-x-1/2", // 进一步增加底部距离避开footer
    };
    return positions[position];
  };

  // 获取图标大小
  const getIconSize = () => {
    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };
    return iconSizes[size];
  };

  return (
    <button
      onClick={scrollToTop}
      disabled={isScrolling}
      style={{
        backgroundColor: scrollProgress > 0 ? getDynamicColor() : undefined,
      }}
      className={`
        fixed z-[99999] rounded-full shadow-xl backdrop-blur-sm
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:cursor-not-allowed
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${getPositionStyles()}
        ${
        (isVisible || forceVisible)
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }
        ${
        isScrolling ? "opacity-75 scale-95" : "hover:scale-110 active:scale-95"
      }
        ${className}
      `}
      title="返回顶部"
      aria-label="返回顶部"
    >
      {/* 返回顶部图标 */}
      <svg
        className={`${getIconSize()} transition-transform duration-200 ${
          isScrolling ? "animate-bounce" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>

      {/* 滚动进度环 */}
      {scrollProgress > 0 && !isScrolling && (
        <div className="absolute inset-0 rounded-full">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            {/* 背景环 */}
            <path
              className="stroke-current opacity-20"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* 进度环 */}
            <path
              className="stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${scrollProgress * 100}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              style={{
                transition: "stroke-dasharray 0.3s ease-in-out",
              }}
            />
          </svg>
        </div>
      )}

      {/* 滚动动画指示器 */}
      {isScrolling && (
        <div className="absolute inset-0 rounded-full border-2 border-current opacity-30">
          <div
            className="absolute inset-0 rounded-full border-2 border-current border-t-transparent animate-spin"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </button>
  );
}
