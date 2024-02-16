import { LivePreviewConfig } from "payload/config";
import { buildUrl } from "../utils";
import { PAYLOAD_PUBLIC_FRONTEND_BASE_URL } from "./env.public";
import { DEFAUlT_LOCALE } from "./l10n.config";

export function livePreviewConfig(): LivePreviewConfig & {
    collections?: string[];
    globals?: string[];
} {
    return {
        url: ({ data, documentInfo, locale }) => buildUrl([
            PAYLOAD_PUBLIC_FRONTEND_BASE_URL,
            locale.code !== DEFAUlT_LOCALE && locale.code,
            documentInfo.slug !== 'home' && documentInfo.slug,
            data.slug
        ]),
        breakpoints: [
            {
                label: 'Mobile',
                name: 'mobile',
                width: 375,
                height: 667,
            },
            {
                label: 'Tablet',
                name: 'tablet',
                width: 768,
                height: 1024,
            },
            {
                label: 'Desktop',
                name: 'desktop',
                width: 1440,
                height: 900,
            },
        ],
        globals: [
            'home',
            'legal-notice'
        ],
    }
}