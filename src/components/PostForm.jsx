import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, RTE, Input, Select, Container } from './index.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import authService from '../service/auth.js'
import databaseService from '../service/database.js' 
import loader from '../assets/loader2.gif'

function PostForm({ post }) {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const { control, handleSubmit, register, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      articleBody: post?.articleBody || '',
      status: post?.status || 'active',
    }
  })


  const submit = async (data) => {
    // loading Start
    setLoading(true)
    console.log("Clicked")  
    // console.log(data)
    console.log('=================')
    // console.log('userData',userData)
    // console.log('post',post) 

    if (post) {
      // Edit the existing post and handle file
      // setLoading(true)
      const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null

      if (file) {
        await databaseService.deleteFile(post.featuredImage)
      } 
      console.log('i am in existing post')
      const dbPost = await databaseService.upDatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
        articleBody: data.articleBody
        
      })
      
      if (dbPost) {
        setLoading(false)
        navigate(`/post/${dbPost.$id}`)
      }

    } else {
      // Creating new post 
      // setLoading(true)
      const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null

      if (file) {
        console.log('inside else it mean it is new post ')
        let fileId = file.$id
        data.featuredImage = fileId
        const newPost = await databaseService.creatPost({
          ...data,
          userId: userData.$id
        })
        if (newPost) {
          setLoading(false)
          navigate(`/post/${newPost.$id}`)
        }
      }
    }

  }

  // Real time change in slug value according to title
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')           // replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, '')    // remove non-alphanumeric characters except hyphen
        .replace(/--+/g, '-')           // collapse multiple hyphens
        .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens
    }
    return ''

  })

  useEffect(() => {
    if(post?.title){
      setValue('slug', slugTransform(post.title))
    }
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        // Here changing the slug value real time
        setValue('slug', slugTransform(value.title))
      }
      
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue, post?.title])



  return !loading ? (
    <Container>

      <div
        className='bg-gray-900 min-h-screen '
      >

        {/* Heading in top of add post page */}
        <div className="flex justify-center p-3">
          <h1 className="mb-4 text-3xl font-bold  tracking-tight  text-center px-2 md:text-4xl lg:text-5xl text-white  ">Write what <span className="underline underline-offset-3 decoration-8  decoration-amber-600">really matters</span></h1>
        </div>

        {/* Form to add Post */}
        <form className='h-full block sm:flex' onSubmit={handleSubmit(submit)}>
          <div className="w-full sm:w-2/6  p-2">



            {/* Input for Title */}
            <div className="p-2  m-2 ">
              <Input
                label='Title:'
                labelClassName='text-white font-bold'
                placeholder='Title...'
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register('title', {
                  required: true
                })}
              />
            </div>

            {/* Input for slug/id */}
            <div className="p-2  m-2 ">
              <Input
                label='Slug: '
                disabled
                // value={post.title.length > 0 ? slugTransform(post.title) : ''}
                labelClassName='text-white font-bold'
                placeholder="Don't worry about it ..."
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                {...register('slug', {
                  required: true
                })}
                onInput={(e) => {
                  setValue('slug', slugTransform(e.currentTarget.value))
                }}
              />
            </div>

            {/* Input for adding picture */}
            <div className="p-2  m-2 ">
              <Input
                label='Featured Image: '
                labelClassName='text-white font-bold block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                type='file'
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"
                accept='image/png, image/jpg, image.jpeg, image.gif'
                {...register('image', { required: !post })}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF</p>
            </div>

            {/* Select to make post public or not */}
            {/* <div className="p-2 m-2 flex justify-center ">
              <Select
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  p-2   transition-colors duration-200 ease-in-out"
                // className=" text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700  dark:placeholder-gray-400 "
                // optionClassName='bg-green-500'
                options={['active', 'inactive']}
                {...register('status', { required: true })}
              />
            </div> */}
            
            
          </div>

          <div className="w-full  sm:w-4/6 px-2  mt-3 p-2">
            {/* Real Time Editior for Blog content / body */}
            <RTE name='articleBody' control={control} defaultValue={getValues('articleBody')} />

            {/* Post the Blog  */}
            <div className=" pt-0 mt-0">
              <Button
                type='submit'
                className="flex mx-auto mt-16 text-white  border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg cursor-pointer"
                bgColor={'bg-purple-500'} 
              >
                {post ? 'Update' : 'Submit'}
              </Button>
            </div>
            
          </div>
          
        </form>
      </div>

    </Container>

  ) : 
  <div
      className="fixed inset-0 flex items-center justify-center bg-gray-600  z-50 "
    >
      <img src={loader} alt="Loading..." />
    </div>
}

export default PostForm
