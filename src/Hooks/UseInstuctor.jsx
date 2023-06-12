import React, { useEffect, useState } from 'react';

const UseInstuctor = () => {

    const [instuctor, setInstuctor] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users/instuctor/${user._id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInstuctor(data)
                setLoading(false)
            }), []
    });
}
return [instuctor, loading]

export default UseInstuctor;