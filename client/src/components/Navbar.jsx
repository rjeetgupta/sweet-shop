import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/authStore";
import { toast } from "sonner";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const isAdmin = user?.role === "admin";

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logout successfully")
        navigate("/login");
    };

    const NavLinks = () => (
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* <Link to="/" className="hover:text-purple-500">Dashboard</Link> */}

            {/* Admin Link */}
            {isAuthenticated && isAdmin && (
                <Link to="/admin-dashboard" className="hover:text-purple-500">Admin Dashboard</Link>
            )}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
                <div className="flex flex-col md:flex-row gap-2">
                    <Link to="/login">
                        <Button variant="outline" className="w-full md:w-auto">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="w-full md:w-auto">Register</Button>
                    </Link>
                </div>
            ) : (
                <Button variant="destructive" onClick={handleLogout} className="w-full md:w-auto">
                    Logout
                </Button>
            )}
        </div>
    );

    return (
        <header className="border-b shadow-sm bg-white">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold tracking-wide text-green-600">
                    SweetShop
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex">
                    <NavLinks />
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-4 mt-6">
                                <NavLinks />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
