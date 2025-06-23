/**
 * 国际化按钮 Island 组件
 * 客户端渲染的国际化按钮
 */

import type { TranslationNamespace, TranslationParams } from "@/i18n/types.ts";
import Button from "@components/ui/Button.tsx";
import { useGlobalTranslation } from "@islands/GlobalLanguageProvider.tsx";
import { useEffect, useState } from "preact/hooks";

interface I18nButtonProps {
  i18nKey: string;
  i18nParams?: TranslationParams;
  i18nNamespace?: TranslationNamespace;
  i18nFallback?: string;
  loadingI18nKey?: string;
  loadingText?: string;

  // Button 组件的其他属性
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "gradient"
    | "glass"
    | "success"
    | "warning"
    | "error"
    | "rainbow";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Renders a button with its label translated according to the current language context.
 *
 * Displays a loading or fallback text during server-side rendering or while translations are loading. Once translations are ready, the button label is translated using the provided key, parameters, and namespace, with optional fallback text if the translation is unavailable. All additional props are forwarded to the underlying Button component.
 */
export default function I18nButton({
  i18nKey,
  i18nParams,
  i18nNamespace = "components",
  i18nFallback,
  loadingI18nKey = "status.loading",
  loadingText,
  loading = false,
  ...buttonProps
}: I18nButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { t, isLoading } = useGlobalTranslation(i18nNamespace);
  const ready = !isLoading;

  useEffect(() => {
    setMounted(true);
  }, []);

  // 服务端渲染时显示回退文本
  if (!mounted) {
    return (
      <Button {...buttonProps} loading={loading}>
        {loading ? (loadingText || "Loading...") : (i18nFallback || i18nKey)}
      </Button>
    );
  }

  // 客户端渲染时使用翻译
  const getButtonText = () => {
    if (!ready) {
      return i18nFallback || i18nKey;
    }

    const translatedText = t(
      i18nKey,
      i18nParams as Record<string, string | number>,
    );
    return translatedText === i18nKey && i18nFallback
      ? i18nFallback
      : translatedText;
  };

  const getLoadingText = () => {
    if (loadingText) return loadingText;
    if (!ready) return "Loading...";

    return t(loadingI18nKey);
  };

  return (
    <Button {...buttonProps} loading={loading}>
      {loading ? getLoadingText() : getButtonText()}
    </Button>
  );
}
