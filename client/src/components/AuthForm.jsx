import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthForm({ onSubmit, isLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ name, email, password });
    };

    return (
        <form className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
                <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            )}
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <Button type="submit" className="w-full">{isLogin ? "Login" : "Register"}</Button>
        </form>
    );
}
