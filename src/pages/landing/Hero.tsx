import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Moon, Sun } from "lucide-react";

export const Hero = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Sync with localStorage/system preference on mount
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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4 transition-colors duration-300">

            {/* Theme Toggle (Absolute Top Right for Landing) */}
            <div className="absolute top-6 right-6 z-50">
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full border border-border bg-card/50 backdrop-blur-sm">
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </div>

            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-up/10 blur-[120px] rounded-full pointer-events-none opacity-20 dark:opacity-20 opacity-40" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-down/5 blur-[100px] rounded-full pointer-events-none opacity-20 dark:opacity-20 opacity-40" />

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,100,100,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] drop-shadow-2xl">
                    <span className="block text-foreground">
                        TRADE AT THE
                    </span>
                    <span className="block text-foreground mt-2">SPEED OF LIGHT.</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                    Experience the next generation of trading. Zero latency. 100x Leverage.
                    Deep liquidity. Built for the pros.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link to="/trade">
                        <Button className="h-12 px-8 text-base font-bold bg-up text-black hover:bg-up/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,144,0.3)]">
                            Launch Terminal
                        </Button>
                    </Link>
                    <Link to="/docs">
                        <Button variant="outline" className="h-12 px-8 text-base border-border text-foreground hover:bg-secondary">
                            How to Trade
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
