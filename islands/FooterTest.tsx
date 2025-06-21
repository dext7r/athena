import { useState } from "preact/hooks";

interface FooterTestProps {
  className?: string;
}

export default function FooterTest({ className = "" }: FooterTestProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    console.log("Footer toggle clicked, current state:", isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <footer
      className={`bg-gray-100 dark:bg-gray-900 border-t p-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggle}
              className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              title={isExpanded ? "收起" : "展开"}
            >
              A
              <span className="ml-1 text-xs">
                {isExpanded ? "↑" : "↓"}
              </span>
            </button>
            <div>
              <h3 className="font-bold">Athena</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                现代化开发模板
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 h7ml
          </div>
        </div>

        {/* 展开内容 */}
        {isExpanded && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-bold mb-2">详细信息</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              这是展开后显示的详细内容。包含更多的链接和信息。
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">产品功能</h5>
                <ul className="text-sm space-y-1">
                  <li>
                    <a
                      href="/components"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      UI 组件库
                    </a>
                  </li>
                  <li>
                    <a
                      href="/hooks"
                      className="text-green-600 hover:text-green-700"
                    >
                      React Hooks
                    </a>
                  </li>
                  <li>
                    <a
                      href="/state"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      状态管理
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">支持帮助</h5>
                <ul className="text-sm space-y-1">
                  <li>
                    <a
                      href="/about"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      关于我们
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/dext7r/athena.git"
                      className="text-gray-600 hover:text-gray-700"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:h7ml@qq.com"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      联系我们
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
