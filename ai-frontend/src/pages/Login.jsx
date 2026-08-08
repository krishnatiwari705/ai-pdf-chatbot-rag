import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import loginBackground from "../assets/ai-login-bg.png";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    };

    const emailValid =
        formData.email.length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            formData.email
        );

    const passwordValid =
        formData.password.length >= 6;

    const canSubmit =
        emailValid && passwordValid && !loading;

    const greeting = useMemo(() => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";

        return "Good evening";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValid) {
            toast.error("Please enter a valid email.");
            return;
        }

        if (!passwordValid) {
            toast.error(
                "Password must be at least 6 characters."
            );
            return;
        }

        try {
            setLoading(true);

            const { data } = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            toast.success(
                data.message || "Login successful"
            );

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const particles = Array.from(
        { length: 18 },
        (_, index) => index
    );

    return (
        <div className="min-h-screen bg-[#050b1a] relative overflow-hidden">

            {/* Animated Background */}
            <div className="absolute inset-0">

                <img
                    src={loginBackground}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#050b1a]/25" />

                {/* Moving gradient */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] animate-login-glow" />

                <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[130px] animate-login-glow-reverse" />

                {/* Particles */}
                {particles.map((particle) => (
                    <span
                        key={particle}
                        className="absolute w-1 h-1 bg-indigo-300/60 rounded-full animate-login-particle"
                        style={{
                            left: `${(particle * 17) % 100}%`,
                            top: `${(particle * 29) % 100}%`,
                            animationDelay: `${particle * 0.35}s`,
                            animationDuration: `${
                                5 + (particle % 5)
                            }s`,
                        }}
                    />
                ))}

            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-10">

                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left Branding */}
                    <div className="hidden lg:block text-white">

                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-10">

                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                                <span className="text-2xl">
                                    ✨
                                </span>
                            </div>

                            <div>
                                <h1 className="font-bold text-xl">
                                    AI PDF Chatbot
                                </h1>

                                <p className="text-xs text-slate-400">
                                    Intelligent document assistant
                                </p>
                            </div>

                        </div>

                        {/* Heading */}
                        <div className="max-w-xl">

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">

                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                                <span className="text-xs text-slate-300">
                                    AI-powered document intelligence
                                </span>

                            </div>

                            <h2 className="text-5xl xl:text-6xl font-bold leading-tight">

                                Your documents.
                                <br />

                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
                                    Your questions.
                                </span>

                                <br />

                                AI answers.

                            </h2>

                            <p className="mt-6 text-slate-300/80 text-lg leading-relaxed max-w-lg">
                                Upload your PDF documents and
                                interact with them using
                                intelligent retrieval and
                                AI-powered answers.
                            </p>

                        </div>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-3 mt-8">

                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-sm text-slate-300">
                                📄 PDF Analysis
                            </div>

                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-sm text-slate-300">
                                🧠 RAG
                            </div>

                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-sm text-slate-300">
                                ✨ AI Answers
                            </div>

                        </div>

                    </div>

                    {/* Login */}
                    <div className="w-full max-w-md lg:ml-auto">

                        {/* Mobile logo */}
                        <div className="lg:hidden flex flex-col items-center mb-7 text-white">

                            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-3">
                                ✨
                            </div>

                            <h1 className="font-bold text-xl">
                                AI PDF Chatbot
                            </h1>

                            <p className="text-xs text-slate-400 mt-1">
                                Intelligent document assistant
                            </p>

                        </div>

                        {/* Card */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-black/30 p-7 sm:p-9">

                            {/* Header */}
                            <div className="mb-8">

                                <p className="text-sm font-semibold text-indigo-600">
                                    {greeting} 👋
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                                    Welcome back
                                </h2>

                                <p className="text-sm text-slate-500 mt-2">
                                    Sign in to continue chatting
                                    with your documents.
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Email */}
                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            ✉
                                        </span>

                                        <input
                                            type="email"
                                            name="email"
                                            value={
                                                formData.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className={`w-full rounded-xl border py-3.5 pl-11 pr-11 text-sm outline-none transition ${
                                                formData.email
                                                    ? emailValid
                                                        ? "border-emerald-400 bg-emerald-50/30"
                                                        : "border-red-300 bg-red-50/30"
                                                    : "border-slate-200 bg-slate-50"
                                            } focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                                        />

                                        {formData.email && (
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
                                                {emailValid
                                                    ? "✓"
                                                    : "!"}
                                            </span>
                                        )}

                                    </div>

                                    {formData.email &&
                                        !emailValid && (
                                            <p className="text-xs text-red-500 mt-1.5">
                                                Enter a valid email
                                                address.
                                            </p>
                                        )}

                                </div>

                                {/* Password */}
                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Password
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            🔒
                                        </span>

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={
                                                formData.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className={`w-full rounded-xl border py-3.5 pl-11 pr-12 text-sm outline-none transition ${
                                                formData.password
                                                    ? passwordValid
                                                        ? "border-emerald-400 bg-emerald-50/30"
                                                        : "border-red-300 bg-red-50/30"
                                                    : "border-slate-200 bg-slate-50"
                                            } focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (previous) =>
                                                        !previous
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                                        >
                                            {showPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                    {formData.password &&
                                        !passwordValid && (
                                            <p className="text-xs text-red-500 mt-1.5">
                                                Password must be at
                                                least 6 characters.
                                            </p>
                                        )}

                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-500 hover:via-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">

                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                            Signing in...

                                        </span>
                                    ) : (
                                        <span>
                                            Sign in →
                                        </span>
                                    )}
                                </button>

                            </form>

                            {/* Register */}
                            <div className="mt-7 pt-6 border-t border-slate-200 text-center">

                                <p className="text-sm text-slate-500">
                                    Don't have an account?{" "}

                                    <Link
                                        to="/register"
                                        className="font-semibold text-indigo-600 hover:text-purple-600 transition"
                                    >
                                        Create an account
                                    </Link>
                                </p>

                            </div>

                        </div>

                        <p className="text-center text-xs text-slate-400 mt-5">
                            Secure authentication · AI-powered document
                            conversations
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;