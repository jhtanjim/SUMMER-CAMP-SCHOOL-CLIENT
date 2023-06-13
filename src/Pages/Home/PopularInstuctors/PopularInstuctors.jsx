import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const PopularInstuctors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/users');
                const data = await response.json();
                const filteredInstructors = data
                    .filter(item => item.role === 'instuctor')
                    .slice(0, 6); // Slice to get only the top 6 instructors
                setInstructors(filteredInstructors);
                console.log(filteredInstructors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <SectionTitle
                subHeading="Popular Instructor" heading="Popular Instructor" />

            <div className="grid gap-x-4  sm:grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto sm:mx-48">
                {instructors.map(instructor => (
                    <div key={instructor._id} className="max-w-sm mx-4 my-6 bg-white rounded-lg shadow-lg">
                        <img src={instructor.image} alt={instructor.name} className="object-cover w-full h-60" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{instructor.name}</div>
                            <p className="text-gray-700 text-base">{instructor.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularInstuctors;
