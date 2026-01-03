import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
    balance?: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, balance }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Navbar balance={balance} />
                <main className="flex-1 overflow-auto p-1 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
};
