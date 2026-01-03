
import { Helmet } from "react-helmet-async";
import { Hero } from "./Hero";
import { Features } from "./Features";

export const Landing = () => {
    return (
        <div className="min-h-screen bg-black font-sans selection:bg-up/30 selection:text-white">
            <Helmet>
                <title>Apex | The Fastest Crypto Terminal</title>
                <meta name="description" content="Experience zero latency trading with Apex. 100x leverage, deep liquidity, and institutional-grade execution. Join the elite." />
            </Helmet>
            <Hero />
            <Features />

            {/* Simple Footer */}
            <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5 bg-black">
                <p>&copy; 2024 Apex. Trade Responsibly.</p>
            </footer>
        </div>
    );
};
