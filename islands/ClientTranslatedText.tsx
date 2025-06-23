/**
 * 客户端翻译文本组件
 * 专为 Islands 设计的翻译组件
 */

import type { TranslationNamespace, TranslationParams } from "@/i18n/types.ts";
import { useGlobalTranslation } from "@islands/GlobalLanguageProvider.tsx";
import { JSX } from "preact";
import { useMemo } from "preact/hooks";

/**
 * 客户端翻译文本组件属性
 */
export interface ClientTranslatedTextProps {
  // 翻译键值
  i18nKey: string;

  // 翻译参数
  params?: TranslationParams;

  // 命名空间
  namespace?: TranslationNamespace;

  // 回退文本
  fallback?: string;

  // HTML 标签
  as?: keyof JSX.IntrinsicElements;

  // 是否允许 HTML 内容
  dangerouslySetInnerHTML?: boolean;

  // 其他 HTML 属性
  className?: string;
  style?: JSX.CSSProperties;
  id?: string;

  // 事件处理
  onClick?: JSX.MouseEventHandler<HTMLElement>;
  onMouseEnter?: JSX.MouseEventHandler<HTMLElement>;
  onMouseLeave?: JSX.MouseEventHandler<HTMLElement>;

  // 可访问性
  role?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;

  // 子元素（用于包装模式）
  children?: JSX.Element | JSX.Element[] | string;
}

/**
 * 客户端翻译文本组件
 */
export function ClientTranslatedText({
  i18nKey,
  params,
  namespace = "common",
  fallback,
  as: Component = "span",
  dangerouslySetInnerHTML = false,
  children,
  ...props
}: ClientTranslatedTextProps) {
  const { t, isLoading } = useGlobalTranslation(namespace);

  // 获取翻译文本
  const translatedText = useMemo(() => {
    if (isLoading && fallback) {
      return fallback;
    }

    const translation = t(i18nKey, params as Record<string, string | number>);

    // 如果翻译失败且有回退文本，使用回退文本
    if (translation === i18nKey && fallback) {
      return fallback;
    }

    return translation;
  }, [t, i18nKey, params, fallback, isLoading]);

  // 如果有子元素，使用包装模式
  if (children) {
    return (
      <Component {...(props as Record<string, unknown>)} title={translatedText}>
        {children}
      </Component>
    );
  }

  // 如果允许 HTML 内容（已禁用以符合安全最佳实践）
  if (dangerouslySetInnerHTML) {
    console.warn("dangerouslySetInnerHTML is disabled for security reasons");
    // 返回纯文本版本
    return (
      <Component {...(props as Record<string, unknown>)}>
        {translatedText}
      </Component>
    );
  }

  // 普通文本模式
  return (
    <Component {...(props as Record<string, unknown>)}>
      {translatedText}
    </Component>
  );
}

/**
 * 客户端翻译标题组件
 */
export interface ClientTranslatedHeadingProps
  extends ClientTranslatedTextProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ClientTranslatedHeading({
  level,
  className = "",
  ...props
}: ClientTranslatedHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  const combinedClassName = `${sizeClasses[level]} ${className}`.trim();

  return (
    <ClientTranslatedText
      {...props}
      as={Component}
      className={combinedClassName}
    />
  );
}

// 默认导出
export default ClientTranslatedText;
