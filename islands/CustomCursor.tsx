import { useEffect, useRef, useState } from "preact/hooks";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  cursorType:
    | "default"
    | "hover"
    | "link"
    | "button"
    | "text"
    | "disabled"
    | "loading";
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    cursorType: "default",
  });

  useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let followerX = 0;
    let followerY = 0;

    // 鼠标移动处理
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // 鼠标按下处理
    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
      document.body.classList.add("cursor-click");
    };

    // 鼠标松开处理
    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
      document.body.classList.remove("cursor-click");
    };

    // 鼠标进入元素处理
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.matches('a, [role="link"]')) {
        setCursorState((prev) => ({
          ...prev,
          cursorType: "link",
          isHovering: true,
        }));
        document.body.classList.add("cursor-link");
      } else if (target.matches('button, [role="button"], .btn, .clickable')) {
        setCursorState((prev) => ({
          ...prev,
          cursorType: "button",
          isHovering: true,
        }));
        document.body.classList.add("cursor-button");
      } else if (target.matches("input, textarea, [contenteditable]")) {
        setCursorState((prev) => ({
          ...prev,
          cursorType: "text",
          isHovering: true,
        }));
        document.body.classList.add("cursor-text");
      } else if (target.matches("[disabled], .disabled")) {
        setCursorState((prev) => ({
          ...prev,
          cursorType: "disabled",
          isHovering: true,
        }));
        document.body.classList.add("cursor-disabled");
      } else if (target.matches(".loading, .cursor-loading")) {
        setCursorState((prev) => ({
          ...prev,
          cursorType: "loading",
          isHovering: true,
        }));
        document.body.classList.add("cursor-loading");
      } else if (target.matches(".hover-target, .card, .nav-link")) {
        setCursorState((prev) => ({
          ...prev,
          cursorType: "hover",
          isHovering: true,
        }));
        document.body.classList.add("cursor-hover");
      }
    };

    // 鼠标离开元素处理
    const handleMouseLeave = () => {
      setCursorState((prev) => ({
        ...prev,
        cursorType: "default",
        isHovering: false,
      }));
      document.body.classList.remove(
        "cursor-link",
        "cursor-button",
        "cursor-text",
        "cursor-disabled",
        "cursor-loading",
        "cursor-hover",
      );
    };

    // 平滑动画更新
    const updateCursor = () => {
      const speed = 0.15;
      const followerSpeed = 0.08;

      // 主光标跟随
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      // 跟随光标
      followerX += (mouseX - followerX) * followerSpeed;
      followerY += (mouseY - followerY) * followerSpeed;

      // 更新位置
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${currentX}px, ${currentY}px)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform =
          `translate(${followerX}px, ${followerY}px)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    // 磁性吸附效果
    const handleMagneticElements = () => {
      const magneticElements = document.querySelectorAll(".magnetic-element");

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2),
        );

        if (distance < 100) {
          const strength = (100 - distance) / 100;
          const deltaX = (mouseX - centerX) * strength * 0.3;
          const deltaY = (mouseY - centerY) * strength * 0.3;

          (element as HTMLElement).style.transform =
            `translate(${deltaX}px, ${deltaY}px)`;
        } else {
          (element as HTMLElement).style.transform = "translate(0px, 0px)";
        }
      });
    };

    // 事件监听器
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // 使用事件委托处理悬停
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    // 启动动画循环
    updateCursor();

    // 磁性效果更新
    const magneticInterval = setInterval(handleMagneticElements, 16);

    // 清理函数
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      clearInterval(magneticInterval);

      // 清理样式类
      document.body.classList.remove(
        "cursor-click",
        "cursor-link",
        "cursor-button",
        "cursor-text",
        "cursor-disabled",
        "cursor-loading",
        "cursor-hover",
      );
    };
  }, []);

  // 检测是否为移动设备
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(globalThis.innerWidth <= 768 || "ontouchstart" in window);
    };

    checkMobile();
    globalThis.addEventListener("resize", checkMobile);

    return () => globalThis.removeEventListener("resize", checkMobile);
  }, []);

  // 移动设备不显示自定义光标
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* 主光标 */}
      <div
        ref={cursorRef}
        className="cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-mode-difference"
        style={{
          width: "20px",
          height: "20px",
          background: "rgba(59, 130, 246, 0.8)",
          borderRadius: "50%",
          transition: "all 0.1s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 跟随光标 */}
      <div
        ref={followerRef}
        className="cursor-follower fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: "8px",
          height: "8px",
          background: "rgba(59, 130, 246, 1)",
          borderRadius: "50%",
          transition: "all 0.15s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 光标指示器 */}
      <div
        className="cursor-indicator fixed pointer-events-none z-[9996] text-xs opacity-0 transition-opacity duration-200"
        style={{
          color: "rgba(59, 130, 246, 0.8)",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "4px 8px",
          borderRadius: "4px",
          transform: "translate(-50%, -100%)",
        }}
      />
    </>
  );
}
