"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

export type Service = {
  number?: string;
  title?: string;
  description?: string;
  items?: string[];
};

type ServicesClientProps = {
  services: Service[];
};

const ServiceRequestModal = dynamic(() => import("./ServiceRequestModal"), { ssr: false });

const ServicesClient = ({ services }: ServicesClientProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <section id="servicios" className="py-16 sm:py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-xs sm:text-sm uppercase text-gray-400 tracking-[0.3em]">Lo que ofrecemos</h2>
          <h3 className="text-3xl sm:text-4xl font-bold">Nuestros servicios</h3>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto text-balance">
            Selecciona un servicio y completa el formulario para que podamos enviarte una propuesta personalizada por correo electr&oacute;nico.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service: Service, index: number) => {
            const items = Array.isArray(service.items) ? service.items : [];
            const serviceKey = service.number ?? service.title ?? `service-${index}`;
            return (
              <div
                key={serviceKey}
                className="rounded-2xl p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave"
              >
                <div className="bg-gray-800/60 rounded-2xl h-full p-6 sm:p-7 flex flex-col gap-4">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-300">{service.number}</div>
                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-bold leading-tight text-white">{service.title}</h4>
                    <p className="text-white/80 text-sm sm:text-base text-balance">{service.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base text-white/90">
                    {items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <svg className="w-4 h-4 mt-1 flex-none text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
                    <button
                      type="button"
                      onClick={() => openForm(service)}
                      className="w-full rounded-full bg-white text-black text-xs sm:text-sm font-semibold uppercase tracking-wide py-2.5 hover:bg-zinc-200 transition"
                    >
                      Solicitar este servicio
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isFormOpen && selectedService ? (
        <ServiceRequestModal
          key={selectedService.title ?? selectedService.number ?? "service-form"}
          service={selectedService}
          onClose={closeForm}
        />
      ) : null}
    </section>
  );
};

export default ServicesClient;
