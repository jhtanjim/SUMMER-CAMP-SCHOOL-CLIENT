import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';



const Header = () => {
    const { user, logout } = useContext(AuthContext)

    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => {

                console.log(error)
            })



    }
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/instuctors'>Instructors</Link></li>
        <li><Link to='/dashboard'>Dashboard </Link></li>
        <li><Link to='/secret'>Secret</Link></li>



        {
            // user takle
            user ? <>
                <button onClick={handleLogOut} className="btn btn-error">Log Out</button>
            </> :
                // user na thakle
                <>
                    <li><Link to='/login'>Login</Link></li></>
        }
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-70  bg-black text-white   ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl text-white font-bold">School Camp  </Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">


                    <img
                        className="rounded-full mr-4"
                        src={user?.photoURL}
                        alt="Profile Picture"
                        style={{ width: "60px", height: "50px" }}

                    />
                    <span>{user?.displayName}</span>

                </div>
            </div>
        </div>
    );
};

export default Header;