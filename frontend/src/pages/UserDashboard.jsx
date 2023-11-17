import { Skeleton } from "@/components/ui/skeleton"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { createContext, useContext, useEffect, useState } from "react";



export function UserDashboard() {

  useEffect(() => {
    getUserVisits("655752339ca1d5838b054229"); //xx
  }, []);

  async function getUserVisits(id) {
    return new Promise((resolve, reject) => {
      // Make API call for login
      fetch("api/visitGet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            console.log(response.json());
            return response.json();
          } else {
            console.log(response.json());
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("ERR:", error);
          reject(["An error occurred."]);
        });
    });
  }

  return (
    <div><br/> <br/> <br/> <br/> 
      <h1 className="m-5 text-lg font-bold">Wizyty: NAme + SURname</h1>
      <div className="flex items-center space-x-4 m-4">
      {/*<Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>*/}

      <Alert className="relative w-full">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Zbliżająca się wizyta</AlertTitle>
      <AlertDescription>
        Twoja wizyta  
        <Badge variant="outline" className="mx-2">Rodzaj wizyty</Badge> zbliża się. Pozostałao X dni

        <Progress value={33} className="my-1"/>
        
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline" className="mt-2">Odwołaj wizytę</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Jesteś pewien, że chcesz odwołać wizytę?</AlertDialogTitle>
              <AlertDialogDescription>
                Tej akcji nie można cofnąć. <br/> 
                Możesz umówić nowy termin wizyty na ekranie głównym.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Anuluj</AlertDialogCancel>
              <AlertDialogAction>Odwołaj</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AlertDescription>
    </Alert>
    </div>
    </div>
  );
}
