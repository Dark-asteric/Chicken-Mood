import Order from "../page/Order";
import { useState } from "react";
import { Link } from "react-router";
import { MENU_ITEMS } from "../../data/menuData";
const FEATURED = ["Chicken Burger", "Chicken Pizza", "Tacos", "Bowl"];
const INTRO =
    "From crispy fried chicken to juicy burgers, pizzas and build-your-own tacos, here are a few favourites from our menu.";

const font = { fontFamily: "Roboto, sans-serif" };
const serif = { fontFamily: "Philosopher, serif" };

function FoodCard({ item, onOrder }) {
    const [failed, setFailed] = useState(false);
    const price = item.sizes || item.menuPrice ? `From ${item.price}` : item.price;
    const reveal = "transition-opacity duration-300";

    return (
        <article className="group relative" style={font}>
            <div className="aspect-[4.08/1] w-full" aria-hidden="true" />

            <div className="rounded-2xl border border-[#e2623a] bg-white transition-colors duration-300 group-hover:bg-[#e2623a] group-focus-within:bg-[#e2623a]">
                <div className="aspect-[2/1] w-full" aria-hidden="true" />

                <div className="flex flex-col items-center px-5 pb-6 text-center">
                    <div className="grid h-20 w-full place-items-center">
                        <div className={`col-start-1 row-start-1 ${reveal} group-hover:opacity-0 group-focus-within:opacity-0`}>
                            <h3 className="text-lg font-semibold text-neutral-950">{item.name}</h3>
                            <p className="mt-1 font-bold text-[#e2623a]">{price}</p>
                        </div>
                        <p className={`col-start-1 row-start-1 line-clamp-3 text-sm leading-6 text-white opacity-0 ${reveal} group-hover:opacity-100 group-focus-within:opacity-100`}>
                            {item.description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => onOrder(item)}
                        className="mt-3 cursor-pointer rounded-full bg-[#e2623a] px-9 py-2.5 text-lg font-medium text-white transition group-hover:bg-white group-hover:text-[#e2623a] group-focus-within:bg-white group-focus-within:text-[#e2623a] hover:bg-white hover:text-[#e2623a] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                    >
                        Order now
                    </button>
                </div>
            </div>
            <div className="absolute left-1/2 top-0 aspect-square w-[70%] -translate-x-1/2 overflow-hidden rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.15)]">
                {!failed && item.image ? (
                    <img src={item.image} alt={item.name} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-white to-neutral-200 text-6xl font-bold text-[#e2623a]" style={serif}>
                        {item.name.charAt(0)}
                    </div>
                )}
            </div>
        </article>
    );
}

const FoodItems = () => {
    const [selected, setSelected] = useState(null);

    const dishes = FEATURED.map((name) => MENU_ITEMS.find((i) => i.name === name)).filter(Boolean);

    return (
        <section className="bg-[#eae9e6] px-4 py-14 sm:px-8 md:py-20">
            <div className="mx-auto max-w-6xl border-b-2 border-black py-10">
                <h2 className="text-4xl text-neutral-950 sm:text-5xl" style={serif}>Food Items</h2>
                <p className="mt-5 max-w-4xl leading-7 text-neutral-800" style={font}>{INTRO}</p>

                <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {dishes.map((item) => (
                        <li key={item.name}>
                            <FoodCard item={item} onOrder={setSelected} />
                        </li>
                    ))}
                </ul>

                <div className="mt-12 flex justify-center">
                    <Link
                        to="/menu"
                        className="w-full max-w-sm rounded-full bg-[#e2623a] px-10 py-3 text-center text-xl font-medium text-white transition hover:bg-[#cf532c]"
                        style={font}
                    >
                        See More
                    </Link>
                </div>
            </div>
            <Order open={Boolean(selected)} item={selected ?? undefined} onClose={() => setSelected(null)} />
        </section>
    );
};

export default FoodItems;