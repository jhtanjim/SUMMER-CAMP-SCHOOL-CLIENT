import React, { useEffect, useState } from 'react';
import Cover from '../Cover/Cover';

const InstructorData = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/users');
                const data = await response.json();
                const filteredInstructors = data.filter(item => item.role === 'instuctor');
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

            <Cover img='https://i.ibb.co/VJZ8sgd/pexels-kindel-media-7149181.jpg' title="Instructor" />

            <div className="lg:grid grid-cols-4  gap-4 lg:max-w-screen-2xl   mx-auto space-y-8 ">

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
}

export default InstructorData;