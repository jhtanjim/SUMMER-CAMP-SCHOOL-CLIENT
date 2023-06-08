import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import PopularInstuctorCard from './PopularInstuctorCard';

const PopularInstuctors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('instuctorrs.json')
            .then(res => res.json())
            .then(data => {
                // Sort instructors based on the number of students in their class
                const sortedInstructors = data.sort((a, b) => b.numClasses - a.numClasses);
                // Get the top 6 instructors
                const popularInstructors = sortedInstructors.slice(0, 6);
                // Update the state with popular instructors
                setInstructors(popularInstructors);
            });
    }, []);

    return (
        <div className='my-32 	'>
            <SectionTitle
                subHeading='Popular Instructor'
                heading='Popular Instructor'
            ></SectionTitle>
            <div className='md:grid grid-cols-3 max-w-screen-2xl mx-auto space-y-8 '>
                {instructors.map(instructor => (
                    <PopularInstuctorCard
                        key={instructor.id}
                        instructor={instructor}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularInstuctors;
