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
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";


export function UserDashboard() {
  const { user } = useAuth();
  const [visits, setVisits] = useState(null);
  const { toast } = useToast();
  let [edited, setEdited] = useState(0);

  useEffect(() => {
    getUserVisits(user.id).then( (data) => {
      setVisits(data)
    });
      
  }, [user, edited]);

  async function getUserVisits(id) {
    return new Promise((resolve, reject) => {
      // Make API call for login
      fetch(`api/getUserVisit?user_id=${id}`, {
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
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.day);
            const dateB = new Date(b.day);
            return dateA - dateB;
          });
          const upcomingFirst = sortedData.sort((a, b) => {
            const daysLeftA = daysLeft(a.day);
            const daysLeftB = daysLeft(b.day);
          
            if (daysLeftA >= 0 && daysLeftB < 0) {
              return -1; // `a` should come before `b`
            } else if (daysLeftA < 0 && daysLeftB >= 0) {
              return 1; // `b` should come before `a`
            } else {
              return 0; // Maintain current order or sort by other criteria
            }
          });
          resolve(upcomingFirst);
        })
        .catch((error) => {
          console.error("ERR:", error);
          reject(["An error occurred."]);
        });
    });
  }

  async function deleteVisit(id) {
    fetch(`api/visitDelete/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.status == 200) {
        return true
      } else {
        return false
      }
    }).then((success)=>{
      if (success) {
        toast({
          title: "Odwołano wizytę"
        })
        setEdited(edited+1);
      } else {
        toast({
          title: "Nie udało się odwołać wizyty"
        })
      }
    })
  }

  function daysLeft(date) {
    // Convert both dates to milliseconds
    const givenDate = new Date(date);
    const today = new Date();
  
    // Calculate the difference in milliseconds
    const difference = givenDate.getTime() - today.getTime() ;
  
    // Convert milliseconds to days
    let daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  
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
              <Alert key={index} className="relative w-full lg:w-[70%] xl:w-[60%] mx-4 my-2 shadow-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {daysLeft2>=0 ? 
                    "Zbliżająca się wizyta"
                  :
                    "Zakończona wizyta"
                  }
                </AlertTitle>
                <AlertDescription>
                  Twoja wizyta  
                  <Badge variant="outline" className="mx-2 bg-slate-300">
                    {v.description}
                  </Badge> 

                  {daysLeft2 > 0 ? 
                    <span>zbliża się. Pozostało <b>{daysLeft2}</b> dni</span>
                  :
                    "zakończyła się " + daysLeft2 + " dni temu"
                  } 
                  
                  <Progress value={daysLeft2 > 100 ? daysLeft2 = 100 : daysLeft2 } className="my-1 mb-2"/>

                  <Badge variant="outline" className="bg-slate-300 mr-2">
                    Data wizyty: {new Date(v.day).toLocaleDateString('pl-PL')} godzina {v.startTime}:00
                  </Badge> 
                  <Badge variant="outline" className="bg-slate-300">
                    Przewidywany czas trwania naprawy: {v.duration} godzina/y
                  </Badge>
                  
                  <br/> 
                  
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className="mt-4 shadow-md">Odwołaj wizytę</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tej akcji nie można cofnąć.</AlertDialogTitle>
                        <AlertDialogDescription>
                        Jesteś pewien, że chcesz odwołać wizytę?<br/> 
                        Możesz umówić nowy termin wizyty na ekranie głównym.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Anuluj</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteVisit(v._id)}>Odwołaj</AlertDialogAction>
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
