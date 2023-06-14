import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { AuthContext } from '../../../Providers/AuthProvider';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch('https://summer-camp-school-server-jhtanjim.vercel.app/payments')
            .then((res) => res.json())
            .then((data) => {
                const filteredHistory = data.filter((payment) => payment.email === user.email);
                const sortedHistory = filteredHistory.sort((a, b) => b.date.localeCompare(a.date));
                setHistory(sortedHistory);
            });
    }, [user.email]);

    return (
        <div className="overflow-x-auto w-full">
            <Helmet>
                <title>Bajao | Payment History</title>
            </Helmet>
            <SectionTitle
                subHeading="Payment History"
                heading="Payment History"
            />
            <table className="table w-full">
                <thead>
                    <tr className="font-bold">
                        <th>#</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((payment, index) => (
                        <tr key={payment._id}>
                            <td>{index + 1}</td>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                            <td>{payment.email}</td>
                            <td>{payment.itemNames}</td>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
