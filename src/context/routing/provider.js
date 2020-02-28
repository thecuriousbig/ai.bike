import React, { useReducer, useMemo, createContext } from "react";
import routeReducers, { initialState } from "./reducer";
const RouteStateContext = createContext();
const RouteDispatchContext = createContext();

function RouteProvider(props) {
    /* route state */
    const [state, dispatch] = useReducer(
        routeReducers,
        props.initialState || initialState
    );

    const routeState = useMemo(() => state, [state]);
    const routeDispatch = useMemo(() => dispatch, [dispatch]);

    return (
        <RouteStateContext.Provider value={routeState}>
            <RouteDispatchContext.Provider value={routeDispatch}>
                {props.children}
            </RouteDispatchContext.Provider>
        </RouteStateContext.Provider>
    );
}

export default RouteProvider;
export { RouteStateContext, RouteDispatchContext };
