import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'
import databaseService from '../service/database.js'


function EditPost() {

    const [post, setPost] = useState()
    const { slug } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    }
                })
                .catch((error) => {
                    console.log('post not found :: from frontend', error)
                })
        }else{
            navigate('/')
        }
    }, [slug, navigate])

    return  post ? 
    ( 
        <div>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div> 
    )
        : null
    
}

export default EditPost
