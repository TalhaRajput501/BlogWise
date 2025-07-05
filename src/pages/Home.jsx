import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Button, Footer } from '../components'
import notebook from '../assets/notebook.jpg'
import { Link } from 'react-router-dom'

function Home() {

    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {

        // For debugging
        // console.log(userData)
    })

    return (
        <Container>
            {/* Banner Starts from here  */}
            
            <div
                className='w-full bg-gray-900'
            >
                {/* Hero Section  */}
                <section className="text-white body-font">
                    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">

                        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                            {/* Display user name from redux state */}
                            {
                                userData?.name ?
                                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                                        Hello {userData.name}!
                                    </h1>
                                    : null
                            }
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                                Big ideas start here,
                                <br className="hidden lg:inline-block" />
                                let your voice be heard.
                            </h1>
                            <p className='font-bold text-amber-600 mb-1' >"A place where your thoughts become timeless posts — publish what matters to you."</p>
                            <p className="mb-8 leading-relaxed">This is your space to write and share your thoughts. Talk about what you care about, tell your story, or just share something you’ve learned. Every post you write can help, inspire, or connect with someone. Your voice matters — and this is the place to use it.</p>

                            <div className="flex flex-col sm:flex-row">

                                <Link
                                    to={'/add-post'}
                                >
                                    <Button
                                        className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded  text-lg cursor-pointer  mb-2"
                                    >
                                        Post your story
                                    </Button>
                                </Link>

                                <Link
                                    to={'/all-posts'}
                                >
                                    <Button
                                        className=" sm:ml-4 inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600  rounded text-lg cursor-pointer "
                                    >
                                        Other’s Posts
                                    </Button>
                                </Link>

                            </div>

                        </div>

                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                            <img className="object-cover object-center rounded" alt="hero" src={notebook} />
                        </div>

                    </div>
                </section>

                <hr />

                {/* Features Section starts here */}
                <section className="text-gray-400 bg-gray-900 body-font">
                    <div className="container px-5 py-24 mx-auto">

                        <div className="text-center mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">Your Voice, Your Platform
                            </h1>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Write freely, connect deeply, and share your thoughts with the world — all in one powerful blogging platform.</p>
                            <div className="flex mt-6 justify-center">
                                <div className="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
                            </div>
                        </div>

                        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

                            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-white text-lg title-font font-medium mb-3">Live Post Analytics</h2>
                                    <p className="leading-relaxed text-base">Track real-time views, likes, and engagement on your blog posts. Stay in the loop with your audience and see what content performs best. Turn insights into strategy — grow smarter with every post.</p>

                                </div>
                            </div>

                            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">

                                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                        <circle cx="6" cy="6" r="3"></circle>
                                        <circle cx="6" cy="18" r="3"></circle>
                                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                    </svg>
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-white text-lg title-font font-medium mb-3">Easy Customization</h2>
                                    <p className="leading-relaxed text-base">Choose your style, layout, and themes. Personalize your blog without writing a single line of code. Make your blog feel truly yours — no tech skills required. Control every detail and create a space that reflects you.</p>

                                </div>
                            </div>

                            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>

                                <div className="flex-grow">
                                    <h2 className="text-white text-lg title-font font-medium mb-3">Your Blogging Profile</h2>
                                    <p className="leading-relaxed text-base">Build a author profile, showcase your best work, and grow your writing reputation online. Connect to your readers. Let your words build your digital identity. Be discovered, followed, and remembered by your audience.</p>

                                </div>
                            </div>

                        </div>

                        <Link to={'/signup'}>
                            <Button
                                className="flex mx-auto mt-16 text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg cursor-pointer"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* <hr className='text-gray-700' /> */}



                


            </div>


        </Container>
    )
}

export default Home
