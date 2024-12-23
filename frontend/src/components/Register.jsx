import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            alert("Registration successful!");
            navigate("/");
        } catch (error) {
            setMessage("Registration failed. Please try again.");
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Registration successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign in failed!");
            console.error(error);
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                        />
                        {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
                    </div>
                    {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}
                    <div>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                            Register
                        </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'>
                    Have an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link>
                </p>

                {/* Google sign in */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Register;