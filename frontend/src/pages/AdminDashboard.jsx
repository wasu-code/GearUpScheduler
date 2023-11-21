import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";

export function AdminDashboard() {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    async function loadVisits() {
      let _visits = await (await fetch("/api/getAllVisit")).json();

      const users = [];
      for (let i = 0; i < _visits.length; i++) {
        let visit = _visits[i];
        if (!users.find((user) => user._id === visit.user_id)) {
          const _user = await (
            await fetch(`/api/getUserByUserId?user_id=${visit.user_id}`)
          ).json();

          users.push(_user);
        }
      }

      const services = await (await fetch("/data/services.json")).json();

      _visits = _visits.map((visit) => {
        let user = users.find((user) => user._id === visit.user_id);
        let price = services.find((service) => service.id === visit.type).price;

        return {
          user: user,
          price: price,
          ...visit,
        };
      });

      setVisits(_visits);

      setLoaded(true);
    }

    if (reload) {
      setReload(false);
      loadVisits();
    }
  }, [reload]);

  async function deleteVisit(id) {
    fetch(`api/visitDelete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .then((success) => {
        if (success) {
          toast({
            title: "Usunięto wizytę",
          });
          setReload(true);
        } else {
          toast({
            title: "Nie udało się usunąć wizyty",
          });
        }
      });
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return (
    <section className="mx-auto max-w-4xl py-48 sm:py-32 lg:py-48">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-center text-slate-900 sm:text-6xl">
          Sprawdź wizyty
        </h1>
        <div className="mt-8 border rounded-md p-4">
          <Table>
            <TableCaption>Lista umówionych wizyt</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Imię</TableHead>
                <TableHead>Nazwisko</TableHead>
                <TableHead>Usługa</TableHead>
                <TableHead>Data wizyty</TableHead>
                <TableHead>Godzina wizyty</TableHead>
                <TableHead className="text-right">Koszt</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoaded ? (
                <div className="w-full flex items-center justify-center py-16">
                  <div className="animate-spin mr-2">
                    <UpdateIcon />
                  </div>
                </div>
              ) : (
                visits.map((visit) => (
                  <TableRow key={visit.day + visit.startTime}>
                    <TableCell>{visit.user?.name}</TableCell>
                    <TableCell>{visit.user?.surname}</TableCell>
                    <TableCell>{visit.description}</TableCell>
                    <TableCell>{visit.day}</TableCell>
                    <TableCell>
                      {visit.startTime}:00 - {visit.startTime + visit.duration}
                      :00
                    </TableCell>
                    <TableCell className="text-right">
                      {visit.price}zł
                    </TableCell>
                    <TableCell
                      className="text-red cursor-pointer"
                      onClick={() => deleteVisit(visit._id)}
                    >
                      <TrashIcon color="red" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Liczba wizyt: {visits.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </section>
  );
}
