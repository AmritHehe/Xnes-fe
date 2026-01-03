import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/Button";
import { Moon, Sun, User, Wallet, Bell, Bitcoin } from "lucide-react";

interface NavbarProps {
    balance?: number;
    price?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ balance, price = 0 }) => {
    const [isDark, setIsDark] = useState(false);

    // Flash Effects
    const [flashState, setFlashState] = useState<"up" | "down" | null>(null);
    const prevPriceRef = useRef(price);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    // Flash effect on price prop change
    useEffect(() => {
        if (price > prevPriceRef.current) {
            setFlashState("up");
        } else if (price < prevPriceRef.current) {
            setFlashState("down");
        }
        prevPriceRef.current = price;

        const timeout = setTimeout(() => setFlashState(null), 300); // Reset flash
        return () => clearTimeout(timeout);
    }, [price]);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    // Calculate Long/Short prices (Spread) - Using real price
    const displayPrice = price > 0 ? price : 0;
    const longPrice = displayPrice * 1.0001;
    const shortPrice = displayPrice * 0.9999;

    return (
        <header className="w-full h-14 border-b border-border bg-card flex items-center justify-between px-4 z-40">
            {/* Left: Ticker & Logo */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Bitcoin className="text-[#F7931A] w-6 h-6 rotate-12" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold tracking-tight leading-none">BTC/USD</h2>
                        <span className="text-[10px] text-muted-foreground font-medium">Bitcoin</span>
                    </div>
                </div>

                <div className="h-8 w-px bg-border mx-2" />

                {/* Pricing Display */}
                <div className="flex items-center gap-6">
                    {/* Main Price - Static Text Color */}
                    <div className="flex flex-col text-foreground transition-colors duration-200">
                        <span className="text-lg font-mono font-bold leading-none tracking-tight">
                            {displayPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-medium opacity-70 underline decoration-dashed underline-offset-2">Mark Price</span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
                    {/* Long Price - Flashes Green BG on UP */}
                    <div className={`flex flex-col items-end px-2 py-1 rounded transition-colors duration-200 ${flashState === 'up' ? 'bg-up/30 text-up-foreground' : 'bg-transparent text-muted-foreground'}`}>
                        <span className={`font-bold ${flashState === 'up' ? 'text-up scale-110' : 'text-foreground'} transition-all`}>{longPrice.toFixed(2)}</span>
                        <span className="text-[10px]">Long</span>
                    </div>
                    {/* Short Price - Flashes Red BG on DOWN */}
                    <div className={`flex flex-col items-end px-2 py-1 rounded transition-colors duration-200 ${flashState === 'down' ? 'bg-down/30 text-down-foreground' : 'bg-transparent text-muted-foreground'}`}>
                        <span className={`font-bold ${flashState === 'down' ? 'text-down scale-110' : 'text-foreground'} transition-all`}>{shortPrice.toFixed(2)}</span>
                        <span className="text-[10px]">Short</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
                {balance !== undefined && (
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Total Balance</span>
                        <span className="text-sm font-mono font-bold">${balance.toFixed(2)}</span>
                    </div>
                )}

                <Button variant="success" size="sm" className="hidden md:flex gap-2">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>Deposit</span>
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Bell className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center border border-border">
                    <User className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </header>
    );
};
