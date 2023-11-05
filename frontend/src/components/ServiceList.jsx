import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useSearchParams } from "react-router-dom";

export const services = [
  {
    id: "service1",
    name: "Test 1",
    price: 1.99,
  },
  {
    id: "service2",
    name: "Service2",
    price: 1.99,
  },
  {
    id: "service3",
    name: "Lorem 3",
    price: 1.99,
  },
  {
    id: "service4",
    name: "Mechanik 4",
    price: 1.99,
  },
];

const ServiceList = () => {
  const [open, setOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(searchParams.get("service_id"));

  const service = services.find((service) => service.id === value);

  useEffect(() => {
    if (value) {
      setSearchParams({
        service_id: value,
      });
    } else {
      setSearchParams();
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {service ? service?.name : "Wybierz usługę"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[610px]">
        <Command>
          <CommandInput placeholder="Znajdź usługę..." />
          <CommandEmpty>Nie znaleziono takiej usługi.</CommandEmpty>
          <CommandGroup>
            {services.map((service) => (
              <CommandItem
                key={service.name}
                value={service.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : service.id);
                  setOpen(false);
                }}
              >
                {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.slug ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                <div className="w-full flex justify-between">
                  <span>{service.name}</span>
                  <span>{service.price} zł</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ServiceList;
