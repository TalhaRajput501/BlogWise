import React from 'react'
import NotFoundImage from '../assets/404.png'
import { Button } from '../components/index.js'
import { Link } from 'react-router-dom'

function NoPageFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white ">
            <img
                src={NotFoundImage}
                alt="404 - Not Found"
                className="w-[300px] md:w-[400px] lg:w-auto  mb-6"
            />
            <h1 className="text-3xl font-bold mb-2 text-center p-1">Oops! Page Not Found</h1>
            <p className="text-center text-gray-300 max-w-md p-1">
                It seems like the page you're trying to visit doesn’t exist.
                Maybe you mistyped the URL or the page was moved.
            </p>
            
            <Link
            to={'/'}
            >
            <Button
                className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded  text-lg cursor-pointer mt-8 mb-2"
            >
                Go to Home
            </Button>
            </Link>
        </div>
    )
}

export default NoPageFound
