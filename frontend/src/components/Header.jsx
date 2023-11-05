import React from "react";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-slate-900">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a href="#" className="text-sm font-semibold leading-6 text-slate-100">
          {user ? `Zalogowany: ${user.name}` : "Zaloguj się"}
        </a>
      </nav>
    </header>
  );
}

export default Header;
