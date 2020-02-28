import { useContext } from "react";

/**
 * Factory function that used for creating a context.
 * @param {String} name - Name of the context.
 * @param {*} context - Context itself.
 */
const useContextFactory = (name, context) => {
    return () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ctx = useContext(context);
        if (ctx === undefined) {
            throw new Error(
                `use ${name} Context must be used withing a ${name} ContextProvider.`
            );
        }
        return ctx;
    };
};

export default useContextFactory;
