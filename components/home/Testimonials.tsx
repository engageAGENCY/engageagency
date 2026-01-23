import { getTestimonials } from "@/lib/sanity.queries";

const hardcodedTestimonials = [
  {
    quote: "Engage Agency ha sido un socio fundamental en nuestra transformación digital. Su equipo de expertos nos ha ayudado a modernizar nuestros sistemas y a mejorar nuestra eficiencia operativa. ¡Los resultados han sido increíbles!",
    author: "Juan Pérez",
    role: "CEO, Innovatech",
  },
  {
    quote: "El equipo de Engage Agency es extremadamente profesional y talentoso. Nos han ayudado a crear una identidad de marca moderna y un sitio web increíble. ¡Estamos muy contentos con el resultado!",
    author: "María García",
    role: "Gerente de Marketing, Creative Solutions",
  },
  {
    quote: "Trabajar con Engage Agency ha sido una experiencia increíble. Su enfoque en la innovación y la calidad es evidente en todo lo que hacen. ¡Los recomiendo encarecidamente a cualquiera que busque un socio de confianza para su próximo proyecto!",
    author: "Carlos Rodríguez",
    role: "CTO, Tech Solutions",
  },
];

const Testimonials = async () => {
  let testimonials = [];
  try {
    testimonials = await getTestimonials();
  } catch (error) {
    console.error("Fallo al obtener los testimonios de Sanity, usando datos harcodeados:", error);
    testimonials = hardcodedTestimonials;
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-white/10 bg-zinc-950">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-400 text-sm sm:text-base text-balance">Testimonios que respaldan nuestro trabajo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="bg-gray-900/60 border border-white/10 p-6 sm:p-7 rounded-2xl h-full flex flex-col gap-4">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <h3 className="text-lg font-bold">{testimonial.author}</h3>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
