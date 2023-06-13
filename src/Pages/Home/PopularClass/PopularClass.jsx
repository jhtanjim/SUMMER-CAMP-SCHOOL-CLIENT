import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import PopularClassCard from './PopularClassCard';
import UseClass from '../../../Hooks/UseClass/UseClass';

const PopularClass = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/payments')
            .then(res => res.json())
            .then(data => {
                const popularClass = data.map(item => item.itemNames);
                setClasses(popularClass);
            });
    }, []);

    return (
        <div>
            <SectionTitle title="Popular Classes" />
            <div>
                {classes.map((itemNames, index) => (
                    <p key={index}>{itemNames}</p>
                ))}
            </div>
        </div>
    );
}

export default PopularClass;