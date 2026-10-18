import { useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reservation", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

const SearchBox = ({ className = "" }) => (
  <label className={`input rounded-3xl gap-0 ${className}`}>
    <input type="search" className="grow" placeholder="Search" />
    <svg className="h-[2em] opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
  </label>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-[#eae9e6]">
      <nav className="relative max-w-6xl mx-auto border-b-2 border-black">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-black font-bold text-2xl py-4 lg:py-0">
              Chicken <span className="text-amber-600">Mood</span>
            </p>
          </div>
          <div className="hidden md:flex items-center pl-15">
            <ul className="text-black flex items-center pr-5 py-5 text-xl gap-5">
              {LINKS.map((link) => (
                <li key={link.label} className="hover:text-amber-600">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <SearchBox />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden mr-5 flex h-10 w-10 items-center  justify-center rounded-md text-black hover:text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`md:hidden absolute left-0 right-0 top-full z-50 overflow-hidden bg-[#eae9e6] border-b border-black transition-all duration-300 ease-out motion-reduce:transition-none ${
            open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none border-b-0"
          }`}
        >
          <ul className="text-black flex flex-col text-xl px-5 pt-2">
            {LINKS.map((link) => (
              <li key={link.label} className="border-b border-black/10 last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 hover:text-amber-600"
                  tabIndex={open ? 0 : -1}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 py-4">
            <SearchBox className="w-full" />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;