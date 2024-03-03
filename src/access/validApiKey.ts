import { Access } from "payload/config";

export const validApiKey = (additionalAccess?: Access): Access => {
    return async (args) => {
        const { req: { user } } = args;
        console.log({ user });

        const additionalAccessResult = await additionalAccess?.(args);

        return {
            and: [
                // TODO
                // Boolean(user),
                // await additionalAccess?.(args),
            ]
        };
    }
}