import { Link } from "react-router";
import { CATEGORIES, MENU_ITEMS, SAUCES } from "../../data/menuData";
const STORY = [
    "At Chicken Mood we cook the food people crave: crispy fried chicken, juicy burgers, stone-baked pizzas, wraps, sandwiches and much more.",
    "Whether you're grabbing a quick lunch, feeding the whole family or ordering for friends, our menu has something for every appetite, from kids' meals to extra-large boxes made for sharing.",
];

const VALUES = [
    { icon: "🍗", title: "Fried chicken, done right", text: "Wings, tenders and nuggets served hot, in boxes or family buckets." },
    { icon: "🍔", title: "Something for everyone", text: "Burgers, pizzas, wraps, paninis and sandwiches, plus a kids' menu." },
    { icon: "🌶️", title: "Make it yours", text: "Build your own tacos or bowl: pick your meat and your sauce." },
];

const font = { fontFamily: "Roboto, sans-serif" };
const serif = { fontFamily: "Philosopher, serif" };

const About = () => {
    const stats = [
        { value: MENU_ITEMS.length, label: "Dishes on our menu" },
        { value: CATEGORIES.length, label: "Categories to explore" },
        { value: SAUCES.length, label: "Sauces to choose from" },
    ];

    return (
        <section className="bg-[#eae9e6] px-4 py-12 sm:px-8 md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center gap-4 sm:gap-6">
                    <span className="h-[3px] flex-1 bg-linear-to-r from-transparent to-black" aria-hidden="true" />
                    <h1 className="whitespace-nowrap text-3xl text-neutral-950 sm:text-5xl" style={serif}>About <span className="text-amber-500">Us</span></h1>
                    <span className="h-[3px] flex-1 bg-linear-to-l from-transparent to-black" aria-hidden="true" />
                </div>
                <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:gap-14">
                    <div className="text-center text-neutral-900 md:flex-1 md:text-left">
                        <h2 className="text-3xl font-extrabold sm:text-4xl">
                            Welcome to Chicken <span className="text-amber-600">Mood</span>
                        </h2>
                        <div className="mt-5 space-y-4 text-lg leading-8 text-neutral-700" style={font}>
                            {STORY.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center gap-3 md:justify-start">
                            <Link to="/menu" className="btn rounded-xl bg-amber-600 border-none hover:bg-amber-500">See our menu</Link>
                            <Link to="/contact" className="btn rounded-xl border-none bg-white text-black hover:bg-white/30">Contact us</Link>
                        </div>
                    </div>

                    <div className="flex aspect-square w-64 shrink-0 items-center justify-center rounded-full bg-white p-3 shadow-[8px_0px_15px_-3px_rgba(0,0,0,0.7)] sm:w-80 md:w-80 lg:w-96">
                        <img src="/burger.jpg" alt="Our signature burger" className="h-full w-full rounded-full object-cover" />
                    </div>
                </div>
                <ul className="mt-16 grid gap-6 md:grid-cols-3">
                    {VALUES.map((v) => (
                        <li key={v.title} className="rounded-3xl bg-[#e0dfdb] p-8 text-center">
                            <span className="text-5xl" role="img" aria-hidden="true">{v.icon}</span>
                            <h3 className="mt-4 text-xl font-bold text-neutral-900" style={font}>{v.title}</h3>
                            <p className="mt-3 leading-7 text-neutral-700" style={font}>{v.text}</p>
                        </li>
                    ))}
                </ul>
                <dl className="mt-16 grid gap-6 border-t-2 border-black pt-10 text-center sm:grid-cols-3">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="text-5xl font-extrabold text-amber-600" style={serif}>{s.value}</dd>
                            <p className="mt-2 text-neutral-700" style={font} aria-hidden="true">{s.label}</p>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default About;