import LayoutManager from "@islands/LayoutManager.tsx";
import { JSX } from "preact";

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
  showSidebar?: boolean;
  /** 是否显示返回顶部按钮，默认 true */
  showBackToTop?: boolean;
  /** 返回顶部按钮样式变体 */
  backToTopVariant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** 返回顶部按钮显示阈值，默认 300px */
  backToTopThreshold?: number;
  /** 强制显示返回顶部按钮（用于调试），默认 false */
  backToTopForceVisible?: boolean;
}

const Layout = ({
  children,
  title,
  showSidebar = true,
  showBackToTop = true,
  backToTopVariant = "primary",
  backToTopThreshold = 300,
  backToTopForceVisible = false,
}: LayoutProps) => {
  return (
    <LayoutManager
      title={title}
      showSidebar={showSidebar}
      showBackToTop={showBackToTop}
      backToTopVariant={backToTopVariant}
      backToTopThreshold={backToTopThreshold}
      backToTopForceVisible={backToTopForceVisible}
    >
      {children}
    </LayoutManager>
  );
};

export default Layout;
