"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Service = {
  number?: string;
  title?: string;
  description?: string;
  items?: string[];
};

type ServicesClientProps = {
  services: Service[];
};

type Option = {
  value: string;
  label: string;
};

const interestOptions: Option[] = [
  { value: "Manejo de redes sociales", label: "Manejo de redes sociales" },
  { value: "Branding (logo, etc.)", label: "Branding (logo, etc.)" },
  { value: "Cobertura de eventos", label: "Cobertura de eventos" },
  { value: "Marketing de influencers", label: "Marketing de influencers" },
  { value: "Asesor\u00eda para redes sociales", label: "Asesor\u00eda para redes sociales" },
  { value: "Producci\u00f3n (fotograf\u00eda y video)", label: "Producci\u00f3n (fotograf\u00eda y video)" },
  { value: "Estrategia de posicionamiento", label: "Estrategia de posicionamiento" },
  { value: "Creaci\u00f3n de banners, flyers, etc.", label: "Creaci\u00f3n de banners, flyers, etc." },
  { value: "Manejo de publicidad", label: "Manejo de publicidad" },
  { value: "Creaci\u00f3n de p\u00e1gina web", label: "Creaci\u00f3n de p\u00e1gina web" },
];

const socialPlanOptions: Option[] = [
  { value: "8 posts / 12 historias mensuales", label: "8 posts / 12 historias mensuales" },
  { value: "12 posts / 18 historias mensuales", label: "12 posts / 18 historias mensuales" },
  { value: "20 posts / 25 historias mensuales", label: "20 posts / 25 historias mensuales" },
  { value: "28 posts / 56 historias mensuales", label: "28 posts / 56 historias mensuales" },
];

const sourceOptions: Option[] = [
  { value: "Promoci\u00f3n online en redes", label: "Promoci\u00f3n online en redes" },
  { value: "Por un conocido (amigo o familiar)", label: "Por un conocido (amigo o familiar)" },
  { value: "Influencer conocido", label: "Influencer conocido" },
];

const budgetOptions: Option[] = [
  { value: "30,000-40,000", label: "30,000-40,000" },
  { value: "40,000-55,000", label: "40,000-55,000" },
  { value: "55,000-70,000", label: "55,000-70,000" },
  { value: "70,000-100,000", label: "70,000-100,000" },
];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 text-[0.95rem] sm:py-3 sm:text-sm text-white placeholder:text-white/40 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20";
const labelClass = "text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-white/60";
const cardClass = "rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]";

const toId = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

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

type ServiceRequestModalProps = {
  service: Service;
  onClose: () => void;
};

const ServiceRequestModal = ({ service, onClose }: ServiceRequestModalProps) => {
  const serviceTitle = service.title || "Servicio seleccionado";
  const defaultInterests = useMemo(() => {
    const lowered = serviceTitle.toLowerCase();
    if (lowered.includes("redes") || lowered.includes("social")) {
      return ["Manejo de redes sociales"];
    }
    return [];
  }, [serviceTitle]);

  const [interests, setInterests] = useState<string[]>(defaultInterests);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const showSocialPlan = interests.includes("Manejo de redes sociales");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const toggleInterest = (value: string) => {
    setInterests((current) => {
      if (current.includes(value)) {
        return current.filter((item) => item !== value);
      }
      return [...current, value];
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitStatus === "submitting") {
      return;
    }
    setSubmitStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      selectedService: serviceTitle,
      companyName: String(formData.get("companyName") || "").trim(),
      companyRnc: String(formData.get("companyRnc") || "").trim(),
      contactEmail: String(formData.get("contactEmail") || "").trim(),
      contactPhone: String(formData.get("contactPhone") || "").trim(),
      socialHandle: String(formData.get("socialHandle") || "").trim(),
      brandDescription: String(formData.get("brandDescription") || "").trim(),
      servicesOffered: String(formData.get("servicesOffered") || "").trim(),
      interests,
      otherInterest: String(formData.get("otherInterest") || "").trim(),
      currentProblem: String(formData.get("currentProblem") || "").trim(),
      needsSocialPlan: showSocialPlan,
      socialPlan: String(formData.get("socialPlan") || "").trim(),
      socialPlanOther: String(formData.get("socialPlanOther") || "").trim(),
      budget: String(formData.get("budget") || "").trim(),
      budgetOther: String(formData.get("budgetOther") || "").trim(),
      source: String(formData.get("source") || "").trim(),
    };

    if (!payload.companyName || !payload.companyRnc || !payload.contactEmail || !payload.contactPhone || !payload.socialHandle || !payload.brandDescription || !payload.currentProblem) {
      setSubmitStatus("error");
      return;
    }

    if (payload.interests.length === 0 && !payload.otherInterest) {
      setSubmitStatus("error");
      return;
    }

    if (payload.needsSocialPlan && !payload.socialPlan && !payload.socialPlanOther) {
      setSubmitStatus("error");
      return;
    }

    if (!payload.budget && !payload.budgetOther) {
      setSubmitStatus("error");
      return;
    }

    if (!payload.source) {
      setSubmitStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      form.reset();
      setInterests(defaultInterests);
    } catch (error) {
      console.error("Failed to submit service request", error);
      setSubmitStatus("error");
    }
  };

  const handleClose = () => {
    setSubmitStatus("idle");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center px-3 py-3 sm:px-6 sm:py-10">
      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar formulario"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <div
        className="modal-frame w-full h-[calc(100dvh-1.5rem)] sm:h-auto max-w-6xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] [--modal-radius:24px] sm:[--modal-radius:36px] [--modal-border:2px] sm:[--modal-border:3px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-request-title"
      >
        <div className="modal-panel flex h-full sm:h-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] flex-col overflow-hidden bg-zinc-950/95">
          <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-black/70 px-5 pb-4 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-8 sm:py-5 backdrop-blur">
            <div>
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-white/60">Solicitud de servicio</p>
              <h3 id="service-request-title" className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mt-1">Completa el formulario</h3>
              <p className="text-[0.7rem] sm:text-sm text-white/60 mt-2 max-w-xl">
                Queremos entender tu negocio para enviarte una propuesta a medida por correo.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 border border-white/10 bg-black/60 hover:bg-white/10 transition"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="modal-scrollbar relative flex-1 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-5 sm:px-10 sm:pt-8">
            <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none" />
            <div className="relative grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] lg:gap-8">
              <div className="space-y-3 lg:hidden">
                <div className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3">
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">Servicio seleccionado</p>
                  <p className="text-base font-semibold text-white mt-2">{serviceTitle}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-[0.65rem] text-white/70">
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">Tiempo estimado: 3-5 min.</span>
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">Respuesta en 24-48 horas.</span>
                </div>
              </div>

              <div className="hidden space-y-4 lg:sticky lg:top-6 lg:self-start lg:block">
                <div className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/50">Servicio seleccionado</p>
                  <p className="text-lg font-semibold text-white mt-2">{serviceTitle}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/50">Qu&eacute; sigue</p>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-300" />
                      <span>Tiempo estimado: 3-5 min.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-300" />
                      <span>Responde las preguntas marcadas con *.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-300" />
                      <span>Te contactamos por correo en 24-48 horas.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <fieldset disabled={submitStatus === "submitting"} className="space-y-5 sm:space-y-6 lg:space-y-7">
                  <div className={cardClass}>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Datos principales</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="companyName" className={labelClass}>Nombre de la empresa *</label>
                      <input id="companyName" name="companyName" required className={inputClass} placeholder="Nombre legal o comercial" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="companyRnc" className={labelClass}>RNC de la empresa *</label>
                      <input id="companyRnc" name="companyRnc" required className={inputClass} placeholder="RNC" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contactEmail" className={labelClass}>Correo electr&oacute;nico de contacto *</label>
                      <input id="contactEmail" name="contactEmail" type="email" required className={inputClass} placeholder="correo@empresa.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contactPhone" className={labelClass}>N&uacute;mero de contacto *</label>
                      <input id="contactPhone" name="contactPhone" type="tel" required className={inputClass} placeholder="+1 809 000 0000" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="socialHandle" className={labelClass}>Usuario de Instagram, TikTok o Facebook *</label>
                      <input id="socialHandle" name="socialHandle" required className={inputClass} placeholder="@usuario / facebook.com/..." />
                    </div>
                  </div>
                </div>

                  <div className={cardClass}>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Sobre tu marca</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="brandDescription" className={labelClass}>Breve explicaci&oacute;n de qu&eacute; se trata tu marca *</label>
                      <textarea id="brandDescription" name="brandDescription" rows={4} required className={inputClass} placeholder="Cu&eacute;ntanos de tu marca, productos o servicios." />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="servicesOffered" className={labelClass}>Listado de todos los servicios que ofreces</label>
                      <textarea id="servicesOffered" name="servicesOffered" rows={3} className={inputClass} placeholder="Opcional" />
                    </div>
                  </div>
                </div>

                  <div className={cardClass}>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">&iquest;Qu&eacute; servicios te interesan? *</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {interestOptions.map((option) => {
                      const inputId = `interest-${toId(option.value)}`;
                      return (
                        <label key={option.value} htmlFor={inputId} className="flex items-start gap-3 text-sm text-white/80">
                          <input
                            id={inputId}
                            type="checkbox"
                            name="interests"
                            value={option.value}
                            className="mt-1 h-5 w-5 rounded border-white/20 bg-black/60 accent-blue-400 sm:h-4 sm:w-4"
                            checked={interests.includes(option.value)}
                            onChange={() => toggleInterest(option.value)}
                          />
                          <span>{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="mt-4 space-y-2">
                    <label htmlFor="otherInterest" className={labelClass}>Otro servicio</label>
                    <input id="otherInterest" name="otherInterest" className={inputClass} placeholder="Especifica otro servicio si aplica" />
                  </div>
                </div>

                  <div className={cardClass}>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Tu situaci&oacute;n actual</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentProblem" className={labelClass}>&iquest;Cu&aacute;l es el problema que est&aacute;s enfrentando ahora mismo? *</label>
                      <textarea id="currentProblem" name="currentProblem" rows={3} required className={inputClass} placeholder="Describe el reto principal de tu negocio." />
                    </div>
                    {showSocialPlan ? (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-white/80">Si te interesa el manejo de redes sociales, &iquest;qu&eacute; plan te atrae?</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {socialPlanOptions.map((option) => {
                            const inputId = `plan-${toId(option.value)}`;
                            return (
                              <label key={option.value} htmlFor={inputId} className="flex items-start gap-3 text-sm text-white/80">
                                <input
                                  id={inputId}
                                  type="radio"
                                  name="socialPlan"
                                  value={option.value}
                                  className="mt-1 h-5 w-5 border-white/20 bg-black/60 accent-blue-400 sm:h-4 sm:w-4"
                                  required={showSocialPlan}
                                />
                                <span>{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="socialPlanOther" className={labelClass}>Otro plan</label>
                          <input id="socialPlanOther" name="socialPlanOther" className={inputClass} placeholder="Especifica otro plan si aplica" />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                  <div className={cardClass}>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Presupuesto y referencia</h4>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-white/80">&iquest;A cu&aacute;nto asciende tu presupuesto para este servicio? *</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {budgetOptions.map((option) => {
                          const inputId = `budget-${toId(option.value)}`;
                          return (
                            <label key={option.value} htmlFor={inputId} className="flex items-start gap-3 text-sm text-white/80">
                              <input
                                id={inputId}
                                type="radio"
                                name="budget"
                                value={option.value}
                                className="mt-1 h-5 w-5 border-white/20 bg-black/60 accent-blue-400 sm:h-4 sm:w-4"
                                required
                              />
                              <span>{option.label}</span>
                            </label>
                          );
                        })}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="budgetOther" className={labelClass}>Otro presupuesto</label>
                        <input id="budgetOther" name="budgetOther" className={inputClass} placeholder="Especifica otro rango si aplica" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-white/80">&iquest;C&oacute;mo te enteraste de nosotros? *</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {sourceOptions.map((option) => {
                          const inputId = `source-${toId(option.value)}`;
                          return (
                            <label key={option.value} htmlFor={inputId} className="flex items-start gap-3 text-sm text-white/80">
                              <input
                                id={inputId}
                                type="radio"
                                name="source"
                                value={option.value}
                                className="mt-1 h-5 w-5 border-white/20 bg-black/60 accent-blue-400 sm:h-4 sm:w-4"
                                required
                              />
                              <span>{option.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                  <div className={`${cardClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
                    <p className="text-xs text-white/60 sm:max-w-md">
                      Al enviar este formulario, aceptas que te contactemos por correo con la propuesta y siguientes pasos.
                    </p>
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="w-full sm:w-auto rounded-full bg-white text-black text-sm font-semibold uppercase tracking-wide px-6 py-3 hover:bg-zinc-200 transition disabled:opacity-60"
                    >
                      {submitStatus === "submitting" ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      {submitStatus !== "idle" ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          role="status"
          aria-live={submitStatus === "error" ? "assertive" : "polite"}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[min(92vw,420px)] rounded-2xl border border-white/10 bg-zinc-950/95 p-6 text-center shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)]"
          >
            {submitStatus === "submitting" ? (
              <>
                <p className="text-lg font-semibold text-white">Enviando...</p>
                <p className="text-sm text-white/60 mt-2">Procesando tu solicitud.</p>
              </>
            ) : null}
            {submitStatus === "success" ? (
              <>
                <p className="text-lg font-semibold text-white">{"Solicitud enviada \u2705"}</p>
                <p className="text-sm text-white/60 mt-2">Te responderemos por correo. Gracias.</p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-5 w-full rounded-full bg-white text-black text-sm font-semibold uppercase tracking-wide px-6 py-3 hover:bg-zinc-200 transition"
                >
                  Cerrar
                </button>
              </>
            ) : null}
            {submitStatus === "error" ? (
              <>
                <p className="text-lg font-semibold text-white">{"No se pudo enviar \u274c"}</p>
                <p className="text-sm text-white/60 mt-2">Intenta de nuevo.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSubmitStatus("idle")}
                    className="w-full rounded-full border border-white/15 bg-white/10 text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 hover:bg-white/20 transition"
                  >
                    Reintentar
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full rounded-full bg-white text-black text-sm font-semibold uppercase tracking-wide px-6 py-3 hover:bg-zinc-200 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};

export default ServicesClient;
