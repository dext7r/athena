/**
 * 翻译文本组件
 * 提供声明式的翻译功能
 */

import type { TranslationNamespace, TranslationParams } from "@/i18n/types.ts";
import { useTranslation } from "@hooks/useTranslation.ts";
import { JSX } from "preact";
import { useMemo } from "preact/hooks";

/**
 * 翻译文本组件属性
 */
export interface TranslatedTextProps {
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

  // 按钮特定属性
  disabled?: boolean;
  type?: "button" | "submit" | "reset";

  // 链接特定属性
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;

  // 子元素（用于包装模式）
  children?: JSX.Element | JSX.Element[] | string;
}

/**
 * 翻译文本组件
 */
export function TranslatedText({
  i18nKey,
  params,
  namespace = "common",
  fallback,
  as: Component = "span",
  dangerouslySetInnerHTML = false,
  children,
  ...props
}: TranslatedTextProps) {
  const { t, ready } = useTranslation(namespace);

  // 获取翻译文本
  const translatedText = useMemo(() => {
    if (!ready && fallback) {
      return fallback;
    }

    const translation = t(i18nKey, params);

    // 如果翻译失败且有回退文本，使用回退文本
    if (translation === i18nKey && fallback) {
      return fallback;
    }

    return translation;
  }, [t, i18nKey, params, fallback, ready]);

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
 * 翻译按钮组件
 */
export interface TranslatedButtonProps extends TranslatedTextProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

export function TranslatedButton({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  ...props
}: TranslatedButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium tracking-wide transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
  };

  const combinedClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  return (
    <TranslatedText
      {...props}
      as="button"
      className={combinedClassName}
      disabled={disabled || loading}
      type={type}
    />
  );
}

/**
 * 翻译链接组件
 */
export interface TranslatedLinkProps extends TranslatedTextProps {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

export function TranslatedLink({
  href,
  target,
  rel,
  className = "",
  ...props
}: TranslatedLinkProps) {
  const baseClasses = `
    text-blue-600 hover:text-blue-800 hover:underline
    transition-colors duration-200
  `;

  const combinedClassName = `${baseClasses} ${className}`.trim();

  return (
    <TranslatedText
      {...props}
      as="a"
      href={href}
      target={target}
      rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
      className={combinedClassName}
    />
  );
}

/**
 * 翻译标题组件
 */
export interface TranslatedHeadingProps extends TranslatedTextProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function TranslatedHeading({
  level,
  className = "",
  ...props
}: TranslatedHeadingProps) {
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
    <TranslatedText
      {...props}
      as={Component}
      className={combinedClassName}
    />
  );
}

/**
 * 翻译列表组件
 */
export interface TranslatedListProps {
  items: string[];
  namespace?: TranslationNamespace;
  type?: "conjunction" | "disjunction" | "unit";
  className?: string;
  as?: "span" | "div" | "p";
}

export function TranslatedList({
  items,
  namespace = "common",
  type = "conjunction",
  className = "",
  as: Component = "span",
}: TranslatedListProps) {
  const { formatList } = useTranslation(namespace);

  const formattedList = useMemo(() => {
    return formatList(items, type);
  }, [formatList, items, type]);

  return (
    <Component className={className}>
      {formattedList}
    </Component>
  );
}

/**
 * 翻译复数组件
 */
export interface TranslatedPluralProps {
  count: number;
  i18nKey: string;
  namespace?: TranslationNamespace;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function TranslatedPlural({
  count,
  i18nKey,
  namespace = "common",
  className = "",
  as: Component = "span",
}: TranslatedPluralProps) {
  const { t, formatPlural } = useTranslation(namespace);

  const pluralText = useMemo(() => {
    // 获取复数翻译规则
    const translations = {
      zero: t(`${i18nKey}.zero`, { count }),
      one: t(`${i18nKey}.one`, { count }),
      two: t(`${i18nKey}.two`, { count }),
      few: t(`${i18nKey}.few`, { count }),
      many: t(`${i18nKey}.many`, { count }),
      other: t(`${i18nKey}.other`, { count }),
    };

    return formatPlural(count, translations);
  }, [count, i18nKey, t, formatPlural]);

  return (
    <Component className={className}>
      {pluralText}
    </Component>
  );
}

/**
 * 翻译错误边界组件
 */
export interface TranslationErrorBoundaryProps {
  children: JSX.Element | JSX.Element[];
  fallback?: JSX.Element | string;
}

export function TranslationErrorBoundary({
  children,
  fallback = "Translation Error",
}: TranslationErrorBoundaryProps) {
  // 在 Preact 中，错误边界需要使用类组件
  // 这里提供一个简化版本，实际项目中可能需要更完整的实现
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Translation error:", error);
    return <>{fallback}</>;
  }
}
