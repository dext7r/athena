import { useState } from "preact/hooks";

interface UseCopyOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseCopyReturn {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: string | null;
  isSupported: boolean;
}

// 传统的复制方法（降级方案）
function fallbackCopyTextToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // 避免滚动到底部
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        resolve();
      } else {
        reject(new Error("execCommand('copy') 失败"));
      }
    } catch (err) {
      document.body.removeChild(textArea);
      reject(err);
    }
  });
}

export function useCopy(options: UseCopyOptions = {}): UseCopyReturn {
  const { timeout = 2000, onSuccess, onError } = options;

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 检查是否支持现代 Clipboard API
  const isClipboardAPISupported = typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    "writeText" in navigator.clipboard;

  // 检查是否支持传统的 execCommand
  const isExecCommandSupported = typeof document !== "undefined" &&
    "execCommand" in document;

  // 至少有一种方法可用
  const isSupported = isClipboardAPISupported || isExecCommandSupported;

  const copy = async (text: string): Promise<void> => {
    if (!text) {
      const error = new Error("复制内容不能为空");
      setError(error.message);
      onError?.(error);
      return;
    }

    try {
      // 优先使用现代 Clipboard API
      if (isClipboardAPISupported) {
        await navigator.clipboard.writeText(text);
      } else if (isExecCommandSupported) {
        // 降级到传统方法
        await fallbackCopyTextToClipboard(text);
      } else {
        throw new Error("浏览器不支持复制功能，请手动选择并复制文本");
      }

      setCopied(true);
      setError(null);
      onSuccess?.();

      // 自动重置状态
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("复制失败");
      setError(error.message);
      setCopied(false);
      onError?.(error);
    }
  };

  return {
    copy,
    copied,
    error,
    isSupported,
  };
}

export default useCopy;
