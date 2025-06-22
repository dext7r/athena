import { useEffect, useState } from "preact/hooks";

interface EnvironmentData {
  userAgent: string;
  clipboardSupport: boolean;
  execCommandSupport: boolean;
  isHttps: boolean;
}

export default function EnvironmentInfo() {
  const [envData, setEnvData] = useState<EnvironmentData | null>(null);

  useEffect(() => {
    // 检测环境信息
    const data: EnvironmentData = {
      userAgent: navigator.userAgent,
      clipboardSupport: typeof navigator !== "undefined" &&
        "clipboard" in navigator &&
        "writeText" in navigator.clipboard,
      execCommandSupport: typeof document !== "undefined" &&
        "execCommand" in document,
      isHttps: location.protocol === "https:",
    };

    setEnvData(data);
  }, []);

  if (!envData) {
    return (
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p>正在检测环境信息...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
      <p>
        <strong>用户代理:</strong> {envData.userAgent}
      </p>
      <p>
        <strong>是否支持 Clipboard API:</strong>{" "}
        {envData.clipboardSupport ? "✅ 支持" : "❌ 不支持"}
      </p>
      <p>
        <strong>是否支持 execCommand:</strong>{" "}
        {envData.execCommandSupport ? "✅ 支持" : "❌ 不支持"}
      </p>
      <p>
        <strong>是否为 HTTPS:</strong>{" "}
        {envData.isHttps ? "✅ HTTPS" : "❌ HTTP"}
      </p>
    </div>
  );
}
