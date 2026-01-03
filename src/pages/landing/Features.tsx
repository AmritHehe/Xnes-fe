import { Zap, TrendingUp, Shield, Globe } from "lucide-react";

// @ts-ignore
const FeatureCard = ({ icon: Icon, title, description, colSpan = 1 }) => (
    <div className={`col-span-1 md:col-span-${colSpan} p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:bg-secondary/20 transition-all group shadow-sm`}>
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-up" />
        </div>
        <h3 className="text-xl font-bold text-card-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
);

export const Features = () => {
    return (
        <section className="py-24 bg-background px-4 border-t border-border">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Built for Performance</h2>
                    <p className="text-muted-foreground">Everything you need to trade efficiently.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Zap}
                        title="Zero Latency"
                        description="Our matching engine executes orders in under 50 microseconds. Never miss a price swing again."
                        colSpan={2}
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        title="100x Leverage"
                        description="Maximize your exposure with industry-leading leverage on all major pairs."
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Bank-Grade Security"
                        description="Your assets are protected by cold storage and multi-sig wallets."
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Global Liquidity"
                        description="Access deep liquidity pools from top-tier providers worldwide."
                        colSpan={2}
                    />
                </div>
            </div>
        </section>
    );
};
