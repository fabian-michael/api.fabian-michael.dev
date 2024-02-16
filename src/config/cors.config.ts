import { PAYLOAD_PUBLIC_FRONTEND_HOSTNAME } from "./env.public";

export const corsConfig = (): string[] => [
    PAYLOAD_PUBLIC_FRONTEND_HOSTNAME,
].filter(Boolean);