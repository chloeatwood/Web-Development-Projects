import React, { useState } from 'react';
import BrowseCourses from './components/Browse';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Summary from './components/Summary';

const App = () => {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("browse");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  return (
    <div className="app-container min-h-screen bg-[#fffff2]">
      {step === "browse" && <BrowseCourses cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "cart" && <Cart cart={cart} setCart={setCart} setStep={setStep} />}
      {step === "payment" && <Payment cart={cart} setCart={setCart} setStep={setStep} userInfo={userInfo} setUserInfo={setUserInfo}/>}
      {step === "summary" && <Summary cart={cart} setCart={setCart} setStep={setStep} userInfo={userInfo} setUserInfo={setUserInfo} />}
    </div>
  );
};

export default App;
