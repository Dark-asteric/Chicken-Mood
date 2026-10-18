import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MENU_ITEMS } from "../../data/menuData";

const LINKS = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About", to: "/about" },
    { label: "Reservation", to: "/reservation" },
    { label: "Contact", to: "/contact" },
];

const linkClass = ({ isActive }) => (isActive ? "text-amber-600" : "hover:text-amber-600");

// Live search: filters the menu as you type. Enter / the search icon / a suggestion
// all go to /menu?q=... (read it on the menu page with useSearchParams).
const SearchBox = ({ className = "", onNavigate, inline = false }) => {
    const navigate = useNavigate();
    const boxRef = useRef(null);
    const inputRef = useRef(null);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);

    const term = query.trim().toLowerCase();
    const results = term
        ? MENU_ITEMS.filter((i) => i.name.toLowerCase().includes(term) || i.description.toLowerCase().includes(term)).slice(0, 5)
        : [];

    // Close the suggestions when clicking outside
    useEffect(() => {
        const onDown = (e) => boxRef.current && !boxRef.current.contains(e.target) && setOpen(false);
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    const go = (text) => {
        const q = text.trim();
        if (!q) return inputRef.current?.focus();
        navigate(`/menu?q=${encodeURIComponent(q)}`);
        setOpen(false);
        setActive(-1);
        onNavigate?.();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        go(active >= 0 && results[active] ? results[active].name : query);
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive((a) => (results.length ? (a + 1) % results.length : -1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (results.length ? (a <= 0 ? results.length - 1 : a - 1) : -1));
        } else if (e.key === "Escape") {
            setOpen(false);
            setActive(-1);
        }
    };

    return (
        <div ref={boxRef} className={`relative ${className || "w-56 lg:w-64"}`}>
            <form role="search" onSubmit={onSubmit}>
                <label className="input w-full rounded-3xl gap-0">
                    <input
                        ref={inputRef}
                        type="search"
                        className="grow"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                            setActive(-1);
                        }}
                        onFocus={() => setOpen(true)}
                        onKeyDown={onKeyDown}
                        role="combobox"
                        aria-expanded={open && !!term}
                        aria-controls="search-results"
                        aria-autocomplete="list"
                        autoComplete="off"
                    />
                    <button type="submit" aria-label="Search" className="opacity-70 transition hover:opacity-100">
                        <svg className="h-[2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                    </button>
                </label>
            </form>

            {open && term && (
                <ul
                    id="search-results"
                    role="listbox"
                    className={`mt-2 overflow-hidden rounded-2xl bg-white text-black shadow-lg ring-1 ring-black/10 ${inline ? "" : "absolute left-0 right-0 top-full z-50"}`}
                >
                    {results.length ? (
                        results.map((item, i) => (
                            <li key={item.name} role="option" aria-selected={i === active}>
                                <button
                                    type="button"
                                    onMouseEnter={() => setActive(i)}
                                    onClick={() => go(item.name)}
                                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left ${i === active ? "bg-amber-600/15" : "hover:bg-black/5"}`}
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-sm text-neutral-500">{item.price}</span>
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-3 text-sm text-neutral-500">No dishes found for “{query.trim()}”</li>
                    )}
                </ul>
            )}
        </div>
    );
};

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll(); // handles a page that loads already scrolled
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section
            className={`transition-all duration-300 ${scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-[#eae9e6]"
                }`}
        >
            <nav className="relative mx-auto max-w-6xl border-b-2 border-black px-4 xl:px-0">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/" onClick={() => setOpen(false)} className="block">
                            <p className="text-black font-bold text-2xl py-4 lg:py-0">
                                Chicken <span className="text-amber-600">Mood</span>
                            </p>
                        </Link>
                    </div>

                    {/* Desktop links + search */}
                    <div className="hidden md:flex items-center pl-15">
                        <ul className="text-black flex items-center pr-5 py-5 text-xl gap-5">
                            {LINKS.map((link) => (
                                <li key={link.label}>
                                    <NavLink to={link.to} className={linkClass}>
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <SearchBox />
                    </div>

                    {/* Hamburger button (mobile) */}
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="md:hidden -mr-2 flex h-10 w-10 items-center justify-center rounded-md text-black hover:text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

                {/* Mobile dropdown */}
                <div
                    id="mobile-menu"
                    className={`md:hidden absolute left-0 right-0 top-full z-50 overflow-hidden ${scrolled ? "bg-white" : "bg-[#eae9e6]"} border-b border-black transition-all duration-300 ease-out motion-reduce:transition-none ${open ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none border-b-0"
                        }`}
                >
                    <ul className="text-black flex flex-col text-xl px-5 pt-2">
                        {LINKS.map((link) => (
                            <li key={link.label} className="border-b border-black/10 last:border-b-0">
                                <NavLink
                                    to={link.to}
                                    end={link.to === "/"}
                                    onClick={() => setOpen(false)}
                                    className={(state) => `block py-3 ${linkClass(state)}`}
                                    tabIndex={open ? 0 : -1}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="px-5 py-4">
                        <SearchBox className="w-full" inline onNavigate={() => setOpen(false)} />
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;