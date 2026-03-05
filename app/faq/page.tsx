const faqItems = [
  {
    question: "¿Qué incluye el manejo de redes sociales?",
    answer:
      "Incluye estrategia de contenido, planificación mensual, diseño de piezas, copywriting, publicación y seguimiento de rendimiento según el plan contratado.",
  },
  {
    question: "¿Cuánto tiempo toma iniciar un proyecto?",
    answer:
      "Normalmente iniciamos entre 3 y 7 días hábiles después de aprobar propuesta, briefing y materiales base de la marca.",
  },
  {
    question: "¿Trabajan con pauta publicitaria?",
    answer:
      "Sí. Gestionamos campañas en Meta Ads y otras plataformas con objetivos de alcance, interacción, tráfico o conversión.",
  },
  {
    question: "¿Pueden crear contenido en foto y video?",
    answer:
      "Sí. Tenemos equipo interno para fotografía y producción audiovisual orientada a redes sociales y campañas digitales.",
  },
  {
    question: "¿Tienen planes personalizados?",
    answer:
      "Sí. Si tu negocio necesita un alcance diferente, diseñamos una propuesta a medida según objetivos, volumen y presupuesto.",
  },
  {
    question: "¿Cómo se solicitan los servicios?",
    answer:
      "Puedes escribir por WhatsApp o completar el formulario de contacto. Te enviamos una propuesta con alcance, tiempos y costos.",
  },
];

export default function FaqPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-10 pt-32 sm:pt-36 pb-20">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">FAQ</p>
          <h1 className="text-4xl sm:text-5xl font-bold">Preguntas frecuentes</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Respuestas claras sobre nuestro proceso, planes y forma de trabajo.
          </p>
        </header>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">{item.question}</h2>
              <p className="text-zinc-300 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
