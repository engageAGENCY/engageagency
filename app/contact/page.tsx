import ContactForm from "@/components/contact/ContactForm";
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
            Cuentanos tus objetivos y te compartimos una propuesta enfocada en crecimiento, contenido y conversion.
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
                Telefono:{" "}
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
            <h2 className="text-3xl font-bold mb-4">Envianos un mensaje</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
