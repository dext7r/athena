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
 * Renders translated text on the client using a specified translation key and optional parameters.
 *
 * If a fallback is provided, it is displayed while the translation is loading or if the translation is missing. Supports rendering as any HTML tag via the `as` prop, and can wrap child elements with a translated title attribute. For security, HTML injection is disabled even if `dangerouslySetInnerHTML` is requested.
 *
 * @param i18nKey - The translation key to look up.
 * @param params - Optional parameters for interpolation in the translation.
 * @param namespace - Optional translation namespace; defaults to "common".
 * @param fallback - Optional fallback text if the translation is unavailable.
 * @param as - The HTML tag or component to render as; defaults to "span".
 * @param dangerouslySetInnerHTML - If true, attempts to render HTML content, but is disabled for security.
 * @param children - Optional child elements to wrap with the translated title.
 * @returns The translated text or fallback, rendered as the specified HTML element.
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

/**
 * Renders a translated heading element (`h1`–`h6`) with appropriate styling and accessibility support.
 *
 * Applies font size and weight classes based on the specified heading level, and passes all translation and HTML props to the underlying translation component.
 *
 * @param level - The heading level (1–6) determining the HTML tag and styling
 */
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
