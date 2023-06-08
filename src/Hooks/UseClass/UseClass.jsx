import React, { useEffect, useState } from 'react';

const UseClass = () => {

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('http://localhost:5000/class')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
                setLoading(false)
            })
    }, [])

    return [classes, loading]

};

export default UseClass;