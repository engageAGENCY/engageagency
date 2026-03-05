import { getCompanyProfileWithFallback } from "@/lib/company-profile";

const teamStructure = [
  "Dirección comercial y estrategia",
  "Community management y planificación",
  "Diseño gráfico y branding editorial",
  "Producción foto/video y postproducción",
  "Gestor de pauta y performance",
];

export default async function AboutPage() {
  const company = await getCompanyProfileWithFallback();

  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-10 pt-32 sm:pt-36 pb-20">
      <section className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Nosotros</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-balance">{company.aboutHeadline}</h1>
          <p className="text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto text-balance">{company.aboutText}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-center">
            <p className="text-3xl font-bold">{company.yearsExperience}+</p>
            <p className="text-sm text-zinc-400 mt-1">Años de experiencia</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-center">
            <p className="text-3xl font-bold">{company.clientsCount}+</p>
            <p className="text-sm text-zinc-400 mt-1">Clientes atendidos</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-center">
            <p className="text-3xl font-bold">{company.teamSize}+</p>
            <p className="text-sm text-zinc-400 mt-1">Especialistas en equipo</p>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h2 className="text-2xl font-semibold mb-3">Misión</h2>
            <p className="text-zinc-300 leading-relaxed">{company.mission}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h2 className="text-2xl font-semibold mb-3">Visión</h2>
            <p className="text-zinc-300 leading-relaxed">{company.vision}</p>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h2 className="text-2xl font-semibold mb-4">Valores</h2>
            <ul className="space-y-2 text-zinc-300">
              {company.values.map((value) => (
                <li key={value} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
            <h2 className="text-2xl font-semibold mb-4">Estructura de equipo</h2>
            <ul className="space-y-2 text-zinc-300">
              {teamStructure.map((role) => (
                <li key={role} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
