
import { Hero } from "./Hero";
import { Features } from "./Features";

export const Landing = () => {
    return (
        <div className="min-h-screen bg-black font-sans selection:bg-up/30 selection:text-white">
            <Hero />
            <Features />

            {/* Simple Footer */}
            <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5 bg-black">
                <p>&copy; 2024 Xness. Trade Responsibly.</p>
            </footer>
        </div>
    );
};
