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

function Login() {
  return (
    <Tabs defaultValue="login" className="h-80 w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Zaloguj</TabsTrigger>
        <TabsTrigger value="register">Zarejestruj</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-5/6">
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Logowanie</CardTitle>
            <CardDescription>
              Wpisz dane logowania by kontynuować
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Nazwa użytkownika</Label>
              <Input id="username" defaultValue="martin123" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Hasło</Label>
              <Input id="password" defaultValue="" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Zaloguj</Button>
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
              <Label htmlFor="newUsername">Nazwa użytkownika</Label>
              <Input id="newUsername" type="text" />
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
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="text" />
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
