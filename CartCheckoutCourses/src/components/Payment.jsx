import React, { useState } from 'react';

const Payment = ({ cart, setCart, setStep, userInfo, setUserInfo }) => {
  // Initialize state to store card number, expiry, and CVC
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update state with new value
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

    const handleUserChange = (e) => {
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
    };

  // Handle form submission
  const handleSubmit = () => {
    // DONE:
    // - Validate that all fields are filled
    // - Optionally, check card number length, expiry format, etc.
    // - Show success message
    // - Move to summary view using setStep("summary")
    const { name, email, address } = userInfo;
    const { cardNumber, expiryDate, cvc } = paymentInfo;

    if (!name || !email || !address || !cardNumber || !expiryDate || !cvc) {
      alert("Please fill out all required fields.");
      return;
    }

    // Card number validation: must be 15 or 16 digits
    const cardRegex = /^\d{15,16}$/;
    if (!cardRegex.test(cardNumber)) {
      alert("Card number must be 15 or 16 digits. Do not use spaces.");
      return;
    }

    // Expiry format: MM/YY format and valid month
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      alert("Expiry date must be in MM/YY format.");
      return;
    }

    // CVC validation: 3 or 4 digits
    const cvcRegex = /^\d{3,4}$/;
    if (!cvcRegex.test(cvc)) {
      alert("CVC must be 3 or 4 digits.");
      return;
    }

    alert("Payment submitted successfully!");
    setStep("summary");
  };

  const subTotal = cart.reduce((sum, course) => {
    const quantity = course.quantity || 1;
    return sum + course.price * quantity;
    }, 0);

  const tax = 0.05 * subTotal;
  const totalPrice = subTotal + tax;


  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto p-5 min-h-screen flex flex-col">
        <h2 className="text-3xl font-bold text-center mt-3">Payment Details</h2>

        {/* Order Review Section */}
        <div className="border rounded-md p-4 mt-5 mb-5 bg-gray-100">
          <h3 className="text-xl font-semibold">Your Order:</h3>
          <ul>
            {/* Map the cart items */}
            {cart.map((course) => (
              <li key={course.offering_id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {course.quantity || 1}
                  </p>
                </div>
                <p>${(course.price * (course.quantity || 1)).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4 space-y-1">
            <p>Subtotal: ${subTotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* User Information Inputs */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Information:</h3>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="First Last"
            value={userInfo.name}
            onChange={handleUserChange}
            className="w-full border rounded-md p-2 mb-2"
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="user.name@example.com"
            value={userInfo.email}
            onChange={handleUserChange}
            className="w-full border rounded-md p-2 mb-2"
          />

          <label>Shipping Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userInfo.address}
            onChange={handleUserChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Payment Form Inputs */}
        <div className="space-y-4 mt-10">
          <h3 className="text-xl font-semibold">Payment Information:</h3>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="•••• •••• •••• •••• (no spaces)"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mb-2"
          />

          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mb-2"
          />

          <label>CVC:</label>
          <input
            type="text"
            name="cvc"
            placeholder="•••"
            value={paymentInfo.cvc}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Back to Cart Button */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep("cart")}
            className="bg-[#457fa4] text-white px-4 py-2 rounded-md hover:bg-[#1b4965] transition-colors duration-200 hover:cursor-pointer"
          >
            Back to Cart
          </button>
          {/* Submit Payment Button */}
          <button
            onClick={handleSubmit}
            className="bg-[#57a773] text-white px-4 py-2 rounded-md hover:bg-[#3a774f] transition-colors duration-200 hover:cursor-pointer"
          >
            Submit Payment
          </button>
        </div>

      </div>

      {/* Footer */}
      <div>
        <div className="bg-[#1b4965] text-white flex justify-between items-center p-4">
          <p>&copy; Hailey Akinsola 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
