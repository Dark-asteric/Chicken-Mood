import { Link } from "react-router";
import { CATEGORIES } from "../../data/menuData";
import { INFO } from "../../data/siteInfo";

const font = { fontFamily: "Roboto, sans-serif" };

const PAGES = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About", to: "/about" },
    { label: "Reservation", to: "/reservation" },
    { label: "Contact", to: "/contact" },
];

const SOCIAL_LABELS = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };

const linkClass = "text-neutral-300 transition hover:text-amber-500";
const headingClass = "mb-4 text-lg font-bold text-white";

const Footer = () => {
    const socials = Object.entries(INFO.socials ?? {}).filter(([, url]) => url);
    const hasInfo = INFO.address || INFO.phone || INFO.email || INFO.hours.length > 0;

    const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="bg-neutral-950 px-4 pt-14 text-neutral-300 sm:px-8" style={font}>
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block text-2xl font-bold text-white">
                            Chicken <span className="text-amber-600">Mood</span>
                        </Link>
                        <p className="mt-4 max-w-xs leading-7">
                            Crispy fried chicken, burgers, pizzas, wraps and more. Made to share, ready when you are.
                        </p>
                        {socials.length > 0 && (
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {socials.map(([key, url]) => (
                                    <li key={key}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full border border-neutral-600 px-4 py-1.5 text-sm text-white transition hover:border-amber-500 hover:text-amber-500"
                                        >
                                            {SOCIAL_LABELS[key] ?? key}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Pages */}
                    <nav aria-label="Footer">
                        <h2 className={headingClass}>Explore</h2>
                        <ul className="space-y-2">
                            {PAGES.map((p) => (
                                <li key={p.to}>
                                    <Link to={p.to} className={linkClass}>{p.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Menu categories">
                        <h2 className={headingClass}>Our menu</h2>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1 lg:grid-cols-2">
                            {CATEGORIES.map((c) => (
                                <li key={c}>
                                    <Link to={`/menu?cat=${encodeURIComponent(c)}`} className={linkClass}>{c}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div>
                        <h2 className={headingClass}>Find us</h2>
                        {hasInfo ? (
                            <ul className="space-y-3">
                                {INFO.address && (
                                    <li>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INFO.address)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={linkClass}
                                        >
                                            {INFO.address}
                                        </a>
                                    </li>
                                )}
                                {INFO.phone && (
                                    <li><a href={`tel:${INFO.phone.replace(/[^+\d]/g, "")}`} className={linkClass}>{INFO.phone}</a></li>
                                )}
                                {INFO.email && (
                                    <li><a href={`mailto:${INFO.email}`} className={linkClass}>{INFO.email}</a></li>
                                )}
                                {INFO.hours.length > 0 && (
                                    <li>
                                        <ul className="space-y-1 text-sm">
                                            {INFO.hours.map((h) => <li key={h}>{h}</li>)}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <p className="leading-7">
                                Questions or a big order?{" "}
                                <Link to="/contact" className="text-amber-500 underline">Get in touch</Link>.
                            </p>
                        )}
                        <Link to="/reservation" className="btn mt-6 rounded-xl border-none bg-amber-600 text-white hover:bg-amber-500">
                            Book a table
                        </Link>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 py-6 text-sm sm:flex-row">
                    <p>© {new Date().getFullYear()} Chicken Mood. All rights reserved. Build with ReactJS and TailwindCSS</p>
                    <button
                        type="button"
                        onClick={backToTop}
                        className="flex items-center gap-2 text-neutral-300 transition hover:text-amber-500"
                    >
                        Back to top
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 19V5M6 11l6-6 6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;