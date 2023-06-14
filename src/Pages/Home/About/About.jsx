import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.5,
                duration: 1,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.5,
                duration: 1,
            },
        },
    };

    return (
        <div>
            <SectionTitle subHeading="Our Introductions" heading="Welcome to Bajao" />
            <div className="hero min-h-min">
                <motion.div
                    className="hero-content flex-col lg:flex-row"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.img
                        src="https://i.ibb.co/0BMhmVW/pexels-rdne-stock-project-8082778.jpg"
                        className="lg:max-w-xl rounded-lg shadow-2xl"
                        alt="About Image"
                        variants={imageVariants}
                    />
                    <motion.div className="ms-16" variants={textVariants}>
                        <p className="text-2xl text-purple-900 font-semibold">Our Introductions</p>
                        <h1 className="text-5xl font-bold mt-4">Welcome to Bajao</h1>
                        <ul className="list-disc pl-6 my-4">
                            <li className="text-2xl font-semibold text-blue-950">Refreshing to get such a personal touch.</li>
                            <li className="text-2xl font-semibold text-blue-950">Duis aute irure dolor in reprehenderit in voluptate.</li>
                            <li className="text-2xl font-semibold text-blue-950">Velit esse cillum dolore eu fugiat nulla pariatur.</li>
                        </ul>
                        <button className="btn btn-primary">Get Started</button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
