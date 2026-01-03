
import { Layout } from "../components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export default function History() {
    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Trade History</h1>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-sm text-left">
                            <thead className="text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="pb-3 pl-2">Time</th>
                                    <th className="pb-3">Symbol</th>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3 text-right">Price</th>
                                    <th className="pb-3 text-right">Amount</th>
                                    <th className="pb-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {/* Mock Data */}
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-secondary/50 transition-colors">
                                        <td className="py-4 pl-2 text-muted-foreground">2024-01-03 14:{30 + i}</td>
                                        <td className="py-4 font-bold">BTCUSDT</td>
                                        <td className={`py-4 font-bold uppercase ${i % 2 === 0 ? "text-up" : "text-down"}`}>
                                            {i % 2 === 0 ? "Buy" : "Sell"}
                                        </td>
                                        <td className="py-4 text-right font-mono">42,15{i}.00</td>
                                        <td className="py-4 text-right font-mono">0.0{i}5</td>
                                        <td className="py-4 text-right font-mono text-muted-foreground">1,23{i}.50</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
