import { useCounter } from "@hooks/useCounter.ts";
import { useToggle } from "@hooks/useToggle.ts";
import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";

const CounterDemo = () => {
  const { count, increment, decrement, reset, set } = useCounter(0, {
    min: 0,
    max: 100,
  });
  const [autoIncrement, toggleAutoIncrement] = useToggle(false);

  // 自动递增逻辑
  if (typeof window !== "undefined" && autoIncrement) {
    setTimeout(() => {
      if (count < 100) {
        increment();
      } else {
        toggleAutoIncrement();
      }
    }, 100);
  }

  return (
    <Card variant="hover" className="max-w-md">
      <CardHeader>
        <CardTitle>计数器演示</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-center space-y-6">
          {/* 计数显示 */}
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
            {count}
          </div>

          {/* 进度条 */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* 控制按钮 */}
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={decrement}
              disabled={count <= 0}
            >
              -1
            </Button>

            <Button
              variant="primary"
              onClick={increment}
              disabled={count >= 100}
            >
              +1
            </Button>
          </div>

          {/* 快捷操作 */}
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => set(25)}
            >
              25
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => set(50)}
            >
              50
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => set(75)}
            >
              75
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
            >
              重置
            </Button>
          </div>

          {/* 自动递增 */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant={autoIncrement ? "secondary" : "outline"}
              size="sm"
              onClick={toggleAutoIncrement}
              disabled={count >= 100}
            >
              {autoIncrement ? "停止自动递增" : "开始自动递增"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CounterDemo;
