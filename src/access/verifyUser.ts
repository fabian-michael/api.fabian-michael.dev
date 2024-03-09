import { Access } from "payload/config";

export const verifyUser = ({
    adminOnly,
    allowApiKeys,
    allowedUserCollections,
    additionalAccess,
}: {
    adminOnly?: boolean;
    allowApiKeys?: boolean;
    allowedUserCollections?: string[];
    additionalAccess?: Access;
} = {}): Access => {
    return (args) => {
        const { req: { user } } = args;
        console.log(user);


        if (!user) {
            return false;
        }

        if (user.is_admin) {
            return true;
        } else if (adminOnly) {
            return false;
        }

        if (
            allowApiKeys && user.enableAPIKey === true ||
            allowedUserCollections && allowedUserCollections.includes(user.collection)
        ) {
            return additionalAccess?.(args) ?? true;
        }

        return false;
    }
}