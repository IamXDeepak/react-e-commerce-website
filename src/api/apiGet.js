const apiGet = async(URL) => {
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
  }

  export default apiGet