/**
 * 国际化演示 Island 组件
 * 客户端交互的国际化演示
 */

import { LANGUAGE_CONFIGS, SUPPORTED_LANGUAGES } from "@/i18n/config.ts";
import {
  ClientTranslatedHeading,
  ClientTranslatedText,
} from "@islands/ClientTranslatedText.tsx";
import {
  useGlobalLanguage,
  useGlobalTranslation,
} from "@islands/GlobalLanguageProvider.tsx";
import I18nButton from "@islands/I18nButton.tsx";
import { useEffect, useState } from "preact/hooks";

export default function I18nDemo() {
  const [mounted, setMounted] = useState(false);
  const { currentLanguage, changeLanguage } = useGlobalLanguage();
  const { t, isLoading } = useGlobalTranslation("components");
  const ready = !isLoading;

  // 确保在客户端挂载后初始化
  useEffect(() => {
    setMounted(true);
  }, []);

  // 服务端渲染时显示加载状态
  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // 简单的语言切换器
  const SimpleLanguageSwitcher = () => (
    <div className="flex gap-2">
      {SUPPORTED_LANGUAGES.map((lang) => {
        const config = LANGUAGE_CONFIGS[lang];
        return (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${
              currentLanguage === lang
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }
            `}
          >
            {config.flag} {config.nativeName}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* 语言切换器 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {ready ? t("language.switch") : "语言切换"}
        </h2>

        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            当前语言：{LANGUAGE_CONFIGS[currentLanguage].nativeName}
          </h3>
          <SimpleLanguageSwitcher />
        </div>
      </div>

      {/* 动态翻译文本演示 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <ClientTranslatedHeading
          level={2}
          i18nKey="app.name"
          fallback="Athena"
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 基础文本 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              基础文本
            </h3>
            <div className="space-y-2">
              <ClientTranslatedText
                i18nKey="messages.welcome"
                params={{ appName: "Athena" }}
                className="text-blue-600 font-medium"
              />
              <ClientTranslatedText
                i18nKey="time.today"
                className="text-gray-600"
              />
              <ClientTranslatedText
                i18nKey="status.online"
                className="text-green-600 font-semibold"
              />
            </div>
          </div>

          {/* 格式化文本 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              格式化文本
            </h3>
            <div className="space-y-2">
              <ClientTranslatedText
                i18nKey="pagination.showing"
                params={{ start: 1, end: 10, total: 100 }}
                className="text-sm text-gray-600"
              />
              <ClientTranslatedText
                i18nKey="language.current"
                params={{ language: "中文" }}
                className="text-sm text-indigo-600"
              />
              <ClientTranslatedText
                i18nKey="app.version"
                params={{ version: "1.0.0" }}
                className="text-xs text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 动态按钮演示 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <ClientTranslatedHeading
          level={2}
          i18nKey="actions.save"
          fallback="动态按钮"
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 基础按钮 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              基础操作
            </h3>
            <div className="space-y-3">
              <I18nButton
                i18nKey="button.save"
                i18nFallback="保存"
                variant="primary"
                className="w-full"
              />
              <I18nButton
                i18nKey="button.cancel"
                i18nFallback="取消"
                variant="outline"
                className="w-full"
              />
              <I18nButton
                i18nKey="button.delete"
                i18nFallback="删除"
                variant="error"
                className="w-full"
              />
            </div>
          </div>

          {/* 状态按钮 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              状态按钮
            </h3>
            <div className="space-y-3">
              <I18nButton
                i18nKey="button.submit"
                i18nFallback="提交"
                variant="success"
                className="w-full"
              />
              <I18nButton
                i18nKey="button.reset"
                i18nFallback="重置"
                variant="warning"
                className="w-full"
              />
              <I18nButton
                loading
                i18nKey="button.submit"
                i18nFallback="提交"
                loadingI18nKey="status.saving"
                loadingText="保存中..."
                variant="primary"
                className="w-full"
              />
            </div>
          </div>

          {/* 参数化按钮 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              参数化按钮
            </h3>
            <div className="space-y-3">
              <I18nButton
                i18nKey="messages.welcome"
                i18nParams={{ appName: "Athena" }}
                i18nFallback="欢迎使用 Athena"
                variant="gradient"
                className="w-full"
              />
              <I18nButton
                i18nKey="pagination.page"
                i18nParams={{ current: 1, total: 10 }}
                i18nFallback="第 1 页，共 10 页"
                variant="ghost"
                className="w-full"
              />
              <I18nButton
                i18nKey="validation.minLength"
                i18nParams={{ field: "密码", min: 8 }}
                i18nNamespace="common"
                i18nFallback="密码至少 8 位"
                variant="outline"
                className="w-full text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
