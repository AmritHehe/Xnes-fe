
import { Layout } from "../components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { TrendingUp, TrendingDown, AlertTriangle, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export default function Docs() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <Helmet>
                        <title>How to Trade | Apex Academy</title>
                        <meta name="description" content="Master crypto trading with Apex. Learn about leverage, liquidation, long vs short positions, and risk management." />
                    </Helmet>
                    <h1 className="text-4xl font-bold tracking-tight">Trading Guide</h1>
                    <p className="text-muted-foreground text-lg">Master the fundamentals of professional crypto trading.</p>
                </div>

                <div className="grid gap-6">
                    {/* Long vs Short */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-up/20 bg-up/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-up">
                                    <TrendingUp className="w-5 h-5" />
                                    Long Position (Buy)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed">
                                    Opening a <strong>Long</strong> position means you are buying an asset with the expectation that its price will <strong>RISE</strong>.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    <li>• Profit: Price goes UP.</li>
                                    <li>• Loss: Price goes DOWN.</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-down/20 bg-down/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-down">
                                    <TrendingDown className="w-5 h-5" />
                                    Short Position (Sell)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed">
                                    Opening a <strong>Short</strong> position means you are selling an asset with the expectation that its price will <strong>FALL</strong>.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    <li>• Profit: Price goes DOWN.</li>
                                    <li>• Loss: Price goes UP.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Leverage */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Play className="w-5 h-5 fill-foreground text-foreground" />
                                What is Leverage?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Leverage allows you to control a large position with a small amount of capital (Margin). It amplifies both your potential profits and losses.
                            </p>
                            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                                <h4 className="font-bold text-sm mb-2">Example: 10x Leverage</h4>
                                <p className="text-xs text-muted-foreground">
                                    With <strong>$100</strong> of your own money, you can open a position worth <strong>$1,000</strong>.
                                    If price moves <strong>1%</strong>, your PNL moves <strong>10%</strong>.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Liquidation */}
                    <Card className="border-destructive/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="w-5 h-5" />
                                Liquidation Risk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Liquidation occurs when your position's loss equals your Margin. The exchange automatically closes your position to prevent further loss.
                            </p>
                            <div className="bg-destructive/10 p-4 rounded text-xs text-destructive-foreground/80 font-mono">
                                Bankruptcy Price = Entry Price ± (Entry Price / Leverage)
                            </div>
                            <p className="text-xs text-muted-foreground">
                                <strong>Higher Leverage = High Risk.</strong> The Liquidation price is closer to your entry price.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
