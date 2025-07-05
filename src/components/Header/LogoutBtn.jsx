import React from 'react'
import { logout } from '../../features/authSlice/authSlice.js'
import { useDispatch } from 'react-redux'
import authService from '../../service/auth.js'


function LogoutBtn({
  className = ''
}) {

    const dispatch = useDispatch()

    const logOutHndler = () => {
      
      // Logging out the user
      authService.logOut()
      .then(() => {
        dispatch(logout())
      })

    }
  return (
    <button 
    className={className}
    onClick={logOutHndler}>
        Logout
    </button>
  )
}

export default LogoutBtn
