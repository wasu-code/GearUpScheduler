import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Login from "@/components/Login";
import { useModal } from "@/context/ModalContext";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function Header() {
  const { user, logout } = useAuth();
  const { toast } = useToast()
  const { loginVisible, registerVisible, setLoginVisible, setRegisterVisible } =
    useModal();

  const handleOpenChange = (visible) => {
    setLoginVisible(loginVisible && visible);
    setRegisterVisible(registerVisible && visible);

    if (!loginVisible && !registerVisible) {
      setLoginVisible(true);
    }
  };

  const handleLogout = () => {
    const success = logout();
    if (success) {
      toast({
        title: "Wylogowano"
      })
    }
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-slate-900">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <span className="text-sm font-semibold leading-6 text-slate-100">  
          <Link to={"/"} className="text-2xl font-bold mr-10">  
            GearUpScheduler
          </Link>
          {/* {user && `Zalogowany: ${user.name}`} */}
          {user && (
            <Link to={user.role === "ADMIN" ? "/mechanic" : "/profile"}>
              <Button type="button" variant="secondary">
                Sprawdź wizyty
              </Button>
            </Link>
          )}
        </span>
        <span className="text-sm font-semibold leading-6 text-slate-100">
          {user ? 
            <Button 
              type="button" 
              variant="secondary"
              onClick={handleLogout}
              >
              Wyloguj
            </Button>
          :
            <Dialog
              open={loginVisible || registerVisible}
              onOpenChange={handleOpenChange}
            >
              <DialogTrigger asChild>
                <Button type="button" variant="secondary">
                  Zaloguj się
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Witamy</DialogTitle>
                  <DialogDescription>Logowanie</DialogDescription>
                </DialogHeader>
                <Login />
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      id="closeLoginButton"
                      className="hidden"
                    >
                      Zamknij
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        </span>
      </nav>
    </header>
  );
}

export default Header;
