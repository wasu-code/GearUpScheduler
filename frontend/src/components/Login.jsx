import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { useAuth } from '@/context/AuthContext';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState([]);
  const { isLoaded, login } = useAuth();

  const handleLogin = async () => {
    setLoading(true)
    let messages = await login(email, password);
    setMessageBox(messages)
    setLoading(false)
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Zaloguj</TabsTrigger>
        <TabsTrigger value="register">Zarejestruj</TabsTrigger>
      </TabsList>
      <ScrollArea className="">
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
              {messageBox && messageBox.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul> 
            <CardFooter>
              
              <Button 
                onClick={handleLogin} 
                disabled={loading} 
              >
                {loading ? 'Logowanie...' : 'Zaloguj'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Rejestracja</CardTitle>
              <CardDescription>
                Wybierz dane jakich będziesz używał w serwisie. Pamiętaj o podaniu silnego hasła.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="newName">Imię</Label>
                <Input id="newName" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newSurname">Nazwisko</Label>
                <Input id="newSurname" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">Hasło</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="repeatedPassword">Powtórz Hasło</Label>
                <Input id="repeatedPassword" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newEmail">Email</Label>
                <Input id="newEmail" type="text" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Zarejestruj</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}

export default Login;
