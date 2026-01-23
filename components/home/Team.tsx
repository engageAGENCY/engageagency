import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { getTeamMembers } from "@/lib/sanity.queries";
import { client } from "@/lib/sanity.client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Si no hay datos en Sanity, preferimos no mostrar miembros ficticios.
const hardcodedTeamMembers: any[] = [];

const Team = async () => {
  let teamMembers = [];
  try {
    teamMembers = await getTeamMembers();
  } catch (error) {
    console.error("Fallo al obtener los miembros del equipo de Sanity, usando datos harcodeados:", error);
    teamMembers = hardcodedTeamMembers;
  }

  const hasMembers = Array.isArray(teamMembers) && teamMembers.length > 0;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold">Nuestro Equipo</h2>
          <p className="text-gray-400 text-sm sm:text-base text-balance">Talento multidisciplinario para acompañarte en cada etapa.</p>
        </div>
        {hasMembers ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member: any, index: number) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                  {member.image && (member.image.src || member.image.asset) ? (
                    <Image
                      src={member.image.src || urlFor(member.image).width(160).height(160).url()}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">IMAGEN NO DISPONIBLE</div>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold">{member.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto">
            <p className="text-lg font-semibold text-white">Aún no hay miembros publicados.</p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Agrega tu equipo en Sanity para que aparezca aquí automáticamente.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
