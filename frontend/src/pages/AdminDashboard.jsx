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

const api_visits = [
  {
    name: "Jan",
    surname: "Nowak",
    service: "Service 1",
    date: new Date(),
    time: "12:00",
    cost: 100,
  },
];

{
  /* <TableCell>{visit.name}</TableCell>
<TableCell>{visit.surname}</TableCell>
<TableCell>{visit.service}</TableCell>
<TableCell>{visit.date}</TableCell>
<TableCell>{visit.time}</TableCell>
<TableCell>{visit.cost}</TableCell> */
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    async function loadVisits() {
      setVisits(api_visits);
    }

    loadVisits();
  }, []);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return (
    <section className="mx-auto max-w-2xl py-48 sm:py-32 lg:py-48">
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
                <TableHead>Koszt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.name}</TableCell>
                  <TableCell>{visit.surname}</TableCell>
                  <TableCell>{visit.service}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("pl-PL").format(
                      new Date(visit.date.toDateString())
                    )}
                  </TableCell>
                  <TableCell>{visit.time}</TableCell>
                  <TableCell>{visit.cost}zł</TableCell>
                </TableRow>
              ))}
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
