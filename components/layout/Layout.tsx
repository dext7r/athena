import { JSX } from "preact";
import LayoutManager from "@islands/LayoutManager.tsx";

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
  showSidebar?: boolean;
}

const Layout = ({ children, title, showSidebar = true }: LayoutProps) => {
  return (
    <LayoutManager title={title} showSidebar={showSidebar}>
      {children}
    </LayoutManager>
  );
};

export default Layout;
