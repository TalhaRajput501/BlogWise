import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice/authSlice.js'
import { useSelector } from 'react-redux'

function ProtectedLayout({ children, authentication = true }) {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)



    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login') 
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    },[authStatus, authentication, navigate])

    return loading ? <h1>Protected Lyout...</h1> : <>{children}</>
}

export default ProtectedLayout
