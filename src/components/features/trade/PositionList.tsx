import React, { useState } from "react";

interface Order {
    orderId: string;
    tradeType: "buy" | "sell";
    quantity: number;
    buyPrice: number;
    leverage: number;
    l: number;
}

interface PositionListProps {
    orders: Order[];
    currentPrice: number;
    onCloseObject: (order: Order) => void;
}

export const PositionList: React.FC<PositionListProps> = ({ orders, currentPrice, onCloseObject }) => {
    const [activeTab, setActiveTab] = useState<"positions" | "open" | "history">("positions");

    const calculatePL = (order: Order) => {
        const l = order.l;
        let pl = 0;
        if (order.tradeType === 'buy') {
            pl = (currentPrice * order.quantity * l) - (order.buyPrice * l);
        } else {
            pl = (order.buyPrice * l) - (currentPrice * order.quantity * l);
        }
        return pl.toFixed(2);
    };

    const renderTable = () => {
        if (activeTab === "positions") {
            return (
                <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b border-border">
                            <th className="h-8 px-4 font-medium text-muted-foreground w-20">Symbol</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground w-16">Side</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground">Size</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right">Entry Price</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right">Mark Price</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right">PNL (ROE%)</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {orders && Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order) => {
                                const entryPrice = order.buyPrice / order.quantity;
                                const pl = calculatePL(order);
                                const isProfit = Number(pl) >= 0;
                                const pnlClass = isProfit ? "text-up" : "text-down";
                                const bgClass = isProfit ? "bg-up/5" : "bg-down/5";

                                return (
                                    <tr key={order.orderId} className={`hover:bg-muted/50 transition-colors ${bgClass}`}>
                                        <td className="px-4 py-2 font-bold font-mono">BTCUSDT</td>
                                        <td className={`px-4 py-2 font-bold uppercase ${order.tradeType === 'buy' ? "text-up" : "text-down"}`}>
                                            {order.tradeType}
                                        </td>
                                        <td className="px-4 py-2 font-mono">
                                            {order.quantity} <span className="text-muted-foreground text-[10px]">BTC</span>
                                        </td>
                                        <td className="px-4 py-2 font-mono text-right">{entryPrice.toFixed(2)}</td>
                                        <td className="px-4 py-2 font-mono text-right">{currentPrice.toFixed(2)}</td>
                                        <td className={`px-4 py-2 font-mono text-right font-bold ${pnlClass}`}>
                                            {Number(pl) > 0 ? "+" : ""}{pl}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <button
                                                className="text-[10px] uppercase font-bold text-muted-foreground hover:text-white bg-secondary hover:bg-destructive px-2 py-1 rounded-sm transition-colors"
                                                onClick={() => onCloseObject(order)}
                                            >
                                                Close
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-muted-foreground italic">
                                    No open positions
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }

        if (activeTab === "open") {
            return (
                <div className="flex items-center justify-center h-full text-muted-foreground italic text-xs">
                    No open limit orders
                </div>
            );
        }

        if (activeTab === "history") {
            return (
                <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-card z-10">
                        <tr className="border-b border-border">
                            <th className="h-8 px-4 font-medium text-muted-foreground">Time</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground">Symbol</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground">Type</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right">Price</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right">Filled</th>
                            <th className="h-8 px-4 font-medium text-muted-foreground text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {/* Mock History Logic - In real app, fetch from API */}
                        <tr className="hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-2 text-muted-foreground">12:30:45</td>
                            <td className="px-4 py-2 font-bold font-mono">BTCUSDT</td>
                            <td className="px-4 py-2 font-bold uppercase text-up">Buy</td>
                            <td className="px-4 py-2 font-mono text-right">42,100.00</td>
                            <td className="px-4 py-2 font-mono text-right">0.05 BTC</td>
                            <td className="px-4 py-2 font-mono text-right">2,105.00</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-card border-t border-border">
            {/* Tabs / Header */}
            <div className="flex border-b border-border">
                <button
                    onClick={() => setActiveTab("positions")}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:text-foreground transition-colors ${activeTab === "positions"
                            ? "text-foreground border-b-2 border-primary bg-secondary/20"
                            : "text-muted-foreground"
                        }`}
                >
                    Positions ({orders?.length || 0})
                </button>
                <button
                    onClick={() => setActiveTab("open")}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:text-foreground transition-colors ${activeTab === "open"
                            ? "text-foreground border-b-2 border-primary bg-secondary/20"
                            : "text-muted-foreground"
                        }`}
                >
                    Open Orders
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:text-foreground transition-colors ${activeTab === "history"
                            ? "text-foreground border-b-2 border-primary bg-secondary/20"
                            : "text-muted-foreground"
                        }`}
                >
                    Order History
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                {renderTable()}
            </div>
        </div>
    );
};
