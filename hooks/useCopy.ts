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

export function useCopy(options: UseCopyOptions = {}): UseCopyReturn {
  const { timeout = 2000, onSuccess, onError } = options;

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 检查是否支持Clipboard API
  const isSupported = typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    "writeText" in navigator.clipboard;

  const copy = async (text: string): Promise<void> => {
    if (!isSupported) {
      const error = new Error("Clipboard API not supported");
      setError(error.message);
      onError?.(error);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      onSuccess?.();

      // 自动重置状态
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to copy");
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
