import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./nav/Header";
import SubHeader from "./nav/SubHeader";
import LoginForm from "./loginAndAccount//login/LoginForm";
import RegisterForm from "./loginAndAccount/login/RegisterForm"
import { LoginData } from "./Data/ServerData";
import UserLoginData, { UserData } from "./Data/UserLoginData";
import { useContext, useEffect, useState } from "react";
import Account from "./loginAndAccount/account/Account";
import Home from "./Home";
import TShirt from "./dresses/TShirt";
import Purchase from "./purchase/Purchase";
import LoginAndSecurity from "./loginAndAccount/account/login&security/LoginAndSecurity";
import Cart from "./cart and buy/cart/Cart";
import YourAddress from "./loginAndAccount/account/yourAddress/YourAddress";
import AddAddress from "./loginAndAccount/account/yourAddress/addAddress/AddAddress";
import Error from "./error/Error";

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [resultItem, setResultItem] = useState(null)
  useEffect(() => {
    const retriveUser = () => {
        const storedData = localStorage.getItem("login data")
        if(storedData) {
            const data = JSON.parse(storedData)
            setUserInfo(data[0])
        }
    }
    retriveUser()
    setResultItem(null)
  },[])
  
  return (
    <div className="app">
        <LoginData><UserData>
          {isLogin ? null : <Header userPersonal = {userInfo}/>}
          {isLogin ? null : <SubHeader />}
          <Routes>
            <Route path="/" element={< Home />}/>
            <Route path="/login" element={< LoginForm setIsLogin = {setIsLogin}/>} />
            <Route path="/register" element={< RegisterForm setIsLogin = {setIsLogin}/>} />
            <Route path="/account" >
              <Route index element={<PrivateRoute><Account /></PrivateRoute>}/> 
              <Route path="login&security" element={<LoginAndSecurity userInfo={userInfo}setUserInfo={setUserInfo}/>} />
              <Route path="your-address" >
                <Route index element={<YourAddress />}/>
                <Route path="add-address" element={<AddAddress />}/>
              </Route>
            </Route>
            <Route path="/tshirt" element={<TShirt setResultItem={setResultItem}/>} /> 
            <Route path="/purchase" element={<Purchase items={resultItem}/>} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<Error setIsLogin = {setIsLogin}/>} />
          </Routes>
        </UserData></LoginData>
    </div>
  );
}

function PrivateRoute({ children }) {
  const {userInfo} = useContext(UserLoginData)
  return userInfo ? <>{children}</> : <Navigate to="/login" />;
}

export default App;