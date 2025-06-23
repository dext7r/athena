import { type PageProps } from "fresh";
import CustomCursor from "../islands/CustomCursor.tsx";
import GlobalLanguageProvider from "../islands/GlobalLanguageProvider.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="description"
          content="Athena - 现代化全栈开发模板，基于 Fresh + Deno + TypeScript + TailwindCSS"
        />

        {/* 字体预加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* 优化字体加载 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <title>Athena - 现代化全栈开发模板</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.ico" />

        {/* 统计代码 */}
        <script
          charset="UTF-8"
          id="LA_COLLECT"
          src="//sdk.51.la/js-sdk-pro.min.js"
        >
        </script>
        <script>
          {`LA.init({id:"Kr9tLzI2sYFaBhD8",ck:"Kr9tLzI2sYFaBhD8",autoTrack:true,hashMode:true,screenRecord:true})`}
        </script>
        <script>
          {`
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?fb5594b323c07150e5b02e962afff5a5";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
          `}
        </script>

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0JPB8YT9RD"
        >
        </script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0JPB8YT9RD');
          `}
        </script>

        {/* 页面加载动画样式 */}
        <style>
          {`
          .page-loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
          }
          
          .page-loading.hidden {
            opacity: 0;
            visibility: hidden;
          }
          
          .loading-content {
            text-align: center;
            color: white;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }
          
          .loading-text {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 500;
            opacity: 0.9;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* 页面内容初始隐藏 */
          .page-content {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
          }
          
          .page-content.loaded {
            opacity: 1;
            transform: translateY(0);
          }
        `}
        </style>
      </head>
      <body className="font-sans antialiased bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
        <GlobalLanguageProvider>
          {/* 页面加载动画 */}
          <div id="page-loading" className="page-loading">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <div className="loading-text">Athena 正在加载...</div>
            </div>
          </div>

          {/* 页面内容 */}
          <div id="page-content" className="page-content">
            <Component />
          </div>

          {/* 自定义光标 */}
          <CustomCursor />
        </GlobalLanguageProvider>

        {/* 页面加载完成脚本 */}
        <script>
          {`
          document.addEventListener('DOMContentLoaded', function() {
            const loading = document.getElementById('page-loading');
            const content = document.getElementById('page-content');
            
            // 模拟加载时间
            setTimeout(() => {
              if (loading) {
                loading.classList.add('hidden');
              }
              if (content) {
                content.classList.add('loaded');
              }
              
              // 移除加载元素
              setTimeout(() => {
                if (loading) {
                  loading.remove();
                }
              }, 500);
            }, 800);
          });
          
          // 页面可见性API优化
          document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
              // 页面隐藏时暂停动画
              document.body.style.animationPlayState = 'paused';
            } else {
              // 页面显示时恢复动画
              document.body.style.animationPlayState = 'running';
            }
          });
          
          // 滚动性能优化
          let ticking = false;
          function updateScrollAnimations() {
            const scrollElements = document.querySelectorAll('.scroll-animate');
            const scrollTop = window.pageYOffset;
            
            scrollElements.forEach(element => {
              const elementTop = element.offsetTop;
              const elementHeight = element.offsetHeight;
              const windowHeight = window.innerHeight;
              
              if (scrollTop + windowHeight > elementTop + elementHeight / 4) {
                element.classList.add('in-view');
              }
            });
            
            ticking = false;
          }
          
          function requestScrollTick() {
            if (!ticking) {
              requestAnimationFrame(updateScrollAnimations);
              ticking = true;
            }
          }
          
          window.addEventListener('scroll', requestScrollTick, { passive: true });
          
          // 初始检查
          updateScrollAnimations();
        `}
        </script>
      </body>
    </html>
  );
}
