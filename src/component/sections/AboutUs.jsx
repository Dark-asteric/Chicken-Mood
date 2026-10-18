import { useState } from "react";

const STORY = {
    title: "Our Story",
    years: "",
    paragraphs: [
        "At Chicken Mood we cook the food people crave: crispy fried chicken, juicy burgers, pizzas, wraps, sandwiches and much more.",
        "Whether you're grabbing a quick lunch or feeding the whole family, there is something on our menu for every appetite.",
    ],
    bullets: ["Fried chicken, burgers, pizzas and more", "Build your own tacos and bowls"],
};

const CHEFS_INTRO = "Meet the team behind your favourite dishes.";
const CHEFS = [
    { name: "John Doe", image: "/chef-1.jpg", rating: 5 },
    { name: "James Smith", image: "/chef-2.jpeg", rating: 5 },
    { name: "James Vane", image: "/chef-3.avif", rating: 5 },
];

const font = { fontFamily: "Roboto, sans-serif" };
const serif = { fontFamily: "Philosopher, serif" };

const Star = ({ filled }) => (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${filled ? "text-[#e2623a]" : "text-neutral-300"}`} fill="currentColor" aria-hidden="true">
        <path d="m12 2 2.9 6.9 7.1.6-5.4 4.7 1.7 7.2L12 17.7 5.7 21.4l1.7-7.2L2 9.5l7.1-.6L12 2z" />
    </svg>
);


function ChefAvatar({ chef }) {
    const [failed, setFailed] = useState(false);
    return (
        <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-[#e2623a] bg-white p-1 sm:h-32 sm:w-32">
            {!failed && chef.image ? (
                <img src={chef.image} alt={chef.name} loading="lazy" onError={() => setFailed(true)} className="h-full w-full rounded-full object-cover" />
            ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-200 text-3xl font-bold text-[#e2623a]" style={serif}>
                    {chef.name.charAt(0)}
                </div>
            )}
        </div>
    );
}

const AboutUs = () => (
    <section className="bg-[#f6f6f4] px-4 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
            {/* Title with fading rules */}
            <div className="flex items-center gap-4 sm:gap-6">
                <span className="h-[3px] flex-1 bg-linear-to-r from-transparent to-black" aria-hidden="true" />
                <h2 className="whitespace-nowrap text-3xl text-neutral-950 sm:text-5xl" style={serif}>About Us</h2>
                <span className="h-[3px] flex-1 bg-linear-to-l from-transparent to-black" aria-hidden="true" />
            </div>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Story card */}
                <div className="rounded-3xl bg-[#e2623a] p-8 text-white sm:p-12" style={font}>
                    <h3 className="text-2xl font-medium sm:text-3xl">
                        {STORY.title} {STORY.years && <span>{STORY.years}</span>} :
                    </h3>
                    <div className="mt-6 space-y-3 leading-7 text-white/90">
                        {STORY.paragraphs.map((p) => <p key={p}>{p}</p>)}
                    </div>
                    <ul className="mt-6 space-y-3">
                        {STORY.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-4 text-white/90">
                                <span className="h-4 w-4 shrink-0 rounded-full bg-white" aria-hidden="true" />
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chefs */}
                <div style={font}>
                    <h3 className="text-2xl font-bold text-neutral-950 sm:text-3xl">Our Great Chefs :</h3>
                    <p className="mt-3 leading-7 text-neutral-700">{CHEFS_INTRO}</p>
                    <ul className="mt-8 flex flex-wrap justify-between gap-6">
                        {CHEFS.map((chef) => (
                            <li key={chef.name} className="flex flex-col items-center sm:items-start">
                                <ChefAvatar chef={chef} />
                                <p className="mt-3 font-semibold text-neutral-950">{chef.name}</p>
                                <div className="mt-1 flex gap-1" role="img" aria-label={`${chef.rating} out of 5 stars`}>
                                    {[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={n <= chef.rating} />)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

export default AboutUs;