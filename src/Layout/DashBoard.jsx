import React from 'react';
import { FaBook, FaCarAlt, FaHome, FaOpencart, FaPersonBooth, FaSave, FaSchool } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div className="drawer  lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content flex flex-col  justify-center ">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-outline drawer-button lg:hidden">Open drawer <FaOpencart />  </label>

            </div>
            <div className="drawer-side  bg-blue-100">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full ">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to='MySelectedClass'><FaSave />  My Selected Classes </NavLink>
                    </li>
                    <li>
                        <NavLink to='MyEnrolledClass'><FaBook />  My Enrolled Classes </NavLink>
                    </li>


                    <div className="divider"></div>
                    <li ><NavLink to='/'> <FaHome /> Home</NavLink></li>
                    <li ><NavLink to='/instuctors'> <FaPersonBooth />Instructors</NavLink></li>
                    <li ><NavLink to='/classes'> <FaSchool></FaSchool> Classes</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default DashBoard;