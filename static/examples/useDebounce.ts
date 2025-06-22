import { useEffect, useState } from "preact/hooks";

export function useDebounce<T>(value: T, delay: number): T {
  // 存储防抖值的状态
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 更新防抖值的定时器
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 如果值在延迟时间内改变，则清除定时器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 只有当值或延迟改变时才重新运行

  return debouncedValue;
}

// 使用示例：
// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
//
// useEffect(() => {
//   if (debouncedSearchTerm) {
//     // 执行搜索操作
//     searchAPI(debouncedSearchTerm);
//   }
// }, [debouncedSearchTerm]);
