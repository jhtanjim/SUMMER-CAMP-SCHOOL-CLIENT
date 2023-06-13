import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const About = () => {
    return (
        <div >
            <SectionTitle
                subHeading='Our Introductions
                '

                heading='Welcome to Bajao'></SectionTitle>
            <div className="hero min-h-min ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://i.ibb.co/0BMhmVW/pexels-rdne-stock-project-8082778.jpg" className="lg:max-w-xl rounded-lg shadow-2xl" />
                    <div className='ms-16'>
                        <p className='text-2xl text-purple-900 font-semibold'>Our Introductions</p>
                        <h1 className="text-5xl font-bold mt-4">Welcome to Bajao</h1>
                        <ul className="list-disc pl-6 my-4 ">
                            <li className="text-2xl font-semibold text-blue-950">Refreshing to get such a personal touch.</li>
                            <li className="text-2xl font-semibold text-blue-950">Duis aute irure dolor in reprehenderit in voluptate.</li>
                            <li className="text-2xl font-semibold text-blue-950">Velit esse cillum dolore eu fugiat nulla pariatur.</li>
                        </ul>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;