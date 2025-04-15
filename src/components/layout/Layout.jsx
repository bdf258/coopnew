import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f6f8f2" }}>
    <Header />
    <main className="flex-1 container mx-auto px-2 md:px-0 max-w-xl w-full mt-8 mb-12">{children}</main>
    <Footer />
  </div>
);

export default Layout;
