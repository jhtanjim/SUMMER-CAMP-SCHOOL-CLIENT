import React, { useEffect, useState } from 'react';

const UseInstuctor = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:5000/instuctor')
            .then(res => res.json())
            .then(data => {

                setInstructors(data);
                setLoading(false)
            });
    }, []);

    return [loading, instructors]
};

export default UseInstuctor;