import { LocalizationConfig } from "payload/config";

export const DEFAUlT_LOCALE = 'en';

export function l10nConfig(): LocalizationConfig {
    return {
        locales: [
            {
                code: 'en',
                label: 'English',
            },
            {
                code: 'de',
                label: 'German',
            }
        ],
        defaultLocale: DEFAUlT_LOCALE,
        fallback: true,
    }
}