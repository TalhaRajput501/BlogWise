import React, { useState, useEffect } from 'react'
import authService from '../service/auth.js'
import { login as loginAction } from '../features/authSlice/authSlice.js'
import { Button, Input } from './index.js'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { returnFirstArg } from 'html-react-parser/lib/utilities'
import loader from '../assets/loader2.gif'



function Login() {

  const [loading, setLoading] = useState(false)
  const [loginError, setloginError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const handleLogin = async (data) => {
    setLoading(true)
    setloginError('')
    try {
      const session = await authService.login(data)
      // console.log('session:', session)
      if (session && session.code) {

        // console.log('talah',session.message);
        setLoading(false)
        setloginError(session.message)
        return 

      }
      const userData = await authService.getCurrentUser()
      if (userData) {
        // it gives me very tough time i am just not giving userData in {} it takes hours uff!!! 
        if (userData) dispatch(loginAction({ userData }))
        // setLoading(false)
        navigate('/add-post') 
        console.log('data get now go to addpost')
      }


    } catch (error) {
      // setloginError(error) 
      console.log('Error in login :: login component', error.message)
      setLoading(false)
      setloginError('Unexpected error occurred')

    }

  }


  return !loading ? (

    <div className='flex flex-col justify-center items-center bg-gray-900 w-full h-screen'>


      <section className="text-gray-200 body-font relative">
        <div className="container px-5 py-24 mx-auto">

          <div className="flex flex-col text-center w-full mb-6">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Login to your account</h1>
            <p>
              Don't have an account
              <Link
                className='text-blue-500 underline ml-2'
                to='/signup'
              >
                signUp
              </Link>
            </p>
          </div>

          {
            loginError &&
            <p className='text-red-500 text-center'>
              {loginError}
            </p>
          }

          <div className="mx-auto  ">

            <form className='flex flex-wrap ' onSubmit={handleSubmit(handleLogin)}>
              <div className='w-full'>

                {/* Input for email */}
                <div className="p-2  m-2 ">
                  <div className="relative">
                    <Input
                      type="email"
                      autoComplete="current-email"
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
                      autoComplete="current-password"
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
                  Log In
                </Button>
              </div>

            </form>

          </div>

        </div>
      </section>
    </div>
  ) : <div
    className="fixed inset-0 flex items-center justify-center bg-gray-600  z-50 "
  >
    <img src={loader} alt="Loading..." />
  </div>
}

export default Login
