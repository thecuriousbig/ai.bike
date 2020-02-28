import React, { useState, useMemo, createContext } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
    /* auth state */
    const [isAuthenticated, authentication] = useState(false);

    /* only change when isAuthenticated and authentication are really change. */
    const authProviderValue = useMemo(() => ({isAuthenticated, authentication}), [
        isAuthenticated,
        authentication
    ]);

    return (
        <AuthContext.Provider value={authProviderValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export { AuthContext };
