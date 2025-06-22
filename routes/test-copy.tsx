import { PageProps } from "fresh";
import CopyButton from "../islands/CopyButton.tsx";
import CodeBlock from "../islands/CodeBlock.tsx";

export default function TestCopyPage(props: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            复制功能测试
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            测试增强的剪贴板复制功能，支持现代 Clipboard API 和传统降级方案
          </p>
        </div>

        <div className="space-y-8">
          {/* 基础复制按钮测试 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              基础复制按钮
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">简单文本:</span>
                <CopyButton 
                  text="Hello, World!" 
                  variant="default"
                  size="md"
                >
                  复制文本
                </CopyButton>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">长文本:</span>
                <CopyButton 
                  text="这是一段很长的文本，用来测试复制功能是否能正确处理较长的内容。包含中文字符、标点符号和换行符。\n第二行内容\n第三行内容" 
                  variant="outline"
                  size="md"
                >
                  复制长文本
                </CopyButton>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">代码片段:</span>
                <CopyButton 
                  text={`function hello() {
  console.log("Hello, World!");
  return "success";
}`}
                  variant="ghost"
                  size="md"
                >
                  复制代码
                </CopyButton>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">空内容测试:</span>
                <CopyButton 
                  text="" 
                  variant="default"
                  size="md"
                >
                  复制空内容
                </CopyButton>
              </div>
            </div>
          </div>

          {/* 代码块复制测试 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              代码块复制
            </h2>
            <CodeBlock
              code={`// TypeScript 示例代码
import { useCopy } from "../hooks/useCopy.ts";

export function ExampleComponent() {
  const { copy, copied, error, isSupported } = useCopy({
    timeout: 2000,
    onSuccess: () => console.log("复制成功!"),
    onError: (err) => console.error("复制失败:", err),
  });

  const handleCopy = async () => {
    await copy("要复制的文本内容");
  };

  return (
    <div>
      <button onClick={handleCopy} disabled={!isSupported}>
        {copied ? "已复制!" : "复制文本"}
      </button>
      {error && <p>错误: {error}</p>}
    </div>
  );
}`}
              language="typescript"
              title="useCopy Hook 使用示例"
              showLineNumbers={true}
              copyable={true}
            />
          </div>

          {/* 环境信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              环境信息
            </h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>用户代理:</strong> <span id="user-agent"></span></p>
              <p><strong>是否支持 Clipboard API:</strong> <span id="clipboard-support"></span></p>
              <p><strong>是否支持 execCommand:</strong> <span id="execcommand-support"></span></p>
              <p><strong>是否为 HTTPS:</strong> <span id="https-status"></span></p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // 显示环境信息
          document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('user-agent').textContent = navigator.userAgent;
            document.getElementById('clipboard-support').textContent = 
              (typeof navigator !== 'undefined' && 'clipboard' in navigator && 'writeText' in navigator.clipboard) 
                ? '✅ 支持' : '❌ 不支持';
            document.getElementById('execcommand-support').textContent = 
              (typeof document !== 'undefined' && 'execCommand' in document) 
                ? '✅ 支持' : '❌ 不支持';
            document.getElementById('https-status').textContent = 
              location.protocol === 'https:' ? '✅ HTTPS' : '❌ HTTP';
          });
        `
      }} />
    </div>
  );
}
