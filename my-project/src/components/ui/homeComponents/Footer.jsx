import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral-900 text-base-content">
      <nav className="grid grid-flow-col gap-4 text-white mt-2">
        <a className="link link-hover" href="/about">
          About us
        </a>
      </nav>
      <aside className="text-white">
        <p>Copyright © 2024</p>
      </aside>
    </footer>
  );
};

export default Footer;
