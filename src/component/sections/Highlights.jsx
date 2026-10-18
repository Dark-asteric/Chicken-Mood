import { useEffect, useState } from "react";
const ITEMS = [
    { name: "Chicken Burger", price: "€5.50", image: "chicken-burger.jpeg", description: "Filet de poulet pané maison, bacon ,salade, cornichon, cheddar" },
    { name: "Chicken Pizza", price: "€6.00", image: "chicken-pizza.jpg",  description: "Sauce tomate, fromage, poulet, pomme de terre, oignons, oeuf, olives" },
    { name: "Tacos", price: "€6.50", image: "tacos.png", description: "Tortilla garnie de viande, de fromage, de frites et de sauces savoureuses. " },
    { name: "Sandwich Tandoori", price: "€6.50", image: "sandwich-tandoori.jpg", description: "Lest, eos quatia quiam lab ipsapietur as remolupta volupta s. Ut aut" },
    { name: "Chicken Wings", price: "€6.50", image: "wings.jpg", description: "Lest, eos quatia quiam lab ipsapietur as remolupta volupta s. Ut aut" },
    { name: "Bowl Tenders", price: "€8.50", image: "bowl-tenders.jpeg", description: "morceaux de poulet croustillants et dorés, accompagnés de frites fondantes, et d’une sauce savoureuse." },
];

function useVisibleCount() {
    const calc = () =>
        typeof window === "undefined" ? 4 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1;
    const [count, setCount] = useState(calc);
    useEffect(() => {
        const onResize = () => setCount(calc());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return count;
}

function ArrowButton({ direction, onClick }) {
    const isLeft = direction === "left";
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={isLeft ? "Previous dishes" : "Next dishes"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e2623a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eae9e6]"
        >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isLeft ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
            </svg>
        </button>
    );
}

function MenuCard({ item }) {
    return (
        <article className="relative pt-0">
            {/* Card body */}
            <div className="mt-[calc(50%)] flex flex-col items-center rounded-3xl bg-[#e0dfdb] px-6 pb-10 pt-[calc(50%+2rem)] text-center">
                <h3 className="text-[1.1rem] font-bold text-neutral-900" style={{ fontFamily: "Roboto, sans-serif" }}>
                    {item.name}
                </h3>
                <p className="mt-5 text-[0.9rem] leading-6 text-neutral-700" style={{ fontFamily: "Roboto, sans-serif" }}>
                    {item.description}
                </p>
                <button
                    type="button"
                    className="mt-8 rounded-full bg-[#e2623a] px-9 py-3 text-lg font-medium text-white transition hover:bg-[#cf532c] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e0dfdb]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                >
                    {item.price}
                </button>
            </div>
            <div className="absolute left-0 -top-25 aspect-square w-full overflow-hidden rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white to-neutral-200 text-7xl">
                        <span role="img" aria-label={item.name}>{item.emoji}</span>
                    </div>
                )}
            </div>
        </article>
    );
}

export default function Highlights({ items = ITEMS, title = "Menu Highlights" }) {
    const visible = useVisibleCount();
    const [start, setStart] = useState(0);

    const maxStart = Math.max(0, items.length - visible);
    const safeStart = Math.min(start, maxStart);
    const prev = () => setStart(safeStart === 0 ? maxStart : safeStart - 1);
    const next = () => setStart(safeStart >= maxStart ? 0 : safeStart + 1);

    const gap = 30; // px between cards
    const slideWidth = `calc((100% - ${(visible - 1) * gap}px) / ${visible})`;

    return (
        <section className="min-h-screen bg-[#eae9e6] px-4 pt-30 pb-25 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mt-2 flex items-center gap-4 sm:gap-6">
                    <span className="h-[3px] flex-1 bg-gradient-to-r from-transparent to-black" aria-hidden="true" />
                    <h2 className="whitespace-nowrap text-3xl text-neutral-950 sm:text-5xl" style={{ fontFamily: "Philosopher, serif" }}>
                        {title}
                    </h2>
                    <span className="h-[3px] flex-1 bg-gradient-to-l from-transparent to-black" aria-hidden="true" />
                </div>
                <div className="relative mt-14 flex items-center gap-3 sm:gap-5">
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                        <ArrowButton direction="left" onClick={prev} />
                    </div>

                    <div className="mx-14 flex-1 overflow-hidden pb-1 sm:mx-16">
                        <div
                            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                            style={{
                                gap: `${gap}px`,
                                transform: `translateX(calc(-${safeStart} * (${slideWidth} + ${gap}px)))`,
                            }}
                        >
                            {items.map((item) => (
                                <div key={item.name} className="shrink-0" style={{ width: slideWidth }}>
                                    <MenuCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                        <ArrowButton direction="right" onClick={next} />
                    </div>
                </div>
            </div>
        </section>
    );
}