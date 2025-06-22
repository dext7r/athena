import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

/**
 * BackToTop 工具函数测试
 * 测试 BackToTop 组件相关的工具函数和算法
 */

// 滚动进度计算工具函数测试
Deno.test("BackToTop Utils - 滚动进度计算", () => {
  // 滚动进度计算函数
  const calculateScrollProgress = (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
  ): number => {
    const maxScroll = scrollHeight - clientHeight;
    return maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
  };

  // 基本功能测试
  assertEquals(calculateScrollProgress(0, 1000, 500), 0, "顶部位置应该是 0%");
  assertEquals(
    calculateScrollProgress(250, 1000, 500),
    0.5,
    "中间位置应该是 50%",
  );
  assertEquals(
    calculateScrollProgress(500, 1000, 500),
    1,
    "底部位置应该是 100%",
  );

  // 边界情况测试
  assertEquals(
    calculateScrollProgress(-100, 1000, 500),
    0,
    "负数滚动应该限制为 0%",
  );
  assertEquals(
    calculateScrollProgress(1000, 1000, 500),
    1,
    "超出最大滚动应该限制为 100%",
  );
  assertEquals(
    calculateScrollProgress(100, 500, 500),
    0,
    "无滚动空间应该是 0%",
  );
  assertEquals(
    calculateScrollProgress(100, 400, 500),
    0,
    "客户端高度大于滚动高度应该是 0%",
  );
});

// 缓动函数测试
Deno.test("BackToTop Utils - 缓动函数", () => {
  // easeOutCubic 缓动函数
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // 测试缓动函数的关键点
  assertEquals(easeOutCubic(0), 0, "起始点应该是 0");
  assertEquals(easeOutCubic(1), 1, "结束点应该是 1");

  // 测试中间值的单调性
  const midPoint = easeOutCubic(0.5);
  assertEquals(midPoint > 0.5, true, "中点应该大于 0.5（快速开始）");
  assertEquals(midPoint < 1, true, "中点应该小于 1");

  // 测试函数的平滑性
  const values = [0, 0.25, 0.5, 0.75, 1].map(easeOutCubic);
  for (let i = 1; i < values.length; i++) {
    assertEquals(values[i] > values[i - 1], true, "缓动函数应该是单调递增的");
  }
});

// 颜色插值工具函数测试
Deno.test("BackToTop Utils - 颜色插值", () => {
  // 颜色插值函数
  const interpolateColor = (
    startColor: { r: number; g: number; b: number },
    endColor: { r: number; g: number; b: number },
    progress: number,
  ): { r: number; g: number; b: number } => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    return {
      r: Math.round(
        startColor.r + (endColor.r - startColor.r) * clampedProgress,
      ),
      g: Math.round(
        startColor.g + (endColor.g - startColor.g) * clampedProgress,
      ),
      b: Math.round(
        startColor.b + (endColor.b - startColor.b) * clampedProgress,
      ),
    };
  };

  const startColor = { r: 255, g: 0, b: 0 }; // 红色
  const endColor = { r: 0, g: 255, b: 0 }; // 绿色

  // 测试起始和结束颜色
  assertEquals(
    interpolateColor(startColor, endColor, 0),
    startColor,
    "进度 0 应该返回起始颜色",
  );
  assertEquals(
    interpolateColor(startColor, endColor, 1),
    endColor,
    "进度 1 应该返回结束颜色",
  );

  // 测试中间颜色
  const midColor = interpolateColor(startColor, endColor, 0.5);
  assertEquals(midColor.r, 128, "中间红色分量应该是 128");
  assertEquals(midColor.g, 128, "中间绿色分量应该是 128");
  assertEquals(midColor.b, 0, "中间蓝色分量应该是 0");

  // 测试边界情况
  assertEquals(
    interpolateColor(startColor, endColor, -0.5),
    startColor,
    "负数进度应该返回起始颜色",
  );
  assertEquals(
    interpolateColor(startColor, endColor, 1.5),
    endColor,
    "超过 1 的进度应该返回结束颜色",
  );
});

// RGB 转字符串工具函数测试
Deno.test("BackToTop Utils - RGB 转字符串", () => {
  // RGB 转字符串函数
  const rgbToString = (r: number, g: number, b: number): string => {
    const clampValue = (value: number) =>
      Math.max(0, Math.min(255, Math.round(value)));
    return `rgb(${clampValue(r)}, ${clampValue(g)}, ${clampValue(b)})`;
  };

  // 基本功能测试
  assertEquals(rgbToString(255, 0, 0), "rgb(255, 0, 0)", "红色应该正确转换");
  assertEquals(rgbToString(0, 255, 0), "rgb(0, 255, 0)", "绿色应该正确转换");
  assertEquals(rgbToString(0, 0, 255), "rgb(0, 0, 255)", "蓝色应该正确转换");

  // 边界情况测试
  assertEquals(
    rgbToString(-10, 300, 128.7),
    "rgb(0, 255, 129)",
    "应该正确处理超出范围的值",
  );
  assertEquals(
    rgbToString(128.4, 128.6, 128.5),
    "rgb(128, 129, 129)",
    "应该正确舍入小数",
  );
});

// 滚动容器检测工具函数测试
Deno.test("BackToTop Utils - 滚动容器检测", () => {
  // 模拟滚动容器检测函数
  const findScrollContainer = (selectors: string[]): HTMLElement | null => {
    // 模拟 DOM 查询逻辑
    for (const selector of selectors) {
      if (selector === 'main[class*="overflow-y-auto"]') {
        return {
          scrollTop: 100,
          scrollHeight: 1000,
          clientHeight: 500,
          tagName: "MAIN",
        } as HTMLElement;
      }
      if (selector === 'div[class*="scroll-container"]') {
        return {
          scrollTop: 200,
          scrollHeight: 2000,
          clientHeight: 600,
          tagName: "DIV",
        } as HTMLElement;
      }
    }
    return null;
  };

  // 测试找到容器的情况
  const container1 = findScrollContainer(['main[class*="overflow-y-auto"]']);
  assertEquals(container1?.tagName, "MAIN", "应该找到 main 容器");
  assertEquals(container1?.scrollTop, 100, "应该返回正确的 scrollTop");

  // 测试多个选择器的情况
  const container2 = findScrollContainer([
    'div[class*="non-existent"]',
    'div[class*="scroll-container"]',
  ]);
  assertEquals(container2?.tagName, "DIV", "应该找到第二个匹配的容器");

  // 测试找不到容器的情况
  const container3 = findScrollContainer(['div[class*="non-existent"]']);
  assertEquals(container3, null, "找不到容器时应该返回 null");
});

// 防抖工具函数测试
Deno.test("BackToTop Utils - 防抖函数", async () => {
  // 防抖函数实现
  // deno-lint-ignore no-explicit-any
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void => {
    let timeoutId: number | null = null;

    return (...args: Parameters<T>) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    };
  };

  let callCount = 0;
  let lastValue = "";

  const testFunction = (value: string) => {
    callCount++;
    lastValue = value;
  };

  const debouncedFunction = debounce(testFunction, 100);

  // 快速连续调用
  debouncedFunction("第一次");
  debouncedFunction("第二次");
  debouncedFunction("第三次");

  // 此时函数还没有执行
  assertEquals(callCount, 0, "防抖期间函数不应该执行");

  // 等待防抖延迟
  await new Promise((resolve) => setTimeout(resolve, 150));

  // 现在函数应该只执行了一次，使用最后的值
  assertEquals(callCount, 1, "防抖后函数应该只执行一次");
  assertEquals(lastValue, "第三次", "应该使用最后一次调用的参数");
});

// 节流工具函数测试
Deno.test("BackToTop Utils - 节流函数", async () => {
  // 节流函数实现
  // deno-lint-ignore no-explicit-any
  const throttle = <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void => {
    let lastCallTime = 0;

    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallTime >= delay) {
        func(...args);
        lastCallTime = now;
      }
    };
  };

  let callCount = 0;
  const values: string[] = [];

  const testFunction = (value: string) => {
    callCount++;
    values.push(value);
  };

  const throttledFunction = throttle(testFunction, 50);

  // 快速连续调用
  throttledFunction("第一次");
  await new Promise((resolve) => setTimeout(resolve, 10));
  throttledFunction("第二次");
  await new Promise((resolve) => setTimeout(resolve, 10));
  throttledFunction("第三次");
  await new Promise((resolve) => setTimeout(resolve, 60));
  throttledFunction("第四次");

  // 验证节流效果
  assertEquals(callCount, 2, "节流函数应该只执行 2 次");
  assertEquals(values[0], "第一次", "第一次调用应该立即执行");
  assertEquals(values[1], "第四次", "第二次执行应该是延迟后的调用");
});

// 数值范围限制工具函数测试
Deno.test("BackToTop Utils - 数值范围限制", () => {
  // 数值限制函数
  const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  };

  // 基本功能测试
  assertEquals(clamp(5, 0, 10), 5, "范围内的值应该保持不变");
  assertEquals(clamp(-5, 0, 10), 0, "小于最小值应该返回最小值");
  assertEquals(clamp(15, 0, 10), 10, "大于最大值应该返回最大值");

  // 边界情况测试
  assertEquals(clamp(0, 0, 10), 0, "等于最小值应该返回最小值");
  assertEquals(clamp(10, 0, 10), 10, "等于最大值应该返回最大值");
  assertEquals(clamp(5, 5, 5), 5, "最小值等于最大值时应该返回该值");

  // 特殊值测试
  assertEquals(clamp(NaN, 0, 10), NaN, "NaN 应该返回 NaN");
  assertEquals(clamp(Infinity, 0, 10), 10, "正无穷应该返回最大值");
  assertEquals(clamp(-Infinity, 0, 10), 0, "负无穷应该返回最小值");
});

// 百分比格式化工具函数测试
Deno.test("BackToTop Utils - 百分比格式化", () => {
  // 百分比格式化函数
  const formatPercentage = (value: number, decimals: number = 0): string => {
    const clampedValue = Math.max(0, Math.min(1, value));
    const percentage = clampedValue * 100;
    return `${percentage.toFixed(decimals)}%`;
  };

  // 基本功能测试
  assertEquals(formatPercentage(0), "0%", "0 应该格式化为 0%");
  assertEquals(formatPercentage(0.5), "50%", "0.5 应该格式化为 50%");
  assertEquals(formatPercentage(1), "100%", "1 应该格式化为 100%");

  // 小数位数测试
  assertEquals(formatPercentage(0.123, 1), "12.3%", "应该正确处理 1 位小数");
  assertEquals(formatPercentage(0.123, 2), "12.30%", "应该正确处理 2 位小数");

  // 边界情况测试
  assertEquals(formatPercentage(-0.5), "0%", "负数应该限制为 0%");
  assertEquals(formatPercentage(1.5), "100%", "超过 1 应该限制为 100%");
});
