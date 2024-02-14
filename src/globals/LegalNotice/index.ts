import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";

export const LegalNotice: GlobalConfig = {
    access: {
        read: () => true,
    },
    slug: 'legal-notice',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'text',
            type: 'richText',
        },
        lexicalHTML('text', {
            name: 'text_html'
        }),
    ]
}