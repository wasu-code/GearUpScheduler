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
import { useAuth } from "@/context/AuthContext";


export function UserDashboard() {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    getUserVisits(user.id).then( (data) => {
      setVisits(data)
    });
      
  }, [user]);

  async function getUserVisits(id) {
    return new Promise((resolve, reject) => {
      // Make API call for login
      fetch("api/getUserVisit?user_id="+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then((data) => {
          /*data = [{
            "day": new Date("2023-12-10"),
            "startTime": 10,
            "duration": 60,
            "user_id": "user123",
            "type": "example",
            "description": "Example visit"
          },
          {
            "day": new Date("2023-12-10"),
            "startTime": 10,
            "duration": 60,
            "user_id": "user123",
            "type": "example",
            "description": "Example visit"
          },
          {
            "day": new Date("2023-12-10"),
            "startTime": 10,
            "duration": 60,
            "user_id": "user123",
            "type": "example",
            "description": "Example visit"
          }]*/
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          console.error("ERR:", error);
          reject(["An error occurred."]);
        });
    });
  }

  function daysLeft(date) {
    // Convert both dates to milliseconds
    const givenDate = new Date(date);
    const today = new Date();
  
    // Calculate the difference in milliseconds
    const difference = givenDate.getTime() - today.getTime() ;
  
    // Convert milliseconds to days
    let daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    //return max of 100 days (max value on progress bar)
    if (daysDifference > 100) {daysDifference = 100}
  
    return daysDifference;
  }

  return (
    <div className="min-h-[80vh]"><br/> <br/> <br/> <br/> 
      <h1 className="m-5 text-lg font-bold">Witaj {user.name}. Twoje wizyty:</h1>
      <div className="flex flex-wrap items-start  m-4">

        { visits && visits.length > 0 ? 
          visits.map((v, index) => {
            let daysLeft2 = daysLeft(v.day);
          
            return (
              <Alert key={index} className="relative w-1/2 mx-4 my-1">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Zbliżająca się wizyta</AlertTitle>
                <AlertDescription>
                  Twoja wizyta  
                  <Badge variant="outline" className="mx-2">
                    {v.type}
                  </Badge> 

                  {daysLeft2 > 0 ? 
                    "zbliża się. Pozostałao "+ daysLeft2 + " dni"
                  :
                    "zakończyła się " + daysLeft2 + " dni temu"
                  } 
                  

                  <Progress value={daysLeft2} className="my-1"/>

                  {v.description} <br/> 
                  
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
            )
          })
        :
        visits && visits.length == 0 ? 
          "Brak zaplanowanych wizyt"   :
        <div>
          <Alert>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          </Alert>
        </div>
      }
    </div>
  </div>
  );
}
