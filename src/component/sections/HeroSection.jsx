import { useState } from "react";
import Order from "../page/Order";

const HeroSection = () => {
    const [orderOpen, setOrderOpen] = useState(false);

    return (
        <section className="bg-[#eae9e6] px-4 xl:px-0">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 border-b-2 border-black py-10 md:flex-row md:py-15">
                <div className="text-center text-black md:text-left">
                    <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                        Experience the <br />Perfect Blend of <br />Flavor
                    </h1>
                    <p className="text-gray-600 mt-5">Discover a world of irresistible flavors, freshly prepared with quality ingredients and a passion for great food. From crispy tenders to delicious tacos and loaded bowls, every bite is crafted to satisfy your cravings and make every meal unforgettable.</p>
                    <div className="flex justify-center gap-3 py-8 md:justify-start md:py-10">
                        <button className="btn rounded-xl border-none bg-white text-black hover:bg-white/30">Learn More</button>
                        <button onClick={() => setOrderOpen(true)} className="btn rounded-xl bg-amber-600 border-none hover:bg-amber-500">Order Now</button>
                    </div>
                </div>
                <div className="flex aspect-square w-72 shrink-0 items-center justify-center rounded-full bg-white p-3 shadow-[8px_0px_15px_-3px_rgba(0,0,0,0.7)] sm:w-96 sm:p-4 md:w-80 lg:w-112 xl:w-150 xl:p-5">
                    <img src="/burger.jpg" alt="Burger" className="h-full w-full rounded-full object-cover" />
                </div>
            </div>

            <Order
                open={orderOpen}
                onClose={() => setOrderOpen(false)}
                onSubmit={(order) => console.log("New order:", order)} // replace with your API call
            />
        </section>
    )
}

export default HeroSection