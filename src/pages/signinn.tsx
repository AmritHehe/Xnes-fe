import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { CandlestickChart } from "lucide-react";

export function SignIn() {
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const navigate = useNavigate();

    function signMeIn() {
        axios
            .post("http://localhost:3000/signin", {
                username: username,
                email: "eh@bhosdu.com",
                pass: pass,
            })
            .then((res) => {
                const data = res.data;
                localStorage.setItem("token", data.token);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                alert("Sign in failed");
            });
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary text-primary-foreground rounded-lg mb-4">
                        <CandlestickChart className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Enter your credentials to access the terminal
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full h-10 bg-secondary/50 border border-input focus:border-ring px-3 text-sm outline-none transition-colors"
                            placeholder="Trader123"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Password</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full h-10 bg-secondary/50 border border-input focus:border-ring px-3 text-sm outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button onClick={signMeIn} className="w-full h-10 font-bold" size="lg">
                        Sign In
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary hover:underline font-medium">
                            Create one
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
