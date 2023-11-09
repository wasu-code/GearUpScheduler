import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ServiceList from "@/components/ServiceList";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { services } from "@/components/ServiceList";
import { Calendar } from "@/components/ui/calendar";
import { useModal } from "@/context/ModalContext";

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

  useEffect(() => {
    if (!serviceId || !date) return;

    setSearchParams({
      service_id: serviceId,
      date: date.toISOString().split("T")[0],
    });
  }, [date, serviceId]);

  const service = services.find((service) => service.id === serviceId);
  if (!service) {
    return (
      <div className="rounded-md border mt-4 py-4">
        <p className="py-4">Nie znaleziono takiej usługi</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border mt-4 py-4">
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
