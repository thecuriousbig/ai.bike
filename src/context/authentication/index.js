import useContextFactory from "context";
import { AuthContext } from "./provider";

/* auth context */
export const useAuthContext = useContextFactory("AuthContext", AuthContext);