const openRoles = [
  "Editor/a de video para social media",
  "Disenador/a grafico para contenido de marca",
  "Community manager con enfoque comercial",
  "Productor/a audiovisual (freelance por proyecto)",
];

const profileRequirements = [
  "Portafolio actualizado (obligatorio)",
  "Experiencia creando contenido para redes",
  "Capacidad para trabajar con tiempos de entrega",
  "Criterio visual y orientacion a resultados",
];

export default function CareerPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-10 pt-32 sm:pt-36 pb-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Carreras</p>
          <h1 className="text-4xl sm:text-5xl font-bold">Trabaja con Engage Agency</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Buscamos talento creativo y ejecutor para construir proyectos digitales de alto impacto.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold mb-4">Perfiles que estamos buscando</h2>
          <ul className="space-y-2 text-zinc-300">
            {openRoles.map((role) => (
              <li key={role} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold mb-4">Requisitos base</h2>
          <ul className="space-y-2 text-zinc-300">
            {profileRequirements.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 mt-5">
            Envia tu CV y portafolio a{" "}
            <a href="mailto:engagencyrd@gmail.com" className="text-white hover:text-blue-300">
              engageagencyrd@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
