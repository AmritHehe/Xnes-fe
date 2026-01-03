import {
    LayoutDashboard,
    CandlestickChart,
    Wallet,
    History,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: CandlestickChart, label: "Trade", path: "/" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Wallet, label: "Wallet", path: "/wallet" },
        { icon: History, label: "History", path: "/history" },
    ];

    return (
        <aside className="w-14 lg:w-16 h-screen flex flex-col items-center border-r border-border bg-card py-4 z-50">
            {/* Logo Icon */}
            <div className="mb-8 p-2 rounded-lg bg-primary text-primary-foreground">
                <CandlestickChart className="w-6 h-6" />
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={cn(
                                "p-3 rounded-lg flex justify-center items-center transition-all group relative",
                                isActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                            )}
                            title={item.label}
                        >
                            <item.icon className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-up rounded-r-md" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-4 w-full px-2">
                <button className="p-3 rounded-lg flex justify-center items-center text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all">
                    <Settings className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                </button>
                <button className="p-3 rounded-lg flex justify-center items-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
                    <LogOut className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                </button>
            </div>
        </aside>
    );
};
