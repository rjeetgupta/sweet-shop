import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-128px)]">
                <Outlet /> {/* Page content will be rendered here */}
            </main>
            <Footer />
        </>
    );
}
