import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // console.log(name, email, password);

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/register", {
                name,
                email,
                password
            });

            // console.log(response);

            alert("Registration Successful! Now you can login.");
            navigate("/login");
        } catch (error) {
            // console.log(error);
            alert("Registration Failed!");
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>

                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to="/login" className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage