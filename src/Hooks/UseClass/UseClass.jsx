import React, { useEffect, useState } from 'react';

const UseClass = () => {

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('class.json')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
                setLoading(false)
            })
    }, [])

    return [classes, loading]

};

export default UseClass;