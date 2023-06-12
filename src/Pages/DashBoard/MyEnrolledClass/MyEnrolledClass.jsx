import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';

const MyEnrolledClass = () => {
    const [enrolledClass, setEnrolledClass] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/payments')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEnrolledClass(data);
            });
    }, []);

    return (
        <div>
            <SectionTitle subHeading="My Enrolled Class" heading="Enrolled Classes" />

            <Helmet>
                <title>Bajao | MyEnrolledClass</title>
            </Helmet>

            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr className="font-bold">
                        <th>#</th>
                        <th>Image</th>
                        <th>Class Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledClass.map((classItem, index) => (
                        <tr key={classItem._id.$oid}>
                            <td>{index + 1}</td>
                            <td className='flex gap-4'>
                                {classItem.itemImage.map((image, imageIndex) => (
                                    <img key={imageIndex} src={image} alt={classItem.itemNames[imageIndex]} className="w-10 h-10" />
                                ))}
                            </td>
                            <td>{classItem.itemNames.join(', ')}</td>
                            <td> ${classItem.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyEnrolledClass;
