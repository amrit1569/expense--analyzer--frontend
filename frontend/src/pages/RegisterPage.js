import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const BASE_URL =
  process.env.REACT_APP_API_URL;

await axios.post(`${BASE_URL}/auth/register`, {
    username: form.username,
    email: form.email,
    password: form.password
});

            toast.success("Registration Successful");

            navigate("/");

        } catch (err) {

            toast.error(err.response?.data || "Registration Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-950">

            <div className="bg-slate-900 p-8 rounded-xl w-96 shadow-lg">

                <h2 className="text-white text-3xl text-center font-bold mb-6">

                    Create Account

                </h2>

                <form onSubmit={register}>

                    <input
                        className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
                        placeholder="Username"
                        name="username"
                        value={form.username}
                        onChange={change}
                    />

                    <input
                        className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={change}
                    />

                    <input
                        type="password"
                        className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={change}
                    />

                    <input
                        type="password"
                        className="w-full mb-6 p-3 rounded bg-slate-800 text-white"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={change}
                    />

                    <button

                        className="w-full bg-violet-600 hover:bg-violet-700 p-3 rounded text-white"

                    >

                        {loading ? "Creating..." : "Register"}

                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">

                    Already have an account?

                    <Link

                        to="/"

                        className="text-violet-400 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}