import useContextFactory from "context";
import { UserContext } from "./provider";

/* auth context */
export const useUserContext = useContextFactory("UserContext", UserContext);
