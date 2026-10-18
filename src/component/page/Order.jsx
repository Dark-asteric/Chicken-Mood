import { useEffect, useState } from "react";
import { MENU_ITEMS } from "../../data/menuData";
if (import.meta.env.DEV) console.info(`[Order] loaded ${MENU_ITEMS.length} dishes from menuData.js`);

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

function OrderForm({ items, item, onClose, onSubmit }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        dish: item?.name ?? items[0]?.name ?? "",
        option: "",
        quantity: 1,
        type: "pickup",
        address: "",
        notes: "",
    });

    const [done, setDone] = useState(false);

    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const dish = items.find((i) => i.name === form.dish) ?? items[0];
    const options = optionsOf(dish);
    const option = options.find((o) => o.label === form.option) ?? options[0];
    const unitPrice = toNumber(option ? option.price : dish?.price);
    const total = dish ? unitPrice * form.quantity : 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dish) return;

        const orderData = {
            ...form,
            dish: dish.name,
            option: option?.label ?? "",
            quantity: Number(form.quantity),
            total: Number(total.toFixed(2)),
        };

        onSubmit?.(orderData);
        setDone(true);
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
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-500 text-white hover:bg-neutral-700"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                {done ? (
                    <div className="mt-6 space-y-5">
                        <p className="text-lg">
                            Your order has been submitted successfully!
                        </p>

                        <p className="text-lg">
                            {form.quantity} × <strong>{dish.name}</strong>
                            {option?.label ? ` (${option.label})` : ""}{" "}
                            for {form.type === "pickup" ? "pickup" : "delivery"}.
                            Total <strong>{euro(total)}</strong>.
                        </p>

                        <p className="text-sm">
                            We’ll contact {form.name} on {form.phone} shortly.
                        </p>

                        <button
                            type="button"
                            onClick={onClose}
                            className="btn rounded-xl border-none bg-amber-600 hover:bg-amber-500"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">
                                Name
                                <input
                                    required
                                    value={form.name}
                                    onChange={set("name")}
                                    autoComplete="name"
                                    className="input mt-1 w-full rounded-xl text-white"
                                    placeholder="Your name"
                                />
                            </label>

                            <label className="block text-sm font-medium">
                                Phone
                                <input
                                    required
                                    type="tel"
                                    value={form.phone}
                                    onChange={set("phone")}
                                    autoComplete="tel"
                                    className="input mt-1 w-full rounded-xl text-white"
                                    placeholder="06 12 34 56 78"
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-[1fr_auto] gap-4">
                            <label className="block text-sm font-medium">
                                Dish{" "}
                                <span className="font-normal text-neutral-500">({items.length} available)</span>
                                <select
                                    value={form.dish}
                                    onChange={set("dish")}
                                    className="select mt-1 w-full rounded-xl text-white"
                                >
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
                                <div className="mt-1 flex h-10 items-center gap-1 rounded-xl bg-white px-1">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        onClick={() =>
                                            setForm((f) => ({
                                                ...f,
                                                quantity: Math.max(1, f.quantity - 1),
                                            }))
                                        }
                                        className="h-8 w-8 rounded-lg text-lg hover:bg-black/10"
                                    >
                                        −
                                    </button>

                                    <span className="w-6 text-center">
                                        {form.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        onClick={() =>
                                            setForm((f) => ({
                                                ...f,
                                                quantity: Math.min(20, f.quantity + 1),
                                            }))
                                        }
                                        className="h-8 w-8 rounded-lg text-lg hover:bg-black/10"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        {options.length > 0 && (
                            <label className="block text-sm font-medium">
                                {dish.sizes ? "Size" : "Formula"}
                                <select
                                    value={option?.label ?? ""}
                                    onChange={set("option")}
                                    className="select mt-1 w-full rounded-xl text-white"
                                >
                                    {options.map((o) => (
                                        <option key={o.label} value={o.label} className="bg-black text-white">
                                            {o.label} — {o.price}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}

                        <fieldset className="flex gap-3">
                            <legend className="mb-1 text-sm font-medium">
                                Order type
                            </legend>

                            {[
                                ["pickup", "Pickup"],
                                ["delivery", "Delivery"],
                            ].map(([value, label]) => (
                                <label
                                    key={value}
                                    className={`flex-1 cursor-pointer rounded-xl border-2 px-4 py-2 text-center ${form.type === value
                                        ? "border-amber-600 bg-amber-600/10"
                                        : "border-black/20"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="type"
                                        value={value}
                                        checked={form.type === value}
                                        onChange={set("type")}
                                        className="sr-only"
                                    />
                                    {label}
                                </label>
                            ))}
                        </fieldset>

                        {form.type === "delivery" && (
                            <label className="block text-sm font-medium">
                                Delivery address
                                <input
                                    required
                                    value={form.address}
                                    onChange={set("address")}
                                    autoComplete="street-address"
                                    className="input mt-1 w-full rounded-xl text-white"
                                    placeholder="Street, city"
                                />
                            </label>
                        )}

                        <label className="block text-sm font-medium">
                            Notes (optional)
                            <textarea
                                value={form.notes}
                                onChange={set("notes")}
                                rows={2}
                                className="textarea mt-1 w-full rounded-xl text-white"
                                placeholder="No onions, extra sauce…"
                            />
                        </label>

                        <div className="flex items-center justify-between border-t-2 border-black pt-4">
                            <p className="text-xl font-bold">
                                Total {euro(total)}
                            </p>

                            <button
                                type="submit"
                                className="btn rounded-xl border-none bg-amber-600 hover:bg-amber-500"
                            >
                                Confirm order
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
const Order = ({
    open,
    onClose,
    item,
    onSubmit,
}) => {
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
        <OrderForm
            items={items}
            item={item}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    ) : null;
};

export default Order;