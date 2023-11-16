import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ServiceList from "@/components/ServiceList";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { services } from "@/components/ServiceList";
import { Calendar } from "@/components/ui/calendar";
import { useModal } from "@/context/ModalContext";
import { UpdateIcon } from "@radix-ui/react-icons";

export function HomePage({ modalVisible }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const { setLoginVisible, setRegisterVisible } = useModal();

  const serviceId = searchParams.get("service_id");

  useEffect(() => {
    if (modalVisible === "login") {
      setLoginVisible(true);
    } else if (modalVisible === "register") {
      setRegisterVisible(true);
    }
  }, [location, setLoginVisible]);

  return (
    <>
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
              <div className="mt-6 w-full">
                <ServiceList />
              </div>
              {serviceId && <ServiceForm serviceId={serviceId} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const ServiceForm = ({ serviceId }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState(
    new Date(searchParams.get("date") || new Date())
  );
  const [time, setTime] = useState(searchParams.get("time") || "10:00");
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (!serviceId || !date) return;

    setSearchParams({
      service_id: serviceId,
      date: date.toISOString().split("T")[0],
      time,
    });
  }, [date, serviceId, time]);

  const service = services.find((service) => service.id === serviceId);
  if (!service) {
    return (
      <div className="rounded-md border mt-4 py-4">
        <p className="py-4">Nie znaleziono takiej usługi</p>
      </div>
    );
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

      setSaving(false);
    }, 2000);
  }

  const isDisabled =
    !date ||
    date < new Date() ||
    !time ||
    time.split(":")[0] < 10 ||
    time.split(":")[1] !== "00" ||
    isSaving;

  return (
    <div className="grid grid-cols-2 rounded-md border mt-4 py-4">
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
        <div className="mt-2 pt-1">Dostępne godziny 10:00-18:00</div>
        <div className="flex justify-center">
          <input
            type="time"
            min="10:00"
            max="18:00"
            required
            value={time}
            onChange={handleTimeChange}
            className="peer mt-2 cursor-pointer"
            step="3600"
          />
          <span className="mt-2 peer-invalid:after:content-['x'] peer-invalid:after:text-red-700 peer-invalid:after:absolute peer-invalid:after:pl-1 peer-valid:after:content-['✓'] peer-valid:after:text-green-700 peer-valid:after:absolute peer-valid:after:pl-1"></span>
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <Button className="mt-8" onClick={handleClick} disabled={isDisabled}>
          {isSaving && (
            <div className="animate-spin mr-2">
              <UpdateIcon />
            </div>
          )}
          Zapisz wizytę
        </Button>
      </div>
    </div>
  );
};

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
