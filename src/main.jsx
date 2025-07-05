import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, AllPosts, EditPost, Home,  LoginPage, Post, ProtectedLayout,  SignupPage } from './components/index.js'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children:
       [

        // Routes
        {
          path: '/',
          element: <Home />,
          
        },
        {
          path: 'all-posts',
          element: (
            
              <AllPosts /> 
          )
        },
        {
          path: 'login',
          element: (
            <ProtectedLayout authentication={false}>
              <LoginPage />
            </ProtectedLayout>
          )
        },
        {
          path: 'signup',
          element: (
            <ProtectedLayout authentication={false}>
              <SignupPage />
            </ProtectedLayout>
          )
        },
        {
          path: 'add-post',
          element : (
            <ProtectedLayout authentication >
              <AddPost />
            </ProtectedLayout>
          )
        },
        {
          path: 'edit-post/:slug',
          element: (
            <ProtectedLayout authentication >
              <EditPost />
            </ProtectedLayout>
          )
        },
        {
          path: 'post/:slug',
          element: (
            
              <Post />
            
          )
        }
      ]
    }
  ]
) 


createRoot(document.getElementById('root')).render(
 
    
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider> 
)
