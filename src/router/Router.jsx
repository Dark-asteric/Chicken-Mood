import { createBrowserRouter } from "react-router";
import Home from "../component/page/Home";
import HomeLayout from "../component/layout/homelayout/HomeLayout";
import Menu from "../component/page/Menu";
import About from "../component/page/About";
import Contacts from "../component/page/Contacts";
import Reservation from "../component/page/Reservation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/menu",
                Component: Menu
            },
            { 
                path: "/about", 
                Component : About
            },
            { 
                path: "reservation", 
                Component: Reservation
            },
            { 
                path: "contact", 
                Component: Contacts
            },
            // { 
            //     path: "*", 
            //     element: <ComingSoon title="Page not found" /> },
        ]
    }
])

export default router;