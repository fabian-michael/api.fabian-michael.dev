import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";
import { verifyUser } from "../../access/verifyUser";

export const LegalNotice: GlobalConfig = {
    access: {
        read: verifyUser({
            allowApiKeys: true
        }),
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