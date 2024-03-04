import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";
import { isLoggedIn } from "../../access/isLoggedIn";

export const LegalNotice: GlobalConfig = {
    access: {
        read: isLoggedIn(),
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