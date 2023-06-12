import React, { useEffect, useState } from 'react';

const PaymentHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/payments')
            .then(res => res.json())
            .then(data => {
                const sortedHistory = data.sort((a, b) => b.date.localeCompare(a.date));
                setHistory(sortedHistory);
            });
    }, []);

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr className="font-bold">
                        <th>#</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Transaction Id</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((payment, index) => (
                        <tr key={payment.transactionId}>
                            <td>{index + 1}</td>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                            <td>{payment.email}</td>
                            <td>{payment.itemNames.join(', ')}</td>
                            <td>{payment.price}</td>
                            <td>{payment.transactionId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
