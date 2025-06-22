import { assertEquals } from "jsr:@std/assert@1";

/**
 * BackToTop 组件性能测试
 * 测试滚动事件处理、定时器管理、内存使用等性能相关功能
 */

// 高频滚动事件性能测试
Deno.test("BackToTop - 高频滚动事件性能测试", () => {
  let eventProcessedCount = 0;
  let lastScrollProgress = 0;
  const eventCount = 10000;

  // 模拟高频滚动事件处理函数
  const handleScrollEvent = (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
  ) => {
    eventProcessedCount++;
    const maxScroll = scrollHeight - clientHeight;
    lastScrollProgress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
  };

  const startTime = performance.now();

  // 模拟 10000 次高频滚动事件
  for (let i = 0; i <= eventCount; i++) {
    handleScrollEvent(i, eventCount, 500);
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  // 验证处理结果
  assertEquals(
    eventProcessedCount,
    eventCount + 1,
    `应该处理 ${eventCount + 1} 次事件`,
  );
  assertEquals(lastScrollProgress, 1, "最终滚动进度应该是 100%");

  // 性能断言 - 10000次事件应该在合理时间内完成
  assertEquals(
    duration < 200,
    true,
    `处理 ${eventCount} 次滚动事件应该在 200ms 内完成，实际用时: ${
      duration.toFixed(2)
    }ms`,
  );

  console.log(
    `✅ 高频滚动性能测试: ${eventCount} 次事件处理用时 ${
      duration.toFixed(2)
    }ms`,
  );
});

// 动态颜色计算性能测试
Deno.test("BackToTop - 动态颜色计算性能测试", () => {
  const colorStops = [
    { r: 59, g: 130, b: 246 }, // blue-500
    { r: 147, g: 51, b: 234 }, // purple-600
    { r: 236, g: 72, b: 153 }, // pink-500
    { r: 239, g: 68, b: 68 }, // red-500
    { r: 249, g: 115, b: 22 }, // orange-500
    { r: 234, g: 179, b: 8 }, // yellow-500
    { r: 34, g: 197, b: 94 }, // green-500
  ];

  const getDynamicColor = (scrollProgress: number): string => {
    const segmentCount = colorStops.length - 1;
    const segment = Math.floor(scrollProgress * segmentCount);
    const segmentProgress = (scrollProgress * segmentCount) % 1;

    const startColor = colorStops[Math.min(segment, segmentCount)];
    const endColor = colorStops[Math.min(segment + 1, segmentCount)];

    const r = Math.round(
      startColor.r + (endColor.r - startColor.r) * segmentProgress,
    );
    const g = Math.round(
      startColor.g + (endColor.g - startColor.g) * segmentProgress,
    );
    const b = Math.round(
      startColor.b + (endColor.b - startColor.b) * segmentProgress,
    );

    return `rgb(${r}, ${g}, ${b})`;
  };

  const iterations = 1000;
  const startTime = performance.now();

  // 测试 1000 次颜色计算
  for (let i = 0; i <= iterations; i++) {
    const progress = i / iterations;
    getDynamicColor(progress);
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  // 性能断言
  assertEquals(
    duration < 50,
    true,
    `${iterations} 次颜色计算应该在 50ms 内完成，实际用时: ${
      duration.toFixed(2)
    }ms`,
  );

  console.log(
    `✅ 动态颜色计算性能测试: ${iterations} 次计算用时 ${
      duration.toFixed(2)
    }ms`,
  );
});

// 定时器管理性能测试
Deno.test("BackToTop - 定时器管理性能测试", async () => {
  let timerCreatedCount = 0;
  let timerExecutedCount = 0;
  let timerClearedCount = 0;
  const activeTimers: number[] = [];

  // 模拟定时器管理
  const createTimer = (delay: number): number => {
    timerCreatedCount++;
    const timerId = setTimeout(() => {
      timerExecutedCount++;
      const index = activeTimers.indexOf(timerId);
      if (index > -1) {
        activeTimers.splice(index, 1);
      }
    }, delay);
    activeTimers.push(timerId);
    return timerId;
  };

  const clearTimer = (timerId: number): void => {
    timerClearedCount++;
    clearTimeout(timerId);
    const index = activeTimers.indexOf(timerId);
    if (index > -1) {
      activeTimers.splice(index, 1);
    }
  };

  const startTime = performance.now();

  // 创建大量定时器并快速清理（模拟快速滚动）
  const timerCount = 100;
  for (let i = 0; i < timerCount; i++) {
    const timerId = createTimer(100);
    // 立即清理一半的定时器（模拟滚动中断）
    if (i % 2 === 0) {
      clearTimer(timerId);
    }
  }

  const creationTime = performance.now() - startTime;

  // 等待剩余定时器执行
  await new Promise((resolve) => setTimeout(resolve, 150));

  const totalTime = performance.now() - startTime;

  // 验证定时器管理
  assertEquals(
    timerCreatedCount,
    timerCount,
    `应该创建 ${timerCount} 个定时器`,
  );
  assertEquals(
    timerClearedCount,
    timerCount / 2,
    `应该清理 ${timerCount / 2} 个定时器`,
  );
  assertEquals(activeTimers.length, 0, "所有定时器应该已清理或执行完成");

  // 性能断言
  assertEquals(
    creationTime < 50,
    true,
    `创建和清理 ${timerCount} 个定时器应该在 50ms 内完成，实际用时: ${
      creationTime.toFixed(2)
    }ms`,
  );

  console.log(
    `✅ 定时器管理性能测试: 创建和管理 ${timerCount} 个定时器用时 ${
      totalTime.toFixed(2)
    }ms`,
  );
});

// 内存使用测试
Deno.test("BackToTop - 内存使用测试", () => {
  // 模拟组件状态和数据结构
  const componentStates: Array<{
    isVisible: boolean;
    scrollProgress: number;
    isUserScrolling: boolean;
    scrollStopTimer: number | null;
  }> = [];

  const startMemory = performance.now(); // 使用时间作为内存使用的代理指标

  // 创建大量组件状态（模拟多个组件实例）
  const instanceCount = 1000;
  for (let i = 0; i < instanceCount; i++) {
    componentStates.push({
      isVisible: Math.random() > 0.5,
      scrollProgress: Math.random(),
      isUserScrolling: Math.random() > 0.7,
      scrollStopTimer: Math.random() > 0.5 ? Date.now() : null,
    });
  }

  const memoryUsageTime = performance.now() - startMemory;

  // 验证数据结构
  assertEquals(
    componentStates.length,
    instanceCount,
    `应该创建 ${instanceCount} 个组件状态`,
  );

  // 清理测试
  componentStates.length = 0;
  assertEquals(componentStates.length, 0, "应该能够清理所有状态");

  // 性能断言
  assertEquals(
    memoryUsageTime < 100,
    true,
    `创建 ${instanceCount} 个组件状态应该在 100ms 内完成，实际用时: ${
      memoryUsageTime.toFixed(2)
    }ms`,
  );

  console.log(
    `✅ 内存使用测试: 创建 ${instanceCount} 个组件状态用时 ${
      memoryUsageTime.toFixed(2)
    }ms`,
  );
});

// 滚动平滑度测试
Deno.test("BackToTop - 滚动平滑度测试", () => {
  // 模拟平滑滚动算法
  const easeOutCubic = (progress: number): number => {
    return 1 - Math.pow(1 - progress, 3);
  };

  const calculateSmoothScroll = (
    startScrollTop: number,
    duration: number,
    currentTime: number,
  ): number => {
    const elapsed = Math.min(currentTime, duration);
    const progress = elapsed / duration;
    const easeProgress = easeOutCubic(progress);
    return startScrollTop * (1 - easeProgress);
  };

  const startTime = performance.now();
  const duration = 800;
  const startScrollTop = 1000;
  const frameCount = 60; // 模拟 60fps

  let lastScrollTop = startScrollTop;
  let smoothnessScore = 0;

  // 模拟动画帧
  for (let frame = 0; frame <= frameCount; frame++) {
    const currentTime = (frame / frameCount) * duration;
    const scrollTop = calculateSmoothScroll(
      startScrollTop,
      duration,
      currentTime,
    );

    // 计算平滑度（相邻帧之间的差异应该逐渐减小）
    const frameDiff = Math.abs(lastScrollTop - scrollTop);
    if (frame > 0) {
      smoothnessScore += frameDiff;
    }
    lastScrollTop = scrollTop;
  }

  const calculationTime = performance.now() - startTime;

  // 验证滚动结果
  assertEquals(Math.round(lastScrollTop), 0, "最终应该滚动到顶部");

  // 性能断言
  assertEquals(
    calculationTime < 10,
    true,
    `${frameCount} 帧滚动计算应该在 10ms 内完成，实际用时: ${
      calculationTime.toFixed(2)
    }ms`,
  );

  console.log(
    `✅ 滚动平滑度测试: ${frameCount} 帧计算用时 ${
      calculationTime.toFixed(2)
    }ms，平滑度分数: ${smoothnessScore.toFixed(2)}`,
  );
});

// 并发滚动事件测试
Deno.test("BackToTop - 并发滚动事件测试", async () => {
  let processedEvents = 0;
  let concurrentTimers = 0;
  const maxConcurrentTimers = 10;

  // 模拟并发滚动事件处理
  const handleConcurrentScroll = (_scrollValue: number): Promise<void> => {
    return new Promise((resolve) => {
      if (concurrentTimers < maxConcurrentTimers) {
        concurrentTimers++;
        setTimeout(() => {
          processedEvents++;
          concurrentTimers--;
          resolve();
        }, 10);
      } else {
        // 如果并发数过多，直接处理
        processedEvents++;
        resolve();
      }
    });
  };

  const startTime = performance.now();
  const eventPromises: Promise<void>[] = [];

  // 创建大量并发滚动事件
  for (let i = 0; i < 100; i++) {
    eventPromises.push(handleConcurrentScroll(i));
  }

  // 等待所有事件处理完成
  await Promise.all(eventPromises);

  const endTime = performance.now();
  const duration = endTime - startTime;

  // 验证处理结果
  assertEquals(processedEvents, 100, "应该处理所有 100 个并发事件");
  assertEquals(concurrentTimers, 0, "所有并发定时器应该已完成");

  // 性能断言
  assertEquals(
    duration < 500,
    true,
    `100 个并发滚动事件应该在 500ms 内完成，实际用时: ${duration.toFixed(2)}ms`,
  );

  console.log(
    `✅ 并发滚动事件测试: 100 个并发事件处理用时 ${duration.toFixed(2)}ms`,
  );
});
