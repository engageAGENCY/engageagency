"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");
    setErrorText("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.message) {
      setSubmitState("error");
      setErrorText("Completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "request_failed");
      }

      setSubmitState("success");
      form.reset();
    } catch {
      setSubmitState("error");
      setErrorText("No se pudo enviar. Intenta de nuevo o escribe por WhatsApp.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div>
        <label htmlFor="name" className="block text-zinc-400 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={120}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-zinc-400 mb-2">
          Correo electronico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={160}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
          placeholder="correo@empresa.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-zinc-400 mb-2">
          Telefono *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          maxLength={40}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
          placeholder="+1 809 000 0000"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-zinc-400 mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={1800}
          rows={5}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
          placeholder="Cuentanos brevemente lo que necesitas."
        />
      </div>

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-2.5 px-5 rounded-lg"
      >
        {submitState === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {submitState === "success" ? (
        <p className="text-sm text-emerald-300">Mensaje enviado. Te contactaremos pronto.</p>
      ) : null}
      {submitState === "error" ? (
        <p className="text-sm text-rose-300">{errorText}</p>
      ) : null}
    </form>
  );
}
