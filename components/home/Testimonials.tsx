import { getCompanyInfo } from "@/lib/sanity.queries";

type ReviewCard = {
  author: string;
  time: string;
  rating: number;
  text: string;
  avatar?: string;
  authorUrl?: string;
  source: "google";
};

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY?.trim() || "";
const GOOGLE_PLACES_ID = process.env.GOOGLE_PLACES_ID?.trim() || "";

function extractPlaceIdFromUrl(input?: string | null) {
  if (!input) return "";
  try {
    const parsed = new URL(input);
    const placeId = parsed.searchParams.get("placeid");
    return placeId?.trim() || "";
  } catch {
    return "";
  }
}

const getGoogleReviews = async (apiKey: string, placeId: string) => {
  if (!apiKey || !placeId) {
    return null;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("language", "es");
  url.searchParams.set("key", apiKey);

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
  let companyInfo: any = null;
  try {
    companyInfo = await getCompanyInfo();
  } catch (error) {
    console.error("No se pudo obtener companyInfo para reseñas:", error);
  }

  const sanityPlaceId = String(companyInfo?.googlePlaceId || "").trim();
  const sanityReviewUrl = String(companyInfo?.googleReviewUrl || "").trim();
  const resolvedPlaceId =
    GOOGLE_PLACES_ID || sanityPlaceId || extractPlaceIdFromUrl(sanityReviewUrl);

  const writeReviewUrl =
    sanityReviewUrl ||
    (resolvedPlaceId
      ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(resolvedPlaceId)}`
      : "");
  const googlePlaceUrl = resolvedPlaceId
    ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(resolvedPlaceId)}`
    : "";

  if (!writeReviewUrl && !googlePlaceUrl) {
    return null;
  }

  const googleData = await getGoogleReviews(GOOGLE_PLACES_API_KEY, resolvedPlaceId);

  const reviews: ReviewCard[] = googleData?.reviews?.length
    ? googleData.reviews
        .filter((review: any) => review?.text && review?.author_name)
        .map((review: any) => ({
          author: review.author_name,
          time: review.relative_time_description || "Hace poco",
          rating: review.rating ?? 5,
          text: review.text || "",
          avatar: review.profile_photo_url,
          authorUrl: review.author_url,
          source: "google",
        }))
    : [];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-white/10 bg-zinc-950">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            {"Rese\u00f1as"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
            Excelente
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 text-2xl">
              {renderStars(googleData?.rating ?? 5)}
            </div>
            <p className="text-gray-400 text-sm">
              {googleData
                ? `A base de ${googleData.total} rese\u00f1as`
                : "Deja tu rese\u00f1a en Google y aparecera aqui."}
            </p>
            <GoogleWordmark />
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {writeReviewUrl ? (
                <a
                  href={writeReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave"
                >
                  <span className="rounded-full bg-black px-5 py-2 text-xs sm:text-sm uppercase tracking-wide font-semibold text-white">
                    Dejar rese\u00f1a en Google
                  </span>
                </a>
              ) : null}
              {googlePlaceUrl ? (
                <a
                  href={googlePlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs sm:text-sm uppercase tracking-wide font-semibold text-white hover:bg-white/10 transition"
                >
                  Ver en Google
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {reviews.length ? (
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
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
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
                  <span className="text-xs text-gray-500">Google</span>
                </div>

                <div className="flex items-center gap-1 text-lg">
                  {renderStars(review.rating)}
                </div>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {review.text}
                </p>
                {review.authorUrl ? (
                  <a
                    href={review.authorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-wide text-gray-400 hover:text-white transition"
                  >
                    Ver perfil
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">Aun no hay rese\u00f1as visibles para mostrar.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
