import React, { useState } from 'react'
import { Input, Button } from './index.js'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice/authSlice.js'
import authService from '../service/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import loader from '../assets/loader2.gif'

function Signup() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signupError, setSignupError] = useState(null)
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setLoading(true)
        setSignupError('')

        console.log('submit button clicked')
        try {
            const userSession = await authService.createAccount(data)

            if (userSession) {

                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))

                setLoading(false)
                navigate('/')



                // this is what appwrite return after making account
                console.log(userSession)
                // this is what appwrite return when i get current user
                console.log(userData)

            }

        } catch (error) {
            setSignupError(error)
            console.log('Error in signup :: signup component', error)
        }
    }

    return !loading ? (


        <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>


            <section className="text-gray-200  body-font relative">
                <div className="container px-5 py-24 mx-auto">

                    <div className="flex flex-col text-center w-full mb-6">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-">Sign up to get started</h1>
                        <p>
                            Already have an account
                            <Link
                                className='text-blue-500 underline ml-2'
                                to='/login'
                            >
                                logIn
                            </Link>
                        </p>
                    </div>

                    {
                        signupError &&
                        <p className='text-red-500 text-center'>
                            {signupError}
                        </p>
                    }

                    <div className="mx-auto  ">

                        <form className='flex flex-wrap ' onSubmit={handleSubmit(signup)}>
                            <div className='w-full'>

                                {/* input for name */}
                                <div className="p-2  m-2 ">
                                    <div className="relative">
                                        <Input
                                            type="text"  
                                            autoComplete="name"
                                            placeholder='Enter you name'
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            {...register('name', {
                                                required: true
                                            })}
                                        />
                                    </div>
                                </div>

                                {/* input for email */}
                                <div className="p-2  m-2 ">
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            autoComplete="email"
                                            placeholder='Enter you email'
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            {...register('email', {
                                                required: true,
                                                pattern: {
                                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                        />
                                    </div>
                                </div>

                                {/* Input for password */}
                                <div className="p-2  m-2 ">
                                    <div className="relative">
                                        <Input
                                            type="password"
                                            autoComplete="password"
                                            placeholder='Enter you password'
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                                            {...register('password', { required: true })}
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="p-2 w-full m-2 ">
                                <Button
                                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer"
                                    type='submit'
                                >
                                    Sign Up
                                </Button>
                            </div>

                        </form>

                    </div>

                </div>
            </section>
        </div>
    ) :
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-600  z-50 "
        >
            <img src={loader} alt="Loading..." />
        </div>
}

export default Signup
