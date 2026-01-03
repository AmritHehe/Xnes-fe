import React from "react";

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

    return (
        <div className="w-full h-full flex flex-col bg-card border-t border-border">
            {/* Tabs / Header */}
            <div className="flex border-b border-border">
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground border-b-2 border-primary bg-secondary/20">
                    Positions ({orders?.length || 0})
                </div>
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer">
                    Open Orders
                </div>
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer">
                    Order History
                </div>
            </div>

            <div className="flex-1 overflow-auto">
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
                                    No positions open
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
