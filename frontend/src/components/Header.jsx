import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "@/components/Login";

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
        <span className="text-sm font-semibold leading-6 text-slate-100">
          <Dialog>
            <DialogTrigger>Zaloguj</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Witamy</DialogTitle>
                <DialogDescription>
                  Logowanie
                </DialogDescription>
                <Login />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </span>

      </nav>
    </header>
  );
}

export default Header;
