import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [messageBox, setMessageBox] = useState([]);
  const { login, register } = useAuth();
  const { loginVisible, setLoginVisible, registerVisible, setRegisterVisible } =
    useModal();

  const handleTabs = (tab) => {
    setLoginVisible(tab === "login");
    setRegisterVisible(tab === "register");
  };

  const handleLogin = async () => {
    setLoading(true);
    let messages = await login(email, password);
    setMessageBox(messages);
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    let messages = [];
    if (newPassword == repeatedPassword) {
      messages = await register(newName, newSurname, newPassword, newEmail);
    } else {
      messages = ["Hasła się nie zgadzają"];
    }
    setMessageBox(messages);
    setLoading(false);
  };

  let defaultValue;

  if (loginVisible) {
    defaultValue = "login";
  } else if (registerVisible) {
    defaultValue = "register";
  }

  return (
    <Tabs defaultValue={defaultValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" onClick={() => handleTabs("login")}>
          Zaloguj
        </TabsTrigger>
        <TabsTrigger value="register" onClick={() => handleTabs("register")}>
          Zarejestruj
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="h-96 w-full">
        <TabsContent value="login" className="">
          <Card>
            <CardHeader>
              <CardTitle>Logowanie</CardTitle>
              <CardDescription>
                Wpisz dane logowania by kontynuować
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <ul className="text-sm">
              {messageBox &&
                messageBox.map((message, index) => (
                  <Alert
                    variant="destructive"
                    key={index}
                    className="mx-8 my-2 w-auto"
                  >
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                ))}
            </ul>
            <CardFooter>
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Logowanie..." : "Zaloguj"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Rejestracja</CardTitle>
              <CardDescription>
                Wybierz dane jakich będziesz używał w serwisie. Pamiętaj o
                podaniu silnego hasła.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="newName">Imię</Label>
                <Input
                  id="newName"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newSurname">Nazwisko</Label>
                <Input
                  id="newSurname"
                  type="text"
                  value={newSurname}
                  onChange={(e) => setNewSurname(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">Hasło</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="repeatedPassword">Powtórz Hasło</Label>
                <Input
                  id="repeatedPassword"
                  type="password"
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newEmail">Email</Label>
                <Input
                  id="newEmail"
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <ul className="text-sm">
              {messageBox &&
                messageBox.map((message, index) => (
                  <Alert
                    variant="destructive"
                    key={index}
                    className="mx-8 my-2 w-auto"
                  >
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                ))}
            </ul>
            <CardFooter>
              <Button onClick={handleRegister} disabled={loading}>
                {loading ? "Rejestrowanie..." : "Zarejestruj"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}

export default Login;
