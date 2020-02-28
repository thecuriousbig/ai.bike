import React, { useState, useMemo, createContext } from "react";

const UserContext = createContext();

function UserProvider(props) {
    /* auth state */
    const [user, setUser] = useState();

    /* only change when resources are really change. */
    const userProviderValue = useMemo(
        () => ({ user, setUser }),
        [user, setUser]
    );

    return (
        <UserContext.Provider value={userProviderValue}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;
export { UserContext };
