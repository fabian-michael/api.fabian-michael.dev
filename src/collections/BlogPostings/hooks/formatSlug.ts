import type { FieldHook } from 'payload/types';
import slugify from 'slugify';


export const formatSlug = (fallback: string): FieldHook =>
    ({ operation, value, originalDoc, data, req }) => {
        const locale = req.query.locale as string | undefined;

        if (value) {
            return slugify(value, { locale, lower: true });
        }

        if (operation === 'create' || operation === 'update') {
            const fallbackData = data?.[fallback] || originalDoc?.[fallback];

            if (fallbackData && typeof fallbackData === 'string') {
                return slugify(fallbackData, { locale, lower: true });
            }
        }

        return value;
    }