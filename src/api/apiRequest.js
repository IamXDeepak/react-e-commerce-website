const apiRequest = async(url = "", option = null, errMsg = null) => {
    try {
        const response = await fetch(url,option);
        if(!response.ok) throw Error("failed to connect with the server")
    } catch(error) {
        errMsg = error.Message
    } finally {
        return errMsg
    }
}

export default apiRequest