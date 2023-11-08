import React, {useState, useEffect, useContext} from 'react'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    };
    return (
        <AuthContext.Provider value = {value}>{props.children}</AuthContext.Provider>
    )
}