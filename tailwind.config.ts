import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class", // 启用基于class的暗色模式
  theme: {
    extend: {
      // 现代化字体系统
      fontFamily: {
        "sans": [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        "mono": [
          '"JetBrains Mono"',
          '"Fira Code"',
          "Consolas",
          '"Liberation Mono"',
          "Menlo",
          "Monaco",
          "monospace",
        ],
        "display": [
          '"Inter Display"',
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },

      // 扩展颜色系统
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        accent: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
      },

      // 间距系统
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },

      // 字体大小系统
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1rem" }],
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.5rem" }],
        "lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      // 阴影系统
      boxShadow: {
        "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "glow": "0 0 20px rgba(59, 130, 246, 0.15)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.2)",
        "colored": "0 8px 32px rgba(59, 130, 246, 0.12)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },

      // 边框圆角
      borderRadius: {
        "none": "0",
        "sm": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // 动画时长
      transitionDuration: {
        "0": "0ms",
        "75": "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
        "2000": "2000ms",
      },

      // 动画系统大幅增强
      animation: {
        // 基础动画
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "slide-left": "slideLeft 0.4s ease-out",
        "slide-right": "slideRight 0.4s ease-out",
        "zoom-in": "zoomIn 0.3s ease-out",
        "zoom-out": "zoomOut 0.3s ease-out",

        // 旋转动画
        "spin-slow": "spin 2s linear infinite",
        "spin-fast": "spin 0.5s linear infinite",
        "rotate-glow": "rotateGlow 3s linear infinite",

        // 脉冲和发光
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "glow-ring": "glowRing 2.5s ease-in-out infinite",

        // 浮动动画
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "floatDelayed 8s ease-in-out infinite",
        "float-small": "floatSmall 4s ease-in-out infinite",

        // 弹跳和缩放
        "bounce-scale": "bounceScale 0.6s ease-in-out",
        "bounce-gentle": "bounceGentle 1s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
        "scale-down": "scaleDown 0.2s ease-out",

        // 渐变和流动
        "gradient-flow": "gradientFlow 8s ease-in-out infinite",
        "gradient-shift": "gradientShift 4s ease-in-out infinite",
        "text-gradient": "textGradient 4s ease infinite",

        // 摇摆和震动
        "wiggle": "wiggle 1s ease-in-out infinite",
        "shake": "shake 0.5s ease-in-out",
        "vibrate": "vibrate 0.3s ease-in-out",

        // 页面过渡
        "page-enter": "pageEnter 0.5s ease-out",
        "page-exit": "pageExit 0.3s ease-in",

        // 加载动画
        "loading-dots": "loadingDots 1.4s ease-in-out infinite",
        "loading-bars": "loadingBars 1.2s ease-in-out infinite",
        "skeleton": "skeleton 2s ease-in-out infinite",
      },

      keyframes: {
        // 基础进出动画
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        zoomOut: {
          "0%": { transform: "scale(1.1)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },

        // 旋转动画
        rotateGlow: {
          "0%": { transform: "rotate(0deg)", filter: "brightness(1)" },
          "50%": { transform: "rotate(180deg)", filter: "brightness(1.2)" },
          "100%": { transform: "rotate(360deg)", filter: "brightness(1)" },
        },

        // 发光动画
        glowPulse: {
          "0%, 100%": {
            "box-shadow": "0 0 5px rgba(59, 130, 246, 0.3)",
            "filter": "brightness(1)",
          },
          "50%": {
            "box-shadow":
              "0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)",
            "filter": "brightness(1.1)",
          },
        },
        glowRing: {
          "0%, 100%": {
            "box-shadow": "0 0 0 0 rgba(59, 130, 246, 0.7)",
          },
          "70%": {
            "box-shadow": "0 0 0 10px rgba(59, 130, 246, 0)",
          },
        },

        // 浮动动画
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-10px) scale(1.05)", opacity: "0.8" },
        },
        floatDelayed: {
          "0%, 100%": { transform: "translateY(0px) scale(1)", opacity: "0.4" },
          "50%": { transform: "translateY(10px) scale(0.95)", opacity: "0.6" },
        },
        floatSmall: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },

        // 弹跳和缩放
        bounceScale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        bounceGentle: {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },

        // 渐变动画
        gradientFlow: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        gradientShift: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        textGradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },

        // 摇摆动画
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        vibrate: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
        },

        // 页面过渡
        pageEnter: {
          "0%": {
            transform: "translateY(20px) scale(0.98)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
        pageExit: {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-20px) scale(0.98)",
            opacity: "0",
          },
        },

        // 加载动画
        loadingDots: {
          "0%, 80%, 100%": {
            transform: "scale(0)",
            opacity: "0.5",
          },
          "40%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        loadingBars: {
          "0%, 40%, 100%": {
            transform: "scaleY(0.4)",
          },
          "20%": {
            transform: "scaleY(1.0)",
          },
        },
        skeleton: {
          "0%": {
            "background-position": "-200px 0",
          },
          "100%": {
            "background-position": "calc(200px + 100%) 0",
          },
        },
      },

      // 背景图案
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid":
          "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        "dots":
          "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
      },

      // 背景尺寸
      backgroundSize: {
        "grid": "20px 20px",
        "dots": "20px 20px",
      },
    },
  },
  plugins: [],
} satisfies Config;
