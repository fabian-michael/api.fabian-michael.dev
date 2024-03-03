import { viteBundler } from "@payloadcms/bundler-vite";
import { Config } from "payload/config";
import { Users } from "../collections/Users";
import { PAYLOAD_PUBLIC_FRONTEND_BASE_URL } from "./env.public";
import { livePreviewConfig } from "./livePreview.config";

type AdminConfig = Config['admin'];

export const adminConfig = (): AdminConfig => ({
    user: Users.slug,
    bundler: viteBundler(),
    livePreview: PAYLOAD_PUBLIC_FRONTEND_BASE_URL &&
        livePreviewConfig(),
});