import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCarts from '../../../Hooks/useCarts/useCarts';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const MyEnrolledClass = () => {
    const [cart] = useCarts();

    return (
        <div>
            <SectionTitle subHeading="My Enrolled Class" heading="Enrolled Classes" />

            <Helmet>
                <title>Summer Camp | MyEnrolledClass</title>
            </Helmet>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr className="font-bold">
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td className="">${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrolledClass;
