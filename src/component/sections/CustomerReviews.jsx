import { useState } from "react";
const REVIEWS = [
    {
        name: "Joud Fattal",
        image: "/reviews/wilkins-micawber.jpg",
        rating: 5,
        text: "The portions are large and very filling, the food is delicious, and the prices are cheap and reasonable. Great value for money. I would definitely come back and recommend this place.",
    },
    {
        name: "Wafaa Belkadi",
        image: "/reviews/michael-brown.jpg",
        rating: 5,
        text: "Franchement une très bonne surprise. À ce prix-là, avoir autant de saveur et une qualité comme ça, c’est rare. Les produits sont bons, bien préparés et les portions sont généreuses.Pour moi, c’est clairement les meilleurs du quartier, et de loin.C’est devenu une de mes adresses préférées.",
    },
    {
        name: "Johnny Cajape",
        image: "/reviews/elizabeth-jones.jpg",
        rating: 5,
        text: "La comida estuvo excelente, el sándwich de Cordon Bleu estuvo exquisito, puedes distinguir todos los ingredientes que tiene principalmente el queso 💯 The food was excellent, the Cordon Bleu sandwich was exquisite, you can distinguish all the ingredients, especially the cheese.",
    },
];

const font = { fontFamily: "Roboto, sans-serif" };
const serif = { fontFamily: "Philosopher, serif" };
const Star = ({ filled }) => (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#e2623a]" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 2.5 2.8 6.6 7.2.6-5.5 4.7 1.7 7-6.2-3.8-6.2 3.8 1.7-7L2 9.7l7.2-.6L12 2.5z" />
    </svg>
);

function Avatar({ review }) {
    const [failed, setFailed] = useState(false);
    return (
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-200 sm:h-20 sm:w-20">
            {!failed && review.image ? (
                <img src={review.image} alt={review.name} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
            ) : (
                // Shown until the customer's photo file exists
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#e2623a]" style={serif}>
                    {review.name.charAt(0)}
                </div>
            )}
        </div>
    );
}

const CustomerReviews = ({ reviews = REVIEWS, title = "Customer Reviews" }) => {
    if (!reviews.length) return null;

    return (
        <section className="bg-[#eae9e6] px-4 py-14 sm:px-8 md:py-20">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-4xl text-neutral-950 sm:text-5xl" style={serif}>{title}</h2>

                <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((r) => (
                        <li key={r.name} className="rounded-3xl bg-[#f6f6f4] p-6 sm:p-8" style={font}>
                            <figure>
                                <figcaption className="flex items-center gap-4">
                                    <Avatar review={r} />
                                    <div>
                                        <p className="text-lg font-medium text-neutral-950 sm:text-xl">{r.name}</p>
                                        {r.title && <p className="text-neutral-600">{r.title}</p>}
                                    </div>
                                </figcaption>

                                <div className="mt-6 flex gap-2" role="img" aria-label={`${r.rating} out of 5 stars`}>
                                    {[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={n <= r.rating} />)}
                                </div>

                                <blockquote className="mt-6 leading-7 text-neutral-700">{r.text}</blockquote>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CustomerReviews;