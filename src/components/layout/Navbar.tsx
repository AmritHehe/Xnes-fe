import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Moon, Sun, User, Wallet, Bell } from "lucide-react";

interface NavbarProps {
    balance?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ balance }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

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

    return (
        <header className="w-full h-14 border-b border-border bg-card flex items-center justify-between px-4 z-40">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold tracking-tight">BTC/USD</h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-up/10 text-up">+2.45%</span>
            </div>

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
