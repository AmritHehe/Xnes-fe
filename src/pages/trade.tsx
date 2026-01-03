import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/layout/Layout";
import { TradingChart } from "../components/features/trade/TradingChart";
import { OrderForm } from "../components/features/trade/OrderForm";
import { PositionList } from "../components/features/trade/PositionList";

export function Trade() {
    const [price, setPrice] = useState<number>(0);
    const [buyPrice, setBuyPrice] = useState<number>(0);
    const [qty, setQty] = useState<number>(0.01);
    const [leverage, setLeverage] = useState<number>(1);
    const [balance, setBalance] = useState<number>(0);
    const [openOrders, setOpenOrders] = useState<any[]>([]);

    const getToken = () => localStorage.getItem("token");

    const refreshUserData = () => {
        const token = getToken();
        if (!token) return;

        axios
            .get("http://localhost:3000/balance", { headers: { authorization: token } })
            .then((res) => setBalance(res.data.balance))
            .catch((err) => console.error(err));

        axios
            .get("http://localhost:3000/order/open", { headers: { authorization: token } })
            .then((res) => {
                const orders = res.data["open orders"];
                setOpenOrders(Array.isArray(orders) ? orders : []);
            })
            .catch((err) => {
                console.error(err);
                setOpenOrders([]);
            });
    };

    useEffect(() => {
        refreshUserData();
    }, []);

    useEffect(() => {
        let ws: WebSocket | null = new WebSocket("ws://localhost:8080");

        ws.onopen = () => console.log("Connected to WS");
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.priceBTC) setPrice(data.priceBTC);
                if (data.buyPriceBTC) setBuyPrice(data.buyPriceBTC);
            } catch (e) {
                console.error("WS Parse Error", e);
            }
        };
        ws.onerror = (e) => console.error("WS Error", e);

        return () => {
            if (ws) {
                ws.close();
                ws = null;
            }
        };
    }, []);

    const handleBuy = async () => {
        const token = getToken();
        if (!token) return alert("Please sign in first");

        try {
            await axios.post(
                "http://localhost:3000/order/open",
                { qty, asset: "BTC", type: "buy", leverage: leverage > 1, l: leverage },
                { headers: { authorization: token } }
            );
            refreshUserData();
        } catch (err) {
            console.error(err);
            alert("Buy order failed");
        }
    };

    const handleSell = async () => {
        const token = getToken();
        if (!token) return alert("Please sign in first");

        try {
            await axios.post(
                "http://localhost:3000/trade/sell",
                { qty, asset: "BTC", type: "buy", leverage: leverage > 1, l: leverage },
                { headers: { authorization: token } }
            );
            refreshUserData();
        } catch (err) {
            console.error(err);
            alert("Sell order failed");
        }
    };

    const handleCloseOrder = async (order: any) => {
        const token = getToken();
        const { orderId, tradeType, quantity, leverage: isLev, buyPrice: entryPrice, l } = order;

        try {
            const payload = {
                orderId, asset: "btc", type: "sell", qty: quantity, leverage: isLev, buyPrice: entryPrice, l
            };
            const endpoint = tradeType === 'buy' ? "http://localhost:3000/order/open" : "http://localhost:3000/trade/sell";
            await axios.post(endpoint, payload, { headers: { authorization: token } });
            refreshUserData();
        } catch (err) {
            console.error(err);
            alert("Failed to close order");
        }
    };

    return (
        <Layout balance={balance} price={price} buyPrice={buyPrice}>
            <div className="flex h-full w-full overflow-hidden">
                {/* Main Content Area: Chart and Positions */}
                <div className="flex-1 flex flex-col h-full min-w-0">
                    {/* Top: Chart */}
                    <div className="flex-1 min-h-[50%] relative border-r border-b border-border">
                        <TradingChart symbol="BTC" />
                    </div>
                    {/* Bottom: Positions */}
                    <div className="h-[250px] lg:h-[300px] border-r border-border bg-card">
                        <PositionList
                            orders={openOrders}
                            currentPrice={price}
                            onCloseObject={handleCloseOrder}
                        />
                    </div>
                </div>

                {/* Right Sidebar: Order Form (Fixed width) */}
                <div className="w-[280px] lg:w-[320px] h-full bg-card border-l border-border flex-shrink-0 z-20">
                    <OrderForm
                        currentPrice={price}
                        buyPrice={buyPrice}
                        qty={qty}
                        leverage={leverage}
                        onQtyChange={setQty}
                        onLeverageChange={setLeverage}
                        onBuy={handleBuy}
                        onSell={handleSell}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Trade;