import { Config } from "payload/config";
import { JSON_LIMIT } from "./env.private";

type ExpressConfig = Config['express'];

export const expressConfig = (): ExpressConfig => ({
    json: {
        limit: JSON_LIMIT * 1024 * 1024,
    },
})