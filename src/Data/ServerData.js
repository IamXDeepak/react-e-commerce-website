import { createContext, useState, useEffect } from "react";
import apiGet from '../api/apiGet'

const ServerData = createContext({})

export const LoginData = ({children}) =>{
    const [loginData, setLoginData] = useState([])
    const [companyImages , setCompanyImages] = useState([])
    const [homeProductImages, setHomeProductImages] = useState([])
    const [tShirts, setTShirts] = useState([])
    const [brandNames, setBrandNames] = useState([])

   /*  const getData = async(URL) => {
        try {
            const response = await fetch (URL);
            if(!response.ok) Error("data is not received")
            const data = await response.json()
            return data
        }catch (err) {
            if (err.response) {
                console.log (err.response.status) ; 
                console.log (err.response.headers) ;
            } 
        }
      } */

    useEffect(() => {
        const fetchData = async() => {
            setLoginData(await apiGet('http://localhost:3500/loginCredentials'))

            setCompanyImages(await apiGet('http://localhost:3500/companyImages'))

            setHomeProductImages(await apiGet('http://localhost:3500/homeProductImages'))

            setTShirts(await apiGet('http://localhost:3500/tShirtSection'))
        }
        fetchData()
    },[])


    return (
        <ServerData.Provider value={{ loginData,setLoginData, companyImages, setCompanyImages,
            homeProductImages, setHomeProductImages, tShirts, setTShirts,brandNames, setBrandNames
        }}>
            {children}
        </ServerData.Provider>
    )
}

export default ServerData


    /* useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch ('http://localhost:3500/companyImages');
                if(!response.ok) Error("data is not received")
                const list = await response.json()
                setCompanyImages(list);
            }catch (err) {
                if (err.response) {
                    console.log (err.response.status) ; 
                    console.log (err.response.headers) ;
                } 
            }
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch ('http://localhost:3500/homeProductImages');
                if(!response.ok) Error("data is not received")
                const list = await response.json()
                setHomeProductImages(list);
            }catch (err) {
                if (err.response) {
                    console.log (err.response.status) ; 
                    console.log (err.response.headers) ;
                } 
            }
        }
        const fetchTshirt = async () => {
            try {
                const response = await fetch ('http://localhost:3500/tShirtSection');
                if(!response.ok) Error("data is not received")
                const list = await response.json()
                setTShirts(list);
            }catch (err) {
                if (err.response) {
                    console.log (err.response.status) ; 
                    console.log (err.response.headers) ;
                } 
            }
        }
        fetchCompany()
        fetchProducts()
        fetchTshirt()
    },[]) */

            /* const fetchData = async () => {
            try {
                setLoginData([])
                const response = await fetch ('http://localhost:3500/loginCredentials');
                if(!response.ok) Error("data is not received")
                const list = await response.json()
                setLoginData(list);
            }catch (err) {
                if (err.response) {
                    console.log (err.response.status) ; 
                    console.log (err.response.headers) ;
                } 
            }
        }
        fetchData() */