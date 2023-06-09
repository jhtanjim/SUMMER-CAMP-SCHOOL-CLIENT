import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from 'react-query';

const useCarts = () => {


    const { user } = useContext(AuthContext)

    // const token = localStorage.getItem('access-token')

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`




                // , {
                //     headers: {
                //         authorization: `bearer ${token}`
                //     }
                // }



            )
            return res.json()
        },
    })

    return [cart, refetch]







};

export default useCarts;