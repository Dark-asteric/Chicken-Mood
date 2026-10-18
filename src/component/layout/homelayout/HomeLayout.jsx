import Footer from '../../footer/Footer'
import Navbar from '../../Navbar/Navbar'
import { Outlet, ScrollRestoration } from 'react-router'

const HomeLayout = () => {
    return (
        // flex-col + min-h-screen makes `flex-1` on <main> work, so the footer sits at the bottom
        <div className="flex min-h-screen flex-col bg-[#eae9e6]">
            {/* sticky keeps the navbar visible while scrolling and needs no pt-18 gap under it */}
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
            <ScrollRestoration />
        </div>
    )
}

export default HomeLayout