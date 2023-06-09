import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaDatabase, FaCartPlus } from "react-icons/fa";
import useCarts from '../../../Hooks/useCarts/useCarts';



const Header = () => {
    const { user, logout } = useContext(AuthContext)
    const [cart] = useCarts()
    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => {

                console.log(error)
            })
    }
    const navOptions = <>
        <li className='text-lg'><Link to='/'>Home</Link></li>
        <li className='text-lg'><Link to='/instuctors'>Instructors</Link></li>
        <li className='text-lg'><Link to='/classes'>Classes</Link></li>





        {
            // user takle
            user ? <>
                <button onClick={handleLogOut} className="btn btn-error btn-sm">Log Out</button>

                <li className='text-lg'><Link to='/dashboard/MySelectedClass'><button className="btn btn-sm">
                    <FaCartPlus />

                    <div className="badge badge-outline ">+{cart?.length || 0}</div>
                </button></Link></li>
            </> :
                // user na thakle
                <>
                    <li className='text-xl'><Link to='/login'>Login</Link></li></>
        }
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-70 h-12 bg-black text-white   ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl text-white font-bold">School Camp  </Link>

                </div>

                <div className="navbar-end py-4">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>

                    <img
                        className="rounded-full mr-4"
                        src={user?.photoURL}
                        alt="Profile Picture"
                        style={{ width: "60px", height: "50px" }}

                    />


                </div>
            </div>
        </div>
    );
};

export default Header;