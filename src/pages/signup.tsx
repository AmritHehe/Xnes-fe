import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { CandlestickChart } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function SignUp() {
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const navigate = useNavigate();

    async function signMeUp() {
        await axios
            .post("http://localhost:3000/signup", {
                username: username,
                email: "eh@bhosdu.com",
                pass: pass,
            })
            .then((res) => {
                console.log(JSON.stringify(res));
                alert("Account created! Please sign in.");
                navigate("/signin");
            })
            .catch((err) => {
                console.error(err);
                alert("Sign up failed");
            });
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <Helmet>
                <title>Create Account | Apex Terminal</title>
                <meta name="description" content="Join Apex today. Start trading with zero latency, 100x leverage, and deep liquidity." />
            </Helmet>
            <div className="w-full max-w-sm space-y-8">
                <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary text-primary-foreground rounded-lg mb-4">
                        <CandlestickChart className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Start trading on the professional terminal
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
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Password</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full h-10 bg-secondary/50 border border-input focus:border-ring px-3 text-sm outline-none transition-colors"
                        />
                    </div>

                    <Button onClick={signMeUp} className="w-full h-10 font-bold" size="lg">
                        Create Account
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;