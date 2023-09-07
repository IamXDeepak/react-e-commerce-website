import { createContext, useState } from "react";

const UserLoginData = createContext({})

export const UserData = ({children}) => {
    const [userInfo, setUserInfo] = useState(null)
    const [printSts, setPrintSts] = useState(false)
    const [name, setName] = useState("")
    const [mailOrNumber, setMailOrNumber] = useState("")
    const [password, setPassword] = useState("")
    const [conformPass, setConformPass] = useState("")
    const [cart, setCart] = useState(null)
    const [formData, setFormData] = useState({
        id:0,
        country:'',
        fname : '',
        lname : '',
        mobileNumber : '',
        pincode : '',
        flatDoorNo : '',
        area:'',
        landMark : '',
        city:'',
        state:'',
        defaultAddress:'',
        addressType:'',
        doNotDistrub:'',
        deliveryDays:[],
        additionalInfo:''
      })
    return (
        <UserLoginData.Provider value={{ 
            name, setName,mailOrNumber, setMailOrNumber, password, setPassword,
            conformPass, setConformPass, printSts, setPrintSts,userInfo,setUserInfo,
            cart, setCart, formData, setFormData
        }}>
            {children}
        </UserLoginData.Provider>
    )
}

export default UserLoginData