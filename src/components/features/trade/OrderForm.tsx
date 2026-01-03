import React from "react";
import { Button } from "../../ui/Button";

interface OrderFormProps {
    currentPrice: number;
    buyPrice: number;
    qty: number;
    leverage: number;
    onQtyChange: (val: number) => void;
    onLeverageChange: (val: number) => void;
    onBuy: () => void;
    onSell: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
    currentPrice,
    buyPrice,
    qty,
    leverage,
    onQtyChange,
    onLeverageChange,
    onBuy,
    onSell,
}) => {
    const [activeTab, setActiveTab] = React.useState<"buy" | "sell">("buy");

    return (
        <div className="h-full flex flex-col bg-card text-card-foreground border-l border-border">
            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-border">
                <button
                    onClick={() => setActiveTab("buy")}
                    className={`h-10 text-sm font-medium transition-colors ${activeTab === "buy"
                            ? "bg-background text-up border-b-2 border-up"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setActiveTab("sell")}
                    className={`h-10 text-sm font-medium transition-colors ${activeTab === "sell"
                            ? "bg-background text-down border-b-2 border-down"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Sell
                </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
                {/* Market Price Display */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Market Price</span>
                    <span className={`font-mono font-bold ${activeTab === "buy" ? "text-up" : "text-down"}`}>
                        {activeTab === "buy" ? buyPrice.toFixed(2) : currentPrice.toFixed(2)}
                    </span>
                </div>

                {/* Inputs */}
                <div className="space-y-3">
                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 block">
                            Quantity (BTC)
                        </label>
                        <div className="flex items-center bg-input/50 border border-input focus-within:border-ring transition-colors rounded-none">
                            <input
                                type="number"
                                step="0.01"
                                value={qty}
                                onChange={(e) => onQtyChange(Number(e.target.value))}
                                className="flex-1 bg-transparent h-9 px-3 text-sm font-mono focus:outline-none"
                            />
                            <span className="pr-3 text-xs text-muted-foreground">BTC</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1 block">
                            Leverage
                        </label>
                        <div className="grid grid-cols-5 gap-1">
                            {[1, 5, 10, 25, 50].map((lev) => (
                                <button
                                    key={lev}
                                    onClick={() => onLeverageChange(lev)}
                                    className={`h-7 text-xs font-mono transition-all border ${leverage === lev
                                            ? "bg-secondary text-foreground border-foreground/50"
                                            : "bg-transparent text-muted-foreground border-input hover:border-foreground/30"
                                        }`}
                                >
                                    {lev}x
                                </button>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center bg-input/50 border border-input focus-within:border-ring transition-colors rounded-none">
                            <span className="pl-3 text-xs text-muted-foreground">Man</span>
                            <input
                                type="number"
                                value={leverage}
                                onChange={(e) => onLeverageChange(Number(e.target.value))}
                                className="flex-1 bg-transparent h-8 px-2 text-sm font-mono focus:outline-none text-right"
                            />
                            <span className="pr-3 text-xs text-muted-foreground">x</span>
                        </div>
                    </div>
                </div>

                {/* Summary Info */}
                <div className="space-y-1 py-2 border-t border-b border-border border-dashed my-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Margin Required</span>
                        <span className="font-mono">
                            {((qty * (activeTab === "buy" ? buyPrice : currentPrice)) / leverage).toFixed(2)} USDT
                        </span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Fees (0.1%)</span>
                        <span className="font-mono">
                            {(qty * (activeTab === "buy" ? buyPrice : currentPrice) * 0.001).toFixed(3)} USDT
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                {activeTab === "buy" ? (
                    <Button
                        className="w-full h-10 text-sm font-bold bg-up hover:bg-up/90 text-black border-none rounded-sm"
                        onClick={onBuy}
                    >
                        Buy / Long
                    </Button>
                ) : (
                    <Button
                        className="w-full h-10 text-sm font-bold bg-down hover:bg-down/90 text-black border-none rounded-sm"
                        onClick={onSell}
                    >
                        Sell / Short
                    </Button>
                )}
            </div>
        </div>
    );
};
