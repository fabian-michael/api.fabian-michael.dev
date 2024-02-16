import { PAYLOAD_PUBLIC_FRONTEND_BASE_URL } from "./env.public";

export const corsConfig = (): string[] => [
    'http://localhost:5173',
    PAYLOAD_PUBLIC_FRONTEND_BASE_URL,
].filter(Boolean);