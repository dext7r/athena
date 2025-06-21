import FooterInteractive from "../../islands/FooterInteractive.tsx";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return <FooterInteractive className={className} />;
};

export default Footer;
