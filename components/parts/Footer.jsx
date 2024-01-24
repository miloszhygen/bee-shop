/*

  <Footer />

*/

import Link from "next/link";

const linkStyle = "pr-2 hover:underline";

const Footer = () => {
  return (
    <footer className="py-8 px-4 flex text-sm">
      <Link className={linkStyle} href="/terms-of-service">
        Terms
      </Link>
      <Link className={linkStyle} href="/privacy-policy">
        Privacy
      </Link>
      <Link className={linkStyle} href="/faq">
        FAQ
      </Link>
      <Link className={linkStyle} href="/accessibility">
        Accessibility
      </Link>
    </footer>
  );
};

export default Footer;
