import React from "react";

const Footer = () => (
  <footer className="w-full" style={{ backgroundColor: "#064c39" }}>
    <div className="p-4 text-center text-xs text-white">
      Creating a housing co-op?{' '}
      <a
        href="https://joinstead.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-semibold hover:text-green-200"
      >
        Join Stead
      </a>{' '}
      to access finance, support, and a community of fellow co-operatives.
    </div>
  </footer>
);

export default Footer;
