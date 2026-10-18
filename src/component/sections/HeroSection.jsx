const HeroSection = () => {
    return (
        <section className="bg-[#eae9e6]">
            <div className="max-w-6xl mx-auto py-15 flex items-center justify-between gap-5">
                <div className="text-black">
                    <h1 className="text-6xl font-extrabold">Experience the <br />Perfect Blend of <br />Flavor</h1>
                    <p></p>
                    <div className="flex gap-3 py-10">
                        <button className="btn rounded-xl bg-white text-black border-none hover:bg-white/30">Learn More</button>
                        <button className="btn rounded-xl bg-amber-600 border-none hover:bg-amber-500">Order Now</button>
                    </div>
                </div>
                <div className="border border-white rounded-full bg-white w-150 h-150 flex items-center justify-center shadow-[8px_0px_15px_-3px_rgba(0,0,0,0.7)]">
                    <img src="/public/burger.jpg" alt="" className="rounded-full w-140 h-140 shrink-0" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection