import { Access } from "payload/config";

export const isLoggedIn = (additionalAccess?: Access, roles?: string[]): Access => {
    return (args) => {
        const { req: { user } } = args;

        if (!user) {
            return false;
        }

        if (user.is_admin) {
            return true;
        }

        if (
            roles &&
            !roles.some((role) => user.roles?.includes(role))
        ) {
            return false;
        }

        return additionalAccess?.(args) ?? true;
    }
}