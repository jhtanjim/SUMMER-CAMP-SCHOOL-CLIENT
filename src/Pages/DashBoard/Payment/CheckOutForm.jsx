import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Lock } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./CheckoutForm.css";

const CheckoutForm = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    setCardError("");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        enrolled: cart.length,
        classItems: cart.map((item) => item._id),
        itemsId: cart[0]._id,
        itemsImage: cart[0].image,
        status: "service pending",
        itemNames: cart[0].name,
        cart: cart[0],
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Payment Successful!",
            text: "Your enrollment has been confirmed",
            icon: "success",
            confirmButtonColor: "#8B5CF6",
          });
        }
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    }

    setProcessing(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "12px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
          Payment Details
        </h3>
        <p className="text-gray-600">
          Complete your enrollment by providing payment information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-xl p-4 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {cardError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{cardError}</p>
          </div>
        )}

        {transactionId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600 text-sm">
              Payment successful! Transaction ID: {transactionId}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              <span>Pay ${price}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <Lock className="h-4 w-4 mr-1" />
        Your payment information is secure and encrypted
      </div>
    </div>
  );
};

export default CheckoutForm;
