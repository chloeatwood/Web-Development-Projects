import React from "react";
import Browse from "./Browse";
import Cart from "./Cart";
import Payment from "./Payment";

const Summary = ({ cart, setCart, setStep, userInfo, setUserInfo }) => {
  // TODO:
  // - Display summary of purchase
  // - Show payment success message
  // - Include "Back to Browse" button

  const subTotal = cart.reduce((sum, course) => {
    const quantity = course.quantity || 1;
    return sum + course.price * quantity;
  }, 0);

  const tax = 0.05 * subTotal;
  const totalPrice = subTotal + tax;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#1b4965] text-white flex justify-between items-center p-4 mb-8">
        <h1 className="text-3xl font-bold">Order Summary</h1>
        <button
          onClick={() => {
            setCart([]);
            setStep("browse");
            setUserInfo({ name: "", email: "", address: "" }); // clear name, email, and address for next purchase 
          }}
          className="bg-[#1b4965] text-[#fffff2] font-bold py-2 px-4 text-center rounded-md m-3 mt-4 transition-all duration-300 hover:bg-[#57a773] hover:scale-105 active:scale-95"
        >
          Back to Browse
        </button>
      </div>

      <div className="flex-grow">
        <div className="w-auto h-auto bg-[#deded2] rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.3)] border border-[#1b4965] overflow-hidden flex flex-col m-4 p-2">
          <div className="text-[25px] text-[#1b4965] mt-3 text-center font-bold">
            <h2>Order Placement Successful! Here is Your Order Info</h2>
          </div>
          <div className="text-[18px] text-black mt-3 m-8 text-center">
            {/* Wraps for better visibility when screen gets small */}
            {/* <div className="flex items-center justify-evenly"> */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-evenly items-center">
              <p>
                <strong>Name: </strong> {userInfo.name}{" "}
              </p>
              <p>
                <strong>Email: </strong> {userInfo.email}
              </p>
              <p>
                <strong>Address: </strong>
                {userInfo.address}
              </p>
              <p>
                <strong>Total Paid After Tax: </strong>${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Items Purchased */}
        {cart.map((course) => (
          <div
            key={course.offering_id}
            className="w-auto h-[200px] bg-[#deded2] rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.3)] border border-[#1b4965] overflow-hidden flex flex-row m-4"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-[250px] h-full object-contain outline outline-2 outline-[#1b4965]"
            />
            {/* Allows user to scroll to see all information for each item */}
            {/* <div className="flex flex-row divide-x-2 divide-[#1b4965] w-full items-stretch h-full"> */}
            <div className="overflow-scroll flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#1b4965] w-full">
              <div className="flex items-center px-3 py-2 flex-grow">
                <p className="text-black text-center w-full">
                  <strong>Course Title:</strong>
                  <br />
                  {course.title}
                </p>
              </div>
              <div className="flex items-center px-3 py-2 flex-grow">
                <p className="text-black text-center w-full">
                  <strong>Instructor:</strong>
                  <br />
                  {course.instructor}
                </p>
              </div>
              <div className="flex items-center px-3 py-2 flex-grow">
                <p className="text-black text-center w-full">
                  <strong>Description:</strong>
                  <br />
                  {course.description}
                </p>
              </div>
              <div className="flex items-center px-3 py-2 flex-grow">
                <p className="text-black text-center w-full">
                  <strong>Price:</strong>
                  <br />${course.price} <br />
                  {/* Added quantity number for better representation fo cart total */}
                  <span className="text-xs">
                    Quantity: {course.quantity || 1}
                  </span>
                </p>
              </div>
            </div>
          </div>
      ))}
      </div>

      {/* Show courses, total price
      <button onClick={() => setStep("browse")}>Back to Browse</button> */}

      {/* Footer */}
      <div>
        <div className="bg-[#1b4965] text-white flex justify-between items-center p-4">
          <p>&copy; Chloe Atwood 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
