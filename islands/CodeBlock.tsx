import { useCopy } from "@hooks/useCopy.ts";
import { useEffect, useState } from "preact/hooks";

interface CodeBlockProps {
  // 支持两种模式：直接传入代码或文件路径
  code?: string;
  filePath?: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  filePath,
  language = "typescript",
  title,
  showLineNumbers = false,
  copyable = true,
  className = "",
}: CodeBlockProps) {
  const [fileContent, setFileContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string>("");

  // 获取实际要显示的代码内容
  const displayCode = code || fileContent;

  const { copy, copied, error } = useCopy({
    timeout: 2000,
    onSuccess: () => {
      console.log("代码已复制到剪贴板");
    },
    onError: (err) => {
      console.error("复制失败:", err);
    },
  });

  // 从文件路径加载代码内容
  useEffect(() => {
    if (filePath && !code) {
      setLoading(true);
      setLoadError("");

      // 使用fetch加载本地文件
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          return response.text();
        })
        .then((content) => {
          setFileContent(content);
          setLoading(false);
        })
        .catch((err) => {
          console.error("加载文件失败:", err);
          setLoadError(`加载文件失败: ${err.message}`);
          setFileContent(
            `// 无法加载文件: ${filePath}\n// 错误: ${err.message}`,
          );
          setLoading(false);
        });
    }
  }, [filePath, code]);

  // 自动检测语言类型（基于文件扩展名）
  const getLanguageFromPath = (path: string): string => {
    const ext = path.split(".").pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      "ts": "typescript",
      "tsx": "typescript",
      "js": "javascript",
      "jsx": "javascript",
      "py": "python",
      "rs": "rust",
      "go": "go",
      "java": "java",
      "cpp": "cpp",
      "c": "c",
      "css": "css",
      "scss": "scss",
      "html": "html",
      "json": "json",
      "md": "markdown",
      "yml": "yaml",
      "yaml": "yaml",
    };
    return languageMap[ext || ""] || language;
  };

  // 自动检测文件标题
  const getDisplayTitle = (): string => {
    if (title) return title;
    if (filePath) {
      return filePath.split("/").pop() || filePath;
    }
    return "";
  };

  // 自动检测语言
  const detectedLanguage = filePath ? getLanguageFromPath(filePath) : language;

  const handleCopy = () => {
    copy(displayCode);
  };

  const lines = displayCode.split("\n");

  return (
    <div
      className={`
      relative group
      bg-neutral-50 dark:bg-neutral-900 
      border border-neutral-200 dark:border-neutral-700
      rounded-2xl overflow-hidden
      shadow-colored hover:shadow-glow-lg
      transition-all duration-300
      ${className}
    `}
    >
      {/* 头部 */}
      {(getDisplayTitle() || copyable) && (
        <div className="
          flex items-center justify-between 
          px-4 py-3 
          bg-neutral-100 dark:bg-neutral-800
          border-b border-neutral-200 dark:border-neutral-700
        ">
          {getDisplayTitle() && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-2">
                {getDisplayTitle()}
              </span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-md">
                {detectedLanguage}
              </span>
              {loading && (
                <span className="text-xs text-warning-600 dark:text-warning-400 px-2 py-1 bg-warning-100 dark:bg-warning-900/20 rounded-md animate-pulse">
                  加载中...
                </span>
              )}
              {loadError && (
                <span className="text-xs text-error-600 dark:text-error-400 px-2 py-1 bg-error-100 dark:bg-error-900/20 rounded-md">
                  加载失败
                </span>
              )}
            </div>
          )}

          {copyable && (
            <button
              onClick={handleCopy}
              disabled={loading || !displayCode}
              className="
                flex items-center gap-2 px-3 py-1.5
                text-neutral-600 dark:text-neutral-400 
                hover:text-neutral-900 dark:hover:text-white
                hover:bg-neutral-200 dark:hover:bg-neutral-700
                rounded-lg transition-all duration-200
                btn-animate magnetic-element cursor-none
                group/copy
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              title={copied ? "已复制!" : "复制代码"}
            >
              {copied
                ? (
                  <>
                    <svg
                      className="w-4 h-4 text-success-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-success-400">已复制</span>
                  </>
                )
                : (
                  <>
                    <svg
                      className="w-4 h-4 group-hover/copy:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs">复制</span>
                  </>
                )}
            </button>
          )}
        </div>
      )}

      {/* 代码内容 */}
      <div className="relative overflow-x-auto">
        {loading
          ? (
            // 加载状态
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>正在加载代码文件...</span>
              </div>
            </div>
          )
          : (
            <pre className="p-4 text-sm leading-relaxed">
            <code className="text-neutral-800 dark:text-neutral-100 font-mono">
              {showLineNumbers ? (
                <div className="flex">
                  <div className="
                    flex flex-col text-neutral-400 dark:text-neutral-500 text-xs
                    pr-4 border-r border-neutral-300 dark:border-neutral-700 mr-4
                    select-none
                  ">
                    {lines.map((_, index) => (
                      <span key={index} className="leading-relaxed">
                        {(index + 1).toString().padStart(2, ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="flex-1 min-w-0">
                    {lines.map((line, index) => (
                      <div key={index} className="leading-relaxed">
                        {line || "\u00A0"}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">
                  {displayCode || "// 暂无代码内容"}
                </div>
              )}
            </code>
            </pre>
          )}

        {/* 复制成功提示 */}
        {copied && (
          <div className="
            absolute top-2 right-2
            px-3 py-1.5 bg-success-500 text-white
            rounded-lg text-xs font-medium
            animate-fade-in shadow-lg
          ">
            ✓ 已复制到剪贴板
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="
            absolute top-2 right-2
            px-3 py-1.5 bg-error-500 text-white
            rounded-lg text-xs font-medium
            animate-fade-in shadow-lg
          ">
            ✗ 复制失败
          </div>
        )}
      </div>

      {/* 装饰性渐变边框 */}
      <div className="
        absolute inset-0 rounded-2xl pointer-events-none
        bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      ">
      </div>
    </div>
  );
}

// 简单的语法高亮函数 - 支持浅色和深色模式
function highlightSyntax(code: string, language: string): string {
  // 基础的语法高亮，可以根据需要扩展
  let highlighted = code;

  if (language === "typescript" || language === "javascript") {
    // 关键字 - 使用CSS变量支持主题切换
    highlighted = highlighted.replace(
      /\b(const|let|var|function|return|if|else|for|while|class|interface|type|import|export|from|default|async|await|try|catch|finally)\b/g,
      '<span class="text-purple-600 dark:text-purple-400 font-semibold">$1</span>',
    );

    // 字符串
    highlighted = highlighted.replace(
      /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
      '<span class="text-green-600 dark:text-green-400">$1$2$1</span>',
    );

    // 注释
    highlighted = highlighted.replace(
      /\/\/.*$/gm,
      '<span class="text-neutral-500 dark:text-neutral-400 italic">$&</span>',
    );

    // 数字
    highlighted = highlighted.replace(
      /\b\d+\.?\d*\b/g,
      '<span class="text-orange-600 dark:text-orange-400">$&</span>',
    );

    // 函数调用
    highlighted = highlighted.replace(
      /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
      '<span class="text-blue-600 dark:text-blue-400">$1</span>',
    );

    // 对象属性
    highlighted = highlighted.replace(
      /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
      '.<span class="text-cyan-600 dark:text-cyan-400">$1</span>',
    );
  }

  return highlighted;
}
