
import { Layout } from "../components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function Wallet() {
    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Balance Card */}
                    <Card className="col-span-1 md:col-span-3 bg-secondary/10 border-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Estimated Value
                            </CardTitle>
                            <WalletIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-mono font-bold">$12,345.67</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-up font-bold">+2.5%</span> from last month
                            </p>
                            <div className="flex gap-4 mt-6">
                                <Button className="bg-up text-black font-bold hover:bg-up/90">
                                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Deposit
                                </Button>
                                <Button variant="outline">
                                    <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Asset List */}
                    <Card className="col-span-1 md:col-span-3 border-border">
                        <CardHeader>
                            <CardTitle>Assets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-sm text-left">
                                <thead className="text-muted-foreground border-b border-border">
                                    <tr>
                                        <th className="pb-3 pl-2">Asset</th>
                                        <th className="pb-3 text-right">Balance</th>
                                        <th className="pb-3 text-right">Value (USDT)</th>
                                        <th className="pb-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="group hover:bg-secondary/50">
                                        <td className="py-4 pl-2 font-medium flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#F7931A] flex items-center justify-center text-[10px] text-white font-bold">₿</div>
                                            Bitcoin
                                        </td>
                                        <td className="py-4 text-right font-mono">0.4521 BTC</td>
                                        <td className="py-4 text-right font-mono">$12,100.00</td>
                                        <td className="py-4 text-right">
                                            <Button variant="ghost" size="sm" className="text-up hover:text-up/80">Trade</Button>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-secondary/50">
                                        <td className="py-4 pl-2 font-medium flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#26A17B] flex items-center justify-center text-[10px] text-white font-bold">T</div>
                                            Tether
                                        </td>
                                        <td className="py-4 text-right font-mono">245.67 USDT</td>
                                        <td className="py-4 text-right font-mono">$245.67</td>
                                        <td className="py-4 text-right">
                                            <Button variant="ghost" size="sm" className="text-up hover:text-up/80">Trade</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
