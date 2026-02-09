import { getTestimonials } from "@/lib/sanity.queries";

const hardcodedTestimonials = [
  {
    quote:
      "Engage Agency ha sido un socio fundamental en nuestra transformaci\u00f3n digital. Su equipo de expertos nos ha ayudado a modernizar nuestros sistemas y a mejorar nuestra eficiencia operativa. \u00a1Los resultados han sido incre\u00edbles!",
    author: "Juan P\u00e9rez",
    role: "CEO, Innovatech",
  },
  {
    quote:
      "El equipo de Engage Agency es extremadamente profesional y talentoso. Nos han ayudado a crear una identidad de marca moderna y un sitio web incre\u00edble. \u00a1Estamos muy contentos con el resultado!",
    author: "Mar\u00eda Garc\u00eda",
    role: "Gerente de Marketing, Creative Solutions",
  },
  {
    quote:
      "Trabajar con Engage Agency ha sido una experiencia incre\u00edble. Su enfoque en la innovaci\u00f3n y la calidad es evidente en todo lo que hacen. \u00a1Los recomiendo encarecidamente a cualquiera que busque un socio de confianza para su pr\u00f3ximo proyecto!",
    author: "Carlos Rodr\u00edguez",
    role: "CTO, Tech Solutions",
  },
];

type ReviewCard = {
  author: string;
  time: string;
  rating: number;
  text: string;
  avatar?: string;
  source: "google" | "sanity";
};

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_ID = process.env.GOOGLE_PLACES_ID;

const getGoogleReviews = async () => {
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACES_ID) {
    return null;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", GOOGLE_PLACES_ID);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("language", "es");
  url.searchParams.set("key", GOOGLE_PLACES_API_KEY);

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (data?.status !== "OK" || !data?.result) {
    return null;
  }

  return {
    rating: data.result.rating ?? 5,
    total: data.result.user_ratings_total ?? 0,
    reviews: Array.isArray(data.result.reviews) ? data.result.reviews : [],
  };
};

const renderStars = (rating: number) => {
  const stars = Math.max(1, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }).map((_, index) => (
    <span
      key={index}
      className={index < stars ? "text-yellow-400" : "text-gray-600"}
      aria-hidden
    >
      {"\u2605"}
    </span>
  ));
};

const GoogleWordmark = () => (
  <span className="text-2xl font-semibold tracking-tight">
    <span className="text-blue-500">G</span>
    <span className="text-red-500">o</span>
    <span className="text-yellow-400">o</span>
    <span className="text-blue-500">g</span>
    <span className="text-green-500">l</span>
    <span className="text-red-500">e</span>
  </span>
);

const Testimonials = async () => {
  let testimonials: any[] = [];
  try {
    testimonials = await getTestimonials();
  } catch (error) {
    console.error("Fallo al obtener los testimonios de Sanity, usando datos harcodeados:", error);
    testimonials = hardcodedTestimonials;
  }

  const googleData = await getGoogleReviews();
  const reviews: ReviewCard[] = googleData?.reviews?.length
    ? googleData.reviews.map((review: any) => ({
        author: review.author_name,
        time: review.relative_time_description || "Hace poco",
        rating: review.rating ?? 5,
        text: review.text || "",
        avatar: review.profile_photo_url,
        source: "google",
      }))
    : testimonials.map((testimonial: any) => ({
        author: testimonial.author,
        time: testimonial.role || "Cliente",
        rating: 5,
        text: testimonial.quote,
        source: "sanity",
      }));

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-white/10 bg-zinc-950">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            {"Rese\u00f1as"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
            {googleData ? "Excelente" : "Lo que dicen nuestros clientes"}
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 text-2xl">
              {renderStars(googleData?.rating ?? 5)}
            </div>
            <p className="text-gray-400 text-sm">
              {googleData
                ? `A base de ${googleData.total} rese\u00f1as`
                : "Testimonios que respaldan nuestro trabajo."}
            </p>
            {googleData ? <GoogleWordmark /> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={`${review.author}-${index}`}
              className="bg-gray-900/60 border border-white/10 p-6 sm:p-7 rounded-2xl h-full flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      review.author.slice(0, 1)
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{review.author}</h3>
                    <p className="text-xs text-gray-400">{review.time}</p>
                  </div>
                </div>
                {review.source === "google" ? (
                  <span className="text-xs text-gray-500">Google</span>
                ) : null}
              </div>

              <div className="flex items-center gap-1 text-lg">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {review.text}
              </p>
              <button className="text-xs uppercase tracking-wide text-gray-400 hover:text-white transition">
                {"Leer m\u00e1s"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
