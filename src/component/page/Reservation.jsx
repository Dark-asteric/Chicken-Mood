// Save as: src/component/page/Reservation.jsx
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";
const MAX_GUESTS = 20;
const font = { fontFamily: "Roboto, sans-serif" };
const serif = { fontFamily: "Philosopher, serif" };
const fieldClass = "mt-1 w-full rounded-xl";

// Today as YYYY-MM-DD in the visitor's own timezone (used as the earliest bookable date)
const todayLocal = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
};

const formatDate = (iso) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const emptyForm = () => ({ name: "", phone: "", email: "", date: "", time: "", guests: 2, notes: "" });

const Reservation = () => {
    const [form, setForm] = useState(emptyForm);
    const [status, setStatus] = useState("idle"); // idle | sending | done
    const [error, setError] = useState("");
    const [booked, setBooked] = useState(null);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    const changeGuests = (delta) => setForm((f) => ({ ...f, guests: Math.min(MAX_GUESTS, Math.max(1, f.guests + delta)) }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStatus("sending");
        try {
            const res = await fetch(`${API_URL}/api/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Request failed");
            setBooked(form);
            setForm(emptyForm());
            setStatus("done");
        } catch (err) {
            setError(err.message === "Failed to fetch" ? "Cannot reach the server. Please try again." : err.message);
            setStatus("idle");
        }
    };

    return (
        <section className="bg-[#eae9e6] px-4 py-12 sm:px-8 md:py-16">
            <div className="mx-auto max-w-2xl">
                <div className="flex items-center gap-4 sm:gap-6">
                    <span className="h-[3px] flex-1 bg-linear-to-r from-transparent to-black" aria-hidden="true" />
                    <h1 className="whitespace-nowrap text-3xl text-neutral-950 sm:text-5xl" style={serif}>Reservation</h1>
                    <span className="h-[3px] flex-1 bg-linear-to-l from-transparent to-black" aria-hidden="true" />
                </div>
                <p className="mx-auto mt-6 text-center text-lg text-neutral-700" style={font}>
                    Book a table in a few clicks. We’ll confirm your reservation by phone or email.
                </p>

                <div className="mt-10 rounded-3xl bg-[#e0dfdb] p-6 text-black sm:p-8">
                    {status === "done" && booked ? (
                        <div className="space-y-4 py-4 text-center" style={font}>
                            <p className="text-5xl" role="img" aria-hidden="true">🍽️</p>
                            <h2 className="text-2xl" style={serif}>Request received!</h2>
                            <p className="text-lg text-neutral-800">
                                Table for <strong>{booked.guests}</strong> on <strong>{formatDate(booked.date)}</strong> at <strong>{booked.time}</strong>,
                                under the name <strong>{booked.name}</strong>.
                            </p>
                            <p className="text-neutral-700">We’ll contact you on {booked.phone} to confirm it.</p>
                            <button type="button" onClick={() => setStatus("idle")} className="btn rounded-xl bg-amber-600 border-none hover:bg-amber-500">
                                Make another reservation
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4" style={font}>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block text-sm font-medium">
                                    Name
                                        <input required maxLength={80} value={form.name} onChange={set("name")} className={`text-white input ${fieldClass}`} placeholder="Your name" autoComplete="name" />
                                </label>
                                <label className="block text-sm font-medium">
                                    Phone
                                        <input required type="tel" maxLength={25} value={form.phone} onChange={set("phone")} className={`input ${fieldClass} text-white`} placeholder="06 12 34 56 78" autoComplete="tel" />
                                </label>
                            </div>

                            <label className="block text-sm font-medium">
                                Email (optional)
                                    <input type="email" maxLength={120} value={form.email} onChange={set("email")} className={`input ${fieldClass} text-white`} placeholder="you@example.com" autoComplete="email" />
                            </label>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <label className="block text-sm font-medium">
                                    Date
                                        <input required type="date" min={todayLocal()} value={form.date} onChange={set("date")} className={`input ${fieldClass} text-white`} />
                                </label>
                                <label className="block text-sm font-medium">
                                    Time
                                        <input required type="time" value={form.time} onChange={set("time")} className={`text-white input ${fieldClass}`} />
                                </label>
                                <div className="text-sm font-medium">
                                    Guests
                                    <div className="mt-1 flex h-10 items-center justify-between rounded-xl bg-white px-1">
                                        <button type="button" aria-label="Fewer guests" onClick={() => changeGuests(-1)} className="h-8 w-8 rounded-lg text-lg hover:bg-black/10">−</button>
                                        <span className="w-8 text-center" aria-live="polite">{form.guests}</span>
                                        <button type="button" aria-label="More guests" onClick={() => changeGuests(1)} className="h-8 w-8 rounded-lg text-lg hover:bg-black/10">+</button>
                                    </div>
                                </div>
                            </div>

                            <label className="block text-sm font-medium">
                                Special requests (optional)
                                <textarea maxLength={300} rows={3} value={form.notes} onChange={set("notes")} className={`text-white textarea ${fieldClass}`} placeholder="Birthday, baby chair, allergies…" />
                            </label>

                            {error && <p role="alert" className="rounded-xl bg-red-100 px-4 py-2 text-sm text-red-800">{error}</p>}

                            <button type="submit" disabled={status === "sending"} className="btn w-full rounded-xl bg-amber-600 border-none hover:bg-amber-500">
                                {status === "sending" ? "Sending…" : "Request reservation"}
                            </button>
                            <p className="text-center text-sm text-neutral-600">For groups of more than {MAX_GUESTS}, please contact us directly.</p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reservation;