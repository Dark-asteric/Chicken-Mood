// Save as: src/component/page/Contacts.jsx
import { useState } from "react";
import { INFO } from "../../data/siteInfo";
import { postJson } from "../../utils/api";

const font = { fontFamily: "Roboto, sans-serif" };
const serif = { fontFamily: "Philosopher, serif" };
const fieldClass = "mt-1 w-full rounded-xl";

const InfoCard = ({ icon, title, children }) => (
    <li className="flex gap-4 rounded-3xl bg-[#e0dfdb] p-5">
        <span className="text-3xl" role="img" aria-hidden="true">{icon}</span>
        <div>
            <h3 className="text-lg font-bold text-neutral-900" style={font}>{title}</h3>
            <div className="mt-1 text-neutral-700" style={font}>{children}</div>
        </div>
    </li>
);

const Contacts = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | done
    const [error, setError] = useState("");
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    // Free keyless Google Maps embed + directions link, built from the address in siteInfo.js
    const mapQuery = encodeURIComponent(INFO.address);
    const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

    const hasInfo = INFO.address || INFO.phone || INFO.email || INFO.hours.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStatus("sending");
        try {
            await postJson("/api/contact", form);
            setForm({ name: "", email: "", message: "" });
            setStatus("done");
        } catch (err) {
            setError(err.message);
            setStatus("idle");
        }
    };

    return (
        <section className="bg-[#eae9e6] px-4 py-12 sm:px-8 md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center gap-4 sm:gap-6">
                    <span className="h-[3px] flex-1 bg-linear-to-r from-transparent to-black" aria-hidden="true" />
                    <h1 className="whitespace-nowrap text-3xl text-neutral-950 sm:text-5xl" style={serif}>Contact Us</h1>
                    <span className="h-[3px] flex-1 bg-linear-to-l from-transparent to-black" aria-hidden="true" />
                </div>
                <p className="mx-auto mt-6 max-w-xl text-center text-lg text-neutral-700" style={font}>
                    A question, a big order or some feedback? Send us a message and we’ll get back to you.
                </p>

                <div className={`mt-12 grid gap-10 ${hasInfo ? "lg:grid-cols-2" : "mx-auto max-w-xl"}`}>
                    {/* Contact details (only the ones you filled in) */}
                    {hasInfo && (
                        <ul className="space-y-4">
                            {INFO.address && (
                                <InfoCard icon="📍" title="Address">
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INFO.address)}`} target="_blank" rel="noreferrer" className="hover:text-amber-700 hover:underline">
                                        {INFO.address}
                                    </a>
                                </InfoCard>
                            )}
                            {INFO.phone && (
                                <InfoCard icon="📞" title="Phone">
                                    <a href={`tel:${INFO.phone.replace(/[^+\d]/g, "")}`} className="hover:text-amber-700 hover:underline">{INFO.phone}</a>
                                </InfoCard>
                            )}
                            {INFO.email && (
                                <InfoCard icon="✉️" title="Email">
                                    <a href={`mailto:${INFO.email}`} className="hover:text-amber-700 hover:underline">{INFO.email}</a>
                                </InfoCard>
                            )}
                            {INFO.hours.length > 0 && (
                                <InfoCard icon="🕒" title="Opening hours">
                                    <ul>{INFO.hours.map((h) => <li key={h}>{h}</li>)}</ul>
                                </InfoCard>
                            )}
                        </ul>
                    )}

                    {/* Message form */}
                    <div className="rounded-3xl bg-[#e0dfdb] p-6 text-black sm:p-8">
                        {status === "done" ? (
                            <div className="space-y-4 py-6 text-center">
                                <p className="text-5xl" role="img" aria-hidden="true">✅</p>
                                <h2 className="text-2xl" style={serif}>Message sent!</h2>
                                <p className="text-neutral-700" style={font}>Thank you, we’ll reply as soon as we can.</p>
                                <button type="button" onClick={() => setStatus("idle")} className="btn rounded-xl bg-amber-600 border-none hover:bg-amber-500">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4" style={font}>
                                <label className="block text-sm font-medium">
                                    Name
                                    <input required maxLength={80} value={form.name} onChange={set("name")} className={`input ${fieldClass} text-white`} placeholder="Your name" autoComplete="name" />
                                </label>
                                <label className="block text-sm font-medium">
                                    Email
                                        <input required type="email" maxLength={120} value={form.email} onChange={set("email")} className={`text-white input ${fieldClass}`} placeholder="you@example.com" autoComplete="email" />
                                </label>
                                <label className="block text-sm font-medium">
                                    Message
                                        <textarea required minLength={10} maxLength={1000} rows={5} value={form.message} onChange={set("message")} className={`textarea ${fieldClass} text-white`} placeholder="How can we help?" />
                                </label>

                                {error && <p role="alert" className="rounded-xl bg-red-100 px-4 py-2 text-sm text-red-800">{error}</p>}

                                <button type="submit" disabled={status === "sending"} className="btn w-full rounded-xl bg-amber-600 border-none hover:bg-amber-500">
                                    {status === "sending" ? "Sending…" : "Send message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Map (only when an address is set in siteInfo.js) */}
                {INFO.address && (
                    <div className="mt-12">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-2xl text-neutral-950 sm:text-3xl" style={serif}>Find us</h2>
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn rounded-xl border-none bg-amber-600 text-white hover:bg-amber-500"
                            >
                                Get directions
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-3xl bg-[#e0dfdb] shadow-md">
                            <iframe
                                title={`Map showing ${INFO.address}`}
                                src={mapSrc}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                className="h-80 w-full border-0 sm:h-96 lg:h-[28rem]"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contacts;