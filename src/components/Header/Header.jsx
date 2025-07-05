import React, { useState } from "react";
import { LogoutBtn, Container, Button } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../../service/auth.js";


function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            goto: '/',
            active: true
        },
        {
            name: "All Posts",
            goto: "/all-posts",
            active: true,
        },
        {
            name: "Login",
            goto: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            goto: "/signup",
            active: !authStatus,
        },
        {
            name: "Add Post",
            goto: "/add-post",
            active: authStatus,
        },
    ];



    const logOut = async () => {
        await authService.logOut()
        console.log('logout')
    }

    // Menu bar logic
    const [isOpen, setIsOpen] = useState(false)
    

 

    return (
        <header>
            <Container>  

                {/* Demo Links */}
                <nav className="bg-white dark:bg-purple-600/90    w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">

                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                        {/* Logo */}
                        <Link to='/'
                            className="flex justify-center items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-gray-800 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <span className="ml-3 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BlogWise</span>
                        </Link>

                        <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">

                            {/* Logout */}
                            {
                                authStatus && (
                                    <li className=" rounded-xl inline-flex">
                                        <LogoutBtn
                                            onClick={logOut}
                                            className=" cursor-pointer text-white font-bold rounded px-4 hover:bg-red-500 pt-[3px] pb-[3px] " 
                                            />
                                    </li>
                                )
                            }

                            {/* Hamburger Icon */}
                            <Button 
                            onclick={() =>{
                                setIsOpen(!isOpen)
                                // console.log(isOpen)
                            }} 
                            className="inline-flex items-center p-2 w-10 h-9 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-900" aria-controls="navbar-sticky" aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </Button>
                        </div>

                        {/* Middle navbar links */}
                        <div 
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"    id="navbar-sticky"
                        >
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                                {
                                    navItems.map((item) =>
                                        item.active === true ?
                                            (
                                                <li
                                                    className=" mx-3 rounded-xl list-none"
                                                    key={item.name}>
                                                    <NavLink
                                                        className={({ isActive }) => `cursor-pointer px-4 rounded-xl hover:text-amber-400 font-bold  pt-[3px] pb-[3px] 
                                                        ${isActive ? 'border-b-2 border-amber-400  text-amber-400'
                                                                : 'text-white'
                                                            }
                                                        `}
                                                        // onClick={() => navigate(item.goto)}
                                                        to={item.goto}
                                                    >
                                                        {item.name}
                                                        {/* {authStatus} */}
                                                    </NavLink>
                                                </li>
                                            )
                                            : null
                                    )
                                }
                            </ul>
                        </div>

                    </div>
                </nav>
                
                {/* Menu Bar starts here */}
                <div 
                className={ `w-full md:hidden bg-gray-800 overflow-hidden transition-all duration-500 ease-in-out  ${isOpen ? 'max-h-54' : 'max-h-0'} `}  
                >
                    <ul className=" p-2 ">
                                {
                                    navItems.map((item) =>
                                        item.active === true ?
                                            (
                                                <li
                                                    className=" mx-4 mt-1 p-1 rounded-xl list-none   "
                                                    key={item.name}>
                                                    <NavLink
                                                        className={({ isActive }) => `cursor-pointer px-4 rounded-xl hover:text-amber-400 font-bold  pt-[4px] pb-[4px] block w-full  border 
                                                        
                                                        ${isActive ? ' text-amber-400'
                                                                : 'text-white'
                                                            }
                                                        `}
                                                        // onClick={() => navigate(item.goto)}
                                                        to={item.goto}
                                                    >
                                                        
                                                        {item.name}
                                                        
                                                    </NavLink>
                                                </li>
                                            )
                                            : null
                                    )
                                }
                            </ul>
                </div>
            </Container>
        </header>
    );
}

export default Header;
