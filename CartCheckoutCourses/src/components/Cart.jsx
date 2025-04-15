import React from 'react';

const Cart = ({ cart, setCart, setStep }) => {
  // DONE:
  // - Display cart items
  // - Allow item removal
  // - Show total price

  // Update quantity for a course
  const updateQuantity = (courseId, newQuantity) => {
    const updatedCart = cart.map((course) => {
      if (course.offering_id === courseId) {
        return { ...course, quantity: newQuantity };
      }
      return course;
    });
    setCart(updatedCart);
  };

  // Remove a course from the cart
  const removeItem = (courseId) => {
    const updatedCart = cart.filter(
      (course) => course.offering_id !== courseId
    );
    setCart(updatedCart);
  };

  // Calculate the total price for all items in the cart
  const subTotal = cart.reduce((sum, course) => {
    // Use the course quantity or default to 1
    const quantity = course.quantity ? course.quantity : 1;
    return sum + course.price * quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cart page content */}
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto p-4">
          {/* Cart title */}
          <h2 className="text-2xl font-bold mb-4 mt-4">Your Cart</h2>
          {/* Show a message if the cart is empty */}
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            // Dispaly each course selected in the cart
            <div className="space-y-4">
              {cart.map((course) => (
                <div
                  key={course.offering_id}
                  className="bg-white border p-4 rounded-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-gray-600">{course.instructor}</p>
                    <p className="text-gray-800 font-bold">${course.price}</p>
                    {/* Quantity update buttons */}
                    <div className="mt-2 flex items-center space-x-2">
                      {/* Subtract from quantity button */}
                      <button
                        onClick={() =>
                          updateQuantity(
                            course.offering_id,
                            Math.max((course.quantity || 1) - 1, 1)
                          )
                        }
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 hover:cursor-pointer"
                      >
                        –
                      </button>
                      <span>{course.quantity || 1}</span>
                      {/* Add to quntity button */}
                      <button
                        onClick={() =>
                          updateQuantity(
                            course.offering_id,
                            (course.quantity || 1) + 1
                          )
                        }
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 hover:cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Button to remove the item from the cart */}
                  <button
                    onClick={() => removeItem(course.offering_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 hover:cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {/* Total price at the bottom of the cart */}
              <div className="mt-6 text-right">
                <p className="text-base">Subotal: ${subTotal.toFixed(2)}</p>
              </div>
              <div className="mt-6 text-right">
                <p className="text-base">Tax: TBD</p>
              </div>
              <div className="mt-6 text-right">
                <p className="text-xl font-bold"> Estimated Total: ${subTotal.toFixed(2)}</p>
              </div>
            </div>
          )}
          {/* Page navigation buttons */}
          <div className="mt-6 flex justify-between">
            {/* Button to go back to the browsing page */}
            <button
              onClick={() => setStep("browse")}
              className="bg-[#457fa4] text-[#fffff2] px-4 py-2 rounded-md hover:bg-[#1b4965] transition-colors duration-200 hover:cursor-pointer"
            >
              Continue Shopping
            </button>
            {/* Button to proceed to the payment page */}
            {cart.length === 0 && (
              <p className="text-red-600 mb-2 pl-6">
                Add to your cart to continue.
              </p>
            )}
            <button
              onClick={() => setStep("payment")}
              disabled={cart.length === 0}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                cart.length === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#57a773] text-[#fffff2] hover:bg-[#3a774f] hover:cursor-pointer"
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <div>
        <div className=" bg-[#1b4965] text-white p-4">
          <p>&copy; Hailey Akinsola 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
