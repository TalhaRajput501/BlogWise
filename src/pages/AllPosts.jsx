import React, {useState, useEffect} from 'react'
import databaseService from '../service/database.js'
import { PostCard , Container} from '../components'
// import { useLoader } from '@react-three/fiber'
import loader from '../assets/loader2.gif'


function AllPosts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        // databaseService.getFilePreview()
        console.log('inside all posts useEffect in which fetching data')
        
        const getPosts = async () => {

             
            await databaseService.getPosts()
            .then((post) => {
                if(post){
                    setPosts(post.documents)
                }
            })
            .catch((error) => {
                console.log('Error in getting posts ::  from frontend', error)
            })
        }

        getPosts()

    }, [])

    

    if(posts.length <= 0){
        return (
        <Container>
            <div
            className="fixed inset-0 flex items-center justify-center bg-gray-600  z-50 "
            >
                <img src={loader} alt="Loading..." />
            </div>
        </Container>
        )
    }
    
    

  return (

    <div
    
    className='min-h-screen  bg-gray-900'
    >
        <Container>
            <div
            className=''
            >
                
                <h1 className="mb-8 pt-5 text-3xl font-bold  tracking-tight  text-center  md:text-4xl lg:text-5xl text-white">Latest <span className="underline underline-offset-3 decoration-8  decoration-amber-600">Blogs</span> & <span className="underline underline-offset-3 decoration-8  decoration-amber-600">Articles</span></h1>    

                <div
                className='w-full flex flex-wrap justify-center gap-5 pb-9 pt-5  px-3 lg:px-1'
                >
                    {posts.map((post) => (
                        <div 
                        className=''
                        key={post.$id}
                        >
                            <PostCard 
                            title={post.title} 
                            featuredImage={post.featuredImage} 
                            $id={post.$id} 
                            articleBody={post.articleBody} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    </div>
    
  )
}

export default AllPosts
