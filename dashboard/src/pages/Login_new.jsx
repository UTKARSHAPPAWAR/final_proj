import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login( {setIsAuthenticated}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    const handelSignin = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        if( !(email && password)) {
            alert("All fields are required !!");
        }
        try {
            const res = await fetch( getUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (res.status == 400 && email && password) {
                alert("Invalid Credentials");
            }
            else if(res.status == 200){
                const { token } = await res.json(); 
                localStorage.setItem('token', token); 
                setIsAuthenticated(true);
                navigateTo("/ckc/carbon-calculator-dashboard");
            }
        } catch (err) {
            console.log("Error: ",err);
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-700 underline">
                   Log in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                    <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button 
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        onClick={handelSignin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
