import { useEffect, useState } from "preact/hooks";
import { useDebounce } from "./useDebounce.ts";
import { useLocalStorage } from "./useLocalStorage.ts";

export default function MyComponent() {
  // 使用 useLocalStorage 持久化用户偏好
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [username, setUsername] = useLocalStorage("username", "");

  // 使用 useDebounce 优化搜索
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 当防抖搜索词改变时执行搜索
  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const performSearch = async (term: string) => {
    console.log("搜索:", term);
    // 这里执行实际的搜索逻辑
  };

  return (
    <div className="p-6 space-y-6">
      {/* 主题切换 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          主题设置 (持久化到 localStorage)
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme((e.target as HTMLSelectElement).value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="light">浅色</option>
          <option value="dark">深色</option>
          <option value="auto">自动</option>
        </select>
        <p className="text-sm text-gray-600">
          当前主题: {theme}
        </p>
      </div>

      {/* 用户名输入 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          用户名 (自动保存)
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          placeholder="输入你的用户名"
          className="px-3 py-2 border rounded-lg w-full"
        />
        <p className="text-sm text-gray-600">
          保存的用户名: {username || "未设置"}
        </p>
      </div>

      {/* 防抖搜索 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          搜索 (防抖处理)
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          placeholder="输入搜索关键词..."
          className="px-3 py-2 border rounded-lg w-full"
        />
        <p className="text-sm text-gray-600">
          实际搜索词: {debouncedSearchTerm || "无"}
        </p>
      </div>
    </div>
  );
}
