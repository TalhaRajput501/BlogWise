import React, { useState, useEffect } from 'react'
import { data, Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../service/database.js'
import { Container, Button } from '../components/index.js'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import loader from '../assets/loader2.gif'


function Post() {

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState()
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const { slug } = useParams()

    const isAuthor = post && userData ? post.userId === userData.$id : false

        // setting  loading icon during post is getting 
        if (loading) {
            <div
                className="fixed inset-0 flex items-center justify-center bg-gray-600  z-50 "
            >
                <img src={loader} alt="Loading..." />
                {/* <h1>talha</h1> */}
            </div>
        } 

    // console.log('userData from state ',userData)
    // console.log(isAuthor)
    useEffect(() => {
        // setLoading(true) 
        if (slug) {
            databaseService.getPost(slug)
                .then((post) => {
                    if (post) { 
                        setPost(post)
                        setLoading(false)
                        // console.log(post)
                        // It help me a lot to understand isAuthor concept
                        // console.log('check weather ==const isAuthor = post && userData ? post.userId === userData.$id : false')
                        // console.log('Post is get by getpost using slug from db ======',post)
                        // console.log('userData coming from state ======', userData)

                    } else { 
                        navigate('/')
                    }
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate, userData])

    // Delete the post
    const deletePost = () => {
        databaseService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    databaseService.deleteFile(post.featuredImage);
                    navigate('/all-posts')
                }
            })
    }



    return post ? (
        <div className='bg-gray-900 min-h-screen '>
            <Container>
                <div className='flex justify-center flex-col items-center w-[90%] sm:w-[80%] mx-auto pt-23 '>

                    {/* Post image */}
                    <img
                        className='max-w-full w-[100%] h-[300px] sm:h-[600px] md:h-[700px] rounded-tr-2xl rounded-tl-2xl'
                        loading='lazy'
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                    />

                    <div
                    className='bg-gray-200 w-full rounded-bl-2xl rounded-br-2xl'
                    >
                        {/* Post title */}
                        <div
                            className=""
                        >
                            <h1
                                className="mb-4 text-3xl p-2 font-bold text-center md:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-gray-700 from-amber-400 "
                            >
                                {post.title}
                            </h1>
                        </div>

                        {/* Post body */}
                        <div>
                            <div className='browser-css text-center px-3 sm:px-10 pb-8 '>{parse(post.articleBody)}</div>
                        </div>

                        {/* Edit delete buttons */}
                        <div className=''>
                            {
                                isAuthor && (
                                    <div
                                        className='flex flex-col sm:flex-row pb-5 pt-6 justify-center items-center '
                                    >
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button
                                                className="flex mx-3  text-white border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg cursor-pointer"
                                                bgColor={'bg-purple-500'}
                                            >
                                                Edit Post
                                            </Button>
                                        </Link>


                                        <Button
                                            onclick={deletePost}
                                            className="flex mx-3 mt-2 sm:mt-0 text-white  border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg cursor-pointer"
                                            bgColor={'bg-purple-500'}
                                        >
                                            Delete
                                        </Button>
                                    </div>)
                            }
                        </div>
                        
                    </div>

                </div>

            </Container>
        </div>
        ) : null

}

export default Post
