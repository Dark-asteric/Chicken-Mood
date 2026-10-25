import { useEffect, useRef, useState } from "react";
import { MENU_ITEMS, MEATS, SAUCES } from "../../data/menuData";
import emailjs from '@emailjs/browser';

if (import.meta.env.DEV) console.info(`[Order] loaded ${MENU_ITEMS.length} dishes from menuData.js`);

// ---- "Compose" dishes (Tacos, Bowl): meat + sauce choices ----
// MEATS and SAUCES come from menuData.js. The number of meats is read from the
// selected size label ("M – 1 viande", "XL – 3 viandes"); sauces are capped by MAX_SAUCES.
const MAX_SAUCES = 2;
const MAX_QTY = 20;
const SAUCE_NAMES = SAUCES.map((sauce) => sauce.name);
const SPICY_SAUCES = new Set(SAUCES.filter((sauce) => sauce.spicy).map((sauce) => sauce.name));

const isComposable = (dish) => dish?.compose === true || dish?.category === "Compose";
const meatsAllowed = (option) => Number(/(\d+)\s*viande/i.exec(option?.label ?? "")?.[1]) || 1;

const toNumber = (price) =>
    parseFloat(String(price).replace(/[^0-9.,]/g, "").replace(",", ".")) || 0;

const euro = (n) => `€${n.toFixed(2)}`;
const optionsOf = (dish) =>
    dish?.sizes ??
    (dish?.menuPrice
        ? [
            { label: "Seul", price: dish.price },
            { label: "Menu", price: dish.menuPrice },
        ]
        : []);
const groupByCategory = (items) =>
    items.reduce((groups, i) => {
        (groups[i.category ?? ""] ??= []).push(i);
        return groups;
    }, {});

// ["Lardons", "Lardons", "Merguez"] -> "2× Lardons, Merguez"
const summarize = (list) => {
    const counts = new Map();
    list.forEach((name) => counts.set(name, (counts.get(name) ?? 0) + 1));
    return [...counts].map(([name, n]) => (n > 1 ? `${n}× ${name}` : name)).join(", ");
};

// One line of the order -> readable text
const compositionOf = (line) =>
    line.meats.length ? `Meat: ${summarize(line.meats)} | Sauce: ${summarize(line.sauces)}` : "";
const lineTotalOf = (line) => line.unitPrice * line.quantity;
const lineTitle = (line) =>
    `${line.quantity} × ${line.name}${line.optionLabel ? ` (${line.optionLabel})` : ""}`;
const lineText = (line) => {
    const composition = compositionOf(line);
    return `${lineTitle(line)}${composition ? ` — ${composition}` : ""} = ${euro(lineTotalOf(line))}`;
};

const ChoiceGroup = ({ legend, choices, selected, max, onAdd, onRemove, spicy = new Set() }) => {
    const full = selected.length >= max;
    return (
        <fieldset>
            <legend className="mb-1 text-sm font-medium">
                {legend}{" "}
                <span className="font-normal text-neutral-500">
                    (choose up to {max}, same one allowed · {selected.length}/{max})
                </span>
            </legend>
            <div className="flex flex-wrap gap-2">
                {choices.map((choice) => {
                    const count = selected.filter((v) => v === choice).length;
                    const dimmed = full && count === 0;
                    return (
                        <div
                            key={choice}
                            className={`flex items-stretch overflow-hidden rounded-xl border-2 text-sm ${count > 0 ? "border-amber-600 bg-amber-600/10" : "border-black/20"} ${dimmed ? "opacity-40" : ""}`}
                        >
                            {count > 0 && (
                                <button
                                    type="button"
                                    aria-label={`Remove one ${choice}`}
                                    onClick={() => onRemove(choice)}
                                    className="cursor-pointer px-2 text-base hover:bg-black/10"
                                >
                                    −
                                </button>
                            )}
                            <button
                                type="button"
                                aria-label={`Add ${choice}`}
                                disabled={full}
                                onClick={() => onAdd(choice)}
                                className="cursor-pointer px-3 py-1.5 enabled:hover:bg-black/5 disabled:cursor-not-allowed"
                            >
                                {choice}
                                {spicy.has(choice) && <span role="img" aria-label="spicy" title="Spicy"> 🌶️</span>}
                                {count > 0 && <span className="ml-1 font-semibold">×{count}</span>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
};

function OrderForm({ items, item, onClose, onSubmit }) {
    // Customer details
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        type: "pickup",
        address: "",
        notes: "",
    });

    // The dish currently being configured, and the dishes already added to the order
    const [pick, setPick] = useState({
        dish: item?.name ?? items[0]?.name ?? "",
        option: "",
        quantity: 1,
        meats: [],
        sauces: [],
    });
    const [cart, setCart] = useState([]);
    const nextId = useRef(0);

    const [done, setDone] = useState(false);
    const [submitted, setSubmitted] = useState(null); // { lines, total } shown on the thank-you screen
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState("");

    const setField = (key) => (e) =>
        setCustomer((c) => ({ ...c, [key]: e.target.value }));
    const setOption = (e) => setPick((p) => ({ ...p, option: e.target.value }));
    const setDish = (e) => setPick((p) => ({ ...p, dish: e.target.value, option: "" }));

    // Derived values for the dish being configured
    const dish = items.find((i) => i.name === pick.dish) ?? items[0];
    const options = optionsOf(dish);
    const option = options.find((o) => o.label === pick.option) ?? options[0];
    const unitPrice = toNumber(option ? option.price : dish?.price);

    const composable = isComposable(dish);
    const maxMeats = meatsAllowed(option);
    const chosenMeats = composable ? pick.meats.filter((m) => MEATS.includes(m)).slice(0, maxMeats) : [];
    const chosenSauces = composable ? pick.sauces.filter((s) => SAUCE_NAMES.includes(s)).slice(0, MAX_SAUCES) : [];

    // The same meat or sauce can be added more than once, up to the limit
    const addChoice = (key, value, selected, max) =>
        setPick((p) => (selected.length >= max ? p : { ...p, [key]: [...selected, value] }));

    const removeChoice = (key, value, selected) =>
        setPick((p) => {
            const index = selected.lastIndexOf(value);
            if (index === -1) return p;
            return { ...p, [key]: selected.filter((_, i) => i !== index) };
        });

    // Checks the dish being configured and turns it into an order line
    const buildLine = () => {
        if (!dish) return { problem: "Please choose a dish." };
        if (composable && chosenMeats.length === 0) return { problem: "Please choose at least one meat." };
        if (composable && chosenSauces.length === 0) return { problem: "Please choose at least one sauce." };
        return {
            line: {
                id: ++nextId.current,
                name: dish.name,
                optionLabel: option?.label ?? "",
                quantity: Number(pick.quantity),
                unitPrice,
                meats: chosenMeats,
                sauces: chosenSauces,
            },
        };
    };

    const addToOrder = () => {
        setError("");
        const { line, problem } = buildLine();
        if (problem) {
            setError(problem);
            return;
        }
        setCart((c) => [...c, line]);
        setPick((p) => ({ ...p, quantity: 1, meats: [], sauces: [] }));
    };

    const removeLine = (id) => setCart((c) => c.filter((line) => line.id !== id));

    const cartTotal = cart.reduce((sum, line) => sum + lineTotalOf(line), 0);
    const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
    // With an empty order, the dish being configured counts as the order
    const displayedTotal = cart.length ? cartTotal : unitPrice * pick.quantity;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        let lines = cart;
        if (lines.length === 0) {
            const { line, problem } = buildLine();
            if (problem) {
                setError(problem);
                return;
            }
            lines = [line];
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error("[Order] Missing EmailJS env vars:", {
                serviceId: !!serviceId,
                templateId: !!templateId,
                publicKey: !!publicKey,
            });
            setError("Online ordering is not configured yet. Please call us directly.");
            return;
        }

        setIsSending(true);

        const total = lines.reduce((sum, line) => sum + lineTotalOf(line), 0);
        const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
        const itemLines = lines.map(lineText);

        const orderData = {
            ...customer,
            items: lines,
            total: Number(total.toFixed(2)),
        };

        const templateParams = {
            customer_name: customer.name,
            customer_phone: customer.phone,
            order_type: customer.type.toUpperCase(),
            delivery_address: customer.type === 'delivery' ? customer.address : 'N/A (Pickup)',
            // One line per dish. dish_name carries the same text (separated by " | ")
            // so a template that only uses {{dish_name}} still shows the whole order.
            order_items: itemLines.join("\n"),
            dish_name: itemLines.join(" | "),
            dish_option: lines.length === 1 ? (lines[0].optionLabel || 'Standard') : 'See items',
            quantity: totalQuantity,
            total_price: euro(total),
            notes: customer.notes || 'No special instructions',
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, { publicKey });

            onSubmit?.(orderData);
            setSubmitted({ lines, total });
            setDone(true);
        } catch (err) {
            // EmailJS errors look like { status: 422, text: "The recipient's address is empty" }
            console.error("[Order] Failed to send email:", err?.status, err?.text, err);
            setError("Sorry, there was an issue sending your order. Please call us directly.");
        } finally {
            setIsSending(false);
        }
    };

    const renderDish = (i) => (
        <option key={i.name} value={i.name} className="bg-black text-white">
            {i.name} — {i.sizes || i.menuPrice ? `from ${i.price}` : i.price}
        </option>
    );

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-[#eae9e6] p-6 text-black shadow-2xl sm:rounded-3xl sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <h2
                        id="order-title"
                        className="text-3xl"
                        style={{ fontFamily: "Philosopher, serif" }}
                    >
                        {done ? "Thank you!" : "Place your order"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-500 text-white hover:bg-neutral-700"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                {done && submitted ? (
                    <div className="mt-6 space-y-5">
                        <p className="text-lg">Your order has been submitted successfully!</p>
                        <ul className="space-y-2 rounded-xl bg-white p-4 text-base">
                            {submitted.lines.map((line) => (
                                <li key={line.id}>
                                    <p className="font-medium">{lineTitle(line)}</p>
                                    {compositionOf(line) && <p className="text-sm text-neutral-600">{compositionOf(line)}</p>}
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg">
                            For {customer.type === "pickup" ? "pickup" : "delivery"}.
                            Total <strong>{euro(submitted.total)}</strong>.
                        </p>
                        <p className="text-sm">We’ll contact {customer.name} on {customer.phone} shortly.</p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn cursor-pointer rounded-xl border-none bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 mt-2"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">
                                Name
                                <input required value={customer.name} onChange={setField("name")} autoComplete="name" className="input mt-1 w-full rounded-xl text-black bg-white border border-gray-300 px-3 py-2" placeholder="Your name" />
                            </label>

                            <label className="block text-sm font-medium">
                                Phone
                                <input required type="tel" value={customer.phone} onChange={setField("phone")} autoComplete="tel" className="input mt-1 w-full rounded-xl text-black bg-white border border-gray-300 px-3 py-2" placeholder="06 12 34 56 78" />
                            </label>
                        </div>

                        {/* ---- Add a dish ---- */}
                        <div className="space-y-4 rounded-2xl border-2 border-black/10 bg-white/50 p-4">
                            <p className="text-sm font-semibold">Add a dish</p>

                            <div className="grid grid-cols-[1fr_auto] gap-4">
                                <label className="block text-sm font-medium">
                                    Dish <span className="font-normal text-neutral-500">({items.length} available)</span>
                                    <select value={pick.dish} onChange={setDish} className="select mt-1 w-full rounded-xl text-black bg-white border border-gray-300 px-3 py-2">
                                        {Object.entries(groupByCategory(items)).map(([category, list]) =>
                                            category ? (
                                                <optgroup key={category} label={category} className="bg-black text-white">
                                                    {list.map(renderDish)}
                                                </optgroup>
                                            ) : (
                                                list.map(renderDish)
                                            )
                                        )}
                                    </select>
                                </label>

                                <div className="text-sm font-medium">
                                    Qty
                                    <div className="mt-1 flex h-10 items-center gap-1 rounded-xl bg-white px-1 border border-gray-300">
                                        <button type="button" aria-label="Decrease quantity" onClick={() => setPick((p) => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))} className="h-8 w-8 cursor-pointer rounded-lg text-lg hover:bg-black/10">−</button>
                                        <span className="w-6 text-center">{pick.quantity}</span>
                                        <button type="button" aria-label="Increase quantity" onClick={() => setPick((p) => ({ ...p, quantity: Math.min(MAX_QTY, p.quantity + 1) }))} className="h-8 w-8 cursor-pointer rounded-lg text-lg hover:bg-black/10">+</button>
                                    </div>
                                </div>
                            </div>

                            {options.length > 0 && (
                                <label className="block text-sm font-medium">
                                    {dish.sizes ? "Size" : "Formula"}
                                    <select value={option?.label ?? ""} onChange={setOption} className="select mt-1 w-full rounded-xl text-black bg-white border border-gray-300 px-3 py-2">
                                        {options.map((o) => (
                                            <option key={o.label} value={o.label} className="bg-black text-white">
                                                {o.label} — {o.price}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}

                            {composable && (
                                <div className="space-y-4">
                                    <ChoiceGroup
                                        legend="Meat"
                                        choices={MEATS}
                                        selected={chosenMeats}
                                        max={maxMeats}
                                        onAdd={(v) => addChoice("meats", v, chosenMeats, maxMeats)}
                                        onRemove={(v) => removeChoice("meats", v, chosenMeats)}
                                    />
                                    <ChoiceGroup
                                        legend="Sauce"
                                        choices={SAUCE_NAMES}
                                        spicy={SPICY_SAUCES}
                                        selected={chosenSauces}
                                        max={MAX_SAUCES}
                                        onAdd={(v) => addChoice("sauces", v, chosenSauces, MAX_SAUCES)}
                                        onRemove={(v) => removeChoice("sauces", v, chosenSauces)}
                                    />
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={addToOrder}
                                className="w-full cursor-pointer rounded-xl border-2 border-amber-600 px-4 py-2 font-medium text-amber-700 hover:bg-amber-600/10"
                            >
                                Add to order · {euro(unitPrice * pick.quantity)}
                            </button>
                        </div>

                        {/* ---- Dishes already in the order ---- */}
                        <div>
                            <p className="mb-1 text-sm font-medium">
                                Your order{" "}
                                {cart.length > 0 && (
                                    <span className="font-normal text-neutral-500">({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                                )}
                            </p>
                            {cart.length === 0 ? (
                                <p className="rounded-xl border-2 border-dashed border-black/20 px-4 py-3 text-sm text-neutral-600">
                                    Nothing added yet. Choose a dish above and press “Add to order”. You can add as many dishes as you like.
                                </p>
                            ) : (
                                <ul className="divide-y divide-black/10 rounded-xl border border-gray-300 bg-white">
                                    {cart.map((line) => (
                                        <li key={line.id} className="flex items-start justify-between gap-3 px-3 py-2 text-sm">
                                            <div>
                                                <p className="font-medium">{lineTitle(line)}</p>
                                                {compositionOf(line) && <p className="text-neutral-600">{compositionOf(line)}</p>}
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2">
                                                <span className="font-medium">{euro(lineTotalOf(line))}</span>
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${line.name}`}
                                                    onClick={() => removeLine(line.id)}
                                                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg hover:bg-black/10"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <fieldset className="flex gap-3">
                            <legend className="mb-1 text-sm font-medium">Order type</legend>
                            {[["pickup", "Pickup"], ["delivery", "Delivery"]].map(([value, label]) => (
                                <label key={value} className={`flex-1 cursor-pointer rounded-xl border-2 px-4 py-2 text-center ${customer.type === value ? "border-amber-600 bg-amber-600/10" : "border-black/20"}`}>
                                    <input type="radio" name="type" value={value} checked={customer.type === value} onChange={setField("type")} className="sr-only" />
                                    {label}
                                </label>
                            ))}
                        </fieldset>

                        {customer.type === "delivery" && (
                            <label className="block text-sm font-medium">
                                Delivery address
                                <input required value={customer.address} onChange={setField("address")} autoComplete="street-address" className="input mt-1 w-full rounded-xl text-black bg-white border border-gray-300 px-3 py-2" placeholder="Street, city" />
                            </label>
                        )}

                        <label className="block text-sm font-medium">
                            Notes (optional)
                            <textarea value={customer.notes} onChange={setField("notes")} rows={2} className="textarea mt-1 w-full rounded-xl text-black bg-white border border-gray-300 px-3 py-2" placeholder="No onions, extra sauce…" />
                        </label>

                        {error && <p role="alert" className="rounded-xl bg-red-100 px-4 py-2 text-sm text-red-800">{error}</p>}

                        <div className="flex items-center justify-between border-t-2 border-black pt-4">
                            <p className="text-xl font-bold">Total {euro(displayedTotal)}</p>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="btn cursor-pointer rounded-xl border-none bg-amber-600 hover:bg-amber-500 text-white py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                            >
                                {isSending ? "Processing..." : "Confirm order"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

const Order = ({ open, onClose, item, onSubmit }) => {
    const items = MENU_ITEMS;
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    return open ? (
        <OrderForm items={items} item={item} onClose={onClose} onSubmit={onSubmit} />
    ) : null;
};

export default Order;