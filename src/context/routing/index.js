import useContextFactory from "context";
import { RouteStateContext, RouteDispatchContext } from "./provider";

/* route state context */
const useRouteStateContext = useContextFactory("routeStateContext", RouteStateContext);

/* route dispatch context */
const useRouteDispatchContext = useContextFactory("routeDispatchContext", RouteDispatchContext)

export { useRouteStateContext, useRouteDispatchContext}