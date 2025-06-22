/**
 * Cookie偏好设置交互组件
 * 提供用户管理Cookie偏好的功能
 */

import { useState } from "preact/hooks";

interface CookiePreference {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

export default function CookiePreferences() {
  const [preferences, setPreferences] = useState<CookiePreference[]>([
    {
      id: "necessary",
      name: "必要Cookie",
      description: "网站正常运行所必需",
      required: true,
      enabled: true,
    },
    {
      id: "functional",
      name: "功能Cookie",
      description: "记住您的偏好设置",
      required: false,
      enabled: true,
    },
    {
      id: "analytics",
      name: "分析Cookie",
      description: "帮助我们改进网站",
      required: false,
      enabled: false,
    },
  ]);

  const [showNotification, setShowNotification] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id && !pref.required
          ? { ...pref, enabled: !pref.enabled }
          : pref
      )
    );
  };

  const saveSettings = () => {
    // 保存设置到localStorage
    const settings = preferences.reduce((acc, pref) => {
      acc[pref.id] = pref.enabled;
      return acc;
    }, {} as Record<string, boolean>);

    localStorage.setItem("cookiePreferences", JSON.stringify(settings));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const acceptAll = () => {
    setPreferences((prev) => prev.map((pref) => ({ ...pref, enabled: true })));
    saveSettings();
  };

  const rejectNonEssential = () => {
    setPreferences((prev) =>
      prev.map((pref) => ({ ...pref, enabled: pref.required }))
    );
    saveSettings();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
        管理您的Cookie偏好
      </h4>

      {/* 通知消息 */}
      {showNotification && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200 text-sm">
            ✅ Cookie偏好设置已保存
          </p>
        </div>
      )}

      <div className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between">
            <div className="flex-1">
              <span className="font-medium text-gray-900 dark:text-white">
                {pref.name}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pref.description}
              </p>
            </div>
            <div className="ml-4">
              {pref.required
                ? (
                  <div className="bg-gray-300 dark:bg-gray-600 rounded-full p-1 w-12 h-6 flex items-center">
                    <div className="bg-gray-500 w-4 h-4 rounded-full ml-auto">
                    </div>
                  </div>
                )
                : (
                  <button
                    onClick={() => togglePreference(pref.id)}
                    className={`
                    relative rounded-full p-1 w-12 h-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                      pref.enabled
                        ? "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }
                  `}
                    aria-label={`切换${pref.name}`}
                  >
                    <div
                      className={`
                      w-4 h-4 bg-white rounded-full transition-transform duration-200
                      ${pref.enabled ? "translate-x-6" : "translate-x-0"}
                    `}
                    >
                    </div>
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          保存设置
        </button>
        <button
          onClick={acceptAll}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          接受所有
        </button>
        <button
          onClick={rejectNonEssential}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          拒绝非必要
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          💡
          提示：您可以随时在此页面更改Cookie偏好设置。必要Cookie无法禁用，因为它们对网站正常运行是必需的。
        </p>
      </div>
    </div>
  );
}
