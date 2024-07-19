export function getToken() {
        
    const token = localStorage.getItem("token")
    if (token) {
        return token
    }
    return "not authorize"
}

export function getLocalStorage(key:string) {
    return localStorage.getItem(key)
}