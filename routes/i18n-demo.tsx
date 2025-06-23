/**
 * 国际化演示页面
 * 展示国际化按钮组件的使用方法
 */

import Button from "@components/ui/Button.tsx";
import GlobalLanguageProvider from "@islands/GlobalLanguageProvider.tsx";
import I18nButton from "@islands/I18nButton.tsx";
import I18nDemo from "@islands/I18nDemo.tsx";
import { PageProps } from "fresh";

export default function I18nDemoPage(_props: PageProps) {
  return (
    <GlobalLanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* 页面头部 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Athena 国际化演示
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              展示国际化按钮组件的使用方法
            </p>
          </div>

          {/* 国际化按钮演示 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              国际化按钮组件演示
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 基础按钮 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  基础操作按钮
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

              {/* 传统按钮（向后兼容） */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  传统按钮（向后兼容）
                </h3>
                <div className="space-y-3">
                  <Button variant="gradient" className="w-full">
                    传统按钮
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Ghost 按钮
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    Outline 按钮
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              使用说明
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-medium mb-2">国际化按钮用法：</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<Button
  i18nKey="button.save"
  variant="primary"
  className="w-full"
/>`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">带参数的翻译：</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<Button
  i18nKey="messages.welcome"
  i18nParams={{ appName: "Athena" }}
  variant="gradient"
/>`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">加载状态翻译：</h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<Button
  loading={true}
  loadingI18nKey="status.saving"
  i18nKey="button.submit"
  variant="primary"
/>`}
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  向后兼容（传统用法）：
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<Button variant="primary">
  保存
</Button>`}
                </pre>
              </div>
            </div>
          </div>

          {/* 客户端交互演示 */}
          <I18nDemo />

          {/* 返回首页 */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => globalThis.location.href = "/"}
              className="px-8 py-3"
            >
              返回首页
            </Button>
          </div>
        </div>
      </div>
    </GlobalLanguageProvider>
  );
}
