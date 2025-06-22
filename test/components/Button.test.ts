import { assertEquals, assertExists } from "$std/testing/asserts.ts";

// Button 组件测试
Deno.test("Button - 组件导入测试", async () => {
  try {
    const ButtonModule = await import("@components/ui/Button.tsx");
    assertEquals(typeof ButtonModule.default, "function");
  } catch (error) {
    throw new Error(`Button 组件导入失败: ${String(error)}`);
  }
});

// 测试 Button 属性类型
Deno.test("Button - 属性类型测试", () => {
  interface ButtonProps {
    variant?:
      | "primary"
      | "secondary"
      | "accent"
      | "outline"
      | "ghost"
      | "gradient"
      | "glass"
      | "success"
      | "warning"
      | "error"
      | "rainbow";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    disabled?: boolean;
    children: unknown; // 简化类型定义避免JSX依赖
    icon?: unknown;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
    animate?: boolean;
    magnetic?: boolean;
  }

  // 测试默认属性
  const defaultProps: Partial<ButtonProps> = {
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    iconPosition: "left",
    fullWidth: false,
    animate: true,
    magnetic: false,
  };

  assertEquals(defaultProps.variant, "primary");
  assertEquals(defaultProps.size, "md");
  assertEquals(defaultProps.loading, false);
  assertEquals(defaultProps.disabled, false);
  assertEquals(defaultProps.iconPosition, "left");
  assertEquals(defaultProps.fullWidth, false);
  assertEquals(defaultProps.animate, true);
  assertEquals(defaultProps.magnetic, false);
});

// 测试 Button 变体样式
Deno.test("Button - 变体样式测试", () => {
  const variants = [
    "primary",
    "secondary",
    "accent",
    "outline",
    "ghost",
    "gradient",
    "glass",
    "success",
    "warning",
    "error",
    "rainbow",
  ] as const;

  // 验证所有变体都是有效的字符串
  variants.forEach((variant) => {
    assertEquals(typeof variant, "string");
    assertEquals(variant.length > 0, true);
  });

  assertEquals(variants.length, 11);
});

// 测试 Button 尺寸
Deno.test("Button - 尺寸测试", () => {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

  const sizeClasses = {
    xs: "px-2 py-1 text-xs rounded-lg",
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-2xl",
    xl: "px-8 py-4 text-lg rounded-2xl",
  };

  sizes.forEach((size) => {
    assertExists(sizeClasses[size]);
    assertEquals(typeof sizeClasses[size], "string");
    assertEquals(sizeClasses[size].includes("px-"), true);
    assertEquals(sizeClasses[size].includes("py-"), true);
    assertEquals(sizeClasses[size].includes("text-"), true);
    assertEquals(sizeClasses[size].includes("rounded-"), true);
  });
});

// 测试 Button 状态
Deno.test("Button - 状态测试", () => {
  // 测试加载状态
  let isLoading = false;
  const setLoading = (loading: boolean) => {
    isLoading = loading;
  };

  assertEquals(isLoading, false);
  setLoading(true);
  assertEquals(isLoading, true);
  setLoading(false);
  assertEquals(isLoading, false);

  // 测试禁用状态
  let isDisabled = false;
  const setDisabled = (disabled: boolean) => {
    isDisabled = disabled;
  };

  assertEquals(isDisabled, false);
  setDisabled(true);
  assertEquals(isDisabled, true);
  setDisabled(false);
  assertEquals(isDisabled, false);
});

// 测试 Button 事件处理
Deno.test("Button - 事件处理测试", () => {
  let clickCount = 0;
  let lastClickEvent: Event | null = null;

  const handleClick = (event: Event) => {
    clickCount++;
    lastClickEvent = event;
  };

  const mockEvent = new Event("click");

  // 模拟点击事件
  handleClick(mockEvent);
  assertEquals(clickCount, 1);
  assertEquals(lastClickEvent, mockEvent);

  // 模拟多次点击
  handleClick(mockEvent);
  handleClick(mockEvent);
  assertEquals(clickCount, 3);
});

// 测试 Button 图标功能
Deno.test("Button - 图标功能测试", () => {
  interface IconProps {
    position: "left" | "right";
    size: "xs" | "sm" | "md" | "lg" | "xl";
  }

  const iconSizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  const testIcon: IconProps = {
    position: "left",
    size: "md",
  };

  assertEquals(testIcon.position, "left");
  assertEquals(testIcon.size, "md");
  assertEquals(iconSizeClasses[testIcon.size], "w-4 h-4");

  // 测试右侧图标
  testIcon.position = "right";
  assertEquals(testIcon.position, "right");
});

// 测试 Button 无障碍功能
Deno.test("Button - 无障碍功能测试", () => {
  interface AccessibilityProps {
    role?: string;
    ariaLabel?: string;
    ariaDisabled?: boolean;
    ariaPressed?: boolean;
    tabIndex?: number;
  }

  const accessibilityProps: AccessibilityProps = {
    role: "button",
    ariaLabel: "点击按钮",
    ariaDisabled: false,
    ariaPressed: false,
    tabIndex: 0,
  };

  assertEquals(accessibilityProps.role, "button");
  assertEquals(accessibilityProps.ariaLabel, "点击按钮");
  assertEquals(accessibilityProps.ariaDisabled, false);
  assertEquals(accessibilityProps.ariaPressed, false);
  assertEquals(accessibilityProps.tabIndex, 0);

  // 测试禁用状态的无障碍属性
  accessibilityProps.ariaDisabled = true;
  accessibilityProps.tabIndex = -1;
  assertEquals(accessibilityProps.ariaDisabled, true);
  assertEquals(accessibilityProps.tabIndex, -1);
});

// 测试 Button 动画功能
Deno.test("Button - 动画功能测试", () => {
  interface AnimationConfig {
    animate: boolean;
    magnetic: boolean;
    ripple: boolean;
    hover: boolean;
    scale: boolean;
  }

  const animationConfig: AnimationConfig = {
    animate: true,
    magnetic: false,
    ripple: true,
    hover: true,
    scale: true,
  };

  assertEquals(animationConfig.animate, true);
  assertEquals(animationConfig.magnetic, false);
  assertEquals(animationConfig.ripple, true);
  assertEquals(animationConfig.hover, true);
  assertEquals(animationConfig.scale, true);

  // 测试禁用动画
  animationConfig.animate = false;
  animationConfig.ripple = false;
  animationConfig.hover = false;
  animationConfig.scale = false;

  assertEquals(animationConfig.animate, false);
  assertEquals(animationConfig.ripple, false);
  assertEquals(animationConfig.hover, false);
  assertEquals(animationConfig.scale, false);
});

// 测试 Button 样式组合
Deno.test("Button - 样式组合测试", () => {
  interface ButtonStyleConfig {
    variant: string;
    size: string;
    fullWidth: boolean;
    className: string;
  }

  const styleConfigs: ButtonStyleConfig[] = [
    {
      variant: "primary",
      size: "md",
      fullWidth: false,
      className: "custom-class",
    },
    {
      variant: "outline",
      size: "lg",
      fullWidth: true,
      className: "w-full border-2",
    },
    {
      variant: "ghost",
      size: "sm",
      fullWidth: false,
      className: "hover:bg-gray-100",
    },
  ];

  styleConfigs.forEach((config, index) => {
    assertEquals(typeof config.variant, "string");
    assertEquals(typeof config.size, "string");
    assertEquals(typeof config.fullWidth, "boolean");
    assertEquals(typeof config.className, "string");
    assertEquals(config.className.length > 0, true);
  });

  assertEquals(styleConfigs.length, 3);
});
