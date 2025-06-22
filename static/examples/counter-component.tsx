import { useCounterStore } from "./counter-store.ts";

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="space-y-4">
      <div className="text-4xl font-bold text-center">
        计数: {count}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          +1
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          重置
        </button>
      </div>
    </div>
  );
}
