import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RiEyeLine,
  RiEyeOffLine,
  RiWalletLine,
  RiLockLine,
  RiMailLine,
  RiShieldCheckLine
} from 'react-icons/ri';

import { login, isAuthenticated } from '../services/authService';
import toast from 'react-hot-toast';

export default function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const validate = () => {

    const e = {};

    if (!form.email.trim()) {
      e.email = "Email is required";
    }

    if (!form.password) {
      e.password = "Password is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      await login(form.email, form.password);

      toast.success("Welcome back!");

      navigate("/dashboard");

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Invalid credentials";

      toast.error(typeof msg === "string" ? msg : "Login failed");

      setErrors({
        auth: "Invalid email or password"
      });

    } finally {

      setLoading(false);

    }

  };

  const set = (key) => (e) => {

    setForm((prev) => ({
      ...prev,
      [key]: e.target.value
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
      auth: ""
    }));

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">

      <div className="w-full max-w-md animate-slide-up">

        <div className="text-center mb-8">

          <div className="inline-flex w-14 h-14 rounded-2xl btn-gradient items-center justify-center mb-4 shadow-lg glow-violet">

            <RiWalletLine size={26} className="text-white" />

          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Expense Analyzer
          </h1>

          <p className="text-slate-500 text-sm mt-1.5">
            Sign in to your finance dashboard
          </p>

        </div>

        <div className="glass-card rounded-2xl p-7 border border-white/[0.06]">

          {errors.auth && (

            <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm animate-fade-in">

              {errors.auth}

            </div>

          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* EMAIL */}

            <div>

              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">

                Email

              </label>

              <div className="relative">

                <RiMailLine
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`input-glass w-full pl-10 pr-4 py-3 rounded-xl text-sm ${
                    errors.email ? "border-rose-500/50" : ""
                  }`}
                />

              </div>

              {errors.email && (

                <p className="text-rose-400 text-[11px] mt-1.5">

                  {errors.email}

                </p>

              )}

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">

                Password

              </label>

              <div className="relative">

                <RiLockLine
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`input-glass w-full pl-10 pr-11 py-3 rounded-xl text-sm ${
                    errors.password ? "border-rose-500/50" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-fast"
                >

                  {showPass ? (
                    <RiEyeOffLine size={16} />
                  ) : (
                    <RiEyeLine size={16} />
                  )}

                </button>

              </div>

              {errors.password && (

                <p className="text-rose-400 text-[11px] mt-1.5">

                  {errors.password}

                </p>

              )}

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl btn-gradient text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >

              {loading ? "Signing In..." : "Sign In"}

            </button>

          </form>

<div className="text-center mt-6">

  <p className="text-slate-400 text-sm">

    Don't have an account?

  </p>

  <Link
    to="/register"
    className="text-violet-400 hover:text-violet-300 font-semibold"
  >
    Create Account
  </Link>

</div>

<div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center justify-center gap-2 text-[11px] text-slate-600">

  <RiShieldCheckLine
    size={13}
    className="text-emerald-500"
  />

  Secured with JWT Authentication

</div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">

          Your data is encrypted and protected

        </p>

      </div>

    </div>

  );

}