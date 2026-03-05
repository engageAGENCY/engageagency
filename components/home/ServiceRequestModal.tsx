"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import type { Service } from "./ServicesClient";

type Option = {
  value: string;
  label: string;
};

const interestOptions: Option[] = [
  { value: "Manejo de redes sociales", label: "Manejo de redes sociales" },
  { value: "Branding (logo, etc.)", label: "Branding (logo, etc.)" },
  { value: "Cobertura de eventos", label: "Cobertura de eventos" },
  { value: "Marketing de influencers", label: "Marketing de influencers" },
  { value: "Asesoría para redes sociales", label: "Asesoría para redes sociales" },
  { value: "Producción (fotografía y video)", label: "Producción (fotografía y video)" },
  { value: "Estrategia de posicionamiento", label: "Estrategia de posicionamiento" },
  { value: "Creación de banners, flyers, etc.", label: "Creación de banners, flyers, etc." },
  { value: "Manejo de publicidad", label: "Manejo de publicidad" },
  { value: "Creación de página web", label: "Creación de página web" },
];

const sourceOptions: Option[] = [
  { value: "Promoción online en redes", label: "Promoción online en redes" },
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

type ServiceRequestModalProps = {
  service: Service;
  onClose: () => void;
};

const ServiceRequestModal = ({ service, onClose }: ServiceRequestModalProps) => {
  const serviceTitle = service.title || "Servicio seleccionado";
  
  const defaultInterests = useMemo(() => {
    const lowered = serviceTitle.toLowerCase();
    if (service.serviceKind === "plan" || lowered.includes("redes") || lowered.includes("social")) {
      return ["Manejo de redes sociales"];
    }
    return [];
  }, [service.serviceKind, serviceTitle]);

  const [interests, setInterests] = useState<string[]>(defaultInterests);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const showSocialPlan = interests.includes("Manejo de redes sociales");

  useEffect(() => {
    setInterests(defaultInterests);
    setSubmitStatus("idle");
  }, [defaultInterests]);

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
      socialPlan: showSocialPlan ? "Plan personalizado" : "",
      socialPlanOther: String(formData.get("socialPlanOther") || "").trim(),
      budget: String(formData.get("budget") || "").trim(),
      budgetOther: String(formData.get("budgetOther") || "").trim(),
      source: String(formData.get("source") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    if (
      !payload.companyName ||
      !payload.companyRnc ||
      !payload.contactEmail ||
      !payload.contactPhone ||
      !payload.socialHandle ||
      !payload.brandDescription ||
      !payload.currentProblem
    ) {
      setSubmitStatus("error");
      return;
    }

    if (payload.interests.length === 0 && !payload.otherInterest) {
      setSubmitStatus("error");
      return;
    }

    if (payload.needsSocialPlan && !payload.socialPlanOther) {
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
      setInterests(defaultInterests);    } catch (error) {
      console.error("Failed to submit service request", error);
      setSubmitStatus("error");
    }
  };

  const handleClose = () => {
    setSubmitStatus("idle");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center px-3 py-3">
      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar formulario"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <div
        className="modal-frame w-full h-[calc(100dvh-1.5rem)] max-w-[520px] sm:max-w-[560px] max-h-[calc(100dvh-1.5rem)] [--modal-radius:24px] [--modal-border:2px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-request-title"
      >
        <div className="modal-panel flex h-full max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden bg-zinc-950/95">
          <div className="relative z-10 overflow-hidden border-b border-white/10">
            <div className="relative h-[96px]">
              <Image
                src="/content-engage.png"
                alt="Engage agency"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_62%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/26 via-black/8 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/45 to-transparent" />
              <div className="absolute right-4 top-[calc(env(safe-area-inset-top)+0.5rem)]">
                <button
                  type="button"
                  onClick={handleClose}
                  className="shrink-0 rounded-full border border-white/10 bg-black/62 p-2 transition hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
            <p id="service-request-title" className="sr-only">
              Solicitud de servicio
            </p>
          </div>

          <div className="modal-scrollbar relative flex-1 overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
            <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none" />
            <div className="relative grid gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_14%_14%,rgba(236,72,153,0.14),transparent_44%),radial-gradient(circle_at_86%_16%,rgba(96,165,250,0.14),transparent_44%),linear-gradient(145deg,#07080f,#101326)] px-4 py-4 sm:px-5 sm:py-5">                  <h4 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">{serviceTitle}</h4>                  <p className="mt-3 text-sm text-white/75">
                    Completa los datos para enviarte una propuesta profesional alineada a tu negocio.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[0.65rem] text-white/72">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">Tiempo estimado: 3-5 min.</span>
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1">Respuesta en 24-48 horas.</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/50">Qué sigue</p>
                  <ul className="mt-3 space-y-2 text-xs text-white/70 sm:text-sm">
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
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
                <fieldset disabled={submitStatus === "submitting"} className="space-y-5">
                  <div className={cardClass}>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Datos principales</h4>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <label htmlFor="companyName" className={labelClass}>Nombre de la empresa *</label>
                        <input id="companyName" name="companyName" required className={inputClass} placeholder="Nombre legal o comercial" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="companyRnc" className={labelClass}>RNC de la empresa *</label>
                        <input id="companyRnc" name="companyRnc" required className={inputClass} placeholder="RNC" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contactEmail" className={labelClass}>Correo electrónico de contacto *</label>
                        <input id="contactEmail" name="contactEmail" type="email" required className={inputClass} placeholder="correo@empresa.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contactPhone" className={labelClass}>Número de contacto *</label>
                        <input id="contactPhone" name="contactPhone" type="tel" required className={inputClass} placeholder="+1 809 000 0000" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="socialHandle" className={labelClass}>Usuario de Instagram, TikTok o Facebook *</label>
                        <input id="socialHandle" name="socialHandle" required className={inputClass} placeholder="@usuario / facebook.com/..." />
                      </div>
                    </div>
                  </div>

                  <div className={cardClass}>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Sobre tu marca</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="brandDescription" className={labelClass}>Breve explicación de qué se trata tu marca *</label>
                        <textarea id="brandDescription" name="brandDescription" rows={4} required className={inputClass} placeholder="Cuéntanos de tu marca, productos o servicios." />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="servicesOffered" className={labelClass}>Listado de todos los servicios que ofreces</label>
                        <textarea id="servicesOffered" name="servicesOffered" rows={3} className={inputClass} placeholder="Opcional" />
                      </div>
                    </div>
                  </div>

                  <div className={cardClass}>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4">¿Qué servicios te interesan? *</h4>
                    <div className="grid gap-3">
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
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Tu situación actual</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="currentProblem" className={labelClass}>¿Cuál es el problema que estás enfrentando ahora mismo? *</label>
                        <textarea id="currentProblem" name="currentProblem" rows={3} required className={inputClass} placeholder="Describe el reto principal de tu negocio." />
                      </div>
                      {showSocialPlan ? (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-white/80">Empieza tu plan personalizado para redes sociales.</p>
                          <div className="space-y-2">
                            <label htmlFor="socialPlanOther" className={labelClass}>Plan personalizado *</label>
                            <textarea
                              id="socialPlanOther"
                              name="socialPlanOther"
                              rows={3}
                              className={inputClass}
                              placeholder="Describe lo que necesitas para tu plan personalizado."
                              required={showSocialPlan}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className={cardClass}>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Presupuesto y referencia</h4>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-white/80">¿A cuánto asciende tu presupuesto para este servicio? *</p>
                        <div className="grid gap-3">
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
                        <p className="text-sm font-semibold text-white/80">¿Cómo te enteraste de nosotros? *</p>
                        <div className="grid gap-3">
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

                  <div className={`${cardClass} flex flex-col gap-4`}>
                    <p className="text-xs text-white/60">
                      Al enviar este formulario, aceptas que te contactemos por correo con la propuesta y siguientes pasos.
                    </p>
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="w-full rounded-full bg-white text-black text-sm font-semibold uppercase tracking-wide px-6 py-3 hover:bg-zinc-200 transition disabled:opacity-60"
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

export default ServiceRequestModal;

