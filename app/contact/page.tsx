import { getCompanyProfileWithFallback } from "@/lib/company-profile";

function toWaLink(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

export default async function ContactPage() {
  const company = await getCompanyProfileWithFallback();

  return (
    <main className="container mx-auto px-4 sm:px-6 md:px-10 pt-32 sm:pt-36 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Contacto</p>
          <h1 className="text-4xl sm:text-5xl font-bold">Hablemos de tu proyecto</h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto text-balance">
            Cuéntanos tus objetivos y te compartimos una propuesta enfocada en crecimiento, contenido y conversión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Canales directos</h2>
            <div className="space-y-4 text-zinc-200">
              <p>
                WhatsApp:{" "}
                <a href={toWaLink(company.whatsapp)} className="text-white hover:text-blue-300">
                  {company.whatsapp}
                </a>
              </p>
              <p>
                Teléfono:{" "}
                <a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`} className="text-white hover:text-blue-300">
                  {company.phone}
                </a>
              </p>
              <p>
                Correo:{" "}
                <a href={`mailto:${company.email}`} className="text-white hover:text-blue-300">
                  {company.email}
                </a>
              </p>
              <p>
                Instagram:{" "}
                <a
                  href={`https://www.instagram.com/${company.instagram.replace("@", "")}`}
                  className="text-white hover:text-blue-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  {company.instagram}
                </a>
              </p>
              <p className="text-zinc-400">{company.address}</p>
            </div>

            <a
              href={toWaLink(company.whatsapp)}
              className="inline-flex items-center justify-center rounded-full bg-white text-black text-xs sm:text-sm font-semibold uppercase tracking-wide py-3 px-6 hover:bg-zinc-200 transition"
              target="_blank"
              rel="noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-zinc-400 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-zinc-400 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-zinc-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-5 rounded-lg"
              >
                Enviar mensaje
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
