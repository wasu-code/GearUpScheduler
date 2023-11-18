import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ServiceList from "@/components/ServiceList";
import { useAuth } from "@/context/AuthContext";
import {
  Navigate,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Footer from "@/components/Footer";
import { services } from "@/components/ServiceList";
import { Calendar } from "@/components/ui/calendar";
import { useModal } from "@/context/ModalContext";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Toaster } from "@/components/ui/toaster";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

let api_hours = [
  {
    value: "10",
    available: true,
  },
  {
    value: "11",
    available: true,
  },
  {
    value: "12",
    available: true,
  },
  {
    value: "13",
    available: false,
  },
  {
    value: "14",
    available: true,
  },
  {
    value: "15",
    available: true,
  },
  {
    value: "16",
    available: false,
  },
  {
    value: "17",
    available: true,
  },
  {
    value: "18",
    available: false,
  },
];

export function HomePage({ modalVisible }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const { setLoginVisible, setRegisterVisible } = useModal();

  const serviceId = searchParams.get("service_id");
  const location = useLocation();

  useEffect(() => {
    if (modalVisible === "login") {
      setLoginVisible(true);
    } else if (modalVisible === "register") {
      setRegisterVisible(true);
    }
  }, [location, setLoginVisible]);

  return (
    <section id="hero-section">
      <div className="relative px-6 pt-14 lg:px-8 bg-slate-100">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Znajdź interesującą Ciebie usługę
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Wpisz poniżej nazwę usługi, aby umówić wizytę z naszymi
              specjalistami
            </p>
            <div className="mt-6 w-full bg-white">
              <ServiceList />
            </div>
            {serviceId && <ServiceForm serviceId={serviceId} />}
          </div>
        </div>
      </div>
    </section>
  );
}

const ServiceForm = ({ serviceId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState(
    new Date(searchParams.get("date") || new Date())
  );
  const [time, setTime] = useState(searchParams.get("time") || "10");
  const [isSaving, setSaving] = useState(false);
  const [isSuccess, setSuccess] = useState(
    searchParams.get("isSuccess") || false
  );
  const [hours, setHours] = useState([]);

  useEffect(() => {
    async function getHours() {
      // await fetch
      setHours(api_hours);
    }

    getHours();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (!serviceId || !date) return;

    setSearchParams({
      service_id: serviceId,
      date: date.toISOString().split("T")[0],
      time,
      isSuccess,
    });
  }, [date, serviceId, time, isSuccess]);

  const service = services.find((service) => service.id === serviceId);
  if (!service) {
    return (
      <div className="rounded-md border mt-4 py-4">
        <p className="py-4">Nie znaleziono takiej usługi</p>
      </div>
    );
  }

  function isSelectDisabled(index, available) {
    if (!available) {
      return "disabled";
    }

    for (let i = 0; i < service.duration; i++) {
      if (!hours?.[index + i]?.available) {
        return "disabled";
      }
    }

    return "";
  }

  function handleTimeChange(e) {
    setTime(e.target.value);
  }

  async function handleClick() {
    setSaving(true);

    setTimeout(() => {
      const timestamp = new Date(date);
      timestamp.setHours(time.split(":")[0]);
      timestamp.setMinutes(time.split(":")[1]);

      setSuccess(true);
      setSaving(false);
    }, 2000);
  }

  const isDisabled =
    !date ||
    date.getDate() < new Date().getDate() ||
    (date.getDate() == new Date().getDate() && time < new Date().getHours()) ||
    !time ||
    time < 10 ||
    time > 18 ||
    isSaving;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isSuccess) {
    return <ServiceSuccess service={service} date={date} time={time} />;
  }

  return (
    <div className="grid grid-cols-2 rounded-md border bg-white mt-4 p-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Wybierz datę</h2>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className=""
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900">Wybierz godzinę</h2>
        <div className="mt-2 pt-1">
          Wizyty są dostępne w godzinach: 10:00-18:00
        </div>
        <div className="flex justify-center mt-2">
          <Select
            className="bg-white"
            value={time}
            onValueChange={(value) => setTime(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wybierz godzinę wizyty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Wizyty</SelectLabel>
                {hours.map((hour, index) => (
                  <SelectItem
                    key={hour.value}
                    value={hour.value}
                    disabled={isSelectDisabled(index, hour.available)}
                  >
                    {hour.value}:00
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="mt-2 peer-invalid:after:content-['x'] peer-invalid:after:text-red-700 peer-invalid:after:absolute peer-invalid:after:pl-1 peer-valid:after:content-['✓'] peer-valid:after:text-green-700 peer-valid:after:absolute peer-valid:after:pl-1"></span>
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <div className="mt-4">
          <h2 className="text-lg font-bold text-slate-900">
            Koszt wizyty: {service.price}zł
          </h2>
          <h2 className="text-lg font-bold text-slate-900">
            Szacunkowy czas trwania: {service.duration}h
          </h2>
          <Button className="mt-4" onClick={handleClick} disabled={isDisabled}>
            {isSaving && (
              <div className="animate-spin mr-2">
                <UpdateIcon />
              </div>
            )}
            Zapisz wizytę
          </Button>
        </div>
      </div>
    </div>
  );
};

function ServiceSuccess({ service, date, time }) {
  const navigate = useNavigate();

  function redirect() {
    navigate("/profile");
  }

  return (
    <>
      <div className="rounded-md border mt-4 p-4 bg-white">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mt-4">
            Pomyślnie zaplanowano wizytę!
          </h2>

          <div className="flex items-center justify-evenly">
            <div>
              <div>
                <p className="text-lg font-bold text-slate-900 mt-4">
                  Wybrana usługa:
                </p>
                <p>{service.name}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 mt-4">
                  Koszt wizyty:
                </p>
                <p>{service.price}zł</p>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 mt-4">
                Data wizyty:
              </p>
              <p>
                {new Intl.DateTimeFormat("pl-PL").format(
                  new Date(date.toDateString())
                )}
              </p>
              <p className="text-lg font-bold text-slate-900 mt-4">
                Wizyta w godzinach:
              </p>
              <span>{` ${time}:00 - ${
                Number(time) + service.duration
              }:00`}</span>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <Button className="mt-4" onClick={redirect}>
              Zobacz szczegóły
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
};
