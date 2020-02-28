import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
/* import context provider */
import AuthProvider from "context/authentication/provider";
import UserProvider from "context/user/provider";
import RouteProvider from "context/routing/provider";
/* import component */
import AuthRoute from "features/AuthRoute";
import HomePage from "features/HomePage";
import SigninPage from "features/AuthPage/SigninPage";
import SignupPage from "features/AuthPage/SignupPage";
import OrderPage from "features/OrderPage";
import OrderStepOnePage from "features/OrderPage/OrderStepOnePage";
import OrderStepTwoPage from "features/OrderPage/OrderStepTwoPage";
import OrderStepThreePage from "features/OrderPage/OrderStepThreePage";
import DeliverPage from "features/DeliverPage";
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <AuthProvider>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <UserProvider>
                        <Route exact path="/signin">
                            <SigninPage />
                        </Route>
                        <Route exact path="/signup">
                            <SignupPage />
                        </Route>
                        <RouteProvider>
                            <AuthRoute
                                exact
                                path="/order"
                                component={OrderPage}
                            />
                            <AuthRoute
                                exact
                                path="/order/step-one"
                                component={OrderStepOnePage}
                            />
                            <AuthRoute
                                exact
                                path="/order/step-two"
                                component={OrderStepTwoPage}
                            />
                            <AuthRoute
                                exact
                                path="/order/step-three"
                                component={OrderStepThreePage}
                            />
                            <AuthRoute
                                exact
                                path="/deliver"
                                component={DeliverPage}
                            />
                        </RouteProvider>
                    </UserProvider>
                </AuthProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
