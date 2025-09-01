import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "./components/MainNavComp/MainNavbar";
import Cart from "./components/common/Cart";

const BasePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <MainNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
        <Outlet />
      </main>

      {/* Cart */}
      <Cart />

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-2 text-center w-full">
        <div>All Rights Reserved © 2025</div>
      </footer>
    </div>
  );
};

export default BasePage;