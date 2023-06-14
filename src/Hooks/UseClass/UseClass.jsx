import React, { useEffect, useState } from 'react';

const UseClass = () => {

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://summer-camp-school-server-jhtanjim.vercel.app/class')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
                setLoading(false)
            })
    }, [])

    return [classes, loading]

};

export default UseClass;