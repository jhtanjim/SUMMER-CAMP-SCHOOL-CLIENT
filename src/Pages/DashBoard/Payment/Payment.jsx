import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCarts from '../../../Hooks/useCarts/useCarts';



const stripePromise = loadStripe(import.meta.env.VITE_Payement_GateWay_PK);
const Payment = () => {
    const [cart] = useCarts()

    const total = cart.reduce((sum, item) => sum + item.price, 0)
    const price = parseFloat(total.toFixed(2))
    return (
        <div>
            <SectionTitle
                subHeading="Proceed to Payment"
                heading="Payment"
            ></SectionTitle>


            <Elements stripe={stripePromise}>
                <CheckOutForm
                    price={price}
                    cart={cart}
                ></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;