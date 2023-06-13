import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyEnrolledClass = () => {
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/payments')
            .then((res) => res.json())
            .then((data) => {
                const filteredHistory = data.filter((payment) => payment.email === user.email);
                const sortedHistory = filteredHistory.sort((a, b) => b.date.localeCompare(a.date));
                setHistory(sortedHistory);
            });
    }, [user.email]);

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
                    {history.map((classItem, index) => (
                        <tr key={classItem._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={classItem.itemsImage} alt={classItem.itemNames} className="w-10 h-10" />
                            </td>
                            <td>{classItem.itemNames}</td>
                            <td>${classItem.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyEnrolledClass;