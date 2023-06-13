import React from 'react';
import { FaHome, FaSchool, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer p-10 bg-neutral text-neutral-content">
                <div>
                    <img className='h-40' src="https://i.ibb.co/mchsX1f/Bajao-removebg-preview.png" alt="" />
                    <p>Bajao Instrument<br />Providing Music company since 1992</p>
                </div>
                <div>
                    <span className="footer-title">Click </span>
                    <div className="grid grid-flow-col gap-4 ">
                        <li className='text-2xl list-none'><Link to='/' className="no-underline "><FaHome /></Link></li>
                        <li className='text-2xl list-none'><Link to='/instuctors' className="no-underline"><FaUser /></Link></li>
                        <li className='text-2xl list-none' ><Link to='/classes' className="no-underline"><FaSchool /></Link></li>
                    </div>

                </div>

            </div>
            <div className=" footer footer-center  p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © 2023 - All right reserved by jh tanjim</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;