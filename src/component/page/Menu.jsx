import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CATEGORIES, MENU_ITEMS } from "../../data/menuData";

const font = { fontFamily: "Roboto, sans-serif" };

function DishImage({ item }) {
    const [failed, setFailed] = useState(false);
    return (
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
            {!failed && item.image ? (
                <img src={item.image} alt={item.name} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
            ) : (
                // Shown when the photo file doesn't exist yet
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-white to-neutral-200 text-6xl font-bold text-amber-600" style={{ fontFamily: "Philosopher, serif" }}>
                    {item.name.charAt(0)}
                </div>
            )}
        </div>
    );
}

function Prices({ item }) {
    if (item.sizes) {
        return (
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {item.sizes.map((s) => (
                    <li key={s.label} className="rounded-full bg-[#e2623a] px-3 py-1 text-sm font-medium text-white">
                        {s.label} · {s.price}
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-[#e2623a] px-5 py-2 text-lg font-medium text-white">
                {item.menuPrice ? `Seul ${item.price}` : item.price}
            </span>
            {item.menuPrice && (
                <span className="rounded-full bg-black px-5 py-2 text-lg font-medium text-white">Menu {item.menuPrice}</span>
            )}
        </div>
    );
}

const Menu = () => {
    const [params, setParams] = useSearchParams();
    const q = (params.get("q") ?? "").trim();
    const cat = CATEGORIES.includes(params.get("cat")) ? params.get("cat") : "All";

    const term = q.toLowerCase();
    const shown = MENU_ITEMS.filter(
        (i) =>
            (cat === "All" || i.category === cat) &&
            (!term || i.name.toLowerCase().includes(term) || i.description.toLowerCase().includes(term))
    );

    const pickCategory = (c) => {
        const next = new URLSearchParams(params);
        c === "All" ? next.delete("cat") : next.set("cat", c);
        setParams(next, { replace: true });
    };

    return (
        <section className="bg-[#eae9e6] px-4 py-12 sm:px-8 md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center gap-4 sm:gap-6">
                    <span className="h-[3px] flex-1 bg-linear-to-r from-transparent to-black" aria-hidden="true" />
                    <h1 className="whitespace-nowrap text-3xl text-neutral-950 sm:text-5xl" style={{ fontFamily: "Philosopher, serif" }}>
                        Our Menu
                    </h1>
                    <span className="h-[3px] flex-1 bg-linear-to-l from-transparent to-black" aria-hidden="true" />
                </div>

                {/* Category filter */}
                <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Menu categories">
                    {["All", ...CATEGORIES].map((c) => (
                        <button
                            key={c}
                            type="button"
                            aria-pressed={c === cat}
                            onClick={() => pickCategory(c)}
                            className={`shrink-0 rounded-full px-5 py-2 text-base font-medium transition ${c === cat ? "bg-black text-white" : "bg-[#e0dfdb] text-neutral-900 hover:bg-amber-600 hover:text-white"
                                }`}
                            style={font}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Search status (comes from the navbar search: /menu?q=...) */}
                <p className="mt-4 text-neutral-700" style={font} aria-live="polite">
                    {shown.length} {shown.length === 1 ? "dish" : "dishes"}
                    {q && (
                        <>
                            {" "}for “{q}”{" "}
                            <Link to={cat === "All" ? "/menu" : `/menu?cat=${encodeURIComponent(cat)}`} className="font-medium text-amber-700 underline">
                                Clear search
                            </Link>
                        </>
                    )}
                </p>

                {/* Dishes */}
                {shown.length ? (
                    <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {shown.map((item) => (
                            <li key={item.name} className="flex flex-col rounded-3xl bg-[#e0dfdb] p-4 text-center">
                                <DishImage item={item} />
                                <h2 className="mt-5 text-[1.1rem] font-bold text-neutral-900" style={font}>{item.name}</h2>
                                <p className="mt-3 flex-1 text-[0.9rem] leading-6 text-neutral-700" style={font}>{item.description}</p>
                                <Prices item={item} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-16 text-center text-xl text-neutral-700" style={font}>
                        No dishes found. Try another search or category.
                    </p>
                )}
            </div>
        </section>
    );
};

export default Menu;