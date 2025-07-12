import React from 'react'
import databaseService from '../service/database.js'
import { Link } from 'react-router-dom'


function PostCard({
    $id,
    title,
    featuredImage,
    articleBody
}) {


    const truncate = (html, maxLength = 100) => {
        if (!html) return 'nothing found'

        let tempDiv = document.createElement('div')
        tempDiv.innerHTML = html

        let text = tempDiv.textContent || tempDiv.innerHTML || ''

        if (text.length > maxLength) {
            // console.log('talha')
            return text.trim().slice(0, maxLength) + '...'
        }
        return text
    }

    return (
        <Link to={`/post/${$id}`}>

            <div 
            className='justify-center items-center hover:-translate-y-5 duration-300 ease-in-out rounded shadow hover:shadow-lg transition-all  max-w-[320px]   '
            >

                <div 
                className=" border   rounded-lg shadow-sm  bg-gray-800  border-purple-700  
                "
                >

                    
                    <img className=" max-w-md object-cover rounded  w-full 
                    h-[320px]  " 
                    src={databaseService.getFilePreview(featuredImage)} 
                    loading='lazy'
                    alt={title} 
                    />
                    

                    <div className="p-5"> 
                        <h5 className="mb-2 text-2xl font-bold tracking-tight    text-white">
                            {title}
                        </h5>
                        
                        <p className="mb-3 font-normal  text-gray-300 ">
                            {truncate(articleBody)}
                        </p>
                         
                    </div>
                </div>


            </div>
        </Link>
    )
}

export default PostCard
